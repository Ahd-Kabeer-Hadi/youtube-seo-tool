"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import { Video } from "@/app/types/types";
import { Button } from "@/components/ui/button";

interface ApiResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}

interface Keyword {
  keyword: string;
  avgReach: number;
}

const KeywordRecommendation: React.FC = () => {
  const { data: session, status } = useSession();

  const [keyword, setKeyword] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to sign-in page
    }
  }, [status]);

  useEffect(() => {
    if (!apiResponse) return;

    const fetchVideoDetails = async (videoId: string) => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet,statistics",
              id: videoId,
              key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
            },
          }
        );
        if (response.data.items && response.data.items.length > 0) {
          return response.data.items[0] as Video;
        }
        return null;
      } catch (error) {
        console.error("Error fetching video details:", error);
        return null;
      }
    };

    const processKeywords = async () => {
      const videoIds = apiResponse.items.map((item) => item.id.videoId);
      const videoDetails = await Promise.all(videoIds.map(fetchVideoDetails));

      const keywordMap: { [key: string]: { reach: number; count: number } } =
        {};

      videoDetails.forEach((video) => {
        if (video && video.snippet.tags) {
          const reach = video.statistics.viewCount + video.statistics.likeCount;
          const { title, description, tags } = video.snippet;

          tags.forEach((tag) => {
            const normalizedTag = tag.toLowerCase();
            if (
              fuzzyMatch(normalizedTag, title.toLowerCase()) ||
              fuzzyMatch(normalizedTag, description.toLowerCase())
            ) {
              if (!keywordMap[normalizedTag]) {
                keywordMap[normalizedTag] = { reach: 0, count: 0 };
              }
              keywordMap[normalizedTag].reach += reach;
              keywordMap[normalizedTag].count += 1;
            }
          });
        }
      });

      const keywordArray = Object.keys(keywordMap)
        .map((key) => ({
          keyword: key,
          avgReach: keywordMap[key].reach / keywordMap[key].count,
        }))
        .filter((item) => keywordMap[item.keyword].count > 1); // Exclude tags that appear only once

      keywordArray.sort((a, b) => b.avgReach - a.avgReach);

      setKeywords(keywordArray.slice(0, 10));
    };

    processKeywords();
  }, [apiResponse]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 25,
            q: keyword,
            prettyPrint: true,
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          },
        }
      );
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const fuzzyMatch = (str1: string, str2: string) => {
    const words = str1
      .split(" ")
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(words.join(".*"), "i");
    return regex.test(str2);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      {status === "authenticated" ? (
        <div className="flex flex-col gap-4 justify-center items-center max-w-7xl mx-auto p-4">
          <h1 className="text-3xl font-bold relative z-20 py-8">
            The Best Youtube Keyword Research Tool
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <input
              type="text"
              placeholder="Enter your keyword here"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              disabled={isLoading}
              variant={"default"}
              type="submit"
              className="mt-4 w-full p-2"
            >
              Search
            </Button>
          </form>
          {isLoading && (
            <div className="flex items-center justify-center h-screen">
              Loading...
            </div>
          )}
          {apiResponse && (
            <div className="mt-8 w-full max-w-4xl rounded-lg bg-gradient-to-b from-neutral-950-100 to-stone-950 p-4">
              <h2 className="text-xl font-semibold mb-4">
                Top Related Keywords for: {keyword}
              </h2>
              <div className="flex flex-wrap justify-center">
                {keywords.length > 0 ? (
                  keywords.map((item, index) => (
                    <span
                      key={index}
                      className="m-1 p-2 bg-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700"
                    >
                      {item.keyword}
                    </span>
                  ))
                ) : (
                  <div className="text-center text-neutral-500">
                    It seems the keyword is not that popular, try with an
                    alternative keyword.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          You are not signed in and redirecting to sign-in page, please sign in
          and try again.
        </div>
      )}
    </div>
  );
};

export default KeywordRecommendation;
