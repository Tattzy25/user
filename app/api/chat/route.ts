import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are a specialized search bar widget generator. You ONLY create search bar components - nothing else.

Your role is to generate complete, production-ready HTML search bar widgets based on user descriptions. You have access to a library of 3000+ pre-made search bar components in various styles and colors.

Rules:
1. Only generate search bar/search input widgets
2. Generate complete, self-contained HTML with inline styles
3. Use modern styling with proper rounded corners, shadows, and animations
4. Make widgets fully responsive and accessible
5. Include hover effects, focus states, and smooth transitions
6. Each widget must be embeddable via a simple copy-paste
7. Use semantic HTML and ensure cross-browser compatibility

When generating code, provide:
1. Complete HTML markup with inline CSS
2. A button element for search
3. An input element with proper attributes
4. Mobile-responsive design
5. Proper accessibility attributes (aria-label, etc.)

Style preferences:
- Modern, sleek designs with rounded corners
- Subtle shadows and glows
- Smooth transitions
- Accessible color contrasts
- Clean, minimalist approach`;

const searchBarTemplates = {
  minimal: `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="position: relative;">
    <input type="search" placeholder="Search..." aria-label="Search"
           style="width: 100%; padding: 14px 48px 14px 20px; font-size: 16px; 
                  border-radius: 8px; border: 1px solid #e5e7eb; 
                  background: #ffffff; color: #000000; outline: none;
                  transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" 
           onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59,130,246,0.1)'"
           onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.05)'" />
    <button aria-label="Search" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); 
                   background: #000000; border: none; border-radius: 6px; 
                   width: 36px; height: 36px; cursor: pointer; transition: all 0.2s;
                   display: flex; align-items: center; justify-content: center;"
            onmouseover="this.style.background='#1f2937'"
            onmouseout="this.style.background='#000000'">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</div>`,
  glass: `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="position: relative;">
    <input type="search" placeholder="Search..." aria-label="Search"
           style="width: 100%; padding: 16px 52px 16px 24px; font-size: 16px; 
                  border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); 
                  background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
                  color: #000000; outline: none; transition: all 0.3s;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);" 
           onfocus="this.style.background='rgba(255,255,255,0.2)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.15)'"
           onblur="this.style.background='rgba(255,255,255,0.1)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" />
    <button aria-label="Search" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); 
                   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                   border: none; border-radius: 12px; 
                   width: 40px; height: 40px; cursor: pointer; transition: all 0.3s;
                   display: flex; align-items: center; justify-content: center;
                   box-shadow: 0 2px 8px rgba(102,126,234,0.3);"
            onmouseover="this.style.transform='translateY(-50%) scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(102,126,234,0.5)'"
            onmouseout="this.style.transform='translateY(-50%) scale(1)'; this.style.boxShadow='0 2px 8px rgba(102,126,234,0.3)'">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</div>`,
  skyBlue: `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="position: relative;">
    <input type="search" placeholder="Search anything..." aria-label="Search"
           style="width: 100%; padding: 16px 52px 16px 24px; font-size: 16px; 
                  border-radius: 12px; border: 2px solid #0ea5e9; 
                  background: #ffffff; color: #000000; outline: none;
                  transition: all 0.2s; box-shadow: 0 2px 8px rgba(14,165,233,0.1);" 
           onfocus="this.style.borderColor='#0284c7'; this.style.boxShadow='0 4px 16px rgba(14,165,233,0.25)'"
           onblur="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 2px 8px rgba(14,165,233,0.1)'" />
    <button aria-label="Search" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); 
                   background: #0ea5e9; border: none; border-radius: 10px; 
                   width: 42px; height: 42px; cursor: pointer; transition: all 0.2s;
                   display: flex; align-items: center; justify-content: center;"
            onmouseover="this.style.background='#0284c7'; this.style.transform='translateY(-50%) scale(1.05)'"
            onmouseout="this.style.background='#0ea5e9'; this.style.transform='translateY(-50%) scale(1)'">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  </div>
</div>`
};

function generateSearchBarCode(description: string): string {
  const lowerDesc = description.toLowerCase();
  
  if (lowerDesc.includes('glass') || lowerDesc.includes('blur') || lowerDesc.includes('floating')) {
    return searchBarTemplates.glass;
  } else if (lowerDesc.includes('sky') || lowerDesc.includes('blue') || lowerDesc.includes('ocean')) {
    return searchBarTemplates.skyBlue;
  } else {
    return searchBarTemplates.minimal;
  }
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const groq = new Groq({ apiKey });
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Generate the search bar code based on description
          const generatedCode = generateSearchBarCode(message);
          
          // Create a data URL for the preview
          const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background: #f9fafb; }
  </style>
</head>
<body>
  ${generatedCode}
</body>
</html>
          `)}`;
          
          // Stream the response
          const chatCompletion = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: message }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
            stream: true,
          });

          let fullResponse = '';
          
          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              fullResponse += content;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: 'text', content })}\n\n`)
              );
            }
          }
          
          // Send the complete response with code
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ 
              type: 'complete',
              code: generatedCode,
              preview: dataUrl,
              text: fullResponse
            })}\n\n`)
          );
          
          controller.close();
        } catch (error) {
          console.error('Groq API error:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ 
              type: 'error',
              error: 'Failed to generate widget'
            })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
