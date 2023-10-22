# Youtube Web3 Clone
The "YouTube Web3 Decentralized Clone" is an innovative web application that reimagines the traditional video-sharing platform, such as YouTube, by leveraging Web3 technologies to create a decentralized and censorship-resistant environment for content creators and viewers.

![image](https://github.com/zexoverz/web3-youtube/blob/master/imgPreview/landing.png)

## Tech Stack
The greatest approach to improving my Web3 skills is to use them to create projects. 
In this project, i'm build a full-stack YouTube clone on top of the Polygon blockchain using the below tech stack:

- Frontend framework: Next.js
- Smart contracts: Solidity
- Ethereum web client library: Ethers.js
- File storage: IPFS
- Querying data: The Graph
- CSS Framework: TailwindCSS
- Ethereum development environment: Hardhat
- Layer 2 blockchain: Polygon
- Video Infrastructure: Livepeer

## The Graph Implementation
The Graph is an off-chain indexing solution that can help you query data in a much easier way.
In this project, Im using The Graph to query the videos from the blockchain, because it makes it so easy and it uses GraphQL query language.

![image](https://github.com/zexoverz/web3-youtube/blob/master/imgPreview/graph.png)

## Smart Contract
The "YouTube" smart contract is designed for blockchain-based video management. It allows users to upload videos with associated details such as title, description, category, and more. The contract maintains a count of uploaded videos and emits an event whenever a video is uploaded. This basic structure could be the foundation for a decentralized video-sharing platform.

Youtube Contract (Mumbai) : 0xB95d40Bed31ca6052577B60Ef24A07E769407bA9

![image](https://github.com/zexoverz/web3-youtube/blob/master/imgPreview/contract.png)

## Features
- Upload Video
  
  We can upload video and thumbnail using combination web3 storage and livepeer to store the data decentralized

![image](https://github.com/zexoverz/web3-youtube/blob/master/imgPreview/upload.png)

- Fetch Video
  
  We can fetch video from blockchain using graphQL and connected with sub graph

![image](https://github.com/zexoverz/web3-youtube/blob/master/imgPreview/home.png)

