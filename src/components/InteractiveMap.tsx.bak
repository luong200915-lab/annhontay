import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { LocationPoint, ContentCategory } from "../types";
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  ShieldCheck,
  Clock,
  Ticket,
  Layers,
  Globe,
} from "lucide-react";
import { normalizeVietnamese } from "../utils/rules";

interface InteractiveMapProps {
  locations: LocationPoint[];
  onSelectArticle?: (slug: string) => void;
}

type MapProvider =
  | "esri-street"
  | "esri-satellite"
  | "esri-topo"
  | "osm-de"
  | "google-embed";

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  onSelectArticle,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedCategory, setSelectedCategory] = useState<
    ContentCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState<LocationPoint | null>(
    null,
  );
  const [mapProvider, setMapProvider] = useState<MapProvider>("esri-street");
  const [isMapOpen, setIsMapOpen] = useState(false); // Mặc định trên điện thoại là ẩn để dễ cuộn trang

  // Default An Nhơn Tây center coordinates: [11.05, 106.52]
  const CUCHI_CENTER: [number, number] = [11.05, 106.52];

  // Verified free, unwatermarked, high-reliability global map providers
  const TILE_CONFIGS: Record<
    Exclude<MapProvider, "google-embed">,
    { url: string; maxZoom: number; attribution: string }
  > = {
    "esri-street": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution: "&copy; Esri, DeLorme, NAVTEQ | Bản đồ An Nhơn Tây Lớp 12A5",
    },
    "esri-satellite": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution:
        "&copy; Esri, Maxar, Earthstar Geographics | Bản đồ An Nhơn Tây Lớp 12A5",
    },
    "esri-topo": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution: "&copy; Esri, USGS, FAO | Bản đồ An Nhơn Tây Lớp 12A5",
    },
    "osm-de": {
      url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Lớp 12A5 An Nhơn Tây',
    },
  };

  // Initialize or update Leaflet map
  useEffect(() => {
    if (mapProvider === "google-embed") {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: CUCHI_CENTER,
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      const config = TILE_CONFIGS[mapProvider];
      const layer = L.tileLayer(config.url, {
        maxZoom: config.maxZoom,
        attribution: config.attribution,
      }).addTo(map);

      tileLayerRef.current = layer;
      mapInstanceRef.current = map;

      // Invalidate size immediately to guarantee full tile coverage
      setTimeout(() => map.invalidateSize(), 150);
      setTimeout(() => map.invalidateSize(), 500);
      setTimeout(() => map.invalidateSize(), 1000);
    } else {
      // Update tile layer smoothly
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const config = TILE_CONFIGS[mapProvider];
      const layer = L.tileLayer(config.url, {
        maxZoom: config.maxZoom,
        attribution: config.attribution,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = layer;
      mapInstanceRef.current.invalidateSize();
    }

    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mapProvider]);

  // Filter locations
  const filteredLocations = locations.filter((loc) => {
    const matchesCat =
      selectedCategory === "all" || loc.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      normalizeVietnamese(loc.name).includes(
        normalizeVietnamese(searchQuery),
      ) ||
      normalizeVietnamese(loc.address).includes(
        normalizeVietnamese(searchQuery),
      );
    return matchesCat && matchesQuery;
  });

  // Render markers whenever locations change or map is updated
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || mapProvider === "google-embed") return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredLocations.forEach((loc) => {
      const customIcon = L.divIcon({
        className: "custom-pin-icon",
        html: `
          <div style="
            background-color: ${
              loc.category === "history"
                ? "#243D2B"
                : loc.category === "culture"
                  ? "#617A50"
                  : loc.category === "cuisine"
                    ? "#C76B45"
                    : "#352C24"
            };
            color: #FAF6ED;
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #FAF6ED;
            box-shadow: 0 4px 8px rgba(0,0,0,0.35);
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); font-size: 14px;">
              ${loc.category === "history" ? "🏛️" : loc.category === "cuisine" ? "🍲" : loc.category === "nature" ? "🌿" : "📍"}
            </span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(
        map,
      );

      const popupHtml = `
        <div style="max-width: 260px; font-family: 'DM Sans', 'Be Vietnam Pro', sans-serif; background-color: #FAF6ED; border-radius: 4px; overflow: hidden;">
          <img src="${loc.coverImage}" alt="${loc.name}" style="width: 100%; height: 110px; object-fit: cover;" />
          <div style="padding: 10px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #C76B45; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 2px;">
              ${loc.categoryName}
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: bold; color: #243D2B; font-family: 'Bebas Neue', 'Oswald', sans-serif; letter-spacing: 0.05em;">
              ${loc.name}
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #352C24; line-height: 1.35;">
              ${loc.shortDescription}
            </p>
            <div style="font-size: 11px; color: #617A50; margin-bottom: 6px;">
              📍 ${loc.address}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E5DCC9; padding-top: 6px; font-size: 11px;">
              <span style="color: #243D2B; font-weight: 600;">✓ Đã xác minh</span>
              <span style="color: #C76B45; font-weight: bold;">Xem chi tiết ➔</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("click", () => {
        setActiveLocation(loc);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [filteredLocations, mapProvider]);

  const handleSelectLocation = (loc: LocationPoint) => {
    setActiveLocation(loc);
    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      map.flyTo([loc.lat, loc.lng], 14, { duration: 1.2 });
      const marker = markersRef.current[loc.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      map.flyTo(CUCHI_CENTER, 11, { duration: 1 });
      setActiveLocation(null);
    }
  };

  return (
    <div className="w-full bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-md overflow-hidden">
      {/* Map Control Bar */}
      <div className="bg-[#243D2B] text-[#FAF6ED] p-3 md:p-4 flex flex-col md:flex-row gap-3 justify-between items-center border-b border-[#243D2B]">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#C76B45]" />
          <h3 className="font-heading text-xl md:text-2xl tracking-wider uppercase">
            BẢN ĐỒ XÃ AN NHƠN TÂY
          </h3>
          <span className="text-xs bg-[#617A50] px-2 py-0.5 rounded font-mono text-[#FAF6ED]">
            {filteredLocations.length} địa điểm
          </span>
        </div>

        {/* Map Provider Selector (Đổi sang bản đồ khác) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-[#1C3022] p-1 rounded border border-[#617A50]/60 text-xs font-mono">
            <span className="text-[11px] text-[#FAF6ED]/70 px-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#C76B45]" /> Chọn nền:
            </span>
            <button
              onClick={() => setMapProvider("esri-street")}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapProvider === "esri-street"
                  ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                  : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
              }`}
              title="Bản đồ đường bộ & địa danh An Nhơn Tây rõ nét"
            >
              Đường bộ
            </button>
            <button
              onClick={() => setMapProvider("esri-satellite")}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapProvider === "esri-satellite"
                  ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                  : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
              }`}
              title="Bản đồ không ảnh vệ tinh chân thực"
            >
              Vệ tinh
            </button>
            <button
              onClick={() => setMapProvider("esri-topo")}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapProvider === "esri-topo"
                  ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                  : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
              }`}
              title="Bản đồ địa hình tự nhiên"
            >
              Địa hình
            </button>
            <button
              onClick={() => setMapProvider("google-embed")}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                mapProvider === "google-embed"
                  ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                  : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
              }`}
              title="Chế độ Google Maps trực tiếp"
            >
              <Globe className="w-3 h-3" />
              Google Maps
            </button>
          </div>

          {/* Reset center button */}
          <button
            onClick={handleResetView}
            className="flex items-center gap-1 bg-[#617A50] hover:bg-[#617A50]/80 text-[#FAF6ED] text-xs font-mono px-2.5 py-1.5 rounded transition-colors"
            title="Đưa bản đồ về trung tâm An Nhơn Tây"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Về trung tâm</span>
          </button>

          <button
            onClick={() => setIsMapOpen(!isMapOpen)}
            className="lg:hidden flex items-center gap-1 bg-[#617A50] hover:bg-[#617A50]/80 text-[#FAF6ED] text-xs font-mono px-2.5 py-1.5 rounded transition-colors"
          >
            <span>
              {isMapOpen
                ? "▲ Thu gọn bản đồ"
                : "▼ Xem bản đồ tương tác (Di tích & Ẩm thực)"}
            </span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips & Search Bar */}
      <div
        className={`${isMapOpen ? "block" : "hidden"} lg:block transition-all duration-300`}
      >
        <div className="bg-[#F2E8D5] px-3 py-2 border-b border-[#352C24]/10 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-bold text-[#352C24] mr-1 uppercase tracking-wider font-mono">
              Phân loại:
            </span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "history", label: "🏛️ Lịch sử & Di tích" },
              { id: "culture", label: "🎋 Văn hóa & Làng nghề" },
              { id: "nature", label: "🌿 Thiên nhiên Sinh thái" },
              { id: "cuisine", label: "🍲 Ẩm thực Đặc sản" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`text-xs px-2.5 py-1 rounded transition-all font-medium ${
                  selectedCategory === cat.id
                    ? "bg-[#243D2B] text-[#FAF6ED] shadow-sm font-semibold"
                    : "bg-[#FAF6ED] text-[#352C24] hover:bg-[#FAF6ED]/80 border border-[#352C24]/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search on Map */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#352C24]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm địa danh An Nhơn Tây..."
              className="w-full bg-[#FAF6ED] text-[#352C24] pl-8 pr-3 py-1.5 text-xs rounded border border-[#352C24]/20 focus:outline-none focus:border-[#243D2B]"
            />
          </div>
        </div>

        {/* Main Grid: Map & Side Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Map Surface (8 cols on large screens) */}
          <div className="lg:col-span-8 relative min-h-[420px] lg:min-h-[540px] bg-[#E5DCC9]">
            {mapProvider === "google-embed" ? (
              /* Google Maps Embed Option */
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  title="Bản đồ An Nhơn Tây Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125372.48421832049!2d106.4385966453913!3d11.026775317770857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d5386dbd78e7%3A0x63346d0a7a0bbfb7!2zQ-G7pyBDaGksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute top-2 right-2 bg-[#243D2B]/90 text-[#FAF6ED] text-[11px] font-mono px-3 py-1 rounded shadow pointer-events-none">
                  Chế độ Google Maps An Nhơn Tây
                </div>
              </div>
            ) : (
              /* Leaflet Interactive Map Container with Selected Tile Layer */
              <div
                ref={mapContainerRef}
                className="absolute inset-0 z-0 h-full w-full"
              />
            )}

            {/* Quick Helper Floating Badge */}
            <div className="absolute bottom-2 left-2 z-10 bg-[#FAF6ED]/95 backdrop-blur-xs border border-[#243D2B]/30 px-2.5 py-1 rounded text-[11px] font-mono text-[#243D2B] shadow-sm flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#617A50] animate-pulse" />
              <span>
                Nền:{" "}
                {mapProvider === "esri-street"
                  ? "Đường Bộ Esri"
                  : mapProvider === "esri-satellite"
                    ? "Vệ Tinh Esri"
                    : mapProvider === "esri-topo"
                      ? "Địa Hình Esri"
                      : "Google Maps"}
              </span>
            </div>
          </div>

          {/* Places List / Details Drawer (4 cols on large screens) */}
          <div className="lg:col-span-4 bg-[#FAF6ED] border-t lg:border-t-0 lg:border-l border-[#243D2B]/20 flex flex-col h-[420px] lg:h-[540px] overflow-hidden">
            {activeLocation ? (
              /* Selected Location Detailed View */
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-[#C76B45] font-bold">
                      {activeLocation.categoryName}
                    </span>
                    <button
                      onClick={() => setActiveLocation(null)}
                      className="text-xs text-[#352C24]/60 hover:text-[#352C24] underline"
                    >
                      Đóng xem nhanh
                    </button>
                  </div>

                  <img
                    src={activeLocation.coverImage}
                    alt={activeLocation.name}
                    className="w-full h-40 object-cover rounded border border-[#243D2B]/20 mb-3"
                  />

                  <h4 className="font-heading text-2xl text-[#243D2B] leading-tight mb-2">
                    {activeLocation.name}
                  </h4>

                  <p className="text-xs text-[#352C24] leading-relaxed mb-3">
                    {activeLocation.fullDescription}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#352C24]/80 mb-4 bg-[#F2E8D5] p-2.5 rounded border border-[#352C24]/10">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C76B45] shrink-0 mt-0.5" />
                      <span>{activeLocation.address}</span>
                    </div>
                    {activeLocation.openingHours && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#617A50] shrink-0" />
                        <span>{activeLocation.openingHours}</span>
                      </div>
                    )}
                    {activeLocation.ticketPrice && (
                      <div className="flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-[#617A50] shrink-0" />
                        <span>{activeLocation.ticketPrice}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#243D2B] font-semibold pt-1 border-t border-[#352C24]/10">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#617A50]" />
                      <span>
                        Tọa độ xác minh: {activeLocation.lat},{" "}
                        {activeLocation.lng}
                      </span>
                    </div>
                  </div>
                </div>

                {activeLocation.articleSlug && onSelectArticle && (
                  <button
                    onClick={() => onSelectArticle(activeLocation.articleSlug!)}
                    className="w-full py-2 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] font-heading text-lg tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    Đọc Bài Viết Chuyên Đề <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              /* Locations Directory List */
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#352C24]/70 mb-1 px-1 flex items-center justify-between">
                  <span>Danh sách địa điểm ({filteredLocations.length})</span>
                  <span className="text-[10px] text-[#617A50]">
                    Bấm để định vị
                  </span>
                </div>
                {filteredLocations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className="p-2.5 rounded bg-[#FAF6ED] hover:bg-[#F2E8D5] border border-[#352C24]/15 cursor-pointer transition-all hover:border-[#243D2B] flex gap-3 group"
                  >
                    <img
                      src={loc.coverImage}
                      alt={loc.name}
                      className="w-16 h-16 object-cover rounded shrink-0 border border-[#243D2B]/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono uppercase text-[#C76B45] font-bold">
                        {loc.categoryName}
                      </div>
                      <div className="font-heading text-base text-[#243D2B] group-hover:text-[#C76B45] truncate">
                        {loc.name}
                      </div>
                      <p className="text-[11px] text-[#352C24]/80 line-clamp-2 leading-tight">
                        {loc.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
