var list = null;
var ready;

ready = function() {

    $(document).on ("click", '#subject-add', function () {
        list = document.getElementById('subjects-list');

        var hidden_information = document.getElementById('hidden-information');

        var li = document.createElement("li");
        var element = hidden_information.cloneNode(true);


        element.setAttribute('id', '');
        element.style.display = 'block';

        li.appendChild(element);
        list.appendChild(li);


        var childrens = element.childNodes[5].childNodes;


        $(childrens[1]).on('click', function(){
            if($(this).is('save-item-edit')) {
                e.preventDefault();
            } else if('' + childrens[3] === 'undefined') {
                    var parent = this.parentElement.parentElement.id;
                    if((typeof parent !== 'undefined') &&
                        parent.isEmptyObject && parent != null && parent !== '') {
                        $.ajax({
                            url: '/day',
                            type: 'DELETE',
                            data: {
                                subjects_id: parent
                            }
                        });
                    }
                    this.parentElement.parentElement.parentElement.remove();

            } else {
                var childa = this.parentElement.parentElement.childNodes;
                var sub_id = childa[1];
                var teach_id = childa[3];
                var arr = [[],[],[]];
                var cl_id = document.getElementsByClassName('subjects-container');
                arr[0].push(cl_id[0].id);
                arr[1].push(sub_id.value);
                arr[2].push(teach_id.value);
                $.ajax({
                    url: '/day/' + this.parentElement.parentElement.id,
                    type: 'POST',
                    data: {day: {data_ids: arr}}
                });
                $.ajax({
                    url: '/ajax_for_day?id=' + cl_id[0].id,
                    type: 'GET',
                    dataType: 'script',
                });

                this.setAttribute('id', 'save-item-edit');
            }
        });

    });

    $(document).on ("click", '#save-item-edit', function () {
            var childa = this.parentElement.parentElement.childNodes;
            var sub_id = childa[1];
            var teach_id = childa[3];
            var arr = [[],[],[]];
            var cl_id = document.getElementsByClassName('subjects-container');
            arr[0].push(cl_id[0].id);
            arr[1].push(sub_id.value);
            arr[2].push(teach_id.value);
            $.ajax({
                url: '/day/' + this.parentElement.parentElement.id,
                type: 'PATCH',
                data: {day: {data_ids: arr}}
            });
    });

    $(document).on ("click", '#delete-item', function () {
        if(confirm('are you sure ?')) {
            var parent = this.parentElement.parentElement.id;
            if((typeof parent !== 'undefined') &&
                parent != null && parent !== '') {
                $.ajax({
                    url: '/day/' + parent,
                    type: 'DELETE'
                });
            }
            this.parentElement.parentElement.parentElement.remove();
        }
    });

    $(document).on('click', '#calendar-send-btn', function(){
            var arr = [[], [], []];
            var sub_list = document.getElementById('subjects-list');
            var sub_container = sub_list.parentElement;
            var sub_list_length = sub_list.childElementCount;
            for (var i = 0; i < sub_list_length; i += 1) {
                var li = sub_list.childNodes[i].childNodes[0].childNodes[1];
                    arr[0].push(
                        sub_container.id
                    );
                    arr[1].push(
                        li.childNodes[1].value
                    );
                    arr[2].push(
                        li.childNodes[3].value
                    );

            }
            $.ajax({
                url: '/day',
                type: 'POST',
                data: {day: {data_ids: arr}},
            });
    });

    $(document).on('click', '#calendar-delete-btn', function() {
        if(confirm('are you sure ?')) {
            var cl_id = document.getElementsByClassName('subjects-container');
            $.ajax({
                url: '/calendars/' + cl_id[0].id,
                type: 'DELETE',
                success: function (r) {

                }
            });
        }
    });

    $(document).on('click', '.lodgingComboSubjects', function(){
        $(".lodgingComboSubjects").each(function() {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });

    $(document).on('click', '.lodgingComboTeachers', function() {
        $(".lodgingComboTeachers").each(function () {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });
};
$(document).ready(ready);
$(document).on('page:load', ready);