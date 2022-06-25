$(function() {
  $(".tab-item>li").on("click", function() {
    $(this).addClass("active").siblings().removeClass("active");
    let index = $(".tab-item>li").index(this);
    $(".content_login_box > div")
      .eq(index)
      .addClass("display")
      .siblings()
      .removeClass("display");
  });
});