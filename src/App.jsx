import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import Header from './componenets/Header/Header'
import Home from './componenets/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './componenets/Sidebar/Sidebar';
import Blogs from './componenets/Blogs/Blogs';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [readTime, setReadTime] = useState(0);
  const [bookmarkInfo, setBookmarkInfo] = useState([]);

  useEffect(() => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkInfo(previousBookmark);
  }, []);

  const handleReadTime = (time) => {
    const previousReadTime = JSON.parse(localStorage.getItem("readTime"));

    if (previousReadTime) {
      const sum = previousReadTime + time;
      localStorage.setItem("readTime", sum);
      setReadTime(sum);
    } else {
      localStorage.setItem("readTime", time);
      setReadTime(time);
    }
  }

  const handleBookmark = (title) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmarks"));

    if (previousBookmark && previousBookmark.includes(title)) {
      toast.warn("Already Bookmarked This Blog!");
    }

    localStorage.setItem("bookmarks", JSON.stringify([...bookmarkInfo, title]));
    setBookmarkInfo([...bookmarkInfo, title]);
  }

  return (
    <div>
      <div className='header'>
        <Header></Header>
      </div>
      <div className='main row my-4'>
        <div className='home-container col-md-8'>
          <Home handleReadTime={handleReadTime} handleBookmark={handleBookmark}></Home>
        </div>
        <div className='side-cart col-md-4'>
          <Sidebar readTime={readTime} bookmarkInfo={bookmarkInfo}></Sidebar>
        </div>
      </div>
      <div>
        <Blogs></Blogs>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
