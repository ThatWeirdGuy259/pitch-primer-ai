// AI Service for generating startup content
export class AIService {
  private static async makeAIRequest(prompt: string): Promise<string> {
    // First, try to generate a response using pattern matching for better fallbacks
    const fallback = this.getSmartFallback(prompt);
    if (fallback !== 'API_NEEDED') {
      return fallback;
    }

    try {
      // Only attempt API call if we have a valid key
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your-api-key-here') {
        return this.getFallbackResponse(prompt);
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert startup advisor and business strategist with 15+ years of experience helping entrepreneurs build successful companies. You provide specific, actionable, and highly personalized advice based on the exact problem described. Never give generic responses - always tailor your advice to the specific situation.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || this.getFallbackResponse(prompt);
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  private static getSmartFallback(prompt: string): string {
    // Smart pattern matching for better fallbacks without API
    if (prompt.includes('business question')) {
      const problemMatch = prompt.match(/problem: "([^"]+)"/i);
      if (problemMatch) {
        const problem = problemMatch[1].toLowerCase();
        
        // Generate specific questions based on problem patterns
        if (problem.includes('email') && problem.includes('organiz')) {
          return 'How might we create a solution that automates email organization to save users time and reduce daily inbox management?';
        }
        if (problem.includes('time') && problem.includes('manual')) {
          return `How might we automate the manual processes that consume too much time in ${problem.split('manual')[1] || 'daily workflows'}?`;
        }
        if (problem.includes('difficult') || problem.includes('hard')) {
          return `How might we simplify and streamline ${problem.replace(/it('s)?\s+(difficult|hard)/i, '').trim()} for better user experience?`;
        }
        if (problem.includes('expensive') || problem.includes('cost')) {
          return `How might we create an affordable alternative that reduces costs while maintaining quality in ${problem}?`;
        }
        
        return `How might we create a solution that directly addresses ${problem} through innovative technology and user-centered design?`;
      }
    }
    
    return 'API_NEEDED';
  }

  private static getFallbackResponse(prompt: string): string {
    if (prompt.includes('business question')) {
      // Extract the problem from the prompt to create a specific question
      const problemMatch = prompt.match(/problem: "([^"]+)"/i);
      if (problemMatch) {
        const problem = problemMatch[1];
        return `How might we create a solution that directly addresses ${problem.toLowerCase()} through innovative technology and user-centered design?`;
      }
      return 'How might we create an innovative solution that addresses the core challenges people face in this area?';
    }
    if (prompt.includes('actionable steps')) {
      return 'Research your market, validate your idea, build an MVP, test with users, iterate based on feedback, and develop a go-to-market strategy.';
    }
    return 'Please configure your AI API key to get personalized responses.';
  }

  static async generateBusinessQuestion(problem: string): Promise<string> {
    const prompt = `I need you to create a precise business question for this specific problem: "${problem}"

Requirements:
- Start with "How might we..."
- Be extremely specific to the exact problem mentioned
- Focus on the core pain point, not generic business solutions
- Include specific keywords from the problem statement
- Make it actionable for creating a targeted startup solution
- Maximum 20 words

Example:
Problem: "I spend too much time manually organizing my email inbox every day"
Good Question: "How might we create a solution that automates email organization to save users time and reduce daily inbox management?"

Bad Question: "How might we create an innovative solution that addresses core challenges?"

Now generate a specific business question for: "${problem}"

Return ONLY the question, nothing else.`;

    return this.makeAIRequest(prompt);
  }

  static async generateActionableSteps(problem: string, businessQuestion: string, selectedIdea: string, userContext?: string): Promise<string[]> {
    const prompt = `Create a detailed, actionable 8-step roadmap for this specific startup idea:

**Business Question**: ${businessQuestion}  
**Solution Approach**: ${selectedIdea}
${userContext ? `**Additional Context**: ${userContext}` : ''}

I need a premium-quality, personalized roadmap that someone would pay for. Each step should be:

1. **Hyper-specific** to this exact business question and solution
2. **Actionable** with concrete next steps
3. **Valuable** - containing insights worth paying for
4. **Realistic** with practical timelines
5. **Progressive** - each step builds on the previous

Include specific tactics, tools, metrics, and methodologies relevant to this particular startup idea based on the business question.

Format: Return exactly 8 numbered steps, each 1-2 sentences with specific actionable details.

Example quality level:
Instead of: "Validate your idea"
Provide: "Conduct 25 customer interviews using the Mom Test methodology, focusing on the specific pain points in your business question, and achieve 80%+ problem confirmation rate within 3 weeks"

Generate 8 premium-quality, specific steps based on the business question:`;

    const response = await this.makeAIRequest(prompt);
    
    // Parse the response into an array of steps
    const steps = response
      .split('\n')
      .filter(line => line.trim() && (line.match(/^\d+\./) || line.match(/^-/)))
      .map(line => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
      .filter(step => step.length > 0);

    // Ensure we have 8 high-quality steps, provide premium fallbacks based on business question
    if (steps.length < 6) {
      const questionFocus = businessQuestion.toLowerCase();
      return [
        `Validate the specific opportunity outlined in your business question through 30+ customer interviews using structured problem-discovery frameworks`,
        `Analyze 10-15 direct and indirect competitors addressing similar challenges, identifying their pricing models, feature gaps, and customer complaints`,
        `Build detailed user personas and customer journey maps specific to the target market implied by your business question`,
        `Develop an MVP focusing on your core value proposition with 2-3 essential features that directly address your business question`,
        `Launch beta testing with 50-100 users from your target segment, tracking specific usage metrics and user feedback loops`,
        `Iterate based on user behavior analytics, implementing features that show highest engagement and solution effectiveness`,
        `Design a pricing strategy based on value-based pricing models, testing with your beta users to optimize price points and packaging`,
        `Execute a targeted go-to-market strategy using channels where your specific target audience already congregates and seeks solutions`
      ];
    }

    return steps.slice(0, 8);
  }
}