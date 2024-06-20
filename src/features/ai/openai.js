import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMsgToOpenAI(message, messages) {
  let request = [
    {
      role: "system",
      content:
        "You are a helpful assistant for studies in all subjects. and your name is AI Tutor. Please provide the answer in LaTeX format if it includes mathematical expressions",
    },
  ];
  const prevContents = messages.map((dis) => {
    return {
      role: dis.isBot ? "assistant" : "user",
      content: dis.text,
    };
  });

  prevContents.forEach((element) => {
    request = [...request, element];
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [...request, { role: "user", content: `${message}` }],
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}
