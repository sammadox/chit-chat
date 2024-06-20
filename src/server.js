const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const app = express();

const openai = new OpenAI({ apiKey: '' }); // Ensure you have set up your API key correctly

app.use(cors());
app.use(express.json());

app.post('/get-response', async (req, res) => {
    try {
        const messages = req.body.conversationHistory; // Array of message objects
        messages.push({ role: "user", content: req.body.question });

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4",
        });

        res.json({ 
            response: completion.choices[0].message.content,
            conversationHistory: messages // Return the updated conversation history
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
