
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const systemPrompt = `You are a helpful assistant for the WYN Remnants app. WYN Remnants connects pet owners with restaurants to share food remnants with hungry pets. 

Key features of the app:
- Pet owners can find food remnants for their pets
- Restaurants can share leftover food instead of wasting it
- Users can donate to help feed hungry pets
- There's a fun WYN Runner game where users collect WYN-Koins
- The app helps reduce food waste while helping animals

Be friendly, helpful, and focus on these aspects of the app. Keep responses concise and informative.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser question: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request right now.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-navigation-helper function:', error);
    return new Response(JSON.stringify({ 
      response: "I'm having trouble right now, but I'm here to help you navigate WYN Remnants! Try asking me about donations, finding food for pets, or our game features." 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
