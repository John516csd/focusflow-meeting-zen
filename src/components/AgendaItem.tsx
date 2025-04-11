
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
    agenda-item relative pl-10 pr-4 py-3 mb-1 rounded-md transition-all duration-200 ease-in-out
    ${isActive ? "bg-notion-hover text-notion-text" : "hover:bg-notion-hover"}
    ${item.isCompleted ? "text-notion-subtle" : ""}
  `;

  return (
    <div className={itemClasses}>
      {/* Avatar positioned on the left */}
      <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 z-10">
        <TeamAvatar
          initials={item.owner.initials}
          backgroundColor={item.owner.avatarColor}
          name={item.owner.name}
          size="sm"
        />
      </div>
      
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1">
          <h3 className={`font-normal ${isActive ? "font-medium" : ""} text-notion-text truncate transition-all duration-200`}>
            {item.title}
          </h3>
          <p className="text-notion-subtle text-xs">
            {item.startTime} - {item.endTime}
          </p>
        </div>
        <div className="text-xs font-normal text-notion-subtle">
          {item.duration} min
        </div>
      </div>
      
      <div className="progress-bar-container mt-2 h-0.5 w-full bg-notion-border rounded-full overflow-hidden">
        <div 
          className={`h-full ${isActive ? "bg-notion-accent" : "bg-notion-subtle/30"} rounded-full transition-all duration-1000 ease-linear`}
          style={{ width: `${isActive ? progress : item.isCompleted ? 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AgendaItem;
