import Link from 'next/link';
import React from 'react';

interface YouTubeChannelInfoProps {
  user: {
    name: string;
    email: string;
    image: string;
    youtube?: {
      snippet: {
        title: string;
        description: string;
        customUrl: string;
        thumbnails: {
          high: {
            url: string;
          };
          
        };
      };
      statistics: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
      };
    };
  };
}

const YouTubeChannelInfo: React.FC<YouTubeChannelInfoProps> = ({ user }) => {
  const { youtube } = user;

  if (!youtube) {
    return <div>No YouTube data available.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full"
          src={youtube.snippet.thumbnails.high.url}
          alt={youtube.snippet.title}
        />
        <div>
          <h2 className="text-2xl font-bold">{youtube.snippet.title}</h2>
          <p className="text-sm text-gray-500">{youtube.snippet.customUrl}</p>
        </div>
      </div>
      <p className="text-gray-700">{youtube.snippet.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Subscribers</h3>
          <p className="text-2xl">{youtube.statistics.subscriberCount}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Total Views</h3>
          <p className="text-2xl">{youtube.statistics.viewCount}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Videos</h3>
          <p className="text-2xl">{youtube.statistics.videoCount}</p>
        </div>
      </div>
      <div className="mt-12 w-full grid text-center lg:grid-cols-2 lg:text-left gap-4">
        <Link
          href="/tools/keyword-recommendation"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Keyword Recommendation Tool{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="text-sm opacity-50">
            Find and research keywords based on your query
          </p>
        </Link>
        <Link
          href="/tools/upload-video"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            YouTube Video Uploader{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="text-sm opacity-50">
            Upload your YouTube videos with keywords
          </p>
        </Link>
      </div>
    </div>
  );
};

export default YouTubeChannelInfo;
