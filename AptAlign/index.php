<?php
    include_once "header.php";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Apt-Aligner</title>
    <style>
        body {
            font-family: Calibri, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .form-container {
            width: 50%;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .info-container {
            width: 45%;
            /*background-color: #f4f4f4;*/
            padding: 20px;
            border-radius: 5px;
        }
         textarea {
            width: 80%;
        }
        select, input[type="file"], input[type="submit"] {
            width: 20%;
            /*padding: 4px;
            margin-top: 2px;*/
        }
        h1 {
            text-align: center;
            font-size: 22px; 
            font-weight: bold; 
            margin-bottom: 20px;
        }
        
    </style>
</head>
<body>
    <p> </p>
    <h1>AptAligner</h1> 
    
    <div class="container">
        <div class="form-container">
            <h5><b>Upload a FASTA File Containing Two Sequences:</b></h5>
            <form action="process_fasta.php" method="post" enctype="multipart/form-data">
               <!--<label for="email"><b>Your Email (optional):</b></label>--
                <input type="email" name="email" id="email" placeholder="you@example.com" style="width: 250px;"><br><br>-->

                <label for="fasta_file">Upload FASTA file:</label>
                <input type="file" name="fasta_file" id="fasta_file"style="width: 250px;"><br><br>

                <h5><b>OR Paste FASTA-Formatted Sequences:</b></h5>
                <textarea name="fasta_text" id="fasta_text" rows="8" placeholder=">sequence1_ID&#10;SEQUENCE1&#10;>sequence2_ID&#10;SEQUENCE2"></textarea><br><br>
                
                <label for="alignment_method"><b>Select Alignment Method:</b></label>
                <select name="alignment_method" id="alignment_method" style="width: 125px; height: 20px; font-size: 12px;">
                    <option value="profile_based">Profile-Based</option>
                    <option value="optimized_base">Optimized-Based</option>                    
                </select>
                <br><br>
                
                <input type="submit" value="Submit">
            </form>
        </div>

        <div class="info-container">
            <h5><strong>About AptAligner</strong></h5>
            <p><b>AptAligner</b> is a sequence alignment tool designed to process and compare biological sequences efficiently. It supports different alignment methods:</p>
            <ul>
                <li><strong>Profile-Based:</strong> Utilizes a T-COFFEE for profile-based alignment and it take 5 to 10 min to generate result file. And give more Accurate alignment</li>
                <li><strong>Optimized Base:</strong> Uses  Optimized BLOSUM Matrix and Gap Peanlties combination for optimized sequence alignment.</li>                
            </ul>
            <p>You can either upload a FASTA file containing two sequences or paste them manually in the text box.</p>
        </div>
    </div>
</body>
</html>

<?php
    include_once "footer.php";
?>

