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
                            if (div.childNodes.length < 12) {

                                arr[i].push(div.childNodes[1].value);
                                arr[i].push(div.childNodes[3].value);
                                arr[i].push(div.childNodes[5].value);

                            } else {

                                arr[i].push(div.childNodes[1].value);
                                arr[i].push(div.childNodes[3].value);
                                arr[i].push(div.childNodes[5].value);

                                arr[i].push('denominator');
                                arr[i].push('denominator');
                                arr[i].push('denominator');

                                arr[i].push(div.childNodes[12].value);
                                arr[i].push(div.childNodes[13].value);
                                arr[i].push(div.childNodes[14].value);

                            }
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
                            if (!(div instanceof HTMLDivElement ))
                                div = ol.childNodes[a].childNodes[1];
                            alert(div);
                            if (div.childNodes.length < 12) {
                                alert('short');
                                arr[i].push(div.childNodes[1].value);
                                arr[i].push(div.childNodes[3].value);
                                arr[i].push(div.childNodes[5].value);

                            } else if (div.childNodes[14] instanceof HTMLInputElement){
                                alert('dynamic');
                                arr[i].push(div.childNodes[1].value);
                                arr[i].push(div.childNodes[3].value);
                                arr[i].push(div.childNodes[5].value);

                                arr[i].push('denominator');
                                arr[i].push('denominator');
                                arr[i].push('denominator');

                                arr[i].push(div.childNodes[12].value);
                                arr[i].push(div.childNodes[13].value);
                                arr[i].push(div.childNodes[14].value);

                            } else {
                                alert('static');
                                arr[i].push(div.childNodes[1].value);
                                arr[i].push(div.childNodes[3].value);
                                arr[i].push(div.childNodes[5].value);

                                arr[i].push('denominator');
                                arr[i].push('denominator');
                                arr[i].push('denominator');

                                arr[i].push(div.childNodes[13].value);
                                arr[i].push(div.childNodes[15].value);
                                arr[i].push(div.childNodes[17].value);
                            }
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
        if (confirm('are you sure 123?')) {
            $.ajax({
                url: '/timetables/' + this.id,
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

                        if (div.childNodes.length < 12) {

                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);

                        } else {

                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);

                            arr[i].push('denominator');
                            arr[i].push('denominator');
                            arr[i].push('denominator');


                            arr[i].push(div.childNodes[12].value);
                            arr[i].push(div.childNodes[13].value);
                            arr[i].push(div.childNodes[14].value);

                        }
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
                        if (div.childNodes.length < 12) {
                            alert('short');
                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);

                        } else if (div.childNodes[14] instanceof HTMLInputElement){
                            alert('dynamic');
                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);

                            arr[i].push('denominator');
                            arr[i].push('denominator');
                            arr[i].push('denominator');

                            arr[i].push(div.childNodes[12].value);
                            arr[i].push(div.childNodes[13].value);
                            arr[i].push(div.childNodes[14].value);

                        } else {
                            alert('static');
                            arr[i].push(div.childNodes[1].value);
                            arr[i].push(div.childNodes[3].value);
                            arr[i].push(div.childNodes[5].value);

                            arr[i].push('denominator');
                            arr[i].push('denominator');
                            arr[i].push('denominator');

                            arr[i].push(div.childNodes[13].value);
                            arr[i].push(div.childNodes[15].value);
                            arr[i].push(div.childNodes[17].value);
                        }
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

    $(document).on('click', '#add-denominator', function () {
        if (!$(this).hasClass('remove')) {
            var subject_d = document.getElementById('subject_denominator').cloneNode(true);
            var teacher_d = document.getElementById('teacher_denominator').cloneNode(true);
            var auditorium_d = document.getElementById('auditorium_denominator').cloneNode(true);

            subject_d.style.display = 'inline';
            teacher_d.style.display = 'inline';
            auditorium_d.style.display = 'inline';

            subject_d.setAttribute('id', '');
            teacher_d.setAttribute('id', '');
            auditorium_d.setAttribute('id', '');

            this.parentElement.appendChild(document.createElement('br'));
            this.parentElement.appendChild(subject_d);
            this.parentElement.appendChild(teacher_d);
            this.parentElement.appendChild(auditorium_d);
            $(this).addClass('remove');
            this.textContent = 'Remove denominator';
        } else {

            this.parentElement.childNodes[14].remove();
            this.parentElement.childNodes[13].remove();
            this.parentElement.childNodes[12].remove();
            this.parentElement.childNodes[11].remove();
            $(this).removeClass('remove');
            this.textContent = 'Add denominator';
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