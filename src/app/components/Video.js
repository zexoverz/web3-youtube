import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";

export default function Video({ horizontal, video }) {
  return (
    <div
      className={`${
        horizontal
          ? "flex flex-row mx-5 mb-5  item-center justify-center"
          : "flex flex-col m-5"
      } `}
    >
      <img
        className={
          horizontal
            ? "object-cover rounded-lg w-60  "
            : "object-cover rounded-lg w-full h-40"
        }
        src={`https://ipfs.io/ipfs/${video.thumbnailHash}`}
        alt=""
      />
      <div className={horizontal && "ml-3  w-80"}>
        <h4 className="text-md font-bold dark:text-white mt-3">
          {video.title}
        </h4>
        <p className="text-sm flex items-center text-[#878787] mt-1">
          {video.category + " • " + moment(video.createdAt * 1000).fromNow()}
        </p>
        <p className="text-sm flex items-center text-[#878787] mt-1">
          {video?.author?.slice(0, 9)}...{" "}
          <BiCheck size="20px" color="green" className="ml-1" />
        </p>
      </div>
    </div>
  );
}
