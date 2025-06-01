
import React, { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  gameState: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ gameState }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Create shareable link
  const shareableLink = `${window.location.origin}?chessGame=${encodeURIComponent(gameState)}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      
      toast({
        title: "Link copied!",
        description: "The game link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my chess game!',
          text: 'I want to share this chess game with you.',
          url: shareableLink,
        });
        toast({
          title: "Shared successfully!",
          description: "Game has been shared.",
        });
      } catch (err) {
        console.error("Failed to share:", err);
        toast({
          title: "Share failed",
          description: "Could not share the game. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      handleCopy();
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Game
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Chess Game</DialogTitle>
          <DialogDescription>
            Anyone with this link can view the current state of your chess game.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={shareableLink}
              readOnly
              className="w-full"
            />
          </div>
          <Button 
            size="sm" 
            className="px-3" 
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        {navigator.share && (
          <Button 
            className="w-full mt-4" 
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share via...
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
