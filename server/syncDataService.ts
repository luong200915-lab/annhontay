import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const cuchiDataPath = path.join(rootDir, 'src', 'data', 'cuchiData.ts');
const exportJsonPath = path.join(rootDir, 'src', 'data', 'admin_exported_data.json');

export interface SyncDataPayload {
  articles?: any[];
  locations?: any[];
  media?: any[];
}

export function syncDataToSource(payload: SyncDataPayload) {
  const { articles, locations, media } = payload;

  if (!fs.existsSync(cuchiDataPath)) {
    throw new Error(`File không tồn tại: ${cuchiDataPath}`);
  }

  const currentContent = fs.readFileSync(cuchiDataPath, 'utf8');

  const artMarker = 'export const INITIAL_ARTICLES: Article[] = [';
  const locMarker = 'export const INITIAL_LOCATIONS: LocationPoint[] = [';
  const medMarker = 'export const INITIAL_MEDIA_GALLERY: MediaItem[] = [';
  const membersMarker = 'export const CLASS_12A5_MEMBERS';

  const artIdx = currentContent.indexOf(artMarker);
  const locIdx = currentContent.indexOf(locMarker);
  const medIdx = currentContent.indexOf(medMarker);
  const membersIdx = currentContent.indexOf(membersMarker);

  if (artIdx === -1 || locIdx === -1 || medIdx === -1 || membersIdx === -1) {
    throw new Error('Không tìm thấy các phần khai báo dữ liệu trong src/data/cuchiData.ts');
  }

  const header = currentContent.slice(0, artIdx);
  const footer = currentContent.slice(membersIdx);

  const newArticlesStr =
    articles && Array.isArray(articles) && articles.length > 0
      ? `export const INITIAL_ARTICLES: Article[] = ${JSON.stringify(articles, null, 2)};\n\n`
      : currentContent.slice(artIdx, locIdx);

  const newLocationsStr =
    locations && Array.isArray(locations) && locations.length > 0
      ? `export const INITIAL_LOCATIONS: LocationPoint[] = ${JSON.stringify(locations, null, 2)};\n\n`
      : currentContent.slice(locIdx, medIdx);

  const newMediaStr =
    media && Array.isArray(media) && media.length > 0
      ? `export const INITIAL_MEDIA_GALLERY: MediaItem[] = ${JSON.stringify(media, null, 2)};\n\n`
      : currentContent.slice(medIdx, membersIdx);

  const newContent = header + newArticlesStr + newLocationsStr + newMediaStr + footer;

  fs.writeFileSync(cuchiDataPath, newContent, 'utf8');

  // Save backup JSON snapshot
  fs.writeFileSync(
    exportJsonPath,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        articlesCount: articles?.length || 0,
        locationsCount: locations?.length || 0,
        mediaCount: media?.length || 0,
        articles,
        locations,
        media
      },
      null,
      2
    ),
    'utf8'
  );

  return {
    success: true,
    articlesCount: articles?.length || 0,
    locationsCount: locations?.length || 0,
    mediaCount: media?.length || 0,
    syncedAt: new Date().toISOString()
  };
}
