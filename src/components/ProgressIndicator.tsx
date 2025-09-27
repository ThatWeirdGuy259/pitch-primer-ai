import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    isActive && "step-active animate-glow-pulse",
                    isCompleted && "step-completed",
                    !isActive && !isCompleted && "step-inactive"
                  )}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span className="text-xs text-muted-foreground mt-2 max-w-16 text-center">
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-px mx-4 transition-colors duration-300",
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