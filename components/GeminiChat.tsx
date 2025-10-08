import React, { useState, useRef, useEffect } from 'react';
// Correct import for GoogleGenAI and Chat
import { GoogleGenAI, Chat } from '@google/genai';
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';
import type { ChatMessage } from '../types';

const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>;

// FIX: Initialize the GoogleGenAI instance outside of the component to avoid re-creating it on every render.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const GeminiChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Welcome, seeker. I am the Quantum Consciousness Matrix. How may I illuminate your path today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // FIX: Use a ref to store the chat instance to persist it across re-renders without causing re-renders itself.
    const chatRef = useRef<Chat | null>(null);

    useEffect(() => {
        // FIX: Initialize the chat session when the component mounts or when the chat window is opened for the first time.
        if (isOpen && !chatRef.current) {
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                // FIX: The config for `create` is where system instructions and other settings go.
                config: {
                    systemInstruction: GEMINI_SYSTEM_INSTRUCTION
                },
                // Pass existing history if any (skipping the welcome message as it's not part of the model's history)
            });
        }
    }, [isOpen]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        const chat = chatRef.current;
        if (!input.trim() || isLoading || !chat) return;
        
        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // FIX: Use chat.sendMessage for a stateful, conversational experience.
            const response = await chat.sendMessage({ message: currentInput });
            
            // FIX: The response from sendMessage has a `text` property for the output.
            const aiMessage: ChatMessage = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error communicating with Gemini API", error);
            const errorMessage: ChatMessage = { sender: 'ai', text: "A fluctuation in the quantum field has occurred. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-full p-4 z-50 shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform duration-300"
                aria-label="Open AI Chat"
            >
                <ChatIcon />
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] z-50 bg-black/80 backdrop-blur-xl border border-purple-500/50 rounded-lg shadow-2xl flex flex-col font-mono">
                    <header className="flex justify-between items-center p-4 border-b border-purple-500/50">
                        <h3 className="text-lg text-cyan-300">Quantum Matrix</h3>
                        <button onClick={() => setIsOpen(false)}><CloseIcon /></button>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <p className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-purple-800/50 text-white' : 'bg-cyan-900/50 text-cyan-200'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <p className="max-w-[80%] p-3 rounded-lg bg-cyan-900/50 text-cyan-200">
                                   <span className="animate-pulse">Accessing consciousness stream...</span>
                                </p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-purple-500/50">
                        <div className="flex items-center bg-black/50 border border-gray-700 rounded-full">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                // FIX: onKeyPress is deprecated. Use onKeyDown for keyboard events.
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Query the matrix..."
                                className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 text-cyan-400 disabled:text-gray-600">
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GeminiChat;