import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { LocationPoint, ContentCategory, AdministrativeUnit34 } from "../types";
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
  Flag,
  CheckCircle2,
} from "lucide-react";
import { normalizeVietnamese } from "../utils/rules";
import {
  VIETNAM_ADMIN_34,
} from "../data/vietnamAdministrative34";

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

type MapMode = "local" | "vietnam34";

type VietnamFilter =
  | "all"
  | "cities"
  | "merged"
  | "unchanged"
  | "bac-bo"
  | "trung-bo"
  | "nam-bo";

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  onSelectArticle,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Map Mode: "local" (An Nhơn Tây 8 địa điểm) vs "vietnam34" (34 Tỉnh/Thành 2025)
  const [mapMode, setMapMode] = useState<MapMode>("local");

  // Local locations state
  const [selectedCategory, setSelectedCategory] = useState<
    ContentCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState<LocationPoint | null>(
    null,
  );

  // Vietnam 34 admin units state
  const [adminFilter, setAdminFilter] = useState<VietnamFilter>("all");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [activeAdminUnit, setActiveAdminUnit] =
    useState<AdministrativeUnit34 | null>(null);

  const [mapProvider, setMapProvider] = useState<MapProvider>("esri-street");
  const [isMapOpen, setIsMapOpen] = useState(false); // Mặc định trên mobile

  // Default An Nhơn Tây center coordinates: [11.05, 106.52]
  const CUCHI_CENTER: [number, number] = [11.05, 106.52];
  // Vietnam geographic center: [16.0, 107.5]
  const VIETNAM_CENTER: [number, number] = [16.0, 107.5];

  // Tile layer configurations
  const TILE_CONFIGS: Record<
    Exclude<MapProvider, "google-embed">,
    { url: string; maxZoom: number; attribution: string }
  > = {
    "esri-street": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution:
        "&copy; Esri, DeLorme, NAVTEQ | Bản đồ Hành chính Việt Nam 2025 & An Nhơn Tây",
    },
    "esri-satellite": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution:
        "&copy; Esri, Maxar, Earthstar Geographics | Bản đồ An Nhơn Tây & 34 Tỉnh Thành",
    },
    "esri-topo": {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 18,
      attribution:
        "&copy; Esri, USGS, FAO | Bản đồ Địa hình NQ 202/2025/QH15",
    },
    "osm-de": {
      url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | NQ 202/2025/QH15',
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
      const initialCenter =
        mapMode === "vietnam34" ? VIETNAM_CENTER : CUCHI_CENTER;
      const initialZoom =
        mapMode === "vietnam34"
          ? window.innerWidth < 768
            ? 5
            : 6
          : 11;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
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

  // Filter local locations (preserved 100%)
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

  // Filter 34 administrative units
  const filteredAdminUnits = VIETNAM_ADMIN_34.filter((unit) => {
    let matchesFilter = true;
    if (adminFilter === "cities") {
      matchesFilter = unit.type === "city";
    } else if (adminFilter === "merged") {
      matchesFilter = unit.isMerged;
    } else if (adminFilter === "unchanged") {
      matchesFilter = !unit.isMerged;
    } else if (adminFilter === "bac-bo") {
      matchesFilter = unit.region === "Bắc Bộ";
    } else if (adminFilter === "trung-bo") {
      matchesFilter =
        unit.region === "Trung Bộ" || unit.region === "Tây Nguyên";
    } else if (adminFilter === "nam-bo") {
      matchesFilter = unit.region === "Nam Bộ";
    }

    const query = normalizeVietnamese(adminSearchQuery.trim());
    const matchesQuery =
      !query ||
      normalizeVietnamese(unit.name).includes(query) ||
      normalizeVietnamese(unit.shortName).includes(query) ||
      normalizeVietnamese(unit.capital).includes(query) ||
      unit.mergedFrom.some((m) => normalizeVietnamese(m).includes(query));

    return matchesFilter && matchesQuery;
  });

  // Render markers according to active mode
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || mapProvider === "google-embed") return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (mapMode === "local") {
      // MODE 1: Render Local Locations (An Nhơn Tây 8 points)
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
                ${
                  loc.category === "history"
                    ? "🏛️"
                    : loc.category === "cuisine"
                      ? "🍲"
                      : loc.category === "nature"
                        ? "🌿"
                        : "📍"
                }
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
    } else {
      // MODE 2: Render 34 Administrative Units (NQ 202/2025/QH15)
      filteredAdminUnits.forEach((unit) => {
        const isCity = unit.type === "city";
        const isHCM = unit.code === "HCM";

        const customIcon = L.divIcon({
          className: "admin-marker-icon",
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            ">
              <div style="
                background: ${
                  isHCM
                    ? "linear-gradient(135deg, #C76B45 0%, #243D2B 100%)"
                    : isCity
                      ? "#C76B45"
                      : "#243D2B"
                };
                color: #FAF6ED;
                padding: 4px 8px;
                border-radius: 12px;
                font-family: 'DM Sans', sans-serif;
                font-size: 11px;
                font-weight: bold;
                white-space: nowrap;
                border: 2px solid #FAF6ED;
                box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                gap: 4px;
              ">
                <span>${isCity ? "⭐" : "📍"}</span>
                <span>${unit.shortName}</span>
                ${
                  unit.isMerged
                    ? `<span style="font-size: 9px; background: rgba(255,255,255,0.25); padding: 1px 4px; border-radius: 4px;">Mới</span>`
                    : ""
                }
              </div>
              <div style="
                width: 0; 
                height: 0; 
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid ${isCity ? "#C76B45" : "#243D2B"};
              "></div>
            </div>
          `,
          iconSize: [80, 32],
          iconAnchor: [40, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([unit.lat, unit.lng], {
          icon: customIcon,
        }).addTo(map);

        const popupHtml = `
          <div style="max-width: 280px; font-family: 'DM Sans', 'Be Vietnam Pro', sans-serif; background-color: #FAF6ED; border-radius: 6px; padding: 12px; color: #352C24;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: ${
                isCity ? "#C76B45" : "#617A50"
              }; letter-spacing: 0.05em;">
                ${unit.typeName}
              </span>
              <span style="font-size: 9px; font-mono; background: ${
                unit.isMerged ? "#FAF6ED" : "#E5DCC9"
              }; border: 1px solid #617A50; color: #243D2B; padding: 1px 5px; border-radius: 3px;">
                ${unit.isMerged ? "Sáp nhập 2025" : "Giữ nguyên"}
              </span>
            </div>

            <h4 style="margin: 0 0 6px 0; font-size: 17px; font-weight: bold; color: #243D2B; font-family: 'Bebas Neue', 'Oswald', sans-serif; letter-spacing: 0.05em;">
              ${unit.name}
            </h4>

            <div style="font-size: 11px; margin-bottom: 6px; line-height: 1.4; color: #352C24; background: #F2E8D5; padding: 6px 8px; border-radius: 4px;">
              <strong>Căn cứ sắp xếp:</strong> ${unit.mergerSummary}
            </div>

            <div style="font-size: 11px; line-height: 1.5; margin-bottom: 8px;">
              <div>🏛️ <strong>Trung tâm:</strong> ${unit.capital}</div>
              <div>📐 <strong>Diện tích:</strong> ${unit.areaKm2.toLocaleString("vi-VN")} km²</div>
              <div>👥 <strong>Dân số:</strong> ${unit.population.toLocaleString("vi-VN")} người</div>
              <div>🧭 <strong>Vùng:</strong> ${unit.subRegion}</div>
            </div>

            <p style="font-size: 11px; color: #555; line-height: 1.35; margin: 0 0 8px 0;">
              ${unit.description}
            </p>

            ${
              isHCM
                ? `
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed #C76B45;">
                <button 
                  id="btn-goto-cuchi-popup"
                  style="width: 100%; background: #243D2B; color: #FAF6ED; border: none; padding: 6px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  📍 Xem Di tích An Nhơn Tây (Củ Chi) ➔
                </button>
              </div>
            `
                : ""
            }

            <div style="margin-top: 6px; font-size: 10px; color: #617A50; text-align: right;">
              Tra cứu: sapnhap.bando.com.vn
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml);

        marker.on("popupopen", () => {
          if (isHCM) {
            setTimeout(() => {
              const btn = document.getElementById("btn-goto-cuchi-popup");
              if (btn) {
                btn.onclick = () => {
                  handleSwitchToLocal();
                };
              }
            }, 50);
          }
        });

        marker.on("click", () => {
          setActiveAdminUnit(unit);
        });

        markersRef.current[unit.id] = marker;
      });
    }
  }, [mapMode, filteredLocations, filteredAdminUnits, mapProvider]);

  // Handle switching map modes
  const handleSwitchMode = (newMode: MapMode) => {
    setMapMode(newMode);
    setActiveLocation(null);
    setActiveAdminUnit(null);

    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      if (newMode === "vietnam34") {
        const zoom = window.innerWidth < 768 ? 5 : 6;
        map.flyTo(VIETNAM_CENTER, zoom, { duration: 1.2 });
      } else {
        map.flyTo(CUCHI_CENTER, 11, { duration: 1.2 });
      }
    }
  };

  const handleSwitchToLocal = () => {
    setMapMode("local");
    setActiveAdminUnit(null);
    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      map.flyTo(CUCHI_CENTER, 12, { duration: 1.2 });
    }
  };

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

  const handleSelectAdminUnit = (unit: AdministrativeUnit34) => {
    setActiveAdminUnit(unit);
    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      const targetZoom = unit.type === "city" ? 9 : 8;
      map.flyTo([unit.lat, unit.lng], targetZoom, { duration: 1.2 });
      const marker = markersRef.current[unit.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (map && mapProvider !== "google-embed") {
      if (mapMode === "vietnam34") {
        const zoom = window.innerWidth < 768 ? 5 : 6;
        map.flyTo(VIETNAM_CENTER, zoom, { duration: 1 });
        setActiveAdminUnit(null);
      } else {
        map.flyTo(CUCHI_CENTER, 11, { duration: 1 });
        setActiveLocation(null);
      }
    }
  };

  return (
    <div className="w-full bg-[#FAF6ED] border-2 border-[#243D2B] rounded-lg shadow-md overflow-hidden">
      {/* Top Map Mode Switcher & Control Header */}
      <div className="bg-[#243D2B] text-[#FAF6ED] p-3 md:p-4 flex flex-col gap-3 border-b border-[#243D2B]">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
          {/* Title and Mode Indicator */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Compass className="w-5 h-5 text-[#C76B45] shrink-0" />
            <h3 className="font-heading text-xl md:text-2xl tracking-wider uppercase">
              {mapMode === "vietnam34"
                ? "BẢN ĐỒ HÀNH CHÍNH VIỆT NAM (2025)"
                : "BẢN ĐỒ XÃ AN NHƠN TÂY (TP. HỒ CHÍ MINH)"}
            </h3>
            <span className="text-xs bg-[#617A50] px-2 py-0.5 rounded font-mono text-[#FAF6ED]">
              {mapMode === "vietnam34"
                ? `34 Tỉnh/Thành • NQ 202/2025/QH15`
                : `${filteredLocations.length} địa điểm đã xác minh`}
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-[#1C3022] p-1 rounded-md border border-[#617A50]/60">
            <button
              onClick={() => handleSwitchMode("local")}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                mapMode === "local"
                  ? "bg-[#C76B45] text-[#FAF6ED] shadow"
                  : "text-[#FAF6ED]/75 hover:bg-[#FAF6ED]/10"
              }`}
              title="Xem 8 địa điểm di tích, văn hóa, ẩm thực An Nhơn Tây"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Di tích An Nhơn Tây</span>
            </button>

            <button
              onClick={() => handleSwitchMode("vietnam34")}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                mapMode === "vietnam34"
                  ? "bg-[#C76B45] text-[#FAF6ED] shadow"
                  : "text-[#FAF6ED]/75 hover:bg-[#FAF6ED]/10"
              }`}
              title="Xem toàn cảnh 34 đơn vị hành chính cấp tỉnh Việt Nam sau sáp nhập 2025"
            >
              <Flag className="w-3.5 h-3.5 text-yellow-300" />
              <span>34 Tỉnh/Thành 2025</span>
            </button>
          </div>
        </div>

        {/* Map Secondary Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#617A50]/40">
          <div className="flex flex-wrap items-center gap-2">
            {/* Map Provider Selector */}
            <div className="flex items-center gap-1 bg-[#1C3022] p-1 rounded border border-[#617A50]/60 text-xs font-mono">
              <span className="text-[11px] text-[#FAF6ED]/70 px-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#C76B45]" /> Nền:
              </span>
              <button
                onClick={() => setMapProvider("esri-street")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  mapProvider === "esri-street"
                    ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                    : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
                }`}
                title="Bản đồ đường bộ rõ nét"
              >
                Đường bộ
              </button>
              <button
                onClick={() => setMapProvider("esri-satellite")}
                className={`px-2 py-0.5 rounded transition-colors ${
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
                className={`px-2 py-0.5 rounded transition-colors ${
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
                className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                  mapProvider === "google-embed"
                    ? "bg-[#C76B45] text-[#FAF6ED] font-bold"
                    : "text-[#FAF6ED]/80 hover:bg-[#FAF6ED]/10"
                }`}
                title="Google Maps trực tiếp"
              >
                <Globe className="w-3 h-3" />
                Google
              </button>
            </div>

            {/* Reset center button */}
            <button
              onClick={handleResetView}
              className="flex items-center gap-1 bg-[#617A50] hover:bg-[#617A50]/80 text-[#FAF6ED] text-xs font-mono px-2.5 py-1 rounded transition-colors"
              title={
                mapMode === "vietnam34"
                  ? "Đưa bản đồ về toàn cảnh Việt Nam"
                  : "Đưa bản đồ về trung tâm An Nhơn Tây"
              }
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>
                {mapMode === "vietnam34" ? "Toàn cảnh VN" : "Về An Nhơn Tây"}
              </span>
            </button>
          </div>

          {/* Quick Legal & Portal Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#FAF6ED]/80">
            <span className="hidden md:inline bg-[#1C3022] px-2 py-1 rounded border border-[#617A50]/50 text-[11px]">
              Căn cứ: NQ 202/2025/QH15 & sapnhap.bando.com.vn
            </span>
            <button
              onClick={() => setIsMapOpen(!isMapOpen)}
              className="lg:hidden flex items-center gap-1 bg-[#617A50] hover:bg-[#617A50]/80 text-[#FAF6ED] text-xs font-mono px-2.5 py-1 rounded transition-colors"
            >
              <span>{isMapOpen ? "▲ Thu gọn" : "▼ Xem danh sách & bộ lọc"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        className={`${isMapOpen ? "block" : "hidden"} lg:block transition-all duration-300`}
      >
        <div className="bg-[#F2E8D5] px-3 py-2 border-b border-[#352C24]/10 flex flex-wrap gap-2 items-center justify-between">
          {mapMode === "local" ? (
            /* Mode 1 Local Category Chips */
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-bold text-[#352C24] mr-1 uppercase tracking-wider font-mono">
                Phân loại:
              </span>
              {[
                { id: "all", label: "Tất cả (8)" },
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
          ) : (
            /* Mode 2 Vietnam 34 Filter Chips */
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-bold text-[#352C24] mr-1 uppercase tracking-wider font-mono">
                Lọc tỉnh/thành:
              </span>
              {[
                { id: "all", label: "Tất cả 34" },
                { id: "cities", label: "⭐ 6 TP trực thuộc TW" },
                { id: "merged", label: "🔄 23 Đơn vị Sáp nhập" },
                { id: "unchanged", label: "🛡️ 11 Đơn vị Giữ nguyên" },
                { id: "bac-bo", label: "Bắc Bộ" },
                { id: "trung-bo", label: "Trung Bộ & Tây Nguyên" },
                { id: "nam-bo", label: "Nam Bộ" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setAdminFilter(filter.id as any)}
                  className={`text-xs px-2.5 py-1 rounded transition-all font-medium ${
                    adminFilter === filter.id
                      ? "bg-[#243D2B] text-[#FAF6ED] shadow-sm font-semibold"
                      : "bg-[#FAF6ED] text-[#352C24] hover:bg-[#FAF6ED]/80 border border-[#352C24]/20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}

          {/* Quick Search on Map */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#352C24]/60" />
            <input
              type="text"
              value={mapMode === "local" ? searchQuery : adminSearchQuery}
              onChange={(e) => {
                if (mapMode === "local") {
                  setSearchQuery(e.target.value);
                } else {
                  setAdminSearchQuery(e.target.value);
                }
              }}
              placeholder={
                mapMode === "local"
                  ? "Tìm di tích, đặc sản An Nhơn Tây..."
                  : "Tìm trong 34 tỉnh/thành 2025..."
              }
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
                  Chế độ Google Maps
                </div>
              </div>
            ) : (
              /* Leaflet Interactive Map Container */
              <div
                ref={mapContainerRef}
                className="absolute inset-0 z-0 h-full w-full"
              />
            )}

            {/* Quick Helper Floating Badges */}
            <div className="absolute bottom-2 left-2 z-10 bg-[#FAF6ED]/95 backdrop-blur-xs border border-[#243D2B]/30 px-2.5 py-1 rounded text-[11px] font-mono text-[#243D2B] shadow-sm flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#617A50] animate-pulse" />
              <span>
                {mapMode === "vietnam34"
                  ? `Bản đồ 34 Tỉnh/Thành NQ 202/2025/QH15 (${filteredAdminUnits.length} hiển thị)`
                  : `Cụm Di tích An Nhơn Tây (${filteredLocations.length} địa điểm)`}
              </span>
            </div>

            {/* Floating Quick Action between modes */}
            <div className="absolute top-2 left-2 z-10 flex gap-2">
              {mapMode === "vietnam34" ? (
                <button
                  onClick={handleSwitchToLocal}
                  className="bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono px-3 py-1.5 rounded shadow-md border border-[#FAF6ED]/30 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C76B45]" />
                  <span>Về Di tích An Nhơn Tây (Củ Chi)</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSwitchMode("vietnam34")}
                  className="bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono px-3 py-1.5 rounded shadow-md border border-[#FAF6ED]/30 flex items-center gap-1.5 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Mở Bản đồ 34 Tỉnh/Thành 2025</span>
                </button>
              )}
            </div>
          </div>

          {/* Side Directory / Details Drawer (4 cols on large screens) */}
          <div className="lg:col-span-4 bg-[#FAF6ED] border-t lg:border-t-0 lg:border-l border-[#243D2B]/20 flex flex-col h-[420px] lg:h-[540px] overflow-hidden">
            {mapMode === "local" ? (
              /* ================= MODE 1: LOCAL AN NHON TAY ================= */
              activeLocation ? (
                /* Selected Local Location Detailed View */
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
                /* Local Locations Directory List */
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
              )
            ) : (
              /* ================= MODE 2: VIETNAM 34 PROVINCES ================= */
              activeAdminUnit ? (
                /* Selected Administrative Unit Detailed View */
                <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-mono tracking-wider text-[#C76B45] font-bold">
                        {activeAdminUnit.typeName}
                      </span>
                      <button
                        onClick={() => setActiveAdminUnit(null)}
                        className="text-xs text-[#352C24]/60 hover:text-[#352C24] underline"
                      >
                        Đóng xem nhanh
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2 mb-2">
                      <h4 className="font-heading text-2xl text-[#243D2B] leading-tight">
                        {activeAdminUnit.name}
                      </h4>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#617A50]/20 text-[#243D2B] font-bold">
                        {activeAdminUnit.code}
                      </span>
                    </div>

                    <div className="bg-[#F2E8D5] p-3 rounded border border-[#352C24]/15 text-xs text-[#352C24] space-y-2 mb-3">
                      <div className="flex items-center gap-1.5 font-bold text-[#243D2B]">
                        <CheckCircle2 className="w-4 h-4 text-[#617A50]" />
                        <span>
                          {activeAdminUnit.isMerged
                            ? "Đơn vị hình thành sau sáp nhập 2025"
                            : "Đơn vị giữ nguyên không sắp xếp"}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#352C24]">
                        {activeAdminUnit.mergerSummary}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#352C24]/85 mb-3 bg-[#FAF6ED] p-2.5 rounded border border-[#352C24]/10">
                      <div>
                        🏛️ <strong>Trung tâm hành chính:</strong>{" "}
                        {activeAdminUnit.capital}
                      </div>
                      <div>
                        📐 <strong>Diện tích tự nhiên:</strong>{" "}
                        {activeAdminUnit.areaKm2.toLocaleString("vi-VN")} km²
                      </div>
                      <div>
                        👥 <strong>Dân số:</strong>{" "}
                        {activeAdminUnit.population.toLocaleString("vi-VN")}{" "}
                        người
                      </div>
                      <div>
                        🧭 <strong>Vùng địa lý:</strong>{" "}
                        {activeAdminUnit.subRegion} ({activeAdminUnit.region})
                      </div>
                      {activeAdminUnit.adjacentUnits && (
                        <div className="text-[11px] text-[#352C24]/75 pt-1 border-t border-[#352C24]/10">
                          🗺️ <strong>Tiếp giáp:</strong>{" "}
                          {activeAdminUnit.adjacentUnits.join(", ")}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#352C24] leading-relaxed mb-3">
                      {activeAdminUnit.description}
                    </p>

                    {/* Special link if TP. Hồ Chí Minh */}
                    {activeAdminUnit.code === "HCM" && (
                      <div className="bg-[#243D2B]/10 p-2.5 rounded border border-[#243D2B]/30 mb-3">
                        <div className="text-xs font-bold text-[#243D2B] mb-1">
                          📍 Điểm nhấn Xã An Nhơn Tây (Củ Chi):
                        </div>
                        <p className="text-[11px] text-[#352C24] mb-2 leading-relaxed">
                          Nằm trong không gian phát triển mới của TP. Hồ Chí
                          Minh, An Nhơn Tây bảo tồn trọn vẹn 8 di tích và điểm du
                          lịch sinh thái lịch sử đặc biệt.
                        </p>
                        <button
                          onClick={handleSwitchToLocal}
                          className="w-full py-1.5 bg-[#243D2B] hover:bg-[#617A50] text-[#FAF6ED] text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#C76B45]" />
                          Khám phá cụm Di tích An Nhơn Tây
                        </button>
                      </div>
                    )}
                  </div>

                  <a
                    href="https://sapnhap.bando.com.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#617A50] hover:bg-[#243D2B] text-[#FAF6ED] font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    Tra cứu tại sapnhap.bando.com.vn{" "}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                /* 34 Administrative Units List */
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#352C24]/70 mb-1 px-1 flex items-center justify-between">
                    <span>
                      Đơn vị hành chính ({filteredAdminUnits.length}/34)
                    </span>
                    <span className="text-[10px] text-[#617A50]">
                      Bấm để định vị
                    </span>
                  </div>

                  {filteredAdminUnits.map((unit) => (
                    <div
                      key={unit.id}
                      onClick={() => handleSelectAdminUnit(unit)}
                      className="p-2.5 rounded bg-[#FAF6ED] hover:bg-[#F2E8D5] border border-[#352C24]/15 cursor-pointer transition-all hover:border-[#243D2B] flex flex-col gap-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">
                            {unit.type === "city" ? "⭐" : "📍"}
                          </span>
                          <span className="font-heading text-base text-[#243D2B] group-hover:text-[#C76B45]">
                            {unit.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#617A50]/20 text-[#243D2B] font-bold">
                          {unit.code}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#352C24]/70 flex items-center justify-between">
                        <span>🏛️ {unit.capital}</span>
                        <span>{unit.areaKm2.toLocaleString("vi-VN")} km²</span>
                      </div>

                      <p className="text-[10px] text-[#352C24]/80 line-clamp-1 italic">
                        {unit.isMerged
                          ? `Sáp nhập từ: ${unit.mergedFrom.join(", ")}`
                          : "Giữ nguyên địa giới hành chính"}
                      </p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
