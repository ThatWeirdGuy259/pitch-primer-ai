import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

interface BusinessQuestionStepProps {
  problem: string;
  businessQuestion: string;
  isGenerating: boolean;
  onNext: () => void;
  onGenerate: () => void;
}

export const BusinessQuestionStep = ({ 
  problem, 
  businessQuestion, 
  isGenerating, 
  onNext,
  onGenerate 
}: BusinessQuestionStepProps) => {
  useEffect(() => {
    if (!businessQuestion) {
      onGenerate();
    }
  }, [businessQuestion, onGenerate]);

  return (
    <StepCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Your Business Question
        </h2>
        <p className="text-lg text-muted-foreground">
          AI is transforming your problem into a solution-focused business question
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
            Original Problem:
          </h3>
          <p className="text-foreground">
            {problem}
          </p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              AI is analyzing your problem...
            </p>
            <p className="text-sm text-muted-foreground">
              Creating an actionable business question
            </p>
          </div>
        ) : businessQuestion ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-success mb-2">
                    Generated Business Question:
                  </h3>
                  <p className="text-lg font-medium">
                    {businessQuestion}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                This question will guide the generation of innovative product ideas
              </p>
              <Button
                onClick={onNext}
                size="lg"
                className="w-full"
                variant="default"
              >
                Generate Product Ideas
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </StepCard>
  );
};