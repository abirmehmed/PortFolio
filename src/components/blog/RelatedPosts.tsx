
import React from 'react';
import { BlogPost } from './types';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;
  
  return (
    <section className="mt-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-500 group hover:translate-y-[-5px] border-border/40 bg-card/90 backdrop-blur-sm">
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 bg-muted/50 border-none text-xs">
                  {post.category}
                </Badge>
                
                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-detective-accent transition-colors duration-300">
                  {post.title}
                </h3>
                
                <div className="flex items-center text-sm text-muted-foreground mt-3">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
