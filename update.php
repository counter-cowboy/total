<?php  
require_once 'connect.php';

$id=     $_POST["id"] ;
$datas=  $_POST["datas"] ;
$events= $_POST["events"];
$person= $_POST['person'];
$thing=  $_POST['thing'];
$locat=  $_POST['locat'];



$query="UPDATE `tot` SET `datas` = '$datas',
        `events` = '$events', `person` = '$person', 
        `thing` = '$thing', `locat` = '$locat'
        WHERE `tot`.`id` = '$id' ";
 $eventdate=mysqli_query($connect, $query );
 echo 'ok';
//$eventdate=mysqli_fetch_assoc($eventdate);
 //$eventdate=mysqli_fetch_all($eventdate);
// echo json_encode($eventdate);
header('Location: index.php');
?>