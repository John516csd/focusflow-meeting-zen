
import React from "react";

interface TeamAvatarProps {
  initials: string;
  backgroundColor: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const TeamAvatar: React.FC<TeamAvatarProps> = ({ initials, backgroundColor, name, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base"
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-md flex items-center justify-center text-white font-normal transition-all duration-150`}
      style={{ backgroundColor }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default TeamAvatar;
