import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, AlertCircle } from "lucide-react";

interface ProblemStepProps {
  problem: string;
  onNext: (problem: string) => void;
}

export const ProblemStep = ({ problem, onNext }: ProblemStepProps) => {
  const [currentProblem, setCurrentProblem] = useState(problem);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!currentProblem.trim()) {
      setError("Please describe a problem you've experienced");
      return;
    }
    if (currentProblem.trim().length < 20) {
      setError("Please provide more detail about the problem (minimum 20 characters)");
      return;
    }
    setError("");
    onNext(currentProblem.trim());
  };

  const exampleProblems = [
    "I spend too much time manually organizing my email inbox every day",
    "Finding reliable local service providers for home repairs is incredibly frustrating",
    "Coordinating team schedules across different time zones is a constant headache",
  ];

  return (
    <StepCard>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          What problem frustrates you the most?
        </h2>
        <p className="text-lg text-muted-foreground">
          Describe a real problem you've experienced. This will be the foundation of your startup idea.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Textarea
            placeholder="Example: I waste hours every week trying to find parking in busy city areas, and existing apps don't show real-time availability..."
            value={currentProblem}
            onChange={(e) => {
              setCurrentProblem(e.target.value);
              if (error) setError("");
            }}
            className="min-h-32 text-lg resize-none"
            maxLength={500}
          />
          <div className="flex justify-between mt-2">
            <div className="text-sm text-muted-foreground">
              {currentProblem.length}/500 characters
            </div>
            {error && (
              <div className="flex items-center text-sm text-destructive">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">
            Need inspiration? Try one of these:
          </div>
          {exampleProblems.map((example, index) => (
            <button
              key={index}
              onClick={() => setCurrentProblem(example)}
              className="text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors w-full text-sm"
            >
              {example}
            </button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full"
          disabled={!currentProblem.trim()}
        >
          Generate Business Question
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </StepCard>
  );
};