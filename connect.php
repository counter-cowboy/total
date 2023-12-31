<?PHP

$host="localhost";
$dbname="total";
$user="user";
$password="poiuy";

$connect=mysqli_connect($host, $user, $password, $dbname);

if(!$connect) die('Error!');

// Создаем таблицу
// $sql = "CREATE TABLE IF NOT EXISTS tot (
//     id INT(11) NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     datas VARCHAR(11) NULL DEFAULT NULL,
//     events VARCHAR(256) NULL DEFAULT NULL,
//     person VARCHAR(256) NULL DEFAULT NULL,
//     locat VARCHAR(256) NULL DEFAULT NULL
// ) ENGINE = InnoDB";

// if ($connect->query($sql) !== TRUE)    echo "Error creating table: " . $connect->error;

?>