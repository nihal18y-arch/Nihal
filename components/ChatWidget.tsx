import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getAiResponse } from '../services/geminiService';
import { MessageCircleIcon, XIcon } from './Icons';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Muhammed's AI assistant. Feel free to ask me anything about his skills or projects." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAiResponse(userInput);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-700 transition-all transform hover:scale-110 z-50"
        aria-label="Toggle Chat"
      >
        {isOpen ? <XIcon className="w-8 h-8" /> : <MessageCircleIcon className="w-8 h-8" />}
      </button>

      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl z-50 transition-all duration-300 transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-stone-100 p-4 rounded-t-xl flex justify-between items-center border-b border-stone-200">
          <h3 className="text-stone-800 font-bold">AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-stone-800">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-96 p-4 overflow-y-auto bg-stone-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white rounded-br-none'
                    : 'bg-stone-200 text-stone-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-stone-200 text-stone-800 rounded-2xl rounded-bl-none p-2">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200">
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about my skills..."
              className="flex-grow bg-stone-100 text-stone-800 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={isLoading}
            />
            <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded-r-full hover:bg-amber-700 disabled:bg-amber-400 transition-colors" disabled={isLoading || !userInput.trim()}>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;