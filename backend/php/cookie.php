<!DOCTYPE html>

<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
       <?php
    //    creating a cookie that expiires within a day(86400 seconds)
    // if it was negative e.g time()-1 will destroy the cookie since it had to be destroyed yesterday so it will destroy it npw
    setcookie("name", "Cenrike", time()+ 86400);

    // session - their name and id
    $_SESSION["name"] = "12";

       ?>
    </body>
</html>