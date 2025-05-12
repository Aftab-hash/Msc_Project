<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BioToolSuite</title>
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <script src="js/jquery_3.2.1.js"></script>
    <script src="js/bootstrap_4.0.0.js"></script>
    <link type="text/css" rel="stylesheet" href="css/bootstrap_4.0.css">
    <link type="text/css" rel="stylesheet" href="headerStyle.css">  
    <style>
/* --- Sidebar --- */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 160px;
    background: linear-gradient(to bottom, #175161 , #1f728a); /* Blue gradient */
    padding-top: 25px;
    padding-bottom: 20px;
    z-index: 1000;
    border-right: 2px solid #003d5c;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
}

/* --- Navigation list --- */
.sidebar .nbar {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 3; /* leaves space at the bottom for more items */
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* --- Capsule buttons --- */
.sidebar .nbar li {
    width: 100%;
    padding: 0 10px;
    margin-bottom: 10px;
}

.sidebar .nbar li a {
    display: block;
    padding: 3px 8px;
    font-size: 12px;
    white-space: nowrap; /* keeps text like "Meta-Predictor" in one line */
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: #175161;
    border-radius: 40px;
    border: 1px solid #88cce6;
    text-decoration: none;
    color: #FFFFFF;
    font-weight: 600;
    text-align: center;
    transition: 0.3s ease;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
}

.sidebar .nbar li a:hover,
.sidebar .nbar li a:focus {
    background-color: #b9e5f4;
    color: #003344;
    transform: scale(1.04);
}

/* Active button */
.sidebar .nbar li a.active {
    background-color: #76d0ee;
    color: #002f3f;
}

/* --- Reserve space below for more tools --- */
.sidebar::after {
    content: '';
    flex-grow: 10;
}

/* --- Content area adjustments --- */
.content {
    margin-left: 180px;
    padding: 30px;
}

/* --- Header/Footer aligned with sidebar --- */
header, footer {
    margin-left: 180px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background-color: #eaf6fb;
    padding: 20px;
    box-shadow: -4px 4px 10px rgba(0,0,0,0.08);
}


</style>

</head>

<body>
    <table width="1150" border="0" cellspacing="0" cellpadding="0" align="center" class="my-3">
        <tr>
            <td>
                <div class="jumbotron d-flex m-0 p-0 py-2 banner">
                    <div class="mt-2 toolTitle">
                        <h2><strong class="mb-2 logo">BioToolSuite</h2></strong>
                        <h4 class="logo tagLine">A Tool in Need Is A Tool Indeed</h4>
                    </div>
                    <div class="ml-auto mr-2 my-1 instiLogo">
                        <img src="img/ibab_logo_test_3.png" width="43" height="100">
                        <div class="ml-2">
                            <h2 class="mb-2"><strong class="logo instiName">IBAB</strong></h2>
                            <h4 class="logo tagLine instiFullName">Institute of Bioinformatics and <br> Applied Biotechnology</h4>
                        </div>
                    </div>
                </div>
                <div class="sidebar">
                    <ul class="nbar">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="predictor.php">Meta-Predictor</a></li>
                        <li><a href="annoduf.php">Annoduf</a></li>
                        <li><a href="X-Pro.php">X-Pro</a></li>
                        <li><a href="index.php">AptAligner</a></li>
                        <li><a href="mutXplor.php">mutXplor</a></li>
                        <li><a href="help.php">Help</a></li>
                        <li><a href="contact-us.php">Contact Us</a></li>
                        <li><a href="contact-us.php">------</a></li>
                        <li><a href="contact-us.php">------</a></li>
                        <li><a href="contact-us.php">------</a></li>
                        <li><a href="contact-us.php">------</a></li>
                        <li><a href="contact-us.php">------</a></li>
                    </ul>
                </div>

            </td>
        </tr>
        <tr bgcolor="#ffffff">
            <td align="left">
                <table width="98%" align="center" id="mdTable" style="font-size:12px;">
                    <tr>
                        <td>
                        
