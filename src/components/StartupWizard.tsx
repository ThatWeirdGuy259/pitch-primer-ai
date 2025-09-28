import { useStartupWizard } from "@/hooks/useStartupWizard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { HeroStep } from "@/components/steps/HeroStep";
import { ProblemStep } from "@/components/steps/ProblemStep";
import { BusinessQuestionStep } from "@/components/steps/BusinessQuestionStep";
import { ProductIdeasStep } from "@/components/steps/ProductIdeasStep";
import { PaywallStep } from "@/components/steps/PaywallStep";
import { BusinessDraftStep } from "@/components/steps/BusinessDraftStep";
import { ActionStepsStep } from "@/components/steps/ActionStepsStep";

export const StartupWizard = () => {
  const {
    currentStep,
    isGenerating,
    startupData,
    restart,
    updateData,
    generateBusinessQuestion,
    generateProductIdeas,
    generateBusinessDraft,
    generateActionableSteps,
    nextStep,
  } = useStartupWizard();

  const stepLabels = [
    "Problem",
    "Question", 
    "Ideas",
    "Unlock",
    "Draft",
    "Steps"
  ];

  const handleProblemSubmit = (problem: string) => {
    updateData({ problem });
    generateBusinessQuestion(problem);
  };

  const handleProductIdeasNext = () => {
    generateProductIdeas(startupData.businessQuestion);
  };

  const handleSelectIdea = (index: number) => {
    updateData({ selectedIdeaIndex: index });
  };

  const handlePaywallNext = () => {
    nextStep();
  };

  const handleBusinessDraftGenerate = () => {
    const selectedIdea = startupData.productIdeas[startupData.selectedIdeaIndex];
    generateBusinessDraft(
      startupData.problem,
      startupData.businessQuestion,
      selectedIdea
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <HeroStep onStart={() => nextStep()} />;
      
      case 2:
        return (
          <ProblemStep
            problem={startupData.problem}
            onNext={handleProblemSubmit}
          />
        );
      
      case 3:
        return (
          <BusinessQuestionStep
            problem={startupData.problem}
            businessQuestion={startupData.businessQuestion}
            isGenerating={isGenerating}
            onNext={handleProductIdeasNext}
            onGenerate={() => generateBusinessQuestion(startupData.problem)}
          />
        );
      
      case 4:
        return (
          <ProductIdeasStep
            businessQuestion={startupData.businessQuestion}
            productIdeas={startupData.productIdeas}
            selectedIdeaIndex={startupData.selectedIdeaIndex}
            isGenerating={isGenerating}
            onNext={handlePaywallNext}
            onGenerate={() => generateProductIdeas(startupData.businessQuestion)}
            onSelectIdea={handleSelectIdea}
          />
        );
      
      case 5:
        return <PaywallStep onUnlock={() => nextStep()} />;
      
      case 6:
        return (
          <BusinessDraftStep
            problem={startupData.problem}
            businessQuestion={startupData.businessQuestion}
            selectedIdea={startupData.productIdeas[startupData.selectedIdeaIndex]}
            businessDraft={startupData.businessDraft}
            isGenerating={isGenerating}
            onNext={() => {
              console.log("Business draft onNext called, generating action steps");
              generateActionableSteps();
            }}
            onGenerate={handleBusinessDraftGenerate}
          />
        );
      
      case 7:
        return (
          <ActionStepsStep
            actionableSteps={startupData.actionableSteps}
            isGenerating={isGenerating}
            onRestart={restart}
            onGenerate={generateActionableSteps}
          />
        );
      
      default:
        return <HeroStep onStart={() => nextStep()} />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentStep > 1 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <ProgressIndicator
              currentStep={currentStep - 1}
              totalSteps={6}
              stepLabels={stepLabels}
            />
          </div>
        </div>
      )}
      
      <div className={currentStep > 1 ? "pt-20 md:pt-24" : ""}>
        <div className="container mx-auto px-4 py-4 md:py-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};