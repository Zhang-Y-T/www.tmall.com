import $ from './lib/jquery.esm.js';
import { Swiper } from '../css/swiper-7.4.1/swiper/swiper-bundle.esm.browser.js'

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 1500
  },
  speed: 300,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let swiper2 = new Swiper(".mySwiper-2", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 1000
  },
  speed: 300,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


$.ajax({
  type: "get",
  url: "http://localhost/www.tmall.com/interface/index_shop.php",
  dataType: "json"
}).then(res => {
  // console.log(res);
  let template = '';

  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    // console.log(pic);
    template += `<a href="./Tmall-detail.html?id=${el.id}">
        <img src="./${pic[0].src}" alt="">
        <p>${el.title}</p>
        <h4>${el.price}</h4>
      </a>`;
  });

  $('.shop_box1').html(template);

}).catch(xhr => {
  console.log(xhr.status);
});