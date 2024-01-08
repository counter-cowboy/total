<?php
require_once 'connect.php';
$request= $_GET['search'] ?? '';
$search=mysqli_real_escape_string($connect, $request);

$sql="SELECT * FROM `tot` WHERE `datas` LIKE '%$search%' OR `events` LIKE '%$search%' OR 
                        `person` LIKE '%$search%' OR `thing` LIKE '%$search%'  OR `locat` LIKE '%$search%'";

$searhResult=mysqli_query($connect, $sql );

$searhResult=mysqli_fetch_all($searhResult);
echo json_encode($searhResult);


?>