# React Notes
### Basics
#### Why React
- It's compossable - combine different components to form a whole.
- It's declarative - i.e., you tell it what should be done and it worries about the implementation details. The opposite is imperative where you have to state howthings should be done e.g in vanilla JS.

#### JSX (JavaScript XML)
- Think of it as a flavour of JS that lloks like HTML. JSS makes react have its declarative property.
- It returns javascript objects ie., react elements that describe DOM elements and what React should add to the real DOM for us. The console.log of a JSX element is an object.
- The JSx syntax definition is housed in the React dependency, previously it had to be imported but in later version there is no need to import React.
- Render turns JS into DOM elements. - ReactDOM.render()


#### Components
- A component is a function that returns react elements. Must use pascal case for naming and is called as self closing element unlike function which are called with paranthesis.
```jsx
    <Header />
```

##### Components: Functions vs Classes
- Components can be created with both functions (common) or classes.

```jsx
    //function component
    export const Header = () => {
        return (
            <div></div>
        )
    }

    //class component
    export default class Header extends React.Component{
        render(){
            return (
                <div></div>                
            )
        }
    }
```

#### Setting up React
- To setup React, we need to setup a bundler system like webpack and teach its configuration how tu ose babel, a JS compiler, which will take the react code and transpile/compile it down to something that is readable by browsers, regular JS. 
- A beginner alternative is using create-react-app that takes care of the hussle. Must have npm and node.js installed.

#### JS inside JSX
- When writing JS in JSX we use curly braces, {}.

### Props and State 
#### Props
- They make components more flexible and reusable just like attributes that are passed to html elements such as *type='text'* alters the behaviour of the element.
- Unlike in html where attributes are limited, in our custom components er can pass in any property we want.
- A prop can be data that's displayed, metadata that configures a component to act in a certain way or a function.
- We can destructure props passed to a component for better readability.
- Objects can be passed as props or spread as props.

#### Rendering arrays
- In react, we can provide an array into what we are rendering and it will know how to map over the array and turn it into elements. In short, react can render an array of JSx elements.
```jsx
    //Can be an array of components or elements
    const divs = [<div>1</div>,<div>2</div>, <div>3</div>]
    return(<>
            {divs}    
          </>)
```
- Mapping components - we usually use map() in react to convert an array of raw data into an array of JSX elements that can be displayed on a page. It makes our code more "self-sustaining" ie., not requiring additional changes whenever the data changes. You must add a **key prop** to the component resulting from the map.  

#### State
- Components can have 'state' which is an object that determines how a component renders and behaves. 
- Since react is declarative, we just have to update our data and react will automatically 'react' to that change and update the UI.
- State allows us to hook into the component and make it so that whenever we update our state, React will update the UI based on changes to values saved in state. In React sites any interaction such as liking a post changes the state.
- We use useState since in react, local data e.g an array, isn't looked at to determine whether something should be rendered since the data structure is cemented to the memory before this results in UI not updating when values are changed
- App state or global state refers to a state that is available to the entire UI, not just a single component.

#### Props vs state
- Props are properties being passed into a component in order for it to work correctly, similar to how function receive parameters from 'above'. A component isn't allowed to modify those props i.e., they are immutable.
- State - they are values defined and managed by the component and should be changing; similar to variables declared inside a function. Think of state as values that a component can maintain between render cycles.

#### useState
- useState returns a stateful value and a function to update it.
- It is a hook which takes some data and a function that handles changes to the data. It returns an array with the first value being the data and the second a function.
- With array destructuring we can destructure the array that useState returns immeadiately we recieve it as a variable and provide two values such that the first value will store what is passed in useState and the second value will be the function that modifies the data.
> React hooks are functions that let us hook into the react state and lifecycle features from function components.
```jsx
    const [someState, setSomeState] = React.useEffect({...}) 
```
#### Changing state
- In the setter function we don't use the variable name itself since we never want to modify state direclty.
- Whenever we want to use the old value of state to determine the new value of state we provide a callback function as the parameter to our setter. The callback function will return the new value of state. React will pass the callback function the old value as a parameter so we use that value as a reference.
```jsx
    const [count, setCount] = useState(0)
    //Bad - modifying state directly
    setCount(count++)
    //Best practice
    setCount(oldValue => oldValue + 1)
```
**NB:**
- Two options for what can be passed into state setter function: 
    * New value of state - used when we don't need old value of state to determine current value e.g., setCount(45)
    * A callback function - whatever it returns will be new value of state. Used when we care about the previous value.
