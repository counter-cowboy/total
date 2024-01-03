<?php  
require_once 'connect.php';

$datass=$_GET['datas'];


$query="INSERT INTO `tot` (`id`, `datas`, `events`, `person`, `thing`, `locat`)
                    VALUES (NULL, '$datass', NULL, NULL, NULL, NULL)  ";
 $eventdate=mysqli_query($connect, $query );
//$eventdate=mysqli_fetch_assoc($eventdate);
 //$eventdate=mysqli_fetch_all($eventdate);
// echo json_encode($eventdate);
header('Location: index.php');
?>