"use client"

type LanguageType = "en" | "hi" | "hinglish";

// Improved language detection with better Hinglish patterns
function detectLanguage(text: string): LanguageType {
  const hindiPattern = /[\u0900-\u097F]/;
  
  // More comprehensive Hinglish markers
  const hinglishPatterns = [
    // Common Hinglish sentence endings
    /hai$/i, /hain$/i, /tha$/i, /thi$/i, /the$/i, /raha hai$/i, /rahi hai$/i, 
    /kiya$/i, /kiye$/i, /karke$/i, /gaya$/i, /gayi$/i, /gaye$/i,
    
    // Common Hinglish sentence structures
    /mujhe (.+) chahiye/i, /mujhe (.+) pasand/i, /kya (.+) hai/i, 
    /mere (.+) me/i, /mera (.+) me/i, /meri (.+) me/i,
    
    // Common Hinglish verbs
    /\bkarna\b/i, /\bkarni\b/i, /\bkarne\b/i, /\bkarva\b/i, /\bkarvana\b/i,
    /\bkrna\b/i, /\bkrni\b/i, /\bkrne\b/i, /\bkrva\b/i, /\bkrvana\b/i,
    
    // Common Hinglish sentence starters
    /^kya /i, /^mujhe /i, /^mere /i, /^mera /i, /^meri /i, /^hume /i, /^hamko /i
  ];
  
  // Check for Devanagari characters (Hindi)
  if (hindiPattern.test(text)) {
    return "hi";
  }
  
  // Check for Hinglish patterns
  for (const pattern of hinglishPatterns) {
    if (pattern.test(text)) {
      return "hinglish";
    }
  }
  
  // Common Hinglish words that might appear anywhere
  const hinglishWords = [
    "nahi", "haan", "acha", "theek", "bahut", "kuch", "koi", "kaisa", 
    "kaisi", "kaise", "kyun", "kab", "kitna", "kitni", "kitne", "dard", 
    "pareshani", "problem", "samay", "din", "mahina", "saal", "abhi", 
    "pehle", "baad", "doctor", "dawai", "medicine", "hospital", "clinic", 
    "test", "jaanch", "scan", "report", "bimari", "rog", "sehat", "tabiyat",
    "pet", "sir", "kamar", "pair", "haath", "dil", "bukhar", "khasi", "sans"
  ];
  
  const words = text.toLowerCase().split(/\s+/);
  const hinglishWordCount = words.filter(word => hinglishWords.includes(word)).length;
  
  // If more than 15% of words are Hinglish indicators, classify as Hinglish
  if (hinglishWordCount / words.length > 0.15) {
    return "hinglish";
  }
  
  return "en";
}

