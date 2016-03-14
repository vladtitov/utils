<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
$ip = $_SERVER['REMOTE_ADDR'];
$data = json_decode(file_get_contents('php://input'));
if($data->user=='uplight.ca@gmail.com' && $data->pass=='uplight.ca@gmail.com'){
    echo mail($data->to,$data->subject,$ip."\n\r".$data->message)?'success':'error write';
}else echo 'hacker';
