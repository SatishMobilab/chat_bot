// components/Chatbot.tsx
import { useState, useEffect } from 'react';
import "../globals.css";

interface Message {
    text: string;
    from: 'user' | 'bot';
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(1); // Start step at 1 to skip initial question
    const [isInitialMessage, setIsInitialMessage] = useState(true); // Track if it's the first message

    // Define the structured question flow
    const questionFlow = [
        "What is your name?",
        "How old are you?",
        "Where are you located?",
        "What symptoms are you feeling?",
        // Add more diagnostic or follow-up questions as needed
    ];

    // Function to get bot response based on the current step
    const getBotResponse = (): string => {
        if (step < questionFlow.length) {
            return questionFlow[step];
        } else {
            return "Thank you for your responses! If you need more assistance, let me know.";
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Send user message
        const userMessage: Message = { text: input, from: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Prepare bot's next message based on the current step
        const botResponse = getBotResponse();
        const botMessage: Message = { text: botResponse, from: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Advance to the next question step
        setStep((prevStep) => prevStep + 1);
        setInput(''); // Clear input field
    };

    // Set the first question on initial render
    useEffect(() => {
        if (isInitialMessage) {
            const initialBotMessage: Message = { text: questionFlow[0], from: 'bot' };
            setMessages([initialBotMessage]);
            setIsInitialMessage(false); // Ensure initial message is only set once
        }
    }, [isInitialMessage]);

    return (
        <div className="chat-container">
            <h1>Welcome to the Diagnostic Chatbot!</h1>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.from}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your answer..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
