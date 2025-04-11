
import AgendaTimer from "@/components/AgendaTimer";
import PromptInput from "@/components/PromptInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-notion-background flex flex-col">
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8">
        <PromptInput />
      </div>
      <AgendaTimer />
    </div>
  );
};

export default Index;
