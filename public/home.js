$(document).ready(() => {
    /*$(".detail").on("click", function() {
        $.ajax({
            type: "POST",
            url: '/add',
            data: JSON.stringify({ bookName: $(this).attr("id")}),
            contentType: 'application/json',
            success: function (data) {
                location.reload();
                alert("done");
            }
        });
    });*/
    $(".add").on("click", function() {
        $.ajax({
            type: "POST",
            url: '/add',
            data: JSON.stringify({ bookName: $(this).attr("id")}),
            contentType: 'application/json',
            success: function (data) {
                location.reload();
                alert("done");
            }
        });
    });
});