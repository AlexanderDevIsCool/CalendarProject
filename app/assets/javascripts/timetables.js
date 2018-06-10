var ready;
var input_list = null;
var li_days = null;
var ol_days = null;

ready = function () {

    $(document).on('click', '.subject-timetable-add', function () {
        hidden_elem = document.getElementById("hidden-information-timetable");
        input_list = hidden_elem.cloneNode(true);
        input_list.style.display = 'block';
        input_list.setAttribute('id', '');

        ol_days = this.parentElement.childNodes[1];
        li_days = document.createElement('li');

        li_days.appendChild(input_list);
        ol_days.appendChild(li_days);

        $(input_list.childNodes[7]).on('click', function () {
            this.parentElement.parentElement.remove();
        });


        $('#calendar-timetable-send-btn').addClass('dynamically');
        $('#calendar-timetable-send-btn-edit').addClass('dynamically');

        $(document).on('click', '#calendar-timetable-send-btn', function (e) {
            if (this.id === 'calendar-timetable-send-btn-prevent') {
                e.preventDefault();
            } else {
                if ($(this).hasClass('dynamically')) {
                    var arr = [[], [], [], [], []];
                    var divs = document.getElementsByClassName('days-of-week');
                    for (var i = 0; i < 5; i += 1) {
                        var ol = divs[i].childNodes[3].childNodes[1];
                        for (var a = 0; a < ol.childNodes.length; a += 1) {
                            if (!(ol.childNodes[a] instanceof HTMLLIElement))
                                continue;
                            var div = ol.childNodes[a].childNodes[0];
                            if (a === 1)
                                div = ol.childNodes[a].childNodes[1];
                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);
                        }
                    }
                    $.ajax({
                        url: '/timetable_create',
                        type: 'POST',
                        data: {day: {time_table_id: divs[0].id, timetable_ids: arr}},
                    });
                    this.setAttribute('id', 'calendar-timetable-send-btn-prevent');
                }
            }
        });

        $(document).on('click', '#calendar-timetable-send-btn-edit', function (e) {
            if (this.id === 'calendar-timetable-send-btn-edit-prevent') {
                e.preventDefault();
            } else {
                if ($(this).hasClass('dynamically')) {
                    var arr = [[], [], [], [], []];
                    var divs = document.getElementsByClassName('days-of-week');
                    for (var i = 0; i < 5; i += 1) {
                        var ol = divs[i].childNodes[3].childNodes[1];
                        for (var a = 0; a < ol.childNodes.length; a += 1) {
                            if (!(ol.childNodes[a] instanceof HTMLLIElement))
                                continue;
                            var div = ol.childNodes[a].childNodes[0];
                            if (!(ol.childNodes[a].childNodes[0] instanceof HTMLDivElement))
                                div = ol.childNodes[a].childNodes[1];
                            alert('div? : ' + div);
                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);
                        }
                    }
                    $.ajax({
                        url: '/timetable_edit',
                        type: 'POST',
                        data: {day: {time_table_id: divs[0].id, timetable_ids: arr}},
                    });
                    this.setAttribute('id', 'calendar-timetable-send-btn-edit-prevent');
                }
            }
        });

    });

    $(document).on('click', '#delete-timetable-item', function () {
        this.parentElement.parentElement.remove();
    });

    $(document).on('click', '.calendar-timetable-delete-btn', function () {
        if (confirm('are you sure ?')) {
            $.ajax({
                url: this.id,
                type: 'DELETE'
            });
        }
    });

    $(document).on('click', '#calendar-timetable-send-btn', function (e) {
        if (this.id === 'calendar-timetable-send-btn-prevent') {
            e.preventDefault();
        } else {
            if (!$(this).hasClass('dynamically')) {
                var arr = [[], [], [], [], []];
                var divs = document.getElementsByClassName('days-of-week');
                for (var i = 0; i < 5; i += 1) {
                    var ol = divs[i].childNodes[3].childNodes[1];
                    for (var a = 0; a < ol.childNodes.length; a += 1) {
                        if (!(ol.childNodes[a] instanceof HTMLLIElement))
                            continue;
                        var div = ol.childNodes[a].childNodes[0];
                        if (a === 1)
                            div = ol.childNodes[a].childNodes[1];
                        arr[i].push(div.childNodes[1].value);
                        arr[i].push(div.childNodes[3].value);
                        arr[i].push(div.childNodes[5].value);
                    }
                }
                $.ajax({
                    url: '/timetable_create',
                    type: 'POST',
                    data: {day: {time_table_id: divs[0].id, timetable_ids: arr}},
                });
                this.setAttribute('id', 'calendar-timetable-send-btn-prevent');
            }
        }
    });

    $(document).on('click', '#calendar-timetable-send-btn-edit', function (e) {
        if (this.id === 'calendar-timetable-send-btn-edit-prevent') {
            e.preventDefault();
        } else {
            if (!$(this).hasClass('dynamically')) {
                var arr = [[], [], [], [], []];
                var divs = document.getElementsByClassName('days-of-week');
                for (var i = 0; i < 5; i += 1) {
                    var ol = divs[i].childNodes[3].childNodes[1];
                    for (var a = 0; a < ol.childNodes.length; a += 1) {
                        if (!(ol.childNodes[a] instanceof HTMLLIElement))
                            continue;
                        var div = ol.childNodes[a].childNodes[0];
                        if (a === 1)
                            div = ol.childNodes[a].childNodes[1];
                        alert(div.childNodes[0]);
                        alert(div.childNodes[1]);
                        alert(div.childNodes[2]);
                        alert(div.childNodes[3]);
                        arr[i].push(div.childNodes[1].value);
                        arr[i].push(div.childNodes[3].value);
                        arr[i].push(div.childNodes[5].value);
                    }
                }
                $.ajax({
                    url: '/timetable_edit',
                    type: 'POST',
                    data: {day: {time_table_id: divs[0].id, timetable_ids: arr}},
                });
                this.setAttribute('id', 'calendar-timetable-send-btn-edit-prevent');
            }
        }
    });


    $(document).on('click', '.lodgingComboSubjects', function () {
        $(".lodgingComboSubjects").each(function () {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });

    $(document).on('click', '.lodgingComboTeachers', function () {
        $(".lodgingComboTeachers").each(function () {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });
};
$(document).ready(ready);
$(document).on('page:load', ready);