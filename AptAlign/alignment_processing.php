<?php include 'header.php'; ?>

<?php
// Get the job ID from URL
$job_id = isset($_GET['job_id']) ? basename($_GET['job_id']) : '';
$alignment_file_name = "Profile.aln";

$alignment_file_exists = false;
$alignment_path = "/var/www/html/AptAlign/output/$job_id/$alignment_file_name";

if (!empty($job_id) && file_exists($alignment_path)) {
    $alignment_file_exists = true;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Processing Alignment</title>
    <meta http-equiv="refresh" content="20">
    <style>
        body {
            font-family: Calibri, sans-serif;
            text-align: center;
            padding: 40px;
            background-color: #f4f8fb;
        }
        .container {
            border: 2px solid #ddd;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        a.button, button.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            margin-top: 20px;
            background-color: #2d89ef;
            color: white;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            cursor: pointer;
        }
        a.button:hover, button.button:hover {
            background-color: #1b64c1;
        }
        .loading {
            font-size: 18px;
            color: #555;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Profile-Based Alignment In Progress</h2>
    <p class="loading">Your alignment is being generated.<br>This may take 5–8 minutes depending on sequence length and server load.</p>

    <?php if ($alignment_file_exists): ?>
        <form action="view_profile_result.php" method="get">
            <input type="hidden" name="job_id" value="<?php echo htmlspecialchars($job_id); ?>">
            <button type="submit" class="button">View Alignment Result</button>
        </form>
    <?php else: ?>
        <p <p class="loading">Waiting for the alignment file (<b><?php echo htmlspecialchars($alignment_file_name); ?></b>) to be generated.<br>
An email will be sent once it's ready.</p>

    <?php endif; ?>
</div>

</body>
</html>

<?php include_once "footer.php"; ?>

