<?php include 'header.php'; ?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get job_id from the URL
$job_id = isset($_GET['job_id']) ? basename($_GET['job_id']) : '';
$alignment_file_name = "Profile.aln";

if (empty($job_id)) {
    die("<p style='color:red;'>Error: No job ID specified.</p>");
}

$profile_alignment_file = "/var/www/html/AptAlign/output/$job_id/$alignment_file_name";

if (!file_exists($profile_alignment_file)) {
    die("<p style='color:red;'>Error: Alignment file not found for Job ID: $job_id</p>");
}

$alignment_content = file_get_contents($profile_alignment_file);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profile Alignment Result</title>
    <style>
        body {
            font-family: Calibri, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        pre {
            width: 50%;
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .download-link {
            display: inline-block;
            margin-top: 10px;
            background-color: #4CAF50;
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            text-decoration: none;
        }
        .download-link:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h5><b>Profile-Based Sequence Alignment Result (Job ID: <?php echo htmlspecialchars($job_id); ?>):</b></h5>
    <pre><?php echo htmlspecialchars($alignment_content); ?></pre>
    <a href="<?php echo htmlspecialchars($profile_alignment_file); ?>" class="download-link" download>Download Alignment File</a>
    <br><br>
    <a href="index.php">Go Back</a>
</body>
</html>
<?php include 'footer.php'; ?>

