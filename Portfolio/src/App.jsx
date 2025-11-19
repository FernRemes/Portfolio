import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './route/home'
import About from './route/about'
import Projects from './route/projects'
import Skills from './route/skills'
import Contact from './route/contact'
import Layout from './route/layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wraps all pages */}
        <Route element={<Layout />}>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/about" element = {<About/>}/>
          <Route path = "/projects" element = {<Projects/>}/>
          <Route path = "/skills" element = {<Skills/>}/>
          <Route path = "/contact" element = {<Contact/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
