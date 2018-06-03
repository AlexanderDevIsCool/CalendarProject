var list = null;
$(document).ready(function() {
    list = document.getElementById('subjects-list');

    var hidden_information = document.getElementById('hidden-information');

    $('#subject-add').on('click', function(){
        var li = document.createElement("li");
        var element = hidden_information.cloneNode(true);


        element.setAttribute('id', '');
        element.style.display = 'block';

        var childrens = element.childNodes;

        li.appendChild(element);
        list.appendChild(li);
        list.appendChild(document.createElement('br'));

        $(childrens[7]).on('click', function(){
            var sub_id = childrens[1];
            var teach_id = childrens[3];
            var cl_id = document.getElementsByClassName('subjects-container');
            $.ajax({
                url: '/day',
                type: 'POST',
                data: { day: {
                        subjects_id: sub_id.options[sub_id.selectedIndex].value,
                        teachers_id: teach_id.options[sub_id.selectedIndex].value,
                        calendars_id: cl_id[0].id} }
            });
        });

        $(childrens[9]).on('click',function(){
            if(confirm('r u sure ?')) {
                var parent = this.parentElement.id;
                if((typeof parent !== 'undefined') &&
                    parent.isEmptyObject && parent != null && parent !== '') {
                    $.ajax({
                        url: '/day',
                        type: 'DELETE',
                        data: {
                            subjects_id: $(this).parent().id
                        }
                    });
                }
                this.parentElement.parentElement.remove();
            }
        });
    });


    $(document).on ("click", '#save-item', function () {
        var childa = this.parentElement.childNodes;
        var sub_id = childa[1];
        var teach_id = childa[3];
        var cl_id = document.getElementsByClassName('subjects-container');
        $.ajax({
            url: '/day',
            type: 'POST',
            data: { day: {
                    subjects_id: sub_id.options[sub_id.selectedIndex].value,
                    teachers_id: teach_id.options[sub_id.selectedIndex].value,
                    calendars_id: cl_id[0].id} }
        });
    });

    $(document).on ("click", '#delete-item', function () {
        if(confirm('r u sure ?')) {
            var parent = this.parentElement.id;
            if((typeof parent !== 'undefined') &&
                parent != null && parent !== '') {
                $.ajax({
                    url: '/day/' + this.parentElement.id,
                    type: 'DELETE'
                });
            }
            this.parentElement.parentElement.remove();
        }
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

    $('#calendar-delete-btn').on('click', function(){
        if(confirm('r u sure ?')) {
            var cl_id = document.getElementsByClassName('subjects-container');
            $.ajax({
                url: '/calendars/' + cl_id[0].id,
                type: 'DELETE',
                success: function (r) {

                }
            });
        }
    });

});