<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Start</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>


     <?php  
     $title = "My First Post";
     $author = "Mike";
     $wordCount =  400;
     include "article-header.php";

     include "useful-tools.php";
     echo "<br>";
     sayHi($author);
     echo "<br>";
     echo $feetInMile;
     ?>
        
    </body>
</html>