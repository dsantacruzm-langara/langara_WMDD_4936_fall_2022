import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import { Route, Routes } from "react-router-dom";
import BlogDetails from "./components/BlogDetails";

function App() {
  // const title = 'Welcome to the Jungle';
  // const likes = 50;

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs/:blogId" element={<BlogDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
