<?php  require_once('connect.php');?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Вспомнить всё</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <link href="css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/jquery-ui.css">
    <style>
        body{
            background-color: lightgrey;
        }
        li.ui-menu-item {
            font-size: 12px;
            font-faminy: Verdana;
        }
        .ui-widget-content{
            font-size: 12px;
            font-faminy: Verdana;
        }
    </style>
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#!">Вспомнить всё</a>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-3">
                <div class="card mb-4">
                    <div class="card-header">Календарь</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div id="datepicker"></div>
                                <input type="hidden" id="datepicker_value" value="30.12.2023">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Begin test -->
                <!-- <input type="text" id="datepicker"> -->
                <!--                <input type="text" id="selectedDate">-->
                <!--                <input type="text" id="selectedDate1">-->
                <!-- End test -->

                <div class="card mb-4">
                    <div class="card-header">Поиск</div>
                    <div class="card-body">
                        <div class="input-group">
                            <input class="form-control" id="inputSearch" type="text"
                                placeholder="Что ищем?" aria-label="Введите поисковую фразу..."
                                aria-describedby="button-search" /> &nbsp;&nbsp;
                            <button class="btn btn-primary" id="button-search" type="button">Ок!</button>
                        </div>
                    </div>
                </div>
                <div>
                    <pre id='array'></pre>
                </div>
            </div>

            <div class="col-lg-9">

                <!-- data unit -->
                <div id="totalHolder">
                    <!-- <div class="row">
                        <div hidden class="col border text-center">ID</div>
                        <div hidden class="col border text-center">Datas</div>
                        <div class="col border text-center">Событие</div>
                        <div class="col border text-center">Персона</div>
                        <div class="col border text-center">Предмет</div>
                        <div class="col border text-center">Территория</div>
                         <div class="col border text-center">Описание</div>
                                <div class="col border text-center">Картинки</div>
                                <div class="col border text-center">Книга</div>
                    </div> -->


                    <span id="dataHolder"></span>
                </div>


                <div id="form"></div>
                <!-- <textarea class="form-control mt-5 mb-3" id="exampleFormControlTextarea1" rows="10"></textarea>
                <div class="float-right">
                    <a id="saveChanges" href=""> <button class="btn btn-primary mb-4" style="float: right;">Записать
                            изменения</button></a>
                </div> -->


            </div>
            <div class="text-center"><a class='btn btn-warning'  href="#" id="addRow" class="my-2">Добавить событие</a></div>
        </div>
    </div>
    <footer class="py-5 bg-dark">
        <div class="ajax-reply"></div>
        <div class="container">
            <p class="m-0 text-center text-white">&copy; TotalRecall2023</p>
        </div>
    </footer>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="https://malsup.github.io/jquery.form.js"></script>
    <script src="js/scripts.js"></script>
    <script>
    </script>
</body>

</html>
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
    $post = [   $_POST["id"],     $_POST["datas"],  $_POST["events"],
                $_POST['person'], $_POST['thing'],  $_POST['locat'],
                $_POST['book'] ];

    update($files, $post, $connect);
}
function update($files, $post, $connect)
{

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
    $query="UPDATE `tot` SET `datas` = '$post[1]',
        `events` = '$post[2]', `person` = '$post[3]', 
        `thing` = '$post[4]', `locat` = '$post[5]',
        `book` = '$post[6]', `thumb` = '$thumb',
        `img` = '$img'
        WHERE `tot`.`id` = '$post[0]'";
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