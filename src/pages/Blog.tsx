
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogPostsList from '@/components/blog/BlogPostsList';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import YouTubeSection from '@/components/blog/YouTubeSection';
import { BlogPost } from '@/components/blog/types';
import { blogPosts } from '@/components/blog/blogData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout, Newspaper, Youtube } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const POSTS_PER_PAGE = 9;

const Blog: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("blog");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Filter posts based on category selection
    if (selectedCategory) {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    } else {
      setFilteredPosts(blogPosts);
    }
    // Reset to page 1 when filter changes
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE, 
    currentPage * POSTS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Extract all unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <BlogHeader />
          
          <section className="py-12 md:py-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-detective-accent/5 rounded-full blur-3xl animate-pulse-subtle"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-detective-blue/5 rounded-full blur-3xl animate-pulse-subtle"></div>
            
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <Tabs 
                  defaultValue="blog" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="mb-10"
                >
                  <div className="flex justify-center mb-8">
                    <TabsList className="grid grid-cols-2 w-[400px] shadow-lg backdrop-blur-sm bg-card/80">
                      <TabsTrigger value="blog" className="flex items-center gap-2 py-3 transition-all duration-300">
                        <Newspaper className="h-4 w-4" />
                        <span>Blog Posts</span>
                      </TabsTrigger>
                      <TabsTrigger value="videos" className="flex items-center gap-2 py-3 transition-all duration-300">
                        <Youtube className="h-4 w-4" />
                        <span>YouTube Videos</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="blog" className="space-y-8 animate-fade-in">
                    <BlogCategoryFilter 
                      categories={categories} 
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                    
                    <BlogPostsList posts={paginatedPosts} />
                    
                    {totalPages > 1 && (
                      <div className="mt-12">
                        <Pagination>
                          <PaginationContent>
                            {currentPage > 1 && (
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  className="cursor-pointer hover:text-detective-accent transition-colors"
                                />
                              </PaginationItem>
                            )}
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  isActive={currentPage === page}
                                  onClick={() => handlePageChange(page)}
                                  className={`cursor-pointer transition-all duration-300 ${
                                    currentPage === page 
                                      ? "bg-detective-accent text-detective-dark hover:bg-detective-accent/90" 
                                      : "hover:text-detective-accent"
                                  }`}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            {currentPage < totalPages && (
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  className="cursor-pointer hover:text-detective-accent transition-colors"
                                />
                              </PaginationItem>
                            )}
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="videos" className="animate-fade-in">
                    <YouTubeSection />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Blog;
