import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 shrink-0",
                    isActive && "step-active animate-glow-pulse",
                    isCompleted && "step-completed",
                    !isActive && !isCompleted && "step-inactive"
                  )}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span className="text-xs text-muted-foreground mt-1 md:mt-2 max-w-12 md:max-w-16 text-center leading-tight">
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={cn(
                    "w-8 md:w-12 h-px mx-2 md:mx-4 transition-colors duration-300 shrink-0",
                    isCompleted ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};