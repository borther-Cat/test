<?php
// echo "OK!";
# 001 先获取参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

# 002 连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "db");

# 003 查询数据库中是否存在该用户名，如果存在那么再检查密码是否正确
$sql = "SELECT * FROM userlist WHERE username='$username'";
$result = mysqli_query($db,$sql);

$data = array("status" => "error", "data" => array("msg" => "注册失败"));

if(mysqli_num_rows($result) == "1")
{
  $dataT = mysqli_fetch_all($result, MYSQLI_ASSOC);
  if($password == $dataT[0]["password"])
  {
    # 登录成功
    $data["status"]="success";
    $data["data"]["msg"] = 1;
    echo json_encode($data, true);
  }else
  {
    # 登录失败 密码不正确
    $data["status"] = "error";
    $data["data"]["msg"] = 2;
    echo json_encode($data, true);
  }
  // print_r($data[0]["password"]);
  // print_r($data);
}else
{
  # 登录失败：该用户不存在！
  $data["status"] = "error";
  $data["data"]["msg"] = 3;
  echo json_encode($data, true);
}

?>