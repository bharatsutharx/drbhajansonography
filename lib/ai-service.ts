"use client"

type LanguageType = "en" | "hi" | "hinglish";

// Improved language detection with better Hinglish markers
function detectLanguage(text: string): LanguageType {
  const hindiPattern = /[\u0900-\u097F]/;
  
  // More comprehensive Hinglish markers
  const hinglishWords = [
    "hai", "hain", "tha", "thi", "the", "ho", "hoga", "hogi", "kya", "kyun",
    "kaise", "kaisa", "mujhe", "mera", "meri", "mere", "hum", "humko", "hamara",
    "aap", "aapka", "aapki", "aapke", "karna", "karva", "karni", "karne", "ki",
    "ka", "ke", "ko", "se", "par", "me", "mai", "mein", "nahi", "na", "bilkul",
    "thoda", "bahut", "jyada", "kam", "achha", "theek", "dard", "problem", "test",
    "karwana", "krna", "krvana", "scan", "price", "rate", "open", "band", "report"
  ];
  
  // Check for Hindi script
  if (hindiPattern.test(text)) {
    return "hi";
  }
  
  // Check for Hinglish patterns
  const words = text.toLowerCase().split(/\s+/);
  const hinglishWordCount = words.filter(word => hinglishWords.includes(word)).length;
  
  // If any Hinglish words are found, classify as Hinglish
  if (hinglishWordCount > 0) {
    return "hinglish";
  }
  
  return "en";
}

// Improved system prompt. 
// In ai-service.ts, enhance your system prompt:

function getSystemPrompt(): string {
  return `You are "Dr. Bhajan Assistant", the official assistant for Dr. Bhajan Sonography & Imaging Centre located in Sanchor, Rajasthan.

CORE FACTS ABOUT THE CENTER:
- Location: N.H. 68, Opposite B.Lal & Citilite Hospital, Kamalpura, Sanchor, Rajasthan
- Phone: 94609 91212
- Hours: Daily open 9:30 AM to 8:00 PM (Emergency services 24/7)
- Founded by: Dr. Bhajan Lal (MBBS, MD Radiodiagnosis)
- Services: MRI, CT Scan, Sonography/Ultrasound, X-Ray, Color Doppler

COMMUNICATION STYLE:
1. ALWAYS respond in natural conversational Hinglish (mix of Hindi and English)
2. Use short responses (2-3 lines maximum)
3. Speak exactly like a friendly receptionist would at a medical center in India
4. Address patients respectfully as "sir/ma'am" 
5. For appointments, ALWAYS direct people to call: "Sir aap appointment ke liye 94609 91212 par call kar lijiye"

PRICING INFORMATION:
- MRI: (depends on body part and contrast)
- CT Scan: (depends on body part and contrast)
- Sonography:  (depends on type)
- X-Ray: (depends on part)
- Color Doppler: Call krke ptta krna pdega sir

IMPORTANT RULES:
- NEVER give appointments directly - always ask them to call
- NEVER mention other centers or locations
- NEVER claim the center is in any city other than Sanchor
- For medical advice questions, say: "Sir/Ma'am is baare mein Dr. Bhajan Lal se direct baat karna better rahega"
- If unsure about anything, say: "Sir/Ma'am exact information ke liye 94609 91212 par call kar lijiye"
- Direct all emergency cases to: "Sir aap emergency mein direct aa sakte hain, 24/7 facility available hai"

EXAMPLE CONVERSATIONS:
User: "CT scan karane ke liye kya rate hai?"
You: "CT scan ka rate body part aur contrast ke use pe depend karta hai. Exact rate janne ke liye 94609 91212 pe call kar lijiye."

User: "MRI scan karane ke liye kya rate hai?"
You: "MRI scan ka rate body part aur contrast ke use pe depend karta hai. Exact rate janne ke liye 94609 91212 pe call kar lijiye."

User: "kya aaj center open hai?"
You: "Ji sir, aaj center open hai. Hum daily 9:30 am se 8:00 pm tak open rehte hain. Aap kab aana chahte hain?"

User: "MRI ke liye appointment kaise le?"
You: "Sir aap appointment ke liye 94609 91212 par call kar lijiye.

User: "doctor kaun hai wahan pe?"
You: "Sir, hamare center pe Dr. Bhajan Lal hain jo MBBS, MD Radiodiagnosis hain. Unke pass 15+ years ka experience hai medical imaging mein."

User: "Center kahan hai?"
You: " sir, humara center Sanchor, Rajasthan mein hai. Address hai: N.H. 68, Opposite B.Lal & Citilite Hospital, Kamalpura, Sanchor. Aap kahan se aa rahe hain?"

REMEMBER: You MUST always respond in Hinglish, and you are the assistant for Dr. Bhajan Sonography Centre in Sanchor ONLY.`;
}

/**
 * Generate a response using OpenRouter
 */
