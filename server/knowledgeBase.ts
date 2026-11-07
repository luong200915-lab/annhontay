/**
 * Cơ sở tri thức chuẩn xác về Huyện Củ Chi cũ (trước khi thay đổi đơn vị hành chính)
 * Phục vụ cơ chế RAG (Retrieval-Augmented Generation) cho Trợ lý AI.
 */

export interface KnowledgeDocument {
  id: string;
  category: 'history' | 'geography_admin' | 'culture' | 'tourism' | 'people' | 'economy' | 'cuisine' | 'education';
  title: string;
  keywords: string[];
  content: string;
  source: string;
  verifiedDate: string;
}

export const CUCHI_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  // 1. LỊCH SỬ
  {
    id: 'hist-1',
    category: 'history',
    title: 'Nguồn gốc và quá trình hình thành Địa đạo Củ Chi (1948 - 1968)',
    keywords: ['dia dao', 'lich su dia dao', 'khoi dau', 'nam 1948', 'tan phu trung', 'phuoc vinh an', 'khang chien chong phap', 'chong my'],
    content: `Địa đạo Củ Chi bắt đầu được hình thành vào khoảng năm 1948 trong thời kỳ kháng chiến chống thực dân Pháp, khởi đầu tại hai xã Tân Phú Trung và Phước Vĩnh An. Ban đầu, đây chỉ là những đoạn hầm cá nhân ngắn, hầm bí mật để cán bộ, du kích trú ẩn và cất giấu tài liệu.
Bước sang giai đoạn kháng chiến chống Mỹ (từ năm 1961), quân và dân Củ Chi đã phát triển hệ thống hầm thành mạng lưới liên hoàn 'ấp liền ấp, xã liền xã'. Trong giai đoạn 1963 - 1968, tổng chiều dài địa đạo đạt hơn 250 km, xuyên sâu trong lòng đất với cấu trúc 3 tầng:
- Tầng 1 (sâu khoảng 3m): Chống được đạn pháo và sức nặng của xe tăng, xe bọc thép.
- Tầng 2 (sâu khoảng 6m): Chống được bom cỡ nhỏ và đạn công phá.
- Tầng 3 (sâu từ 8m đến 12m): Chống được các loại bom xuyên lớn.
Hệ thống có đầy đủ phòng họp, bệnh xá dã chiến, giếng nước, kho lương thực, xưởng chế tạo vũ khí và hệ thống bếp Hoàng Cầm giấu khói tài tình.`,
    source: 'Ban Quản lý Di tích Lịch sử Địa đạo Củ Chi & Bảo tàng Lịch sử Quân sự Việt Nam',
    verifiedDate: '2024'
  },
  {
    id: 'hist-2',
    category: 'history',
    title: 'Danh hiệu Đất Thép Thành Đồng và Xếp hạng Di tích Quốc gia Đặc biệt',
    keywords: ['dat thep thanh dong', 'danh hieu', '17/9/1967', 'huan chuong', 'di tich quoc gia dac biet', '2015', 'quyet dinh 2367'],
    content: `Với tinh thần kiên cường bám trụ 'Một tấc không đi, một ly không rời', ngày 17/9/1967, tại Đại hội Anh hùng, Chiến sĩ thi đua và Dũng sĩ các lực lượng vũ trang nhân dân giải phóng toàn miền Nam lần thứ II, quân và dân Củ Chi đã vinh dự được Ủy ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam trao tặng danh hiệu vinh dự cao quý: 'ĐẤT THÉP THÀNH ĐỒNG' cùng Huân chương Thành đồng hạng Ba.
Vào ngày 23/12/2015, Thủ tướng Chính phủ nước CHXHCN Việt Nam đã ban hành Quyết định số 2367/QĐ-TTg chính thức xếp hạng Di tích Lịch sử Địa đạo Củ Chi (bao gồm Bến Dược và Bến Đình) là Di tích Quốc gia Đặc biệt.`,
    source: 'Hồ sơ Di tích Quốc gia Đặc biệt (Quyết định số 2367/QĐ-TTg)',
    verifiedDate: '2015'
  },
  {
    id: 'hist-3',
    category: 'history',
    title: 'Đền Tưởng niệm Liệt sĩ Bến Dược',
    keywords: ['den ben duoc', 'liet si', '44752', 'tran van giau', 'van bia', 'song sai gon', 'thap 9 tang'],
    content: `Đền Tưởng niệm Liệt sĩ Bến Dược tọa lạc tại xã Phú Mỹ Hưng, huyện Củ Chi, được khởi công xây dựng vào ngày 19/5/1993 và khánh thành giai đoạn 1 vào ngày 19/12/1995 bên bờ sông Sài Gòn.
Đây là công trình lịch sử - văn hóa tưởng niệm lớn nhất khu vực Nam Bộ, nơi tạc tên trang trọng của 44.752 Anh hùng Liệt sĩ (trong đó có các Mẹ Việt Nam Anh hùng, liệt sĩ của cả nước hy sinh trên chiến trường Sài Gòn - Chợ Lớn - Gia Định qua hai cuộc kháng chiến).
Đền có tháp 9 tầng cao 39m, gian chính điện trang nghiêm và bản Văn bia Bến Dược bất hủ do Giáo sư Trần Văn Giàu phụng thảo với những câu từ hào hùng: 'Máu đọng ngàn năm chưa dễ xóa / Bia truyền muôn thuở mãi còn ghi'.`,
    source: 'Ban Quản lý Khu Di tích Bến Dược & Sở Văn hóa và Thể thao TP.HCM',
    verifiedDate: '2024'
  },

  // 2. ĐỊA LÝ & HÀNH CHÍNH (HUYỆN CỦ CHI CŨ)
  {
    id: 'geo-1',
    category: 'geography_admin',
    title: 'Vị trí địa lý, địa hình và ranh giới hành chính Huyện Củ Chi cũ',
    keywords: ['dia ly', 'ranh gioi', 'vi tri', 'dien tich', '434', 'song sai gon', 'tay bac', 'binh duong', 'tay ninh', 'long an', 'hoc mon'],
    content: `Huyện Củ Chi trước khi thay đổi đơn vị hành chính là huyện ngoại thành nằm ở cửa ngõ phía Tây Bắc của Thành phố Hồ Chí Minh:
- Diện tích tự nhiên: 434,77 km² (chiếm gần 1/4 diện tích toàn TP.HCM).
- Tọa độ địa lý: Khoảng 10°53′ – 11°10′ vĩ độ Bắc và 106°22′ – 106°40′ kinh độ Đông.
- Tiếp giáp địa giới:
  + Phía Đông và Đông Bắc: Giáp tỉnh Bình Dương (thị xã Bến Cát, huyện Dầu Tiếng, TP. Thủ Dầu Một) qua sông Sài Gòn.
  + Phía Tây và Tây Bắc: Giáp tỉnh Tây Ninh (thị xã Trảng Bàng).
  + Phía Tây Nam: Giáp tỉnh Long An (huyện Đức Hòa).
  + Phía Nam: Giáp huyện Hóc Môn (TP.HCM).
- Địa hình: Vùng bán sơn địa đồi gò chuyển tiếp từ cao nguyên Đông Nam Bộ xuống đồng bằng sông Cửu Long, lượn sóng thoai thoải từ Bắc xuống Nam, cao độ trung bình 8m - 35m so với mực nước biển.`,
    source: 'Cổng thông tin điện tử UBND Huyện Củ Chi & Niên giám Địa bạ TP.HCM',
    verifiedDate: '2024'
  },
  {
    id: 'geo-2',
    category: 'geography_admin',
    title: 'Đặc điểm địa chất đất sét đá ong của Củ Chi',
    keywords: ['dia chat', 'dat set', 'da ong', 'laterite', 'tai sao khong sap', 'cau truc dat'],
    content: `Địa chất vùng Củ Chi có cấu tạo đặc biệt: bề mặt là tầng đất xám phù sa cổ, bên dưới là tầng đất sét pha đá ong (Laterite) và sạn sỏi phong hóa.
Đặc tính khoa học của tầng đất sét đá ong Củ Chi:
1. Khi ở sâu trong lòng đất và có độ ẩm, đất có tính dẻo mềm vừa phải, rất thuận lợi để dùng cuốc chim xắn, khoét thành hầm, ngách và giếng.
2. Khi tiếp xúc với không khí khô ráo, vách hầm thoát ẩm, đất sét se lại và oxit sắt trong đá ong kết khối, làm vách hầm trở nên rắn chắc như đá đúc hoặc bê tông tự nhiên.
Chính đặc tính địa chất độc nhất vô nhị này đã giải thích vì sao hàng trăm kilômét địa đạo Củ Chi dù hoàn toàn không dùng sắt thép hay xi măng vẫn đứng vững trước hàng ngàn tấn bom đạn, pháo kích và xe tăng càn quét.`,
    source: 'Viện Địa lý Tài nguyên TP.HCM & Viện Khoa học Xã hội Vùng Nam Bộ',
    verifiedDate: '2023'
  },
  {
    id: 'geo-3',
    category: 'geography_admin',
    title: '21 đơn vị hành chính trực thuộc Huyện Củ Chi cũ',
    keywords: ['don vi hanh chinh', 'xa', 'thi tran', '21 xa thi tran', 'danh sach xa', 'cu chi cu'],
    content: `Trước khi có các sự thay đổi hành chính, huyện Củ Chi gồm 21 đơn vị hành chính cấp xã, gồm 1 thị trấn và 20 xã:
1. Thị trấn Củ Chi (trung tâm kinh tế - hành chính huyện)
2. Xã Phú Mỹ Hưng (nơi có Địa đạo Bến Dược, Đền Bến Dược)
3. Xã Nhuận Đức (nơi có Địa đạo Bến Đình - Căn cứ Huyện ủy)
4. Xã An Nhơn Tây (vùng căn cứ địa kháng chiến, liền kề Bến Dược)
5. Xã Phú Hòa Đông (Làng nghề bánh tráng truyền thống trăm năm)
6. Xã Thái Mỹ (Làng nghề đan lát tre nứa nổi tiếng)
7. Xã Phạm Văn Cội (Khu Nông nghiệp Công nghệ cao TP.HCM)
8. Xã Trung An (Vùng sinh thái vườn cây ăn trái ven sông Sài Gòn)
9. Xã Tân Phú Trung (Nơi khởi phát đào địa đạo năm 1948)
10. Xã Phước Vĩnh An (Cùng Tân Phú Trung khởi nguồn đào hầm địa đạo)
11. Xã Tân Thông Hội (Nghề mành trúc, vùng nước mía sầu riêng Quốc lộ 22)
12. Xã An Phú
13. Xã Trung Lập Thượng
14. Xã Trung Lập Hạ
15. Xã Phước Thạnh
16. Xã Phước Hiệp
17. Xã Tân An Hội
18. Xã Tân Thạnh Tây
19. Xã Hòa Phú
20. Xã Tân Thạnh Đông
21. Xã Bình Mỹ (tiếp giáp sông Sài Gòn và Hóc Môn).`,
    source: 'UBND Huyện Củ Chi & Sở Nội vụ TP. Hồ Chí Minh',
    verifiedDate: '2024'
  },

  // 3. DU LỊCH & ĐỊA ĐIỂM THAM QUAN
  {
    id: 'tour-1',
    category: 'tourism',
    title: 'So sánh Địa đạo Bến Dược và Địa đạo Bến Đình',
    keywords: ['ben duoc', 'ben dinh', 'khac nhau ben duoc ben dinh', 'so sanh', 'dia dao'],
    content: `Hai cụm địa đạo chính mở cửa cho khách tham quan tại Củ Chi có chức năng lịch sử và vị trí khác nhau:
1. Địa đạo Bến Dược (thuộc xã Phú Mỹ Hưng, cách trung tâm TP.HCM khoảng 70km về phía Tây Bắc):
- Căn cứ của Khu ủy và Bộ Tư lệnh Quân khu Sài Gòn - Gia Định.
- Mang tính chất căn cứ chỉ huy chiến lược toàn miền.
- Khuôn viên rộng lớn, giữ nguyên nét rừng chồi nguyên sinh, gắn liền với Đền Tưởng niệm Liệt sĩ Bến Dược (44.752 liệt sĩ) và hồ mô phỏng Biển Đông.
2. Địa đạo Bến Đình (thuộc xã Nhuận Đức, cách trung tâm TP.HCM khoảng 50km, gần hơn Bến Dược khoảng 13km):
- Căn cứ của Huyện ủy Củ Chi trong chiến tranh.
- Thuận tiện di chuyển hơn cho các tour du lịch ngắn ngày, nằm gần sông Sài Gòn.
- Có khu trải nghiệm bắn súng thể thao quốc phòng, mô hình tái hiện cuộc sống chiến đấu dưới hầm và các hố chông mìn, bẫy ngầm thời chiến.`,
    source: 'Ban Quản lý Di tích Lịch sử Địa đạo Củ Chi (diadaocuchi.com.vn)',
    verifiedDate: '2024'
  },
  {
    id: 'tour-2',
    category: 'tourism',
    title: 'Thông tin tham quan, giờ mở cửa và giá vé Địa đạo Củ Chi',
    keywords: ['gio mo cua', 'gia ve', 'quy dinh tham quan', 'huong dan di', 'lich trinh'],
    content: `Thông tin tham quan Địa đạo Củ Chi (cả 2 điểm Bến Dược và Bến Đình):
- Giờ mở cửa đón khách: Từ 7:00 đến 17:00 tất cả các ngày trong tuần (kể cả lễ, Tết).
- Mức giá vé tham khảo:
  + Khách Việt Nam: Khoảng 35.000 VNĐ / lượt.
  + Học sinh, sinh viên, người cao tuổi, cựu chiến binh, người có công: Có chính sách miễn hoặc giảm giá theo quy định.
  + Khách quốc tế: Khoảng 70.000 - 125.000 VNĐ / lượt (bao gồm phí thuyết minh và dịch vụ trải nghiệm).
  + Phí trải nghiệm bắn súng thể thao quốc phòng: Tính tiền đạn riêng theo bảng giá tại chỗ.
Lưu ý quan trọng: Giá vé và dịch vụ có thể điều chỉnh theo từng thời kỳ của ban quản lý. Du khách nên kiểm tra lại thông tin mới nhất trên cổng thông tin chính thức diadaocuchi.com.vn trước chuyến đi.`,
    source: 'Cổng thông tin Ban Quản lý Di tích Địa đạo Củ Chi (diadaocuchi.com.vn)',
    verifiedDate: '2024'
  },
  {
    id: 'tour-3',
    category: 'tourism',
    title: 'Các điểm du lịch sinh thái, văn hóa tiêu biểu tại Củ Chi',
    keywords: ['du lich sinh thai', 'green noen', 'mot thoang viet nam', 'vuon trai cay trung an', 'dia diem tham quan'],
    content: `Ngoài di tích lịch sử địa đạo, Củ Chi còn có các điểm du lịch sinh thái - làng nghề hấp dẫn:
1. Khu Nông trang Xanh Green Noen (xã An Nhơn Tây): Nông trại sinh thái rộng hơn 20ha, trải nghiệm quy trình nuôi bò sữa, nấm sạch, vắt sữa bò và cắm trại ngoài trời.
2. Làng du lịch Một Thoáng Việt Nam (xã An Nhơn Tây): Khu bảo tồn văn hóa rộng gần 20ha ven sông Sài Gòn, tái hiện kiến trúc nhà ở 3 miền đất nước, nghề làm giấy điệp, dệt lụa tơ tằm, đan lát.
3. Vườn trái cây sinh thái Trung An (xã Trung An): Vùng đất bãi bồi trù phú ven sông với các miệt vườn chôm chôm, măng cụt, dâu da đỏ lửa từ tháng 5 đến tháng 8 hàng năm.
4. Chùa Giác Hưng (xã An Phú) và Đình Tân Thông (xã Tân Thông Hội): Các di tích kiến trúc tôn giáo, tín ngưỡng cổ kính của vùng đất Nam Bộ.`,
    source: 'Sở Du lịch Thành phố Hồ Chí Minh',
    verifiedDate: '2024'
  },

  // 4. VĂN HÓA, LÀNG NGHỀ & ĐỜI SỐNG
  {
    id: 'cult-1',
    category: 'culture',
    title: 'Làng nghề Bánh tráng Phú Hòa Đông',
    keywords: ['banh trang', 'phu hoa dong', 'lang nghe', 'truyen thong', 'xuat khau'],
    content: `Làng nghề Bánh tráng Phú Hòa Đông (xã Phú Hòa Đông, huyện Củ Chi) có bề dày lịch sử hơn 100 năm, được hình thành từ cuối thế kỷ 19.
- Đặc trưng: Bánh tráng Phú Hòa Đông được làm từ gạo nàng xoan, gạo tấm mới pha với bột mì, tráng mỏng đều tay, phơi trên phiên nứa dưới nắng mai. Bánh có độ dẻo dai tự nhiên, không bị chua, nhúng nước không bị rách bở, cuốn rau rừng thịt luộc rất ngon miệng.
- Hiện nay, làng nghề đã áp dụng hệ thống máy sấy, lò hơi hiện đại bên cạnh các lò tráng thủ công, sản phẩm xuất khẩu đi hơn 30 quốc gia trên thế giới như Mỹ, Nhật Bản, châu Âu.`,
    source: 'UBND Huyện Củ Chi & Sở Công thương TP.HCM',
    verifiedDate: '2024'
  },
  {
    id: 'cult-2',
    category: 'culture',
    title: 'Làng nghề đan lát tre nứa Thái Mỹ và mành trúc Tân Thông Hội',
    keywords: ['dan lat', 'thai my', 'manh truc', 'tan thong hoi', 'thu cong my nghe'],
    content: `1. Làng nghề đan lát Thái Mỹ (xã Thái Mỹ):
- Nghề truyền thống lâu đời gắn liền với cây tre, cây trúc trên vùng đồng bưng Củ Chi.
- Sản phẩm: Thúng, mủng, nong, nia, cần xé, rổ rá phục vụ đời sống nông nghiệp và các mặt hàng thủ công mỹ nghệ trang trí nội thất xuất khẩu.
2. Nghề làm mành trúc Tân Thông Hội (xã Tân Thông Hội):
- Chuyên kết những thanh trúc già, vẽ phong cảnh quê hương sơn thủy lên tấm mành che nắng, tạo thành sản phẩm trang trí mỹ nghệ đặc sắc được khách quốc tế yêu thích.`,
    source: 'Chi cục Phát triển Nông thôn TP.HCM',
    verifiedDate: '2023'
  },

  // 5. ẨM THỰC & ĐẶC SẢN
  {
    id: 'food-1',
    category: 'cuisine',
    title: 'Đặc sản ẩm thực Bò tơ Củ Chi và Củ mì hấp nước cốt dừa',
    keywords: ['bo to cu chi', 'cu mi', 'khoai mi', 'nuoc mia sau rieng', 'am thuc', 'dac san', 'mon an ngon'],
    content: `Ẩm thực Củ Chi mang đậm phong vị mộc mạc Nam Bộ gắn liền với hai sản vật nổi tiếng nhất:
1. Bò tơ Củ Chi:
- Bò tơ là bê con được nuôi thả đồng khoảng 5 - 6 tháng tuổi. Thịt có màu hồng nhạt, mềm ngọt, thơm thoang thoảng mùi sữa tươi, lớp da mỏng giòn sần sật không dai.
- Các món tiêu biểu: Bò tơ luộc cuộn bánh tráng Phú Hòa Đông ăn kèm rau rừng sông Sài Gòn chấm mắm nêm đậm đà; bò tơ nướng mọi; lẩu bò tơ.
2. Củ mì (Khoai mì) hấp nước cốt dừa chấm muối mè:
- Món ăn mang đậm dấu ấn lịch sử, là lương thực chủ yếu nuôi sống bộ đội và du kích dưới lòng địa đạo suốt những năm tháng bom cày đạn xới.
- Củ mì bở dẻo, được hấp cùng nước cốt dừa béo ngậy và lá dứa thơm phức, chấm cùng muối mè rang giã nhỏ.
3. Nước mía sầu riêng:
- Thức uống giải khát đặc trưng ven trục Quốc lộ 22 (đoạn qua Tân Thông Hội), kết hợp nước mía nguyên chất ép cùng sầu riêng bùi béo ngọt thanh mát.`,
    source: 'Tạp chí Ẩm thực & Du lịch TP.HCM',
    verifiedDate: '2024'
  },

  // 6. KINH TẾ & PHÁT TRIỂN
  {
    id: 'econ-1',
    category: 'economy',
    title: 'Nông nghiệp công nghệ cao và kinh tế nông thôn Củ Chi',
    keywords: ['nong nghiep cong nghe cao', 'pham van coi', 'bo sua', 'hoa lan mokara', 'kinh te cu chi'],
    content: `Trong công cuộc đổi mới và phát triển:
- Khu Nông nghiệp Công nghệ cao TP.HCM (tọa lạc tại xã Phạm Văn Cội, diện tích gần 90ha): Là trung tâm nghiên cứu giống cây trồng công nghệ sinh học hàng đầu khu vực phía Nam, chuyên ươm tạo giống hoa lan Mokara, dưa lưới hữu cơ trong nhà màng, nấm linh chi và rau thủy canh.
- Chăn nuôi bò sữa: Củ Chi từng là 'thủ phủ bò sữa' lớn nhất của TP.HCM với hàng chục ngàn con, cung cấp sữa tươi nguyên liệu cho các nhà máy sữa lớn.
- Phát triển cụm công nghiệp: Cụm công nghiệp Tân Quy, Khu công nghiệp Tây Bắc Củ Chi đóng góp lớn vào giải quyết việc làm và chuyển dịch cơ cấu lao động từ thuần nông sang công nghiệp - dịch vụ.`,
    source: 'Ban Quản lý Khu Nông nghiệp Công nghệ cao TP.HCM & UBND Huyện Củ Chi',
    verifiedDate: '2024'
  },

  // 7. GIÁO DỤC, HỌC TẬP & DỰ ÁN 12A5
  {
    id: 'edu-1',
    category: 'education',
    title: 'Dự án nghiên cứu liên môn của tập thể học sinh Lớp 12A5',
    keywords: ['12a5', 'lop 12a5', 'du an hoc tap', 'nhom thuc hien', 'tac gia', 'thuyet trinh'],
    content: `Website này là công trình nghiên cứu học tập liên môn (Lịch sử - Địa lý - Giáo dục Địa phương và Tin học) do nhóm 6 học sinh Lớp 12A5 xây dựng:
1. Trần Đức Lương: Trưởng nhóm, phụ trách nghiên cứu Lịch sử & Di tích.
2. Trần Hà Phụng Nhi: Biên tập viên Văn hóa & Ẩm thực truyền thống.
3. Phan Khánh Linh: Chuyên viên Bản đồ số tương tác & Tọa độ địa lý GPS.
4. Nguyễn Tường Lam: Thiết kế Giao diện Retro Vintage Editorial & Thư viện Media.
5. Nguyễn Thị Quỳnh Như: Kiểm định Tư liệu, hồ sơ kiểm chứng & Tích hợp Trợ lý AI.
6. Trần Anh: Biên tập viên Đa phương tiện & Khảo sát Thực địa.
Mục tiêu dự án: Số hóa tư liệu chuẩn xác, tạo công cụ học tập trực quan giúp thế hệ trẻ và du khách hiểu sâu sắc về truyền thống Đất Thép Củ Chi anh hùng.`,
    source: 'Hồ sơ Báo cáo Nghiên cứu Chuyên đề Lớp 12A5 (Niên khóa 2026 — 2027)',
    verifiedDate: '2026'
  }
];

/**
 * Tìm kiếm và truy xuất tài liệu liên quan từ cơ sở tri thức (Simple Lexical/Semantic RAG)
 */
export function searchKnowledgeBase(query: string, maxResults: number = 3): KnowledgeDocument[] {
  if (!query || typeof query !== 'string') return [];
  const qNorm = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const words = qNorm.split(/\s+/).filter((w) => w.length > 1);

  const scored = CUCHI_KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    const docTitleNorm = doc.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const docContentNorm = doc.content
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Khớp từ khóa được định nghĩa
    for (const kw of doc.keywords) {
      const kwNorm = kw
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (qNorm.includes(kwNorm)) {
        score += 15;
      }
    }

    // Khớp từng từ trong tiêu đề
    for (const w of words) {
      if (docTitleNorm.includes(w)) score += 5;
      if (docContentNorm.includes(w)) score += 1;
    }

    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => s.doc);
}
