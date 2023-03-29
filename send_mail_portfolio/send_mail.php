<?php

########### CONFIG ###############

$recipient = 'developer@heinemann.berlin';
// $redirect = 'success.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
      
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        

        // $subject = "Thank you for your message " . $_POST['name'];
        $subject = "New message from ". $_POST['name'];
        $headers = "From:  noreply@heinemann.berlin";
        $message = "Hello, you have received a new message from ". $_POST['name'].". \nPlease answer the following email adress:". $_POST['email']." \nYour Message: \n". $_POST['message'];
        mail($recipient, $subject,  $message, $headers);
        // header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
