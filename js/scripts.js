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

                    // jQuery("#dataToDelete").html();
                    // jQuery("#buttonsToDelete").html();

                    var jsDate = $("#datepicker").datepicker("getDate");

                    let jDate = new Date(jsDate);
                    let day = jDate.getDate();
                    let month = jDate.getMonth() + 1;
                    let year = jDate.getFullYear();
                    let eventDate = year + "-" + month + "-" + day;
                    console.log(eventDate);
                    globalData=eventDate;
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

                        callingArray(globArray);
                      },
                    });
            },
          });

          function callingArray(globArray) {
                      //rendering table-header
                    $("#totalHolder").html('<div class="row">\n' +
                        '                        <div hidden class="col border text-center">ID</div>\n' +
                        '                        <div hidden class="col border text-center">Datas</div>\n' +
                        '                        <div class="col border text-center">Событие</div>\n' +
                        '                        <div class="col border text-center">Персона</div>\n' +
                        '                        <div class="col border text-center">Предмет</div>\n' +
                        '                        <div class="col border text-center">Территория</div>\n' +
                        '                    </div>');
                    // starting the for-loop for rendering the data-rows & the buttons
                    for (let i = 0; i < globArray.length; i++)
                    {
                          $("#totalHolder").append(`
                <!--                   //rendering table row with data (date) in the for_loop-->
                            <div class="row data-row" id="dataToDelete">  
                                <div id='id${i}' hidden class="col border  text-center">0</div>
                                <div id='datas${i}' hidden class="col border  text-center">1</div>
                                <div id='events${i}'  class="col border  text-center">${globArray[i][2]}</div>
                                <div id='person${i}' class="col border  text-center">${globArray[i][3]}</div>
                                <div id='thing${i}' class="col border text-center">${globArray[i][4]}</div>
                                <div id='locat${i}' class="col border  text-center">${globArray[i][5]}</div>
                            </div>
                <!--            rendering table row with buttons in the for_loop-->
                            <div class="row data-row" id="buttonsToDelete">
                                <div hidden class="col border p-2 text-center"><a id='id-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div hidden class="col border p-2 text-center"><a id='datas-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='events-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='person-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='thing-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
                                <div class="col border p-2 text-center"><a id='locat-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
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

                    }
          }


          jQuery("#addRow").on('click',function ()
          {
            // sending AJAX-request for
                  $.ajax({
                    type: "GET",
                    url: "create.php",
                    data: { eventdate: globalData },
                    success: function (response) {
                      response = JSON.parse(response);
                      globArray = response;
                      console.log(response);
                      $("#selectedDate1").val(response);
                      //response.forEach((o) => $("#array").html(o));
                      callingArray(globArray);
                    },
                  });
          });

          let eventdate = $("selectedDate").val();


});

function ajaxForm(form_id)
{
        var form=$('#'+form_id);
        // form.preventDefault(); // avoid to execute the actual submit of the form.
        var actionUrl = form.attr('action');
        $.ajax({
          type: "POST",
          async: true,
          url: actionUrl,
          data: form.serialize() , // serializes the form's elements.
          success: function(data)
          {
            //alert(data);
            // show response from the php script.
          }
        });
  callingArray(globArray);
  $("#form").html('');

}