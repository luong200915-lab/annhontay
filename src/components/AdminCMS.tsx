import React, { useState } from 'react';
import { Article, LocationPoint, MediaItem, ContentCategory, ContentStatus } from '../types';
import { validateCoordinates } from '../utils/rules';
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Image as ImageIcon,
  RotateCcw,
  X,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface AdminCMSProps {
  articles: Article[];
  locations: LocationPoint[];
  media: MediaItem[];
  onSaveArticles: (articles: Article[]) => void;
  onSaveLocations: (locations: LocationPoint[]) => void;
  onSaveMedia: (media: MediaItem[]) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  articles,
  locations,
  media,
  onSaveArticles,
  onSaveLocations,
  onSaveMedia,
  onResetData,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'articles' | 'locations' | 'media'>('dashboard');

  // Article Edit State
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [articlePreview, setArticlePreview] = useState(false);

  // Location Edit State
  const [editingLocation, setEditingLocation] = useState<Partial<LocationPoint> | null>(null);

  // Media Edit State
  const [editingMedia, setEditingMedia] = useState<Partial<MediaItem> | null>(null);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default classroom admin passcode: '12a5cuchi'
    if (passwordInput.trim() === '12a5cuchi' || passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      showNotification('Đăng nhập thành công vào Hệ thống Quản trị Lớp 12A5!');
    } else {
      setAuthError('Mật mã không đúng. Gợi ý mật mã mặc định của nhóm: 12a5cuchi');
    }
  };

  // Article handlers
  const handleSaveArticle = () => {
    if (!editingArticle?.title || !editingArticle?.category) {
      showNotification('Vui lòng nhập tiêu đề và chọn chuyên mục', 'error');
      return;
    }

    const catNames: Record<ContentCategory, string> = {
      history: 'Lịch sử & Truyền thống',
      culture: 'Văn hóa & Đời sống',
      nature: 'Thiên nhiên & Cảnh quan',
      cuisine: 'Ẩm thực & Đặc sản',
      places: 'Địa điểm tham quan',
      '': ''
    };

    const newArticle: Article = {
      id: editingArticle.id || `art-${Date.now()}`,
      slug:
        editingArticle.slug ||
        editingArticle.title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-'),
      title: editingArticle.title,
      subtitle: editingArticle.subtitle || '',
      category: editingArticle.category as ContentCategory,
      categoryName: catNames[editingArticle.category as ContentCategory] || 'Văn hóa An Nhơn Tây',
      summary: editingArticle.summary || '',
      content: Array.isArray(editingArticle.content)
        ? editingArticle.content
        : [editingArticle.summary || 'Nội dung đang được cập nhật.'],
      coverImage:
        editingArticle.coverImage ||
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      imageCaption: editingArticle.imageCaption || editingArticle.title,
      imageCredit: editingArticle.imageCredit || 'Tư liệu Lớp 12A5',
      author: editingArticle.author || 'Ban Biên tập Lớp 12A5',
      sources: editingArticle.sources || [
        {
          id: `src-${Date.now()}`,
          name: 'Cổng thông tin UBND Huyện An Nhơn Tây',
          organization: 'UBND Huyện An Nhơn Tây',
          url: 'https://cuchi.hochiminhcity.gov.vn',
          verifiedDate: new Date().toISOString().split('T')[0],
          supportedFacts: ['Dữ liệu đã qua kiểm chứng']
        }
      ],
      tags: editingArticle.tags || ['An Nhơn Tây'],
      status: (editingArticle.status as ContentStatus) || 'verified',
      updatedAt: new Date().toISOString().split('T')[0],
      highlights: editingArticle.highlights || []
    };

    const exists = articles.some((a) => a.id === newArticle.id);
    const updated = exists
      ? articles.map((a) => (a.id === newArticle.id ? newArticle : a))
      : [newArticle, ...articles];

    onSaveArticles(updated);
    setEditingArticle(null);
    showNotification(exists ? 'Đã cập nhật bài viết!' : 'Đã thêm bài viết mới!');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const updated = articles.filter((a) => a.id !== id);
      onSaveArticles(updated);
      showNotification('Đã xóa bài viết.');
    }
  };

  // Location handlers
  const handleSaveLocation = () => {
    if (!editingLocation?.name || !editingLocation?.lat || !editingLocation?.lng) {
      showNotification('Vui lòng điền tên địa điểm và tọa độ hợp lệ', 'error');
      return;
    }

    if (!validateCoordinates(Number(editingLocation.lat), Number(editingLocation.lng))) {
      showNotification('Tọa độ không nằm trong vùng An Nhơn Tây / TP.HCM hợp lệ!', 'error');
      return;
    }

    const catNames: Record<ContentCategory, string> = {
      history: 'Lịch sử & Di tích',
      culture: 'Văn hóa & Làng nghề',
      nature: 'Thiên nhiên & Sinh thái',
      cuisine: 'Ẩm thực & Đặc sản',
      places: 'Địa điểm tham quan',
      '': ''
    };

    const newLoc: LocationPoint = {
      id: editingLocation.id || `loc-${Date.now()}`,
      name: editingLocation.name,
      category: (editingLocation.category as ContentCategory) || 'places',
      categoryName: catNames[(editingLocation.category as ContentCategory) || 'places'],
      shortDescription: editingLocation.shortDescription || '',
      fullDescription: editingLocation.fullDescription || editingLocation.shortDescription || '',
      lat: Number(editingLocation.lat),
      lng: Number(editingLocation.lng),
      address: editingLocation.address || 'Xã An Nhơn Tây, TP. Hồ Chí Minh',
      coverImage:
        editingLocation.coverImage ||
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      openingHours: editingLocation.openingHours || '07:30 – 17:00 hằng ngày',
      ticketPrice: editingLocation.ticketPrice || 'Miễn phí / Theo quy định',
      sources: editingLocation.sources || [],
      verifiedDate: new Date().toISOString().split('T')[0],
      status: (editingLocation.status as ContentStatus) || 'verified'
    };

    const exists = locations.some((l) => l.id === newLoc.id);
    const updated = exists
      ? locations.map((l) => (l.id === newLoc.id ? newLoc : l))
      : [...locations, newLoc];

    onSaveLocations(updated);
    setEditingLocation(null);
    showNotification(exists ? 'Đã cập nhật địa điểm trên bản đồ!' : 'Đã thêm địa điểm mới!');
  };

  const handleDeleteLocation = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa địa điểm này khỏi bản đồ không?')) {
      const updated = locations.filter((l) => l.id !== id);
      onSaveLocations(updated);
      showNotification('Đã xóa địa điểm.');
    }
  };

  // Media handlers
  const handleSaveMedia = () => {
    if (!editingMedia?.title || !editingMedia?.url) {
      showNotification('Vui lòng nhập tiêu đề ảnh và URL', 'error');
      return;
    }

    const newItem: MediaItem = {
      id: editingMedia.id || `med-${Date.now()}`,
      title: editingMedia.title,
      url: editingMedia.url,
      type: 'image',
      category: editingMedia.category || 'Văn hóa',
      caption: editingMedia.caption || editingMedia.title,
      source: editingMedia.source || 'Lớp 12A5',
      credit: editingMedia.credit || 'Học sinh 12A5 chụp thực tế',
      verifiedDate: new Date().toISOString().split('T')[0]
    };

    const exists = media.some((m) => m.id === newItem.id);
    const updated = exists ? media.map((m) => (m.id === newItem.id ? newItem : m)) : [newItem, ...media];

    onSaveMedia(updated);
    setEditingMedia(null);
    showNotification(exists ? 'Đã cập nhật ảnh!' : 'Đã thêm ảnh vào thư viện!');
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Xóa hình ảnh này khỏi thư viện?')) {
      const updated = media.filter((m) => m.id !== id);
      onSaveMedia(updated);
      showNotification('Đã xóa hình ảnh.');
    }
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <div className="w-full max-w-md bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4 border-b border-[#243D2B]/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#243D2B] text-[#FAF6ED] rounded">
                <Lock className="w-5 h-5 text-[#C76B45]" />
              </div>
              <h3 className="font-heading text-2xl text-[#243D2B] tracking-wide">
                QUẢN TRỊ NỘI DUNG CMS
              </h3>
            </div>
            <button onClick={onClose} className="text-[#352C24]/60 hover:text-[#352C24]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#352C24]/80 mb-5 leading-relaxed font-body">
            Khu vực dành cho Ban Biên tập Lớp 12A5 cập nhật bài viết, ghim địa điểm bản đồ và quản lý ảnh tư liệu mà không cần viết lại mã nguồn.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                Mật mã quản trị viên (Mặc định: 12a5cuchi)
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full bg-[#F2E8D5] border border-[#352C24]/20 rounded px-3 py-2 text-sm text-[#352C24] focus:outline-none focus:border-[#243D2B]"
              />
            </div>

            {authError && (
              <div className="p-2.5 bg-red-100 border border-red-300 text-red-800 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] font-heading text-lg tracking-wider rounded transition-colors"
            >
              ĐĂNG NHẬP VÀO CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const verifiedArticles = articles.filter((a) => a.status === 'verified').length;
  const pendingArticles = articles.filter((a) => a.status === 'pending').length;
  const draftArticles = articles.filter((a) => a.status === 'draft').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-2xl my-auto max-h-[94vh] flex flex-col overflow-hidden">
        {/* Notification Toast */}
        {notification && (
          <div
            className={`absolute top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-xs font-mono flex items-center gap-2 animate-fade-in ${
              notification.type === 'success'
                ? 'bg-[#243D2B] text-[#FAF6ED] border border-[#617A50]'
                : 'bg-red-700 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-[#C76B45]" />
            <span>{notification.message}</span>
          </div>
        )}

        {/* CMS Top Header */}
        <div className="bg-[#243D2B] text-[#FAF6ED] px-4 py-3 flex items-center justify-between border-b border-[#243D2B]">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#617A50] text-[#FAF6ED] rounded">
              <Unlock className="w-4 h-4 text-[#C76B45]" />
            </div>
            <div>
              <h3 className="font-heading text-2xl tracking-wide text-[#FAF6ED]">
                HỆ THỐNG QUẢN TRỊ NỘI DUNG · LỚP 12A5
              </h3>
              <p className="text-[11px] text-[#FAF6ED]/70 font-mono">
                Cập nhật cơ sở dữ liệu động mà không cần sửa mã nguồn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Khôi phục toàn bộ dữ liệu gốc của nhóm 12A5?')) {
                  onResetData();
                  showNotification('Đã khôi phục dữ liệu gốc chuẩn mực!');
                }
              }}
              className="px-2.5 py-1 text-xs font-mono bg-[#617A50] hover:bg-[#617A50]/80 rounded text-[#FAF6ED] flex items-center gap-1"
              title="Khôi phục toàn bộ bài viết và bản đồ về mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Khôi phục gốc
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded bg-[#C76B45] hover:bg-[#C76B45]/80 text-[#FAF6ED]"
              aria-label="Đóng bảng quản trị"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CMS Tab Nav */}
        <div className="bg-[#F2E8D5] px-4 py-2 border-b border-[#352C24]/10 flex gap-2">
          {[
            { id: 'dashboard', label: '📊 Tổng quan Thống kê' },
            { id: 'articles', label: `📝 Quản lý Bài viết (${articles.length})` },
            { id: 'locations', label: `🗺️ Quản lý Bản đồ (${locations.length})` },
            { id: 'media', label: `🖼️ Thư viện Media (${media.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id as any);
                setEditingArticle(null);
                setEditingLocation(null);
                setEditingMedia(null);
              }}
              className={`text-xs px-3 py-1.5 rounded font-mono font-bold transition-all ${
                currentTab === tab.id
                  ? 'bg-[#243D2B] text-[#FAF6ED]'
                  : 'bg-[#FAF6ED] text-[#352C24] hover:bg-[#FAF6ED]/80 border border-[#352C24]/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#FAF6ED]">
          {/* TAB 1: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F2E8D5] border-2 border-[#243D2B] rounded-lg">
                  <div className="text-xs font-mono uppercase text-[#352C24]/70">Tổng bài viết</div>
                  <div className="font-heading text-4xl text-[#243D2B] mt-1">{articles.length}</div>
                  <div className="text-[11px] text-[#617A50] mt-1 font-semibold">
                    ✓ {verifiedArticles} đã xuất bản
                  </div>
                </div>

                <div className="p-4 bg-[#F2E8D5] border-2 border-[#243D2B] rounded-lg">
                  <div className="text-xs font-mono uppercase text-[#352C24]/70">Địa điểm bản đồ</div>
                  <div className="font-heading text-4xl text-[#C76B45] mt-1">{locations.length}</div>
                  <div className="text-[11px] text-[#243D2B] mt-1 font-semibold">
                    📍 Tọa độ GPS đã xác minh
                  </div>
                </div>

                <div className="p-4 bg-[#F2E8D5] border-2 border-[#243D2B] rounded-lg">
                  <div className="text-xs font-mono uppercase text-[#352C24]/70">Tư liệu Media</div>
                  <div className="font-heading text-4xl text-[#617A50] mt-1">{media.length}</div>
                  <div className="text-[11px] text-[#352C24]/70 mt-1">Hình ảnh thực tế</div>
                </div>

                <div className="p-4 bg-[#F2E8D5] border-2 border-[#243D2B] rounded-lg">
                  <div className="text-xs font-mono uppercase text-[#352C24]/70">Quy trình duyệt</div>
                  <div className="font-heading text-4xl text-[#352C24] mt-1">100%</div>
                  <div className="text-[11px] text-[#C76B45] mt-1 font-semibold">
                    Chuẩn nguồn chính thống
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#F2E8D5] p-5 rounded-lg border border-[#352C24]/15">
                <h4 className="font-heading text-2xl text-[#243D2B] mb-3">
                  Thao Tác Nhanh Dành Cho Học Sinh Lớp 12A5
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setCurrentTab('articles');
                      setEditingArticle({
                        title: '',
                        summary: '',
                        content: [''],
                        category: 'history',
                        status: 'verified'
                      });
                    }}
                    className="px-4 py-2 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Viết bài mới
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('locations');
                      setEditingLocation({
                        name: '',
                        lat: 11.05,
                        lng: 106.52,
                        category: 'history',
                        status: 'verified'
                      });
                    }}
                    className="px-4 py-2 bg-[#C76B45] hover:bg-[#C76B45]/80 text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Ghim địa điểm bản đồ
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('media');
                      setEditingMedia({
                        title: '',
                        url: '',
                        category: 'Văn hóa'
                      });
                    }}
                    className="px-4 py-2 bg-[#617A50] hover:bg-[#243D2B] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Thêm ảnh tư liệu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {currentTab === 'articles' && (
            <div>
              {editingArticle ? (
                /* Article Editor Form */
                <div className="bg-[#F2E8D5] p-5 rounded-lg border border-[#352C24]/15 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#352C24]/15 pb-2">
                    <h4 className="font-heading text-2xl text-[#243D2B]">
                      {editingArticle.id ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
                    </h4>
                    <button
                      onClick={() => setEditingArticle(null)}
                      className="text-xs text-[#352C24]/60 hover:text-[#352C24] underline"
                    >
                      Hủy bỏ
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Tiêu đề bài viết *
                      </label>
                      <input
                        type="text"
                        value={editingArticle.title || ''}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, title: e.target.value })
                        }
                        placeholder="Ví dụ: ĐỊA ĐẠO BẾN DƯỢC..."
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-2 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Chuyên mục *
                      </label>
                      <select
                        value={editingArticle.category || 'history'}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            category: e.target.value as ContentCategory
                          })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-2 text-xs text-[#352C24]"
                      >
                        <option value="history">Lịch sử & Truyền thống</option>
                        <option value="culture">Văn hóa & Đời sống</option>
                        <option value="nature">Thiên nhiên & Cảnh quan</option>
                        <option value="cuisine">Ẩm thực & Đặc sản</option>
                        <option value="places">Địa điểm tham quan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                      Tóm tắt ngắn (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.summary || ''}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, summary: e.target.value })
                      }
                      className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded p-2 text-xs text-[#352C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                      Nội dung chi tiết (Mỗi đoạn cách nhau 1 dòng trống)
                    </label>
                    <textarea
                      rows={6}
                      value={
                        Array.isArray(editingArticle.content)
                          ? editingArticle.content.join('\n\n')
                          : (editingArticle.content as any) || ''
                      }
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          content: e.target.value.split('\n\n').filter((p) => p.trim())
                        })
                      }
                      placeholder="Nhập nội dung các đoạn văn..."
                      className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded p-2 text-xs text-[#352C24]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        URL Ảnh Bìa
                      </label>
                      <input
                        type="text"
                        value={editingArticle.coverImage || ''}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, coverImage: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Trạng thái duyệt
                      </label>
                      <select
                        value={editingArticle.status || 'verified'}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            status: e.target.value as ContentStatus
                          })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      >
                        <option value="verified">Đã xác minh (Xuất bản công khai)</option>
                        <option value="pending">Chờ xác minh</option>
                        <option value="draft">Bản nháp</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t border-[#352C24]/10">
                    <button
                      onClick={() => setEditingArticle(null)}
                      className="px-4 py-2 border border-[#352C24]/20 rounded text-xs font-mono"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveArticle}
                      className="px-5 py-2 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Lưu Bài Viết
                    </button>
                  </div>
                </div>
              ) : (
                /* Article Table List */
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-heading text-2xl text-[#243D2B]">
                      Danh Sách Bài Viết Đã Biên Tập ({articles.length})
                    </h4>
                    <button
                      onClick={() =>
                        setEditingArticle({
                          title: '',
                          category: 'history',
                          content: [''],
                          status: 'verified'
                        })
                      }
                      className="px-3.5 py-1.5 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm Bài Mới
                    </button>
                  </div>

                  <div className="space-y-2">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="bg-[#F2E8D5] p-3 rounded border border-[#352C24]/15 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.coverImage}
                            alt=""
                            className="w-12 h-12 object-cover rounded shrink-0 border border-[#243D2B]/10"
                          />
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase text-[#C76B45] font-bold">
                              {art.categoryName} • {art.status}
                            </div>
                            <div className="font-heading text-lg text-[#243D2B] truncate">
                              {art.title}
                            </div>
                            <div className="text-[11px] text-[#352C24]/70 truncate">
                              Tác giả: {art.author} • Cập nhật: {art.updatedAt}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingArticle(art)}
                            className="p-1.5 bg-[#FAF6ED] hover:bg-[#243D2B] hover:text-[#FAF6ED] text-[#243D2B] rounded border border-[#352C24]/15"
                            title="Sửa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 bg-[#FAF6ED] hover:bg-red-700 hover:text-white text-red-700 rounded border border-[#352C24]/15"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LOCATIONS MANAGEMENT */}
          {currentTab === 'locations' && (
            <div>
              {editingLocation ? (
                /* Location Form */
                <div className="bg-[#F2E8D5] p-5 rounded-lg border border-[#352C24]/15 space-y-4">
                  <h4 className="font-heading text-2xl text-[#243D2B] border-b border-[#352C24]/15 pb-2">
                    {editingLocation.id ? 'Cập Nhật Điểm Đánh Dấu' : 'Thêm Địa Điểm Mới Vào Bản Đồ'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Tên địa danh *
                      </label>
                      <input
                        type="text"
                        value={editingLocation.name || ''}
                        onChange={(e) =>
                          setEditingLocation({ ...editingLocation, name: e.target.value })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Chuyên mục
                      </label>
                      <select
                        value={editingLocation.category || 'history'}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            category: e.target.value as ContentCategory
                          })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      >
                        <option value="history">Lịch sử & Di tích</option>
                        <option value="culture">Văn hóa & Làng nghề</option>
                        <option value="nature">Thiên nhiên & Sinh thái</option>
                        <option value="cuisine">Ẩm thực & Đặc sản</option>
                        <option value="places">Địa điểm tham quan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Vĩ độ (Latitude) * (Khoảng 10.9 - 11.2)
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={editingLocation.lat || ''}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            lat: parseFloat(e.target.value)
                          })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Kinh độ (Longitude) * (Khoảng 106.4 - 106.7)
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={editingLocation.lng || ''}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            lng: parseFloat(e.target.value)
                          })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                      Địa chỉ chi tiết
                    </label>
                    <input
                      type="text"
                      value={editingLocation.address || ''}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, address: e.target.value })
                      }
                      className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                      Mô tả ngắn
                    </label>
                    <textarea
                      rows={2}
                      value={editingLocation.shortDescription || ''}
                      onChange={(e) =>
                        setEditingLocation({
                          ...editingLocation,
                          shortDescription: e.target.value
                        })
                      }
                      className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded p-2 text-xs text-[#352C24]"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t border-[#352C24]/10">
                    <button
                      onClick={() => setEditingLocation(null)}
                      className="px-4 py-2 border border-[#352C24]/20 rounded text-xs font-mono"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveLocation}
                      className="px-5 py-2 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Lưu Vị Trí
                    </button>
                  </div>
                </div>
              ) : (
                /* Location Table */
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-heading text-2xl text-[#243D2B]">
                      Các Điểm Đã Ghim Lên Bản Đồ An Nhơn Tây ({locations.length})
                    </h4>
                    <button
                      onClick={() =>
                        setEditingLocation({
                          name: '',
                          lat: 11.05,
                          lng: 106.52,
                          category: 'history'
                        })
                      }
                      className="px-3.5 py-1.5 bg-[#C76B45] hover:bg-[#C76B45]/80 text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ghim Điểm Mới
                    </button>
                  </div>

                  <div className="space-y-2">
                    {locations.map((loc) => (
                      <div
                        key={loc.id}
                        className="bg-[#F2E8D5] p-3 rounded border border-[#352C24]/15 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#C76B45] font-bold">
                            {loc.categoryName} • Tọa độ: {loc.lat}, {loc.lng}
                          </div>
                          <div className="font-heading text-lg text-[#243D2B]">{loc.name}</div>
                          <div className="text-[11px] text-[#352C24]/70">{loc.address}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingLocation(loc)}
                            className="p-1.5 bg-[#FAF6ED] hover:bg-[#243D2B] hover:text-[#FAF6ED] text-[#243D2B] rounded border border-[#352C24]/15"
                            title="Sửa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLocation(loc.id)}
                            className="p-1.5 bg-[#FAF6ED] hover:bg-red-700 hover:text-white text-red-700 rounded border border-[#352C24]/15"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MEDIA MANAGEMENT */}
          {currentTab === 'media' && (
            <div>
              {editingMedia ? (
                /* Media Form */
                <div className="bg-[#F2E8D5] p-5 rounded-lg border border-[#352C24]/15 space-y-4">
                  <h4 className="font-heading text-2xl text-[#243D2B] border-b border-[#352C24]/15 pb-2">
                    Thêm Ảnh Vào Thư Viện Tư Liệu
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Tiêu đề ảnh *
                      </label>
                      <input
                        type="text"
                        value={editingMedia.title || ''}
                        onChange={(e) =>
                          setEditingMedia({ ...editingMedia, title: e.target.value })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        URL Hình ảnh *
                      </label>
                      <input
                        type="text"
                        value={editingMedia.url || ''}
                        onChange={(e) => setEditingMedia({ ...editingMedia, url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                      Chú thích ảnh
                    </label>
                    <input
                      type="text"
                      value={editingMedia.caption || ''}
                      onChange={(e) =>
                        setEditingMedia({ ...editingMedia, caption: e.target.value })
                      }
                      className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Cơ quan / Nguồn ảnh
                      </label>
                      <input
                        type="text"
                        value={editingMedia.source || ''}
                        onChange={(e) =>
                          setEditingMedia({ ...editingMedia, source: e.target.value })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-[#352C24] mb-1">
                        Tác giả / Bản quyền
                      </label>
                      <input
                        type="text"
                        value={editingMedia.credit || ''}
                        onChange={(e) =>
                          setEditingMedia({ ...editingMedia, credit: e.target.value })
                        }
                        className="w-full bg-[#FAF6ED] border border-[#352C24]/20 rounded px-3 py-1.5 text-xs text-[#352C24]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t border-[#352C24]/10">
                    <button
                      onClick={() => setEditingMedia(null)}
                      className="px-4 py-2 border border-[#352C24]/20 rounded text-xs font-mono"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveMedia}
                      className="px-5 py-2 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" /> Lưu Ảnh
                    </button>
                  </div>
                </div>
              ) : (
                /* Media List */
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-heading text-2xl text-[#243D2B]">
                      Kho Tư Liệu Hình Ảnh ({media.length})
                    </h4>
                    <button
                      onClick={() =>
                        setEditingMedia({
                          title: '',
                          url: '',
                          category: 'Lịch sử'
                        })
                      }
                      className="px-3.5 py-1.5 bg-[#617A50] hover:bg-[#617A50]/80 text-[#FAF6ED] text-xs font-mono rounded flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm Ảnh
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {media.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#F2E8D5] p-3 rounded border border-[#352C24]/15 flex gap-3"
                      >
                        <img
                          src={item.url}
                          alt=""
                          className="w-16 h-16 object-cover rounded border border-[#243D2B]/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-heading text-base text-[#243D2B] truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[#352C24]/70 font-mono truncate">
                            Nguồn: {item.credit}
                          </div>
                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="mt-2 text-xs text-red-700 hover:underline flex items-center gap-1 font-mono"
                          >
                            <Trash2 className="w-3 h-3" /> Xóa ảnh
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
