<?php
  // 登录功能
  // 1. 前端需要向后端发送数据
  // 2. 后端接收前端发送的数据
  // 3. 连接数据库 查询用户名和密码是否正确
  //    3.1 查到了数据 用户名和密码正确 -> 登录成功
  //    3.2 没有查到数据 用户名或密码错误 -> 登录失败

  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];

  include('./conn.php');  // 连接数据库


  $select = "select * from exercise where username='$username' and password='$password'";

  $res = $conn->query($select);  // 执行查询 获得一个结果集

  // var_dump($res);

  if($res->num_rows>0){
    echo '<script>alert("登录成功");</script>';
    echo '<script>location.href="../src/Tmall-index.html";</script>';
  }else{
    echo '<script>alert("用户名或密码错误，请重新输入");</script>';
    echo '<script>location.href="../src/Tmall-login.html";</script>';
  }

?>