import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Message = {
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
};

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm the GPUxACE AI assistant. I can help answer your questions about GPU selection, specifications, and performance. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: query,
      role: 'user',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Ask for a response
      const response = await apiRequest("POST", "/api/ai/gpu-assistant", { query });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "Failed to get response");
      }

      // Add assistant message
      const assistantMessage: Message = {
        content: data.data.response,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            GPU Assistant
          </CardTitle>
          <CardDescription>
            Ask me questions about GPU selection, specifications, or performance optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'assistant' ? 'items-start' : 'items-start justify-end'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[80%] ${
                      message.role === 'assistant'
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <div className="leading-relaxed">
                      <p className="mb-1">{message.content}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Textarea
              placeholder="Ask a question about GPU selection..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-h-[50px] resize-none"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !query.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}