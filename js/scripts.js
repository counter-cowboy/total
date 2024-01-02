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
          console.log(response + " date");
          $("#selectedDate1").val(response);
          //response.forEach((o) => $("#array").html(o));

          for (let i = 0; i < globArray.length; i++) {
            let innerArrayLength = globArray[i].length;
            for (let j = 0; j < innerArrayLength; j++) {
              $("#array").append(j + " : " + globArray[i][j] + "<br>");
            }
          }
        },
      });
      for (let i = 0; i < globArray.length; i++) {
        let innerArrayLength = globArray[i].length;
        jQuery(".data-row")
          .clone()
          .appendTo("#dataHolder")
          .removeClass("data-row");
        for (let j = 0; j < innerArrayLength; j++) {
          $("#id").text(globArray[i]);
          $("#datas").html(globArray[i][j]);
          $("#events").html(globArray[i][j]);
          $("#person").html(globArray[i][j]);
          $("#thing").text(globArray[i][j]);
          $("#locat").text(globArray[i][j]);
        }
      }
    },
  });

  jQuery("#addRow").click(function () {
    jQuery(".data-row").clone().appendTo("#dataHolder").removeClass("data-row");
  });

  let eventdate = $("selectedDate").val();
});
