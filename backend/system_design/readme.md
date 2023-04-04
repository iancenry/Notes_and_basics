# System Design
- Goal: at the end I should be able to identify some basic engineering design patterns which are used to design **large scale distributed systems**.

- Large scale distibuted systems :
    * Large scale - something that is used a lot or is very intensive in terms of resources such as has alot of data or users, has frequent updates or has high performance expectations such as google maps.

    * Distributed system - means that the server or code that is executing the program is not in one place, it's disributed all worldwide so that:
        1.  If one server crushes the rest of the servers can take the load.
        2.  It helps in performace - while using google maps, if a kenyan wants the map he communicates with the kenyan server since it will give the results back faster than if he were to communicate with the american server since he would have to go across continents then get the result back, this would be slower. 

- To build these large scale distributed systems, the engineering team depends on `design patterns`.
    * A design pattern is a general reusable solution to a commonly occuring problem within a given context in s/w design. They are particular practices, principles or processes used to build these systems. 
    * For example a post on YT or IG, both need to reach a wide audience therefore both are similar problems; one piece of content needs to be made into an event and notified to millions of people and you want to notify them quickly but you don't want to put too much load on your service such that the rest of the requests coming into it stop being served. This is a common problem, so we extract out a common problem and solve it using a common solution, example of a design pattern we could use a pattern called `publisher subscriber model`
- SEs use design patterns to make reliable, scalable and maintainable systems. This helps them convert business requirments into technical solutions.

## Live streaming Application
-  Imagine an org which broadcasts videos to millions of people ( netflix, YT or zoom), events are being broadcast to millions of people and you have to come up with technology or soln to solve this problem.
- First you should `define the requirement from the users perspective` - the product manager needs `user feedback and data` and a well documented `business backed document` which the engineer can read and decide how they can make it happen. Amongst these you need to pick the most important features first. Example of `primary issues` in a streaming app: 
    1. Being able to see the video - quality of video e,g 480 vs 720p is a seconday concern. Here you have to make sure that the server does not go down and that the your bandwidth requirements are sufficient.
    2. Reduce the features to data definition - looking at the like feature, look at the abstract concept of somemone liking something, it means that a user like a particular comment so it has: a like id, a user id, a timestamp. The comment is also an abstract concept and will be mapped into an object, it has: comment id, user, creation time and the thread it falls under.

- So we are taking features/abstract concepts from the product requirement document and converting them into data definitions which can then be mapped into objects which are mapped into the database.
    * Product requirement doc => Features/abstract concepts => Data definitions => Objects => DB
- Once you have defined the data to be stored, you need to define endpoints (APIs) through which the data can be manipulated/queried. 
- This is done for every feature we have (core and optional/good-to-have features).

- Secondly, We also have some engineering requirements:
    1. None of the services should fail if there is an outage - if there is an outage in Kenya and the comment service is in Kenya you don't want the entire system to collapse so you have either:
        - multiple servers spread across the world to avoid a single point of failure. 
        - You can also have multiple servers in Kenya so that if one fails another picks up its responsibility. Here we have data duplication because of the speed in which the other servrer is able to pick up the responsibility or you have some sort of partitioning where half of the users access one server and the other half access the other therefore incase of a failure only half of the users are affected.
    2. Extensibility - it's not just about the technical solution you come up with, but also how easy it is to change that solution. Build a system that can `scale` and `extend` as and when requirements change and more users join.
    3. Testing - this is an important part of system design. Requests, common and edge cases have to be tested to see if they have a sensible flows in the system. Sophisticated tools can be used to load test, have capacity estimation and test design before getting into the code.
- Example recap: If we have a live streaming system, the way we would go about designing it is:
    * The requirements would be:
        1. Streaming video
        2. Processing video
        3. Broadcasting - sending video to multiple customers
        4. failproof
        5. Showing Advertisement
        6. Reactions
        7. Disclaimers/news flashes
        9. Having greaceful degradation of video quality - incase of low bandwidth
        10. Multiple device support etc
        - The core requirement is showing a video first so that is what we pick first; this means that we have to capture a video from a source, shooting at 8k, and we should be able to store it in a server so that it can be queried later. In a live streaming system the *query later* part is probably in milliseconds so we might no want to query that data at all but directly stream it from the video camera to millions of people.
        - Taking a step back it looks impractical since if I am shooting raw footage at 8k, sending  that much data to people on mobile phones is unreasonable so we need to store it in some sort of a DB or file system and stream/query that out and distribute to customers. 
        - But we don't want the users to know how I am doing this or when there is a change in the platform the next day. We want it to be a platform where they pay me and not worry about the technical details. They should just hit an API and these APIs have well defined signatures, you can tell that if the user wants some video IP in a particular format then they have to query a particular API called `get video` which will return objects of type frames and those frames are well defined. API signatures are similar to method signatures the difference is that APIs are not queried through a programing lang but thorugh a network protocol (like GRPC, http, ftp - any kind of protocol that defines how info will be taken from one place and sent to another and how the response will come back and the behviour of such an interaction).
        - So we have a system which is storing some data since we want to watch this event live, then the data will be queried using APIs that are tested beforehand.
        - As engineers we have to think of various failure scenarios: what if the DB crushes, what if a firewall on the internet starts blocking all your requests, what if one of the services starts misbehaving maybe due to a bug being introduced or a malicoius person gains access and changes the code; we will have to use some design tools. A challenge can also be a feature request whereby an artist wants to be have a two way communication withs some his audience so you have to  display this user to the artist and still broadcast two or more parties to everyone else watching.