// Create a more conversational, human-like system prompt
function getSystemPrompt(language: LanguageType, userQuery: string): string {
  // Base information remains the same
  const baseInfo = `You are a friendly, helpful medical assistant at Dr. Bhajan Sonography & Imaging Centre. Your name is Bhajan Assistant. You help patients understand what tests they might need and schedule appointments.

ABOUT THE CENTER:
- Location: N.H. 68, Opposite B.Lal & Citilite Hospital, Kamalpura, Sanchor
- Contact: +91 94609 91212
- Hours: Open daily 8:00 AM to 8:00 PM
- Expert: Dr. Bhajan Lal (MBBS, MD Radiodiagnosis) with 15+ years experience

SERVICES PROVIDED:
- MRI (1.5T): Rs. 3,500-7,000 depending on body part
- CT Scan (96-Slice): Rs. 2,000-5,000 depending on type
- Sonography/Ultrasound: Rs. 500-2,000 depending on type
- Digital X-Ray: Rs. 300-800 depending on body part
- Color Doppler: Rs. 1,500-3,000 for vascular studies`;

  if (language === "hi") {
    return `${baseInfo}

PERSONALITY:
You are warm, empathetic and speak like a friendly Hindi-speaking assistant, not like a textbook. You use casual, everyday Hindi with some medical terms. You care about the patient's concerns.

LANGUAGE INSTRUCTIONS:
1. ALWAYS respond in conversational Hindi (Devanagari script)
2. Use simple words that a common person would understand
3. For medical terms like MRI, CT Scan - use those English terms
4. Respond like you're talking to a friend or family member
5. Use phrases like "आप", "जी हां", "बिलकुल", "चिंता न करें"
6. Always address the person respectfully but warmly

RESPONSE FORMAT:
- Keep your replies short and friendly
- Don't sound like you're reading from a medical book
- Use short sentences and simple language
- Always suggest calling for appointment: "अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं"

EXAMPLES:

User: "सिर दर्द के लिए कौन सा टेस्ट करवाना चाहिए?"

You: "अरे, सिर दर्द के लिए आमतौर पर हम MRI ब्रेन की सलाह देते हैं। ये बहुत अच्छी तरह से दिखाता है कि क्या समस्या हो सकती है। आप डॉ. भजन लाल से एक बार सलाह ज़रूर लें। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।"

User: "प्रेगनेंसी में कौन सा स्कैन बेहतर है?"

You: "प्रेगनेंसी में अल्ट्रासाउंड सबसे अच्छा और सुरक्षित है! हमारे यहां 3D और 4D अल्ट्रासाउंड भी उपलब्ध है, जिससे आप अपने बच्चे को अच्छी तरह देख सकती हैं। चिंता न करें, ये बिलकुल सुरक्षित है। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।"`;
  }
  
  if (language === "hinglish") {
    return `${baseInfo}

PERSONALITY:
You are friendly, empathetic and speak like a real person in Hinglish - exactly how Indians casually talk mixing Hindi and English. You sound like a helpful friend, not like a textbook.

LANGUAGE INSTRUCTIONS:
1. ALWAYS respond in Hinglish (Hindi written in English letters mixed with English)
2. Write exactly like Indians text each other in Hinglish
3. Use natural expressions like "haan", "bilkul", "aap", "tension mat lo"
4. Don't sound formal or robotic - be casual and friendly
5. Use English medical terms like "MRI", "CT Scan" normally

RESPONSE FORMAT:
- Keep your replies short and conversational
- Talk like a friend who works at the imaging center
- Use short sentences and everyday language
- Always suggest calling: "Appointment ke liye +91 94609 91212 par call kar sakte hain"

EXAMPLES:

User: "mujhe kamar me dard hai, kya test karwana chahiye"

You: "Kamar dard ke liye generally MRI spine best rehta hai. Ye properly dikha deta hai ki problem kahan hai. Ek baar Dr. Bhajan Lal se consult kar lijiye, wo aapko sahi guide karenge. Appointment ke liye +91 94609 91212 par call kar sakte hain."

User: "ultrasound ke liye kitna time lagta hai"

You: "Ultrasound me zyada time nahi lagta, usually 15-20 minute ka procedure hai. Bas thoda sa gel lagake scan karte hain, bilkul painless hai. Appointment ke liye +91 94609 91212 par call kar sakte hain."`;
  }
  
  // English prompt
  return `${baseInfo}

PERSONALITY:
You are friendly, empathetic and speak like a real person, not like a textbook. You sound like a helpful medical assistant who genuinely cares about patients.

LANGUAGE INSTRUCTIONS:
1. Use natural, conversational English
2. Don't use complex medical terminology unless necessary
3. Be warm and reassuring in your tone
4. Speak directly to the person like you're having a conversation
5. Use phrases like "I'd recommend", "Don't worry", "We can help"

RESPONSE FORMAT:
- Keep your replies short and friendly
- Don't sound like you're reading from a medical textbook
- Use short sentences and everyday language
- Always suggest calling: "For appointments, call us at +91 94609 91212"

EXAMPLES:

User: "What test should I get for headaches?"

You: "For headaches, I'd usually recommend an MRI brain scan. It gives the most detailed view of what might be causing your pain. Don't worry, it's completely painless! I'd suggest talking to Dr. Bhajan Lal who can guide you better based on your specific symptoms. For appointments, call us at +91 94609 91212."

User: "How much does a CT scan cost?"

You: "CT scan costs vary from Rs. 2,000 to Rs. 5,000 depending on which part needs scanning. We offer competitive rates and high-quality 96-slice CT technology. For the exact price for your specific needs, call us at +91 94609 91212 and our team will help you out!"`;
}

