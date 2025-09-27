import { useState, useCallback } from "react";

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
    await simulateAIGeneration(1500);
    const questions = [
      `How might we create a digital solution that addresses the core frustration of ${problem.toLowerCase()}?`,
      `How might we leverage technology to transform the way people experience ${problem.toLowerCase()}?`,
      `How might we build a scalable platform that eliminates ${problem.toLowerCase()} for our target audience?`,
    ];
    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
    updateData({ businessQuestion: selectedQuestion });
    nextStep();
  }, [simulateAIGeneration, updateData, nextStep]);

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

**Problem Statement:**
${problem}

**Business Question:**
${question}

**Solution:**
${selectedIdea}

**Target Audience:**
Early adopters and professionals seeking efficient solutions to streamline their workflow and eliminate common pain points.

**Unique Value Proposition:**
Revolutionary approach combining AI-driven insights with user-centric design to deliver measurable results and exceptional user experience.

**Revenue Model:**
- Freemium model with basic features
- Premium subscriptions ($29-99/month)
- Enterprise plans with custom pricing
- API access and integration fees

**Market Opportunity:**
Addressing a $2B+ market with growing demand for innovative solutions and strong user adoption rates.

**Competitive Advantage:**
First-mover advantage in this specific niche, proprietary technology, and deep understanding of user needs.
    `.trim();
    
    updateData({ businessDraft: draft });
    nextStep();
  }, [simulateAIGeneration, updateData, nextStep]);

  const generateActionableSteps = useCallback(async () => {
    console.log("generateActionableSteps called");
    await simulateAIGeneration(2000);
    const steps = [
      "Conduct market research and validate your target audience",
      "Create a minimum viable product (MVP) prototype",
      "Build a landing page and start collecting email signups",
      "Develop your core product features and user interface",
      "Launch beta testing with 10-20 early users",
      "Implement user feedback and iterate on your product",
      "Create a go-to-market strategy and pricing model",
      "Secure initial funding or bootstrap your growth",
    ];
    console.log("Setting actionable steps:", steps);
    updateData({ actionableSteps: steps });
    console.log("Moving to next step");
    nextStep();
  }, [simulateAIGeneration, updateData, nextStep]);

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