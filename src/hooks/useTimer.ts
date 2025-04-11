import { useState, useEffect, useCallback, useRef } from "react";
import { AgendaItem } from "../data/agendaData";

interface UseTimerProps {
  agendaItems: AgendaItem[];
  onAgendaComplete: (id: string) => void;
  soundEnabled?: boolean;
}

interface TimerState {
  currentItemId: string | null;
  timeRemaining: number; // in seconds
  isPaused: boolean;
  progress: number; // 0 to 100
  isWarning: boolean;
}

export function useTimer({ agendaItems, onAgendaComplete, soundEnabled = true }: UseTimerProps) {
  const [timerState, setTimerState] = useState<TimerState>({
    currentItemId: agendaItems.length > 0 ? agendaItems[0].id : null,
    timeRemaining: agendaItems.length > 0 ? agendaItems[0].duration * 60 : 0,
    isPaused: true,
    progress: 0,
    isWarning: false,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalDurationRef = useRef(agendaItems.length > 0 ? agendaItems[0].duration * 60 : 0);
  
  // Initialize audio for notifications
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-software-interface-alert-notification-217.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play sound notification
  const playNotification = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Audio play was prevented");
      });
    }
  }, [soundEnabled]);

  // Timer logic
  useEffect(() => {
    if (timerState.isPaused || !timerState.currentItemId) return;
    
    const interval = setInterval(() => {
      setTimerState((prev) => {
        // Calculate new values
        const newTimeRemaining = prev.timeRemaining - 1;
        const progress = 100 - (newTimeRemaining / totalDurationRef.current) * 100;
        const isWarning = newTimeRemaining <= 60; // Warning when less than 1 minute left
        
        // Play notification sound when entering warning state
        if (!prev.isWarning && isWarning) {
          playNotification();
        }
        
        // If time's up
        if (newTimeRemaining <= 0) {
          clearInterval(interval);
          
          // Move to next item
          const currentIndex = agendaItems.findIndex(item => item.id === prev.currentItemId);
          const nextIndex = currentIndex + 1;
          
          if (nextIndex < agendaItems.length) {
            // Go to next agenda item
            const nextItem = agendaItems[nextIndex];
            totalDurationRef.current = nextItem.duration * 60;
            
            // Mark current item as completed
            onAgendaComplete(prev.currentItemId as string);
            
            return {
              currentItemId: nextItem.id,
              timeRemaining: nextItem.duration * 60,
              isPaused: false,
              progress: 0,
              isWarning: false,
            };
          } else {
            // End of agenda
            onAgendaComplete(prev.currentItemId as string);
            return {
              ...prev,
              isPaused: true,
              timeRemaining: 0,
              progress: 100,
              isWarning: false,
            };
          }
        }
        
        // Continue timer
        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          progress: progress,
          isWarning: isWarning,
        };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timerState.isPaused, timerState.currentItemId, agendaItems, onAgendaComplete, playNotification]);

  // Actions for controlling the timer
  const startTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: false }));
  }, []);
  
  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: true }));
  }, []);
  
  const skipToNext = useCallback(() => {
    const currentIndex = agendaItems.findIndex(item => item.id === timerState.currentItemId);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < agendaItems.length) {
      const nextItem = agendaItems[nextIndex];
      
      onAgendaComplete(timerState.currentItemId as string);
      
      totalDurationRef.current = nextItem.duration * 60;
      setTimerState({
        currentItemId: nextItem.id,
        timeRemaining: nextItem.duration * 60,
        isPaused: false,
        progress: 0,
        isWarning: false,
      });
    }
  }, [timerState.currentItemId, agendaItems, onAgendaComplete]);
  
  const addTime = useCallback((additionalMinutes: number) => {
    setTimerState((prev) => {
      const newTimeRemaining = prev.timeRemaining + (additionalMinutes * 60);
      // Also update the total duration reference to keep progress calculation accurate
      totalDurationRef.current += (additionalMinutes * 60);
      
      return {
        ...prev,
        timeRemaining: newTimeRemaining,
        isWarning: newTimeRemaining <= 60,
      };
    });
  }, []);
  
  // Formats seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    currentItemId: timerState.currentItemId,
    timeRemaining: timerState.timeRemaining,
    formattedTimeRemaining: formatTime(timerState.timeRemaining),
    isPaused: timerState.isPaused,
    progress: timerState.progress,
    isWarning: timerState.isWarning,
    actions: {
      start: startTimer,
      pause: pauseTimer,
      skipToNext,
      addTime,
    },
  };
}
