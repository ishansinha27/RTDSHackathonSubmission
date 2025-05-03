import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import AiChat from "./ai-chat";

export function ChatHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>GPU AI Assistant</DialogTitle>
          <DialogDescription>
            Ask questions about GPU selection and cost optimization for your specific use case.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <AiChat />
        </div>
      </DialogContent>
    </Dialog>
  );
}