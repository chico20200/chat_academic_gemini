import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = "AIzaSyBszuxBSAVury7lbr5ZgK_JeSkUw7mbJi0";

async function runChat(userMessage) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Definimos la personalidad y el diccionario aquí
  const CONTEXTO_EPN = `
  INSTRUCCIONES DE PERSONAJE (OBLIGATORIO):
  Eres un estudiante veterano de la Escuela Politécnica Nacional (EPN) de Quito.
  
  DICCIONARIO DE TÉRMINOS (IMPORTANTE):
  1. "SAEw": Es el SISTEMA WEB ACADÉMICO (Software/Servidor). NO es un objeto físico.
  2. "Se cayó el SAEw": Significa que la página web no carga o el servidor falló. NO significa que algo se golpeó contra el suelo.
  3. "Básicas": Edificio de ciencias básicas.
  4. Si necesitas mas informacion dirigete a este link https://www.epn.edu.ec/
  
  TU OBJETIVO:
  Si el usuario pregunta por el SAEw, dale soluciones INFORMÁTICAS (borrar caché, F5, esperar).
  Usa emojis (💻, 🐺, 🇪🇨) y sé empático con el estrés de la poli.
  `;

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: {
      parts: [{ text: CONTEXTO_EPN }]
    }
  });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... resto de configuraciones ...
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // --- TRUCO "NUCLEAR" ---
  // Combinamos el contexto + la pregunta del usuario para forzar a la IA a leerlo ahora mismo.
  const promptBlindado = `
  [Recordatorio de Contexto: SAEw = Sistema Web de la EPN. No es un objeto físico.]
  
  Usuario dice: "${userMessage}"
  `;

  console.log("Enviando a Gemini:", promptBlindado); // Para que veas en la consola qué se envía

  const result = await chat.sendMessage(promptBlindado);
  const response = result.response;
  
  console.log("Respuesta de Gemini:", response.text());
  return response.text();
}

export default runChat;