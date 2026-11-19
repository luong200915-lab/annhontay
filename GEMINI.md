# BẮT BUỘC: QUY TRÌNH KIỂM TRA & SAO LƯU TRƯỚC KHI THỰC HIỆN BẤT KỲ THAO TÁC NÀO

Theo chỉ đạo bắt buộc của người dùng, trước khi thực hiện bất kỳ lệnh, chỉnh sửa mã nguồn hoặc thay đổi nào:

1. **Kiểm tra xem đã lưu chưa:**
   - Luôn kiểm tra `git status` xem có thay đổi nào chưa được lưu/commit không.
   
2. **Lưu lại:**
   - Nếu có thay đổi đang dở dang, lập tức commit lưu lại an toàn ở local (`git add .` và `git commit -m "..."`).

3. **Tạo 1 bản back để có thể tiện quay lại:**
   - Tạo tag hoặc nhánh backup trước khi thực hiện việc mới:
     ```bash
     git branch -f backup-latest
     git tag -f backup-restore-point
     ```
   - Khi người dùng yêu cầu quay lại (back/revert), luôn có thể quay lại chính xác trạng thái này mà không làm mất bất kỳ dữ liệu nào.

4. **Tuyệt đối tuân thủ:**
   - Không tự ý chạy `git push origin main` hoặc `npm run deploy` (gh-pages) trừ khi người dùng yêu cầu rõ ràng.
