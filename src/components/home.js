import React from 'react';
import { Container } from 'react-bootstrap';
import image from  "../images/front2.jpg"
import Quiz from './quiz';
import first from "../images/first.jpeg"

const WaitlistSignup = () => {
  const handleSignup = () => {
    // URL of your Google Form
    const googleFormUrl = 'https://forms.gle/VS242ujEjve4PVr16';

    // Open the Google Form in a new tab
    window.open(googleFormUrl, '_blank');
  };
  

  return (
    <div
    className="w-screen h-screen relative"
    style={{
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#ffffff',
    }}
  >
    <Container className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center">
    <h1 class="text-black display-2">DESEARCH</h1>
      <h6 className="text-black">Help great initiatives</h6>
      
    </Container>
  </div>
  


  );
};

export default WaitlistSignup;