- Complex state - we can pass an array or object as state.

#### Passing state as props
- State can be passed a prop and also a state can be changed from the child component by passing a function that is in the parent to the child as a prop.

#### Local state
- since components never modify props we can initialize a new state (this new state is known as *derived state*) in the component and set the initial value to the incoming props value. The benefit is that we allow each component to update its own state. Bad since it causes there to  be two sources of truth.

#### Unified state
- A better way that ensures that state is only held in the parent component  thus ensuring a single source of truth.
- Pass a function to the child component(s) that when run updates the state in the parent. 
- To figure out which child triggered the event we can pass an id and the function as props to the child. Then when calling the function in then child we pass it to our own fucntion and make it take the id. Thus we can use the id to update the correct data in the parent
```jsx
    //code in parent
    <Box id={data.id} toggle={toggle} />
    function toggle(id){
        const newSquares = []
        for(let i=0; i < prevSquares.length; i++){
            const currentSquare = prevSquares[i]
            if(currentSquare.id === id){
                const updatedSquare = {...curremtSquare, on: !currentSquare.on}newSquares.push(updatedSquare)
            }else{
                newSquares.push(currentSquare)
            }
            
        }
        //will be the new state
        return newSquares
    }

    //code in child
    function Box({id, toggle}){
        return (
            <div onClick={()=>toggle(id)}></div>
        )
    }
```

### Conditional rendering
#### With double ampersand
- if first value is truthy the element is rendered else it will just skip the remaining part. Good for when choosing whether to siplay an element or no.
```jsx
    {isTrue && <div>Rendered conditionally</div>}
```

#### With ternary operator 
- Use when we want to onnly display something sometimes on the page based on a condition. Good for choosing between two things to display.
```jsx
    <button>{isShown? 'Hide' : 'Show'}</button>
```

### React forms
- Check managing-data repo

### Side Effects
#### Intro
- Before looking at side effects we need to know what react does and doesn't handle.
- React's primary task
 * Work with the DOM to render UI to the page
 * Manage state between render cycles (i.e., state values are 'remembered' from one render to the next). And we can hook into the state using the useState hook.
 * Keep UI updated whenever state changes occur.

- What React doesn't handle on its own
 * (Out)side effects ie., anything that lives outsode of react's ecosystem/reach e.g localStorage on the browser, API/ database interactions, subscriptions (web sockets), syncing two different internal states together. Basically anything that react isn't in charge of can be considered a side effect. That is why we use the useEffect hook which is also known as the effect hook. 
- The useEffect hook can be thought of as a tool that we use as a blank canvas that allows us to interact outside of react's ecosystem i.e., sync react states with outside systems. 


#### Making API calls
- Getting data from an APi consists of two parts: 
 * Getting data - fetching with axios or fetch API.
 * Taking the data and saving it in a state so that your app can interact with it. If you save to state without the useEffect hook it will lead to an infinite rendering loop since when saved to state, state changes leading to a rerendering the repeat of same process.

#### useEffect
- Performs side effects in function components e.g., making HTTP requests when page loads
- Takes twp parameters:
 * A callback function where we put our side effects code.
 * A dependencies array that causes the useEffect code to run when its value changes thus preventing it from running during every render.
 ```js
    // No value so only one render during first render
    []
    // Value is hard coded so one run; value isn't compared to any prev value
    [1]    
    // Will run everytime count changes
    [count]
 ```

