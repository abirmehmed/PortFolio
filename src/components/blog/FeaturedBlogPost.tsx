
import React from 'react';
import { BlogPost } from './types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface FeaturedBlogPostProps {
  post: BlogPost;
}

const FeaturedBlogPost: React.FC<FeaturedBlogPostProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group hover:translate-y-[-5px] bg-card/90 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <Link to={`/blog/${post.id}`} className="h-full overflow-hidden relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/70 via-transparent to-transparent opacity-0 md:opacity-100"></div>
        </Link>
        
        <div className="p-8 flex flex-col justify-between relative">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-detective-accent/5 rounded-full blur-xl animate-pulse-subtle"></div>
          
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <span className="px-3 py-1 rounded-full bg-detective-accent/20 text-detective-accent font-medium animate-pulse-subtle">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {post.category}
              </span>
            </div>
            
            <Link to={`/blog/${post.id}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-detective-accent transition-colors duration-300 leading-tight">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center group-hover:text-detective-accent/70 transition-colors duration-300">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center group-hover:text-detective-accent/70 transition-colors duration-300">
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <Link to={`/blog/${post.id}`}>
              <Button className="w-full md:w-auto group overflow-hidden relative">
                <span className="relative z-10 flex items-center">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-detective-accent/0 group-hover:bg-detective-accent/10 transition-colors duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedBlogPost;
