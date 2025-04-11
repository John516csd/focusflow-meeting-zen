
import React from "react";
import { PlayCircle, PauseCircle, SkipForward, Clock, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onAddTime: (minutes: number) => void;
  onToggleFullscreen: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isPaused,
  onStart,
  onPause,
  onSkip,
  onAddTime,
  onToggleFullscreen
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {isPaused ? (
        <Button
          onClick={onStart}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
        >
          <PlayCircle className="h-4 w-4 mr-1" />
          Start
        </Button>
      ) : (
        <Button
          onClick={onPause}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
        >
          <PauseCircle className="h-4 w-4 mr-1" />
          Pause
        </Button>
      )}

      <Button
        onClick={onSkip}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
      >
        <SkipForward className="h-4 w-4 mr-1" />
        Skip
      </Button>

      <Button
        onClick={() => onAddTime(1)}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
      >
        <Clock className="h-4 w-4 mr-1" />
        +1m
      </Button>

      <Button
        onClick={() => onAddTime(5)}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
      >
        <Clock className="h-4 w-4 mr-1" />
        +5m
      </Button>

      <Button
        onClick={onToggleFullscreen}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-notion-hover text-notion-text border-notion-border rounded-md flex items-center"
      >
        <Maximize className="h-4 w-4 mr-1" />
        Present
      </Button>
    </div>
  );
};

export default TimerControls;
