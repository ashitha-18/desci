import React from 'react';
import Card from 'react-bootstrap/Card';
import image from "../images/22.jpeg";

const About = () => {
  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center" style={{ backgroundColor: 'black'}}>
      <div className="text-green-600 text-4xl text-center font-semibold pb-8">About Us</div>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-5 text-gray-700 text-lg text-center">
        <Card>
          <Card.Body>
            <p className="mb-5">
              At DESEARCH we aim to help emerging scientific researches on healthcare acquire funding, by providing a platform for users to find and fund for the projects of their interest.
            </p>
          </Card.Body>
        </Card>

        <h3 className="text-2xl font-semibold text-green-600 mt-8">Fund emerging innovations in healthcare</h3>
      </div>
    </div>
  );
};

export default About;
