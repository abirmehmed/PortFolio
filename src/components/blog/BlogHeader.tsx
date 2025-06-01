
import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Rss, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const BlogHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription Successful!",
        description: "You've been added to my newsletter.",
        duration: 3000,
      });
      setEmail('');
    }
  };

  return (
    <section 
      className="py-24 md:py-32 relative overflow-hidden"
      ref={headerRef}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-detective-blue/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-detective-accent/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-detective-accent/30 rounded-full animate-float"></div>
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-detective-blue/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-block px-4 py-1 rounded-full bg-detective-accent/20 text-detective-accent font-medium mb-4 animate-pulse-subtle">THE CASE FILES</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-detective-accent to-detective-blue bg-clip-text text-transparent">Detective's Blog & Videos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join me as I document my investigative journey through the world of programming, 
              sharing tutorials, experiences, and insights from my cases in both written and video format.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white group hover-lift shadow-lg"
                onClick={() => window.open('https://www.youtube.com/channel/YOUR_CHANNEL_ID', '_blank')}
              >
                <Youtube className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Subscribe to my YouTube
              </Button>
              
              <Button 
                variant="outline"
                className="border-detective-accent text-detective-accent hover:bg-detective-accent/10 hover-lift shadow-md"
                onClick={() => window.open('/rss.xml', '_blank')}
              >
                <Rss className="mr-2 h-5 w-5" />
                RSS Feed
              </Button>
            </div>
            
            <div className="mt-10 max-w-md mx-auto">
              <div className="bg-card/50 backdrop-blur-lg border border-border/30 rounded-lg p-6 shadow-xl hover-lift transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5 text-detective-accent" />
                  <span>Get new blog posts in your inbox</span>
                </h3>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-grow px-4 py-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-detective-accent/50 transition-all duration-300"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="group"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;
