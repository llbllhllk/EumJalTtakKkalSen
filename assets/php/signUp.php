<?php
  $userId = validate_input($_POST["userId"]);
  $userPw = validate_input($_POST["userPw"]);

  // handleData에서 return받은 값을 js에게 response로 전달한다.
  echo handleData($userId, $userPw);

  // 사용자가 입력한 정보를 기반으로 user.json에 존재할 경우 true를 return하고 새로운 정봉일 경우 해당 data를 return하는 기능이다.
  function handleData($userId, $userPw) {
    $file_r = fopen("../json/user.json", "r");
    $flag = false;
    while(!feof($file_r)) {
      $line = fgets($file_r);
      $obj = json_decode($line);
      if($userId == $obj->userId) {
        // 입력한 아이디가 존재할 경우 true를 return한다.
        $flag = true;
        fclose($file_r);
        return $flag;
      } else {
        // 입력한 아이디가 존재하지 않을 경우 데이터를 추가하고 해당 데이터를 return한다.
        $data = (object) array(
          'userId' => $userId,
          'userPw' => $userPw,
        );
        $file_a = fopen("../json/user.json", "a");
        $txt = "\n".json_encode($data, JSON_UNESCAPED_UNICODE);
        fwrite($file_a, $txt);
        fclose($file_a);
        return json_encode($data);
      }
    }
  }

  function validate_input($input) {
    $input = trim($input);
    $input = stripslashes($input);
    return htmlspecialchars($input);
  }
?>