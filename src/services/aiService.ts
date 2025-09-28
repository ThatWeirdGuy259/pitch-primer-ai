// AI Service for generating startup content
export class AIService {
  private static async makeAIRequest(prompt: string): Promise<string> {
    try {
      // Using OpenAI-compatible API (can be configured for different providers)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here'}`,
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
          temperature: 0.3, // Lower temperature for more focused responses
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Unable to generate response';
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to a basic response if AI fails
      return this.getFallbackResponse(prompt);
    }
  }

  private static getFallbackResponse(prompt: string): string {
    if (prompt.includes('business question')) {
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

**Problem**: ${problem}
**Business Question**: ${businessQuestion}  
**Solution Approach**: ${selectedIdea}
${userContext ? `**Additional Context**: ${userContext}` : ''}

I need a premium-quality, personalized roadmap that someone would pay for. Each step should be:

1. **Hyper-specific** to this exact problem and solution
2. **Actionable** with concrete next steps
3. **Valuable** - containing insights worth paying for
4. **Realistic** with practical timelines
5. **Progressive** - each step builds on the previous

Include specific tactics, tools, metrics, and methodologies relevant to this particular startup idea.

Format: Return exactly 8 numbered steps, each 1-2 sentences with specific actionable details.

Example quality level:
Instead of: "Validate your idea"
Provide: "Conduct 25 customer interviews using the Mom Test methodology, focusing on email management pain points, and achieve 80%+ problem confirmation rate within 3 weeks"

Generate 8 premium-quality, specific steps:`;

    const response = await this.makeAIRequest(prompt);
    
    // Parse the response into an array of steps
    const steps = response
      .split('\n')
      .filter(line => line.trim() && (line.match(/^\d+\./) || line.match(/^-/)))
      .map(line => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
      .filter(step => step.length > 0);

    // Ensure we have 8 high-quality steps, provide premium fallbacks if needed
    if (steps.length < 6) {
      return [
        `Validate the specific pain points of ${problem.toLowerCase()} through 30+ customer interviews using structured problem-discovery frameworks`,
        `Analyze 10-15 direct and indirect competitors, identifying their pricing models, feature gaps, and customer complaints in your exact niche`,
        `Build detailed user personas and customer journey maps specific to your target market's email management workflow and pain points`,
        `Develop an MVP focusing on your core value proposition with 2-3 essential features that directly solve the validated problem`,
        `Launch beta testing with 50-100 users from your target segment, tracking specific usage metrics and user feedback loops`,
        `Iterate based on user behavior analytics, implementing features that show highest engagement and problem-solving effectiveness`,
        `Design a pricing strategy based on value-based pricing models, testing with your beta users to optimize price points and packaging`,
        `Execute a targeted go-to-market strategy using channels where your specific target audience already congregates and seeks solutions`
      ];
    }

    return steps.slice(0, 8);
  }
}