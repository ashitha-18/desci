import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import ProposalDetailsComponent from './details';


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



// ProposalsPage.js

// ... (getContract function and other imports)

const ProposalsPage = () => {
  const { proposalId } = useParams();
  const [proposals, setProposals] = useState([]);
  const [donateAmount, setDonateAmount] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const contract = await getContract();
        const proposalsCount = await contract.getProposalsCount();

        const proposalsData = [];
        for (let i = 0; i < proposalsCount; i++) {
          const proposalDetails = await contract.getProposalDetails(i);
          proposalsData.push({
            id: i,
            details: proposalDetails,
          });
        }

        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);

  const donateToProject = async (proposalId) => {
    try {
      const contract = await getContract();
      const donationAmount = ethers.utils.parseUnits(donateAmount, 'ether');
      await contract.donateToProject(proposalId, { value: donationAmount });
      setDonateAmount('');
    } catch (error) {
      console.error('Error donating to project:', error);
    }
  };

  return (
    <div>
      <h1>All Proposals</h1>
      {proposals.map((proposal) => (
        <div key={proposal.id}>
          <ProposalDetailsComponent details={proposal.details} />
          <label>
            Donate Amount:
            <input
              type="text"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
            />
          </label>
          <button type="button" onClick={() => donateToProject(proposal.id)}>
            Donate to Project
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProposalsPage;
