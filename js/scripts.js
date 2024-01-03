jQuery(document).ready(function () {
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

  $("#datepicker").datepicker({
    onSelect: function () {
      var jsDate = $("#datepicker").datepicker("getDate");

      let jDate = new Date(jsDate);
      let day = jDate.getDate();
      let month = jDate.getMonth() + 1;
      let year = jDate.getFullYear();
      let eventDate = year + "-" + month + "-" + day;
      console.log(eventDate);
      //console.log(jsDate);
      $("#selectedDate").val(eventDate);

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
    for (let i = 0; i < globArray.length; i++) {
      $("#totalHolder").append(`
        <div class="row data-row">
            <div id='id${i}' hidden class="col border  text-center">0</div>
            <div id='datas${i}' hidden class="col border  text-center">1</div>
            <div id='events${i}'  class="col border  text-center">${globArray[i][2]}</div>
            <div id='person${i}' class="col border  text-center">${globArray[i][3]}</div>
            <div id='thing${i}' class="col border text-center">${globArray[i][4]}</div>
            <div id='locat${i}' class="col border  text-center">${globArray[i][5]}</div>
        </div>
        <div class="row data-row">
            <div hidden class="col border p-2 text-center"><a id='id-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
            <div hidden class="col border p-2 text-center"><a id='datas-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
            <div class="col border p-2 text-center"><a id='events-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
            <div class="col border p-2 text-center"><a id='person-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
            <div class="col border p-2 text-center"><a id='thing-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
            <div class="col border p-2 text-center"><a id='locat-button${i}' href=''><button class="btn btn-primary">Изменить</button></a></div>
        </div>`);

      $(`#events-button${i}`).click(function (e) {
        e.preventDefault();
        $("#exampleFormControlTextarea1").text(globArray[i][2]);
        let textValEvent = $("#exampleFormControlTextarea1").val();
        $("#saveChanges").attr(
          "href",
          `http://localhost:5501/total/update.php?id=${globArray[i][0]}&datas=${globArray[i][1]}&events=${textValEvent}&person=${globArray[i][3]}&thing=${globArray[i][4]}&locat=${globArray[i][5]}`
        );
      });

      $(`#person-button${i}`).click(function (e) {
        e.preventDefault();
        $("#exampleFormControlTextarea1").text(globArray[i][3]);
        let textValEvent = $("#exampleFormControlTextarea1").val();
        $("#saveChanges").attr(
          "href",
          `http://localhost:5501/total/update.php?id=${globArray[i][0]}&datas=${globArray[i][1]}&events=${globArray[i][2]}&person=${textValEvent}&thing=${globArray[i][4]}&locat=${globArray[i][5]}`
        );
      });

      $(`#thing-button${i}`).click(function (e) {
        e.preventDefault();
        $("#exampleFormControlTextarea1").text(globArray[i][4]);
        let textValEvent = $("#exampleFormControlTextarea1").val();
        $("#saveChanges").attr(
          "href",
          `http://localhost:5501/total/update.php?id=${globArray[i][0]}&datas=${globArray[i][1]}&events=${globArray[i][2]}&person=${globArray[i][3]}&thing=${textValEvent}&locat=${globArray[i][5]}`
        );
      });

      $(`#locat-button${i}`).click(function (e) {
        e.preventDefault();
        // $("#exampleFormControlTextarea1").attr("placeholder", globArray[i][5]);
        // let textValEvent = $("#exampleFormControlTextarea1").val();
        $("#saveChanges").attr(
          "href",
          `http://localhost:5501/total/update.php?id=${globArray[i][0]}&datas=${
            globArray[i][1]
          }&events=${globArray[i][2]}&person=${globArray[i][3]}&thing=${
            globArray[i][4]
          }&locat=${$("#exampleFormControlTextarea1").val()}`
        );
      });
    }
  }
  jQuery("#addRow").click(function () {
    jQuery(".data-row").clone().appendTo("#dataHolder").removeClass("data-row");
  });

  let eventdate = $("selectedDate").val();
});
