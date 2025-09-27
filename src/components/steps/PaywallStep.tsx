import { Button } from "@/components/ui/button";
import { StepCard } from "@/components/StepCard";
import { ArrowRight, Crown, Lock, Star, Zap } from "lucide-react";

interface PaywallStepProps {
  onUnlock: () => void;
}

export const PaywallStep = ({ onUnlock }: PaywallStepProps) => {
  return (
    <StepCard>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Crown className="w-16 h-16 text-accent animate-glow-pulse" />
            <Lock className="w-6 h-6 text-muted-foreground absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Unlock Your Business Draft
        </h2>
        <p className="text-lg text-muted-foreground">
          Get an investor-ready business concept and actionable launch steps
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <Star className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Professional Business Draft</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive startup overview including market analysis, revenue model, and competitive advantage
            </p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold mb-2">8-Step Action Plan</h3>
            <p className="text-sm text-muted-foreground">
              Concrete, prioritized steps to transform your idea into a real business
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold">Limited Time:</span>
              <span className="text-2xl font-bold text-accent">FREE</span>
            </div>
            <p className="text-muted-foreground">
              Experience the full power of Kickstarter AI
            </p>
            <div className="text-sm text-muted-foreground">
              Usually $49 • Today only $0
            </div>
          </div>
        </div>

        <Button
          onClick={onUnlock}
          variant="premium"
          size="lg"
          className="w-full"
        >
          <Crown className="w-5 h-5 mr-2" />
          Unlock Business Draft (FREE)
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          No credit card required • Instant access
        </div>
      </div>
    </StepCard>
  );
};