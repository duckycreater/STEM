import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, ImagePlus, Mic, MicOff, Volume2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Groq from 'groq-sdk';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Chào bạn! Tôi là trợ lý nông nghiệp AI. Bạn cần tư vấn về thời tiết, kỹ thuật trồng trọt, giá cả nông sản hay phân tích ảnh cây trồng?' }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'vi-VN';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, selectedImage]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMsg = input.trim();
    const imageToSend = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: imageToSend || undefined }]);
    setLoading(true);

    try {
      const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });
      
      const groqMessages: any[] = [
        {
          role: 'system',
          content: "Bạn là một kỹ sư nông nghiệp xuất sắc, luôn trả lời ngắn gọn, thân thiện, dễ hiểu cho nông dân Việt Nam. Sử dụng markdown để định dạng. Nếu người dùng gửi ảnh, hãy phân tích ảnh đó chi tiết."
        }
      ];
      
      messages.forEach(m => {
        groqMessages.push({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.text
        });
      });
      
      if (imageToSend) {
        groqMessages.push({
          role: 'user',
          content: [
            { type: 'text', text: userMsg || 'Hãy phân tích ảnh này' },
            { type: 'image_url', image_url: { url: imageToSend } }
          ]
        });
      } else {
        groqMessages.push({
          role: 'user',
          content: userMsg || 'Xin chào'
        });
      }

      const response = await groq.chat.completions.create({
        messages: groqMessages,
        model: imageToSend ? 'llama-3.2-11b-vision-preview' : 'llama-3.3-70b-versatile',
      });

      const reply = response.choices[0]?.message?.content;

      if (reply) {
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-40 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] max-w-sm h-[550px] max-h-[75vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Trợ lý Nông nghiệp AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-[10px] text-emerald-100">Đang hoạt động</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    msg.role === 'user' ? "bg-emerald-100 text-emerald-700" : "bg-white border border-gray-200 text-emerald-600"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm flex flex-col gap-2",
                    msg.role === 'user' 
                      ? "bg-emerald-600 text-white rounded-tr-none" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  )}>
                    {msg.image && (
                      <img src={msg.image} alt="Uploaded" className="w-full max-w-[200px] rounded-xl object-cover" />
                    )}
                    {msg.text && (
                      msg.role === 'user' ? (
                        <span>{msg.text}</span>
                      ) : (
                        <div className="relative group">
                          <div className="prose prose-sm prose-emerald max-w-none">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                          <button 
                            onClick={() => speak(msg.text)}
                            className="absolute -right-10 top-0 p-1.5 text-gray-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full shadow-sm border border-gray-100"
                            title="Đọc văn bản"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 bg-white border border-gray-200 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                    <span className="text-xs text-gray-500">Đang phân tích...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Image Preview Area */}
            {selectedImage && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                <div className="relative">
                  <img src={selectedImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-1 pl-2 pr-1">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
                  title="Tải ảnh lên"
                >
                  <ImagePlus size={20} />
                </button>
                <button 
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
                  title="Chụp ảnh"
                >
                  <Camera size={20} />
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  ref={cameraInputRef}
                  onChange={handleImageSelect}
                />
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Đang nghe..." : "Nhập tin nhắn..."}
                  className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-2 text-sm outline-none"
                />
                
                {recognitionRef.current && (
                  <button 
                    onClick={toggleListening}
                    className={cn(
                      "p-2 transition-colors shrink-0 rounded-full",
                      isListening ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-emerald-600"
                    )}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                )}

                <button
                  onClick={handleSend}
                  disabled={(!input.trim() && !selectedImage) || loading}
                  className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shrink-0 ml-1 shadow-sm"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
