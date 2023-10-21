"use client"

import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "../components/Video";
import VideoComponent from "../components/VideoContainer"

export default function VideoPage() {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const client = useApolloClient();
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash
        date
        author
        createdAt
      }
    }
  `;

  const getRelatedVideos = () => {
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {},
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setRelatedVideos(data.videos);
        const video = data?.videos?.find(
          (video) => video.id === getUrlVars().id
        );
        setVideo(video);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };

  useEffect(() => {
    getRelatedVideos();
  }, []);

  return (
    <div className="w-full  bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 flex ">
        {video && (
          <div className="flex m-10 justify-between laptop:flex-row tablet:flex-col">
            <div className="tablet:w-full w-4/6">
              <VideoComponent video={video} />
            </div>
            <div className="laptop:w-3/6 laptop:ml-5 tablet:w-full ">
              <h4 className="text-md font-bold text-white ml-5 mb-3">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <div
                  onClick={() => {
                    setVideo(video);
                  }}
                  key={video.id}
                >
                  <Video video={video} horizontal={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
