<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (!isset($_GET['url'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing url"]);
    exit;
}

$url = $_GET['url'];

$options = [
    "http" => [
        "method" => "GET",
        "header" => 
            "User-Agent: Mozilla/5.0\r\n" .
            "Accept: application/json\r\n" .
            "Referer: https://api.sansekai.my.id/api"
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Fetch failed"]);
    exit;
}

echo $response;
