# Side bar (Thanh điều hướng) — MDS 2.0

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Định nghĩa

Sidebar là **thanh điều hướng nằm bên trái (hoặc phải)** giao diện website/app, thường chứa **menu, danh mục, liên kết nhanh** hoặc các tính năng phụ trợ giúp người dùng truy cập các phần chính của hệ thống dễ dàng hơn.

## 1. Style chuẩn & 2 chế độ hiển thị

- Dùng **style sidebar trắng** để giao diện trông **sạch và hiện đại** hơn.
- Sidebar chuẩn có **2 chế độ**: **Mở rộng (expanded)** và **Thu gọn (collapsed)**.

### Hành vi thu gọn / mở rộng

- Khi **hover chuột lên menu đang ở chế độ thu gọn** thì hiển thị **popover che lên giao diện app** để người dùng nhìn thấy toàn bộ các phân hệ một cách trực quan (mở tạm thời, không đẩy layout).
- **Di chuột ra ngoài vùng của menu** sẽ **tự động ẩn menu**, quay về chế độ thu gọn.
- Chỉ khi người dùng **chủ động bấm vào nút "Mở rộng"** thì mới hiển thị giao diện ở chế độ mở rộng **nằm dính dưới trang và đẩy giao diện ứng dụng sang phải** (mở cố định, chiếm layout).

## 2. Một số dạng sidebar khác (phân cấp menu)

1. **Sidebar có 1 cấp con**: thường sử dụng cho các **phân hệ cha bên trong có một vài phân hệ con** (xổ xuống dọc).
2. **Sidebar xổ cấp con sang ngang (flyout)**: áp dụng cho các loại danh mục có **rất nhiều danh mục con** — nếu dùng dạng xổ xuống thì phải cuộn chuột rất nhiều gây khó chịu. Ở dạng xổ ngang, các item **có thể có icon hoặc không**.
3. **Sidebar nhiều cấp con**: áp dụng cho các **menu động**, người dùng có thể tạo nhiều cấp menu tùy nhu cầu sử dụng. Ví dụ: Phòng ban cha → Phòng ban con → Phòng ban...n → Dự án.

## 3. Trạng thái của các item trên sidebar

- **Hover**: hiển thị **nền xám nhạt**.
- **Active**: hiển thị **nền màu brand nhạt**, đồng thời **đổi màu text và màu icon sang màu brand**.
- **Quy tắc active cha/con**:
  - Khi **item con đang active** thì **item cha không cần thể hiện trạng thái** active (ở chế độ mở rộng).
  - Nhưng khi sidebar ở trạng thái **Thu gọn** (các item con bị ẩn) thì **item cha cần có trạng thái active** để người dùng nhận biết đang active vào phân hệ nào.

---

*Ghi chú: Tài liệu gốc mô tả quy tắc bằng lời kèm hình minh họa; các giá trị px/hex cụ thể nằm trong hình ảnh nên không liệt kê tại đây để tránh sai lệch.*
