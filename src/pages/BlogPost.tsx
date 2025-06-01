
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { BlogPost as BlogPostType } from '@/components/blog/types';
import { blogPosts } from '@/components/blog/blogData';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate loading delay for better user experience
    setLoading(true);
    
    // Find the post by ID
    const foundPost = blogPosts.find(post => post.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Find related posts with the same category
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      
      setRelatedPosts(related);
    }
    
    // Simulate async loading
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [postId]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-8 w-64 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-64 w-full max-w-4xl bg-muted rounded"></div>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (!post) {
    return (
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-4 max-w-xl animate-fade-in">
              <h1 className="text-3xl font-bold">Post Not Found</h1>
              <p className="text-muted-foreground">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button 
                onClick={handleBack}
                className="mt-4 flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 md:py-16 relative">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-detective-accent/5 rounded-full blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-detective-blue/5 rounded-full blur-3xl animate-pulse-subtle"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlogPostDetail post={post} onBack={handleBack} />
              
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BlogPost;
