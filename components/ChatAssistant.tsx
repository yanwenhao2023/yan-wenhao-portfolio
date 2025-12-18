import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "你好！我是颜文豪的智能助手。你可以问我关于他的工作经历、技能或项目经验。" }] }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', parts: [{ text: inputValue }] };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Pass history excluding the latest user message which we just added locally for UI
      // Ideally we pass the full history to the service
      const responseText = await sendMessageToGemini(userMsg.parts[0].text, messages);
      
      const aiMsg: Message = { role: 'model', parts: [{ text: responseText || "No response." }] };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "抱歉，出了一点小问题，请稍后再试。" }] }]);
    } finally {
      setIsLoading(false);
    }
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
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[400px] mb-4 overflow-hidden transition-all duration-300 origin-bottom-right border border-gray-100 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none h-0 mb-0"
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">颜文豪的AI助手</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span className="text-xs text-slate-400">思考中...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="问问我的经历..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-700"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white group-hover:animate-bounce" />
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
