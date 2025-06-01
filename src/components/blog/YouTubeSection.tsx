
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ThumbsUp } from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: string;
  published: string;
}

const featuredVideos: YouTubeVideo[] = [
  {
    id: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    title: "Building React Applications: Advanced Techniques",
    description: "Learn how to build scalable React applications with modern best practices and advanced state management techniques.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    views: "24K",
    published: "Mar 15, 2024"
  },
  {
    id: "uXWycyeTeCs", // Replace with your actual YouTube video ID
    title: "TypeScript Deep Dive for JavaScript Developers",
    description: "Discover how TypeScript can improve your JavaScript development workflow with static typing and modern language features.",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    views: "18K",
    published: "Apr 2, 2024"
  },
  {
    id: "W6NZfCO5SIk", // Replace with your actual YouTube video ID
    title: "CSS Grid Masterclass: Building Complex Layouts",
    description: "Learn how to create responsive and complex layouts using CSS Grid with practical examples and tips.",
    thumbnail: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    views: "12K",
    published: "Feb 28, 2024"
  }
];

interface YouTubeSectionProps {
  className?: string;
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ className }) => {
  const [activeVideo, setActiveVideo] = React.useState<YouTubeVideo>(featuredVideos[0]);

  return (
    <div className={`space-y-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Featured Videos</h2>
      
      {/* Main Video Player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.id}`}
              title={activeVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">{activeVideo.title}</h3>
            <p className="text-muted-foreground mt-2">{activeVideo.description}</p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <span className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1" /> {activeVideo.views} views</span>
              <span className="mx-3">•</span>
              <span>Published {activeVideo.published}</span>
            </div>
            <div className="mt-5">
              <Button 
                onClick={() => window.open(`https://youtube.com/watch?v=${activeVideo.id}`, '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Video List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">More Videos</h3>
          <div className="space-y-4">
            {featuredVideos.map((video) => (
              <div 
                key={video.id}
                className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  activeVideo.id === video.id ? 'bg-detective-accent/10 border border-detective-accent/20' : 'hover:bg-muted'
                }`}
                onClick={() => setActiveVideo(video)}
              >
                <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded-md">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between overflow-hidden">
                  <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                  <div className="text-xs text-muted-foreground">{video.views} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
