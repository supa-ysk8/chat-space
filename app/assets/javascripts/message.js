$(document).on('turbolinks:load', function(){


  function buildHTML(message){
    var image_url = (message.image)? `<image class="message__text__image" src="${message.image}">`:"";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__head-info">
                    <p class="message__head-info__people">
                      ${message.user_name}
                    </p>
                    <p class="message__head-info__date">
                      ${message.dates}
                    </p>
                  </div>
                  <p class="message__text">
                    <div>
                    ${message.content}
                    </div>
                    ${image_url}
                  </p>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('メッセージ送信エラー');
    })
    .always(function(data){
      $('.form__submit').prop("disabled", false);
    })
  })
    //  以下自動更新
    var  reloadMessages = (function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        var last_message_id = $('.message').last().data('id');
        var href = 'api/messages'
        $.ajax({
          url: 'api/messages',
          type: 'get',
          data: {id: last_message_id},
          dataType: "json"
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function(message) {
            insertHTML += buildHTML(message)
            $('.messages').append(insertHTML)
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    });
      setInterval(reloadMessages, 5000);
  });
