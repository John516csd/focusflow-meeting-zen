
import React, { useState, useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";
import { initialAgendaItems, AgendaItem } from "@/data/agendaData";
import AgendaItemComponent from "./AgendaItem";
import CountdownTimer from "./CountdownTimer";
import TimerControls from "./TimerControls";
import { Card } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const AgendaTimer: React.FC = () => {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgendaItems);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Handle agenda item completion
  const handleAgendaComplete = useCallback((id: string) => {
    setAgendaItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isCompleted: true } : item
      )
    );
  }, []);

  // Initialize the timer
  const timer = useTimer({
    agendaItems,
    onAgendaComplete: handleAgendaComplete,
    soundEnabled,
  });

  // Get current agenda item
  const currentItem = agendaItems.find(
    (item) => item.id === timer.currentItemId
  );

  // Toggle sound notifications
  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-timer-background flex flex-col p-4 md:p-8">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting title and sound toggle */}
        <div className="lg:col-span-3 flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-timer-text-primary">Team Weekly Sync</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            className="text-timer-text-secondary"
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Bell className="h-5 w-5" />
            ) : (
              <BellOff className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Agenda timeline - left column */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold text-lg mb-4 text-timer-text-primary">
            Agenda
          </h2>
          <div className="relative">
            {agendaItems.map((item) => (
              <AgendaItemComponent
                key={item.id}
                item={item}
                isActive={item.id === timer.currentItemId}
                progress={item.id === timer.currentItemId ? timer.progress : 0}
              />
            ))}
          </div>
        </div>

        {/* Timer and controls - right column */}
        <div className="lg:col-span-2">
          <Card className="p-6 rounded-2xl shadow-md bg-white">
            {currentItem && (
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-timer-highlight mb-1">
                  Current Topic
                </h2>
                <h3 className="text-2xl font-bold text-timer-text-primary">
                  {currentItem.title}
                </h3>
                <p className="text-timer-text-secondary">
                  Led by {currentItem.owner.name}
                </p>
              </div>
            )}

            <CountdownTimer
              timeRemaining={timer.formattedTimeRemaining}
              isPaused={timer.isPaused}
              isWarning={timer.isWarning}
            />

            <TimerControls
              isPaused={timer.isPaused}
              onStart={timer.actions.start}
              onPause={timer.actions.pause}
              onSkip={timer.actions.skipToNext}
              onAddTime={timer.actions.addTime}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgendaTimer;
