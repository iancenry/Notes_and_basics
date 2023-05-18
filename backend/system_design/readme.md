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
    2. Reduce the features to data definition - looking at the like feature, look at the abstract concept of somemone liking something, it means that a user likes a particular comment so it has: a like id, a user id, a timestamp. The comment is also an abstract concept and will be mapped into an object, it has: comment id, user, creation time and the thread it falls under.

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
        - As engineers we have to think of various failure scenarios: what if the DB crushes, what if a firewall on the internet starts blocking all your requests, what if one of the services starts misbehaving maybe due to a bug being introduced or a malicious person gains access and changes the code; we will have to use some design tools.
        - A challenge can also be a feature request whereby an artist wants to have a two way communication with some his audience so you have to display this user(s) to the artist and still broadcast the two or more parties to everyone else watching.

    * With those requirements we can design a live streaming app. There are 2 ways to approach this.
        1. From customer to server and then to database. (black marker)
            Customers => Server => Database
        2. From database to server , so what kind of data I need to store  to enabe the server, and what kind of  APIs do I need to expose  to enable the customers to use the product. (red marker in image)
            Database => Server => Customers
            
         ![image1](https://github.com/iancenry/Notes_and_basics/assets/77986239/059ffeef-2673-4be2-b0a8-a51e35eb64e1)

    - Both are fine but require different ways of thinking:
        * In the database approach we need to consider what kind of data we need to store; often we think of the pieces of data as tables if it is a video it will have the columns for ID, Name, Size, Data
        * Customer approach is better since customers get to define their problems which are fulfilled using APIs on the server which are then fulfilled by storing some sort of data in the DB then the data is mapped onto tables. (the approach we will use)

    - In our case customers are live streaming customers who may be streaming from different device types which need to be catered to; this is a frontend UI design problem. System design deals with the distributed systems backend part of things. Clients need to be able to query the server in real-time so our server needs to have:
        * API - an API like getVideoFrame needs to take in video `id`, `device type` so as to send the video resolution depending on device, `offset` you have already seen the first ten minutes so show me everytging  else after.
            - A getVideoFrame API also needs to return something, the return type could be some video frames each 10 seconds long so a single frame is what we send back such that it is a particular video, for a certain device and after 10 minutes(the offset). SO `10 minutes` to `10 min and 10 sec` that frame is sent to the client.
            - we need to be able to POST a comment so we are manipulating or adding some data to the server. So we have a comment `id`, `data`, `author`, `video_id` video on which the comment was made.
        * On teh database side we need to think about the kind of data we need to store to satisfy the above APIs. The kind of DB we can use is an SQL DB. 

         ![rough](https://github.com/iancenry/Notes_and_basics/assets/77986239/20265aa0-168d-4638-bf77-1d5532f70ee2)

         - with these design we have an incomplete high-level rough idea of how we are goming to be talking to each other not what we will use to make this happen. So we got o the implmentation details.
    
    - Implementation details.
        - First on the client we ask if there is something we need to do which is yes. Different API's require different behaviours. Posting a comment means that we post once and maybe we will query it soon but we dont need contionous updates on the comment so notifications can be given periodically or we dont need notifications on that comment at all or after a few months, so here we have non-real time beahvious. For frames when we ask for a video frame we usually need to ask for the next video frame immeadiately after that, this is a continous behavior.
        - So we need to use different netwokr protocols for the videoFrame and comment APIs. FOr a comment we can use HTTP which gives us the benefit that you have a stateless server, you don't need to store any info when handling a request. A stateless server  is basically if have no idea where you are from and what you want so define everything in the request i.e from the client. With HTTP since it is stateless the server is kept simple such that if it crashes there is no context or memory that is lost in the server. Also you can add other servers more easily since every request comes with the total context.
        - For the video frame a better protocol would be to use one designed for video transmission. For example `TCP protocol` (reliable protocol) or `UDP protocol` (real time effiecient protocol).
        - For us between the client and server we use `WebRTC protocol (to be switched later notes)` which is a peer-to-peer protocol so we are able to send video from the server to the client. Some protocls have a client-to-server expectation so the client can make requests but server cant send response to the client, this is better for the comments part.
        - On the DB side we need to consider how we will talk to the server, most DB solutions (MySQL, PostgreSQL) define how exactly the client interacts with the DB. So we don't need to think much when it comes to the DB talking to the server.
        - The problem is therefore which database we should use, File System/SQL/NoSQL; look at tradeoffs. Here using mySQL will be expensive and slow and since video data is a file we can store it in a file system. And you dont want to build a file system yourself so you use a well know FS solution eg HDFS, Amazon S3 or use a video hosting solution like vimeo. Benefit of using Amazon S3 or HDFS is that they are easy to query, cheap and can store large files. With a DB it is not cheap and you can store large files but capabilities to update static files like video files might not be relevant.
        - For comments and user tables they can have SQL solutions(mySQL, Postgresql) but considering the complexity of their data structures such as persisitng every comment and those nested in them it is better to use a NoSQL database whcih is better for scaling the comments.
        
        ![rough-2](https://github.com/iancenry/Notes_and_basics/assets/77986239/f9dad4ce-f2c2-431e-b1ff-c7570da34b95)

        - Now we have a rough blueprint of how customers will access APIs and how the APIs will access the data in the DB. the data in our DB can be filled by a customer or by an external service, in a live streaming system it will probaly be a really high definition camera that is recording live and persisitng to our DB so we use `RTMP: Real Time Media Protocol` which ensures we dont lose any data when recorinf, with WebRTC we might lose data since it is an end user watching a live stream and they want data quick an real but at the source we dont want to lose any data since it will affect everyone. Therefore between the camera and DB we need to  setup a high bandwidth expansive network.
     
    ![rough-3](https://github.com/iancenry/Notes_and_basics/assets/77986239/7d808394-f85a-40f9-8c41-6ac1590aefdd)

    - Above we have looked at the solution from a high level, next we are getting into the niitty gritty details of designing the system. First we look at how we convert the RAW data and serve to customers:
        - There needs to be a transmission service which takes the live stream (RAW video) and converts it into different resolutions. This is done by breaking the video to segments of 10 seconds and give each segment to some programs that will process it into the different resolutions and formats for the different devices. Some formats include: h.264 etc. 
        - In short we take our raw video footage and convert it into a combination of a resolution and format. We can use a map-reduce design pattern where we take a video and split it into 10-seconds-long pieces and sendit to different servers to get different outputs. Apart from transforming the video we might also want to compress it in another server depending on the one that is available. Here we get different outputs again which can be stored in a DB. 

         ![map-reduce](https://github.com/iancenry/Notes_and_basics/assets/77986239/5806d006-90ff-4539-8fda-3c489d949331)

            
    - Next we look at how the video will reach the users:
        - The data has to go to the server which is exposing some APIs, when user queries data using a protocol (eg WebRTC) they should be able to get it. WebRTC is good for video confrences. However in this case it is a broadcast not a conference so we to a protocol suitable for streaming ie., `MPEG-DASH(Dynamic Adaptive Streaming over HTTP)`, with this protocol it means that depending on the bandwidth-network a user is on, they'll be able to see high or low quality video automatically without the user handling the switch. We can also use `HLS protocol` for IOS or mac devices.
    - Next we need to consider what kind of data we need to store in the server:
        - Do we want to store any data at all or make it stateless? Statelessness is useful when it comes to request serving and keeping context for every user but for some things you can keep some state like in video you can cache the last 10 minutes of video in the server so that anybody asking for the video that is in the last 10 mins will get it from the cache instead of making a network call all the way to the DB thus saving time and bandwidth. 
        
        ![update 1](https://github.com/iancenry/Notes_and_basics/assets/77986239/9954d5a1-d96f-4058-9c2f-4811f05d4b1b)
           
    - So this are the considerations when it comes to system design; our use case is of a large scale distributed system so our assumption is that there alot of user thus making this much planning and this kind of a design makes sense cost-wise and enginerring effort wise. There needs to be fault tolerance and perfomance so we can use CDN solutions to persist some static data and have clients pull the static data from there such as webpages and video data.
    - 
      ![update 2](https://github.com/iancenry/Notes_and_basics/assets/77986239/21928cd7-ced6-4208-81c3-164ffbbde0ed)

- Important things to notice:
1. Define the requirements as abstract concepts (Objects)
2. Objects can be manipulated and queried using API's on server
3. The data representation need to be stored in databases

- Once we are done with the above high level blueprint we start thinking about what we need exactly to make the system possible: `protocols`, `database solutions`, sometimes `intermediate design pattern solutions` (load balancers, message queues) which have been converted into tools by various companies for example AWS, interaction of the tools and services.

## Low Level Design
- Previously we were looking at high level design where we tok different components of the entire system and thought about how they will interact with each other using network calls, APIs, and sending data from one place to another.
- In LLD we will take certain functions of these services and try to code them out. 
- The code functionality of a live stream is to be able to fetch & view a video, and continue fetching the video until the video ends. We aren't looking at how we onboard the video ie how the video moves from the source camera to our system, we are looking at the user side on how it will be consumed. Tod to this we have 2 approaches:
    1. To think of the code: if you're coding in OOP you need to think about objects and their interaction, possible inheritance; this is sometimes hard to think of unless the requirements are extremely well specified or they are so generic that you have to look at the data you're storing first before you think of the functionlaity.
    2. To think of the users (recommeneded): what are the actions that a user can perform?
        -  On a phone/tablet a user will be scrolling to a particular place to watch the video (scrubbing)
        - click on play to play video at timestamp x
        - pause the video and in that case do you continue fetching more segments from the backend(having buffered video frames) or  do you stop fetching segemnts; depends on the UX you want. Maybe we can fetch the next 2 minutes of video from the `last seek point` despite pausing.
        - Adaptive video quality - depending on the device.
        - Upto what point have you played the video - if a user logs out and comes back they should be able to continue from the `last watched seek position` which should be stored somewhere. We can cache the video or you might want to do that for only recently played videos.

- What we are considering here is: `memory optimizations`, `user behaviour`, `API calling`. Depeding on seniority or use case, you might have issues of `concurrency`, `latency` and `throughput`. Some requirements can be considered more than others depending on context.
- We use a structured approach to solve problems, the first tool we use are `use case diagrams`.
    1. Use case diagrams - we think about the use cases we need to fulfill for every user. An actor is a person that can do actions eg videographer, admin, customer. Sample use case from the customer: 
   
   ![use case](https://github.com/iancenry/Notes_and_basics/assets/77986239/3ab3c920-f41e-4670-859c-c43bdf520fa2)
      
        - In system design the expectation is that if there is a Product Requirement Doc (PRD) usually it is just one use case where you add a feature and each feature is important.
        - The next step is to convert the requirements represented by use cases into class and objects; use-case diagrams behave as a foundation to come up with class diagrams.
        - With the use case such as *view at max quality allowed by network device* the customer isn't actually doing this manually so it should be handled by the system so there needs to be another actor but not someone who does things physically who will interacti with the syem eg a controller/rate limiter/ a service or a tool. For us we will use a network protocol, more specifically an adaptive bit-rate protocol such as `HTTP-DASH` removing the need of a service like a rate limiter. Dynamic Adaptive Streaming over HTTP(DASH), also known as MPEG-DASH is an adaptive bitrate streaming technique that enables high quality streaming of media content over the internet delivered from conventional HTTP web servers.
        - For the `play video from a timestamp` - means that every video needs to store a timestamp for a particular user. This has to be taken cared of by the video consuming service. Think in terms of API eg play() where it takes in a user, video and timestamp; the return type will be a video frame. **The clearer the APIs, the easier it will be to come up with Low Level Design.**
        - For the `have non-stop play when watching videos` we need to get future frames. /
         
       ![case 1](https://github.com/iancenry/Notes_and_basics/assets/77986239/dc0fff58-ad27-480c-b1c5-6c1d2270333a)

        - From the use case diagram above, the `play` and `getVideoFrame` APIs are quite similar. At this point we ask ourselves `what does this product need?` and `Is playing the video different than fetching the future content?` Yes it is even though they are doing the same thing where in play the user is saying play me a video from this timestamp while in the other, the video player is saying `get me the video frame for this timestamp`. They are similar but the use cases are different. These 2 APIs are very similar so its better to merge them on the server side. /
        
        ![case 2](https://github.com/iancenry/Notes_and_basics/assets/77986239/fd98d5bb-3d15-483a-a32b-6b51925cccee)

    
    2. Class Diagrams - For every class we need to store states(data an object needs to perform behaviours eg to speak you need a throat, tongue, brain) and behaviours. For a video the states are `ID`,  `Frames`, `Metadata` and for behaviours `getFrame`.
    
     ![class diagram](https://github.com/iancenry/Notes_and_basics/assets/77986239/6977b65f-a719-4a92-9ae8-786de2d7cf75)
    
    3. Sequence diagrams - in most cases a use case and class diagram are sufficient however in places where interaction is complex we need sequence diagrams which define the sequence of actions. Here we have three timeline represented by an x-axis.
    4. 
        ![sequence 1](https://github.com/iancenry/Notes_and_basics/assets/77986239/8b94bc73-107d-4baf-a68d-f38120cd9fa2)
        ![sequence 2](https://github.com/iancenry/Notes_and_basics/assets/77986239/0772b1b2-6461-4f40-aa85-74a64b200757)

- Finally the syetem can be coded referncing the created class diagrams.
```java
    public class VideoConsumingService{
        private Database database;

        public int seekTime(String userId, String videoId){
            WatchedVideo watchedvideo = database.getWatchedVideo(userId, videoId);
            return watchedVideo.getSeekTime();
        }

    }

    class VideoService{
        private FileSystem fileSystem;

        public Frame getFrame(String videoId, int timestamp){
            Video video = fileSystem .getVideo(videoId);
            return video.getFrame(timestamp);
        }
    }

    class FileSystem{
        public Video getVideo(String videoId){
            return null;
        }
    }

    class Database{
        public WatchedVideo getWatchedVideo(String userId, String videoId){
            return null;
        }
    }

    class Video {
        
        String id;
        Frame[] frames;
        String jsonMetaData;  

        public Frame getFrame(int timestamp){
            for(int i = 0; i < frames; i++){
                if(frames[i].startTimestamp <= timestamp && frames[i].endTimestamp > timestamp) {
                    return frames[i];
                }               
            }
            throw new IndexOutOfBoundsException();
        }      
    }

    class Frame{
        public static int frameTime = 10;
        byte[] bytes;
        int startTimestamp;
        int endTimestamp;
    }

    class User{
        String id;
        String  name;
        String email;

        public String getId(){
            return id;
        }
    }

    class WatchedVideo{
        String id;
        String videoId;
        String userId;
        int seekTime;

        public int getSeekTime(){
            return seekTime;
        }
    }
``` 

- Use `lucid chart` to make the diagrams.
 
