
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: number;
  featured?: boolean;
}
