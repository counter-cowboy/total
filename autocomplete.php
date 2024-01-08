<?php
require_once 'connect.php';
$request= $_GET['term'] ?? '';
$search=mysqli_real_escape_string($connect, $request);

$sql="SELECT * FROM `tot` WHERE `datas` LIKE '%$search%' OR `events` LIKE '%$search%' OR 
                        `person` LIKE '%$search%' OR `thing` LIKE '%$search%'  OR `locat` LIKE '%$search%'";

$searhResult=mysqli_query($connect, $sql );
$response=[];
while ($row = mysqli_fetch_array($searhResult))
{
    $response = array($row['events'], $row['thing'], $row['person'], $row['locat']);
}

echo  json_encode($response);

?>