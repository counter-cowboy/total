<?php
require_once 'connect.php';

if (isset($_GET['getdate'] ))
{
    $userinput = $_GET['getdate'];
    getData($userinput, $connect);
}
elseif (isset($_GET['term'] ))
{
    $request= $_GET['term'];

    autoComplete($request, $connect);
}
elseif (isset($_GET['eventdate']))
{
    $datass=$_GET['eventdate'];
    create($datass, $connect);
}
elseif (isset($_GET['search']) )
{
    $request= $_GET['search'];
    search($request, $connect);
}
elseif (isset( $_FILES['thumb'] ))
{
    $files = $_FILES['thumb'];
    $id =    $_POST["id"];
    $datas=  $_POST["datas"] ;
    $events= $_POST["events"];
    $person= $_POST['person'];
    $thing=  $_POST['thing'];
    $locat=  $_POST['locat'];
    $book =  $_POST['book'];
    update($files, $id, $datas, $events, $person, $thing, $locat, $book);
}

function update($files, $id, $datas, $events, $person, $thing, $locat, $book)
{
    global $connect;
    $img =  '';
    $thumb = '';

    if ($files)
    {
        $uploaddir = "assets/img/";
        $uploadfilename = $files['name'];

        $img =  $uploaddir . basename($uploadfilename);
        $thumb = $uploadprevpath= $uploaddir . 'prev_'.basename($uploadfilename);

        $isuploaded = move_uploaded_file($files['tmp_name'], $img);
        echo json_encode( $img) ;
        $typeok=true;

        switch ($_FILES['thumb']['type'])
        {  // checking file-type
            case  "image/gif": $src = imagecreatefromgif($img); break;
            case  "image/jpeg": // same for progressive jpeg
            case  "image/jpg":
            case  'image/pjpeg': $src = imagecreatefromjpeg($img); break;
            case  'image/png': $src = imagecreatefrompng($img); break;
            case  'image/bmp': $src = imagecreatefrombmp($img); break;
            default: $typeok =false; break;
        }
        if ($typeok)
        {  // calculating preview-size (height&width)
            list($w, $h) = getimagesize($img);
            $max = 100; // max prev-size will be 200px*200px
            $tw = $w;
            $th = $h;

            if ($w > $h && $max < $w)
                 { $tw = $max;     $th = $h * $max / $w;  }
            elseif ($h > $w && $max < $h)
                 { $th = $max;     $tw = $w * $max/$h; }
            elseif ($max< $w) $tw=$th=$max;
            //creating empty image $max*$max
            $tmp = imagecreatetruecolor($tw, $th);
            imagecopyresampled($tmp, $src, 0,0,0,0, $tw,$th,$w,$h); //create thumb from $src source
            imageconvolution($tmp, [[-1,-1,-1],[-1,16,1],[-1,-1,-1]], 8, 0);
            imagejpeg($tmp, $uploadprevpath);
            imagedestroy($src);
            imagedestroy($tmp);
        }
    }
    $query="UPDATE `tot` SET `datas` = '$datas',
        `events` = '$events', `person` = '$person', 
        `thing` = '$thing', `locat` = '$locat',
        `book` = '$book', `thumb` = '$thumb',
        `img` = '$img'
        WHERE `tot`.`id` = '$id'";
    $eventdate=mysqli_query($connect, $query );
}
function search($request, $connect)
{
    $search=mysqli_real_escape_string($connect, $request);
    $sql="SELECT * FROM `tot` WHERE `datas` LIKE '%$search%' OR `events` LIKE '%$search%' OR 
                        `person` LIKE '%$search%' OR `thing` LIKE '%$search%'  OR `locat` LIKE '%$search%'
                        OR `book` LIKE '%$search%'";

    $searhResult=mysqli_query($connect, $sql);
    $searhResult=mysqli_fetch_all($searhResult);
    echo json_encode($searhResult);
}
function create($datass, $connect)
{

    $query="INSERT INTO `tot` (`id`, `datas`, `events`, `person`, `thing`, `locat`, `book`, `thumb`, `img`)
                    VALUES (NULL, '$datass', 'no future', 'no problem', 'no money', 'no where', 'no book', 'no image', 'no picture')  ";
    $eventdate=mysqli_query($connect, $query );

    // test functional for server response in scripts.JS & handling it
    // it can be safely removed from PHP-code
    $query="SELECT * FROM `tot` WHERE `datas`='$datass'";
    $eventdat=mysqli_query($connect, $query );
    $eventdat=mysqli_fetch_all($eventdat);
    echo json_encode($eventdat);
}
function autoComplete($request,$connect)
{
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
}
function getData($userinput , $connect)
{

    $data=mysqli_real_escape_string($connect, $userinput );
    $query="SELECT * FROM `tot` WHERE `datas`='$data'";
    $eventdate=mysqli_query($connect, $query );
    $eventdate=mysqli_fetch_all($eventdate);
    echo json_encode($eventdate);
}
?>