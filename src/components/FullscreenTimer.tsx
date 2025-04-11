
import React from "react";
import { X } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";

interface FullscreenTimerProps {
  title: string;
  owner: string;
  timeRemaining: string;
  isPaused: boolean;
  isWarning: boolean;
  onExit: () => void;
}

const FullscreenTimer: React.FC<FullscreenTimerProps> = ({
  title,
  owner,
  timeRemaining,
  isPaused,
  isWarning,
  onExit
}) => {
  return (
    <div className="fixed inset-0 bg-notion-background flex flex-col items-center justify-center z-50 p-6 animate-fade-in-slow">
      <Button
        variant="ghost"
        size="sm"
        onClick={onExit}
        className="absolute top-4 right-4 text-notion-subtle hover:bg-notion-hover rounded-md"
        aria-label="Exit fullscreen"
      >
        <X className="h-5 w-5" />
      </Button>
      
      <div className="text-center max-w-2xl animate-slide-in-bottom">
        <h1 className="text-4xl md:text-5xl font-serif text-notion-text mb-6">
          {title}
        </h1>
        
        <div className="text-notion-subtle text-lg mb-12">
          Led by {owner}
        </div>
        
        <CountdownTimer
          timeRemaining={timeRemaining}
          isPaused={isPaused}
          isWarning={isWarning}
          isFullscreen={true}
        />
      </div>
    </div>
  );
};

export default FullscreenTimer;
