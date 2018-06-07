import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
var ready;

    flatpickr(".datepicker", {
        altInput: true,
        onChange: function (selectedDates, dateStr, instance) {
            $.ajax({
                url: '/ajax_for_index?date=' + dateStr,
                type: 'GET',
                dataType: 'script',
                success: function (r) {
                }
            });

        },
        onClose: function (selectedDates, dateStr, instance) {

            $('#create-list').on('click', function (e) {
                if ($(this).hasClass('disabled')) {
                    e.preventDefault();
                }
                else {
                    $.ajax({
                        url: '/calendars',
                        type: 'POST',
                        data: {calendar: {date: dateStr}},
                        success: function (r) {
                        }
                    });
                    $(this).addClass('disabled');
                }
            });

            $(document).on('click', '#create-list', function (e) {
                if ($(this).hasClass('disabled')) {
                    e.preventDefault();
                }
                else {
                    $.ajax({
                        url: '/calendars',
                        type: 'POST',
                        data: {calendar: {date: dateStr}},
                        success: function (r) {
                        }
                    });
                    $(this).addClass('disabled');
                }
            });
        }
    });