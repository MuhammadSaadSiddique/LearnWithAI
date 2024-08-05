
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home/Home';
import Email from './pages/Email';

// import About from './pages/About/About';
// import Contact from './pages/Contact/Contact';
// import Courses from './pages/Courses/Courses';

function App() {
  return (
    <div>
      <Navbar expand="lg" className='position-absolute w-100'>
        <Container>
          <Navbar.Brand>
            <Link to="/" className='navbar.brand d-flex align-items-center' >
              {/* from bootstrap icon------backpack */}
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#dc3545" className="bi bi-backpack" viewBox="0 0 16 16">
                <path d="M4.04 7.43a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z" />
                <path d="M6 2.341V2a2 2 0 1 1 4 0v.341c2.33.824 4 3.047 4 5.659v5.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V8a6 6 0 0 1 4-5.659M7 2v.083a6 6 0 0 1 2 0V2a1 1 0 0 0-2 0m1 1a5 5 0 0 0-5 5v5.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8a5 5 0 0 0-5-5" />
              </svg>
              <span className='mx-2 text-light lh-1 fw-semibold'>


                Learn With AI
                <br />

              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='bg-light' />
          <Navbar.Collapse id='basic-navbar-nav' className='text-light'>
            <Nav className='me-auto justify-content-end w-100 text-light align-middle'>
              <Nav.Link as={Link} to='/' className='text-uppercase my-1'>About</Nav.Link>
              {/* <div className='d-flex flex-column flex-sm-row align-items-center hero-header-buttons-container'> */}
                {/* <Nav.Link to="/sign_up">
                  <button type='button' className="btn btn-outline-light btn-sm mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons"> Sign up </button>
                </Nav.Link> */}
                <Nav.Link to="/login">
                  <button type='button' className='btn btn-outline-light btn-sm mx-0 mx-sm-2 my-0 my-sm-0 text-light hero-header-buttons'> Log in </button>
                </Nav.Link>
              {/* </div> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/*' element={<Home />} />
        {/* <Route path='/about' element={<About />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/contact' element={<Contact />} /> */}

      </Routes>

    </div>
  );
}

export default App;
