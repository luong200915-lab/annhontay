import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeVietnamese,
  filterItemsByQuery,
  isCuchiRelated,
  validateCoordinates,
  calculatePresentationScore
} from './rules.ts';

test('normalizeVietnamese strips diacritics and converts to lowercase', () => {
  assert.equal(normalizeVietnamese('An Nhơn Tây Đất Thép'), 'cu chi dat thep');
  assert.equal(normalizeVietnamese('Địa Đạo Bến Dược'), 'dia dao ben duoc');
  assert.equal(normalizeVietnamese('Phú Hòa Đông'), 'phu hoa dong');
});

test('isCuchiRelated identifies valid An Nhơn Tây queries', () => {
  assert.equal(isCuchiRelated('Địa đạo An Nhơn Tây có bao nhiêu tầng?'), true);
  assert.equal(isCuchiRelated('Bò tơ An Nhơn Tây quán nào ngon?'), true);
  assert.equal(isCuchiRelated('Làng nghề làm bánh tráng Phú Hòa Đông ở đâu?'), true);
  assert.equal(isCuchiRelated('Đền Bến Dược tưởng niệm ai?'), true);
  assert.equal(isCuchiRelated('Dự án của lớp 12A5 gồm những ai?'), true);
});

test('isCuchiRelated rejects unrelated queries', () => {
  assert.equal(isCuchiRelated('Thủ đô nước Pháp là gì?'), false);
  assert.equal(isCuchiRelated('Viet code python tao game ban sung'), false);
  assert.equal(isCuchiRelated('Hà Nội có bao nhiêu quận huyện?'), false);
  assert.equal(isCuchiRelated('Giá bitcoin hôm nay thế nào?'), false);
});

test('validateCoordinates checks realistic An Nhơn Tây coordinates', () => {
  // Ben Duoc Tunnels: 11.1444, 106.4631 -> Valid
  assert.equal(validateCoordinates(11.1444, 106.4631), true);
  // Paris: 48.8566, 2.3522 -> Invalid
  assert.equal(validateCoordinates(48.8566, 2.3522), false);
  // Invalid numbers
  assert.equal(validateCoordinates(NaN, 106.46), false);
});

test('calculatePresentationScore calculates weighted score correctly', () => {
  const score = calculatePresentationScore({
    content: 10, // 4.0
    design: 9,   // 2.25
    features: 10, // 2.0
    presentation: 9 // 1.35 -> Total: 9.6
  });
  assert.equal(score, 9.6);
});

test('filterItemsByQuery searches multiple fields case and diacritic insensitively', () => {
  const items = [
    { title: 'Địa đạo Bến Dược', category: 'Lịch sử', tags: ['di tich', 'ham chui'] },
    { title: 'Bò tơ Xuân Đào', category: 'Ẩm thực', tags: ['mon ngon', 'dac san'] },
    { title: 'Nông trang Xanh', category: 'Thiên nhiên', tags: ['sinh thai', 'nong nghiep'] }
  ];

  const res1 = filterItemsByQuery(items, 'ben duoc', ['title', 'category']);
  assert.equal(res1.length, 1);
  assert.equal(res1[0].title, 'Địa đạo Bến Dược');

  const res2 = filterItemsByQuery(items, 'am thuc', ['title', 'category']);
  assert.equal(res2.length, 1);
  assert.equal(res2[0].title, 'Bò tơ Xuân Đào');

  const res3 = filterItemsByQuery(items, 'di tich', ['title', 'tags']);
  assert.equal(res3.length, 1);
});
