'use client'

import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "../components/Video";
import { Header } from "../components/Header";

export default function Home() {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Get the client from the useApolloClient hook
  const client = useApolloClient();

  // Query the videos from the the graph
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

  // Function to get the videos from the graph
  const getVideos = async () => {
    // Query the videos from the graph
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 200,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
                    // NEW: Added where in order to search for videos
          where: {
            ...(search && {
              title_contains_nocase: search,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        // Set the videos to the state
        setVideos(data.videos);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
      });
  };


  useEffect(() => {
    // Runs the function getVideos when the component is mounted
    getVideos();
  }, [search]);
  return (
    <div className="w-full max-h-full bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 laptop:h-screen tablet:h-full bg-[#1a1c1f] flex flex-col">
        <Header
        search={(e) => {
            setSearch(e);
        }}>

        </Header>
        <div className="flex flex-row flex-wrap m-5 ">
          {videos.map((video) => (
            <div
            className="w-80"
            onClick={() => {
                // Navigation to the video screen (which we will create later)
                window.location.href = `/video?id=${video.id}`;
            }}
            >
                <Video video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
