import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

flatpickr(".datepicker", {
    altInput: true,
    onChange: function(selectedDates, dateStr, instance) {

    },
    onClose: function(selectedDates, dateStr, instance) {
        $('#create-list').on('click', function(){
                $.ajax({
                    url: '/calendars',
                    type: 'POST',
                    data: {calendar: { date: dateStr }},
                    success: function (r) {

                    }
                });
        });
    }
});
