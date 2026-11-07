/**
 * Pure helper and business logic functions for An Nhơn Tây project
 * Decoupled from UI components for unit testing.
 */

// Normalized Vietnamese string for search (removes diacritics)
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

/**
 * Filter items by query matching across specified string fields
 */
export function filterItemsByQuery<T extends Record<string, any>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query || !query.trim()) return items;
  const normalizedQuery = normalizeVietnamese(query);

  return items.filter((item) => {
    return fields.some((field) => {
      const val = item[field];
      if (typeof val === 'string') {
        return normalizeVietnamese(val).includes(normalizedQuery);
      }
      if (Array.isArray(val)) {
        return val.some(
          (sub: unknown) => typeof sub === 'string' && normalizeVietnamese(sub).includes(normalizedQuery)
        );
      }
      return false;
    });
  });
}

/**
 * Check whether a user question is strictly related to An Nhơn Tây
 * Returns true if related, false if off-topic.
 */
export function isCuchiRelated(question: string): boolean {
  if (!question || !question.trim()) return false;
  const q = normalizeVietnamese(question);

  const cuchiKeywords = [
    'cu chi',
    'dia dao',
    'ben duoc',
    'ben dinh',
    'phu my hung',
    'nhuan duc',
    'phu hoa dong',
    'thai my',
    'trung an',
    'an nhon tay',
    'tan an hoi',
    'tan phu trung',
    'binh my',
    'pham van coi',
    'bo to',
    'cu mi',
    'khoai mi',
    'banh trang',
    'nuoc mia sau rieng',
    'dat thep',
    'thanh dong',
    'tam giac sat',
    'vua dia dao',
    'nam phong',
    'green noen',
    'mot thoang viet nam',
    'song sai gon',
    'chien khu',
    'khang chien',
    'anh hung',
    '12a5',
    'lop 12a5',
    'nhom thuc hien',
    'tran anh',
    'du an cu chi',
    'du lich cu chi',
    'tham quan cu chi',
    'dac san cu chi',
    'mon an cu chi',
    'lang nghe',
    'dan lat',
    'kinh nghiem di cu chi',
    'ban do cu chi',
    'toa do',
    'ho chi minh',
    'sai gon',
    'ven do'
  ];

  // Specific negative triggers (completely off-topic topics)
  const offTopicKeywords = [
    'paris',
    'tokyo',
    'new york',
    'viet code python',
    'viet code javascript',
    'giai toan',
    'dao ham',
    'tich phan',
    'thu do nuoc phap',
    'ha noi o dau',
    'chung khoan my',
    'crypto',
    'bitcoin',
    'bong da ngoai hang anh'
  ];

  for (const off of offTopicKeywords) {
    if (q.includes(off)) {
      // If it contains cuchi explicitly alongside it, allow it, otherwise reject
      if (!q.includes('cu chi')) {
        return false;
      }
    }
  }

  return cuchiKeywords.some((kw) => q.includes(kw));
}

/**
 * Coordinates validator for An Nhơn Tây and surrounding HCMC region
 * Latitude should roughly be 10.7 - 11.3, Longitude 106.3 - 106.8
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  return lat >= 10.5 && lat <= 11.5 && lng >= 106.2 && lng <= 107.0;
}

/**
 * Calculate presentation evaluation weighted score
 * Max 10.0 scale: Content 40%, Design 25%, Features 20%, Presentation 15%
 */
export function calculatePresentationScore(scores: {
  content: number;
  design: number;
  features: number;
  presentation: number;
}): number {
  const c = Math.max(0, Math.min(10, scores.content || 0));
  const d = Math.max(0, Math.min(10, scores.design || 0));
  const f = Math.max(0, Math.min(10, scores.features || 0));
  const p = Math.max(0, Math.min(10, scores.presentation || 0));

  const total = c * 0.4 + d * 0.25 + f * 0.2 + p * 0.15;
  return Math.round(total * 10) / 10;
}
