import React, { useState, useEffect, useRef } from "react";
import {
  Compass, MapPin, ArrowUpRight, ShieldCheck, Sparkles, ExternalLink,
} from "lucide-react";

interface HeroProps {
  onHistory: () => void;
  onCulture: () => void;
  onCuisine: () => void;
  triggerAnimation?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onHistory, onCulture, onCuisine, triggerAnimation = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (triggerAnimation) {
      // 1. Chớp sáng
      setIsFlashing(true);
      const flashTimer = setTimeout(() => setIsFlashing(false), 150);

      // 2. Chữ bay vào
      const mountTimer = setTimeout(() => {
        setIsMounted(true);
      }, 100);

      // 3. Thẻ ảnh: Xếp chồng -> Đợi 1.2s -> Bung ra chậm rãi
      const cardTimer = setTimeout(() => {
        const cards = cardsRef.current;
        if (!cards || cards.length === 0) return;

        cards.forEach((card, i) => {
          if (!card) return;
          
          // 1. Đặt trạng thái ban đầu: Xếp chồng ở giữa, hơi nhỏ lại
          card.style.opacity = '1';
          card.style.transform = `translate(-50%, -50%) scale(0.85)`;
          card.style.zIndex = `${i}`;

          // 2. Khoảng cách đẩy ra: -350px (trái), 0px (giữa), +350px (phải)
          const offset = (i - 1) * 350;

          // 3. Chạy hiệu ứng bung ra chậm rãi
          card.animate([
            // Bắt đầu: Xếp chồng
            { transform: `translate(-50%, -50%) scale(0.85)`, opacity: 1 },
            // Giữa chừng (70% thời gian): Đẩy hơi quá đà một chút để tạo độ nảy
            { transform: `translate(calc(-50% + ${offset * 1.05}px), -50%) scale(1.05)`, opacity: 1, offset: 0.7 },
            // Kết thúc: Về đúng vị trí
            { transform: `translate(calc(-50% + ${offset}px), -50%) scale(1)`, opacity: 1 } 
          ], {
            duration: 1500, // Thời gian bung ra: 1.5 giây
            delay: 1200 + (i * 150), // ĐỢI 1.2s mới bắt đầu bung, và so le nhau 0.15s
            easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)', // Hiệu ứng nảy nhẹ ở cuối
            fill: 'forwards'
          });
        });
      }, 1800); // Đợi 1.8s kể từ khi vào trang

