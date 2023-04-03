# System Design
- Goal: at the end I should be able to identify some basic engineering design patterns which are used to design large scale distributed systems.
- Large scale distibuted systems :
    * Large scale - something that is used a lot or is very intensive in terms of resources such as has alot of data or users, has frequent updates or has high performance expectations such as google maps.
    * Distributed system - means that the server or code that is executing the program is not in one place, it is disributed all round the world so that:
        1.  If one server crushes the rest of the servers can take the load.
        2.  It helps in performace - while using google maps, if a kenyan wants the map he communicates with the kenyan server since it will give the results back faster than if he were to communicate with the american server since he would have to go across continents then get the result back, this would be slower. 