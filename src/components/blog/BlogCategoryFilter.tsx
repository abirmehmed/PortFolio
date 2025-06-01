
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface BlogCategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="mb-8 bg-card/40 backdrop-blur-sm p-6 rounded-xl border border-border/30 shadow-lg animate-fade-in">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Tag className="mr-2 h-5 w-5 text-detective-accent" />
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full transition-all duration-300 hover:shadow-md",
            selectedCategory === null 
              ? "bg-detective-accent text-detective-dark shadow-md" 
              : "hover:bg-detective-accent/10 hover:text-detective-accent"
          )}
          onClick={() => onSelectCategory(null)}
        >
          All Posts
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full transition-all duration-300 hover:shadow-md",
              selectedCategory === category 
                ? "bg-detective-accent text-detective-dark shadow-md" 
                : "hover:bg-detective-accent/10 hover:text-detective-accent"
            )}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
