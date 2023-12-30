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


                <div class="card mb-4">
                    <div class="card-header">Поиск</div>
                    <div class="card-body">
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder="Введите поисковую фразу..."
                                aria-label="Введите поисковую фразу..." aria-describedby="button-search" />
                            <button class="btn btn-primary" id="button-search" type="button">Ок!</button>
                        </div>
                    </div>
                </div>


            </div>


            <div class="col-lg-9">

                <!-- data unit -->
                <div id="totalHolder">
                    <div class="row">
                        <div class="col border text-center">Событие</div>
                        <div class="col border text-center">Персона</div>
                        <div class="col border text-center">Предмет</div>
                        <div class="col border text-center">Территория</div>
                        <!--<div class="col border text-center">Описание</div>
                                <div class="col border text-center">Картинки</div>
                                <div class="col border text-center">Книга</div>-->
                    </div>

                    <div class="row data-row">
                        <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                        <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                        <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                        <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                        <!--<div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                                <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                                <div class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>-->
                    </div>
                    <span id="dataHolder"></span>
                </div>
                <div class="text-center"><a href="#" id="addRow" class="my-2">Добавить событие</a></div>


                <textarea class="form-control mt-5 mb-3" id="exampleFormControlTextarea1" rows="10"></textarea>
                <div class="float-right">
                    <button class="btn btn-primary mb-4" style="float: right;">Записать изменения</button>
                </div>


            </div>
        </div>
    </div>


    <footer class="py-5 bg-dark">
        <div class="container">
            <p class="m-0 text-center text-white">&copy; TotalRecall2023</p>
        </div>
    </footer>

    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/scripts.js"></script>
</body>

</html>