export async function generateMedicalResponse(
  userMessage: string,
  languageParam: LanguageType = "hinglish"
): Promise<string> {
  // Always enforce Hinglish responses regardless of input language
  const detectedLanguage = detectLanguage(userMessage);
  console.log("Detected language:", detectedLanguage);
  
  // Apply rate limiting
  try {
    const now = Date.now();
    const lastRequest = localStorage.getItem("last-chat-request");
    
    if (lastRequest && now - parseInt(lastRequest) < 1500) {
      await new Promise(resolve => 
        setTimeout(resolve, 1500 - (now - parseInt(lastRequest)))
      );
    }
    
    localStorage.setItem("last-chat-request", now.toString());
  } catch (error) {
    // Continue even if localStorage fails
  }

  // Get API key for OpenRouter
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error("OpenRouter API key missing");
    return getFallbackHinglishResponse(userMessage);
  }

  try {
    // Get the ScanBuddy system prompt
    const systemPrompt = getSystemPrompt();
    
    // Make the request to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "Dr. Bhajan Sonography'sAssistant" // Optional but recommended
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free", // Using Llama 3.1 for better Hinglish
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150, // Limiting tokens to ensure short responses
        temperature: 0.7,
        top_p: 0.9
      })
    });
    
    // Handle errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouter API error (${response.status}):`, errorText);
      return getFallbackHinglishResponse(userMessage);
    }
    
    // Process response
    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      console.error("Empty response from OpenRouter API");
      return getFallbackHinglishResponse(userMessage);
    }
    
    return aiResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    return getFallbackHinglishResponse(userMessage);
  }
}

// Enhanced Hinglish fallback responses that match the ScanBuddy persona
function getFallbackHinglishResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Timing related queries
  if (lowerMessage.includes("time") || lowerMessage.includes("open") || 
      lowerMessage.includes("close") || lowerMessage.includes("band") || 
      lowerMessage.includes("kab") || lowerMessage.includes("timing") || 
      lowerMessage.includes("khul")) {
    return "Sir center daily 9:30 am se 8:00 pm tak open rehta hai. Emergency services 24/7 available hain CT aur MRI ke liye.";
  }
  
  // Report related queries
  if (lowerMessage.includes("report") || lowerMessage.includes("result")) {
    return "Reports usually same day mil jati hain sir. ";
  }

  if (lowerMessage.includes("report") || lowerMessage.includes("result")) {
    return "Reports test ke hote hi 10-15 minutes mein counter pr mil jati hain sir. ";
  }

  if (lowerMessage.includes("Purani report") || lowerMessage.includes("purana result")) {
    return "Puranii Reports lene ke liye app whatsapp pr 94609 91212 pe message kar sakte hain sir. ";
  }
  
  // Appointment related queries
  if (lowerMessage.includes("appoint") || lowerMessage.includes("book") || 
      lowerMessage.includes("slot") || lowerMessage.includes("schedule")) {
    return "Sir aap appointment ke liye 94609 91212 pe call kar lijiye. Apko jankari wahan milegi.";
  }
  
  // Test procedure related queries
  if (lowerMessage.includes("kaise") || lowerMessage.includes("procedure") || 
      lowerMessage.includes("how") || lowerMessage.includes("tarika")) {
    
    if (lowerMessage.includes("mri")) {
      return "MRI ek painless procedure hai sir. Machine mein let kar scan hota hai. Approximately 30-40 minute lagta hai. Koi preparation nahi chahiye usually.";
    }
    
    if (lowerMessage.includes("ct") || lowerMessage.includes("citi")) {
      return "CT scan bilkul simple procedure hai sir. Machine mein let kar scan hota hai. Sirf 5-10 minute lagta hai. Kabhi contrast inject karna pad sakta hai.";
    }
    
    if (lowerMessage.includes("sono") || lowerMessage.includes("ultra")) {
      return "Ultrasound mein gel lagake probe se scan karte hain sir. Bilkul painless hai aur 15-20 minute mein ho jata hai.";
    }
    
    return "Sir yeh painless procedure hai. Appointment ke time doctor procedure explain karenge. Koi preparation chahiye to bata denge.";
  }
  
  // Test availability queries
  if (lowerMessage.includes("available") || lowerMessage.includes("hai kya") || 
      lowerMessage.includes("hota hai") || lowerMessage.includes("karte hai") || 
      lowerMessage.includes("milega")) {
    
    if (lowerMessage.includes("mri")) {
      return "Haan sir, MRI available hai. Humari state-of-the-art 1.5T MRI machine hai. Aaj hi ho jayega agar aap time pe aa sakte hain.";
    }
    
    if (lowerMessage.includes("ct") || lowerMessage.includes("citi")) {
      return "Ji sir, CT scan available hai. Humari 96-slice CT machine hai jo bohot detailed images deti hai. Today available hai.";
    }
    
    if (lowerMessage.includes("sono") || lowerMessage.includes("ultra")) {
      return "Haan sir, ultrasound available hai. 3D aur 4D dono options hain. Pregnancy, abdominal, aur sabhi types ke scans karte hain.";
    }
    
    if (lowerMessage.includes("x") || lowerMessage.includes("xray") || lowerMessage.includes("x-ray")) {
      return "Ji sir, digital X-ray available hai. Sabhi body parts ka X-ray karte hain. 10-15 minute mein ho jata hai.";
    }
    
    return "Ji sir, yeh test available hai. Dr. Bhajan Sonography Centre mein sabhi modern imaging facilities hain. Aap aa sakte hain.";
  }
  
  // Greeting or general query
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || 
      lowerMessage.includes("hey") || lowerMessage.includes("namaste") || 
      lowerMessage.length < 10) {
    return "Namaste! Dr. Bhajan Sonography Centre mein aapka swagat hai. Aapko kya help chahiye sir?";
  }
  
  // Default response
  return "Dr. Bhajan Sonography Centre mein aapka swagat hai. MRI, CT scan, ultrasound, X-ray sabhi facilities available hain. Aapko kya help chahiye sir?";
}