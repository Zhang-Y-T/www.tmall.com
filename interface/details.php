<?php
  include('./conn.php');

  $id = $_REQUEST['id'];

  $sql = "select * from tamll_library where id=$id";

  $res = $conn->query($sql);

  $row = $res->fetch_assoc();

  echo json_encode($row);
?>