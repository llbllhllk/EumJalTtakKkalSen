<?php
  $userId = validate_input($_POST["userId"]);
  $userPw = validate_input($_POST["userPw"]);

  echo json_encode(readData($userId, $userPw));

  function readData($userId, $userPw) {
    $file = fopen("../json/user.json", "r");
    $data = array();
    while(!feof($file)) {
      $line = fgets($file);
      $obj = json_decode($line);
      if($userId == $obj->userId && $userPw == $obj->userPw) {
        array_push($data, $obj);
        break;
      }
    }
    return $data;
  }

  function validate_input($input) {
    $input = trim($input);
    $input = stripslashes($input);
    return htmlspecialchars($input);
  }
?>