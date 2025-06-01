
import React, { useState } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

// Import the refactored components
import ProfileHeroPicture from './profileHero/ProfileHeroPicture';
import ProfileHeroInfo from './profileHero/ProfileHeroInfo';
import ResumeButtons from './profileHero/ResumeButtons';
import InspirationDialog from './profileHero/InspirationDialog';
import ChessDialog from './profileHero/ChessDialog';
import ChatbotDialog from './profileHero/ChatbotDialog';
import VideoBackground from './profileHero/VideoBackground';

interface ProfileHeroProps {
  joke: string;
  getRandomJoke: () => void;
  handleSendMessage: (e: React.FormEvent) => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  chatHistory: Array<{type: string, message: string}>;
  scrollToContact?: () => void;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ 
  joke, 
  getRandomJoke, 
  handleSendMessage, 
  userMessage, 
  setUserMessage, 
  chatHistory,
  scrollToContact
}) => {
  const [isChessDialogOpen, setIsChessDialogOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Enhanced video background with overlay */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-detective-dark/30 to-detective-dark' : 'from-white/30 to-white'}`}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Picture Section - Take up 5/12 of the grid on larger screens */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative" data-aos="fade-right" data-aos-duration="1000">
              <ProfileHeroPicture />
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 border border-detective-accent/20 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-detective-blue/20 rounded-full"></div>
            </div>
          </div>
          
          {/* Profile Info Section - Take up 7/12 of the grid on larger screens */}
          <div className="lg:col-span-7 text-center lg:text-left" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <ProfileHeroInfo />
            
            <div className="mt-8 flex flex-wrap gap-5 justify-center lg:justify-start">
              {/* Primary action buttons */}
              <ResumeButtons scrollToContact={scrollToContact} />
              
              {/* Interactive elements in a more organized layout */}
              <div className="mt-6 w-full">
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <InspirationDialog joke={joke} getRandomJoke={getRandomJoke} />
                  <ChessDialog 
                    isChessDialogOpen={isChessDialogOpen} 
                    setIsChessDialogOpen={setIsChessDialogOpen} 
                  />
                  <ChatbotDialog 
                    chatHistory={chatHistory}
                    userMessage={userMessage}
                    setUserMessage={setUserMessage}
                    handleSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-detective-accent/5 blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-detective-blue/5 blur-3xl"></div>
    </section>
  );
};

export default ProfileHero;
