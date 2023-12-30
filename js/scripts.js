jQuery(document).ready(function () {
 

    
    $(function() {
        $("#datepicker").datepicker();
    });

    $("#datepicker").datepicker({
        onSelect: function() {
            var jsDate = $('#datepicker').datepicker('getDate');

            // jsDate instanceof Date; // -> true
            // jsDate.getDate();
            // jsDate.getMonth();
            // jsDate.getFullYear();
            let jDate = new Date(jsDate);
            let day = jDate.getDate();
            let month = jDate.getMonth();
            let year = jDate.getFullYear();
            let eventDate = year + '-' + month + '-' + day;
            console.log(eventDate);
            $("#selectedDate").val(eventDate);
        }
    }); 

  jQuery("#addRow").click(function () {
    jQuery(".data-row").clone().appendTo("#dataHolder").removeClass("data-row");
  });

 
