import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, ImagePlus, Mic, MicOff, Volume2, Camera, WifiOff, Sparkles, Leaf, CloudSun, TrendingUp, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { t, getLanguage, type Language } from '../lib/i18n';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: getLanguage() === 'vi'
      ? '👋 Xin chào! Tôi là **Trợ lý Nông nghiệp AI**. Tôi có thể giúp bạn:\n\n🌿 Chẩn đoán bệnh cây trồng\n🌤️ Dự báo thời tiết & mẹo canh tác\n📊 Giá nông sản\n📸 Phân tích hình ảnh\n\nTôi có thể giúp gì cho bạn hôm nay?'
      : '👋 Hello! I\'m your **AI Agriculture Assistant**. I can help with:\n\n🌿 Plant disease diagnosis\n🌤️ Weather & farming tips\n📊 Crop price info\n📸 Image analysis\n\nHow can I assist you today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLang] = useState<Language>(getLanguage());

  const handleLanguageChange = (lang: Language) => {
    setLang(lang);
    document.documentElement.lang = lang;
    // Reset chat with new language welcome message
    setMessages([{
      role: 'model',
      text: lang === 'vi'
        ? '👋 Xin chào! Tôi là **Trợ lý Nông nghiệp AI**. Tôi có thể giúp bạn:\n\n🌿 Chẩn đoán bệnh cây trồng\n🌤️ Dự báo thời tiết & mẹo canh tác\n📊 Giá nông sản\n📸 Phân tích hình ảnh\n\nTôi có thể giúp gì cho bạn hôm nay?'
        : '👋 Hello! I\'m your **AI Agriculture Assistant**. I can help with:\n\n🌿 Plant disease diagnosis\n🌤️ Weather & farming tips\n📊 Crop price info\n📸 Image analysis\n\nHow can I assist you today?',
      timestamp: Date.now()
    }]);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'vi' ? 'vi-VN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [language]);

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
      const clean = text.replace(/[*#_~`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      utterance.volume = 1;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, loading, selectedImage]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result as string);
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error processing image:", err);
      }
    }
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMsg = input.trim();
    const imageToSend = selectedImage;

    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: imageToSend || undefined, timestamp: Date.now() }]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('messages', JSON.stringify(messages.map(m => ({ role: m.role, text: m.text }))));
      if (imageToSend) {
        const blob = await fetch(imageToSend).then(r => r.blob());
        formData.append('image', blob);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Chat failed');

      setMessages(prev => [...prev, { role: 'model', text: data.data.reply, timestamp: Date.now() }]);

    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: language === 'vi' ? '⚠️ Lỗi kết nối. Vui lòng thử lại.' : '⚠️ Connection error. Please try again.',
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:shadow-xl transition-all z-40 focus:outline-none active:scale-90"
          >
            <MessageSquare size={22} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
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
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] max-w-sm h-[550px] max-h-[75vh] bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t('chat.title')}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-[10px] text-emerald-200 font-medium">
                      {language === 'vi' ? 'Trực tuyến • Groq LLM' : 'Online • Groq LLM'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-white/15 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  <Globe size={10} className="text-emerald-200" />
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as Language)}
                    className="bg-transparent text-[10px] font-semibold text-emerald-200 focus:outline-none cursor-pointer"
                  >
                    <option value="vi" className="text-gray-900">VI</option>
                    <option value="en" className="text-gray-900">EN</option>
                  </select>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/15 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <QuickAction icon={<Leaf size={12} />} label={t('chat.quickActions.diagnose')} onClick={() => handleQuickAction(language === 'vi' ? 'Làm thế nào để chẩn đoán lá vàng trên cây lúa?' : 'How to diagnose yellow leaves on my rice plant?')} />
                <QuickAction icon={<CloudSun size={12} />} label={t('chat.quickActions.weather')} onClick={() => handleQuickAction(language === 'vi' ? 'Mẹo canh tác cho mùa mưa?' : 'What farming tips for rainy season?')} />
                <QuickAction icon={<TrendingUp size={12} />} label={t('chat.quickActions.price')} onClick={() => handleQuickAction(language === 'vi' ? 'Giá cà phê hiện tại?' : 'What is the current coffee price?')} />
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/30">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn("flex gap-2 max-w-[88%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-xs",
                    msg.role === 'user'
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-emerald-600 dark:text-emerald-400"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm flex flex-col gap-2",
                    msg.role === 'user'
                      ? "bg-emerald-600 text-white rounded-tr-md"
                      : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-tl-md"
                  )}>
                    {msg.image && (
                      <img src={msg.image} alt="Uploaded" className="w-full max-w-[200px] rounded-xl object-cover" />
                    )}
                    {msg.text && (
                      msg.role === 'user' ? (
                        <span>{msg.text}</span>
                      ) : (
                        <div className="relative group">
                          <div className="prose prose-sm prose-emerald dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                          <button
                            onClick={() => speak(msg.text)}
                            className="absolute -right-8 top-0 p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                            title={language === 'vi' ? 'Đọc to' : 'Read aloud'}
                          >
                            <Volume2 size={12} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2 max-w-[88%]">
                  <div className="w-7 h-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <Bot size={14} />
                  </div>
                  <div className="p-3.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-md shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{ animation: 'typing-dot 1.2s ease-in-out infinite' }} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{ animation: 'typing-dot 1.2s ease-in-out 0.2s infinite' }} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" style={{ animation: 'typing-dot 1.2s ease-in-out 0.4s infinite' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Image Preview */}
            {selectedImage && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <div className="relative">
                  <img src={selectedImage} alt="Preview" className="w-12 h-12 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
                  >
                    <X size={10} />
                  </button>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('chat.imageAttached')}</span>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-1 pl-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
                >
                  <ImagePlus size={18} />
                </button>
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
                >
                  <Camera size={18} />
                </button>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
                <input type="file" accept="image/*" capture="environment" className="hidden" ref={cameraInputRef} onChange={handleImageSelect} />

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'vi' ? 'Hỏi tôi bất cứ điều gì về nông nghiệp...' : 'Ask me anything...'}
                  className="flex-1 bg-transparent border-none focus:ring-0 px-1.5 py-2 text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />

                {recognitionRef.current && (
                  <button
                    onClick={toggleListening}
                    className={cn(
                      "p-2 transition-colors shrink-0 rounded-xl",
                      isListening ? "text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse" : "text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                    )}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                )}

                <button
                  onClick={handleSend}
                  disabled={(!input.trim() && !selectedImage) || loading}
                  className="w-9 h-9 bg-emerald-600 dark:bg-emerald-700 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-40 transition-all shrink-0 shadow-sm active:scale-90"
                >
                  <Send size={15} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors shrink-0"
    >
      {icon}
      {label}
    </button>
  );
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  timestamp?: number;
}
