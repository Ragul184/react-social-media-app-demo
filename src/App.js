import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import PostPage from './PostPage';
import NewPost from './NewPost';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';

import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Nav />
        <Routes>
          <Route path='/' element={
            <Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/posts' >
            <Route index element={<NewPost />} />
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