- React runs the useEffect function when: 
 1. as soon as the component loads, first render.
 1. on every re-render of the component, assuming no dependencies array

- React won't the useEffect function when: 
 1. when the values of the dependencies in the array stay the same between ewnders


#### Async functions inside useEffect
- Never make the callback function in useEffect async since it will return a promise, you can use it in a function inside instead. Refer to the notes ahead on clean up.

**NB:**
   * We can't use a value like window.innerWidth in the dependencies array since a component gets run each time its rendered and at say a random instance when the component is rendered, the value of innerWidth is equal to maybe 474, that's a constant value that won't change on its own so the useEffect code won't be run again. Better to create a state with innerWidth as its default value and when window width changes the state updates via a resize event listener
   ```jsx
    //Code in App.js
    const [show, setShow] = useState(true)
    function toggle(){
        setShow(prevShow=> !prevShow)
    } 

    return (
        <div>
            //when then window tracker is toggled off it is unmmounted and when on it is remounted
            <button onClick={toggle}>Toggle windowtracker</button>
            {show && <WindowTracker />}
        </div>
    )

    //Code in WindowTracker.js
    export default function WindowTracker(){
        const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
        useEffect(()=>{
            window.addEventListener("resize", ()=>{
                setWindowWidth(window.innerWidth)
            })
        }, [])

        return(
            <h1>Window width: {window.innerWidth}</h1>
        )
    }
   ```
   * From the code above we have a bug, the window tracker component is only mounting when its parent is allowing it to render with the shoow variable. When the parent renders the window tracker it immeadiately launched an event listener ehci is registered within the DOM itself so even if the component is toggled off and try to resize the window, we get an error that states we cannot update state on an unmounted component, the windowtracker is no longer a part of the DOM but the browser itself is still listening for the resize event and trying to set the window width of an unmounted component, this is called a **memory leak**


#### UseEffect Cleanup Function
-  Previosuly, if we were to turn off the window tracker component,and run the resize event we got a memory leak, this was because we setup an event listener on the window whcih registered it with our browser that even removing the windowTracker component by toggling it off it doesn't automatically remove that event listener.
- Always remember the potential xonsequences that might happen if you don't cleanup the things you do in a side effect.
- An instance we might need a cleanup is when creating a websocket connection with a chat api and you have a chat app that will update your screen automatically every time there is a new chat message on the server. When you create that subscritption to the chat api and then try to unmount the component, it is good to sever that that websocket connection as a way to 'cleanup' the effect you have created in the useEffect.
- To implement it we use the useEffect cleanup where we can return a cleanup function. The function has no idea what the side effects are so we have to write code to cleanup the side effects e.g., 
```jsx
        useEffect(()=>{
            function watchWidth(){
                setWindowWidth(window.innerWidth)
            }

            window.addEventListener("resize", watchWidth)
            //cleanup function
            return () => {
                window.removeEventListener("resize", watchWidth)                
            }
        }, [])

```
- Above, when we toggle-remove the WindowTracker, react recognizes that the component has reached the end of its life cycle and is about to be removes from the DOM so it takes the cleanup function it recieves and runs it therefore fixing the memory leak. Most effects don't need a cleanup function. 
- In short, UseEffect takes a function as its parameter. If that function returns something, it needs to be a cleanup function. Otherwise, it should return nothing. If we make it an async function, it automatically returns a promise instead of a function/nothing since whatever we return from an async function doesn't become a bare value return that we can recieve in a variable when calling a function but instead an async function always returns a promise; but reacts expects the return value to be a function that it uses to clear the side effects.
- Therefore, if you want to use async function inside of useEffect, you need to define the function separately inside of the callback function instead of making the callback function async
- Tie up - useEffect is allowed to return another function that cleans up any side effects that might be lingering incase the component dies. 
> Other hooks: there are other inbuilt hooks, you can also have own custom hooks.


> Read React Documentation
> Add images from gallery

