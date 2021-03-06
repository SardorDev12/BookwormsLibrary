$(document).ready(function(){  

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });

  $('li.to-read').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data){
          location.reload();
        }
      });
  });  
  $('li.finished').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/delete/' + item,
        success: function(data){
          location.reload();
        }
      });
  });  
});
