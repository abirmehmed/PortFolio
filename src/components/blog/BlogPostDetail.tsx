
import React from 'react';
import { BlogPost } from './types';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removed from bookmarks" : "Saved to bookmarks",
      description: saved ? "Article has been removed from your bookmarks" : "Article has been saved to your bookmarks",
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  // Generate paragraphs from post content
  // In a real app, you might use markdown parsing or HTML content
  const paragraphs = post.content
    ? post.content.split('\n').filter(p => p.trim())
    : ["This is where the full blog post content would be displayed. In a real application, this could be rich text or markdown rendered content.", 
       "For our demo purposes, we're generating some placeholder paragraphs to simulate actual content. Each blog post would typically contain several paragraphs discussing the topic in detail.",
       "The content might include examples, code snippets, images, or other media to illustrate the points being made. The formatting would be consistent with the overall design of the website.",
       "In a production environment, this content would be stored in a database and retrieved when the user navigates to this page. It might also include metadata like tags, related articles, and author information."];

  return (
    <article className="animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6 flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Button>
      
      <div className="space-y-4">
        <Badge variant="outline" className="bg-detective-accent/10 text-detective-accent border-none">
          {post.category}
        </Badge>

        <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-muted"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share article</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full ${saved ? 'text-detective-accent' : 'hover:bg-muted'}`}
              onClick={handleSave}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              <span className="sr-only">Save article</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="h-80 overflow-hidden rounded-lg my-8">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="prose prose-lg max-w-none">
        {/* This would be replaced with the actual content in a real app */}
        {paragraphs.map((paragraph, i) => (
          <p key={i} className={`text-foreground/90 mb-6 ${i === 0 ? 'text-xl leading-relaxed' : ''}`}>
            {paragraph}
          </p>
        ))}
        
        {/* Example of a highlighted section */}
        <div className="bg-detective-accent/5 border-l-4 border-detective-accent p-6 rounded-r-lg my-8">
          <p className="text-foreground/90 italic">
            "This is an example of a highlighted quote or an important section in the article that deserves special attention."
          </p>
        </div>
        
        {/* More paragraphs */}
        <p className="text-foreground/90 mb-6">
          The article would continue with more paragraphs discussing the topic in detail, providing insights, examples, and recommendations.
        </p>
      </div>
      
      <Separator className="my-12" />
      
      {/* Author info and additional notes */}
      <div className="bg-card p-6 rounded-lg border border-border/30 shadow-md">
        <h3 className="text-xl font-bold mb-4">Detective's Notes</h3>
        <p className="text-muted-foreground mb-4">
          This is a section where the author can add additional notes, resources, or calls to action related to the blog post. 
          It could include links to other articles, books, or courses that might be helpful for readers interested in this topic.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary">Web Development</Badge>
          <Badge variant="secondary">Programming</Badge>
          <Badge variant="secondary">JavaScript</Badge>
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;
