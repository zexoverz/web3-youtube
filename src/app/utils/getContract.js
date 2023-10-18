import ContractAbi from "../artifacts/contracts/YouTube.sol/YouTube.json";
import { ethers } from "ethers";

export default function getContract() {
  // Creating a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Getting the signer
  const signer = provider.getSigner();
  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    "0xB95d40Bed31ca6052577B60Ef24A07E769407bA9",
    ContractAbi.abi,
    signer
  );
  // Returning the contract
  return contract;
}
