// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
})();



//check to see new entry whenever key is released
$('.flexsearch-input').keyup(function(event){
  var api = 'http://www.mattbowytz.com/simple_api.json?data=all';
  var output = '';
  var current_input = $('.flexsearch-input').val().toLowerCase();
  if(current_input.length >= 1){
    $.ajax({
      dataType: 'json',
      url: api,
      success: function(data){
        $.each(data.data, function(key, subject){
          $.each(subject, function(key2, value){
            valueNoCase = value.toLowerCase();
            if(valueNoCase.indexOf(current_input) != -1){
              output += "<button class=autofill-box onclick=autofill(this) value='"+ value + "'>"+ value +"</button>";
            }
          });
        });
        $('.autocomplete').html(output);
      },
      error: function(){
        console.log("Error getting api");
      }
    });
  }
  else{
    $('.autocomplete').html(output);
  }
});

function autofill(button){
  $('.flexsearch-input').val(button.value);
  window.open('http://www.google.com/search?q=' + button.value,'_blank');
}

$('.flexsearch').submit(function(event){
  event.preventDefault();
  var input = $('.flexsearch-input').val();
  window.open('http://www.google.com/search?q=' + input,'_blank');
});
