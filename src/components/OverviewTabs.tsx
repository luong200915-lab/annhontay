import React, { useState } from "react";
import { Layers, Shield, Sparkles, Sprout, Landmark } from "lucide-react";

export const OverviewSection: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<
    "soil" | "geo" | "culture" | "future"
  >("soil");

  const topics = [
    {
      id: "soil" as const,
      title: "Đất Thép & Địa Chất",
      icon: Layers,
      summary: "Truyền thống lịch sử và đặc điểm địa chất – thổ nhưỡng",
      content: `Địa hình An Nhơn Tây là vùng đồi gò chuyển tiếp từ cao nguyên Đông Nam Bộ xuống đồng bằng Tây Nam Bộ. Tầng đất nơi đây chủ yếu là đất sét pha đá ong (Laterite) và sỏi đỏ phong hóa. Khi ở sâu trong lòng đất có độ ẩm, đất dẻo có thể dùng cuốc chim xắn gọt dễ dàng; nhưng khi tiếp xúc với không khí khô ráo, vách hầm thoát nước và se lại rắn chắc như xi măng đúc. Nhờ đặc tính địa chất độc nhất vô nhị này, hàng trăm km đường hầm địa đạo dù không có bê tông cốt thép vẫn đứng vững trước đạn pháo và bom rải thảm.`,
    },
    {
      id: "geo" as const,
      title: "Vị Trí Cửa Ngõ Tây Bắc",
      icon: Landmark,
      summary: "Vùng đất chiến lược kết nối TP.HCM với khu vực Tây Ninh, thuận lợi phát triển giao thông và liên kết vùng.",
      content: (
        <div className="space-y-4">
          <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#356B4B]">
            Xã An Nhơn Tây nằm ở phía Tây Bắc của Thành phố Hồ Chí Minh, cách phường{" "}
            <a
              href="https://vi.wikipedia.org/wiki/B%C3%ACnh_D%C6%B0%C6%A1ng_(ph%C6%B0%E1%BB%9Dng)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
            >
              Bình Dương
            </a>{" "}
            khoảng 37 km về phía Tây và cách phường{" "}
            <a
              href="https://vi.wikipedia.org/wiki/S%C3%A0i_G%C3%B2n_(ph%C6%B0%E1%BB%9Dng)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
            >
              Sài Gòn
            </a>{" "}
            khoảng 47 km về phía Bắc, thuộc khu vực{" "}
            <a
              href="https://vi.wikipedia.org/wiki/C%E1%BB%A7_Chi_(huy%E1%BB%87n)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
            >
              Củ Chi
            </a>{" "}
            trước đây, có vị trí địa lý:
          </p>
          <div className="bg-[#FAF6ED] p-4 rounded-xl border border-[#356B4B]/20 space-y-2.5 text-sm sm:text-base">
            <div className="flex items-start gap-2.5">
              <span className="text-[#356B4B] font-bold text-lg leading-none mt-0.5">·</span>
              <span>
                <strong>Phía Bắc và phía Đông:</strong> giáp với phường Tây Nam với ranh giới là{" "}
                <a
                  href="https://vi.wikipedia.org/wiki/S%C3%B4ng_S%C3%A0i_G%C3%B2n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
                >
                  Sông Sài Gòn
                </a>
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#356B4B] font-bold text-lg leading-none mt-0.5">·</span>
              <span>
                <strong>Phía Nam:</strong> giáp với xã{" "}
                <a
                  href="https://vi.wikipedia.org/wiki/Nhu%E1%BA%ADn_%C4%90%E1%BB%A9c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
                >
                  Nhuận Đức
                </a>
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#356B4B] font-bold text-lg leading-none mt-0.5">·</span>
              <span>
                <strong>Phía Tây Nam:</strong> giáp với xã{" "}
                <a
                  href="https://vi.wikipedia.org/wiki/Th%C3%A1i_M%E1%BB%B9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
                >
                  Thái Mỹ
                </a>
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#356B4B] font-bold text-lg leading-none mt-0.5">·</span>
              <span>
                <strong>Phía Tây Bắc:</strong> giáp xã{" "}
                <a
                  href="https://vi.wikipedia.org/wiki/H%C6%B0ng_Thu%E1%BA%ADn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
                >
                  Hưng Thuận
                </a>{" "}
                thuộc tỉnh{" "}
                <a
                  href="https://vi.wikipedia.org/wiki/T%C3%A2y_Ninh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B4B] hover:text-[#243D2B] font-semibold underline underline-offset-2"
                >
                  Tây Ninh
                </a>
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "culture" as const,
      title: "Làng Nghề & Di Sản Dân Gian",
      icon: Shield,
      summary: "Hương vị gạo mới và đôi bàn tay khéo léo trăm năm",
      content: `Văn hóa xã An Nhơn Tây (Củ Chi) mang đậm bản sắc vùng miệt vườn Nam Bộ, là sự hòa quyện sâu sắc giữa truyền thống yêu nước kiên cường và nếp sống làng quê chân chất, nghĩa tình. Nơi đây lưu giữ chiều sâu văn hóa lịch sử – tâm linh qua Khu di tích Địa đạo Củ Chi (Bến Dược) và Đền tưởng niệm liệt sĩ Bến Dược, nơi tinh thần "đất thép thành đồng" cùng đạo lý "uống nước nhớ nguồn" luôn được tiếp nối trang nghiêm qua bao thế hệ. Song hành với những giá trị hào hùng ấy là không gian văn hóa dân gian mộc mạc được bảo tồn sống động qua mô hình du lịch cộng đồng "Sắc màu làng quê", nơi tiếng Đờn ca tài tử ngọt ngào vang lên giữa những khu vườn xanh mát, hòa cùng nhịp sống nhà nông bình dị với cảnh chèo xuồng trên rạch, các trò chơi dân gian và văn hóa ẩm thực độc đáo chế biến từ cây khoai mì – thứ đặc sản dân dã mang đậm dấu ấn ký ức và hồn quê của vùng đất Củ Chi.`,
    },
    {
      id: "future" as const,
      title: "Nông Nghiệp 4.0 & Sinh Thái",
      icon: Sprout,
      summary: "Chuyển mình mạnh mẽ thành đô thị sinh thái xanh",
      content: `Nông nghiệp và sinh thái tại xã An Nhơn Tây (Huyện Củ Chi cũ) nổi bật với bước chuyển mình mạnh mẽ từ sản xuất truyền thống sang mô hình nông nghiệp đô thị công nghệ cao kết hợp du lịch sinh thái, tận dụng hiệu quả lợi thế quỹ đất rộng và nguồn nước dồi dào từ hệ thống kênh Đông. Địa phương phát triển đa dạng các mô hình trồng rau an toàn theo chuẩn VietGAP, trồng nấm linh chi, hoa lan, cây kiểng cùng chăn nuôi bò sữa theo quy trình khép kín, bền vững. Song hành với sản xuất sạch, An Nhơn Tây còn đóng vai trò như "lá phổi xanh" vùng Tây Bắc TP.HCM với những cánh đồng lúa, vườn cây ăn trái và hệ thống rạch tự nhiên (như rạch Bù Cạp) thanh bình, tạo nền tảng cho các mô hình du lịch cộng đồng "Sắc màu làng quê" cùng nhiều nông trại giáo dục trải nghiệm tiêu biểu như Nông Trang Xanh (Green Noen) hay Nông trại Hoa Lúa, mang đến không gian gắn kết hài hòa giữa con người và thiên nhiên.`,
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTopic) || topics[0];

  return (
    <section className="py-10 sm:py-12 bg-[#F2E8D5] mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-[#243D2B]/20 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C76B45] font-bold">
              Khái Quát Địa Lý & Văn Hóa
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#243D2B] tracking-wide mt-5">
              Giải Mã Đất Thép — Từ Căn Cứ Hào Hùng Đến Đô Thị Sinh Thái
            </h2>
          </div>

          <p className="text-xs md:text-sm text-[#352C24]/75 max-w-md font-body">
            Tìm hiểu căn nguyên địa chất, vị trí địa lý đắc địa và sức sống bền
            bỉ của vùng đất cửa ngõ Tây Bắc Sài Gòn qua các thời kỳ.
          </p>
        </div>

        {/* Interactive Topic Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 pt-5">
          {topics.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#356B4B] shadow-md -translate-y-0.5"
                    : "bg-[#F5F0E6] border-[#356B4B]/15 hover:bg-white/70 text-[#687267]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-2 rounded-lg ${isSelected ? "bg-[#356B4B] text-white" : "bg-[#EAE2D2] text-[#356B4B]"}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-bold tracking-tight ${isSelected ? "text-[#356B4B]" : "text-[#29372D]"}`}
                  >
                    {t.title}
                  </span>
                </div>
                <p className="text-xs text-[#687267] line-clamp-2 leading-relaxed">
                  {t.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Detailed Narrative Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#356B4B]/20 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#D9A85B]">
              Hồ sơ chuyên đề
            </span>

          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#29372D] mb-4">
            {currentTopic.title}
          </h3>

          <div className="prose max-w-none text-[#29372D] text-base leading-relaxed">
            {typeof currentTopic.content === "string" ? (
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#356B4B]">
                {currentTopic.content}
              </p>
            ) : (
              currentTopic.content
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
