<?php $page='receipt';
include("php/dbconnect.php");
include("php/checklogin.php");

$tid = isset($_GET['tid']) ? mysqli_real_escape_string($conn,$_GET['tid']) : '';

$sql = "SELECT ft.id, ft.submitdate, ft.semester, ft.transcation_remark, ft.paid, s.sname, s.contact, s.fees, s.balance, g.grade FROM fees_transaction ft JOIN student s ON s.id = ft.stdid JOIN grade g ON g.id = s.grade WHERE ft.id='$tid'";
$q = $conn->query($sql);
if(!$q || $q->num_rows == 0){
    echo 'Invalid receipt request';
    exit;
}
$res = $q->fetch_assoc();
$semesterText = ($res['semester'] == 1) ? 'First Semester' : (($res['semester'] == 2) ? 'Second Semester' : '');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>School Fees Management System</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/font-awesome.css" rel="stylesheet" />
    <link href="css/basic.css" rel="stylesheet" />
    <link href="css/custom.css" rel="stylesheet" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
</head>
<?php include("php/header.php"); ?>
<div id="page-wrapper">
    <div id="page-inner">
        <div class="row">
            <div class="col-md-12">
                <h1 class="page-head-line">Payment Receipt</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Receipt #<?php echo $res['id']; ?>
                    </div>
                    <div class="panel-body">
                        <p><strong>Name:</strong> <?php echo $res['sname']; ?></p>
                        <p><strong>Grade:</strong> <?php echo $res['grade']; ?></p>
                        <p><strong>Contact:</strong> <?php echo $res['contact']; ?></p>
                        <p><strong>Semester:</strong> <?php echo $semesterText; ?></p>
                        <p><strong>Date:</strong> <?php echo $res['submitdate']; ?></p>
                        <p><strong>Total Fee:</strong> <?php echo $res['fees']; ?></p>
                        <p><strong>Amount Paid:</strong> <?php echo $res['paid']; ?></p>
                        <p><strong>Remaining Balance:</strong> <?php echo $res['balance']; ?></p>
                        <p><strong>Remark:</strong> <?php echo $res['transcation_remark']; ?></p>
                    </div>
                    <div class="panel-footer text-center">
                        <button class="btn btn-success" onclick="window.print()">Print</button>
                        <a href="fees.php" class="btn btn-default">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/jquery-1.10.2.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/jquery.metisMenu.js"></script>
<script src="js/custom1.js"></script>
</body>
</html>

