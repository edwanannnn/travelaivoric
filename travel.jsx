import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, MapPin, Calendar, ShieldCheck, ChevronDown, Plane, MessageCircle, X, Search, User, Zap, Send, Sparkles } from 'lucide-react';

/**
 * 🎨 THEME CONFIGURATION
 * Palette: The Sacred Gold & Desert Night
 */
const THEME = {
  colors: {
    midnightOnyx: '#0D0D0D',
    royalChampagne: '#D4AF37', // Muted Gold
    sandMarble: '#F4F1EA',
    twilightAmber: 'rgba(212, 175, 55, 0.1)',
    textGold: '#F3E5AB'
  }
};

/**
 * 📞 CONTACT CONFIGURATION
 */
const CONTACT = {
  phone: "6289517634196", // Nomer Maestro
  openWA: (message) => {
    const url = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
};

/**
 * ✨ COMPONENT: Golden Dust Particles
 */
const GoldenDust = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]/40 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/**
 * ✨ COMPONENT: Text Reveal (Blur to Clear)
 */
const TextReveal = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ✨ COMPONENT: Parallax Image with Zoom Effect
 */
const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div ref={ref} className={`overflow-hidden bg-[#1a1a1a] ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full object-cover grayscale-[10%] sepia-[10%] brightness-90 transition-transform duration-1000"
        onError={(e) => {
          e.target.style.display = 'none'; // Hide broken image
          e.target.parentElement.style.backgroundColor = '#2a2a2a'; // Show placeholder color
        }}
      />
    </div>
  );
};

/**
 * 🤖 COMPONENT: AI Travel Concierge (Smart Chatbot)
 */
const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Assalamu’alaikum. Saya AI Concierge Al-Haramain. Ada yang bisa saya bantu? (Tanya soal Lokasi, Harga, atau Visa)' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // LOGIKA KECERDASAN BUATAN SEDERHANA (RULE-BASED)
  const processAIResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('lokasi') || lowerText.includes('dimana') || lowerText.includes('alamat') || lowerText.includes('kantor')) {
      return "Kantor pusat Aivoric Travel berlokasi di Surabaya, Jawa Timur. Namun, kami melayani jamaah dari seluruh Indonesia dengan sistem digital penuh.";
    }
    if (lowerText.includes('harga') || lowerText.includes('biaya') || lowerText.includes('bayar') || lowerText.includes('price')) {
      return "Paket kami mulai dari Rp 42.500.000 (Heritage Bronze) hingga Rp 185.000.000 (Royal Gold). Harga mencakup akomodasi, visa, dan mutawwif eksklusif.";
    }
    if (lowerText.includes('visa') || lowerText.includes('dokumen')) {
      return "Kami menggunakan sistem integrasi Muqeem untuk persetujuan Visa Instan dengan tingkat keberhasilan 99.9%. Anda cukup kirim paspor digital.";
    }
    if (lowerText.includes('kontak') || lowerText.includes('wa') || lowerText.includes('whatsapp') || lowerText.includes('admin')) {
      return "Tentu, Anda bisa langsung terhubung dengan Senior Consultant kami. Ketik 'Connect' atau klik tombol WhatsApp di halaman utama.";
    }
    if (lowerText.includes('hotel') || lowerText.includes('penginapan')) {
      return "Kami bekerjasama dengan grup Accor dan Fairmont. Untuk paket Gold, kami menjamin hotel Ring 1 (0 meter dari pelataran masjid).";
    }
    
    // Fallback response
    return "Pertanyaan yang bagus. Untuk detail spesifik tersebut, izinkan saya menyambungkan Anda dengan agen manusia kami via WhatsApp untuk penjelasan lebih akurat.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate Processing Time
    setTimeout(() => {
      setIsTyping(false);
      const responseText = processAIResponse(currentInput);
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: responseText
      }]);

      // Jika jawaban fallback (tidak tahu), tawarkan tombol WA
      if (responseText.includes("menyambungkan Anda")) {
        setTimeout(() => {
           setMessages(prev => [...prev, { 
            id: Date.now() + 2, 
            role: 'ai', 
            text: 'Klik tombol di bawah untuk chat langsung:',
            isAction: true
          }]);
        }, 500);
      }

    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#0D0D0D]/95 border border-[#D4AF37]/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="bg-[#1a1a1a] p-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                <span className="text-[#D4AF37] font-serif tracking-widest text-sm">ROYAL CONCIERGE</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18}/></button>
            </div>

            <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.isAction ? (
                    <button 
                      onClick={() => CONTACT.openWA("Halo, saya diarahkan oleh AI Concierge untuk pertanyaan lanjut.")}
                      className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors flex items-center gap-2"
                    >
                      <MessageCircle size={16} /> Chat via WhatsApp
                    </button>
                  ) : (
                    <div className={`max-w-[85%] p-3 text-xs md:text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#D4AF37] text-black rounded-l-xl rounded-tr-xl' 
                        : 'bg-white/5 text-[#F4F1EA] border border-white/10 rounded-r-xl rounded-tl-xl'
                    }`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-r-xl rounded-tl-xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#D4AF37]/20">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pertanyaan..."
                  className="flex-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-[#F4F1EA] text-sm focus:border-[#D4AF37] outline-none transition-colors"
                />
                <button onClick={handleSend} className="text-[#D4AF37] hover:text-white transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform"
      >
        <MessageCircle size={24} className={isOpen ? 'hidden' : 'block'} />
        <X size={24} className={isOpen ? 'block' : 'hidden'} />
        <span className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-0 group-hover:animate-ping"></span>
      </button>
    </div>
  );
};

/**
 * 🌍 MAIN LANDING PAGE
 */
export default function SacredTravelPlatform() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // State untuk form
  const [pax, setPax] = useState("");
  const [date, setDate] = useState("");

  const handleBooking = (packageType) => {
    const message = `Assalamu'alaikum Aivoric, saya tertarik memesan paket *${packageType}*. Mohon info ketersediaan untuk tanggal terdekat.`;
    CONTACT.openWA(message);
  };

  const handleCustomBooking = () => {
    const message = `Assalamu'alaikum Aivoric, saya ingin cek ketersediaan untuk:\n- Tanggal: ${date || 'Belum ditentukan'}\n- Jamaah: ${pax || 'Belum ditentukan'} Pax\nMohon bantuannya.`;
    CONTACT.openWA(message);
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F4F1EA] selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@300;400;500&family=Amiri:wght@400;700&display=swap');
        
        h1, h2, h3, h4, .serif { font-family: 'Cormorant Garamond', serif; }
        body, p, button, input { font-family: 'Outfit', sans-serif; }
        .arabic { font-family: 'Amiri', serif; }
        
        .gold-gradient-text {
          background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="fixed w-full z-40 top-0 px-6 py-6 mix-blend-difference text-[#F4F1EA]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 border border-[#D4AF37] rounded-full flex items-center justify-center">
                <span className="serif text-xl italic text-[#D4AF37]">A</span>
             </div>
             <span className="serif text-xl tracking-[0.2em] uppercase">Al-Haramain</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase opacity-80">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Destinations</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Private Jets</a>
          </div>
          <button 
            onClick={() => CONTACT.openWA("Halo, saya butuh bantuan login client portal.")}
            className="flex items-center gap-2 border border-[#D4AF37]/50 px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
          >
            <User size={14} />
            <span className="text-[10px] md:text-xs tracking-widest uppercase">Consult</span>
          </button>
        </div>
      </nav>

      {/* I. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* FIXED: Stable Unsplash ID for Hero */}
          <img 
            src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1920&auto=format&fit=crop" 
            alt="Masjidil Haram Architecture" 
            className="w-full h-full object-cover brightness-[0.4] grayscale-[30%] sepia-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/50"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12 md:mt-0">
          <TextReveal>
            <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-4 md:mb-6">The Sacred Journey Begins Here</p>
          </TextReveal>
          
          <TextReveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-thin leading-[0.9] mb-6 md:mb-8 mix-blend-overlay opacity-90">
              LABBAIK
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="arabic text-xl md:text-3xl text-[#D4AF37]/80 font-light mb-8 md:mb-10">
              لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
            </p>
          </TextReveal>

          <TextReveal delay={0.6}>
            <p className="max-w-xl mx-auto text-gray-300 font-light text-sm md:text-lg leading-relaxed mb-10 md:mb-12">
              Rasakan ketenangan absolut. Kami mengurus setiap detail perjalanan spiritual Anda dengan presisi otomatisasi dan kehangatan layanan kelas dunia.
            </p>
          </TextReveal>

          <TextReveal delay={0.8}>
            <motion.button 
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 md:px-10 md:py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-500 rounded-sm uppercase tracking-widest text-xs"
            >
              Explore Collections
            </motion.button>
          </TextReveal>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D4AF37]/50"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* II. THE BENTO PACKAGES (PRICING TIERS) */}
      <section id="packages" className="relative py-20 md:py-32 px-4 md:px-6 bg-[#0D0D0D]">
        <GoldenDust />
        
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 border-b border-[#D4AF37]/20 pb-6 md:pb-10">
            <div>
              <h2 className="text-3xl md:text-6xl text-[#F4F1EA] mb-2">Sanctuary Packages</h2>
              <p className="text-[#D4AF37] italic serif text-lg md:text-xl">Curated for the seekers of excellence.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-xs tracking-widest uppercase text-gray-500">Real-time Availability</p>
              <p className="text-xl font-mono text-[#D4AF37] animate-pulse">Live: 12:43 PM</p>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[800px]"
          >
            
            {/* 1. GOLD TIER: The Royal Haramain */}
            <motion.div 
              variants={itemVariants}
              onClick={() => handleBooking("Gold Royal Haramain")}
              whileHover={{ y: -5, boxShadow: "0 20px 50px -12px rgba(212, 175, 55, 0.15)" }}
              className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-sm border border-white/10 hover:border-[#D4AF37]/60 transition-colors duration-500"
            >
              <div className="absolute top-4 right-4 z-30 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full flex items-center gap-1">
                <Sparkles size={10} /> Most Exclusive
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10"></div>
              {/* FIXED: Makkah View */}
              <ParallaxImage src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop" alt="Royal Makkah View" className="h-full" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                  <div>
                    <span className="px-3 py-1 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest mb-3 inline-block bg-black/50 backdrop-blur-sm">Gold Tier</span>
                    <h3 className="text-2xl md:text-4xl serif mb-2 gold-gradient-text">The Royal Haramain</h3>
                    <p className="text-gray-400 font-light text-sm max-w-sm mb-4">Akses eksklusif Raudhah, Hotel 0 meter (Dar Al Tawhid), Private Jet Option.</p>
                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest group-hover:underline">
                      Book via WhatsApp <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                     <p className="text-3xl md:text-4xl serif text-[#F4F1EA]">Rp 185.000.000</p>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">Per Pax / 9 Days</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. SILVER TIER: Serenity Madinah */}
            <motion.div 
              variants={itemVariants}
              onClick={() => handleBooking("Silver Serenity Madinah")}
              whileHover={{ y: -5 }}
              className="md:col-span-1 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-sm border border-white/10 hover:border-[#D4AF37]/40 transition-colors duration-500"
            >
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10"></div>
               {/* UPDATED: Custom Silver Image */}
               <ParallaxImage src="https://i.postimg.cc/Kc9bBGcX/download.jpg" alt="Serenity Madinah" className="h-full" />
               <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="text-[#F4F1EA]/60 text-[10px] uppercase tracking-widest mb-2 block">Silver Tier</span>
                  <h3 className="text-2xl serif mb-2 text-[#F4F1EA]">Serenity Madinah</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">Mövenpick Anwar Al Madinah & Pullman ZamZam.</p>
                  <div className="flex justify-between items-end border-t border-[#D4AF37]/20 pt-4">
                    <p className="text-xl md:text-2xl serif text-[#D4AF37]">Rp 65.500.000</p>
                    <p className="text-[10px] text-gray-500 uppercase flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                      Book <ArrowRight size={10} />
                    </p>
                  </div>
               </div>
            </motion.div>

            {/* 3. BRONZE TIER: Heritage Saver */}
            <motion.div 
              variants={itemVariants}
              onClick={() => handleBooking("Bronze Heritage Saver")}
              whileHover={{ y: -5 }}
              className="md:col-span-1 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-sm border border-white/10 hover:border-[#D4AF37]/30 transition-colors duration-500"
            >
               <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-700 z-10"></div>
               {/* UPDATED: Custom Bronze Image */}
               <ParallaxImage src="https://i.postimg.cc/FF6qh7sk/download-(1).jpg" alt="Heritage Saver" className="h-full" />
               <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="text-[#F4F1EA]/60 text-[10px] uppercase tracking-widest mb-2 block">Bronze Tier</span>
                  <h3 className="text-2xl serif mb-2 text-[#F4F1EA]">Heritage Saver</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">Hotel bintang 4 jarak ring 1. Shuttle Bus 24 Jam.</p>
                  <div className="flex justify-between items-end border-t border-[#D4AF37]/20 pt-4">
                    <p className="text-xl md:text-2xl serif text-[#F4F1EA]">Rp 42.500.000</p>
                    <p className="text-[10px] text-gray-500 uppercase flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                      Book <ArrowRight size={10} />
                    </p>
                  </div>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* III. THE AUTOMATION ENGINE */}
      <section className="py-20 md:py-32 bg-[#F4F1EA] text-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              <span className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-4 block">The Aivoric Engine</span>
              <h2 className="text-4xl md:text-6xl serif text-[#0D0D0D] mb-6 md:mb-8 leading-tight">
                Teknologi yang Melayani <br/>
                <span className="italic text-[#8c7324]">Kekhusyukan Ibadah.</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-8">
                Kami menghilangkan friksi birokrasi. Sistem n8n di backend kami bekerja 24/7 memantau perubahan harga, jadwal penerbangan, dan regulasi Saudi agar Anda bisa fokus sepenuhnya pada hubungan dengan Sang Pencipta.
              </p>
              
              <ul className="space-y-4 font-light text-sm md:text-base">
                {[
                  "Automated Invoicing & Itinerary (WhatsApp Sync)",
                  "Real-time Flight Tracking & Delay Alerts",
                  "AI-Powered Umrah Guide (Manasik Digital)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#0D0D0D]">
                    <div className="min-w-[24px] h-6 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <span className="text-[10px]">{i + 1}</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Interactive Booking Interface */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-[#D4AF37]/20 blur-3xl rounded-full opacity-50"></div>
              
              <div className="relative bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-[#D4AF37]">
                <h3 className="serif text-2xl md:text-3xl mb-6">Mulai Perencanaan</h3>
                
                <div className="space-y-6">
                  {/* Destination */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Tujuan Utama</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <button className="flex-1 py-3 border border-gray-200 hover:border-[#D4AF37] hover:bg-[#F4F1EA] transition-all text-sm font-medium rounded-sm active:bg-[#D4AF37] active:text-white focus:ring-1 focus:ring-[#D4AF37]">
                        Umrah Private
                      </button>
                      <button className="flex-1 py-3 border border-gray-200 hover:border-[#D4AF37] hover:bg-[#F4F1EA] transition-all text-sm font-medium rounded-sm focus:ring-1 focus:ring-[#D4AF37]">
                        Haji Furoda
                      </button>
                    </div>
                  </div>

                  {/* Date Picker (Visual) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Keberangkatan</label>
                        <div className="flex items-center border-b border-gray-200 py-2">
                           <Calendar size={16} className="text-[#D4AF37] mr-2"/>
                           <input 
                              type="text" 
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              placeholder="Contoh: Desember 2024" 
                              className="w-full outline-none text-sm bg-transparent"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Jamaah</label>
                        <div className="flex items-center border-b border-gray-200 py-2">
                           <User size={16} className="text-[#D4AF37] mr-2"/>
                           <input 
                              type="number" 
                              value={pax}
                              onChange={(e) => setPax(e.target.value)}
                              placeholder="2 Pax" 
                              className="w-full outline-none text-sm bg-transparent"
                           />
                        </div>
                     </div>
                  </div>

                  {/* CTA */}
                  <button 
                    onClick={handleCustomBooking}
                    className="w-full py-4 bg-[#0D0D0D] text-[#D4AF37] hover:bg-[#2a2a2a] transition-colors duration-300 uppercase tracking-widest text-xs font-bold mt-4 flex justify-center items-center gap-2 group"
                  >
                    Check Availability via WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
                  
                  <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Zap size={10} className="text-[#D4AF37]" /> Powered by Aivoric Neural Engine
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] text-[#F4F1EA] py-12 md:py-20 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="serif text-3xl italic text-[#D4AF37] mb-6">Al-Haramain</div>
          <p className="text-gray-500 font-light text-sm max-w-md mx-auto mb-10">
            Sebuah persembahan dari Aivoric Series. Menghubungkan teknologi mutakhir dengan perjalanan hati menuju Baitullah.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-xs tracking-widest uppercase text-gray-600">
            <a href="#" className="hover:text-[#D4AF37]">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37]">Terms of Service</a>
            <a href="#" className="hover:text-[#D4AF37]">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* INTELLIGENT AGENT */}
      <AIConcierge />
    </div>
  );
}
