<?php  
require_once 'connect.php';

$userinput=$_GET['eventdate'];

$data=mysqli_real_escape_string($connect, $userinput );

$query="SELECT * FROM `tot` WHERE `date`='$data'";
$eventdate=mysqli_query($connect, $query );


?>