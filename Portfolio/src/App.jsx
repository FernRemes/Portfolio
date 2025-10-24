import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './route/home'
import About from './route/about'
import Projects from './route/projects'
import Skills from './route/skills'
import Contact from './route/contact'
import Footer from './components/Footer/Footer'


function App() {
  return (
    
      <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/about" element = {<About/>}/>
          <Route path = "/projects" element = {<Projects/>}/>
          <Route path = "/skills" element = {<Skills/>}/>
          <Route path = "/contact" element = {<Contact/>}/>
        </Routes>
      
      </BrowserRouter>
      <Footer/>

      </>
    
  )
}

export default App
