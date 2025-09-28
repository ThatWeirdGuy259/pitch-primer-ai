import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Lightbulb, Target, Rocket } from "lucide-react";

interface HeroStepProps {
  onStart: () => void;
}

export const HeroStep = ({ onStart }: HeroStepProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Rocket className="w-16 h-16 text-primary animate-glow-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              FounderAI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Transform your problems into <span className="text-accent font-semibold">personalized startup roadmaps</span> with premium AI-powered guidance
          </p>
          
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStart}
            className="animate-fade-in"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <StepCard className="text-center" animate={false}>
            <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Problem to Idea</h3>
            <p className="text-muted-foreground">
              AI transforms your frustrations into structured business opportunities
            </p>
          </StepCard>
          
          <StepCard className="text-center" animate={false}>
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Investor-Ready</h3>
            <p className="text-muted-foreground">
              Generate professional business drafts that impress stakeholders
            </p>
          </StepCard>
          
          <StepCard className="text-center" animate={false}>
            <Rocket className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Actionable Steps</h3>
            <p className="text-muted-foreground">
              Get concrete next steps to launch your startup idea
            </p>
          </StepCard>
        </div>

        <div className="text-sm text-muted-foreground">
          Join thousands of entrepreneurs turning ideas into reality
        </div>
      </div>
    </div>
  );
};