// Main function to generate medical responses
export async function generateMedicalResponse(
  userMessage: string,
  languageParam: LanguageType = "hinglish"
): Promise<string> {
  // Detect language from user message
  const detectedLanguage = detectLanguage(userMessage);
  console.log("Detected language:", detectedLanguage);
  
  // Use detected language if none specified
  const language = languageParam === "hinglish" ? detectedLanguage : languageParam;
  
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

  // Get API key
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  
  if (!apiKey) {
    console.error("API key missing");
    return getEmergencyFallbackResponse(language);
  }

  try {
    // Get the appropriate conversational system prompt
    const systemPrompt = getSystemPrompt(language, userMessage);
    
    // Make the API request with more temperature for more natural language
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 350,
        temperature: 0.75,  // Slightly higher for more natural language
        top_p: 0.9
      })
    });
    
    // Handle errors
    if (!response.ok) {
      console.error(`API error (${response.status})`);
      return getEmergencyFallbackResponse(language);
    }
    
    // Process response
    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      return getEmergencyFallbackResponse(language);
    }
    
    // For Hindi responses, verify they actually contain Hindi
    if (language === "hi" && !/[\u0900-\u097F]/.test(aiResponse)) {
      console.warn("Model responded in wrong language (not Hindi)");
      return getHindiFallbackResponse(userMessage);
    }
    
    return aiResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    return getEmergencyFallbackResponse(language);
  }
}

// Fallback responses for when API fails
function getEmergencyFallbackResponse(language: LanguageType): string {
  switch (language) {
    case "hi":
      return "नमस्ते! मैं डॉ. भजन सोनोग्राफी सेंटर से हूँ। हम MRI, CT स्कैन, अल्ट्रासाउंड और X-Ray जैसी सेवाएँ प्रदान करते हैं। मैं अभी आपकी मदद नहीं कर पा रहा हूँ, कृपया हमें +91 94609 91212 पर कॉल करें और हमारी टीम आपकी सहायता करेगी।";
      
    case "hinglish":
      return "Hello! Main Dr. Bhajan Sonography Centre se hoon. Hum MRI, CT Scan, Ultrasound aur X-Ray jaise services provide karte hain. Main abhi aapki help nahi kar pa raha hoon, please humein +91 94609 91212 par call karein aur hamari team aapki madad karegi.";
      
    default:
      return "Hello! I'm from Dr. Bhajan Sonography Centre. We provide services like MRI, CT Scan, Ultrasound and X-Ray. I'm unable to assist you right now, please call us at +91 94609 91212 and our team will help you.";
  }
}

// Hindi fallback responses for common queries
function getHindiFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("सिर") || lowerQuery.includes("सरदर्द") || lowerQuery.includes("sir") || lowerQuery.includes("sar")) {
    return "सिर दर्द के लिए आमतौर पर हम MRI ब्रेन की सलाह देते हैं। ये बहुत अच्छी तरह से दिखाता है कि क्या समस्या हो सकती है। आप डॉ. भजन लाल से एक बार सलाह ज़रूर लें। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।";
  }
  
  if (lowerQuery.includes("कमर") || lowerQuery.includes("पीठ") || lowerQuery.includes("kamar") || lowerQuery.includes("peeth")) {
    return "कमर दर्द के लिए सबसे अच्छा MRI स्पाइन होता है। इससे रीढ़ की हड्डी, डिस्क और नसों की अच्छी जांच हो जाती है। चिंता न करें, ये प्रक्रिया बिलकुल दर्द रहित है। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।";
  }
  
  if (lowerQuery.includes("पेट") || lowerQuery.includes("pet") || lowerQuery.includes("abdomen") || lowerQuery.includes("stomach")) {
    return "पेट की समस्या के लिए सबसे पहले अल्ट्रासाउंड करवाना अच्छा रहता है। ये जल्दी हो जाता है और इससे लीवर, किडनी, पित्ताशय आदि की अच्छी जांच हो जाती है। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।";
  }
  
  if (lowerQuery.includes("गर्भ") || lowerQuery.includes("प्रेगनेंसी") || lowerQuery.includes("pregnancy") || lowerQuery.includes("garbh")) {
    return "प्रेगनेंसी में अल्ट्रासाउंड सबसे अच्छा और सुरक्षित है! हमारे यहां 3D और 4D अल्ट्रासाउंड भी उपलब्ध है, जिससे आप अपने बच्चे को अच्छी तरह देख सकती हैं। चिंता न करें, ये बिलकुल सुरक्षित है। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।";
  }
  
  return "नमस्ते! आपके सवाल के लिए धन्यवाद। मैं डॉ. भजन सोनोग्राफी सेंटर से हूँ। हम MRI, CT स्कैन, अल्ट्रासाउंड और X-Ray जैसी सेवाएँ प्रदान करते हैं। अपनी समस्या के बारे में बताएं तो मैं आपको बेहतर जानकारी दे सकता हूँ। अपॉइंटमेंट के लिए +91 94609 91212 पर कॉल कर सकते हैं।";
}