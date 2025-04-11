
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { AgendaItem } from "@/data/agendaData";
import { generateAgenda, generateMockAgenda } from "@/services/geminiService";
import { toast } from "@/hooks/use-toast";

interface PromptInputProps {
  onAgendaGenerated: (agenda: AgendaItem[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  onAgendaGenerated, 
  isLoading, 
  setIsLoading 
}) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      try {
        setIsLoading(true);
        
        // Use mock service for demo if no API key is available
        // In production, replace with the real generateAgenda function
        let newAgenda: AgendaItem[];
        try {
          newAgenda = await generateAgenda(prompt);
        } catch (error) {
          console.log("Falling back to mock agenda:", error);
          newAgenda = await generateMockAgenda(prompt);
        }
        
        onAgendaGenerated(newAgenda);
        toast({
          title: "会议议程已生成",
          description: `已基于"${prompt}"创建议程`,
        });
      } catch (error) {
        console.error("Error generating agenda:", error);
        toast({
          variant: "destructive",
          title: "生成失败",
          description: "无法生成会议议程，请重试",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-notion-subtle uppercase tracking-wide mb-2">
        提示词
      </h2>
      <form 
        onSubmit={handleSubmit}
        className="flex space-x-2"
      >
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="请输入会议类型或描述，例如：'产品设计评审会议'..."
          className="flex-1 border-notion-border bg-white focus-visible:ring-notion-accent"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          variant="outline"
          size="sm"
          className="border-notion-border hover:bg-notion-hover"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-notion-subtle border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default PromptInput;
