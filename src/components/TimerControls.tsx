
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, Clock, Maximize, PlusCircle } from "lucide-react";

interface TimerControlsProps {
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onAddTime: (minutes: number) => void;
  onToggleFullscreen: () => void;
  disabled?: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isPaused,
  onStart,
  onPause,
  onSkip,
  onAddTime,
  onToggleFullscreen,
  disabled = false
}) => {
  const playPauseButton = isPaused ? (
    <Button 
      onClick={onStart}
      variant="outline"
      className="border-notion-border hover:bg-notion-hover"
      disabled={disabled}
    >
      <Play className="h-4 w-4 mr-1" />
      <span>开始</span>
    </Button>
  ) : (
    <Button 
      onClick={onPause}
      variant="outline"
      className="border-notion-border hover:bg-notion-hover"
      disabled={disabled}
    >
      <Pause className="h-4 w-4 mr-1" />
      <span>暂停</span>
    </Button>
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {playPauseButton}
      
      <Button 
        onClick={onSkip} 
        variant="outline"
        className="border-notion-border hover:bg-notion-hover"
        disabled={disabled}
      >
        <SkipForward className="h-4 w-4 mr-1" />
        <span>跳过</span>
      </Button>
      
      <Button 
        onClick={() => onAddTime(5)}
        variant="outline"
        className="border-notion-border hover:bg-notion-hover"
        disabled={disabled}
      >
        <PlusCircle className="h-4 w-4 mr-1" />
        <span>增加 5 分钟</span>
      </Button>
      
      <Button 
        onClick={onToggleFullscreen}
        variant="outline"
        className="border-notion-border hover:bg-notion-hover"
        disabled={disabled}
      >
        <Maximize className="h-4 w-4 mr-1" />
        <span>全屏</span>
      </Button>
    </div>
  );
};

export default TimerControls;