      return () => {
        clearTimeout(flashTimer);
        clearTimeout(mountTimer);
        clearTimeout(cardTimer);
      };
    }
  }, [triggerAnimation]);

  return (
    <>
      <style>{`
        @keyframes travelFromRight {
            0%   { opacity: 0; transform: translateX(600px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes travelFromBottom {
            0%   { opacity: 0; transform: translateY(500px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes travelFromLeft {
            0%   { opacity: 0; transform: translateX(-600px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes travelFromTop {
            0%   { opacity: 0; transform: translateY(-400px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .is-mounted .anim-sub { animation: travelFromRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .is-mounted .anim-title { animation: travelFromBottom 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        .is-mounted .anim-desc { animation: travelFromLeft 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .is-mounted .anim-stats { animation: travelFromTop 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }

        .flash-active { animation: flashPulse 0.15s ease-out; }
        @keyframes flashPulse {
            0% { opacity: 0.4; }
            100% { opacity: 0; }
        }
      `}</style>

      <div className={`fixed inset-0 bg-white pointer-events-none z-[100] opacity-0 ${isFlashing ? 'flash-active' : ''}`} />

      <section className={`relative w-full text-[#FAF6ED] overflow-hidden ${isMounted ? 'is-mounted' : ''}`}>
        
        <div className="absolute inset-0 w-full h-full">
          <video className="w-full h-full object-cover opacity-80" autoPlay muted loop playsInline>
            <source src="/annhontay/assets/aistudio/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#243D2B]/90 via-[#243D2B]/30 to-[#F2E8D5]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20 lg:py-24">
          
          <div className="flex flex-col items-center justify-center text-center mb-4 w-full">
            <div className="inline-flex flex-col items-center justify-center">
              <div className="anim-sub inline-block mx-auto px-4 py-1.5 bg-[#008000] rounded-lg text-center text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#FAF6ED]/90 font-semibold mb-4 shadow-sm">
                DI TÍCH QUỐC GIA ĐẶC BIỆT
              </div>
              
              <h1
                style={{ fontFamily: "Verdana, 'Be Vietnam Pro', 'Oswald', sans-serif" }}
                className="anim-title text-7xl sm:text-8xl md:text-9xl text-center font-bold tracking-tight text-white leading-none mb-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              >
                AN NHƠN TÂY
              </h1>
              <div className="anim-sub text-center text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#FAF6ED] font-bold mb-6 drop-shadow-md">
                DẤU ẤN LỊCH SỬ · SẮC MÀU VĂN HÓA
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            <div className="lg:col-start-3 lg:col-span-8 space-y-6">
              <p className="anim-desc font-body text-base md:text-lg text-white/95 leading-relaxed text-center drop-shadow-md">
                Nằm ở cửa ngõ Tây Bắc Thành phố Hồ Chí Minh, An Nhơn Tây là bản trường
                ca bất tử của lòng dũng cảm với mạng lưới địa đạo dài hơn 250km
                xuyên lòng đất, đền tưởng niệm linh thiêng bên bờ sông Sài Gòn,
                làng nghề bánh tráng trăm năm và những vườn cây trái trĩu ngọt phù
                sa.
              </p>
            </div>
          </div>

          {/* KHỐI THỐNG KÊ HERO BANNER - GLASSMORPHISM 4 CỘT CĂN GIỮA */}
          <div className="anim-stats w-full max-w-6xl mx-auto mb-14 bg-[#243D2B]/45 hover:bg-[#243D2B]/55 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/20">
              
              {/* CỘT 1 – VÙNG ĐẤT LỊCH SỬ */}
              <div className="flex flex-col justify-between text-center lg:px-4 space-y-1.5">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#D9A85B] font-bold block whitespace-nowrap">
                    VÙNG ĐẤT AN NHƠN TÂY
                  </span>
                  <div className="font-heading text-lg sm:text-xl lg:text-[18px] xl:text-xl font-extrabold text-white tracking-wide uppercase mt-1 drop-shadow-md whitespace-nowrap">
                    ANH HÙNG
                  </div>
                </div>
                <p className="text-xs text-[#FAF6ED]/80 font-body leading-relaxed pt-1">
                  Vùng đất giàu truyền thống cách mạng.
                </p>
              </div>

              {/* CỘT 2 – DI TÍCH LỊCH SỬ */}
              <div className="flex flex-col justify-between text-center lg:px-4 space-y-1.5">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#D9A85B] font-bold block whitespace-nowrap">
                    DI TÍCH LỊCH SỬ
                  </span>
                  <div className="font-heading text-lg sm:text-xl lg:text-[18px] xl:text-xl font-extrabold text-white tracking-wide uppercase mt-1 drop-shadow-md whitespace-nowrap">
                    ĐỊA ĐẠO CỦ CHI
                  </div>
                </div>
                <p className="text-xs text-[#FAF6ED]/80 font-body leading-relaxed pt-1">
                  Di sản lịch sử gắn liền với vùng đất thép thành đồng.
                </p>
              </div>

              {/* CỘT 3 – GIÁ TRỊ VĂN HÓA */}
              <div className="flex flex-col justify-between text-center lg:px-4 space-y-1.5">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#D9A85B] font-bold block whitespace-nowrap">
                    BẢN SẮC VĂN HÓA
                  </span>
                  <div className="font-heading text-lg sm:text-xl lg:text-[18px] xl:text-xl font-extrabold text-white tracking-wide uppercase mt-1 drop-shadow-md whitespace-nowrap">
                    TRUYỀN THỐNG
                  </div>
                </div>
                <p className="text-xs text-[#FAF6ED]/80 font-body leading-relaxed pt-1">
                  Gìn giữ và phát huy những giá trị văn hóa địa phương.
                </p>
              </div>

              {/* CỘT 4 – DANH HIỆU CAO QUÝ */}
              <div className="flex flex-col justify-between text-center lg:px-4 space-y-1.5">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#D9A85B] font-bold block whitespace-nowrap">
                    DANH HIỆU CAO QUÝ
                  </span>
                  <div className="font-heading text-base sm:text-lg lg:text-[16px] xl:text-[18px] font-extrabold text-white tracking-wide uppercase mt-1 drop-shadow-md whitespace-nowrap">
                    ĐẤT THÉP THÀNH ĐỒNG
                  </div>
                </div>
                <p className="text-xs text-[#FAF6ED]/80 font-body leading-relaxed pt-1">
                  Niềm tự hào về truyền thống đấu tranh cách mạng.
                </p>
              </div>

            </div>
          </div>

          {/* KHU VỰC 3 THẺ ẢNH - Chuyển thành Relative/Absolute để xếp chồng */}
          <div className="relative w-full h-72 md:h-80 flex justify-center items-center">
            
            {/* Thẻ 1 */}
            <div
              ref={(el) => { if (el) cardsRef.current[0] = el; }}
              onClick={() => onHistory()}
              className="absolute top-1/2 left-1/2 opacity-0 group cursor-pointer w-[280px] h-[340px] rounded-2xl overflow-hidden flex flex-col justify-between bg-[url('/annhontay/assets/aistudio/hero_img/lsdt.jpg')] bg-cover bg-center transition-all duration-300 hover:scale-105 border border-white/30 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300 group-hover:from-[#243D2B]/90" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Lịch sử & Di tích</h3>
                <p className="text-sm text-white/90">Tìm hiểu các mốc son lịch sử hào hùng</p>
              </div>
            </div>

            {/* Thẻ 2 */}
            <div
              ref={(el) => { if (el) cardsRef.current[1] = el; }}
              onClick={() => onCulture()}
              className="absolute top-1/2 left-1/2 opacity-0 group cursor-pointer w-[280px] h-[340px] rounded-2xl overflow-hidden flex flex-col justify-between bg-[url('/annhontay/assets/aistudio/hero_img/vhln.jpg')] bg-cover bg-center transition-all duration-300 hover:scale-105 border border-white/30 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300 group-hover:from-[#243D2B]/90" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Văn hóa & Làng nghề</h3>
                <p className="text-sm text-white/90">Khám phá nét văn hóa đặc trưng</p>
              </div>
            </div>

            {/* Thẻ 3 */}
            <div
              ref={(el) => { if (el) cardsRef.current[2] = el; }}
              onClick={() => onCuisine()}
              className="absolute top-1/2 left-1/2 opacity-0 group cursor-pointer w-[280px] h-[340px] rounded-2xl overflow-hidden flex flex-col justify-between bg-[url('/annhontay/assets/aistudio/hero_img/atds.jpg')] bg-cover bg-center transition-all duration-300 hover:scale-105 border border-white/30 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300 group-hover:from-[#243D2B]/90" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Ẩm thực & Đặc sản</h3>
                <p className="text-sm text-white/90">Thưởng thức hương vị vùng đất thép</p>
              </div>
            </div>

          </div>
          
        </div>
      </section>
    </>
  );
};