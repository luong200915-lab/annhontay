import {
  Article,
  LocationPoint,
  MediaItem,
  TeamMember,
  VerificationSource,
  HistoricalEvent
} from "../types";

export const OFFICIAL_SOURCES: VerificationSource[] = [
  {
    id: "src-1",
    name: "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
    organization: "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
    url: "https://cuchi.hochiminhcity.gov.vn",
    publishDate: "2026-01-15",
    verifiedDate: "2026-10-18",
    supportedFacts: [
      "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
      "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống",
    ],
  },
  {
    id: "src-2",
    name: "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
    organization: "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
    url: "http://diadaocuchi.com.vn",
    publishDate: "2023-12-10",
    verifiedDate: "2026-10-19",
    supportedFacts: [
      "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
      "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
      "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc",
    ],
  },
  {
    id: "src-3",
    name: "Sở Du lịch Thành phố Hồ Chí Minh",
    organization: "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
    url: "https://visithcmc.vn",
    publishDate: "2026-03-20",
    verifiedDate: "2026-10-19",
    supportedFacts: [
      "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
      "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
      "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè",
    ],
  },
  {
    id: "src-4",
    name: "Cục Di sản Văn hóa Việt Nam",
    organization: "Bộ Văn hóa, Thể thao và Du lịch",
    url: "http://dsvh.gov.vn",
    publishDate: "2015-12-23",
    verifiedDate: "2026-10-15",
    supportedFacts: [
      "Địa đạo An Nhơn Tây được xếp hạng Di tích Quốc gia Đặc biệt theo Quyết định số 2367/QĐ-TTg ngày 23/12/2015",
    ],
  },
  {
    id: "src-5",
    name: "Cổng thông tin tra cứu bản đồ đơn vị hành chính sau sáp nhập 2025",
    organization: "Nhà xuất bản Tài nguyên - Môi trường và Bản đồ Việt Nam (NARENCA) & Quốc hội",
    url: "https://sapnhap.bando.com.vn",
    publishDate: "2025-07-01",
    verifiedDate: "2026-11-04",
    supportedFacts: [
      "Bản đồ hành chính Việt Nam theo Nghị quyết số 202/2025/QH15 với 34 đơn vị hành chính cấp tỉnh (28 tỉnh, 6 thành phố trực thuộc Trung ương)",
      "Thành phố Hồ Chí Minh hình thành sau sắp xếp mở rộng từ TP.HCM, Bình Dương và Bà Rịa - Vũng Tàu, trong đó xã An Nhơn Tây bảo tồn nguyên vẹn các di tích lịch sử",
    ],
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    "id": "art-1",
    "slug": "dia-dao-cu-chi-huyen-thoai-dat-thep",
    "title": "ĐỊA ĐẠO CỦ CHI — HUYỀN THOẠI TRONG LÒNG ĐẤT THÉP",
    "subtitle": "Kỳ quan quân sự dài hơn 250km biểu tượng cho ý chí kiên cường của quân dân An Nhơn Tây",
    "category": "history",
    "categoryName": "Lịch sử & Truyền thống",
    "summary": "Hệ thống địa đạo An Nhơn Tây là một công trình quân sự kỳ vĩ độc nhất vô nhị, dài hơn 250km xuyên lòng đất với 3 tầng ngầm liên hoàn, phòng họp, bệnh xá và bếp Hoàng Cầm.",
    "content": [
      "Địa đạo An Nhơn Tây được hình thành trong thời kỳ kháng chiến chống thực dân Pháp, khoảng năm 1948, ban đầu tại hai xã Tân Phú Trung và Phước Vĩnh An. Lúc đầu, địa đạo chỉ gồm những đoạn hầm ngắn, phục vụ việc trú ẩn và hoạt động của lực lượng cách mạng trong vùng địch kiểm soát.",
      "Bước sang thời kỳ kháng chiến chống Mỹ, từ năm 1961, hệ thống địa đạo được mở rộng và phát triển mạnh mẽ. Đến khoảng năm 1963–1966, nhiều đoạn hầm đã được nối liền thành mạng lưới liên hoàn, đặc biệt tại các xã phía Bắc An Nhơn Tây. Hệ thống này trở thành căn cứ chiến đấu, trú ẩn và bảo vệ lực lượng cách mạng, thể hiện sự sáng tạo, mưu trí của quân và dân địa phương.",
      "Địa đạo có những đoạn được xây dựng ở nhiều độ sâu khác nhau, với hệ thống đường hầm, phòng trú ẩn, nơi hội họp, khu vực sinh hoạt và các lỗ thông hơi được ngụy trang khéo léo. Những công trình này giúp quân dân An Nhơn Tây duy trì hoạt động trong điều kiện chiến tranh ác liệt.",
      "Bên cạnh đó, bếp Hoàng Cầm là một sáng kiến quan trọng trong sinh hoạt thời chiến. Nhờ hệ thống dẫn khói qua các đường rãnh, khói được phân tán và giảm khả năng bị đối phương phát hiện, góp phần bảo đảm an toàn cho lực lượng hoạt động trong địa đạo.",
      "Với tinh thần chiến đấu kiên cường, mưu trí và sáng tạo, ngày 17/9/1967, tại Đại hội Anh hùng, Chiến sĩ thi đua và Dũng sĩ các lực lượng vũ trang nhân dân giải phóng toàn miền Nam lần thứ II, quân và dân An Nhơn Tây vinh dự được Ủy ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam tuyên dương danh hiệu “Đất thép thành đồng” và tặng thưởng Huân chương Thành đồng hạng Ba."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media1.jpg",
    "imageCaption": "Cửa ngầm địa đạo được ngụy trang bằng nắp gỗ phủ lá khô giữa rừng chồi An Nhơn Tây",
    "imageCredit": "Tư liệu Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
    "author": "Trần Đức Lương (Lớp 12A5)",
    "sources": [
      {
        "id": "src-2",
        "name": "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
        "organization": "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
        "url": "http://diadaocuchi.com.vn",
        "publishDate": "2023-12-10",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
          "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
          "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc"
        ]
      },
      {
        "id": "src-4",
        "name": "Cục Di sản Văn hóa Việt Nam",
        "organization": "Bộ Văn hóa, Thể thao và Du lịch",
        "url": "http://dsvh.gov.vn",
        "publishDate": "2015-12-23",
        "verifiedDate": "2026-10-15",
        "supportedFacts": [
          "Địa đạo An Nhơn Tây được xếp hạng Di tích Quốc gia Đặc biệt theo Quyết định số 2367/QĐ-TTg ngày 23/12/2015"
        ]
      }
    ],
    "tags": [
      "Địa đạo",
      "Đất thép thành đồng",
      "Bến Dược",
      "Bến Đình",
      "Di tích Quốc gia đặc biệt"
    ],
    "status": "verified",
    "updatedAt": "2026-11-17",
    "highlights": [
      "Tổng chiều dài công trình: hơn 250km qua nhiều xã",
      "Độ sâu 3 tầng liên hoàn: từ 3m đến 12m",
      "Danh hiệu vinh danh: Đất Thép Thành Đồng (17/9/1967)",
      "Xếp hạng: Di tích Quốc gia Đặc biệt (2015)"
    ]
  },
  {
    "id": "art-2",
    "slug": "den-tuong-niem-liet-si-ben-duoc",
    "title": "ĐỀN BẾN DƯỢC — KHẮC GHI 44.752 ANH HÙNG LIỆT SĨ",
    "subtitle": "Nơi hội tụ linh khí thiêng liêng bên dòng sông Sài Gòn lịch sử",
    "category": "history",
    "categoryName": "Lịch sử & Truyền thống",
    "summary": "Đền Tưởng niệm Liệt sĩ Bến Dược là công trình văn hóa - tâm linh quy mô lớn tọa lạc bên bờ sông Sài Gòn, nơi khắc tên 44.752 người con ưu tú đã ngã xuống trên chiến trường Sài Gòn - Chợ Lớn - Gia Định.",
    "content": [
      "Đền Tưởng niệm Liệt sĩ Bến Dược là công trình văn hóa, lịch sử có ý nghĩa đặc biệt, nằm tại vùng đất An Nhơn Tây anh hùng, gắn liền với truyền thống đấu tranh kiên cường của quân và dân Sài Gòn – Gia Định trong hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ.",
      "Mang đậm nét kiến trúc truyền thống Việt Nam, đền là nơi tưởng niệm Chủ tịch Hồ Chí Minh, các Mẹ Việt Nam anh hùng, các anh hùng liệt sĩ và đồng bào, chiến sĩ đã hy sinh vì độc lập, tự do của Tổ quốc. Trong không gian trang nghiêm của đền, những tên tuổi được khắc ghi trên bia đá là minh chứng cho sự hy sinh cao cả của các thế hệ đi trước.",
      "Theo thông tin của Ủy ban Mặt trận Tổ quốc Việt Nam TP.HCM năm 2024, Đền Bến Dược ghi danh 44.520 liệt sĩ, trong đó có 9.322 liệt sĩ quê ở 40 tỉnh, thành khác đã chiến đấu và hy sinh trên vùng đất Sài Gòn – Gia Định.",
      "Ngày nay, Đền Bến Dược không chỉ là nơi để các thế hệ tưởng nhớ và tri ân những người đã ngã xuống vì Tổ quốc, mà còn là địa chỉ đỏ có giá trị giáo dục sâu sắc, góp phần bồi đắp lòng yêu nước, niềm tự hào dân tộc và ý thức trách nhiệm của thế hệ trẻ đối với sự nghiệp xây dựng, bảo vệ đất nước."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media2.jpg",
    "imageCaption": "Khuôn viên thanh tịnh và cổng tam quan Đền Tưởng niệm Liệt sĩ Bến Dược",
    "imageCredit": "Ban Quản lý Di tích Địa đạo An Nhơn Tây",
    "author": "Trần Đức Lương & Phan Khánh Linh (Lớp 12A5)",
    "locationId": "loc-2",
    "sources": [
      {
        "id": "src-2",
        "name": "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
        "organization": "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
        "url": "http://diadaocuchi.com.vn",
        "publishDate": "2023-12-10",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
          "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
          "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc"
        ]
      }
    ],
    "tags": [
      "Đền Bến Dược",
      "Tri ân liệt sĩ",
      "Giáo sư Trần Văn Giàu",
      "Sông Sài Gòn"
    ],
    "status": "verified",
    "updatedAt": "2026-10-18",
    "featured": true,
    "highlights": [
      "Khởi công: 19/5/1993, khánh thành: 19/12/1995",
      "Số lượng liệt sĩ được khắc tên: 44.752 liệt sĩ",
      "Tác giả bài văn bia: Cố Giáo sư Trần Văn Giàu"
    ]
  },
  {
    "id": "art-3",
    "slug": "lang-banh-trang-phu-hoa-dong",
    "title": "LÀNG NGHỀ BÁNH TRÁNG PHÚ HÒA ĐÔNG — HƯƠNG GẠO TRĂM NĂM",
    "subtitle": "Nét tinh hoa ẩm thực đất An Nhơn Tây bay xa khắp năm châu bốn biển",
    "category": "culture",
    "categoryName": "Văn hóa & Đời sống",
    "summary": "Trải qua hơn một thế kỷ thăng trầm, làng nghề bánh tráng Phú Hòa Đông vẫn giữ vững lửa nghề, biến hạt gạo quê hương thành những mẻ bánh tráng mỏng dẻo, thơm lừng.",
    "content": [
      "Đền Tưởng niệm Liệt sĩ Bến Dược là công trình văn hóa, lịch sử có ý nghĩa đặc biệt, nằm tại vùng đất An Nhơn Tây anh hùng, gắn liền với truyền thống đấu tranh kiên cường của quân và dân Sài Gòn – Gia Định trong hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ.",
      "Mang đậm nét kiến trúc truyền thống Việt Nam, đền là nơi tưởng niệm Chủ tịch Hồ Chí Minh, các Mẹ Việt Nam anh hùng, các anh hùng liệt sĩ và đồng bào, chiến sĩ đã hy sinh vì độc lập, tự do của Tổ quốc. Trong không gian trang nghiêm của đền, những tên tuổi được khắc ghi trên bia đá là minh chứng cho sự hy sinh cao cả của các thế hệ đi trước.",
      "Theo thông tin của Ủy ban Mặt trận Tổ quốc Việt Nam TP.HCM năm 2024, Đền Bến Dược ghi danh 44.520 liệt sĩ, trong đó có 9.322 liệt sĩ quê ở 40 tỉnh, thành khác đã chiến đấu và hy sinh trên vùng đất Sài Gòn – Gia Định.",
      "Ngày nay, Đền Bến Dược không chỉ là nơi để các thế hệ tưởng nhớ và tri ân những người đã ngã xuống vì Tổ quốc, mà còn là địa chỉ đỏ có giá trị giáo dục sâu sắc, góp phần bồi đắp lòng yêu nước, niềm tự hào dân tộc và ý thức trách nhiệm của thế hệ trẻ đối với sự nghiệp xây dựng, bảo vệ đất nước."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media3.jpg",
    "imageCaption": "Nghệ nhân tráng từng lớp bánh mỏng đều tay trên nồi hơi truyền thống tại Phú Hòa Đông",
    "imageCredit": "Tạp chí Du lịch TP.HCM",
    "author": "Trần Hà Phụng Nhi (Lớp 12A5)",
    "locationId": "loc-4",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Bánh tráng",
      "Phú Hòa Đông",
      "Làng nghề truyền thống",
      "Ẩm thực Việt"
    ],
    "status": "verified",
    "updatedAt": "2026-10-17",
    "featured": true,
    "highlights": [
      "Lịch sử hình thành: hơn 100 năm",
      "Đặc trưng: dẻo dai tự nhiên, thơm mùi gạo mới, cuốn không rách",
      "Thị trường tiêu thụ: nội địa và xuất khẩu trên 30 quốc gia"
    ]
  },
  {
    "id": "art-4",
    "slug": "dac-san-am-thuc-bo-to-cu-chi",
    "title": "BÒ TƠ AN NHƠN TÂY — VỊ NGỌT TINH TÚY ĐỒNG QUÊ",
    "subtitle": "Món ngon nức tiếng chinh phục thực khách bốn phương với lớp da giòn sần sật và thớ thịt mềm ngọt",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "summary": "Bò tơ An Nhơn Tây từ lâu đã trở thành một thương hiệu ẩm thực trứ danh. Thịt bò tơ non mềm, da mỏng giòn nướng vàng rộm cuốn bánh tráng rau rừng chấm mắm nêm đậm đà.",
    "content": [
      "Nhắc đến ẩm thực An Nhơn Tây, không thể không nhắc đến bò tơ — món đặc sản nổi tiếng bởi vị ngọt tự nhiên, độ mềm và hương thơm đặc trưng. Bò tơ thường được tuyển chọn ở độ tuổi khoảng 5–6 tháng, với trọng lượng phù hợp để thịt giữ được độ mềm, săn chắc và không bị bở.",
      "Điểm hấp dẫn của bò tơ An Nhơn Tây nằm ở phần thịt mềm ngọt, lớp da tương đối mỏng và phần mỡ vừa phải. Qua bàn tay chế biến khéo léo của người đầu bếp, thịt bò có thể được luộc, hấp hoặc nướng trên than hồng, làm nổi bật hương vị tự nhiên của nguyên liệu.",
      "Một trong những món được nhiều thực khách yêu thích là bò tơ luộc cuốn rau rừng. Những lát thịt chín tới được ăn cùng bánh tráng, các loại rau sống như quế vị, lá lụa, đọt xoài và những loại rau theo mùa, sau đó chấm với mắm đồng hoặc mắm nêm pha đậm đà. Sự kết hợp giữa vị ngọt của thịt, độ dai mềm của bánh tráng, vị thanh mát của rau và vị mặn mà của nước chấm tạo nên nét hấp dẫn riêng cho món ăn.",
      "Bên cạnh món luộc cuốn rau rừng, bò tơ còn được chế biến thành nhiều món khác như bò nướng than hồng, bò nhúng, lẩu bò, chảo bò và bò kho cơm cháy. Mỗi cách chế biến đem đến một hương vị riêng, góp phần làm phong phú thêm văn hóa ẩm thực địa phương.",
      "Ngày nay, bò tơ đã trở thành một trong những món ăn được nhiều du khách tìm thưởng thức khi đến An Nhơn Tây. Không chỉ hấp dẫn bởi hương vị, món ăn còn gợi lên nét mộc mạc, gần gũi của ẩm thực đồng quê Nam Bộ."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media4.jpg",
    "imageCaption": "Bò tơ nướng than hồng thơm phức cuốn cùng rau rừng và bánh tráng An Nhơn Tây",
    "imageCredit": "Sở Du lịch TP.HCM",
    "author": "Trần Hà Phụng Nhi & Nguyễn Thị Quỳnh Như (Lớp 12A5)",
    "locationId": "loc-8",
    "sources": [
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Bò tơ",
      "Món ngon An Nhơn Tây",
      "Bò tơ Xuân Đào",
      "Rau rừng",
      "Mắm nêm"
    ],
    "status": "verified",
    "updatedAt": "2026-10-18",
    "featured": true,
    "highlights": [
      "Độ tuổi bò đạt chuẩn: 5 - 6 tháng tuổi",
      "Đặc sản đi kèm: Rau rừng sông Sài Gòn, mắm nêm chua ngọt",
      "Món ăn tiêu biểu: Bò luộc cuốn bánh tráng, bò tơ nướng y"
    ]
  },
  {
    "id": "art-5",
    "slug": "cu-mi-hap-nuoc-cot-dua-mon-an-khang-chien",
    "title": "CỦ MÌ NƯỚC CỐT DỪA — TỪ MÓN ĂN KHÁNG CHIẾN ĐẾN ĐẶC SẢN NỨC TIẾNG",
    "subtitle": "Món ăn thắm đượm tình đồng chí dưới hầm sâu nay là kỷ niệm ngọt ngào khó quên của du khách",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "summary": "Trong những năm tháng gian khổ chống giặc, củ khoai mì là lương thực chính nuôi sống chiến sĩ. Ngày nay, củ mì hấp nước cốt dừa chấm muối mè là món quà không thể thiếu của An Nhơn Tây.",
    "content": [
      "Trong những năm tháng kháng chiến gian khổ, khi nguồn lương thực khan hiếm, khoai mì (củ mì) trở thành nguồn thực phẩm quan trọng, góp phần nuôi sống quân và dân An Nhơn Tây. Loại củ dân dã này gắn liền với ký ức về những bữa ăn đạm bạc nhưng đong đầy tinh thần vượt khó của người dân vùng đất thép.",
      "Từ nguyên liệu quen thuộc ấy, người dân đã chế biến thành nhiều món ăn giản dị như khoai mì luộc chấm muối mè, khoai mì hấp lá dứa hay khoai mì hấp nước cốt dừa. Mỗi cách chế biến đều làm nổi bật vị bùi, thơm và độ dẻo đặc trưng của củ mì.",
      "Ngày nay, khi tham quan địa đạo Bến Dược hay Bến Đình, du khách có thể thưởng thức món khoai mì luộc nóng hổi, gợi nhớ những bữa ăn thời kháng chiến. Bên cạnh đó, khoai mì hấp nước cốt dừa cũng là một cách thưởng thức hấp dẫn, kết hợp vị bùi của khoai mì với vị béo thơm của dừa; món ăn có thể dùng kèm muối mè để tăng thêm hương vị.",
      "Sự hòa quyện giữa vị bùi dẻo của khoai mì, vị béo của nước cốt dừa và chút mặn thơm của muối mè tạo nên nét hấp dẫn mộc mạc của món ăn đồng quê Nam Bộ.",
      "Không cầu kỳ về nguyên liệu hay cách chế biến, củ mì An Nhơn Tây ngày nay không chỉ là món ăn dân dã mà còn gợi nhắc một thời gian khó, thể hiện sức sống bền bỉ và tinh thần vượt lên gian khổ của quân dân vùng đất thép."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media5.png",
    "imageCaption": "Củ mì dẻo bùi hấp nóng hổi chấm muối mè vừng thơm nức mũi",
    "imageCredit": "Khu Di tích Địa đạo An Nhơn Tây",
    "author": "Nguyễn Thị Quỳnh Như (Lớp 12A5)",
    "sources": [
      {
        "id": "src-5",
        "name": "Cổng thông tin tra cứu bản đồ đơn vị hành chính sau sáp nhập 2025",
        "organization": "Nhà xuất bản Tài nguyên - Môi trường và Bản đồ Việt Nam (NARENCA) & Quốc hội",
        "url": "https://sapnhap.bando.com.vn",
        "publishDate": "2025-07-01",
        "verifiedDate": "2026-11-04",
        "supportedFacts": [
          "Bản đồ hành chính Việt Nam theo Nghị quyết số 202/2025/QH15 với 34 đơn vị hành chính cấp tỉnh (28 tỉnh, 6 thành phố trực thuộc Trung ương)",
          "Thành phố Hồ Chí Minh hình thành sau sắp xếp mở rộng từ TP.HCM, Bình Dương và Bà Rịa - Vũng Tàu, trong đó xã An Nhơn Tây bảo tồn nguyên vẹn các di tích lịch sử"
        ]
      }
    ],
    "tags": [
      "Khoai mì",
      "Ẩm thực kháng chiến",
      "Muối mè",
      "Nước cốt dừa"
    ],
    "status": "verified",
    "updatedAt": "2026-10-16",
    "featured": false,
    "highlights": [
      "Ý nghĩa: Lương thực cứu đói cách mạng thời chiến tranh",
      "Cách chế biến: Hấp cùng nước cốt dừa tươi và lá dứa thơm",
      "Gia vị kèm theo: Muối mè vừng rang vàng"
    ]
  },
  {
    "id": "art-6",
    "slug": "nong-trang-xanh-green-noen-va-du-lich-sinh-thai",
    "title": "avjsd",
    "subtitle": "Điểm hẹn sinh thái ngập tràn sắc hoa, nấm ăn công nghệ cao và trang trại dê cừu thân thiện",
    "category": "nature",
    "categoryName": "Thiên nhiên & Cảnh quan",
    "summary": "Nằm tại ấp Bến Đinh, xã An Nhơn Tây, Nông trang Xanh Green Noen là mô hình trang trại nông nghiệp công nghệ cao kết hợp du lịch trải nghiệm sinh thái trong lành bậc nhất An Nhơn Tây.",
    "content": [
      "Tọa lạc tại xã An Nhơn Tây, An Nhơn Tây, Nông trang Xanh Green Noen là mô hình kết hợp giữa sản xuất nông nghiệp sạch, chăn nuôi và du lịch sinh thái. Được hình thành từ năm 2010, nông trang phát triển theo định hướng tham khảo các mô hình trang trại của Nhật Bản và Hàn Quốc, mang đến không gian xanh mát, gần gũi với thiên nhiên.",
      "Nổi bật tại đây là khu trồng nấm với nhiều loại nấm ăn và nấm có giá trị kinh tế như nấm bào ngư, nấm mèo và nấm linh chi. Theo các tài liệu giới thiệu trước đây, nông trang từng phát triển hệ thống 33 nhà trồng nấm, kết hợp với khu chăn nuôi bò sữa và các khu trồng rau sạch, dưa lưới trong nhà màng.",
      "Không chỉ chú trọng sản xuất nông nghiệp, Green Noen còn mang đến những hoạt động trải nghiệm thú vị cho du khách. Tùy chương trình và điều kiện hoạt động, khách tham quan có thể tìm hiểu quy trình trồng nấm, thu hoạch nông sản, trải nghiệm vắt sữa bò và tiếp xúc với các vật nuôi như dê, cừu, hươu, nai. Những hoạt động này giúp người tham gia hiểu hơn về công việc của người nông dân cũng như quá trình tạo ra các sản phẩm nông nghiệp.",
      "Với không gian đồng quê rộng rãi, vườn cây, khu chăn nuôi và các phân khu sản xuất, Nông trang Xanh còn là điểm đến phù hợp cho các chuyến tham quan trải nghiệm của gia đình và học sinh. Qua những hoạt động thực tế, các bạn trẻ có cơ hội tìm hiểu về sản xuất nông nghiệp, ý thức bảo vệ môi trường và giá trị của lao động.",
      "Nông trang Xanh Green Noen góp phần tạo nên nét đa dạng cho du lịch sinh thái An Nhơn Tây, nơi du khách có thể tạm rời xa nhịp sống đô thị để khám phá thiên nhiên và trải nghiệm cuộc sống nông trại."
    ],
    "coverImage": "/annhontay/assets/aistudio/media_articles/media6.png",
    "imageCaption": "Thảo nguyên xanh mướt và đàn cừu thân thiện tại Green Noen An Nhơn Tây",
    "imageCredit": "Trung tâm Du lịch Sinh thái An Nhơn Tây",
    "author": "Nguyễn Tường Lam (Lớp 12A5)",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Nông nghiệp xanh",
      "Green Noen",
      "An Nhơn Tây",
      "Trải nghiệm sinh thái"
    ],
    "status": "verified",
    "updatedAt": "2026-11-20",
    "highlights": [
      "Diện tích: hơn 20 hecta nông nghiệp công nghệ cao",
      "Đặc điểm: Trồng nấm sạch, vườn dưa lưới và nông trại gia súc thân thiện",
      "Phù hợp: Du lịch trải nghiệm sinh thái, dã ngoại cuối tuần"
    ]
  },
  {
    "id": "art-7",
    "slug": "vuon-trai-cay-trung-an-ven-song-sai-gon",
    "title": "Nông Trang Xanh (Green Noen)",
    "subtitle": "Thưởng ngoạn miệt vườn ven sông với chôm chôm, măng cụt và sầu riêng sum suê trái ngọt",
    "category": "nature",
    "categoryName": "Thiên nhiên & Cảnh quan",
    "summary": "Là một khu du lịch sinh thái kết hợp mô hình sản xuất nông nghiệp sạch tại xã An Nhơn Tây, TP.HCM. Ra đời từ năm 2010 với quy mô rộng lớn, nơi đây được xây dựng theo ý tưởng trang trại của Nhật Bản và Hàn Quốc để du khách trải nghiệm cuộc sống làm nông dân.",
    "content": [
      "Các trải nghiệm nổi bật:",
      "Trồng và thu hoạch nấm sạch: Nông trại sở hữu hệ thống nhà trồng nấm quy mô lớn với các loại như nấm linh chi, nấm bào ngư và nấm mèo. Du khách được hướng dẫn cách chăm sóc và tự tay hái nấm tươi tại vườn.",
      "Chăm sóc vật nuôi & vắt sữa bò: Khu chăn nuôi có bò sữa, dê, cừu và ngựa. Bạn có thể cho cừu ăn, trải nghiệm vắt sữa bò trực tiếp và thưởng thức sữa tươi ngay tại chỗ.",
      "Trò chơi dân gian & dã ngoại: Du khách có thể thuê đồ bà ba để chụp ảnh, tham gia tát mương bắt cá, cưỡi ngựa hoặc đi xe điện, xe trâu dạo quanh khuôn viên nhiều cây xanh.",
      "Tham quan vườn lan & rau sạch: Khuôn viên có khu vực trồng hoa phong lan Mokara, vườn hoa theo mùa và nhà màng trồng dưa lưới, rau củ quả sạch.\n"
    ],
    "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSED6BHTzdBZ19yjg49wJZYcpOfKJjwvPgCISsj_xbg&s=10",
    "imageCaption": "Chùm chôm chôm chín mọng ngọt lịm trong vườn sinh thái Trung An An Nhơn Tây",
    "imageCredit": "Hội Nông dân Xã Trung An, An Nhơn Tây",
    "author": "Phan Khánh Linh (Lớp 12A5)",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Vườn trái cây",
      "Trung An",
      "Sông Sài Gòn",
      "Miệt vườn Nam Bộ"
    ],
    "status": "verified",
    "updatedAt": "2026-11-20",
    "highlights": [
      "Thời điểm lý tưởng: Tháng 5 – Tháng 8 (mùa trái cây chín rộ)",
      "Loại quả chủ lực: Măng cụt, chôm chôm, dâu da, mít nghệ",
      "Trải nghiệm: Hái trái tại vườn, thưởng thức ẩm thực đồng quê"
    ]
  },
  {
    "id": "art-8",
    "slug": "lang-nghe-dan-dat-ap-got-chang",
    "title": "LÀNG NGHỀ ĐAN ĐÁT TRUYỀN THỐNG (ẤP GÓT CHÀNG)",
    "subtitle": "Làng nghề thủ công bản địa lâu đời gắn liền với đời sống nông nghiệp mộc mạc xã An Nhơn Tây",
    "category": "culture",
    "categoryName": "Văn hóa & Đời sống",
    "summary": "Nghề đan đát truyền thống tại ấp Gót Chàng, xã An Nhơn Tây là di sản thủ công bản địa lâu đời, nơi những đôi bàn tay khéo léo của các nghệ nhân biến tre, trúc, nứa thành những vật dụng gia đình mộc mạc, đậm hồn quê Đất Thép.",
    "content": [
      "Làng nghề đan đát truyền thống ấp Gót Chàng là làng nghề thủ công bản địa lâu đời gắn liền với đời sống nông nghiệp của người dân xã An Nhơn Tây, TP.HCM.",
      "Nghề được truyền qua nhiều thế hệ trong các hộ gia đình. Để bảo tồn và vực dậy nghề trước sự cạnh tranh của các sản phẩm công nghiệp, địa phương đã thành lập Tổ hợp tác đan đát ấp Gót Chàng và ứng dụng chuyển đổi số nhằm quảng bá sản phẩm rộng rãi hơn.",
      "Người thợ sử dụng các loại cây tự nhiên sẵn có tại địa phương như tre già vừa độ, trúc, nứa. Quá trình thực hiện hoàn toàn thủ công qua nhiều công đoạn tỉ mỉ: từ chọn tre, chẻ nan, chuốt nan cho nhẵn mịn, đều tăm tắp, rồi mới tiến hành đan hoa văn và cạp vành kiên cố.",
      "Sản phẩm đặc trưng chủ yếu là các vật dụng phục vụ sinh hoạt gia đình và sản xuất nông nghiệp truyền thống như rổ, rá, rế, nia, sàng, thúng và giỏ đựng đồ.",
      "Hiện nay, nghề đan đát tại ấp Gót Chàng chủ yếu do các nghệ nhân và người lớn tuổi bám trụ giữ nghề, kết hợp cùng các hoạt động du lịch trải nghiệm cộng đồng 'Sắc màu làng quê' để đón tiếp du khách và học sinh đến tham quan, học tập."
    ],
    "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6OBcmWrVXjvJ6cytyfrvFFFkCE_qdyD3239uKNUing&s=10",
    "imageCaption": "Nghệ nhân cao niên tỉ mỉ chuốt nan và đan lát sản phẩm thủ công tại Ấp Gót Chàng, xã An Nhơn Tây",
    "imageCredit": "Báo Dân Việt & Tổ hợp tác đan đát Ấp Gót Chàng",
    "author": "Nguyễn Tường Lam (Lớp 12A5)",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      }
    ],
    "tags": [
      "Đan đát",
      "Ấp Gót Chàng",
      "An Nhơn Tây",
      "Làng nghề truyền thống",
      "Thủ công mỹ nghệ"
    ],
    "status": "verified",
    "updatedAt": "2026-11-20",
    "highlights": [
      "Vị trí: Ấp Gót Chàng, Xã An Nhơn Tây, TP. Hồ Chí Minh",
      "Nguyên liệu: Tre già, trúc, nứa tự nhiên sẵn có tại địa phương",
      "Sản phẩm tiêu biểu: Rổ, rá, rế, nia, sàng, thúng, giỏ đựng đồ",
      "Bảo tồn: Tổ hợp tác đan đát ấp Gót Chàng kết hợp du lịch trải nghiệm cộng đồng"
    ]
  },
  {
    "id": "art-9",
    "slug": "banh-xeo-bep-trau-an-nhon-tay",
    "title": "BÁNH XÈO BẾP TRẤU ",
    "subtitle": "Món ngon truyền thống đậm đà phong vị đồng quê thuộc mô hình du lịch Sắc màu làng quê",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "summary": "Bánh xèo bếp trấu tại xã An Nhơn Tây là điểm nhấn ẩm thực đặc sắc thuộc mô hình du lịch cộng đồng 'Sắc màu làng quê', nơi du khách vừa thưởng thức bánh xèo giòn rụm vừa trực tiếp trải nghiệm đời sống nông thôn Nam Bộ.",
    "content": [
      "Bánh xèo bếp trấu tại xã An Nhơn Tây là một điểm nhấn ẩm thực truyền thống thuộc mô hình du lịch cộng đồng An Nhơn Tây - Sắc màu làng quê (TP.HCM). Món ăn này tái hiện không gian bếp núc miệt vườn Nam Bộ xưa, nơi du khách vừa được thưởng thức đặc sản dân dã vừa trực tiếp trải nghiệm đời sống nông thôn vùng đất thép.",
      "Cách chế biến thủ công truyền thống: Người dân địa phương sử dụng lò đất đun bằng vỏ trấu và củi khô thay cho bếp hiện đại. Nhiệt lượng từ tro trấu âm ỉ, giữ chảo gang nóng đều, giúp vỏ bánh chín vàng ươm, giòn rụm tự nhiên và thoang thoảng mùi khói bếp đặc trưng.",
      "Nguyên liệu đậm chất vườn nhà: Bột bánh làm từ gạo xay pha nước cốt dừa béo ngậy kết hợp cùng bột nghệ vàng óng. Phần nhân tận dụng nguồn sản vật sẵn có tại địa phương như tép đồng, thịt ba rọi, đậu xanh, giá đỗ hoặc măng tươi Củ Chi, ăn kèm rổ rau rừng và rau vườn tươi non hái tại chỗ.",
      "Trải nghiệm 'tự tay đổ bánh': Thay vì chỉ ngồi chờ phục vụ, du khách đến đây có thể trực tiếp ngồi bên bếp lửa hồng, tự tay tráng bột, lắng nghe tiếng bánh nổ 'xèo xèo' vui tai và thưởng thức thành quả nóng hổi ngay khi vừa ra lò."
    ],
    "coverImage": "https://cdn2.tuoitre.vn/tcdulichtphcm/media/upload/1-2024/images/2024-01-02/b--nh-x--o-qu---nh---1-1704185989-848-width660height440.jpg",
    "imageCaption": "Chảo bánh xèo vàng ươm giòn rụm trên bếp lò trấu truyền thống tại xã An Nhơn Tây",
    "imageCredit": "Tạp chí Du lịch TP.HCM & Du lịch cộng đồng Sắc màu làng quê",
    "author": "Trần Hà Phụng Nhi (Lớp 12A5)",
    "sources": [
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Bánh xèo bếp trấu",
      "An Nhơn Tây",
      "Ẩm thực Nam Bộ",
      "Sắc màu làng quê",
      "Rau rừng"
    ],
    "status": "verified",
    "updatedAt": "2026-11-20",
    "highlights": [
      "Đặc trưng: Đun bằng bếp trấu truyền thống giữ lửa âm ỉ, vỏ bánh giòn rụm thơm mùi khói",
      "Nguyên liệu: Bột gạo cốt dừa nghệ, tép đồng, thịt ba rọi, măng tươi, rau rừng",
      "Trải nghiệm: Du khách tự tay đổ bánh xèo trên chảo gang tại không gian vườn quê"
    ]
  },
  {
    "id": "art-10",
    "slug": "rach-bu-cap-net-duyen-song-nuoc-an-nhon-tay",
    "title": "RẠCH BÙ CẠP — NÉT DUYÊN SÔNG NƯỚC MỘC MẠC GIỮA LÒNG AN NHƠN TÂY",
    "subtitle": "Nhịp chèo khua nhẹ dưới tán dừa nước xanh rì, mở ra không gian miệt vườn bình yên ven sông Sài Gòn",
    "category": "nature",
    "categoryName": "Thiên nhiên & Sinh thái",
    "summary": "Rạch Bù Cạp mang vẻ đẹp sông nước nguyên sơ, yên bình với hệ sinh thái thực vật phong phú và những rặng dừa nước xanh mát, là điểm đến du lịch sinh thái cộng đồng tiêu biểu của xã An Nhơn Tây.",
    "content": [
      "Rạch Bù Cạp là nhánh rạch tự nhiên thông ra sông Sài Gòn, nằm trên địa bàn xã An Nhơn Tây, mang vẻ đẹp sông nước nguyên sơ, êm ả và thanh bình quanh năm.",
      "Cảnh quan đặc trưng nơi đây là những rặng dừa nước bản địa xanh mướt trải dài hai bên bờ, thảm thực vật phù sa trù phú và không gian thiên nhiên trong lành, mộc mạc.",
      "Du khách đến Rạch Bù Cạp có thể trải nghiệm các hoạt động dân dã thú vị như chèo xuồng ba lá lướt nhẹ dưới tán dừa nước, câu cá thư giãn, khám phá hệ sinh thái miệt vườn Nam Bộ và hòa mình vào nhịp sống bình dị của người dân quê.",
      "Ẩm thực miệt vườn tại đây vô cùng phong phú với các món ăn đồng quê như cá nướng trui, gỏi ngó sen tôm thịt, khoai mì hấp nước cốt dừa và các loại trái cây hái tại vườn.",
      "Rạch Bù Cạp đang trở thành điểm đến sinh thái cộng đồng hấp dẫn, góp phần giới thiệu vẻ đẹp thiên nhiên và văn hóa sông nước của vùng đất An Nhơn Tây đến bạn bè gần xa."
    ],
    "coverImage": "https://images2.thanhnien.vn/528068263637045248/2026/2/8/82-du-lic-4-17705407568831689997757.jpg",
    "imageCaption": "Khung cảnh sông nước thanh bình rợp bóng dừa nước tại Rạch Bù Cạp, xã An Nhơn Tây",
    "imageCredit": "Báo Thanh Niên & Du lịch cộng đồng An Nhơn Tây",
    "author": "Phan Khánh Linh (Lớp 12A5)",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "tags": [
      "Rạch Bù Cạp",
      "An Nhơn Tây",
      "Dừa nước",
      "Du lịch sinh thái",
      "Sông Sài Gòn"
    ],
    "status": "verified",
    "updatedAt": "2026-11-19",
    "featured": true,
    "highlights": [
      "Vị trí: Nhánh rạch tự nhiên thông ra sông Sài Gòn, xã An Nhơn Tây",
      "Cảnh quan: Rặng dừa nước xanh ngút ngàn, hệ sinh thái miệt vườn trù phú",
      "Hoạt động: Chèo xuồng ba lá, câu cá đồng quê, thưởng thức khoai mì cốt dừa"
    ]
  },
  {
    "id": "art-1795156177354",
    "slug": "-a-o-c-chi-b-n-nh",
    "title": "ĐỊA ĐẠO CỦ CHI BẾN ĐÌNH",
    "subtitle": "",
    "category": "history",
    "categoryName": "Lịch sử & Truyền thống",
    "summary": " Địa đạo Bến Đình là một phần của hệ thống địa đạo Củ Chi nổi tiếng, nằm cách trung tâm thành phố Hồ Chí Minh khoảng 50km về phía Tây Bắc. Đây là một trong những địa đạo lớn nhất và phức tạp nhất trong cuộc chiến tranh Việt Nam với diện tích 17ha, do quân và dân Củ Chi đào xây dựng và phát triển từ thời kháng chiến chống Pháp cho đến chiến tranh Việt Nam.Với hệ thống hầm rộng gần 250km, bao gồm nhiều tầng và ngách khác nhau.",
    "content": [
      "Địa đạo Bến Đình là một phần quan trọng của hệ thống địa đạo Củ Chi, được hình thành và phát triển trong thời kỳ kháng chiến chống thực dân Pháp từ năm 1946 đến 1948. Ban đầu, hệ thống này chỉ là những đường hầm đơn giản, nhưng sau đó đã được mở rộng và phức tạp hơn trong thời kỳ chiến tranh chống Mỹ, phục vụ cho các hoạt động quân sự và sinh hoạt của quân và dân ta.",
      " Địa đạo Bến Đình không chỉ là một hệ thống hầm trú an toàn mà còn là nơi sinh hoạt, học tập và thậm chí là bệnh viện dã chiến. Đường hầm còn có khả năng chống chịu đạn pháo và xe tăng nhờ cấu trúc 2-3 tầng. Ngoài ra, các lối ra vào bí mật và các cửa thông hơi cũng được ngụy trang kỹ lưỡng. Đặc biệt, các đoạn địa đạo chính có thể mở rộng ra sông Sài Gòn, giúp người dân có thể thoát hiểm sang vùng căn cứ Bến Cát trong tình huống nguy cấp.",
      " Di tích địa đạo Bến Đình không chỉ là chứng nhân cho những chiến công vang dội trong dịp Tết Mậu Thân năm 1968 và chiến thắng mùa xuân năm 1975, mà còn là một kiệt tác kiến trúc có giá trị lịch sử đặc biệt. Được UNESCO vinh danh là Di sản thế giới, di tích này không chỉ giáo dục thế hệ trẻ về tinh thần quật cường của dân tộc mà còn là điểm sáng trong bản đồ di sản văn hóa toàn cầu.\n"
    ],
    "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6Jgz7Gl5I33mhk5Kxvvv02hNV9fgN_9PXm7Jn9LPWA&s=10",
    "imageCaption": "ĐỊA ĐẠO CỦ CHI BẾN ĐÌNH",
    "imageCredit": "Tư liệu Lớp 12A5",
    "author": "Ban Biên tập Lớp 12A5",
    "sources": [
      {
        "id": "src-1795156177354",
        "name": "Cổng thông tin UBND Huyện An Nhơn Tây",
        "organization": "UBND Huyện An Nhơn Tây",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "verifiedDate": "2026-11-20",
        "supportedFacts": [
          "Dữ liệu đã qua kiểm chứng"
        ]
      }
    ],
    "tags": [
      "An Nhơn Tây"
    ],
    "status": "verified",
    "updatedAt": "2026-11-20",
    "highlights": []
  },
  {
    "id": "art-1794922324395",
    "slug": "ngh-a-trang-li-t-s-huy-n-c-chi-gi-c-ng-ng-n-thu-gi-a-l-ng-t-th-p-",
    "title": "NGHĨA TRANG LIỆT SĨ HUYỆN CỦ CHI — GIẤC NGỦ NGÀN THU GIỮA LÒNG \"ĐẤT THÉP\"",
    "subtitle": "",
    "category": "history",
    "categoryName": "Lịch sử & Truyền thống",
    "summary": "Nghĩa trang Liệt sĩ huyện Củ Chi là nơi an nghỉ trang nghiêm của hàng ngàn anh hùng liệt sĩ đã hy sinh vì độc lập dân tộc trên vùng đất anh hùng. Công trình tọa lạc tại xã An Nhơn Tây, huyện Củ Chi, TP. Hồ Chí Minh.",
    "content": [
      "Tọa lạc: Mặt tiền Tỉnh lộ 15, xã An Nhơn Tây, huyện Củ Chi, TP. Hồ Chí Minh",
      "Tổng diện tích: 9,4 hecta (được trùng tu, mở rộng khang trang giai đoạn 2011 – 2012)",
      "Quy mô an nghỉ: Gần 8.000 phần mộ liệt sĩ (bao gồm gần 5.000 mộ có danh tính và hơn 3.000 mộ chưa xác định thông tin)\nNằm lặng lẽ bên tuyến đường Tỉnh lộ 15 lịch sử thuộc xã An Nhơn Tây, Nghĩa trang Liệt sĩ huyện Củ Chi là mái nhà chung thiêng liêng của hàng vạn chiến sĩ, đồng bào đã ngã xuống vì sự nghiệp giải phóng dân tộc. Giữa vùng đất Củ Chi từng hứng chịu mưa bom bão đạn, không gian nơi đây như một khoảng lặng bình yên, ôm ấp giấc ngủ ngàn thu của những người con trung hiếu.",
      "Khác với các công trình đền đài tưởng niệm thuần túy, điểm nhấn xúc động nhất tại nghĩa trang chính là những dãy mộ phần thẳng tắp trải dài trên khuôn viên rộng hơn 9 hecta, hướng về Đài tưởng niệm Tổ quốc ghi công uy nghiêm. Bên cạnh những bia mộ khắc rõ họ tên, quê quán từ khắp mọi miền Tổ quốc, khu vực nhà thờ và bia ghi danh các liệt sĩ chưa xác định được thông tin luôn nghi ngút khói hương, gợi nhắc về những hy sinh thầm lặng mà vĩ đại.",
      "Trải qua đợt nâng cấp, tôn tạo toàn diện vào những năm 2011 – 2012, cảnh quan nghĩa trang ngày càng xanh mát và trang trọng, trở thành điểm tựa tâm linh ấm áp cho thân nhân các gia đình chính sách mỗi dịp tìm về thăm viếng.",
      "Vượt lên ý nghĩa của một nơi an táng, Nghĩa trang Liệt sĩ huyện Củ Chi hôm nay là một \"bài học lịch sử không lời\" sống động. Từng nén nhang được thắp lên nơi đây không chỉ là lời tri ân sâu sắc gửi đến thế hệ cha anh, mà còn nhắc nhở thế hệ trẻ về giá trị của hòa bình và trách nhiệm gìn giữ từng tấc đất quê hương.  \n"
    ],
    "coverImage": "https://salagardenhcm.com/wp-content/uploads/2024/10/nghia-trang-cu-chi-1.jpg",
    "imageCaption": "NGHĨA TRANG LIỆT SĨ HUYỆN CỦ CHI — GIẤC NGỦ NGÀN THU GIỮA LÒNG \"ĐẤT THÉP\"",
    "imageCredit": "Tư liệu Lớp 12A5",
    "author": "Ban Biên tập Lớp 12A5",
    "sources": [
      {
        "id": "src-1794922324395",
        "name": "Cổng thông tin UBND Huyện An Nhơn Tây",
        "organization": "UBND Huyện An Nhơn Tây",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "verifiedDate": "2026-11-17",
        "supportedFacts": [
          "Dữ liệu đã qua kiểm chứng"
        ]
      }
    ],
    "tags": [
      "An Nhơn Tây"
    ],
    "status": "verified",
    "updatedAt": "2026-11-17",
    "highlights": []
  }
];

