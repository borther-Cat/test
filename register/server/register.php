<?php
    $password = $_REQUEST["password"];
    $phone = $_REQUEST["phone"];
    # 数据库操作：
# 数据库1-数据库表(N)-字段
# (1) 通过命令行操作
# (2) 通过phpMyAdmin
# (3) 通过UI界面工具(navicat)
$db = mysqli_connect("127.0.0.1","root","","db");
$sql = "SELECT * FROM userlist WHERE username='$phone'";

// echo $sql;
$result = mysqli_query($db,$sql);

$data = array("status"=>"error","data"=>array("msg"=>"注册失败"));
// print_r($data);
if(mysqli_num_rows($result) == "1"){
  $data["data"]["msg"] = "注册失败，该用户名已经存在";
  echo json_encode($data,true);
}else{
  $sql = "INSERT INTO `userlist` (`id`, `username`, `password`) VALUES (NULL, '$phone', '$password');";
  mysqli_query($db, $sql);
  $data["data"]["msg"] = "注册成功!";
   $data["status"] = "success";
  echo json_encode($data, true);
}

?>