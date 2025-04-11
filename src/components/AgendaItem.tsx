
import React from "react";
import { AgendaItem as AgendaItemType } from "../data/agendaData";
import TeamAvatar from "./TeamAvatar";

interface AgendaItemProps {
  item: AgendaItemType;
  isActive: boolean;
  progress: number;
}

const AgendaItem: React.FC<AgendaItemProps> = ({ item, isActive, progress }) => {
  const itemClasses = `
    agenda-item relative pl-10 pr-4 py-3 mb-2 rounded-2xl border border-transparent
    ${isActive ? "agenda-item-active" : ""}
    ${item.isCompleted ? "agenda-item-completed" : ""}
  `;

  return (
    <div className={itemClasses}>
      {/* Timeline connector */}
      <div className={isActive ? "timeline-connector-active" : "timeline-connector"}></div>
      
      {/* Avatar positioned on the timeline */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <TeamAvatar
          initials={item.owner.initials}
          backgroundColor={item.owner.avatarColor}
          name={item.owner.name}
        />
      </div>
      
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1">
          <h3 className="font-medium text-timer-text-primary truncate">{item.title}</h3>
          <p className="agenda-time text-timer-text-secondary text-sm">
            {item.startTime} - {item.endTime}
          </p>
        </div>
        <div className="text-sm font-medium text-timer-text-secondary">
          {item.duration} min
        </div>
      </div>
      
      {isActive && (
        <div className="progress-bar-container mt-2">
          <div 
            className="progress-bar transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AgendaItem;
