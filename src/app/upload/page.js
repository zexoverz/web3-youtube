'use client'

import React, { useState, useRef, useMemo } from "react";
import { BiCloud, BiMusic, BiPlus, BiCodeBlock,  } from "react-icons/bi";
import saveToIPFS from "../utils/saveToIPFS";
import { useCreateAsset } from "@livepeer/react";
import getContract from "../utils/getContract";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");

  const router = useRouter()
 
  const {
    mutate: createAsset,
    data: assets,
    progress: progress,
    isLoading,
    status,
    error,
  } = useCreateAsset({
    sources: [{ name: title, file: video }],
    noWait: true,
  });

  console.log(progress, "PROGRESSS")
  // console.log(status, "STATUS")
  

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  // When a user clicks on the upload button
  const handleSubmit = async () => {
    try{
      toast.loading("uploading asset..")
      // Calling the upload video function
      await uploadVideo();
      
      delay(5000)
      toast.dismiss();
    }catch(err){
      toast.dismiss()
      toast.error("Error Uploading Video Asset!")
      console.log(err)
    }
    
  }

  // Function to upload the video to IPFS
  const uploadThumbnail = async () => {
    // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail);
    // Returning the CID
    return cid;
  };

  // Function to upload the video to Livepeer
  const uploadVideo = async () => {
    // Calling the createAsset function from the useCreateAsset hook to upload the video
    createAsset({
      name: title,
      file: video,
    });
  };

  // Function to save the video to the Contract
  const saveVideo = async () => {
    toast.dismiss();
    toast.loading("creating blockchain transactions..")
    // Calling the upload thumbnail function and getting the CID
    const thumbnailCID = await uploadThumbnail();

    // Creating a object to store the metadata
    let data = {
      video: assets ? assets[0].id : null,
      title,
      description,
      location, 
      category,
      thumbnail: thumbnailCID,
      UploadedDate: Date.now(),
    };

    console.log(data, "REQUEST BODY")

    try{
      // Get the contract from the getContract function
      let contract = await getContract()

      // Upload the video to the contract
      let response = await contract.uploadVideo(
        data.video,
        data.title,
        data.description,
        data.location,
        data.category,
        data.thumbnail,
        data.UploadedDate
      );

      console.log(response, "BLOCKCCHAIN RESPONSE")

      toast.dismiss()
      toast.success("Save Video Success!", {
        duration: 5000
      })

      router.push("/home")
      
    }catch(err){
      toast.dismiss()
      toast.error("Error Save Video To Smart Contract!")
      console.log(err)
    }
  };

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );


  return (
    <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
      <Toaster></Toaster>
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            {
              assets && <button
              disabled={isLoading}
              onClick={() => {
                saveVideo();
              }}
              className="bg-green-500 hover:bg-green-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCodeBlock />
              <p className="ml-2">Create Video Transaction</p>
            </button> 
            }
            {
              (!assets && isLoading) && <button
              disabled={true}
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              >
                <BiCloud />
                <p className="ml-2">{progressFormatted ? progressFormatted : "Preparing.."}</p>
              </button>
            }

            {
              (!assets && !isLoading) && <button
              // disabled={isLoading}
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              >
                <BiCloud />
                <p className="ml-2">Upload</p>
              </button>
            }
          </div>
        </div>
        <div className="flex flex-col w-[80%] m-auto  mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className=" text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className=" text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className=" text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className=" text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row w-[90%]  justify-between">
              <div className="flex flex-col w-2/5"> 
                    <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

                    <div
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                      className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
                    >
                      {thumbnail ? (
                        <img
                          onClick={() => {
                            thumbnailRef.current.click();
                          }}
                          src={URL.createObjectURL(thumbnail)}
                          alt="thumbnail"
                          className="h-full rounded-md"
                        />
                      ) : (
                        <BiPlus size={40} color="gray" />
                      )}
                    </div>

                    <input
                      type="file"
                      className="hidden"
                      ref={thumbnailRef}
                      onChange={(e) => {
                        setThumbnail(e.target.files[0]);
                      }}
                    />
              </div>

              <div className="flex flex-col w-2/5"> 
                <div
                  onClick={() => {
                    videoRef.current.click();
                  }}
                  className={
                    video
                      ? " w-96   rounded-md  h-64 items-center justify-center flex"
                      : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
                  }
                >
                  {video ? (
                    <video
                      controls
                      src={URL.createObjectURL(video)}
                      className="h-full rounded-md"
                    />
                  ) : (
                    <p className="text-[#9CA3AF]">Upload Video</p>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    ref={videoRef}
                    accept={"video/*"}
                    onChange={(e) => {
                      setVideo(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                />
                </div>
              </div>
            </div>
            
          </div>

          
        </div>
        
      </div>
    </div>
  );
}
