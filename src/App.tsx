import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  getStoredArticles,
  saveStoredArticles,
  getStoredLocations,
  saveStoredLocations,
  getStoredMedia,
  saveStoredMedia,
  getStoredEvaluations,
  saveStoredEvaluations,
  resetAllDataToDefault,
} from "./utils/storage";
import {
  Article,
  LocationPoint,
  MediaItem,
  ProjectEvaluation,
  ContentCategory,
} from "./types";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { InteractiveMap } from "./components/InteractiveMap";
import { ArticleCard } from "./components/ArticleCard";
import { ArticleDetailModal } from "./components/ArticleDetailModal";
import { AIAssistant } from "./components/AIAssistant";
import { MediaGallery } from "./components/MediaGallery";
import { TeamSection } from "./components/TeamSection";
import { AdminCMS } from "./components/AdminCMS";
import { SearchModal } from "./components/SearchModal";
import { OverviewSection } from "./components/OverviewTabs";
import { MetricSection } from "./components/MetricsTimeline";
import { Footer } from "./components/Footer";
import { ScrollReveal } from "./components/ScrollReveal"; // Import chuẩn

import {
  Compass,
  MapPin,
  BookOpen,
  Utensils,
  Landmark,
  ShieldCheck,
  Award,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [evaluations, setEvaluations] = useState<ProjectEvaluation[]>([]);

  // Active section & modals
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [teamOpen, setTeamOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState(false); 

  const [exploreCategory, setExploreCategory] = useState<
    ContentCategory | "all"
  >("all");

  const autostart =
    new URLSearchParams(window.location.search).get("autostart") === "1";

  useEffect(() => {
    setArticles(getStoredArticles());
    setLocations(getStoredLocations());
    setMedia(getStoredMedia());
    setEvaluations(getStoredEvaluations());
  }, []);

  const handleSaveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    saveStoredArticles(newArticles);
  };

  const handleSaveLocations = (newLocations: LocationPoint[]) => {
    setLocations(newLocations);
    saveStoredLocations(newLocations);
  };

  const handleSaveMedia = (newMedia: MediaItem[]) => {
    setMedia(newMedia);
    saveStoredMedia(newMedia);
  };

  const handleAddEvaluation = (newEval: ProjectEvaluation) => {
    const updated = [newEval, ...evaluations];
    setEvaluations(updated);
    saveStoredEvaluations(updated);
  };

  const handleResetData = () => {
    resetAllDataToDefault();
    setArticles(getStoredArticles());
    setLocations(getStoredLocations());
    setMedia(getStoredMedia());
    setEvaluations(getStoredEvaluations());
  };

  const handleAI = (sectionId: string) => {
    setIsAIOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
      const extraOffset = 12;
      const elementTop =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - navbarHeight - extraOffset,
        behavior: "smooth",
      });
    }, 80);
  };

  const handleSelectArticleBySlug = (slug: string) => {
    const found = articles.find((a) => a.slug === slug);
    if (found) {
      setSelectedArticle(found);
    }
  };

  const handleOpenLocationOnMap = (locationId: string) => {
    scrollToSection("map");
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.status === "verified" &&
      (exploreCategory === "all" || a.category === exploreCategory),
  );

  return (
    <div className="min-h-screen bg-[#F2E8D5] text-[#352C24] font-body flex flex-col selection:bg-[#C76B45] selection:text-[#FAF6ED]">
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          autostart={autostart}
        />
      )}

      <Navbar
        activeSection={activeSection}
        exploreCategory={exploreCategory}
        onNavigate={(sectionId, id2) => {
          if (id2 === "explore") {
            setExploreCategory(sectionId as ContentCategory | "all");
            scrollToSection("explore");
          } else {
            scrollToSection(sectionId);
          }
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        isOpen={teamOpen}
        onToggleOpen={() => setTeamOpen(!teamOpen)}
      />

      <div id="hero">
        <Hero
          triggerAnimation={!loading}
          onHistory={() => {
            setExploreCategory("history");
            scrollToSection("explore");
          }}
          onCulture={() => {
            setExploreCategory("culture");
            scrollToSection("explore");
          }}
          onCuisine={() => {
            setExploreCategory("cuisine");
            scrollToSection("explore");
          }}
        />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-20 w-full">
        
        {/* 1. Khái quát */}
        <div id="overview" className="scroll-mt-24">
          <ScrollReveal>
            <OverviewSection />
          </ScrollReveal>
        </div>

        {/* 2. Chỉ tiêu phát triển */}
        <div id="metrics" className="scroll-mt-24">
          <ScrollReveal delay={100}>
            <MetricSection />
          </ScrollReveal>
        </div>

        {/* 3. Bản đồ */}
        <section id="map" className="scroll-mt-24 space-y-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-[#243D2B]/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C76B45] font-bold">
                  Bản đồ Hành chính 2025 & Địa Không Gian Lịch Sử
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-[#243D2B] tracking-wide mt-5">
                  BẢN ĐỒ VĂN HÓA & HÀNH CHÍNH TƯƠNG TÁC
                </h2>
              </div>
              <p className="text-xs md:text-sm text-[#352C24]/75 max-w-md font-body">
                Tích hợp bản đồ 34 đơn vị hành chính cấp tỉnh Việt Nam sau sáp nhập 2025 (Nghị quyết 202/2025/QH15 & sapnhap.bando.com.vn) cùng toàn bộ tọa độ di tích kháng chiến, làng nghề và địa điểm du lịch An Nhơn Tây.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <InteractiveMap
              locations={locations.filter((l) => l.status === "verified")}
              onSelectArticle={handleSelectArticleBySlug}
            />
          </ScrollReveal>
        </section>

        {/* 4. Khám phá */}
        <section id="explore" className="scroll-mt-24 space-y-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#243D2B]/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C76B45] font-bold">
                  Ấn phẩm tư liệu chuyên đề
                </span>
                <h2 className="mt-3 sm:mt-4 font-heading text-2xl sm:text-3xl md:text-4xl text-[#243D2B] tracking-wide">
                  KHÁM PHÁ AN NHƠN TÂY
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Tất cả chuyên mục" },
                  { id: "history", label: "🏛️ Lịch sử di tích" },
                  { id: "culture", label: "🎋 Văn hóa làng nghề" },
                  { id: "nature", label: "🌿 Thiên nhiên cảnh quan" },
                  { id: "cuisine", label: "🍲 Ẩm thực đặc sản" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setExploreCategory(cat.id as any)}
                    className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
                      exploreCategory === cat.id
                        ? "bg-[#243D2B] text-[#FAF6ED] font-bold shadow-sm"
                        : "bg-[#FAF6ED] text-[#352C24] hover:bg-[#FAF6ED]/80 border border-[#352C24]/15"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: true }}
              breakpoints={{
                640: { slidesPerView: 1.2, spaceBetween: 16 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 2.2, spaceBetween: 24 },
              }}
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
              {filteredArticles.map((article) => (
                <SwiperSlide
                  key={article.id}
                  style={{ height: "auto", display: "flex", alignItems: "stretch" }}
                >
                  <ArticleCard
                    article={article}
                    onReadMore={(art) => setSelectedArticle(art)}
                    featured={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ScrollReveal>
        </section>

        <div id="history" className="scroll-mt-24" />
        <div id="culture" className="scroll-mt-24" />
        <div id="cuisine" className="scroll-mt-24" />

        {/* 5. Thư viện ảnh */}
        <section id="gallery" className="scroll-mt-24 space-y-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-[#243D2B]/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C76B45] font-bold">
                  Kho Tư Liệu Thực Tế
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-[#243D2B] tracking-wide mt-5">
                  THƯ VIỆN HÌNH ẢNH & MEDIA
                </h2>
              </div>
              <p className="text-xs md:text-sm text-[#352C24]/75 max-w-md font-body">
                Hình ảnh thực tế về địa đạo, làng nghề, đền liệt sĩ và sản vật địa
                phương có bản quyền và nguồn dẫn minh bạch.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <MediaGallery media={media} />
          </ScrollReveal>
        </section>

      </main>

      <TeamSection
        isOpen={teamOpen}
        onToggleOpen={() => setTeamOpen(!teamOpen)}
      />

      <AIAssistant
        locations={locations}
        onOpenLocationOnMap={handleOpenLocationOnMap}
        isOpen={isAIOpen}
        onToggleOpen={() => setIsAIOpen(!isAIOpen)}
      />

      {adminOpen && (
        <AdminCMS
          articles={articles}
          locations={locations}
          media={media}
          onSaveArticles={handleSaveArticles}
          onSaveLocations={handleSaveLocations}
          onSaveMedia={handleSaveMedia}
          onResetData={handleResetData}
          onClose={() => setAdminOpen(false)}
        />
      )}

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onViewOnMap={(locId) => {
            scrollToSection("map");
          }}
        />
      )}

      {searchOpen && (
        <SearchModal
          articles={articles}
          locations={locations}
          media={media}
          onClose={() => setSearchOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onSelectLocation={(loc) => {
            scrollToSection("map");
          }}
        />
      )}

      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />
    </div>
  );
}