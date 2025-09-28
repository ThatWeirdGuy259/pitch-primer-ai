import { useState, useCallback } from "react";
import { AIService } from "@/services/aiService";

export interface StartupData {
  problem: string;
  businessQuestion: string;
  productIdeas: string[];
  selectedIdeaIndex: number;
  businessDraft: string;
  actionableSteps: string[];
}

export const useStartupWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [startupData, setStartupData] = useState<StartupData>({
    problem: "",
    businessQuestion: "",
    productIdeas: [],
    selectedIdeaIndex: 0,
    businessDraft: "",
    actionableSteps: [],
  });

  const simulateAIGeneration = useCallback(async (delay: number = 2000) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsGenerating(false);
  }, []);

  const updateData = useCallback((updates: Partial<StartupData>) => {
    setStartupData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const restart = useCallback(() => {
    setCurrentStep(1);
    setStartupData({
      problem: "",
      businessQuestion: "",
      productIdeas: [],
      selectedIdeaIndex: 0,
      businessDraft: "",
      actionableSteps: [],
    });
  }, []);

  const generateBusinessQuestion = useCallback(async (problem: string) => {
    setIsGenerating(true);
    try {
      const businessQuestion = await AIService.generateBusinessQuestion(problem);
      updateData({ businessQuestion });
      nextStep();
    } catch (error) {
      console.error('Failed to generate business question:', error);
      // Fallback to a generic question
      updateData({ 
        businessQuestion: `How might we create an innovative solution that addresses ${problem.toLowerCase()}?` 
      });
      nextStep();
    } finally {
      setIsGenerating(false);
    }
  }, [updateData, nextStep]);

  const generateProductIdeas = useCallback(async (businessQuestion: string) => {
    await simulateAIGeneration(2000);
    const ideas = [
      "AI-powered mobile app with smart automation and personalized recommendations",
      "Web-based platform with community features and real-time collaboration tools",
      "SaaS solution with advanced analytics and integration capabilities",
    ];
    updateData({ productIdeas: ideas });
    nextStep();
  }, [simulateAIGeneration, updateData, nextStep]);

  const generateBusinessDraft = useCallback(async (problem: string, question: string, selectedIdea: string) => {
    await simulateAIGeneration(3000);
    const draft = `
**STARTUP CONCEPT DRAFT**

**Business Question:**
${question}

**Solution:**
${selectedIdea}

**Target Opportunity:**
Based on the business question, this solution targets professionals and users who face the specific challenges identified in the opportunity analysis.

**Unique Value Proposition:**
Revolutionary approach combining AI-driven insights with user-centric design to deliver measurable results and exceptional user experience that directly addresses the core business question.

**Revenue Model:**
- Freemium model with basic features
- Premium subscriptions ($29-99/month)
- Enterprise plans with custom pricing
- API access and integration fees

**Market Opportunity:**
Addressing a significant market opportunity with growing demand for innovative solutions and strong user adoption rates based on the identified business question.

**Competitive Advantage:**
First-mover advantage in this specific niche, proprietary technology, and deep understanding of the specific user needs outlined in the business question.

**Next Steps:**
Ready to proceed with detailed market validation and MVP development based on this targeted approach.
    `.trim();
    
    updateData({ businessDraft: draft });
    nextStep();
  }, [simulateAIGeneration, updateData, nextStep]);

  const generateActionableSteps = useCallback(async () => {
    setIsGenerating(true);
    try {
      const selectedIdea = startupData.productIdeas[startupData.selectedIdeaIndex];
      const steps = await AIService.generateActionableSteps(
        startupData.problem,
        startupData.businessQuestion, 
        selectedIdea
      );
      updateData({ actionableSteps: steps });
      nextStep();
    } catch (error) {
      console.error('Failed to generate actionable steps:', error);
      // Fallback steps
      const fallbackSteps = [
        "Validate your problem through customer interviews",
        "Research your target market and competitors", 
        "Build a minimum viable product (MVP)",
        "Test with early users and gather feedback",
        "Iterate based on user insights",
        "Develop your business model and pricing",
        "Create a go-to-market strategy",
        "Launch and scale your solution"
      ];
      updateData({ actionableSteps: fallbackSteps });
      nextStep();
    } finally {
      setIsGenerating(false);
    }
  }, [startupData, updateData, nextStep]);

  return {
    currentStep,
    isGenerating,
    startupData,
    nextStep,
    prevStep,
    restart,
    updateData,
    generateBusinessQuestion,
    generateProductIdeas,
    generateBusinessDraft,
    generateActionableSteps,
  };
};