"use client";
import { useSession, signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface VideoDetails {
  title: string;
  description: string;
  tags: string;
  categoryId: string;
  privacyStatus: string;
}

interface Category {
  id: string;
  title: string;
}

export default function Page() {
  const { data: session, status } = useSession();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails>({
    title: "",
    description: "",
    tags: "",
    categoryId: "",
    privacyStatus: "private",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
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
      if (!regionCode) return;

      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videoCategories",
        {
          params: {
            regionCode: regionCode,
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
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
  }, [regionCode, session?.accessToken]);

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
    if (!videoFile) {
      return alert("Please select a video file to upload.");
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Initiate the upload session
      const initResponse = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
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
      console.log("Upload URL:", uploadUrl);

      // Step 2: Upload the video file in full (simplified)
      const uploadResponse = await axios.put(uploadUrl, videoFile, {
        headers: {
          "Content-Type": videoFile.type,
          "Content-Length": videoFile.size.toString(),
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            if (percentCompleted === 100) {
              setUploadedVideoId(initResponse.data.id);
            }
          }
        },
      });

      // Step 3: Fetch the uploaded video details
      const videoId = initResponse.data.id;
      setUploadedVideoId(videoId);

      // Clear state after successful upload
      setVideoFile(null);
      setVideoDetails({
        title: "",
        description: "",
        tags: "",
        categoryId: "",
        privacyStatus: "private",
      });

      setUploading(false);
      setUploadProgress(null);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploading(false);
      setUploadProgress(null);
    }
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
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
            <div className="mt-4 text-center">
              <p>Upload Progress: {uploadProgress}%</p>
            </div>
          )}

          {uploadedVideoId && (
            <div className="mt-4 text-center">
              <p className="text-green-500">
                Upload successful!{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${uploadedVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Watch your video
                </a>
              </p>
              <div className="mt-2">
                <Image
                  src={`https://img.youtube.com/vi/${uploadedVideoId}/hqdefault.jpg`}
                  alt="Uploaded video thumbnail"
                  width={320}
                  height={180}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
