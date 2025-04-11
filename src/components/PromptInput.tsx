
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const PromptInput: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log("Prompt submitted:", prompt);
      // Here you would handle the prompt, e.g. send to an API
      setPrompt("");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-notion-subtle uppercase tracking-wide mb-2">
        Prompt
      </h2>
      <form 
        onSubmit={handleSubmit}
        className="flex space-x-2"
      >
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="flex-1 border-notion-border bg-white focus-visible:ring-notion-accent"
        />
        <Button 
          type="submit"
          variant="outline"
          size="sm"
          className="border-notion-border hover:bg-notion-hover"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default PromptInput;
