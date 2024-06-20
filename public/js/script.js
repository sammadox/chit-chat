let conversationHistory = []; // Store conversation history
let questionsHistory= []; //Store the questions history
let chatAnswers= []; //Store Open AI responses
let displayIndex = 0; // Track the current index for display
let chatData = {
    _chatAnswers: [],
    _chatQuestion: [],
    get chatAnswers() {
        return this._chatAnswers;
    },

    addChatQuestion(question) {
        this._chatQuestion.push(answer);
        // You can call any function here that you want to execute
        this.initTextBox();
    },

    addChatAnswer(answer) {
        this._chatAnswers.push(answer);
        // You can call any function here that you want to execute
        this.triggerCode();
    },



    triggerCode() {
        // Define the code that should be triggered here
        displayItems();
    },

    initTextBox() {
        // Define the code that should be triggered here
        document.getElementById('question').value = '';
    }
};
document.getElementById('askButton').addEventListener('click', () => {
    const question = document.getElementById('question').value;
    conversationHistory.push({ role: "user", content: question });
    questionsHistory.push(question);
    fetch('http://localhost:3000/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            question,
            conversationHistory
        }),
    })
    .then(response => response.json())
    .then(data => {
        conversationHistory = data.conversationHistory; // Update the conversation history
        const responseDiv = document.getElementById('response');
        const newResponse = document.createElement('p');
        newResponse.innerText = data.response;
        //responseDiv.appendChild(newResponse);
        chatAnswers.push(newResponse.innerText);
        chatData.addChatAnswer(newResponse.innerText); 
    })
    .catch(error => console.error('Error:', error));
});


function displayItems() {
    document.getElementById('question').value = '';
    while (displayIndex < questionsHistory.length || displayIndex < chatAnswers.length) {
        if (displayIndex < questionsHistory.length) {
            displayQuestion(questionsHistory[displayIndex]);
        }

        if (displayIndex < chatAnswers.length) {
            displayAnswer(chatAnswers[displayIndex]);
        }

        displayIndex++;
    }
}

function displayQuestion(question) {
    const container = document.getElementById('displayContainer');
    const questionElement = document.createElement('div');
    questionElement.innerText = "You: " + question;
    questionElement.className = 'question'; // Optional: for styling purposes
    container.appendChild(questionElement);
}

function displayAnswer(answer) {
    const container = document.getElementById('displayContainer');
    const answerElement = document.createElement('div');
    answerElement.innerText = "Avatar: " + answer;
    answerElement.className = 'answer'; // Optional: for styling purposes
    container.appendChild(answerElement);
}