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
     class Chef{
         function makeChicken(){
             echo "chef makes chicken<br>";
         }
         function makeSalad(){
            echo "chef makes salad<br>";
        }
        function makeSpecialDish(){
            echo "chef makes bbq<br>";
        }
     }

     class ItalianChef extends Chef{
         function makePasta(){
             echo "chef makes pasta";
         }
        //  function overriding
        function makeSpecialDish()
        {
            echo "chef makes pizza <br>";
        }

     }

     $chef = new Chef();
     $chef->makeSpecialDish();
   
     $italianChef = new ItalianChef();
     $italianChef->makeSpecialDish();
   
   
     
      ?>
        
    </body>
</html>