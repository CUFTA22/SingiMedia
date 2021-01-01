const react = [
  {
    code: `
    // Explain array on line 5.
    useEffect(() => {
      ...
    }, [])
`,
    a1: {
      a:
        "It's called dependency array, there we must include all props that the component receives and 'depends' on.",
      T: false,
    },
    a2: {
      a: "It's an array where we put options for useEffect hook.",
      T: false,
    },
    a3: {
      a:
        "It's called dependency array, the 'effect' won't apply if values inside haven't changed between re-renders.",
      T: true,
    },
    a4: {
      a:
        "There shouldn't be an array as a second argument of useEffect but an object with different options.",
      T: false,
    },
  },
  {
    code: `
    // Function at line 5 is?
    useEffect(() => {
      ...
      return () => {}
    }, [input])
`,
    a1: {
      a:
        "It's a return function that gives us some value back after effect runs.",
      T: false,
    },
    a2: {
      a: "It's a cleanup function that runs when component unmounts.",
      T: true,
    },
    a3: {
      a:
        "It's a after effect function that always runs after the original effect.",
      T: false,
    },
    a4: { a: "useEffect doesn't have a return function.", T: false },
  },
  {
    question: "What's the right way to implement counter?",
    a1: { a: "setCounter(counter++)", T: false },
    a2: { a: "addCounter(1)", T: false },
    a3: { a: "setCounter(counter + 1)", T: true },
    a4: { a: "setCounter(counter) + 1", T: false },
  },
  {
    question: "What's the data flow in React?",
    a1: { a: "React follows uni-directional data flow.", T: true },
    a2: { a: "React follows bi-directional data flow.", T: false },
    a3: { a: "React uses Star-Shaped data flow.", T: false },
    a4: { a: "React follows the Flux architecture.", T: false },
  },
  {
    question: "The correct syntax is:",
    a1: { a: "fetch.use('url').then(x => x.text() ).then(...)", T: false },
    a2: { a: "fetch('post', 'url').then(x => x.text() ).then(...)", T: false },
    a3: { a: "fetch('url').then(x => x.text() ).then(...)", T: true },
    a4: { a: "fetch.url('url').get(x => x.text() ).then(...)", T: false },
  },
  {
    question: "The correct syntax is:",
    a1: {
      a: "axios.fetch('url').then(res => res.json() ).then(...)",
      T: false,
    },
    a2: {
      a: "axios.post('url').body({data}).then(res => res.data )",
      T: false,
    },
    a3: {
      a: "axios('url', 'method', {options}).then(res => res.json() )",
      T: false,
    },
    a4: {
      a: "axios.post('url', {data}).then(res => res.data ).catch(err => {...})",
      T: true,
    },
  },
  {
    code: `
    // Analyze code
    useEffect(() => {
      ...
      return => {}
    }, [input])
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 6.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    // Explain line 5.
    useEffect(() => {
      ...
      return () => {}
    }, [input])
`,
    a1: { a: "It returns some value after our effect runs.", T: false },
    a2: {
      a:
        "It is a cleanup function that allows us to clean up any subscripttions after component mounts.",
      T: false,
    },
    a3: {
      a:
        "It is a way to use this.setState in functional components, only in return can we set any value to local state.",
      T: false,
    },
    a4: {
      a:
        "It is used to simulate componentWillUnmount in functional components.",
      T: true,
    },
  },
  {
    code: `
    // Analyze code
    const mapDispatchToProps = dispatch => ({
      clearItem: item => dispatch(clearFromCart(item)),
      addItem: item => dispatch(addItem(item)),
      removeItem: item => dispatch(removeItem(item))
    })
`,
    a1: {
      a:
        "We need to pass dispatch and item as arguments of mapDispatchToProps.",
      T: false,
    },
    a2: {
      a: "dispatch and item arguments should be wrapped inside ( ).",
      T: false,
    },
    a3: {
      a: "We can't use arrow functions inside mapDispatchToProps.",
      T: false,
    },
    a4: { a: "There's no error in the code.", T: true },
  },
  {
    question: "How does a class-based component render HTML elements?",
    a1: { a: "render( <h1> Hello World </h1> )", T: false },
    a2: { a: "return render({ <h1> Hello World </h1> })", T: false },
    a3: { a: "render() { return( <h1> Hello World </h1> ) }", T: true },
    a4: { a: "return( <h1> Hello World </h1> )", T: false },
  },
  {
    code: `
    // Is there an error?
    <Switch>
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/post/:id' component={PostPage} />
      </BrowserRouter>
    </Switch>
`,
    a1: { a: "path='/post/id' is the correct syntax.", T: false },
    a2: { a: "BrowserRouter and Switch should switch place.", T: true },
    a3: { a: "component={<AnyPage />} is the correct syntax.", T: false },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // Is there an error?
    return() {  
      render(
          <MyInput onChange={ (e) => this.handleOnChange(e) } />
      );
    }
`,
    a1: { a: "onChange listener can't be used in this way.", T: false },
    a2: { a: "handleOnChange should be without leading this.", T: false },
    a3: { a: "render and return should switch place.", T: true },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // Link comes from React Router
    // Analyze code
    return(
      <>
        <Link to="home"> Home </Link>
        <Link to="about"> About </Link>
      </>
    )
`,
    a1: { a: "We must use <a /> tag inside of link for navigation.", T: false },
    a2: { a: "Lines 5 and 8 are not valid React.", T: false },
    a3: { a: "We must use Route instead of Link for routing.", T: false },
    a4: { a: "to='/home' and to='/about' is the correct syntax.", T: true },
  },
  {
    code: `
    // Is there an error?
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
`,
    a1: { a: "prop shouldn't be inside of [ ].", T: false },
    a2: { a: "...values should be removed.", T: false },
    a3: { a: "(prop) => (event) => { } is not a valid syntax.", T: false },
    a4: { a: "There's no error in code.", T: true },
  },
  {
    code: `
    // <Avatar /> comes from Material-UI library
    // Is there an error?
    <Avatar
      variant="square"
      src={
        lang ? require("../../assets/postIcons/react.svg").default : ""
      }
      alt="Post language"
    />
`,
    a1: { a: "require must always be used on top of the file.", T: false },
    a2: { a: "lang ? ... is not a valid syntax.", T: false },
    a3: { a: ".default should be removed, rest is fine.", T: false },
    a4: { a: "There's no error in code.", T: true },
  },
  {
    code: `
    // <Avatar /> comes from Material-UI library
    // Is there an error?
    <Avatar
      variant="square"
      src={ require("../../assets/postIcons/react.svg") }
      alt="Post language"
    />
`,
    a1: { a: "require() should have a .default at the end.", T: true },
    a2: {
      a:
        "require() is not valid in react, we must use import ' ' from ' ' syntax.",
      T: false,
    },
    a3: { a: "We don't need { } in src=require(...).", T: false },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // Analyze code
    setValue({
      firstName: firstName,
      lastName,
      address: address,
    });
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: false },
    a3: { a: "There's an error at line 6.", T: false },
    a4: { a: "There's no error in the code.", T: true },
  },
  {
    code: `
    // Explain Code
    return(
      <>
        ...
      </>
    )
`,
    a1: {
      a:
        "<> is example of Empty Component, it improves the performance of our app.",
      T: false,
    },
    a2: {
      a:
        "<> is example of React Fragment, it allows us to render multiple DOM elements without rendering any container.",
      T: true,
    },
    a3: {
      a:
        "<> is example of Empty Div, it renders as regular div but can't take any attributes.",
      T: false,
    },
    a4: {
      a:
        "<> is example of React Container, if we wan't to render any react component we need to do it inside of this container instead of regular div.",
      T: false,
    },
  },
  {
    code: `
    // Analyze code
      constructor(props){
          super(props)
          this.setState = {
              signInEmail: '',
              signInPassword: ''
          }
      }
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 4.", T: false },
    a3: { a: "There's an error at line 5.", T: true },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    // Is there an error?
    React.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    );
`,
    a1: { a: "document.getElementById('#root') is correct.", T: false },
    a2: { a: "Only ReactDOM can render components, not React.", T: true },
    a3: {
      a:
        "Provider and BrowserRouter should be removed, react.render takes only one component as its first argument.",
      T: false,
    },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // All components and props come from Material-UI library
    // Is there an error?
    {isAuthenticated && (
      <ListItem onClick={() => dispatch(logout())} button>
        <ListItemIcon>
          <ExitToAppRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={"Sign Out"} />
      </ListItem>
    ) : null}
`,
    a1: { a: "We can't return null, it must be ' ' or undefined", T: false },
    a2: { a: "dispatch is not a function.", T: false },
    a3: { a: "&& should be replaced with ? operator.", T: true },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // Is there an error?
    axios
      .post("/user/get", {
        params: {
          displayName: params.displayName,
        },
        headers: {
          Authorization: 'Bearer token',
        },
      })
      .then((res) => {
        ...
      })
`,
    a1: { a: "/user/get is not a valid url path.", T: false },
    a2: { a: "Post method can't have params.", T: true },
    a3: { a: "Authorization header does not exist.", T: false },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    code: `
    // Explain code
    useEffect(() => {
      ...
    }, [])
`,
    a1: {
      a:
        "useEffect is similar to componentDidMount and componentDidUpdate, but for functional components.",
      T: true,
    },
    a2: {
      a:
        "useEffect is similar to componentDidMount and componentWillUpdate, but for functional components.",
      T: false,
    },
    a3: {
      a:
        "useEffect is similar to componentWillUnmount and componentDidUpdate, but for functional components.",
      T: false,
    },
    a4: {
      a:
        "useEffect is similar to componentWillMount and shouldComponentUpdate, but for functional components.",
      T: false,
    },
  },
  {
    code: `
    // Is there an error?
    import { addStore } from "@reduxjs/toolkit";
    import userReducer from "./user/userSlice";

    export default addStore({
      reducer: {
        user: userReducer
      },
    });
`,
    a1: {
      a: "Extra pair of { }, correct syntax is addStore( reducer: { } ).",
      T: false,
    },
    a2: { a: "addStore does not exist, it should be configureStore.", T: true },
    a3: { a: "userReducer does not need user: in front of it.", T: false },
    a4: { a: "There's no error in code.", T: false },
  },
  {
    question: "What are Portals in React?",
    a1: {
      a: "A way for components who don't share the same parent to communicate.",
      T: false,
    },
    a2: {
      a:
        "Components that catch JavaScript errors anywhere in their child component tree.",
      T: false,
    },
    a3: {
      a: "A way to render children outside of parents DOM hierarchy.",
      T: true,
    },
    a4: { a: "No such thing exists in React.", T: false },
  },
  {
    code: `
    // Analyze code
    const Component = ({ name }) => {
      return(
        <h1> { props.name } </h1>
      )
    }
`,
    a1: {
      a: "There's an error at line 3, we can't destructore props.",
      T: false,
    },
    a2: {
      a: "The component needs to have render method before return.",
      T: false,
    },
    a3: { a: "It should be just name, not props.name.", T: true },
    a4: { a: "There's no need to wrap props.name in { }.", T: false },
  },
  {
    question: "What are Error Boundaries in React?",
    a1: {
      a:
        "Simple errors that can be found in any app, we shouldn't worry too much about them.",
      T: false,
    },
    a2: {
      a:
        "Components that catch JavaScript errors anywhere in their child component tree.",
      T: true,
    },
    a3: {
      a: "Errors that break the UI and need to be fixed immediately.",
      T: false,
    },
    a4: {
      a:
        "Worst possible error that can happen in our app sits at the edge of Error Boundary.",
      T: false,
    },
  },
  {
    code: `
    // Explain the code?
    const HomePage = React.lazy(() => import("../HomePage"));
    const SignIn = React.lazy(() => import("../SignIn"));
`,
    a1: {
      a:
        "This is example of Code Slicing, a method that allows us to reduce our code into many different components.",
      T: false,
    },
    a2: {
      a:
        "This is example of Code Splitting, a method that allows us to break out code into multiple bundles and load them as we need.",
      T: true,
    },
    a3: {
      a:
        "This is example of Code Lazying, it allows us to import components outside of src folder, something we can not do with regular import.",
      T: false,
    },
    a4: {
      a: "React.lazy doesn't exist, it should be React.lazyload.",
      T: false,
    },
  },
  {
    code: `
    // Explain the code?
    const HomePage = React.lazyload(() => import("../HomePage"));
    const SignIn = React.lazyload(() => import("../SignIn"));
`,
    a1: {
      a:
        "This is example of Code Slicing, a method that allows us to reduce our code into many different components.",
      T: false,
    },
    a2: {
      a:
        "This is example of Code Splitting, a method that allows us to break out code into multiple bundles and load them as we need.",
      T: false,
    },
    a3: {
      a:
        "This is example of Lazy Loading, it allows us to load different pages as we visit them.",
      T: false,
    },
    a4: {
      a: "React.lazyload doesn't exist, it should be React.lazy.",
      T: true,
    },
  },
  {
    code: `
    // Explain the code?
    const Component = () => {
      return (
        <div>
          <h1> Hello World </h1>
        </div>
      )
    }
`,
    a1: {
      a:
        "The syntax above is regular JavaScript that all browsers can understand.",
      T: false,
    },
    a2: {
      a: "The syntax above is XML and allows us to use HTML inside of JS.",
      T: false,
    },
    a3: {
      a:
        "The syntax above is ES6, ES6 brought us a lot of additions, few of the most important are arrow functions and HTML in JS.",
      T: false,
    },
    a4: {
      a:
        "The syntax above is JSX, first we transform JSX file into a JavaScript object using JSX transformers like Babel and then pass it to the browser.",
      T: true,
    },
  },
  {
    question: "How is React different from Angular?",
    a1: {
      a: "React is better than Angular ( this is the right answer ).",
      T: true,
    },
    a2: { a: "React is only a 'view' library.", T: false },
    a3: { a: "React uses one-way data binding.", T: false },
    a4: { a: "React is created by Facebook.", T: false },
  },
  {
    question: "What are three principles of Redux?",
    a1: {
      a:
        "Multiple sources of truth, State is read only, Changes are made with pure functions.",
      T: false,
    },
    a2: {
      a:
        "Single source of truth, State is read only, Changes are made with pure functions.",
      T: true,
    },
    a3: {
      a:
        "Multiple sources of truth, State is read only, Changes are made with arrow functions.",
      T: false,
    },
    a4: {
      a:
        "Single source of truth, State can be changed, Changes are made with pure functions.",
      T: false,
    },
  },
  {
    question: "In which lifecycle event do you make AJAX requests?",
    a1: { a: "componentWillMount.", T: false },
    a2: { a: "shouldComponentUpdate.", T: false },
    a3: { a: "componentDidMount.", T: true },
    a4: { a: "componentDidUpdate.", T: false },
  },
  {
    code: `
    // Analyze code
    return (
      <h1> Quiz List </h1>
      <div className={classes.root}>
        {quizzes?.map((quiz, idx) => (
          <QuizCard
            key={idx}
            icon={quiz.icon}
            title={quiz.title}
            diff={quiz.diff}
          />
        ))}
      </div>
    );
`,
    a1: {
      a: "idx can't be used as a second parameter in map function.",
      T: false,
    },
    a2: { a: "return can't have more than one HTML element.", T: true },
    a3: {
      a: "There's an extra ? in quizzes?.map that will throw an error.",
      T: false,
    },
    a4: {
      a: "className is not a valid prop, for adding css classes we use class.",
      T: false,
    },
  },
  {
    code: `
    // Analyze code
    const [counter, setCounter] = useState(0)
    return (
      <>
        <h1> { counter } </h1>
        <button onClick={() => setCounter(counter++)}>Count!</button>
      </>
    );
`,
    a1: { a: "There's an error in line 3.", T: false },
    a2: { a: "There's an error in lines 5 and 8.", T: false },
    a3: { a: "There's an error in line 6.", T: false },
    a4: { a: "There's an error in line 7.", T: true },
  },
  {
    code: `
    // Analyze code
    it('expect to render CardList', () => {
      const mockRobots = [{
        id: 1,
        name: 'John',
        email: 'Johnny'
      }]
      expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot()
  })
`,
    a1: { a: "mockRobots must be an object, not an array.", T: false },
    a2: { a: "Shallow and Expect should switch place.", T: false },
    a3: {
      a: "We need to provide an object to toMatchSnapshot function.",
      T: false,
    },
    a4: { a: "There's no error in the code.", T: true },
  },
  {
    code: `
    // Analyze code
    const mapDispatchToProps = () => {
      return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
      }
    }
`,
    a1: {
      a: "dispatch should be removed from onSearchChange and onRequestRobots.",
      T: false,
    },
    a2: {
      a: "We need to provide event as an argument of onRequestRobots.",
      T: false,
    },
    a3: {
      a: "We need to provide dispatch as an argument of mapDispatchToProps.",
      T: true,
    },
    a4: { a: "There's no error in the code.", T: false },
  },
];

export default react;
