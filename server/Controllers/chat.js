// controllers/openaiController.js
// const { Configuration, OpenAIApi } = require("openai");
const {OpenAI} = require("openai");
// const openai = new OpenAI.OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,  // Make sure your API key is stored securely in environment variables
// });
// const openai = new OpenAIApi(configuration);

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Set up parameters for ChatGPT request
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",  // or "gpt-4" if available to you
      messages: [{ role: "user", content: message }],
      max_tokens: 100,  // Adjust based on response length you need
    });

    // Send response back to the client
   return res.json({
      reply: response.data.choices[0].message.content,
    });
    // const params= {
    //     messages: [{ role: 'user', content: 'Say this is a test' }],
    //     model: 'gpt-3.5-turbo',
    //   };
    //   const chatCompletion = await openai.chat.completions.create(params);
    //   console.log(chatCompletion);
    //   return res.json({
    //     message:"TRUE"
    //   })
      
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    res.status(500).json({ error: `Error generating response` });
  }
};
