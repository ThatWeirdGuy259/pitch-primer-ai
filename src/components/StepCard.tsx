import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const StepCard = ({ children, className, animate = true }: StepCardProps) => {
  return (
    <div
      className={cn(
        "card-gradient rounded-xl p-8 max-w-2xl mx-auto",
        animate && "animate-fade-in",
        className
      )}
    >
      {children}
    </div>
  );
};