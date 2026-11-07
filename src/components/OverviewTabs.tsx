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
      summary: "Tại sao An Nhơn Tây được mệnh danh là Đất Thép?",
      content: `Địa hình An Nhơn Tây là vùng đồi gò chuyển tiếp từ cao nguyên Đông Nam Bộ xuống đồng bằng Tây Nam Bộ. Tầng đất nơi đây chủ yếu là đất sét pha đá ong (Laterite) và sỏi đỏ phong hóa. Khi ở sâu trong lòng đất có độ ẩm, đất dẻo có thể dùng cuốc chim xắn gọt dễ dàng; nhưng khi tiếp xúc với không khí khô ráo, vách hầm thoát nước và se lại rắn chắc như xi măng đúc. Nhờ đặc tính địa chất độc nhất vô nhị này, hàng trăm km đường hầm địa đạo dù không có bê tông cốt thép vẫn đứng vững trước đạn pháo và bom rải thảm.`,
    },
    {
      id: "geo" as const,
      title: "Vị Trí Cửa Ngõ Tây Bắc",
      icon: Landmark,
      summary: "Hành lang chiến lược kết nối TP.HCM với Tây Ninh và Long An",
      content: `Huyện An Nhơn Tây có diện tích 434,77 km², bao gồm 1 thị trấn và 20 xã. Nằm ở bờ hữu ngạn sông Sài Gòn, An Nhơn Tây tiếp giáp tỉnh Bình Dương (Bến Cát, Dầu Tiếng) ở phía Đông, tỉnh Tây Ninh (Trảng Bàng) ở phía Bắc, tỉnh Long An (Đức Hòa) ở phía Tây Nam, và quận 12, huyện Hóc Môn ở phía Nam. Vị trí này biến An Nhơn Tây thành địa bàn chiến lược xung yếu trong mọi thời kỳ lịch sử của Sài Gòn - Gia Định.`,
    },
    {
      id: "culture" as const,
      title: "Làng Nghề & Di Sản Dân Gian",
      icon: Shield,
      summary: "Hương vị gạo mới và đôi bàn tay khéo léo trăm năm",
      content: `Văn hóa An Nhơn Tây kết tinh từ nếp sống cần cù, kiên cường của người nông dân Nam Bộ. Nổi tiếng nhất là Làng nghề Bánh tráng Phú Hòa Đông với hơn một thế kỷ đỏ lửa lò tráng bánh, Làng đan lát tre nứa Thái Mỹ, nghề làm mành trúc Tân Thông Hội. Người dân An Nhơn Tây vừa anh dũng trong thời chiến, vừa đôn hậu, hiếu khách và giữ trọn đạo lý Uống nước nhớ nguồn trong thời bình.`,
    },
    {
      id: "future" as const,
      title: "Nông Nghiệp 4.0 & Sinh Thái",
      icon: Sprout,
      summary: "Chuyển mình mạnh mẽ thành đô thị sinh thái xanh",
      content: `Không dừng lại ở truyền thống lịch sử, An Nhơn Tây hôm nay là trung tâm phát triển nông nghiệp công nghệ cao lớn nhất TP.HCM. Khu NNCNC tại Phạm Văn Cội là nơi nhân giống hàng triệu cành hoa lan Mokara, dưa lưới hữu cơ và rau sạch thủy canh. Song song đó, các mô hình du lịch sinh thái miệt vườn ven sông Sài Gòn như xã Trung An đang đưa An Nhơn Tây trở thành 'lá phổi xanh' hấp dẫn du khách gần xa.`,
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
            <span aria-hidden="true" className="text-[#687267]">
              ·
            </span>
            <span className="text-xs text-[#687267] font-medium">
              Kiểm chứng từ tài liệu địa chất & lịch sử Đảng bộ An Nhơn Tây
            </span>
          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#29372D] mb-4">
            {currentTopic.title}
          </h3>

          <div className="prose max-w-none text-[#29372D] text-base leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#356B4B]">
              {currentTopic.content}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#356B4B]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#687267]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A85B]" />
              <span>
                Chủ đề được tích hợp vào cơ sở tri thức Trợ lý AI An Nhơn Tây
              </span>
            </div>
            <span className="italic">
              Nguồn: Viện Khoa học Xã hội Vùng Nam Bộ & UBND Huyện An Nhơn Tây
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
