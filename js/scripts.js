jQuery(document).ready(
            function () {
          jQuery.datepicker.regional["ru"] = {
            closeText: "Закрыть",
            prevText: "Предыдущий",
            nextText: "Следующий",
            currentText: "Сегодня",
            monthNames: [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь",
            ],
            monthNamesShort: [
              "Янв",
              "Фев",
              "Мар",
              "Апр",
              "Май",
              "Июн",
              "Июл",
              "Авг",
              "Сен",
              "Окт",
              "Ноя",
              "Дек",
            ],
            dayNames: [
              "воскресенье",
              "понедельник",
              "вторник",
              "среда",
              "четверг",
              "пятница",
              "суббота",
            ],
            dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            weekHeader: "Не",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: "",
          };
          jQuery.datepicker.setDefaults($.datepicker.regional["ru"]);

                  let globArray = [];
                  let globalData;

          $("#datepicker").datepicker({
            onSelect: function () {


                    let jsDate = $("#datepicker").datepicker("getDate");
                    let jDate = new Date(jsDate);
                    let day = jDate.getDate();
                    let month = jDate.getMonth() + 1;
                    let year = jDate.getFullYear();
                    let eventDate = year + "-" + month + "-" + day;
                    console.log(eventDate);
                    globalData=eventDate;
                    allGlobalDate=eventDate;
                    //console.log(jsDate);
                    $("#selectedDate").val(eventDate);
                    $("#dataHolder").text(eventDate);

                    $.ajax({
                      type: "GET",
                      datatype: "json",
                      url: "getdata.php",
                      data: { eventdate: eventDate },
                      success: function (response) {
                        response = JSON.parse(response);
                        globArray = response;
                        console.log(response);
                        $("#selectedDate1").val(response);
                        //response.forEach((o) => $("#array").html(o));
                          allGlobalData=globArray;
                        callingArray(globArray);
                      },
                    });
            },
          });



          // function callingArray(globArray) {
          //             //rendering table-header
          //           $("#totalHolder").html('<div class="row">\n' +
          //               '                        <div hidden class="col border text-center">ID</div>\n' +
          //               '                        <div hidden class="col border text-center">Datas</div>\n' +
          //               '                        <div class="col border text-center">Событие</div>\n' +
          //               '                        <div class="col border text-center">Персона</div>\n' +
          //               '                        <div class="col border text-center">Предмет</div>\n' +
          //               '                        <div class="col border text-center">Территория</div>\n' +
          //               '                    </div>');
          //           // starting the for-loop for rendering the data-rows & the buttons
          //           for (let i = 0; i < globArray.length; i++)
          //           {
          //                 $("#totalHolder").append(`
          //       <!--                   //rendering table row with data (date) in the for_loop-->
          //                   <div class="row data-row" id="dataToDelete">
          //                       <div id='id${i}' hidden class="col border  text-center">0</div>
          //                       <div id='datas${i}' hidden class="col border  text-center">1</div>
          //                       <div id='events${i}'  class="col border  text-center">${globArray[i][2]}</div>
          //                       <div id='person${i}' class="col border  text-center">${globArray[i][3]}</div>
          //                       <div id='thing${i}' class="col border text-center">${globArray[i][4]}</div>
          //                       <div id='locat${i}' class="col border  text-center">${globArray[i][5]}</div>
          //                   </div>
          //       <!--            rendering table row with buttons in the for_loop-->
          //                   <div class="row data-row" id="buttonsToDelete">
          //                       <div hidden class="col border p-2 text-center"><a id='id-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                       <div hidden class="col border p-2 text-center"><a id='datas-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                       <div class="col border p-2 text-center"><a id='events-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                       <div class="col border p-2 text-center"><a id='person-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                       <div class="col border p-2 text-center"><a id='thing-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                       <div class="col border p-2 text-center"><a id='locat-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
          //                   </div>`);
          //
          //             // adding event-listeners for all buttons. Each button must call its own form for changing data (event, person etc)
          //                 $(`#events-button${i}`).on('click',function (e) {
          //                   e.preventDefault();
          //                   $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
          //                   <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
          //                   <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
          //                   <textarea name="events" id="formArea" cols="100" rows="10">${globArray[i][2]}</textarea>
          //                   <input type="hidden" name="person" id="person-form" value="${globArray[i][3]}" />
          //                   <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
          //                   <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />
          //                   <div class="float-right">
          //                              <a class="btn btn-secondary mb-4 rt5" style="float: right"
          //                                href="#" onclick="ajaxForm('formAct')">Send</a>
          //                         </div>
          //                 </form>`);
          //                 });
          //
          //                 $(`#person-button${i}`).click(function (e) {
          //                   e.preventDefault();
          //                   $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
          //                   <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
          //                   <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
          //                   <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
          //                   <textarea  id="formArea" name="person" cols="100" rows="10">${globArray[i][3]}</textarea>
          //                   <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
          //                   <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />
          //                   <div class="float-right">
          //                              <a class="btn btn-danger mb-4 rt5" style="float: right"
          //                                href="#" onclick="ajaxForm('formAct')">Send</a>
          //                         </div>
          //                 </form>`);
          //                 });
          //
          //                 $(`#thing-button${i}`).on('click',function (e) {
          //                   e.preventDefault();
          //                   $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this);" action="update.php" method="post">
          //                   <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
          //                   <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
          //                   <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
          //                   <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
          //                   <textarea id="formArea" name="thing"  cols="100" rows="10">${globArray[i][4]}</textarea>
          //                   <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />
          //                   <div class="float-right">
          //                              <a class="btn btn-primary mb-4 rt5" style="float: right"
          //                                href="#" onclick="ajaxForm('formAct')">Send</a>
          //                         </div>
          //                 </form>`);
          //                 });
          //
          //                 $(`#locat-button${i}`).on('click',function (e) {
          //                         e.preventDefault();
          //                         $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
          //                         <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
          //                         <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
          //                         <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
          //                         <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
          //                         <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />
          //                         <textarea id="formArea" name="locat"  cols="100" rows="10">${globArray[i][5]}</textarea>
          //                         <div class="float-right">
          //                              <a class="btn btn-primary mb-4 rt5" style="float: right"
          //                                href="#" onclick="ajaxForm('formAct')">Send</a>
          //                         </div>
          //                       </form>`);
          //                 });
          //
          //           }
          // }
          //

          jQuery("#addRow").on('click',function ()
          {
            // sending AJAX-request for creating new Event
                  $.ajax({
                    type: "GET",
                    url: "create.php",
                    data: { eventdate: globalData },
                    success: function (response) {
                      // response = JSON.parse(response);
                      // console.log(response);
                      // $("#selectedDate1").val(response);
                    },
                  });
                // sending AJAX for calling data from DB, then rendering table with Dates, Events etc...
              $.ajax(
                  {
                      type: "GET",
                      datatype: "json",
                      url: "getdata.php",
                      data: { eventdate: globalData },
                      success: function (response) {
                          response = JSON.parse(response);
                          let globArray1 = response;
                          callingArray(globArray1);
                  },
              });
          });

          let eventdate = $("selectedDate").val();
        const searchArray=['event', 'evegt', 'somthng', 'something'];
        // SEARCH-form handler
          $("#button-search").on('click', function ( )
          {
              let inputSearch=$("#inputSearch").val();
              $.ajax(
                  {
                      type: "GET",
                      datatype: "json",
                      url: "search.php",
                      data: { term: inputSearch },
                      success: function (response) {
                          let searchArray = JSON.parse(response);
                          callingArrayWithDate(searchArray);
                      },
                  });
          });

        // AutoComplete function
          $("#inputSearch").autocomplete({
              source: "autocomplete.php",
              minLength: 2,
              delay: 500
          });

});

