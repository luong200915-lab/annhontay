import React, { useState, useRef } from "react";
import {
  TrendingUp,
  Users,
  Map,
  Briefcase,
  Landmark,
  Calendar,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TIMELINE_DATA } from "../data/cuchiData.ts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const MetricSection: React.FC = () => {
  const INITIAL_TIMELINE_COUNT = 1;
  const [visibleTimelineCount, setVisibleTimelineCount] = useState<number>(
    INITIAL_TIMELINE_COUNT,
  );
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleToggleTimeline = () => {
    if (visibleTimelineCount >= TIMELINE_DATA.length) {
      // Đã hiện hết -> Thu gọn về ban đầu và cuộn về đầu khung Timeline
      setVisibleTimelineCount(INITIAL_TIMELINE_COUNT);
      setTimeout(() => {
        const el = timelineRef.current;
        if (!el) return;
        const navbar = document.querySelector("header");
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - navbarHeight - 12, behavior: "smooth" });
      }, 50);
    } else {
      // Chưa hiện hết -> Mở thêm 1 mốc và cuộn xuống 180px để thấy nội dung mới
      setVisibleTimelineCount((prev) =>
        Math.min(prev + 1, TIMELINE_DATA.length),
      );
      setTimeout(() => {
        window.scrollBy({ top: 180, behavior: "smooth" });
      }, 80);
    }
  };

  const isTimelineFullyExpanded = visibleTimelineCount >= TIMELINE_DATA.length;

  return (
    <section className="py-14 sm:py-20 bg-[#F2E8D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-[#243D2B]/20 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C76B45] font-bold">
              Dữ Liệu Đã Xác Minh & Phê Duyệt
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#243D2B] tracking-wide mt-5">
              Tổng Quan Xã An Nhơn Tây & Các Chỉ Tiêu Phát Triển
            </h2>
          </div>

          <p className="text-xs md:text-sm text-[#352C24]/75 max-w-md font-body">
            Số liệu chính thức theo Đề án sắp xếp đơn vị hành chính và tài liệu
            giới thiệu địa phương của UBND Thành phố Hồ Chí Minh.
          </p>
        </div>

        {/* Infographic Grid */}

        <div className="block md:hidden mb-12 pb-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={false}
            pagination={{ clickable: true }}
            className="!pb-12"
            style={
              {
                overflow: "hidden",
                "--swiper-pagination-color": "#243D2B",
                "--swiper-pagination-bullet-inactive-color": "#352C24",
                "--swiper-pagination-bullet-inactive-opacity": "0.3",
              } as React.CSSProperties
            }
          >
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left w-full">
                <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                  Hành chính địa phương
                </span>
                <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
                  Hợp Nhất 3 Xã Trọng Điểm
                </h3>
                <p className="text-sm text-[#687267] leading-relaxed">
                  Theo phương án sắp xếp ĐVHC của TP.HCM, 3 xã{" "}
                  <strong>An Nhơn Tây</strong>, <strong>An Phú</strong> và{" "}
                  <strong>Phú Mỹ Hưng</strong> được hợp nhất thành{" "}
                  <strong>xã An Nhơn Tây</strong> mới.
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-[#356B4B] font-semibold flex items-center justify-between">
                  <span>Cửa ngõ Tây Bắc TP.HCM</span>
                  <span>Trụ sở tại Tỉnh lộ 7</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              {/* Card 2: Quy mô dân số & diện tích */}
              <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left w-full">
                <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
                  <Map className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                  Quy mô lãnh thổ
                </span>
                <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
                  Diện Tích & Dân Số
                </h3>
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-[#F5F0E6] p-2.5 rounded-lg text-center">
                    <span className="block text-xl font-black text-[#356B4B]">
                      77,70
                    </span>
                    <span className="text-[11px] text-[#687267]">
                      km² diện tích tự nhiên
                    </span>
                  </div>
                  <div className="bg-[#F5F0E6] p-2.5 rounded-lg text-center">
                    <span className="block text-xl font-black text-[#356B4B]">
                      40.896
                    </span>
                    <span className="text-[11px] text-[#687267]">
                      người dân sinh sống
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#687267]">
                  Mật độ dân số đạt 526 người/km² (số liệu 31/12/2024). Trải dài hữu ngạn sông Sài Gòn, giữ vai trò vành đai sinh thái của thành phố.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              {/* Card 3: Tăng trưởng kinh tế */}
              <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left w-full">
                <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                  Kinh tế & Ngân sách
                </span>
                <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
                  Tăng Trưởng Bền Vững
                </h3>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#687267]">Tốc độ tăng trưởng:</span>
                    <strong className="text-[#356B4B] font-bold">
                      Ổn định &gt; 10%
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#687267]">Thu ngân sách:</span>
                    <strong className="text-[#356B4B] font-bold">
                      Đạt &amp; vượt chỉ tiêu
                    </strong>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-[#687267]">
                  Kinh tế chuyển dịch tích cực sang nông nghiệp đô thị, thương mại dịch vụ và du lịch lịch sử - sinh thái; thu ngân sách luôn đảm bảo kế hoạch.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              {/* Card 4: Cơ cấu kinh tế & lao động */}
              <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left w-full">
                <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                  Cơ cấu ngành
                </span>
                <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
                  Chuyển Dịch Công Nghiệp & Dịch Vụ
                </h3>
                <div className="space-y-3 mt-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Tỷ trọng TM - Dịch vụ &amp; TTCN</span>
                      <span className="text-[#356B4B]">&gt; 65%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EAE2D2] overflow-hidden">
                      <div className="h-full bg-[#356B4B] rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Tỷ lệ lao động phi nông nghiệp &amp; đào tạo</span>
                      <span className="text-[#356B4B]">&gt; 70%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EAE2D2] overflow-hidden">
                      <div className="h-full bg-[#6F9674] rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              {/* Card 5: Thu nhập bình quân */}
              <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left w-full">
                <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                  Đời sống nhân dân
                </span>
                <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
                  Thu Nhập & An Sinh Xã Hội
                </h3>
                <div className="p-3 rounded-xl bg-[#F5F0E6] text-center my-2">
                  <span className="text-2xl font-black text-[#D9A85B]">
                    &gt; 75 tr
                  </span>
                  <p className="text-xs text-[#29372D] font-medium mt-1">
                    đồng/người/năm (chuẩn Nông thôn mới nâng cao)
                  </p>
                </div>
                <p className="text-xs text-[#687267] mt-2">
                  Duy trì vững chắc chuẩn NTM nâng cao, hộ nghèo giảm sâu theo chuẩn đa chiều, 100% hộ dân dùng nước sạch và điện lưới quốc gia.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="pt-5" style={{ height: "auto", display: "flex", alignItems: "stretch" }}>
              {/* Card 6: Không gian Văn hóa Hồ Chí Minh */}
              <div className="bg-gradient-to-br from-[#356B4B] to-[#254f36] rounded-2xl p-6 text-white shadow-md text-left flex flex-col justify-between w-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-[#D9A85B] flex items-center justify-center mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                    Điểm sáng văn hóa
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">
                    Không Gian Văn Hóa Bác Hồ
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    Xã An Nhơn Tây tiên phong lan tỏa Không gian Văn hóa Hồ Chí Minh tại{" "}
                    <strong>Địa đạo Bến Dược</strong>,{" "}
                    <strong>Chùa Hoằng Linh (11/11/2022)</strong> (mô hình điểm trong cơ sở tôn giáo), cùng hệ thống trường học và công sở trên địa bàn.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 text-xs text-[#D9A85B] font-semibold">
                  ★ Lan tỏa sâu rộng trong đời sống nhân dân
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pt-5">
          <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
              Hành chính địa phương
            </span>
            <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
              Hợp Nhất 3 Xã Trọng Điểm
            </h3>
            <p className="text-sm text-[#687267] leading-relaxed">
              Theo phương án sắp xếp ĐVHC của TP.HCM, 3 xã{" "}
              <strong>An Nhơn Tây</strong>, <strong>An Phú</strong> và{" "}
              <strong>Phú Mỹ Hưng</strong> được hợp nhất thành{" "}
              <strong>xã An Nhơn Tây</strong> mới.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-[#356B4B] font-semibold flex items-center justify-between">
              <span>Cửa ngõ Tây Bắc TP.HCM</span>
              <span>Trụ sở tại Tỉnh lộ 7</span>
            </div>
          </div>

          {/* Card 2: Quy mô dân số & diện tích */}
          <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
              <Map className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
              Quy mô lãnh thổ
            </span>
            <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
              Diện Tích & Dân Số
            </h3>
            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-[#F5F0E6] p-2.5 rounded-lg text-center">
                <span className="block text-xl font-black text-[#356B4B]">
                  77,70
                </span>
                <span className="text-[11px] text-[#687267]">
                  km² diện tích tự nhiên
                </span>
              </div>
              <div className="bg-[#F5F0E6] p-2.5 rounded-lg text-center">
                <span className="block text-xl font-black text-[#356B4B]">
                  40.896
                </span>
                <span className="text-[11px] text-[#687267]">
                  người dân sinh sống
                </span>
              </div>
            </div>
            <p className="text-xs text-[#687267]">
              Mật độ dân số đạt 526 người/km² (số liệu 31/12/2024). Trải dài hữu ngạn sông Sài Gòn, giữ vai trò vành đai sinh thái của thành phố.
            </p>
          </div>

          {/* Card 3: Tăng trưởng kinh tế */}
          <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
              Kinh tế & Ngân sách
            </span>
            <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
              Tăng Trưởng Bền Vững
            </h3>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#687267]">Tốc độ tăng trưởng:</span>
                <strong className="text-[#356B4B] font-bold">Ổn định &gt; 10%</strong>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#687267]">Thu ngân sách:</span>
                <strong className="text-[#356B4B] font-bold">
                  Đạt &amp; vượt chỉ tiêu
                </strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-[#687267]">
              Kinh tế chuyển dịch tích cực sang nông nghiệp đô thị, thương mại dịch vụ và du lịch lịch sử - sinh thái; thu ngân sách luôn đảm bảo kế hoạch.
            </div>
          </div>

          {/* Card 4: Cơ cấu kinh tế & lao động */}
          <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
              Cơ cấu ngành
            </span>
            <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
              Chuyển Dịch Công Nghiệp & Dịch Vụ
            </h3>
            <div className="space-y-3 mt-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Tỷ trọng TM - Dịch vụ &amp; TTCN</span>
                  <span className="text-[#356B4B]">&gt; 65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE2D2] overflow-hidden">
                  <div className="h-full bg-[#356B4B] rounded-full w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Tỷ lệ lao động phi nông nghiệp &amp; đào tạo</span>
                  <span className="text-[#356B4B]">&gt; 70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EAE2D2] overflow-hidden">
                  <div className="h-full bg-[#6F9674] rounded-full w-[70%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Thu nhập bình quân */}
          <div className="bg-white rounded-2xl p-6 border border-[#356B4B]/15 shadow-xs hover:shadow-md transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#356B4B]/10 text-[#356B4B] flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
              Đời sống nhân dân
            </span>
            <h3 className="text-lg font-bold text-[#29372D] mt-1 mb-2">
              Thu Nhập & An Sinh Xã Hội
            </h3>
            <div className="p-3 rounded-xl bg-[#F5F0E6] text-center my-2">
              <span className="text-2xl font-black text-[#D9A85B]">
                &gt; 75 tr
              </span>
              <p className="text-xs text-[#29372D] font-medium mt-1">
                đồng/người/năm (chuẩn Nông thôn mới nâng cao)
              </p>
            </div>
            <p className="text-xs text-[#687267] mt-2">
              Duy trì vững chắc chuẩn NTM nâng cao, hộ nghèo giảm sâu theo chuẩn đa chiều, 100% hộ dân dùng nước sạch và điện lưới quốc gia.
            </p>
          </div>

          {/* Card 6: Không gian Văn hóa Hồ Chí Minh */}
          <div className="bg-gradient-to-br from-[#356B4B] to-[#254f36] rounded-2xl p-6 text-white shadow-md text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#D9A85B] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A85B]">
                Điểm sáng văn hóa
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                Không Gian Văn Hóa Bác Hồ
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Xã An Nhơn Tây tiên phong lan tỏa Không gian Văn hóa Hồ Chí Minh tại{" "}
                <strong>Địa đạo Bến Dược</strong>,{" "}
                <strong>Chùa Hoằng Linh (11/11/2022)</strong> (mô hình điểm trong cơ sở tôn giáo), cùng hệ thống trường học và công sở trên địa bàn.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-[#D9A85B] font-semibold">
              ★ Lan tỏa sâu rộng trong đời sống nhân dân
            </div>
          </div>
        </div>

        {/* Card 1: Hợp nhất hành chính */}

        {/* Timeline of Key Historical & Cultural Milestones */}
        <div ref={timelineRef} className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-10 border border-[#356B4B]/15 shadow-sm text-left">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="w-6 h-6 text-[#356B4B]" />
            <h3 className="text-2xl font-bold text-[#29372D]">
              Dấu Mốc Lịch Sử & Phát Triển Của Vùng Đất An Nhơn Tây
            </h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#356B4B]/30 space-y-8">
            {TIMELINE_DATA.slice(0, visibleTimelineCount).map((item, idx) => (
              <div
                key={idx}
                className="relative group animate-in fade-in duration-300"
              >
                {/* Dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#356B4B] border-4 border-white group-hover:scale-125 transition-transform"></div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#356B4B]/10 text-[#356B4B] text-xs font-bold mb-1">
                  {item.year}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#29372D] group-hover:text-[#356B4B] transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-[#687267] mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-1 text-[11px] text-[#687267]/80 italic">
                  Nguồn: {item.source}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-[#356B4B]/10 flex justify-center">
            <button
              onClick={handleToggleTimeline}
              className="w-full sm:w-auto px-6 py-3 bg-[#F5F0E6] hover:bg-[#356B4B] text-[#356B4B] hover:text-white border border-[#356B4B]/30 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group"
            >
              <span>
                {isTimelineFullyExpanded
                  ? "Thu gọn lịch sử"
                  : `Xem thêm giai đoạn tiếp theo (${visibleTimelineCount}/${TIMELINE_DATA.length})`}
              </span>
              {isTimelineFullyExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
