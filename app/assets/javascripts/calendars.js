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

        $(childrens[5]).on('click', function(){
            if($(this).hasClass('disabled')){
                e.preventDefault();
            } else {
                var childa = this.parentElement.childNodes;
                var sub_id = childa[1];
                var teach_id = childa[3];
                var arr = [[],[],[]];
                var cl_id = document.getElementsByClassName('subjects-container');
                arr[0].push(cl_id[0].id);
                arr[1].push(sub_id.value);
                arr[2].push(teach_id.value);
                $.ajax({
                    url: '/day/' + this.parentElement.id,
                    type: 'POST',
                    data: {day: {data_ids: arr}}
                });
                $.ajax({
                    url: '/ajax_for_day?id=' + cl_id[0].id,
                    type: 'GET',
                    dataType: 'script',
                });

                $(this).addClass('disabled');
            }
        });

        $(childrens[7]).on('click',function(){
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


    $(document).on ("click", '#save-item', function (e) {
        if($(this).hasClass('disabled')){
            e.preventDefault();
        } else {
            var childa = this.parentElement.childNodes;
            var sub_id = childa[1];
            var teach_id = childa[3];
            var arr = [[],[],[]];
            var cl_id = document.getElementsByClassName('subjects-container');
            arr[0].push(cl_id[0].id);
            arr[1].push(sub_id.value);
            arr[2].push(teach_id.value);
            $.ajax({
                url: '/day/' + this.parentElement.id,
                type: 'PATCH',
                data: {day: {data_ids: arr}}
            });
            $(this).addClass('disabled');
            this.setAttribute('id', 'save-item-edit');
        }
    });

    $(document).on ("click", '#save-item-edit', function () {
            var childa = this.parentElement.childNodes;
            var sub_id = childa[1];
            var teach_id = childa[3];
            var arr = [[],[],[]];
            var cl_id = document.getElementsByClassName('subjects-container');
            arr[0].push(cl_id[0].id);
            arr[1].push(sub_id.value);
            arr[2].push(teach_id.value);
            $.ajax({
                url: '/day/' + this.parentElement.id,
                type: 'PATCH',
                data: {day: {data_ids: arr}}
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
            this.parentElement.parentElement.nextElementSibling.remove();
            this.parentElement.parentElement.remove();
        }
    });

    $(document).on('click', '#calendar-send-btn', function(){
            var arr = [[], [], []];
            var sub_list = document.getElementById('subjects-list');
            var sub_container = sub_list.parentElement;
            var sub_list_length = sub_list.childElementCount;
            for (var i = 1; i < sub_list_length; i += 2) {
                var li = sub_list.childNodes[i].childNodes[0];
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

    $(document).on('click', '.lodgingComboSubjects', function(){
        $(".lodgingComboSubjects").each(function() {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });

    $(document).on('click', '.lodgingComboTeachers', function(){
        $(".lodgingComboTeachers").each(function() {
            $(this).autocomplete({
                source: $(this).data('autocomplete-source')
            });
        });
    });

});