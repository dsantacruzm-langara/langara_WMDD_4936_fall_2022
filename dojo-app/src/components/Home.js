//imports
import BlogList from './BlogList';
import useFetch from '../useFetch';

const Home = () => {

  //variables and custom functions

  const { data: blogs, isPending, error } = useFetch('http://localhost:5000/blogs')

  return (
    <div className="home">
{/*       Using props we pass some info from a parent component
      to a child component. The attribute is custom called
      and the value is any data */}
      { error && <div>{ error }</div>}
      { isPending && <div>Loading...</div>}
      { blogs && <BlogList blogs = {blogs} title = "All blogs!"/>}
    </div>
  );
};

export default Home;
