$(function () {
  get_data();
});

function setDate(createDate) {
  var dd = new Date(createDate);
  var year = dd.getFullYear();
  var month = dd.getMonth() + 1;
  var date = dd.getDate();
  var hour = dd.getHours();
  var minute = dd.getMinutes();
  return (year + "/" + month + "/" + date + " " + hour + ":" + minute);
}

function get_data() {
  $.ajax({
    url: "result/ajax/",
    dataType: "json",
    success: data => {
      $("#comment-data")
        .find(".comment-visible")
        .remove();

      for (var i = 0; i < data.comments.length; i++) {
        var html = `
                    <div class="media comment-visible">
                        <div class="media-body comment-body">
                            <span class="comment-body-content" id="comment">${data.comments[i].comment}</span>
                            <div class="flex">
                                <span class="comment-body-user" id="name">${data.comments[i].name}</span>
                                <span class="comment-body-time" id="created_at">${setDate(new Date(data.comments[i].created_at))}</span>
                            </div>
                        </div>
                    </div>
                `;

        $("#comment-data").append(html);
      }
    },
    error: () => {
      alert("ajax Error");
    }
  });

  setTimeout("get_data()", 5000);
}
