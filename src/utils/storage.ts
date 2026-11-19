import { Article, LocationPoint, MediaItem, ProjectEvaluation } from '../types';
import { INITIAL_ARTICLES, INITIAL_LOCATIONS, INITIAL_MEDIA_GALLERY } from '../data/cuchiData';

const ARTICLES_KEY = 'annhontay_12a5_articles';
const LOCATIONS_KEY = 'annhontay_12a5_locations';
const MEDIA_KEY = 'annhontay_12a5_media';
const REVIEWS_KEY = 'annhontay_12a5_reviews';

export function getStoredArticles(): Article[] {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) return INITIAL_ARTICLES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_ARTICLES;
    const articleMap = new Map<string, Article>();
    INITIAL_ARTICLES.forEach((a) => articleMap.set(a.id, a));
    parsed.forEach((a: Article) => {
      if (a.id === 'art-3' && a.content && a.content[0] && a.content[0].includes('Đền Tưởng niệm Liệt sĩ')) {
        articleMap.set(a.id, INITIAL_ARTICLES.find(x => x.id === 'art-3') || a);
      } else if (a.id === 'art-8' && a.slug === 'lang-nghe-dan-lat-may-tre-thai-my') {
        articleMap.set(a.id, INITIAL_ARTICLES.find(x => x.id === 'art-8') || a);
      } else {
        articleMap.set(a.id, a);
      }
    });
    INITIAL_ARTICLES.forEach((a) => {
      if (!articleMap.has(a.id)) {
        articleMap.set(a.id, a);
      }
    });
    return Array.from(articleMap.values());
  } catch {
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: Article[]): void {
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (err) {
    console.error('Failed to save articles to localStorage', err);
  }
}

export function getStoredLocations(): LocationPoint[] {
  try {
    const raw = localStorage.getItem(LOCATIONS_KEY);
    if (!raw) return INITIAL_LOCATIONS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_LOCATIONS;
    const locMap = new Map<string, LocationPoint>();
    INITIAL_LOCATIONS.forEach((l) => locMap.set(l.id, l));
    parsed.forEach((l: LocationPoint) => {
      if (l.id === 'loc-5' && l.name && l.name.includes('Thái Mỹ')) {
        locMap.set(l.id, INITIAL_LOCATIONS.find(x => x.id === 'loc-5') || l);
      } else {
        locMap.set(l.id, l);
      }
    });
    INITIAL_LOCATIONS.forEach((l) => {
      if (!locMap.has(l.id)) {
        locMap.set(l.id, l);
      }
    });
    return Array.from(locMap.values());
  } catch {
    return INITIAL_LOCATIONS;
  }
}

export function saveStoredLocations(locations: LocationPoint[]): void {
  try {
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
  } catch (err) {
    console.error('Failed to save locations to localStorage', err);
  }
}

export function getStoredMedia(): MediaItem[] {
  try {
    const raw = localStorage.getItem(MEDIA_KEY);
    if (!raw) return INITIAL_MEDIA_GALLERY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MEDIA_GALLERY;
  } catch {
    return INITIAL_MEDIA_GALLERY;
  }
}

export function saveStoredMedia(media: MediaItem[]): void {
  try {
    localStorage.setItem(MEDIA_KEY, JSON.stringify(media));
  } catch (err) {
    console.error('Failed to save media to localStorage', err);
  }
}

export function getStoredEvaluations(): ProjectEvaluation[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
      return [
        {
          id: 'eval-1',
          evaluatorName: 'Thầy Nguyễn Văn An (GV Lịch Sử)',
          role: 'Giáo viên',
          scores: { content: 10, design: 9.5, features: 10, presentation: 9.5 },
          comment: 'Dự án của nhóm 12A5 rất xuất sắc! Tư liệu lịch sử chính xác, có đối chiếu rõ ràng với Ban Quản lý Di tích Địa đạo An Nhơn Tây. Bản đồ số và Trợ lý AI hoạt động ấn tượng.',
          createdAt: '2026-10-19 14:30'
        },
        {
          id: 'eval-2',
          evaluatorName: 'Cô Lê Thị Mai Hương (GV Địa Lý)',
          role: 'Giáo viên',
          scores: { content: 9.5, design: 10, features: 9.5, presentation: 9.5 },
          comment: 'Bản đồ tương tác với tọa độ các xã An Nhơn Tây rất trực quan, giao diện retro vintage editorial có tính thẩm mỹ và bản sắc riêng rất cao.',
          createdAt: '2026-10-19 15:45'
        }
      ];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredEvaluations(evaluations: ProjectEvaluation[]): void {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(evaluations));
  } catch (err) {
    console.error('Failed to save evaluations', err);
  }
}

export function resetAllDataToDefault(): void {
  localStorage.removeItem(ARTICLES_KEY);
  localStorage.removeItem(LOCATIONS_KEY);
  localStorage.removeItem(MEDIA_KEY);
  localStorage.removeItem(REVIEWS_KEY);
}
