import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: "Hi! I'm Samuel's AI Assistant. Ask me anything about his experience at Elunic, Divoorah, or his tech stack!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const historyForAi = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await generateChatResponse(userMessage.text, historyForAi);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[500px] bg-secondary border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-slide-up">
          {/* Header */}
          <div className="bg-primary p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2 text-heading font-medium">
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Sparkles size={16} className="text-accent" />
              </div>
              <span>Ask AI about Samuel</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-heading transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary/50"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 border border-accent/20">
                    <Bot size={14} className="text-accent" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-sm font-medium' 
                      : 'bg-primary text-body rounded-tl-sm border border-border shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-primary border border-border rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-muted" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                    <Bot size={14} className="text-accent" />
                  </div>
                  <div className="bg-primary px-4 py-3 rounded-2xl rounded-tl-sm border border-border flex items-center gap-1 shadow-sm">
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-150"></div>
                  </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-secondary border-t border-border">
            <div className="flex items-center gap-2 bg-primary rounded-xl px-4 py-2 border border-border focus-within:border-accent transition-colors shadow-inner">
              <input
                type="text"
                placeholder="Ask about his projects..."
                className="flex-1 bg-transparent text-body text-sm outline-none placeholder:text-muted"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-accent hover:text-heading disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-muted mt-2">
              Powered by Google Gemini 2.5 Flash
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 h-14 px-6 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105 ${
          isOpen ? 'bg-heading text-primary' : 'bg-accent text-white'
        }`}
      >
        {isOpen ? (
          <>
            <X size={24} />
            <span className="font-bold">Close</span>
          </>
        ) : (
          <>
            <MessageSquare size={24} className="animate-pulse" />
            <span className="font-bold">Ask AI Assistant</span>
          </>
        )}
      </button>
    </div>
  );
};