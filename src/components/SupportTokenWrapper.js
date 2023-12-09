import { ethers } from 'ethers';
import Wildpatron from "../SupportToken.json";
import nft from "./nft.json";

export async function getContract() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = Wildpatron.abi;

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

export async function getContract2() {
  const contractAddress = "0x8F06286c5CfF0AcBc96C8eA289B7F4660981E21C";
  const contractABI = nft.abi;

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

// Add this function to your JavaScript file
export async function donate(recipient, amount) {
  try {
    const contract = await getContract();
    const contract2 = await getContract2();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log(amount);
    const am = ethers.utils.parseEther(amount);
    const estimation = await contract.estimateGas.transfer(recipient, am);
    console.log(estimation);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: recipient,
      value: am
    });

    // Wait for the transaction to be mined
    await tx.wait();
    const receipt = await provider.getTransactionReceipt(tx.hash);
    if (receipt.status === 1) {
      // Funds transfer was successful, mint the NFT in the sender's account
      const mintTx = await contract2.mint(signer.address);
      await mintTx.wait();
      console.log('NFT minted successfully.');
      return true;
    } else {
      // Funds transfer failed
      console.error('Funds transfer failed.');
      return false;
    }
  } catch (error) {
    console.error('Donation error:', error);
    return false;
  }
}
