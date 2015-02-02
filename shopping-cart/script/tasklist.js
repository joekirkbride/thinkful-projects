$('.inputbox').keypress(function(e) {
    if(e.which == 13) {
    	var itemtext = $.trim($(this).val());
    	$(this).val('');
        if (!itemtext || itemtext.length == 0)
        {
        	// do nothing
	        // alert('empty string');
        }
        else
        {
        	addItemToList(itemtext, '#activelist', 'activeitem','box', '-');
        	addCheckBoxEvent();
        	// addButtonEventDeleteTask();
        	// var newitem = '<li><div class="listitem"><div class="activeitem"><input class="'+'box'+'" type="checkbox"><span class="item">' + itemvalue + '</span><button class="itembtn">-</button></div></div></li>';
        	// $('.activelist').append(newitem);
        	// addCheckBoxEvent();
        	// addButtonEvent();
        	// alert(itemvalue.length);
        }
    }
});

// add an item to given list
function addItemToList (itemvalue, listname, itemclass, checkboxclass, btntext) {
	var newitem = '<li><div class="listitem"><div class="' + itemclass + '"><input class="' + checkboxclass + '" type="checkbox"><span class="item">' + itemvalue + '</span><button class="itembtn">' + btntext + '</button></div></div></li>';
    $(listname).append(newitem);
};



// listen for checkbox, then swap css class
function addCheckBoxEvent () {
	$('.box').on('click', function() {
		if ($(this).is(':checked'))
		{ // task completed, deactivate
			$(this).parent().removeClass('activeitem').addClass('disableitem');
			$(this).siblings('.item').css('text-decoration', 'line-through');
		}
		else
		{ // item to do
			$(this).parent().removeClass('disableitem').addClass('activeitem');
			$(this).siblings('.item').css('text-decoration', 'none');
		}
	});
};

// $('ul').on('click', 'li', function(event){
// 	alert('click');
//   // fires when any LIs are clicked on
//   // including LIs that aren't on the page when it is initially loaded
// });
$('#deletedlist').on('click', 'button', function () {
	var itemtext = $(this).siblings('.item').text();
	$(this).parents('li').remove();
	addItemToList(itemtext, '#activelist', 'activeitem', 'box', '-');
    addCheckBoxEvent();
});

$('#activelist').on('click', 'button', function () {
	var itemtext = $(this).siblings('.item').text();
	$(this).parents('li').remove();
	addItemToList(itemtext, '#deletedlist', 'deleteditem', 'box hidden', '+');
});

//$('#activelist').on('click', 'button', function () {alert('btn click');})

// function addButtonEventDeleteTask() {
// 	$('div').children('button').on('click', function() {
// 		var itemtext = $(this).siblings('.item').text();;
// 		$(this).parents('li').remove();
// 		addItemToList(itemtext, '.deletedlist', 'deleteditem', 'box hidden', '+');
// 		addButtonEventRestoreTask();
// 	});
// };

// function addButtonEventRestoreTask() {
// 	$('div').children('button').on('click', function() {
// 		var itemtext = $(this).siblings('.item').text();
// 		$(this).parents('li').remove();
// 		addItemToList(itemtext, '.activelist', 'activeitem', 'box', '-');
//         addCheckBoxEvent();
// 		addButtonEventDeleteTask();
// 	});
// };

// listen for button
// function addButtonEvent() {
// 	$('div').children('button').on('click', function() {
// 		var itemtext = $(this).siblings('.item').text();
// 		var listname = $(this).parents('ul').attr('class');
// 		// alert(foobar + " " + listname);
// 		$(this).parents('li').remove();
// 		if (listname == "activelist")
// 		{
// 			addItemToList(itemtext, '.deletedlist', 'deleteditem', 'box hidden', '+');
// 		}
// 		else
// 		{
// 			addItemToList(itemtext, '.activelist','activeitem', 'box', '-');
// 			addCheckBoxEvent();
// 		}
// 	});
// };