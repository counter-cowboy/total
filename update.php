<?php  
require_once 'connect.php';

$id=     $_POST["id"] ;
$datas=  $_POST["datas"] ;
$events= $_POST["events"];
$person= $_POST['person'];
$thing=  $_POST['thing'];
$locat=  $_POST['locat'];
$book =  $_POST['book'];

$img =  '';
 $thumb = '';


if ($_FILES['thumb'])
{
    $uploaddir = "assets/img/";
    $uploadfilename = $_FILES['thumb']['name'];

    $img = $uploadfilepath = $uploaddir . basename($uploadfilename);
    $thumb = $uploadprevpath= $uploaddir . 'prev_'.basename($uploadfilename);

    $isuploaded = move_uploaded_file($_FILES['thumb']['tmp_name'], $img);
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
        {
            $tw = $max;
            $th = $h * $max / $w;
        }
        elseif ($h > $w && $max < $h)
        {
            $th = $max;
            $tw = $w * $max/$h;
        }
        elseif ($max< $w) $tw=$th=$max;

        $tmp = imagecreatetruecolor($tw, $th); //creating empty image 200*200
        imagecopyresampled($tmp, $src, 0,0,0,0, $tw,$th,$w,$h); //create thumb from $src source
        imageconvolution($tmp, [[-1,-1,-1],[-1,16,1],[-1,-1,-1]], 8, 0);
        imagejpeg($tmp, $uploadprevpath);
        imagedestroy($src);
        imagedestroy($tmp);
    }
}
else echo "FILE nooo";

$query="UPDATE `tot` SET `datas` = '$datas',
        `events` = '$events', `person` = '$person', 
        `thing` = '$thing', `locat` = '$locat',
        `book` = '$book', `thumb` = '$thumb',
        `img` = '$img'
        WHERE `tot`.`id` = '$id'";
$eventdate=mysqli_query($connect, $query );



?>