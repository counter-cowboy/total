<?php  
require_once 'connect.php';

$id=     $_POST["id"] ;
$datas=  $_POST["datas"] ;
$events= $_POST["events"];
$person= $_POST['person'];
$thing=  $_POST['thing'];
$locat=  $_POST['locat'];
$book =  $_POST['book'];

$img =  $_POST['img'];
 $thumb = $_POST['thumb'];



$query="UPDATE `tot` SET `datas` = '$datas',
        `events` = '$events', `person` = '$person', 
        `thing` = '$thing', `locat` = '$locat',
        `book` = '$book', `thumb` = '$thumb',
        `img` = '$img'
        WHERE `tot`.`id` = '$id' ";
 $eventdate=mysqli_query($connect, $query );
 echo 'ok';
//$eventdate=mysqli_fetch_assoc($eventdate);
 //$eventdate=mysqli_fetch_all($eventdate);
// echo json_encode($eventdate);
header('Location: index.php');

?>