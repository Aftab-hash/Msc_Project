<?php
session_start(); // ✅ Start session BEFORE using $_SESSION

error_reporting(E_ALL);
ini_set('display_errors', 1);

$upload_dir = $_SESSION['unique_output_dir'];
$fasta_file = "$upload_dir/input_sequence.fasta";

// Check if the input FASTA file exists
if (!file_exists($fasta_file)) {
    die("<p style='color:red;'>Error: FASTA file not found in upload directory.</p>");
}

// Read and parse the FASTA file
$fasta_content = file_get_contents($fasta_file);
$lines = explode("\n", trim($fasta_content));
$fasta_ids = [];
$sequences = [];
$current_sequence = "";
$current_id = "";

foreach ($lines as $line) {
    $line = trim($line);
    if (strpos($line, ">") === 0) {  // Header line
        if (!empty($current_sequence) && !empty($current_id)) {
            $sequences[] = $current_sequence;
            $fasta_ids[] = $current_id;
        }
        $current_id = substr($line, 1); // Remove ">"
        $current_sequence = "";
    } else {
        $current_sequence .= $line;  // Append sequence
    }
}
// Add last sequence
if (!empty($current_sequence) && !empty($current_id)) {
    $sequences[] = $current_sequence;
    $fasta_ids[] = $current_id;
}

// Validate extracted sequences
if (count($fasta_ids) != 2 || count($sequences) != 2) {
    die("<p style='color:red;'>Error: FASTA file must contain exactly two sequences.</p>");
}

// Assign extracted values
$fasta_id1 = preg_replace('/[^A-Za-z0-9_-]/', '_', $fasta_ids[0]);
$sequence1 = $sequences[0];
$fasta_id2 = preg_replace('/[^A-Za-z0-9_-]/', '_', $fasta_ids[1]);
$sequence2 = $sequences[1];

// Get parameters from POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "<pre>Received POST data:\n";
    print_r($_POST);
    echo "</pre>";

    $required_params = ['matrix', 'gap_open', 'gap_extend'];
    $missing_params = [];

    foreach ($required_params as $param) {
        if (!isset($_POST[$param]) || trim($_POST[$param]) === '') {
            $missing_params[] = $param;
        }
    }

    if (!empty($missing_params)) {
        die("<p style='color:red;'>Error: Missing required parameters: " . implode(", ", $missing_params) . "</p>");
    }

    // Retrieve parameters safely
    $matrix = escapeshellarg(trim($_POST['matrix']));
    $gap_open = escapeshellarg(trim($_POST['gap_open']));
    $gap_extend = escapeshellarg(trim($_POST['gap_extend']));

    // Debugging output
    echo "<pre>Extracted Parameters:\n";
    echo "FASTA ID 1: $fasta_id1\n";
    echo "Sequence 1: $sequence1\n";
    echo "FASTA ID 2: $fasta_id2\n";
    echo "Sequence 2: $sequence2\n";
    echo "Matrix: $matrix\n";
    echo "Gap Open: $gap_open\n";
    echo "Gap Extend: $gap_extend\n";
    echo "</pre>";

    session_start();
    if (!isset($_SESSION['unique_output_dir'])) {
        die("Error: Unique output directory not set.");
    }
    // Ensure the directory path has a trailing slash
    $unique_output_dir = rtrim($_SESSION['unique_output_dir'], '/') . '/';
    echo $unique_output_dir;
    $output_file1 = $unique_output_dir . "alignment_initial.aln";
    $output_file2 = $unique_output_dir . "final_alignment.aln";

    // Check if align.py exists
    if (!file_exists("align.py")) {
        die("<p style='color:red;'>Error: align.py script not found.</p>");
    }

    // Execute realignment
    $command = "python3 align.py " . escapeshellarg($fasta_id1) . " " . 
           escapeshellarg($sequence1) . " " . 
           escapeshellarg($fasta_id2) . " " . 
           escapeshellarg($sequence2) . " " . 
           escapeshellarg($output_file1) . " " . 
           escapeshellarg($output_file2) . " " .
           escapeshellarg($unique_output_dir) . " " . 
           "final " . 
           escapeshellarg($_POST['gap_open']) . " " . 
           escapeshellarg($_POST['gap_extend']) . " " . 
           escapeshellarg($_POST['matrix']) . " 2>&1";
    exec($command, $output, $status);

    echo "<pre>Command executed:\n$command\nOutput:\n" . implode("\n", $output) . "</pre>";

    if ($status === 0 && file_exists($output_file2)) {
        echo "<p style='color:green;'>Alignment successful. Redirecting...</p>";
        header("Location: initial_result.php?file=" . urlencode($output_file2));
        exit();
    } else {
        die("<p style='color:red;'>Error in final alignment: " . implode("\n", $output) . "</p>");
    }
}
?>

