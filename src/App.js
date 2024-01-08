import React, { useState, useEffect } from 'react';
const {ethers}= require("ethers");
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('hhh');
  const [contract, setContract] = useState(null);
  const [fileContent, setFileContent] = useState('hhhh');
  const [fileName, setFileName] = useState('hhh');

  useEffect(() => {
    // Additional setup or initialization logic can go here
  }, []);

  const uploadAndExtract = () => {
    const fileInput = document.getElementById('fileInput');
    const contentDisplay = document.getElementById('contentDisplay');

    const file = fileInput.files[0];

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target.result;
        setFileContent(content);
        displayContent(content);
      };

      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  };

  const displayContent = (content) => {
    const contentDisplay = document.getElementById('contentDisplay');
    contentDisplay.textContent = `File Name: ${fileName}\n\nFile content:\n\n${content}`;
  };

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log('MetaMask detected!');
    } else {
      alert("MetaMask isn't detected! Please install MetaMask Extension first.");
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0xF8840ADbB95b90B647AdeF28CdE817f6749A53c7';
        const ABI = [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_url",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_content",
                "type": "string"
              }
            ],
            "name": "updateFileHash",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_url",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_newContent",
                "type": "string"
              }
            ],
            "name": "checkDataIntegrity",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];

        const newContract = new ethers.Contract(contractAddress, ABI, signer);
        setContract(newContract);

        return newContract;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateFileHash = async () => {
    console.log(fileName);
    if (fileName === '') {
      alert("You should choose a file and extract its content to update its hash!");
    } else {
      try {
        const currentContract = await connectWallet();
        if (currentContract) {
          const updateFH = await currentContract.updateFileHash(fileName, fileContent);
          await updateFH.wait();
          alert('Hash updated successfully');
        }
      } catch (err) {
        console.error('Connection to contract error:', err);
        alert("You don't have access to update the file hash");
      }
    }
  };

  const verifyIntegrity = async () => {
    console.log(fileContent);
    if (fileName === '') {
      alert("You should choose a file and extract its content!");
    } else {
      try {
        const currentContract = await connectWallet();
        if (currentContract) {
          const verifyIntegrity = await currentContract.checkDataIntegrity(fileName,fileContent);
          console.log('Content to verify integrity:', fileContent, 'and the URL is:', fileName);
          console.log('Result:', verifyIntegrity);
          alert(verifyIntegrity);
        }
      } catch (err) {
        console.error('Connection to contract error:', err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="fileInput" className="form-label">
            Choose a File:
          </label>
          <input type="file" className="form-control" id="fileInput" />
          <button className="btn btn-primary mt-2" onClick={uploadAndExtract}>
            Upload and Extract
          </button>
        </div>
        <div className="col-md-6">
          <div id="contentDisplay" className="mt-2">
            {/* Display content goes here */}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <button className="btn btn-success" onClick={updateFileHash}>
            Update File Hash
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-info" onClick={verifyIntegrity}>
            Verify Integrity
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;