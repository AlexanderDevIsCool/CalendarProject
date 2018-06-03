var list = null;
var subject_count = null;

$(document).ready(function() {
    list = document.getElementById('subjects-list');

    var hidden_information = document.getElementById('hidden-information');
    hidden_information.style.display = 'none';

    if($.trim($("#subjects-list").html())===''){
        subject_count = 0;
    } else {
        var last_chld = list.lastChild;
        subject_count = last_chld.getAttribute('id');
    }

    $('#subject-add').on('click', function(){
        subject_count++;
        var li = document.createElement("li");
        var element = hidden_information.cloneNode(true);


        element.setAttribute('id', '' + subject_count);
        element.style.display = 'block';

        var childrens = element.childNodes;

        li.appendChild(element);
        list.appendChild(li);
        list.appendChild(document.createElement('br'));

        $(childrens[7]).on('click', function(){
            var sub_id = childrens[1];
            var teach_id = childrens[3];
            var cl_id = document.getElementsByClassName('container');
            alert('B: ' + cl_id[0].id);
            $.ajax({
                url: '/day',
                type: 'POST',
                data: { days: {
                        subjects_id: sub_id.options[sub_id.selectedIndex].value,
                        teachers_id: teach_id.options[sub_id.selectedIndex].value,
                        calendars_id: cl_id[0].id} }
            });
        });
    });




    var arr = [0,1,2];
    $('#calendar-send-btn').on('click', function () {
        if(confirm('r u sure ?')) {
            $.ajax({
                url: '/calendars',
                type: 'POST',
                data: {day: { teachers_id: arr }},
                success: function (r) {

                }
            });
        }
    });

});