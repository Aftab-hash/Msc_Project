<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : "";
    $fasta_content = "";

    // Ensure the upload directory exists
    $upload_dir = "upload";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Handle file upload
    if (isset($_FILES['fasta_file']) && $_FILES['fasta_file']['error'] == 0) {
        $fasta_content = file_get_contents($_FILES['fasta_file']['tmp_name']);
    }

    // Handle manually entered FASTA sequences
    if (!empty(trim($_POST['fasta_text']))) {
        $fasta_content = trim($_POST['fasta_text']);
    }

    // Check if we have input data
    if (empty($fasta_content)) {
        echo "<p style='color:red;'>Error: Please upload a FASTA file or enter sequences.</p>";
        exit();
    }

    // Parse FASTA sequences
    $lines = explode("\n", trim($fasta_content));
    $fasta_ids = [];
    $sequences = [];
    $current_sequence = "";
    $current_id = "";

    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, ">") === 0) {
            if (!empty($current_sequence) && !empty($current_id)) {
                $sequences[] = $current_sequence;
                $fasta_ids[] = $current_id;
            }
            $current_id = substr($line, 1);
            $current_sequence = "";
        } else {
            $current_sequence .= $line;
        }
    }
    if (!empty($current_sequence) && !empty($current_id)) {
        $sequences[] = $current_sequence;
        $fasta_ids[] = $current_id;
    }

    // Validate input
    if (count($fasta_ids) != 2 || count($sequences) != 2) {
        echo "<p style='color:red;'>Error: Provide exactly two sequences in FASTA format.</p>";
        exit();
    }

    // Sanitize FASTA IDs
    function sanitize_id($id) {
        return preg_replace('/[^A-Za-z0-9_-]/', '_', $id);
    }

    $fasta_id1 = sanitize_id($fasta_ids[0]);
    $sequence1 = $sequences[0];
    $fasta_id2 = sanitize_id($fasta_ids[1]);
    $sequence2 = $sequences[1];
    
    // Base output directory
    $unique_output_dir = "";  // Initialize to avoid "undefined variable" 
    $base_output_dir = "output";
    if (!is_dir($base_output_dir)) {
        mkdir($base_output_dir, 0777, true);
    }

    // Generate unique output dir for profile-based method
    function generateUniqueDir($base_dir, $min = 3000, $max = 3999) {
        do {
            $random_number = rand($min, $max);
            $unique_dir = "$base_dir/$random_number";
        } while (is_dir($unique_dir));
        mkdir($unique_dir, 0777, true);       
        return $unique_dir;
    }

    if ($_POST['alignment_method'] === "optimized_base") {
        $unique_output_dir = generateUniqueDir($base_output_dir);
    } else {
        $unique_output_dir = generateUniqueDir($base_output_dir);
    }
    
    // Save sequences as a FASTA file
    $fasta_filename = $unique_output_dir . "/input_sequence.fasta";
    $fasta_file_content = ">$fasta_id1\n$sequence1\n>$fasta_id2\n$sequence2\n";
    file_put_contents($fasta_filename, $fasta_file_content);
    chmod($fasta_filename, 0644);
    
    if (!empty($email)) {
    file_put_contents("$unique_output_dir/email.txt", $email);
    }

    // Define output file paths
    $output_file1 = "$unique_output_dir/initial_alignment.aln";
    $output_file2 = "$unique_output_dir/final_alignment.aln";
    $profile_output_file = "$unique_output_dir/Profile.aln";

    // Save session
    session_start();
    $_SESSION['unique_output_dir'] = $unique_output_dir;

    // Clean up old directories
    function cleanOldDirectories($base_dir, $days = 7) {
        $dirs = array_filter(glob("$base_dir/*"), 'is_dir');
        foreach ($dirs as $dir) {
            if (time() - filemtime($dir) > ($days * 24 * 60 * 60)) {
                array_map('unlink', glob("$dir/*"));
                rmdir($dir);
            }
        }
    }
    cleanOldDirectories($base_output_dir);

    // Profile-based logic
    if ($_POST['alignment_method'] === "profile_based") {
        $script_path = "/var/www/html/AptAlign/pipeline.sh";
        $log_path = "$unique_output_dir/log.txt";

        // Ensure the script is executable
        chmod($script_path, 0755);

        // Background command
        $background_command = "bash $script_path \"$fasta_filename\" \"$unique_output_dir\" > \"$log_path\" 2>&1 &";

        // Log for debugging
        file_put_contents("$unique_output_dir/debug_command.txt", $background_command);

        // Execute background command
        exec($background_command, $exec_output, $exec_status);

        // Redirect
        header("Location: alignment_processing.php?job_id=" . basename($unique_output_dir));
        exit();

    } else {
        // Optimized base method
        $command = "python3 /var/www/html/AptAlign/align.py $fasta_id1 $sequence1 $fasta_id2 $sequence2 $output_file1 $output_file2 $unique_output_dir initial 2>&1";
        exec($command, $output, $status);

        if ($status !== 0) {
            echo "<p style='color:red;'>Error running sequence alignment. Status: $status</p>";
            exit();
        }

        header("Location: initial_result.php?file=" . urlencode($output_file1) .
            "&fasta_id1=" . urlencode($fasta_id1) .
            "&sequence1=" . urlencode($sequences[0]) .
            "&fasta_id2=" . urlencode($fasta_id2) .
            "&sequence2=" . urlencode($sequences[1]));
        exit();
    }
}
?>



