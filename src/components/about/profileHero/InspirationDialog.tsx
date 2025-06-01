
import React from 'react';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface InspirationDialogProps {
  joke: string;
  getRandomJoke: () => void;
}

const InspirationDialog: React.FC<InspirationDialogProps> = ({ joke, getRandomJoke }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-detective-blue/50 text-detective-blue hover:border-detective-blue hover:scale-105 transition-all duration-300">
          <Code className="mr-2 h-4 w-4" /> Developer Jokes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">Developer Humor</DialogTitle>
        </DialogHeader>
        <div className="p-6 bg-card rounded-lg border border-border">
          <p className="text-lg mb-6 text-center font-medium">{joke}</p>
          <div className="flex justify-center">
            <Button onClick={getRandomJoke} className="bg-detective-accent hover:bg-detective-accent/90 text-detective-dark hover:scale-105 transition-all duration-300">
              Another Joke
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InspirationDialog;
