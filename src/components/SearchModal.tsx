import React, { useState } from 'react';
import { Article, LocationPoint, MediaItem } from '../types';
import { filterItemsByQuery } from '../utils/rules';
import { Search, X, FileText, MapPin, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  articles: Article[];
  locations: LocationPoint[];
  media: MediaItem[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectLocation: (loc: LocationPoint) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  locations,
  media,
  onClose,
  onSelectArticle,
  onSelectLocation
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'articles' | 'locations' | 'media'>('all');

  const matchedArticles = filterItemsByQuery(articles, query, ['title', 'summary', 'categoryName', 'tags']);
  const matchedLocations = filterItemsByQuery(locations, query, ['name', 'address', 'categoryName', 'shortDescription']);
  const matchedMedia = filterItemsByQuery(media, query, ['title', 'caption', 'category']);

  const totalResults =
    (filterType === 'all' || filterType === 'articles' ? matchedArticles.length : 0) +
    (filterType === 'all' || filterType === 'locations' ? matchedLocations.length : 0) +
    (filterType === 'all' || filterType === 'media' ? matchedMedia.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 md:pt-24 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#243D2B] text-[#FAF6ED] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C76B45]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm địa đạo, đền Bến Dược, bánh tráng, bò tơ, củ mì..."
            className="flex-1 bg-transparent text-[#FAF6ED] placeholder-[#FAF6ED]/50 text-base md:text-lg focus:outline-none font-body"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#FAF6ED]/60 hover:text-[#FAF6ED] font-mono mr-2"
            >
              Xóa
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded text-[#FAF6ED]/80 hover:text-[#FAF6ED]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Type Filter Tabs */}
        <div className="bg-[#F2E8D5] px-4 py-2 border-b border-[#352C24]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'articles', label: `Bài viết (${matchedArticles.length})` },
              { id: 'locations', label: `Địa điểm (${matchedLocations.length})` },
              { id: 'media', label: `Hình ảnh (${matchedMedia.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#243D2B] text-[#FAF6ED] font-bold'
                    : 'bg-[#FAF6ED] text-[#352C24] border border-[#352C24]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[#352C24]/70">
            {query.trim() ? `${totalResults} kết quả tìm thấy` : 'Nhập từ khóa tìm kiếm'}
          </div>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-12 text-[#352C24]/60">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#243D2B]" />
              <div className="font-heading text-xl text-[#243D2B]">Tìm kiếm toàn diện An Nhơn Tây</div>
              <p className="text-xs max-w-sm mx-auto mt-1 font-body">
                Hỗ trợ tìm kiếm tiếng Việt có dấu hoặc không dấu về lịch sử, địa điểm bản đồ, món ăn và tư liệu ảnh.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-[#352C24]/60">
              <div className="font-heading text-xl text-[#243D2B]">Không tìm thấy kết quả</div>
              <p className="text-xs mt-1">
                Không tìm thấy dữ liệu phù hợp với từ khóa "<strong>{query}</strong>". Thử tìm các từ như: <em>Bến Dược, Địa đạo, Bánh tráng, Bò tơ, Trung An</em>.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Articles Section */}
              {(filterType === 'all' || filterType === 'articles') && matchedArticles.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-[#C76B45] mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Bài viết chuyên đề ({matchedArticles.length})
                  </div>
                  <div className="space-y-2">
                    {matchedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="p-3 bg-[#FAF6ED] hover:bg-[#F2E8D5] border border-[#352C24]/15 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.coverImage}
                            alt=""
                            className="w-14 h-14 object-cover rounded shrink-0 border border-[#243D2B]/10"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono text-[#617A50] uppercase font-bold">
                              {art.categoryName}
                            </span>
                            <h4 className="font-heading text-lg text-[#243D2B] group-hover:text-[#C76B45] truncate">
                              {art.title}
                            </h4>
                            <p className="text-xs text-[#352C24]/70 line-clamp-1">
                              {art.summary}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#352C24]/40 group-hover:text-[#C76B45] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations Section */}
              {(filterType === 'all' || filterType === 'locations') && matchedLocations.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-[#617A50] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Địa danh trên bản đồ ({matchedLocations.length})
                  </div>
                  <div className="space-y-2">
                    {matchedLocations.map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => {
                          onSelectLocation(loc);
                          onClose();
                        }}
                        className="p-3 bg-[#FAF6ED] hover:bg-[#F2E8D5] border border-[#352C24]/15 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={loc.coverImage}
                            alt=""
                            className="w-14 h-14 object-cover rounded shrink-0 border border-[#243D2B]/10"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono text-[#C76B45] uppercase font-bold">
                              {loc.categoryName}
                            </span>
                            <h4 className="font-heading text-lg text-[#243D2B] group-hover:text-[#617A50] truncate">
                              {loc.name}
                            </h4>
                            <p className="text-xs text-[#352C24]/70 truncate">
                              📍 {loc.address}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#352C24]/40 group-hover:text-[#617A50] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Section */}
              {(filterType === 'all' || filterType === 'media') && matchedMedia.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase font-bold text-[#243D2B] mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    Tư liệu hình ảnh ({matchedMedia.length})
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {matchedMedia.map((med) => (
                      <div
                        key={med.id}
                        className="bg-[#FAF6ED] border border-[#352C24]/15 rounded p-2 text-xs"
                      >
                        <img
                          src={med.url}
                          alt=""
                          className="w-full h-24 object-cover rounded mb-1"
                        />
                        <div className="font-heading text-sm text-[#243D2B] truncate">
                          {med.title}
                        </div>
                        <div className="text-[10px] text-[#352C24]/60 truncate">
                          Nguồn: {med.credit}
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
