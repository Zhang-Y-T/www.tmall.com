import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';


let id = location.search.split('=')[1];

$.ajax({
  type: "get",
  url: "http://localhost/www.tmall.com/interface/details.php",
  data: { id },
  dataType: "json"
}).then(res => {
  let de = JSON.parse(res.details);
  let pic = JSON.parse(res.picture);
  let thum = JSON.parse(res.thumbnail);


  let template = '';
  for (var i = 0; i < de.length; i++) {
    template += `<img src="${de[i].src}" alt="">`;
  }
  $('.tabs-img').html(template);

  let temp1 = '';
  temp1 += `<a href=""><img src="${pic[0].src}" alt=""><i class="iconfont icon-sousuo1"></i><i class="iconfont icon-bofanganniu"></i></a>`
  $('.details-img').prepend(temp1);

  let temp2 = '';
  temp2 += `<h1>${res.title}</h1>
  <p class="details-newp">活动限时享折扣</p>`
  $('.details-hd').html(temp2);

  let temp3 = '';
  temp3 += `<i>￥</i>${res.price}
              <span class="details-recommended">超市推荐<em></em></span>`
  $('.details-red').html(temp3);

  let temp4 = '';
  temp4 += `<p>颜色分类</p>
  <a href=""><img src="${pic[0].src}" alt=""></a>`
  $('.details-key').html(temp4);

  let temp5 = '';
  temp5 += `<img src="${thum[0].src}" alt="" class="active">
  <img src="${thum[1].src}" alt="">
  <img src="${thum[2].src}" alt="">
  <img src="${thum[3].src}" alt="">
  <img src="${thum[4].src}" alt="">`

  $('.detailes-imglist').html(temp5);




  $('.buy-wait').on('click', function() {
    addItem(res.id, $('#check_num').val());
  });


}).catch(xhr => {
  console.log(xhr.status);
});


function addItem(id, num) {
  let product = { id, num };

  let shop = cookie.get('shop'); // 从cookie中获得数据


  if (shop) { // 判断是否获得到数据
    shop = JSON.parse(shop);

    // 当商品id在cookie数据中已经存在时 需要修改数量 而不是添加商品
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id); // 获得商品对象在数组中的索引
      let count = parseInt(shop[index].num);
      count += parseInt(num);
      shop[index].num = count;
    } else {
      shop.push(product);
    }


  } else {
    shop = [];
    shop.push(product);
  }

  cookie.set('shop', JSON.stringify(shop)); // 将数组转换成JSON字符串存入cookie
}