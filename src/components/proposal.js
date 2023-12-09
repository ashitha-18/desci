import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
export async function getContract() {
    const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_proposalId",
                    "type": "uint256"
                }
            ],
            "name": "donateToProject",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "DonationReceived",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "researcher",
                    "type": "address"
                }
            ],
            "name": "ProposalSubmitted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                }
            ],
            "name": "ProposalVerified",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                }
            ],
            "name": "ProposalVoted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_leadResearcher",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_projectTitle",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_projectDetails",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_fundRequired",
                    "type": "uint256"
                }
            ],
            "name": "submitProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_proposalId",
                    "type": "uint256"
                }
            ],
            "name": "verifyProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_proposalId",
                    "type": "uint256"
                }
            ],
            "name": "voteForProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_proposalId",
                    "type": "uint256"
                }
            ],
            "name": "getProposalDetails",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "enum DeSearch.ProposalStatus",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getProposalsCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hasVoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "proposals",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "researcher",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "leadResearcher",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "projectTitle",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "projectDetails",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "fundRequired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "votes",
                    "type": "uint256"
                },
                {
                    "internalType": "enum DeSearch.ProposalStatus",
                    "name": "status",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
  
    try {
      const { ethereum } = window;
  
      if (ethereum && ethereum.chainId === "0xaa36a7") {
        console.log("hereeee");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
      } else {
        throw new Error("Please connect to the sepolia test network");
      }
    } catch (error) {
      console.log("ERROR:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  }




const DeSearchComponent = () => {
  const history = useNavigate();
  const [leadResearcher, setLeadResearcher] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [fundRequired, setFundRequired] = useState('');
  const [proposalIdToVote, setProposalIdToVote] = useState('');

  const submitProposal = async () => {
    try {
      // Convert fundRequired to uint256
      const contract = await getContract();
      const fundRequiredUint = ethers.utils.parseUnits(fundRequired, 'ether');

      // Call the submitProposal function
      await contract.submitProposal(leadResearcher, projectTitle, projectDetails, fundRequiredUint);

      // Clear input fields after submission
      setLeadResearcher('');
      setProjectTitle('');
      setProjectDetails('');
      setFundRequired('');
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  const voteForProposal = async () => {
    try {
      // Call the voteForProposal function
      const contract = await getContract();
      await contract.voteForProposal(proposalIdToVote);

      // Clear input field after voting
      setProposalIdToVote('');
    } catch (error) {
      console.error('Error voting for proposal:', error);
    }
  };

  const navigateToProposals = () => {
    history('/proposals');
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 rounded-lg">
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Submit Proposal</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lead Researcher Name:</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={leadResearcher}
            onChange={(e) => setLeadResearcher(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">projectTitle</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">projectDetails</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fund Required:</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={fundRequired}
            onChange={(e) => setFundRequired(e.target.value)}
          />
        </div>
        {/* ... Repeat the pattern for other form fields ... */}
        <button
          type="button"
          onClick={submitProposal}
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
        >
          Submit Proposal
        </button>
      </form>
    </div>
    <div>
      <button
        type="button"
        onClick={navigateToProposals}
        className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
      >
        View All Proposals
      </button>
    </div>
  </div>
);
};

export default DeSearchComponent;
