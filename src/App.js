import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Navbar from "./components/NavigationBar";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost"
import PostList from "./components/PostList";
import Post from "./components/Post";
import About from "./components/AboutUs"
import EditPost from "./components/EditPost"
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import RouteChangeTracker from './components/RouteChangeTracker';


// history.listen(location => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });

const history = createBrowserHistory();

function BlogPost() {
  let { post } = "";
  post = useParams();
  console.log(post);
  return <Post url={post}/>
  // return <div>Now showing post {post}</div>;
}

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-193703930-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    // <div className="App">
    <Router>
      <RouteChangeTracker history={history}/>
      <div>
        <Navbar/>
        
        <Switch>
          <Route path="/posts">
            <PostList/>
          </Route>
          <Route path="/create">
            <CreatePost/>
          </Route>
          <Route path="/edit">
            <EditPost/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/post/:post">
          {/* <CreatePost/> */}
            <BlogPost/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </Router>
  );
}

export default App;
