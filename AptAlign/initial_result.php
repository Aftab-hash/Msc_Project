<?php
// Start session first before any output
session_start();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'header.php';

$unique_output_dir = $_SESSION['unique_output_dir'];

$initial_alignment_file = "$unique_output_dir/initial_alignment.aln";
$final_alignment_file = "$unique_output_dir/final_alignment.aln";
$suggested_params_file = "$unique_output_dir/suggested_params.json";

// Ensure variables are always defined
$suggested_matrix = "N/A";
$suggested_gap_open = "N/A";
$suggested_gap_extend = "N/A";

// Read suggested parameters (if file exists)
if (file_exists($suggested_params_file)) {
    $json_content = file_get_contents($suggested_params_file);
    if ($json_content === false) {
        echo "<p style='color:red;'>Error reading JSON file.</p>";
    } else {
        $params = json_decode($json_content, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "<p style='color:red;'>JSON Decode Error: " . json_last_error_msg() . "</p>";
        } else {
            // Use correct keys from JSON file
            $suggested_matrix = $params["suggested_matrix"] ?? "N/A";
            $suggested_gap_open = $params["suggested_gap_open"] ?? "N/A";
            $suggested_gap_extend = $params["suggested_gap_extend"] ?? "N/A";
        }
    }
} else {
    echo "<p style='color:red;'>JSON file not found.</p>";
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sequence Alignment</title>
    <style>
        body {
            font-family: Calibri, sans-serif;
            margin: 20px;
        }
        .container {
            display: flex;
            justify-content: space-between;
        }
        .box {
            width: 48%;
            padding: 15px;
            border: 1px solid #ddd;
            box-shadow: 2px 2px 10px #ccc;
            background: #f9f9f9;
            overflow-x: auto;
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background: #eee;
            padding: 10px;
        }
        h3 {
            text-align: center;
        }
        .download-link {
            display: block;
            text-align: center;
            margin-top: 10px;
        }
    </style>
</head>
<body>
<p></p>
<h5 style="text-align:center;"><b>Sequence Alignment Results</b></h5>
<p></p>

<div class="container">
    <!-- Initial Alignment + Suggested Parameters (Left Side) -->
    <div class="box">
        <h5><b>Initial Alignment & Suggested Parameters</b></h5>
        <?php
        if (file_exists($initial_alignment_file)) {
            echo "<pre>" . htmlspecialchars(file_get_contents($initial_alignment_file) ?: "Error reading file") . "</pre>";
            echo "<a href='$initial_alignment_file' class='download-link' download>Download Initial Alignment</a>";
        } else {
            echo "<p style='color:red; text-align:center;'>Initial alignment file not found.</p>";
        }
        
        ?>

        <h5><b>Suggested Parameters:</b></h5>
        <ul>
            <li><strong>BLOSUM Matrix:</strong> <?php echo htmlspecialchars($suggested_matrix ?: "N/A"); ?></li>
            <li><strong>Gap Open Penalty:</strong> <?php echo htmlspecialchars($suggested_gap_open ?: "N/A"); ?></li>
            <li><strong>Gap Extend Penalty:</strong> <?php echo htmlspecialchars($suggested_gap_extend ?: "N/A"); ?></li>
        </ul>

        <h5><b>Realign with Custom Parameters</b></h5>
        <form action="realign.php" method="post">
        
        <label for="matrix">BLOSUM Matrix:</label>
        <input type="text" id="matrix" name="matrix" value="<?php echo htmlspecialchars($suggested_matrix ?? ''); ?>" required><br>

        <label for="gap_open">Gap Open Penalty:</label>
        <input type="text" id="gap_open" name="gap_open" value="<?php echo htmlspecialchars($suggested_gap_open ?? ''); ?>" required><br>

        <label for="gap_extend">Gap Extend Penalty:</label>
        <input type="text" id="gap_extend" name="gap_extend" value="<?php echo htmlspecialchars($suggested_gap_extend ?? ''); ?>" required><br>

        <button type="submit">Realign</button>
    </form>

    </div>

    <!-- Final Alignment (Right Side) -->
    <div class="box">
        <h5><b>Final Alignment</b></h5>
        <?php
        if (file_exists($final_alignment_file)) {
            echo "<pre>" . htmlspecialchars(file_get_contents($final_alignment_file) ?: "Error reading file") . "</pre>";
            echo "<a href='$final_alignment_file' class='download-link' download>Download Final Alignment</a>";
        } else {
            echo "<p style='color:red; text-align:center;'>Final alignment file not found.</p>";
        }
        ?>
        <div style="text-align: center; padding-top: 80px;">
        <h5><b>THANK YOU😊</b></h5>
        </div>
    </div>
</div>
<a href="index.php">Go Back</a>
</body>
</html>

<?php include 'footer.php'; ?>

