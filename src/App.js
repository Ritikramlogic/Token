import "./App.css";
import React from "react";
// import Web3 from "web3";
import { ethers } from "ethers";
import { ContactAddress, ABI } from "./config";
import { parseUnits } from "@ethersproject/units";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      wallet_add: "",
    };
    this.Transfer = this.Transfer.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    //When metamask is Installed
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is  installed!");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      const signer = await provider.getSigner();
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      this.setState({
        address: account[0],
      });

      window.Contract = new ethers.Contract(ContactAddress, ABI, signer);
      console.log(window.Contract);
    } else {
      alert("MetaMask is not  installed!");
    }
  }

  Transfer() {
    console.log(this.state.address);
    window.Contract.Airdrop(this.state.address)
      .then((data) => alert(`This is the Transaction Hash: ${data.hash}`))
      .catch((err) => console.log(err.data.message));
    // console.log(`The Transcation fees is : ${airdrop}`);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "100px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", marginBottom: "2rem" }}>
          <div>Account Address: </div>
          <div> {this.state.address}</div>
        </div>
        <button
          onClick={this.Transfer}
          style={{
            color: "#fff",
            background: "black",
            borde: "none",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            width: "200px",
            justifyContent: "center",
          }}
        >
          Transfer
        </button>
      </div>
    );
  }
}

export default App;
