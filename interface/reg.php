<?php
  // 1. 前端发送数据
  // 2. 后端接收数据
  // 3. 连接数据库
  // 4. 判断用户名在数据中是否已经存在
  // 4.1 存在 注册失败 提示用户 用户名已存在 返回注册页
  // 4.2 不存在 注册成功 将用户提交的数据 写入数据库 返回页面

  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];

  include('./conn.php');

  // 查询用户名是否存在
  $selectUName = "select * from exercise where username='$username'";

  $res = $conn->query($selectUName);

  if($res->num_rows>0){
    echo '<script>alert("注册失败,用户名已存在");</script>';
    echo '<script>location.href="../src/Tmall-reg.html";</script>';
    die();
  }

  // 插入数据
  $insertUser = "insert into exercise (username,password) values ('$username','$password')";

  $inserted = $conn->query($insertUser);

  if($inserted){
    echo '<script>alert("注册成功");</script>';
    echo '<script>location.href="../src/Tmall-reg.html";</script>';
  }


?>