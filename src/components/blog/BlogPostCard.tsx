
import React, { useState } from 'react';
import { Calendar, Clock, Share2, X, ArrowRight } from 'lucide-react';
import { BlogPost } from './types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const shareUrl = `https://yourdomain.com/blog/${post.id}`;
  
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    let shareLink = '';
    
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
        window.open(shareLink, '_blank');
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(shareLink, '_blank');
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(shareLink, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied!",
          description: "The link has been copied to your clipboard.",
          duration: 3000,
        });
        break;
    }
    
    setShowShareMenu(false);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full border-border/40 relative bg-card/80 backdrop-blur-sm hover:translate-y-[-5px] group">
      <Link to={`/blog/${post.id}`} className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium bg-muted/80 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-detective-accent/20 group-hover:text-detective-accent">
            {post.category}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-detective-accent hover:bg-detective-accent/10 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              setShowShareMenu(!showShareMenu);
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-detective-accent transition-colors duration-300">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-4 border-t border-border/30 mt-auto">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center group-hover:text-detective-accent/70 transition-colors duration-300">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center group-hover:text-detective-accent/70 transition-colors duration-300">
            <Clock className="mr-1 h-3 w-3" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className="group">
          <Button 
            variant="link" 
            className="p-0 h-auto text-detective-accent group-hover:text-detective-accent/90 transition-all duration-300 font-medium flex items-center gap-1"
          >
            Read more
            <ArrowRight className="h-3 w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300" />
          </Button>
        </Link>
      </CardFooter>
      
      {/* Share Menu */}
      {showShareMenu && (
        <div className="absolute top-12 right-2 bg-card shadow-xl rounded-lg border border-border z-10 p-2 animate-fade-in backdrop-blur-md">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <span className="text-sm font-medium">Share this post</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-detective-accent" onClick={() => setShowShareMenu(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs hover:bg-blue-500/10 hover:text-blue-500 transition-colors duration-300" 
              onClick={() => handleShare('twitter')}
            >
              Twitter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs hover:bg-blue-700/10 hover:text-blue-700 transition-colors duration-300" 
              onClick={() => handleShare('facebook')}
            >
              Facebook
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs hover:bg-blue-600/10 hover:text-blue-600 transition-colors duration-300" 
              onClick={() => handleShare('linkedin')}
            >
              LinkedIn
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs hover:bg-detective-accent/10 hover:text-detective-accent transition-colors duration-300" 
              onClick={() => handleShare('copy')}
            >
              Copy Link
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BlogPostCard;