let allGlobalData;
let allGlobalDate;

// END of $(document).ready   WOOOW  (!!!!!!!!!!!!!!=======================!!!!!!!!!!!!!!!1

// ajaxForm is to handle Send-button onClick. It writes new data te DB
// then clears page and calling 'callingArray'-function to render events-table with newly data
function ajaxForm(form_id)
{
   // console.log('Global data' + allGlobalData);
    let form = $('#' + form_id);
    // form.preventDefault(); // avoid to execute the actual submit of the form.
    let actionUrl = form.attr('action');
    $.ajax({
        type: "POST",
        async: true,
        url: actionUrl,
        data: form.serialize() , // serializes the form's elements.
        success: function(data)   {    }
    });

    $("#form").html('');
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "getdata.php",
        data: { eventdate: allGlobalDate},
        success: function (response) {
            response = JSON.parse(response);
            let globArray1 = response;
            callingArray(globArray1);
        },
    });
}


// rendering table with events, person etc
function callingArray(globArray) {
    //rendering table-header
    $("#totalHolder").html('<div class="row">\n' +
        '                        <div hidden class="col border text-center">ID</div>\n' +
        '                        <div hidden class="col border text-center">Datas</div>\n' +
        '                        <div class="col border text-center">Событие</div>\n' +
        '                        <div class="col border text-center">Персона</div>\n' +
        '                        <div class="col border text-center">Предмет</div>\n' +
        '                        <div class="col border text-center">Территория</div>\n' +
        '                        <div class="col border text-center">Книга</div>' +
        '                        <div class="col border text-center">Превью</div>' +
        '                        <div hidden class="col border text-center">Картинка</div>       ' +
        '  </div>');
    // starting the for-loop for rendering the data-rows & the buttons
    for (let i = 0; i < globArray.length; i++)
    {
        $("#totalHolder").append(`
                <!--                   //rendering table row with data (date) in the for_loop-->
                            <div class="row data-row" id="dataToDelete">  
                                <div id='id${i}' hidden id='clip' class="col border  text-center">0</div>
                                <div id='datas${i}' hidden  id='clip' class="col border  text-center">1</div>
                                <div id='events${i}'  id='clip'  class="col border  text-center">${globArray[i][2]}</div>
                                <div id='person${i}'  id='clip' class="col border  text-center">${globArray[i][3]}</div>
                                <div id='thing${i}' id='clip'  class="col border text-center">${globArray[i][4]}</div>
                                <div id='locat${i}'  id='clip' class="col border  text-center">${globArray[i][5]}</div>
                                <div id='book${i}' id='clip'  class="col border  text-center">${globArray[i][6]}</div>
                                <div id='thumb${i}'  id='clip' class="col border  text-center"> <img src="${globArray[i][7]}"></div>
                                <div id='img${i}'  id='clip' hidden class="col border  text-center">${globArray[i][8]}</div>
                            </div>
                <!--            rendering table row with buttons in the for_loop-->
                            <div class="row data-row" id="buttonsToDelete">
                                <div hidden class="col border p-2 text-center"><a id='id-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div hidden class="col border p-2 text-center"><a id='datas-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='events-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='person-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='thing-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='locat-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='book-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='thumb-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div hidden class="col border p-2 text-center"><a id='img-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                            </div>`);

        // adding event-listeners for all buttons. Each button must call its own form for changing data (event, person etc)
        $(`#events-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />        
                            <textarea name="events" id="formArea" cols="100" rows="10">${globArray[i][2]}</textarea>        
                            <input type="hidden" name="person" id="person-form" value="${globArray[i][3]}" />        
                            <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />  
                            <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                            <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                            <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" />        
                            <div class="float-right">                  
                                       <a class="btn btn-secondary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#person-button${i}`).click(function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                            <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                            <textarea  id="formArea" name="person" cols="100" rows="10">${globArray[i][3]}</textarea>
                            <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />  
                            <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                            <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                            <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                            <div class="float-right">                  
                                       <a class="btn btn-danger mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#thing-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this);" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                            <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                            <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                            <textarea id="formArea" name="thing"  cols="100" rows="10">${globArray[i][4]}</textarea>
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />   
                            <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                            <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                            <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" />    
                            <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#locat-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                  <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                  <textarea id="formArea" name="locat"  cols="100" rows="10">${globArray[i][5]}</textarea>
                                  <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                                  <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                                  <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                                  <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                                </form>`);
        });

        $(`#book-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                  <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                   <input type="hidden" name="locat" id="book-form" value="${globArray[i][5]}" /> 
                                  <textarea id="formArea" name="book"  cols="100" rows="10">${globArray[i][6]}</textarea>
                                  <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                                  <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                                  <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                                </form>`);
        });

        $(`#thumb-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                  <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                  <input type="hidden" name="locat"  cols="100" rows="10" value="${globArray[i][5]}"/>
                                  <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                                  <img style="height: 500px; width: 200px;" src="${globArray[i][8]}"><br>
                                   <input type="file" name="img" id="thumb-form" placeholder="Change file" " />                           
                                  <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                                  <div class="float-right">                  
                                       <a class="btn btn-danger mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send picture</a>                  
                                  </div>
                                </form>`);
        });
    }
}

//renders the same + Date-column (it is used for Search-form)
function callingArrayWithDate(globArray) {
    //rendering table-header
    $("#totalHolder").html('<div class="row">\n' +
        '                        <div hidden class="col border text-center">ID</div>\n' +
        '                        <div  class="col border text-center">Дата</div>\n' +
        '                        <div class="col border text-center">Событие</div>\n' +
        '                        <div class="col border text-center">Персона</div>\n' +
        '                        <div class="col border text-center">Предмет</div>\n' +
        '                        <div class="col border text-center">Территория</div>' +
                                '<div class="col border text-center">Книга</div>' +
                                '<div class="col border text-center">Превью</div>\n' +
        '                    </div>');
    // starting the for-loop for rendering the data-rows & the buttons
    for (let i = 0; i < globArray.length; i++)
    {
        $("#totalHolder").append(`
                <!--                   //rendering table row with data (date) in the for_loop-->
                            <div class="row data-row" id="dataToDelete">  
                                <div id='id${i}' id='clip'  hidden class="col border  text-center">0</div>
                                <div id='datas${i}'  id='clip'  class="col border  text-center">${globArray[i][1]}</div>
                                <div id='events${i}'  id='clip'  class="col border  text-center">${globArray[i][2]}</div>
                                <div id='person${i}' id='clip'  class="col border  text-center">${globArray[i][3]}</div>
                                <div id='thing${i}'  id='clip' class="col border text-center">${globArray[i][4]}</div>
                                <div id='locat${i}'  id='clip' class="col border  text-center">${globArray[i][5]}</div>
                                <div id='book${i}' id='clip'  class="col border  text-center">${globArray[i][6]}</div>
                                <div id='thumb${i}'  id='clip' class="col border  text-center"> <img src="${globArray[i][7]}"></div>
                                <div id='img${i}' id='clip'  hidden class="col border  text-center">${globArray[i][8]}</div>
                            </div>
                <!--            rendering table row with buttons in the for_loop-->
                            <div class="row data-row" id="buttonsToDelete">
                                <div hidden class="col border p-2 text-center"><a id='id-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div  class="col border p-2 text-center"><button class="btn btn-primary">Изменить</button></div>
                                <div class="col border p-2 text-center"><a id='events-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='person-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='thing-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='locat-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='book-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='thumb-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div hidden class="col border p-2 text-center"><a id='img-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                            </div>`);

        // adding event-listeners for all buttons. Each button must call its own form for changing data (event, person etc)
        $(`#events-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />        
                            <textarea name="events" id="formArea" cols="100" rows="10">${globArray[i][2]}</textarea>        
                            <input type="hidden" name="person" id="person-form" value="${globArray[i][3]}" />        
                            <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />        
                            <div class="float-right">                  
                                       <a class="btn btn-secondary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#person-button${i}`).click(function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                            <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                            <textarea  id="formArea" name="person" cols="100" rows="10">${globArray[i][3]}</textarea>
                            <input type="hidden" name="thing" id="thing-form" value="${globArray[i][4]}" />
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />        
                            <div class="float-right">                  
                                       <a class="btn btn-danger mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#thing-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this);" action="update.php" method="post">
                            <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                            <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                            <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                            <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                            <textarea id="formArea" name="thing"  cols="100" rows="10">${globArray[i][4]}</textarea>
                            <input type="hidden" name="locat" id="locat-form" value="${globArray[i][5]}" />        
                            <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                          </form>`);
        });

        $(`#locat-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                  <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                  <textarea id="formArea" name="locat"  cols="100" rows="10">${globArray[i][5]}</textarea>
                                  <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                                </form>`);
        });
        $(`#book-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                  <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                   <input type="hidden" name="locat" id="book-form" value="${globArray[i][5]}" /> 
                                  <textarea id="formArea" name="book"  cols="100" rows="10">${globArray[i][6]}</textarea>
                                  <input type="hidden" name="thumb" id="thumb-form" value="${globArray[i][7]}" />  
                                  <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                                  
                                  <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                                </form>`);
        });
        $(`#thumb-button${i}`).on('click',function (e) {
            e.preventDefault();
            $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
                                 <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
                                  <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
                                  <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
                                  <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
                                  <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />  
                                  <input type="hidden" name="locat"  cols="100" rows="10" value="${globArray[i][5]}"/>
                                  <input type="hidden" name="book" id="book-form" value="${globArray[i][6]}" />  
                                  <img style="height: 500px; width: 200px;" src="${globArray[i][8]}"><br>
                                   <input type="file" name="img" id="thumb-form" placeholder="Change file" " />                           
                                  <input type="hidden" name="img" id="img-form" value="${globArray[i][8]}" /> 
                                  <div class="float-right">                  
                                       <a class="btn btn-primary mb-4 rt5" style="float: right" 
                                         href="#" onclick="ajaxForm('formAct')">Send</a>                  
                                  </div>
                                </form>`);
        });
        // $(`#img-button${i}`).on('click',function (e) {
        //     e.preventDefault();
        //     $("#form").html(`<form id="formAct" onsubmit="return ajaxForm(this)" action="update.php" method="post">
        //                           <input type="hidden" name="id" id="id-form" value="${globArray[i][0]}" />
        //                           <input type="hidden" name="datas" id="datas-form" value="${globArray[i][1]}" />
        //                           <input type="hidden" name="events" id="person-form" value="${globArray[i][2]}" />
        //                           <input type="hidden" name="person" id="thing-form" value="${globArray[i][3]}" />
        //                           <input type="hidden" name="thing" id="locat-form" value="${globArray[i][4]}" />
        //                           <textarea id="formArea" name="locat"  cols="100" rows="10">${globArray[i][5]}</textarea>
        //                           <div class="float-right">
        //                                <a class="btn btn-primary mb-4 rt5" style="float: right"
        //                                  href="#" onclick="ajaxForm('formAct')">Send</a>
        //                           </div>
        //                         </form>`);
       // });

    }
}

// TODO
//1 - дописать рендер с учётом новых столбцов стр 291, дописать рендер кнопок
//2 - переписать рендер стр 394 - страница поиска