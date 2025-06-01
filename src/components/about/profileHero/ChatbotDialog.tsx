
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ChatbotDialogProps {
  chatHistory: Array<{type: string, message: string}>;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent) => void;
}

const ChatbotDialog: React.FC<ChatbotDialogProps> = ({
  chatHistory,
  userMessage,
  setUserMessage,
  handleSendMessage
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-detective-blue/50 bg-gradient-to-r from-detective-blue/10 to-detective-accent/10 hover:from-detective-blue/20 hover:to-detective-accent/20 hover:scale-105 transition-all duration-300">
          <MessageSquare className="mr-2 h-4 w-4" /> Inspiration Chatbot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-detective-blue" /> Inspiration Bot
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-0">
          <div className="max-h-[400px] overflow-y-auto p-4">
            <div className="space-y-4 mb-4">
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`
                    ${message.type === 'user' 
                      ? 'ml-auto bg-detective-accent/20 text-foreground' 
                      : 'mr-auto bg-detective-blue/10 text-foreground'
                    } p-3 rounded-lg max-w-[85%] relative animate-fade-in
                  `}
                >
                  {message.message}
                </div>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask for inspiration or just chat..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm"
            />
            <Button type="submit" size="sm" className="bg-detective-blue text-white hover:bg-detective-blue/90 hover:scale-105 transition-all duration-300">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
