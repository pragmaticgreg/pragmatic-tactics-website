<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'business_type'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Sanitize input
$name = htmlspecialchars(trim($input['name']));
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$business_type = htmlspecialchars(trim($input['business_type']));
$message = htmlspecialchars(trim($input['message'] ?? ''));
$timestamp = $input['timestamp'] ?? date('Y-m-d H:i:s');
$source = $input['source'] ?? 'contact_form';

// Email configuration
$to = 'greg@pragmatictactics.com'; // Replace with your email
$subject = "New Contact Form Submission - $business_type";
$body = "
New contact form submission from your website:

Name: $name
Email: $email
Business Type: $business_type
Message: $message

Timestamp: $timestamp
Source: $source

---
This message was sent from your website contact form.
";

$headers = [
    'From: noreply@yourdomain.com', // Replace with your domain
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log the submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email) - $business_type\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
?>
