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
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a startup advisor and business strategist. Provide concise, actionable, and practical advice.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
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
    const prompt = `Based on this problem: "${problem}"

Generate a single, focused business question that starts with "How might we..." and helps guide the creation of a startup solution. The question should:
- Be specific to the problem mentioned
- Focus on creating a scalable business solution
- Be actionable and inspiring
- Not exceed 25 words

Only return the question, nothing else.`;

    return this.makeAIRequest(prompt);
  }

  static async generateActionableSteps(problem: string, businessQuestion: string, selectedIdea: string, userContext?: string): Promise<string[]> {
    const prompt = `Create a personalized 8-step roadmap for this startup idea:

Problem: ${problem}
Business Question: ${businessQuestion}  
Solution: ${selectedIdea}
${userContext ? `User Context: ${userContext}` : ''}

Generate 8 specific, actionable steps that are:
- Personalized to this specific idea and problem
- Ordered logically from validation to launch
- Practical and achievable
- Include specific timeframes where relevant

Format as a numbered list. Each step should be 1-2 sentences maximum.`;

    const response = await this.makeAIRequest(prompt);
    
    // Parse the response into an array of steps
    const steps = response
      .split('\n')
      .filter(line => line.trim() && (line.match(/^\d+\./) || line.match(/^-/)))
      .map(line => line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
      .filter(step => step.length > 0);

    // Ensure we have 8 steps
    if (steps.length < 6) {
      return [
        'Validate your problem through customer interviews and surveys',
        'Research competitors and market size in your specific niche',
        'Create a detailed user persona and customer journey map',
        'Build a minimum viable product (MVP) focused on core features',
        'Test your MVP with 20-50 potential customers',
        'Iterate based on user feedback and usage analytics',
        'Develop a pricing strategy and business model',
        'Launch your product and execute growth marketing strategies'
      ];
    }

    return steps.slice(0, 8);
  }
}