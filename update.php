<?php  
require_once 'connect.php';

$id=     $_GET['id'] ;
$datas=  $_GET['datas'] ;
$events= $_GET['events'];
$person= $_GET['person'];
$thing=  $_GET['thing'];
$locat=  $_GET['locat'];



$query="UPDATE `tot` SET `datas` = '$datas',
        `events` = '$events', `person` = '$person', 
        `thing` = '$thing', `locat` = '$locat'
        WHERE `tot`.`id` = '$id' ";
 $eventdate=mysqli_query($connect, $query );
//$eventdate=mysqli_fetch_assoc($eventdate);
 //$eventdate=mysqli_fetch_all($eventdate);
// echo json_encode($eventdate);
header('Location: index.php');
?>