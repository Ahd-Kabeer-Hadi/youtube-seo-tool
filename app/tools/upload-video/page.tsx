"use client";
import { useSession, signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    tags: "",
    categoryId: "",
    privacyStatus: "private",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    []
  );
  const [regionCode, setRegionCode] = useState<string>("");

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to sign-in page
    } else if (status === "authenticated") {
      fetchRegionCode();
    }
  }, [status]);
  const fetchRegionCode = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      setRegionCode(response.data.country);
    } catch (error) {
      console.error("Error fetching region code:", error);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${regionCode}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      setCategories(
        response.data.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [regionCode]);

  useEffect(() => {
    if (regionCode) {
      fetchCategories();
    }
  }, [regionCode, fetchCategories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVideoDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    if (!videoFile) return alert("Please select a video file to upload.");

    setUploading(true);
    setUploadedVideo(null);
    setUploadProgress(0);

    try {
      // Step 1: Initiate the resumable upload session
      const initResponse = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable",
        {
          snippet: {
            title: videoDetails.title,
            description: videoDetails.description,
            tags: videoDetails.tags.split(","),
            categoryId: videoDetails.categoryId,
          },
          status: {
            privacyStatus: videoDetails.privacyStatus,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const uploadUrl = initResponse.headers.location;

      // Step 2: Upload the video file to the obtained URL in chunks or in full
      await uploadVideoChunks(uploadUrl);

      // Step 3: Fetch the uploaded video details
      const videoId = await fetchUploadedVideoId(uploadUrl);
      const videoDataResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );

      setUploadedVideo(videoDataResponse.data.items[0]);
      setUploading(false);
      setUploadProgress(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const uploadVideoChunks = async (uploadUrl: string) => {
    const chunkSize = 256 * 1024; // 256KB per chunk
    let start = 0;
    let end = chunkSize;

    while (start < videoFile!.size) {
      const videoChunk = videoFile!.slice(start, end);
      await axios.put(uploadUrl, videoChunk, {
        headers: {
          "Content-Type": videoFile!.type,
          "Content-Range": `bytes ${start}-${end - 1}/${videoFile!.size}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / videoFile!.size
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      start = end;
      end = Math.min(end + chunkSize, videoFile!.size);
    }
  };

  const fetchUploadedVideoId = async (uploadUrl: string) => {
    const response = await axios.put(uploadUrl, null, {
      headers: {
        "Content-Length": "0",
        "Content-Range": `bytes */${videoFile!.size}`,
      },
    });

    return response.data.id;
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Upload a Video to YouTube
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={videoDetails.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              name="description"
              value={videoDetails.description}
              onChange={handleInputChange}
              placeholder="Enter video description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={videoDetails.tags}
              onChange={handleInputChange}
              placeholder="e.g., coding, tutorial"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              value={videoDetails.categoryId}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Privacy Status
            </label>
            <select
              name="privacyStatus"
              value={videoDetails.privacyStatus}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </div>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
              uploading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </Button>

          {uploading && uploadProgress !== null && (
            <div className="mt-4">
              <p className="text-center text-blue-600">
                Upload progress: {uploadProgress}%
              </p>
            </div>
          )}

          {uploadedVideo && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-green-600">
                Video Uploaded Successfully!
              </h3>
              <Image
                width={100}
                height={100}
                src={uploadedVideo.snippet.thumbnails.default.url}
                alt="Video Thumbnail"
                className="mx-auto mt-4 rounded-md shadow-md"
              />
              <p className="mt-2">
                <a
                  href={`https://www.youtube.com/watch?v=${uploadedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Watch on YouTube
                </a>
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return null; // Render nothing while redirecting
}
