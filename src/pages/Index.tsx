
import { useState } from "react";
import AgendaTimer from "@/components/AgendaTimer";
import PromptInput from "@/components/PromptInput";
import { AgendaItem } from "@/data/agendaData";

const Index = () => {
  const [generatedAgenda, setGeneratedAgenda] = useState<AgendaItem[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleAgendaGenerated = (agenda: AgendaItem[]) => {
    setGeneratedAgenda(agenda);
  };

  return (
    <div className="min-h-screen bg-notion-background flex flex-col">
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8">
        <PromptInput 
          onAgendaGenerated={handleAgendaGenerated}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      <AgendaTimer customAgenda={generatedAgenda} />
    </div>
  );
};

export default Index;
