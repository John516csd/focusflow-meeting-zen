
import React, { useState, useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";
import { initialAgendaItems, AgendaItem } from "@/data/agendaData";
import AgendaItemComponent from "./AgendaItem";
import CountdownTimer from "./CountdownTimer";
import TimerControls from "./TimerControls";
import FullscreenTimer from "./FullscreenTimer";
import { Card } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgendaTimerProps {
  customAgenda?: AgendaItem[];
}

const AgendaTimer: React.FC<AgendaTimerProps> = ({ customAgenda }) => {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(
    customAgenda || initialAgendaItems
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleAgendaComplete = useCallback((id: string) => {
    setAgendaItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isCompleted: true } : item
      )
    );
  }, []);

  // Update agenda when new items are provided
  React.useEffect(() => {
    if (customAgenda) {
      setAgendaItems(customAgenda);
    }
  }, [customAgenda]);

  const timer = useTimer({
    agendaItems,
    onAgendaComplete: handleAgendaComplete,
    soundEnabled,
  });

  const currentItem = agendaItems.find(
    (item) => item.id === timer.currentItemId
  );

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  if (isFullscreen && currentItem) {
    return (
      <FullscreenTimer
        title={currentItem.title}
        owner={currentItem.owner.name}
        timeRemaining={timer.formattedTimeRemaining}
        isPaused={timer.isPaused}
        isWarning={timer.isWarning}
        onExit={toggleFullscreen}
      />
    );
  }

  return (
    <div className="flex-1 bg-notion-background flex flex-col px-4 md:px-8 font-sans">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 flex justify-between items-center mb-4">
          <h1 className="text-xl font-medium text-notion-text">
            {agendaItems.length > 0 ? "会议议程" : "等待生成议程..."}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            className="text-notion-subtle hover:bg-notion-hover rounded-md"
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Bell className="h-4 w-4" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="lg:col-span-1">
          <h2 className="font-medium text-sm mb-4 text-notion-subtle uppercase tracking-wide px-2">
            议程
          </h2>
          <div className="relative space-y-0.5">
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

        <div className="lg:col-span-2">
          <Card className="p-6 rounded-md shadow-notion bg-white border-notion-border">
            {currentItem ? (
              <div className="text-center mb-4 animate-fade-in-slow">
                <h2 className="text-sm font-normal text-notion-subtle uppercase tracking-wide mb-2">
                  当前主题
                </h2>
                <h3 className="text-2xl font-medium text-notion-text mb-1">
                  {currentItem.title}
                </h3>
                <p className="text-notion-subtle">
                  主持人: {currentItem.owner.name}
                </p>
              </div>
            ) : (
              <div className="text-center mb-4 animate-fade-in-slow">
                <h3 className="text-xl font-medium text-notion-text mb-1">
                  等待开始
                </h3>
                <p className="text-notion-subtle">
                  请通过提示词生成议程或选择一个议程项目
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
              onToggleFullscreen={toggleFullscreen}
              disabled={!currentItem}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgendaTimer;
