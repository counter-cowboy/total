<?PHP

$host="localhost";
$dbname="total";
$user="user";
$password="user";

$connect=mysqli_connect($host, $user, $password, $dbname);

if(!$connect) die('Error!');

?>
