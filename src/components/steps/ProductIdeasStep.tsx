import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Loader2, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductIdeasStepProps {
  businessQuestion: string;
  productIdeas: string[];
  selectedIdeaIndex: number;
  isGenerating: boolean;
  onNext: () => void;
  onGenerate: () => void;
  onSelectIdea: (index: number) => void;
}

export const ProductIdeasStep = ({ 
  businessQuestion,
  productIdeas, 
  selectedIdeaIndex,
  isGenerating, 
  onNext,
  onGenerate,
  onSelectIdea
}: ProductIdeasStepProps) => {
  useEffect(() => {
    if (!productIdeas.length) {
      onGenerate();
    }
  }, [productIdeas.length, onGenerate]);

  return (
    <StepCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          AI-Generated Product Ideas
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose the product concept that resonates most with your vision
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wide">
            Business Question:
          </h3>
          <p className="text-sm">
            {businessQuestion}
          </p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              Generating innovative product ideas...
            </p>
            <p className="text-sm text-muted-foreground">
              This may take a moment
            </p>
          </div>
        ) : productIdeas.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-accent" />
              <span className="font-medium">Select your preferred concept:</span>
            </div>
            
            {productIdeas.map((idea, index) => (
              <button
                key={index}
                onClick={() => onSelectIdea(index)}
                className={cn(
                  "w-full text-left p-6 rounded-lg border transition-all duration-200 hover:scale-[1.02]",
                  selectedIdeaIndex === index
                    ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1",
                    selectedIdeaIndex === index
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}>
                    {selectedIdeaIndex === index && (
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Product Concept {index + 1}</h4>
                    <p className="text-muted-foreground">
                      {idea}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            <Button
              onClick={onNext}
              size="lg"
              className="w-full mt-6"
              disabled={selectedIdeaIndex === -1}
            >
              Continue to Business Draft
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        ) : null}
      </div>
    </StepCard>
  );
};