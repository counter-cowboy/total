<?php  
require_once 'connect.php';

$userinput=$_GET['getdate'];

$data=mysqli_real_escape_string($connect, $userinput );

$query="SELECT * FROM `tot` WHERE `datas`='$data'";
$eventdate=mysqli_query($connect, $query );
//$eventdate=mysqli_fetch_assoc($eventdate);
 $eventdate=mysqli_fetch_all($eventdate);
echo json_encode($eventdate);

?>