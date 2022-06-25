import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';
let shop = cookie.get('shop');

shop = JSON.parse(shop);

let idList = shop.map(el => el.id).join();
// console.log(idList);

$.ajax({
  type: "get",
  url: "../interface/shop.php",
  data: { idList },
  dataType: "json"
}).then(res => {

  let temp = '';
  res.forEach((el, i) => {
    let pic = JSON.parse(el.picture);

    let current = shop.filter(elm => elm.id === el.id);

    temp += `
    <div class="shop_header">
      <span class="iconfont icon1">&#xe757;</span>
      <span style="font-size: 13px;">店铺：</span>
      <a href="">天猫超市</a>
      <span class="iconfont icon2">&#xe64e;</span>
    </div>
    <div class="shop_product">
      <input type="checkbox" id-data=${el.id}>
      <div class="product_img">
        <a href=""><img src="${pic[0].src}" alt=""></a>
      </div>
      <div class="product_info">
        <a href="">${el.title}</a>
        <div class="product_icon">
          <span><a href=""><img src="./img/icon (1).png" alt=""></a></span>
          <span><a href=""><img src="./img/icon (2).png" alt=""></a></span>
          <span><a href=""><img src="./img/icon (3).png" alt=""></a></span>
        </div>
      </div>
      <div class="product_size">
        <p>颜色：黑色</p>
        <p>尺码：L</p>
        <a href=""><span>修改</span></a>
      </div>
      <div class="product_message">
        <div class="product_price">
          <h3 class="now_price">${(+el.price).toFixed(2)}</h3>
        </div>
        <div class="product_amount">
          <a href="#" class="add" id-date=${el.id}>-</a>
          <input type="text" id="num"  value="${current[0].num}" class="text text-amount" min="0" max="100">
          <a href="#" class="reduce" id=${el.id}>+</a>
        </div>
        <div class="product_prices">${(el.price * current[0].num).toFixed(2)}</div>
        <div class="user_operate">
          <span><a href="">移入收藏夹</a></span>
          <span><a href="" class="removeitem" data-id="${el.id}">删除</a></span>
        </div>
      </div>
    </div>`;
  });

  $('.main_mid_product').html(temp);

  $('.main_mid_product .removeitem').on('click', function() {
    let res = shop.filter(el => el.id != $(this).attr('data-id')); // 筛选被点击的元素
    cookie.set('shop', JSON.stringify(res)); // 剩余内容写回cookie
    location.reload(); // 刷新页面
  });


  //  增加和删除按钮
  $('.reduce').on('click', function() {
    let num = $(this).siblings('.text-amount').val();
    num++;
    $(this).siblings('.text-amount').val(num);
    let id = shop.filter(el => el.id == $(this).attr('id'));

    addItem(id[0].id, $('.text-amount').val())
    location.reload();
  });

  $('.add').on('click', function() {
    let num = $(this).siblings('.text-amount').val();
    num--;
    if (num < 1) {
      num = 1;
    }
    $(this).siblings('.text-amount').val(num);
    let id1 = shop.filter(el => el.id == $(this).attr('id-date'));
    reduceItem(id1[0].id, $('.text-amount').val())
    location.reload();
    console.log(id1);
  });


  // 购物车的全选功能
  let all_check = $(":checkbox");
  let allCheck = $('.allCheck');
  let item = $(':checkbox:not(.allCheck)');

  allCheck.on('click', function() {
    item.prop('checked', $(this).prop('checked'));
    allCheck.prop('checked', $(this).prop("checked"));
  })

  item.on('click', function() {
    allCheck.prop('checked', isAllCheck());
  });

  all_check.on('click', function() {
    // btn1.attr("style", "background-color:#ff5500");

    if (jieSuan()) {
      $('.btn1').attr("style", "background-color:#ff5500");
    } else {
      $('.btn1').removeAttr("style");
    }
  })

  function isAllCheck() {
    let elm = Array.from(item);
    return elm.every((el) => $(el).prop('checked'));
  }

  function jieSuan() {
    let elm = Array.from(item);
    return elm.some((el) => $(el).prop('checked'));
  }


}).catch(xhr => {
  console.log(xhr.status);
});



function addItem(id, num) {
  let product = {
    id,
    num
  };
  let shop = cookie.get('shop'); //从cookie获取数据

  if (shop) {
    shop = JSON.parse(shop);
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id); // 获得商品对象在数组中的索引
      let count = parseInt(shop[index].num);
      count++;
      shop[index].num = count;
    }
    cookie.set('shop', JSON.stringify(shop));
  }
}

function reduceItem(id, num) {
  let product = {
    id,
    num
  };
  let shop = cookie.get('shop'); //从cookie获取数据

  if (shop) {
    shop = JSON.parse(shop);
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id); // 获得商品对象在数组中的索引
      let count = parseInt(shop[index].num);
      count--;
      shop[index].num = count;
    }
    cookie.set('shop', JSON.stringify(shop));
  }
}