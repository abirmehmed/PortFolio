
import React from 'react';
import { BlogPost } from './types';
import BlogPostCard from './BlogPostCard';
import FeaturedBlogPost from './FeaturedBlogPost';
import { Sparkles } from 'lucide-react';

interface BlogPostsListProps {
  posts: BlogPost[];
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts }) => {
  // Extract featured posts
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="space-y-12">
      {/* Featured posts section - only show if we have featured posts */}
      {featuredPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-detective-accent" />
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 gap-8 animate-fade-in">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className="transition-all duration-500"
                style={{ 
                  opacity: 0,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <FeaturedBlogPost post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <div
              key={post.id}
              className="transition-all duration-500"
              style={{ 
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Show message if no posts match the filter */}
      {posts.length === 0 && (
        <div className="text-center py-16 bg-card/40 backdrop-blur-sm rounded-xl border border-border/30 animate-fade-in">
          <p className="text-muted-foreground text-lg mb-2">No posts found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try selecting a different category or check back later for new content.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostsList;
