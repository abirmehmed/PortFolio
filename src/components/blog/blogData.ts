
import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript: A Detective\'s Guide',
    excerpt: 'Unraveling the mysteries of TypeScript and how it can improve your code quality and developer experience.',
    content: 'Full article content goes here...',
    category: 'TypeScript',
    date: 'May 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    readTime: 5,
    featured: true
  },
  {
    id: '2',
    title: 'React Hooks: The Case of the Missing Dependencies',
    excerpt: 'Investigating common issues with React hooks and how to properly use the dependencies array.',
    content: 'Full article content goes here...',
    category: 'React',
    date: 'June 2, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 8
  },
  {
    id: '3',
    title: 'The Secret Life of CSS Grid',
    excerpt: 'Uncovering the powerful layout capabilities of CSS Grid and when to use it instead of Flexbox.',
    content: 'Full article content goes here...',
    category: 'CSS',
    date: 'July 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    readTime: 6
  },
  {
    id: '4',
    title: 'Tailwind CSS: A Detective\'s Approach to Utility-First CSS',
    excerpt: 'Exploring how Tailwind CSS changes the way we think about styling our web applications.',
    content: 'Full article content goes here...',
    category: 'Tailwind CSS',
    date: 'August 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    readTime: 4
  },
  {
    id: '5',
    title: 'JavaScript Performance: Tracking Down Memory Leaks',
    excerpt: 'Learn how to identify and fix common memory leaks in JavaScript applications.',
    content: 'Full article content goes here...',
    category: 'JavaScript',
    date: 'September 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    readTime: 10,
    featured: true
  },
  {
    id: '6',
    title: 'Laravel: Building Modern PHP Applications',
    excerpt: 'Discover the power of Laravel framework and how it makes PHP development enjoyable again.',
    content: 'Full article content goes here...',
    category: 'Laravel',
    date: 'October 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    readTime: 7
  },
  {
    id: '7',
    title: 'MySQL Performance Optimization Techniques',
    excerpt: 'Learn essential techniques to optimize MySQL databases for better performance and scalability.',
    content: 'Full article content goes here...',
    category: 'MySQL',
    date: 'November 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 8
  },
  {
    id: '8',
    title: 'SASS: Taking Your CSS to the Next Level',
    excerpt: 'How to use SASS to make your CSS more maintainable and powerful with variables, mixins, and functions.',
    content: 'Full article content goes here...',
    category: 'SASS',
    date: 'December 3, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 6
  },
  {
    id: '9',
    title: 'Getting Started with Rust for Web Developers',
    excerpt: 'Exploring how Rust can be used for web development and why it\'s gaining popularity.',
    content: 'Full article content goes here...',
    category: 'Rust',
    date: 'January 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    readTime: 9,
    featured: true
  },
  {
    id: '10',
    title: 'Next.js vs Traditional React: What You Need to Know',
    excerpt: 'Comparing Next.js and traditional React applications, with insights on when to use each approach.',
    content: 'Full article content goes here...',
    category: 'Next.js',
    date: 'February 5, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 7
  },
  {
    id: '11',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices for creating robust and scalable backend services using Node.js and Express.',
    content: 'Full article content goes here...',
    category: 'Node.js',
    date: 'March 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 8
  },
  {
    id: '12',
    title: 'Python for Data Science: A Beginner\'s Guide',
    excerpt: 'Getting started with Python for data analysis, visualization, and machine learning.',
    content: 'Full article content goes here...',
    category: 'Python',
    date: 'April 8, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    readTime: 6
  },
  {
    id: '13',
    title: 'Django Rest Framework: Building Modern APIs',
    excerpt: 'How to create robust REST APIs using Django and the Django Rest Framework.',
    content: 'Full article content goes here...',
    category: 'Django',
    date: 'April 22, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    readTime: 7
  },
  {
    id: '14',
    title: 'Blockchain Development with Solidity',
    excerpt: 'An introduction to smart contract development using Solidity for Ethereum blockchain.',
    content: 'Full article content goes here...',
    category: 'Solidity',
    date: 'May 1, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    readTime: 9
  },
  {
    id: '15',
    title: 'C++ Game Development Fundamentals',
    excerpt: 'Learn the basics of game development using C++ and modern game engines.',
    content: 'Full article content goes here...',
    category: 'C++',
    date: 'May 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    readTime: 10
  },
  {
    id: '16',
    title: 'Modern Java Development with Spring Boot',
    excerpt: 'Building microservices and modern applications using Java and Spring Boot framework.',
    content: 'Full article content goes here...',
    category: 'Java',
    date: 'June 1, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    readTime: 8,
    featured: true
  }
];
