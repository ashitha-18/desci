import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WaitlistSignup from './home';
import Proposalsmain from './proposalmain';
import About from './about';
import DeSearchComponent from './proposal';
import ProposalsPage from './proposalsupport';

function Mynavbar() {
  return (
    <Router>
    <Navbar className="bg-black" variant="dark">
      <Container>
        
        <Nav className="ml-auto">
          <Nav.Link href="/" className="text-orange-500 hover:text-orange-400 mx-2 ">Home</Nav.Link>
          <Nav.Link href="/about" className="text-orange-500 hover:text-orange-400 mx-2">About</Nav.Link>
          <Nav.Link href="/proposal" className="text-orange-500 hover:text-orange-400 mx-2">Proposals</Nav.Link>    

          <Nav.Link href="/donate" className="text-orange-500 hover:text-orange-400 mx-2">Fund</Nav.Link>    

        </Nav>
      </Container>
    </Navbar>

    <Routes>
          <Route path="/" exact element={<WaitlistSignup/>} />
          <Route path="/about" element={< About/>} />
          <Route path="/proposal" element={<DeSearchComponent/>}  />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/donate" element={<Proposalsmain/>}  />
    </Routes>

</Router>
  );
}

export default Mynavbar;