export const INITIAL_LOCATIONS: LocationPoint[] = [
  {
    "id": "loc-1",
    "name": "ĐỊA ĐẠO BẾN DƯỢC",
    "category": "history",
    "categoryName": "Lịch sử & Di tích",
    "shortDescription": "Địa đạo Bến Dược là một phần của hệ thống địa đạo Củ Chi tại TP. Hồ Chí Minh, từng là căn cứ của Khu ủy và Bộ Tư lệnh Quân khu Sài Gòn - Chợ Lớn - Gia Định trong kháng chiến.",
    "fullDescription": "Địa đạo Bến Dược là khu căn cứ đầu não được phục dựng và bảo tồn nguyên trạng. Nơi đây tái hiện chân thực đời sống sinh hoạt, cứu chữa thương binh và hội họp dưới lòng đất kiên cố.",
    "lat": 11.14324,
    "lng": 106.46206,
    "address": "Ấp Phú Hiệp, xã An Nhơn Tây, Thành phố Hồ Chí Minh (khu vực xã Phú Mỹ Hưng, huyện Củ Chi cũ).",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media1.jpg",
    "openingHours": "07:00 – 17:00 hằng ngày",
    "ticketPrice": "35.000 VNĐ (Khách Việt Nam) / 125.000 VNĐ (Khách quốc tế)",
    "sources": [
      {
        "id": "src-2",
        "name": "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
        "organization": "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
        "url": "http://diadaocuchi.com.vn",
        "publishDate": "2023-12-10",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
          "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
          "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc"
        ]
      },
      {
        "id": "src-4",
        "name": "Cục Di sản Văn hóa Việt Nam",
        "organization": "Bộ Văn hóa, Thể thao và Du lịch",
        "url": "http://dsvh.gov.vn",
        "publishDate": "2015-12-23",
        "verifiedDate": "2026-10-15",
        "supportedFacts": [
          "Địa đạo An Nhơn Tây được xếp hạng Di tích Quốc gia Đặc biệt theo Quyết định số 2367/QĐ-TTg ngày 23/12/2015"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-2",
    "name": "NGHĨA TRANG LIỆT SĨ HUYỆN CỦ CHI",
    "category": "history",
    "categoryName": "Lịch sử & Di tích",
    "shortDescription": "Nghĩa trang Liệt sĩ huyện Củ Chi là nơi an nghỉ và tưởng niệm các anh hùng liệt sĩ đã hy sinh trong các cuộc kháng chiến tại vùng đất thép Củ Chi",
    "fullDescription": "Công trình kiến trúc tưởng niệm tôn nghiêm với cổng tam quan, nhà bia khắc văn bia của cố Giáo sư Trần Văn Giàu và tháp 9 tầng cao 39m vút lên trời xanh.",
    "lat": 11.097021159451561,
    "lng": 106.50996662883625,
    "address": "Đ. Tỉnh Lộ 15, An Nhơn Tây, Hồ Chí Minh, Việt Nam",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media2.jpg",
    "openingHours": "07:30 – 17:00 hằng ngày",
    "ticketPrice": "Miễn phí vào viếng đền",
    "sources": [
      {
        "id": "src-2",
        "name": "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
        "organization": "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
        "url": "http://diadaocuchi.com.vn",
        "publishDate": "2023-12-10",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
          "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
          "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-3",
    "name": "Địa đạo Bến Đình ",
    "category": "history",
    "categoryName": "Lịch sử & Di tích",
    "shortDescription": "Căn cứ Huyện ủy An Nhơn Tây nằm bên sông Sài Gòn, gần trung tâm thành phố hơn.",
    "fullDescription": "Nằm tại xã Nhuận Đức, Bến Đình là căn cứ của Huyện ủy An Nhơn Tây trong những năm tháng chống càn quét khốc liệt. Nơi đây có trường bắn thể thao quốc phòng và hệ thống bẫy hầm phong phú.",
    "lat": 11.050194792690181,
    "lng": 106.50997853807661,
    "address": "Ấp Bến Đình, xã Nhuận Đức, TP. Hồ Chí Minh (Củ Chi cũ).",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media3.jpg",
    "openingHours": "07:30 – 17:00 hằng ngày",
    "ticketPrice": "35.000 VNĐ / vé tham quan",
    "sources": [
      {
        "id": "src-2",
        "name": "Khu Di tích Lịch sử Địa đạo An Nhơn Tây",
        "organization": "Ban Quản lý Di tích Lịch sử Địa đạo An Nhơn Tây",
        "url": "http://diadaocuchi.com.vn",
        "publishDate": "2023-12-10",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Tổng chiều dài hệ thống địa đạo hơn 250km được đào trong kháng chiến chống Mỹ và chống Pháp",
          "Cấu trúc 3 tầng địa đạo chịu được bom pháo và hệ thống bếp Hoàng Cầm không khói",
          "Khu Đền Tưởng niệm Liệt sĩ Bến Dược khắc tên 44.752 liệt sĩ hy sinh vì Tổ quốc"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-4",
    "name": "Làng nghề Bánh tráng Phú Hòa Đông",
    "category": "culture",
    "categoryName": "Văn hóa & Làng nghề",
    "shortDescription": "Làng nghề bánh tráng thủ công trăm năm nổi tiếng dẻo thơm khắp cả nước.",
    "fullDescription": "Tập trung hàng trăm hộ gia đình làm nghề tráng bánh truyền thống kết hợp công nghệ hiện đại. Du khách có thể tận mắt xem và thử tự tay tráng bánh.",
    "lat": 11.0542,
    "lng": 106.5925,
    "address": "Tỉnh lộ 15, Xã Phú Hòa Đông, Huyện An Nhơn Tây, TP. Hồ Chí Minh",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media4.jpg",
    "openingHours": "06:00 – 18:00 hằng ngày",
    "ticketPrice": "Miễn phí tham quan lò bánh",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-10-17",
    "status": "verified",
    "articleSlug": "lang-banh-trang-phu-hoa-dong"
  },
  {
    "id": "loc-5",
    "name": "Làng nghề Đan đát truyền thống (Ấp Gót Chàng)",
    "category": "culture",
    "categoryName": "Văn hóa & Làng nghề",
    "shortDescription": "Làng nghề đan đát thủ công bản địa lâu đời gắn liền với đời sống nông nghiệp xã An Nhơn Tây.",
    "fullDescription": "Tọa lạc tại Ấp Gót Chàng, xã An Nhơn Tây. Nghề truyền thống qua nhiều thế hệ với Tổ hợp tác đan đát, sản xuất các sản phẩm tre trúc nứa tinh xảo và là điểm đến du lịch trải nghiệm cộng đồng độc đáo.",
    "lat": 11.0825,
    "lng": 106.485,
    "address": "Ấp Gót Chàng, xã An Nhơn Tây, TP. Hồ Chí Minh.",
    "coverImage": "https://danviet.ex-cdn.com/files/f1/296231569849192448/2023/10/1/base64-16961998967891263316225.png",
    "openingHours": "07:30 – 17:30 hằng ngày",
    "ticketPrice": "Miễn phí tham quan & trải nghiệm",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-6",
    "name": "Nông trang Xanh Green Noen",
    "category": "nature",
    "categoryName": "Thiên nhiên & Sinh thái",
    "shortDescription": "Nông Trang Xanh (Green Noen) là khu du lịch sinh thái kết hợp nông nghiệp sạch tại xã An Nhơn Tây, Củ Chi, TP.HCM, thành lập từ năm 2010 và phù hợp cho gia đình, trẻ em và các chuyến dã ngoại ngắn ngày.",
    "fullDescription": "Trải rộng hơn 20 hecta với khu nuôi trồng nấm ăn, vườn dưa lưới mát lành, đồi cừu xinh xắn và các hoạt động trải nghiệm làm nông dân thực thụ.",
    "lat": 11.062658892357184,
    "lng": 106.4883624542469,
    "address": "816 Nguyễn Thị Rành, An Nhơn Tây, Hồ Chí Minh, Việt Nam",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media6.png",
    "openingHours": "08:00 – 17:30",
    "ticketPrice": "50.000 VNĐ / Người lớn",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-7",
    "name": "Vườn cây ăn trái Trung An",
    "category": "nature",
    "categoryName": "Thiên nhiên & Sinh thái",
    "shortDescription": "Vựa trái cây miệt vườn ven sông Sài Gòn với chôm chôm, măng cụt trĩu cành.",
    "fullDescription": "Khu vực tập trung nhiều nhà vườn sinh thái thoáng mát đón gió sông, nơi du khách vừa thưởng thức trái chín vừa đắm chìm trong không gian thanh bình.",
    "lat": 11.0664,
    "lng": 106.6358,
    "address": "Đường Sông Lu, Xã Trung An, Huyện An Nhơn Tây, TP. Hồ Chí Minh",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media7.jpg",
    "openingHours": "07:00 – 18:00",
    "ticketPrice": "30.000 – 50.000 VNĐ (tùy mùa vụ và nhà vườn)",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-10-18",
    "status": "verified",
    "articleSlug": "vuon-trai-cay-trung-an-ven-song-sai-gon"
  },
  {
    "id": "loc-8",
    "name": "Quán Bò Tơ Xuân Đào An Nhơn Tây",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "shortDescription": "Địa chỉ ẩm thực bò tơ An Nhơn Tây gia truyền nổi danh dọc tuyến Quốc lộ 22.",
    "fullDescription": "Nơi phục vụ các món bò tơ luộc cuốn rau rừng, bò nướng y than hoa, lẩu bò tơ thơm lừng với chất lượng thịt bò mềm ngọt chuẩn vị truyền thống.",
    "lat": 10.9702,
    "lng": 106.5054,
    "address": "Khu phố 2, Quốc lộ 22, Thị trấn An Nhơn Tây, Huyện An Nhơn Tây, TP. Hồ Chí Minh",
    "coverImage": "/annhontay/assets/aistudio/media_articles/media8.jpg",
    "openingHours": "08:30 – 21:00 hằng ngày",
    "ticketPrice": "150.000 – 300.000 VNĐ / người",
    "sources": [
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-10-18",
    "status": "verified",
    "articleSlug": "dac-san-am-thuc-bo-to-cu-chi"
  },
  {
    "id": "loc-9",
    "name": "Bánh xèo bếp trấu ",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "shortDescription": "Bánh xèo giòn rụm đượm mùi khói trấu đồng quê trong không gian miệt vườn Sắc màu làng quê.",
    "fullDescription": "Điểm trải nghiệm ẩm thực dân dã độc đáo thuộc tour du lịch cộng đồng 'Sắc màu làng quê' xã An Nhơn Tây. Du khách được tự tay đổ bánh xèo trên chảo gang đun tro trấu truyền thống và thưởng thức cùng các loại rau rừng Củ Chi thanh mát.",
    "lat": 10.964837993010923,
    "lng": 106.50771085581867,
    "address": "96C Trần Tử Bình, xã Củ Chi, TP. Hồ Chí Minh.",
    "coverImage": "https://cdn2.tuoitre.vn/tcdulichtphcm/media/upload/1-2024/images/2024-01-02/b--nh-x--o-qu---nh---1-1704185989-848-width660height440.jpg",
    "openingHours": "08:00 – 18:00 hằng ngày",
    "ticketPrice": "50.000 – 100.000 VNĐ / người",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-10",
    "name": "Điểm du lịch sinh thái Rạch Bù Cạp",
    "category": "nature",
    "categoryName": "Thiên nhiên & Sinh thái",
    "shortDescription": "Nhánh rạch tự nhiên rợp bóng dừa nước xanh mát thông ra sông Sài Gòn tại An Nhơn Tây.",
    "fullDescription": "Khu du lịch sinh thái cộng đồng tiêu biểu của xã An Nhơn Tây với cảnh quan dừa nước thơ mộng, trải nghiệm chèo xuồng ba lá, câu cá miệt vườn và thưởng thức ẩm thực sông nước thanh bình.",
    "lat": 11.110194752688813,
    "lng": 106.48498926691391,
    "address": "Rạch Bù Cạp (Rạch Bọ Cạp), xã An Nhơn Tây, TP. Hồ Chí Minh.",
    "coverImage": "https://images2.thanhnien.vn/528068263637045248/2026/2/8/82-du-lic-4-17705407568831689997757.jpg",
    "openingHours": "07:30 – 17:30 hằng ngày",
    "ticketPrice": "Miễn phí tham quan / Thuê xuồng theo dịch vụ",
    "sources": [
      {
        "id": "src-1",
        "name": "Cổng thông tin điện tử UBND Huyện An Nhơn Tây",
        "organization": "Ủy ban Nhân dân Huyện An Nhơn Tây, TP. Hồ Chí Minh",
        "url": "https://cuchi.hochiminhcity.gov.vn",
        "publishDate": "2026-01-15",
        "verifiedDate": "2026-10-18",
        "supportedFacts": [
          "Thông tin đơn vị hành chính, địa giới, dân số và cơ cấu kinh tế địa phương",
          "Định hướng phát triển du lịch sinh thái nông nghiệp và làng nghề truyền thống"
        ]
      },
      {
        "id": "src-3",
        "name": "Sở Du lịch Thành phố Hồ Chí Minh",
        "organization": "Trung tâm Xúc tiến Du lịch TP.HCM (Visit HCMC)",
        "url": "https://visithcmc.vn",
        "publishDate": "2026-03-20",
        "verifiedDate": "2026-10-19",
        "supportedFacts": [
          "Hành trình du lịch đường sông Sài Gòn đi An Nhơn Tây",
          "Làng nghề Bánh tráng Phú Hòa Đông và đan lát mây tre Thái Mỹ",
          "Đặc sản ẩm thực Bò tơ An Nhơn Tây và củ mì luộc chấm muối mè"
        ]
      }
    ],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  },
  {
    "id": "loc-1795156058939",
    "name": "Củ mì nước cốt dừa",
    "category": "cuisine",
    "categoryName": "Ẩm thực & Đặc sản",
    "shortDescription": "Củ mì nước cốt dừa (hay khoai mì nước cốt dừa) là món ăn vặt dân dã quen thuộc, đặc biệt phổ biến ở miền Tây Nam Bộ. Món này kết hợp vị bùi dẻo của củ mì với vị béo ngậy của nước cốt dừa và hương thơm dịu nhẹ từ lá dứa.",
    "fullDescription": "Củ mì nước cốt dừa (hay khoai mì nước cốt dừa) là món ăn vặt dân dã quen thuộc, đặc biệt phổ biến ở miền Tây Nam Bộ. Món này kết hợp vị bùi dẻo của củ mì với vị béo ngậy của nước cốt dừa và hương thơm dịu nhẹ từ lá dứa.",
    "lat": 11.05,
    "lng": 106.52,
    "address": "149–145 Đường An Nhơn Tây, xã An Nhơn Tây, TP. Hồ Chí Minh.",
    "coverImage": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    "openingHours": "07:30 – 17:00 hằng ngày",
    "ticketPrice": "Miễn phí / Theo quy định",
    "sources": [],
    "verifiedDate": "2026-11-20",
    "status": "verified"
  }
];

export const INITIAL_MEDIA_GALLERY: MediaItem[] = [
  {
    "id": "med-1795156570318",
    "title": "NGHĨA TRANG LIỆT SĨ HUYỆN CỦ CHI",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXNMRjg2rvoeAFn3LaLKIeEjtwO7BP1l6r2yvn8ltyQ&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "NGHĨA TRANG LIỆT SĨ HUYỆN CỦ CHI",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156539250",
    "title": "RẠCH BÙ CẠP",
    "url": "https://images2.thanhnien.vn/528068263637045248/2026/2/8/82-du-lich-8-17705413421011294751792.jpg",
    "type": "image",
    "category": "Lịch sử",
    "caption": "RẠCH BÙ CẠP",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156493956",
    "title": "BÁNH XÈO BẾP TRẤU",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuAsVW8tEsAJIX-H8UX_U5ChBwvPTVNQweGx7ox4qVug&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "BÁNH XÈO BẾP TRẤU",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156436200",
    "title": "LÀNG NGHỀ ĐAN ĐÁT TRUYỀN THỐNG ẤP GÓT CHÀNG",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvbqrXop4KrNb1YfYCLD7USP6mtM2t8d7TjrINIy47g&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "LÀNG NGHỀ ĐAN ĐÁT TRUYỀN THỐNG ẤP GÓT CHÀNG",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156379368",
    "title": "Nông Trang Xanh (Green Noen)",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUpLeDghf5S2ntehHmHwCccPA-m8laBTguNZwiHNK3Q&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "Nông Trang Xanh (Green Noen)",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156355679",
    "title": "CỦ MÌ NƯỚC CỐT DỪA",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOw9edTJ_e3MMSYOudD45gOSya55gEpF0QGHWjnIg7mg&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "CỦ MÌ NƯỚC CỐT DỪA",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156338021",
    "title": "ĐỀN BẾN DƯỢC",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Wy_xWQsq7LvvR8gip4UaUNxMfIbaYJwVw2-0uyG4cQ&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "ĐỀN BẾN DƯỢC",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156274802",
    "title": "ĐỊA ĐẠO CỦ CHI ",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUBrc_p47M-h8qx0RFFjKmqKKzQ3ZkyzomTYYmQuUXg&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "ĐỊA ĐẠO CỦ CHI ",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  },
  {
    "id": "med-1795156238867",
    "title": "ĐỊA ĐẠO CỦ CHI BẾN ĐÌNH",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrYsQ63a9-Q9olXmQynmIRMrv0sQWUUicl9mSmZ0G7g&s=10",
    "type": "image",
    "category": "Lịch sử",
    "caption": "ĐỊA ĐẠO CỦ CHI BẾN ĐÌNH",
    "source": "Lớp 12A5",
    "credit": "Học sinh 12A5 chụp thực tế",
    "verifiedDate": "2026-11-20"
  }
];

export const CLASS_12A5_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Trần Đức Lương",
    role: "Trưởng nhóm & Nghiên cứu Lịch sử - Di tích",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/luong_63bc9be9.JPG",
  },
  {
    id: 2,
    name: "Trần Hà Phụng Nhi",
    role: "Biên tập viên Văn hóa & Ẩm thực truyền thống",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/nhi.jpg",
  },
  {
    id: 3,
    name: "Phan Khánh Linh",
    role: "Chuyên viên Bản đồ số & Tọa độ địa lý",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/khanh_linh.jpg",
  },
  {
    id: 4,
    name: "Nguyễn Tường Lam",
    role: "Thiết kế Giao diện Retro Editorial & Thư viện Media",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/tuong_lam.jpg",
  },
  {
    id: 5,
    name: "Nguyễn Thị Quỳnh Như",
    role: "Kiểm định Tư liệu & Tích hợp Trợ lý AI",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/quynh_nhu.jpg",
  },
  {
    id: 6,
    name: "Trần Anh",
    role: "Lập trình",
    bio: "",
    tasks: [
      "",
      "",
      "",
    ],
    img: "/annhontay/assets/aistudio/tran_anh.jpg",
  },
];

export const TIMELINE_DATA: HistoricalEvent[] = [
  {
    year: '1880 - 1944',
    title: 'Thời kỳ thuộc địa & Khơi nguồn ngọn lửa cách mạng',
    description: 'Thôn An Nhơn Tây lần lượt thuộc hạt Sài Gòn rồi quận Hóc Môn (tỉnh Gia Định). Người dân vùng đất thuần nông kiên cường, giàu lòng yêu nước, sớm tiếp thu ánh sáng cách mạng và che chở cho các cơ sở cách mạng tiền khởi nghĩa.',
    source: 'Địa chí Văn hóa Lịch sử Sài Gòn - Gia Định'
  },
  {
    year: '1948',
    title: 'Khởi nguồn xây dựng hệ thống địa đạo kháng chiến chống Pháp',
    description: 'Phong trào đào hầm bí mật nhen nhóm và phát triển mạnh mẽ tại vùng đất Củ Chi - An Nhơn Tây. Các đoạn công sự, hầm ngầm phân tán từng bước được nối liền liên hoàn, trở thành căn cứ vững chắc bảo vệ an toàn cho cán bộ, chiến sĩ.',
    source: 'Lịch sử Di tích Lịch sử Địa đạo Củ Chi - Ban Quản lý Di tích'
  },
  {
    year: '1961 - 1965',
    title: 'Phát triển Căn cứ đầu não Địa đạo Bến Dược kháng chiến chống Mỹ',
    description: 'Sau phong trào Đồng Khởi năm 1960, vùng giải phóng Bắc Củ Chi được mở rộng liên hoàn. Địa đạo Bến Dược (An Nhơn Tây) được xây dựng kiên cố 3 tầng ngầm, trở thành căn cứ đầu não của Khu ủy và Bộ Tư lệnh Quân khu Sài Gòn - Chợ Lớn - Gia Định.',
    source: 'Hồ sơ Di tích Lịch sử Căn cứ Khu ủy Sài Gòn - Gia Định'
  },
  {
    year: '17/9/1967',
    title: 'Tuyên dương danh hiệu vẻ vang "Đất Thép Thành Đồng"',
    description: 'Tại Đại hội Anh hùng và Chiến sĩ thi đua toàn miền Nam lần thứ II, Ủy ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam long trọng phong tặng quân dân Củ Chi - An Nhơn Tây danh hiệu vinh dự cao quý cùng Huân chương Thành đồng hạng Nhất.',
    source: 'Văn kiện Lịch sử Kháng chiến Nam Bộ & Báo Quân Giải phóng'
  },
  {
    year: '1975 - 1976',
    title: 'Hợp nhất huyện Củ Chi trực thuộc TP. Hồ Chí Minh',
    description: 'Sau ngày 30/4/1975 thống nhất non sông, quận Phú Hòa (Bình Dương) và quận Củ Chi (Hậu Nghĩa) hợp nhất thành huyện Củ Chi trực thuộc TP.HCM. Xã An Nhơn Tây chính thức là đơn vị hành chính cấp xã của TP.HCM, bước vào công cuộc rà phá bom mìn và kiến thiết quê hương.',
    source: 'Lịch sử Hành chính Thành phố Hồ Chí Minh'
  },
  {
    year: '1993 - 1995',
    title: 'Khánh thành Đền tưởng niệm liệt sĩ Bến Dược',
    description: 'Công trình lịch sử - văn hóa - tâm linh quy mô lớn được khởi công xây dựng và long trọng khánh thành tại ấp Phú Hiệp, xã An Nhơn Tây, đời đời khắc ghi danh tính 44.752 anh hùng liệt sĩ đã hy sinh vì nền độc lập, tự do của Tổ quốc.',
    source: 'Khu Di tích Lịch sử Địa đạo Bến Dược'
  },
  {
    year: '23/12/2015',
    title: 'Xếp hạng Di tích Quốc gia Đặc biệt',
    description: 'Thủ tướng Chính phủ ký Quyết định số 2367/QĐ-TTg xếp hạng Di tích lịch sử Địa đạo Củ Chi (với trung tâm bảo tồn trọng điểm là Địa đạo Bến Dược - An Nhơn Tây) là Di tích Quốc gia Đặc biệt, khẳng định giá trị lịch sử và quân sự vô giá.',
    source: 'Quyết định số 2367/QĐ-TTg của Thủ tướng Chính phủ'
  },
  {
    year: '2020',
    title: 'Đạt chuẩn Xã Nông thôn mới nâng cao',
    description: 'Xã An Nhơn Tây được UBND TP.HCM công nhận đạt chuẩn Xã Nông thôn mới nâng cao. Cơ sở hạ tầng giao thông nhựa hóa đồng bộ, trường học trạm y tế chuẩn hóa, đời sống vật chất và tinh thần của người dân được nâng cao toàn diện.',
    source: 'Quyết định công nhận của UBND Thành phố Hồ Chí Minh'
  },
  {
    year: '11/11/2022',
    title: 'Ra mắt Không gian VH Hồ Chí Minh tại Chùa Hoằng Linh',
    description: 'Chùa Hoằng Linh (ấp Chợ Củ, xã An Nhơn Tây) là một trong những cơ sở Phật giáo đầu tiên trên địa bàn TP.HCM ra mắt Không gian văn hóa Hồ Chí Minh, lan tỏa sâu rộng tinh thần đại đoàn kết dân tộc, gắn kết đạo pháp với tình yêu Tổ quốc.',
    source: 'Báo Quân khu 7 & Báo Giác Ngộ TP.HCM'
  },
  {
    year: '2024 - 2025',
    title: 'Nghị quyết thành lập Xã An Nhơn Tây mới sáp nhập 3 xã',
    description: 'Thực hiện Nghị quyết số 1685/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp ĐVHC cấp xã tại TP.HCM, chính thức hợp nhất toàn diện 3 xã An Nhơn Tây, An Phú và Phú Mỹ Hưng thành Xã An Nhơn Tây mới với diện tích 77,70 km², dân số 40.896 người và 14 ấp, mở ra không gian phát triển đột phá.',
    source: 'Nghị quyết số 1685/NQ-UBTVQH15 & Đề án sắp xếp ĐVHC của UBND TP.HCM'
  }
];

export const CUCHI_STATS = {
  area: "434,77 km²",
  population: "Gần 500.000 người (Theo Niên giám thống kê TP.HCM)",
  administrativeUnits: "1 Thị trấn An Nhơn Tây và 20 xã ngoại thành",
  tunnelLength: "Hơn 250 km đường hầm dưới lòng đất",
  martyrsHonored: "44.752 Anh hùng Liệt sĩ được ghi danh tại Đền Bến Dược",
  heroicTitle: "Đất Thép Thành Đồng (Phong tặng 17/9/1967)",
  specialNationalMonument: "Di tích Quốc gia đặc biệt (Quyết định năm 2015)",
};
