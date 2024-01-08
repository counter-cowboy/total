<?php  
require_once 'connect.php';

$datass=$_GET['eventdate'];


$query="INSERT INTO `tot` (`id`, `datas`, `events`, `person`, `thing`, `locat`, `book`, `thumb`, `img`)
                    VALUES (NULL, '$datass', 'no event', 'no person', 'no thing', 'no where', 'no book', 'no image', 'no picture')  ";
 $eventdate=mysqli_query($connect, $query );
//$eventdate=mysqli_fetch_assoc($eventdate);
 //$eventdate=mysqli_fetch_all($eventdate);
// echo json_encode($eventdate);


$query="SELECT * FROM `tot` WHERE `datas`='$datass'";
$eventdat=mysqli_query($connect, $query );
//$eventdate=mysqli_fetch_assoc($eventdate);
$eventdat=mysqli_fetch_all($eventdat);
echo json_encode($eventdat);





header('Location: index.php');
?>