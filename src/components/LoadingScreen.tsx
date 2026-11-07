import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLASS_12A5_MEMBERS } from '../data/cuchiData';

interface LoadingScreenProps {
  onComplete: () => void;
  autostart?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, autostart = false }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (autostart) {
      onComplete();
      return;
    }

    // Check if user already saw the loader in this session
    const hasVisited = sessionStorage.getItem('cuchi_visited');
    const intervalTime = hasVisited ? 25 : 40;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          sessionStorage.setItem('cuchi_visited', 'true');
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [autostart, onComplete]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#243D2B] text-[#FAF6ED] px-4 py-8 md:py-12 overflow-hidden select-none">
        {/* Background Vintage Texture & Subtle Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter sepia contrast-125 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#243D2B]/90 via-[#243D2B]/80 to-[#243D2B] pointer-events-none" />

        {/* Vintage Top Header */}
        <header className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b border-[#FAF6ED]/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C76B45]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#FAF6ED]/80 font-mono">
              Niên khóa 2026 — 2027 · TP. Hồ Chí Minh
            </span>
          </div>
          <button
            onClick={onComplete}
            className="text-xs uppercase tracking-wider font-mono text-[#FAF6ED]/70 hover:text-[#FAF6ED] transition-colors flex items-center gap-1.5 px-3 py-1 border border-[#FAF6ED]/30 rounded hover:border-[#FAF6ED]"
            aria-label="Bỏ qua màn hình chờ"
          >
            Vào ngay <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* Center Poster Title & Typography */}
        <main className="relative z-10 max-w-3xl text-center my-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-[#617A50] bg-[#243D2B]/80 text-[#FAF6ED]/90 text-xs tracking-widest uppercase font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C76B45]" />
            Ấn phẩm số hóa lịch sử & văn hóa địa phương
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading tracking-wider text-[#FAF6ED] leading-none mb-3 drop-shadow-md whitespace-nowrap">
            AN NHƠN TÂY
          </h1>

          <div className="text-xl md:text-2xl font-editorial italic tracking-wide text-[#FAF6ED]/90 mb-4">
            Vùng Đất Anh Hùng · Sắc Màu Văn Hóa
          </div>

          <p className="max-w-xl text-sm md:text-base text-[#FAF6ED]/75 leading-relaxed font-body mb-8">
            Dự án nghiên cứu, số hóa dữ liệu lịch sử, văn hóa, con người, ẩm thực và bản đồ tương tác xã An Nhơn Tây — Thành phố Hồ Chí Minh.
          </p>

          {/* Progress Bar & Percentage */}
          <div className="w-full max-w-md bg-[#FAF6ED]/10 border border-[#FAF6ED]/20 p-1.5 rounded-lg mb-4">
            <div className="h-2 w-full bg-[#FAF6ED]/20 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#617A50] via-[#C76B45] to-[#FAF6ED]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-[#FAF6ED]/80 mt-2 px-1">
              <span>Đang đồng bộ dữ liệu lịch sử...</span>
              <span className="font-bold text-[#C76B45]">{progress}%</span>
            </div>
          </div>
        </main>

        {/* Bottom Credits: Class 12A5 & 5 Members */}
        <footer className="relative z-10 w-full max-w-4xl border-t border-[#FAF6ED]/20 pt-5">
          <div className="text-center mb-3">
            <span className="text-xs uppercase tracking-[0.2em] font-heading text-[#C76B45] bg-[#FAF6ED] px-3 py-0.5 rounded text-[#243D2B] font-bold">
              THỰC HIỆN BỞI TẬP THỂ HỌC SINH LỚP 12A5
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
            {CLASS_12A5_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-[#243D2B]/90 border border-[#617A50]/40 p-2 rounded hover:border-[#C76B45]/70 transition-all"
              >
                <div className="text-xs text-[#FAF6ED]/50 font-mono">0{member.id}</div>
                <div className="text-sm font-semibold text-[#FAF6ED] truncate">{member.name}</div>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
};
