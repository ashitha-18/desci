import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { donate } from "./SupportTokenWrapper";
import second from "../images/second.jpg"


const ProposalCard = ({
  imageSrc,
  name,
  description,
  fund,
  address,
  onDonate,
}) => {
  const [donationAmount, setDonationAmount] = useState("");
  


  const handleDonationSubmit = (event) => {
    event.preventDefault();
    const recipient = address; 
    onDonate(recipient,donationAmount);
    setDonationAmount("");
  };

  return (
    
    <div className="animal-card bg-black hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"   >
      <Card className="bg-black  text-white" >
        <Card.Img variant="top" src={imageSrc} />
        <Card.Body>
          <Card.Title className="text-green-500 text-2xl font-semibold">{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text className="text-orange-500">Approx fund needed : 
          </Card.Text>
          <Card.Text>{fund}</Card.Text>
          <Card.Text className="text-orange-500">Wallet Address: 
          </Card.Text>
          <Card.Text className="text-orange-300"> 
          {address}</Card.Text>
          <form onSubmit={handleDonationSubmit}>
            <div className="form-group mt-4">
              <label htmlFor="donationAmount" className="text-white-500">
                Enter amount:
              </label>
              <input
                type="text"
                className="form-control"
                id="donationAmount"
                value={donationAmount}
                onChange={(event) => setDonationAmount(event.target.value)}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleDonationSubmit}
              style={{ backgroundColor: 'orange', color: 'black' }}
              className="mt-3 hover:bg-green-600"
            >
              Donate
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
   
  );
};


const proposals = [
  {
    name: "Nanoparticles in Cancer — Nuffield Department of Women's & Reproductive Health",
    description: "Our research focuses on the use of nanoparticles in cancer for therapy, imaging or drug delivery. The small size of nanoparticles means that they can passively accumulate in tumours due to the enhanced permeation and retention (EPR) effect. The EPR effect is the property by which certain sizes of molecules accumulate more in tumour tissues than in normal tissues. This occurs because newly formed tumour blood vessels are abnormal in form and architecture, and have poorly-aligned endothelial cells with wide fenestrations through which the molecules can pass. Furthermore, tumour tissues lack efficient lymphatic drainage.",
    fund: "$500,000",
    address: "0x2Cb96CDb27e6604c8daDB0F22fA3f3b8f39e1182",
    imageSrc: "https://images.pexels.com/photos/3900468/pexels-photo-3900468.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Endometriosis Care",
    description: "Endometriosis results in severe pelvic pain and reduced fertility for millions of women worldwide.  Endometriosis CaRe Oxford is a nationally and internationally acclaimed Centre of Expertise in clinical Care and Research into Endometriosis, part of the Nuffield Department of Women's and Reproductive Health at the University of Oxford. Our research seeks to identify what causes this disease to help improve our understanding of its different forms and to help inform novel drug and non-invasive biomarker discovery programmes.",
    fund: "$300,000",
    address: "0xee6E56276328b33C6250db0252125A8BaD0E38DE",
    imageSrc: "https://images.pexels.com/photos/6991907/pexels-photo-6991907.jpeg?auto=compress&cs=tinysrgb&w=600",
  }
];

const Proposalsmain = () => {
  const [donated, setDonated] = useState(false);
  const [connected, setConnected] = useState(false);
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log('Connected to MetaMask!', accounts);
        setConnected(true);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonate = async (recipient, amount) => {
    try {
      
      const donationResult = await donate(recipient,amount);
      if (donationResult) {
        alert("Donation successful!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center" style={{ backgroundColor: 'white'}}>
      <div className="container mx-auto py-10">
        <button
          className="btn btn-primary transition duration-300 ease-in-out transform hover:scale-105" style={{ backgroundColor: 'orange', color: 'black' }}
          onClick={connectToMetaMask}
        >
          Connect to MetaMask
        </button>
        <div className="animal-card container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-center" style={{position: "relative", left: '25%'}}>
        {proposals.map((proposal, index) => (
          <div key={index} className="w-full px-4 mb-8" >
            <ProposalCard
           {...proposal} onDonate={handleDonate} />
          </div>
          
        ))}
      </div>
      </div>
    </div>
  );
};

export default Proposalsmain;
