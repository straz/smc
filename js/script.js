$(document).ready(init);

function init(){
  $('.posts li p').append('&hellip;');
  if (version == 1){
    label_cols();
  }
}

function label_cols(){
  $('article > table td').attr('align', 'right');
  var headers = $('article > table > tbody>tr:first > td');
  replace_tags(headers, 'th');
  $('article > table tr:nth-child(odd)').filter(':has(td)').addClass('odd');
  var today = find_column(headers,'Today')+1;
  var rows = $('article > table > tbody > tr');
  rows.each(function(){label_row(this, today);});
}

function label_row(row, start_column){
  $(row).find('td:nth-child('+start_column+')')
    .each(updown_color);
  $(row).find('td:nth-child('+(start_column+1)+')')
    .each(make_wide).each(updown_color).each(add_arrow);
}

function make_wide(){
  var text = $(this).text();
  $(this).html($('<div/>').text(text).css('width', '7em'));
}

function add_arrow(){
  var dir = $(this).attr('dir');
  var gif;
  if (dir == 1){
    gif = '/assets/uparrow.gif';
  } else {
    gif = '/assets/downarrow.gif';
  }
  $(this).find('div').append($('<img/>').attr('src', gif));
}

function updown_color(){
  var cell = $(this);
  var text = cell.text();
  if (text.indexOf("-") > -1){
    cell.css('color', 'red').attr('dir', -1);
  } else {
    cell.css('color', 'green').attr('dir',1);
  }
}

// replaces 'td' with 'th' tags
function replace_tags(set, new_tag){
  set.each(function(index){
	     var old = $(this);
	     var newElt = $('<th/>');
	     $(newElt).html($(old).html());
	     $(old).after(newElt).remove();
	   });
}

// returns index of col named "Today's change"
function find_column(set, label){
  var found = -1;
  set.filter(function(index){
	       if ($(this).text().substring(0,label.length) == label){
		 found = index;
		 return;
	       }
	     });
  return found;
}
