import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Bot,
  Award,
  Lock,
  Search,
  Menu,
  X,
  BookOpen,
  Users,
  Utensils,
  Landmark,
  BarChart2,
  LayoutGrid
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  exploreCategory: string;
  onNavigate: (sectionId: string, id2: string) => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  exploreCategory,
  onNavigate,
  onOpenAdmin,
  onOpenSearch,
  isOpen,
  onToggleOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id2: "", id: 'hero', label: 'Trang chủ', icon: Landmark },
    { id2: "", id: 'overview', label: 'Tổng quan', icon: LayoutGrid },
    { id2: "", id: 'metrics', label: 'Chỉ tiêu phát triển', icon: BarChart2 },
    { id2: "", id: 'map', label: 'Bản đồ văn hóa', icon: MapPin },
    { id2: 'explore', id: 'history', label: 'Lịch sử & Di tích', icon: BookOpen },
    { id2: 'explore', id: 'culture', label: 'Văn hóa & Làng nghề', icon: Compass },
    { id2: 'explore', id: 'cuisine', label: 'Ẩm thực & Đặc sản', icon: Utensils },
    // { id2: "", id: 'ai', label: 'Trợ lý AI An Nhơn Tây', icon: Bot },
    { id2: "", id: 'gallery', label: 'Thư viện ảnh', icon: Compass },
    // { id: 'sources', label: 'Nguồn kiểm chứng', icon: BookOpen },
    { id2: "", id: 'team', label: 'Nhóm 12A5', icon: Users }
  ];

  const handleNavClick = (id: string, id2:string) => {
    onNavigate(id, id2);
    setMobileMenuOpen(false);
  };

  const handleTeam = () => {
    onToggleOpen();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#243D2B] text-[#FAF6ED] border-b-2 border-[#243D2B] shadow-md">
      {/* Top micro announcement bar */}
      <div className="bg-[#1C3022] text-[#FAF6ED]/75 text-[11px] font-mono px-4 py-1 relative flex items-center justify-between border-b border-[#FAF6ED]/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C76B45]" />
          <span>DỰ ÁN NGHIÊN CỨU LỚP 12A5 · ĐẤT THÉP THÀNH ĐỒNG AN NHƠN TÂY</span>
        </div>
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-center text-[#FAF6ED]/90 font-medium whitespace-nowrap">
          Di tích Quốc gia Đặc biệt
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>Thành phố Hồ Chí Minh</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero', "")}
          className="cursor-pointer flex items-center gap-2.5 group shrink-0"
        >
          <div className="h-10 px-2 py-0.5 rounded flex items-center justify-center transition-all shadow shrink-0">
            <img
              src="/annhontay/assets/aistudio/logo.png"
              alt="Logo Lớp 12A5"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="shrink-0">
            <div className="font-heading text-base sm:text-lg md:text-xl tracking-wider leading-none text-[#FAF6ED] group-hover:text-[#C76B45] transition-colors whitespace-nowrap">
              AN NHƠN TÂY
            </div>
            <div className="text-[9px] sm:text-[10px] font-editorial italic text-[#FAF6ED]/80 tracking-wide whitespace-nowrap">
              Vùng Đất Anh Hùng · Lớp 12A5
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-mono font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id2 === 'explore'
              ? activeSection === 'explore' && exploreCategory === item.id
              : activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.id === 'team' ? handleTeam() : handleNavClick(item.id, item.id2)}
                className={`px-2.5 py-1.5 rounded transition-all ${
                  isActive
                    ? 'bg-[#617A50] text-[#FAF6ED] font-bold shadow-sm'
                    : 'text-[#FAF6ED]/80 hover:text-[#FAF6ED] hover:bg-[#FAF6ED]/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Admin CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            className="px-2.5 py-1.5 rounded bg-[#C76B45] hover:bg-[#b05834] text-[#FAF6ED] transition-colors flex items-center gap-1.5 text-xs font-mono font-medium shadow-sm"
            title="Bảng Quản trị Nội dung (Admin CMS)"
            aria-label="Bảng Quản trị"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quản trị</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded bg-[#FAF6ED]/10 hover:bg-[#FAF6ED]/20 text-[#FAF6ED] transition-colors"
            title="Tìm kiếm toàn trang"
            aria-label="Tìm kiếm nội dung"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded bg-[#FAF6ED]/10 text-[#FAF6ED]"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1C3022] border-t border-[#FAF6ED]/10 px-4 py-4 space-y-2 animate-fade-in">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id2 === 'explore'
                ? activeSection === 'explore' && exploreCategory === item.id
                : activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => item.id === "team" ? handleTeam() : handleNavClick(item.id, item.id2) }
                  className={`w-full text-left px-3 py-2 rounded text-xs flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#617A50] text-[#FAF6ED] font-bold'
                      : 'text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#C76B45]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded text-xs flex items-center gap-2.5 bg-[#C76B45]/20 text-[#C76B45] hover:bg-[#C76B45]/30 font-bold border border-[#C76B45]/40 mt-2"
            >
              <Lock className="w-4 h-4 text-[#C76B45]" />
              <span>Bảng Quản trị (Admin CMS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
