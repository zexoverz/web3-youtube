// importing axios
import axios from "axios";

const saveToIPFS = async (file) => {
  console.log(file, "CHECK FILE NYAAA")
  // create a new multipart form data
  const formData = new FormData();
  // add file to the form data
  formData.append("file", file);


  console.log(formData, "CHECK FORM DATA")

  var config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN}`,
      "Content-Type": "text/plain",
    },
    data: formData,
  };

  // Posting the form data to the IPFS API
  const response = await axios(config);
  // returning the CID
  return response.data.cid;
};

export default saveToIPFS;