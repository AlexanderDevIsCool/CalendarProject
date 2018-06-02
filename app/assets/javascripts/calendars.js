var list = null;
var subject_count = null;
$(document).ready(function() {
    list = document.getElementById('subjects-list');

    var hidden_information = document.getElementById('hidden-information');
    hidden_information.style.visibility = 'hidden';

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
        element.style.visibility = 'visible';

        li.appendChild(element);
        list.appendChild(li);
        list.appendChild(document.createElement('br'));
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