
import React from "react";
import { Play, Pause, SkipForward, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onAddTime: (minutes: number) => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isPaused,
  onStart,
  onPause,
  onSkip,
  onAddTime,
}) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      {isPaused ? (
        <Button
          onClick={onStart}
          className="bg-timer-highlight hover:bg-timer-lowlight text-white rounded-full w-12 h-12 flex items-center justify-center"
          aria-label="Start timer"
        >
          <Play className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          onClick={onPause}
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
          aria-label="Pause timer"
        >
          <Pause className="h-5 w-5" />
        </Button>
      )}

      <Button
        onClick={onSkip}
        variant="outline"
        className="rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="Skip to next item"
      >
        <SkipForward className="h-5 w-5" />
      </Button>

      <Button
        onClick={() => onAddTime(1)}
        variant="outline"
        className="rounded-full flex items-center justify-center text-sm"
        aria-label="Add one minute"
      >
        <Clock className="h-4 w-4 mr-1" />
        +1m
      </Button>

      <Button
        onClick={() => onAddTime(5)}
        variant="outline"
        className="rounded-full flex items-center justify-center text-sm"
        aria-label="Add five minutes"
      >
        <Clock className="h-4 w-4 mr-1" />
        +5m
      </Button>
    </div>
  );
};

export default TimerControls;
