import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Loader2, CheckCircle, Rocket, RotateCcw } from "lucide-react";

interface ActionStepsStepProps {
  actionableSteps: string[];
  isGenerating: boolean;
  onRestart: () => void;
  onGenerate: () => void;
}

export const ActionStepsStep = ({ 
  actionableSteps, 
  isGenerating, 
  onRestart,
  onGenerate 
}: ActionStepsStepProps) => {
  useEffect(() => {
    if (!actionableSteps.length) {
      onGenerate();
    }
  }, [actionableSteps.length, onGenerate]);

  return (
    <StepCard>
      <div className="text-center mb-8">
        <Rocket className="w-12 h-12 text-success mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">
          Your Startup Roadmap
        </h2>
        <p className="text-lg text-muted-foreground">
          Concrete steps to turn your idea into reality
        </p>
      </div>

      <div className="space-y-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              Creating your action plan...
            </p>
            <p className="text-sm text-muted-foreground">
              Prioritizing next steps for maximum impact
            </p>
          </div>
        ) : actionableSteps.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-6 border border-success/20">
              <h3 className="font-semibold text-success mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Ready to Launch
              </h3>
              <p className="text-sm text-muted-foreground">
                Follow these prioritized steps to build and launch your startup successfully
              </p>
            </div>

            <div className="space-y-4">
              {actionableSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <h4 className="font-semibold mb-2">Ready for another idea?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Explore different problems and discover new opportunities
              </p>
              <Button
                onClick={onRestart}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start New Idea Journey
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </StepCard>
  );
};