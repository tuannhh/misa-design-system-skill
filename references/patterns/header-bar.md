# Header bar (Thanh điều hướng trên cùng) — MDS 2.0

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Định nghĩa

Header bar là **thanh điều hướng nằm ở phía trên cùng** của giao diện website hoặc ứng dụng. Nó thường chứa các thành phần như: **logo, tên sản phẩm, tìm kiếm, thông báo, avatar người dùng, v.v.**

## 1. Biến thể

- Dùng `light` cho Platform/header nền trắng; chữ và icon neutral, có `border-bottom` 1px.
- Dùng `brand` cho app cần header theo màu primary (có thể đổi theme); chữ và icon trắng.
- Chọn theo reference của sản phẩm đang làm. Không tự suy ra biến thể chỉ từ tên app.
- Ô tìm kiếm ở trạng thái chưa focus phải có cảm giác secondary: `--mds-bg-disabled` trên `light`, `white/15` trên `brand`. Khi focus mới chuyển thành nền trắng/độ tương phản cao.

## 2. Tooltip

- Khi **hover vào các tính năng/icon trên header bar** đều phải hiển thị **tooltip** mô tả chức năng.

## 3. Các thành phần trên Header bar

Theo tài liệu, header bar gồm các nhóm thành phần (bố trí từ trái sang phải):

- **Bên trái ngoài cùng**: nút **chuyển ứng dụng** dạng lưới **9 chấm**. Đây là điểm nhận diện bắt buộc của MISA Platform, dùng để mở app switcher/platform menu.
- **Bên trái sau app switcher**: Logo + tên sản phẩm/ứng dụng (kèm điều hướng về màn hình chính).
- **Ở giữa/bên phải**: Ô **tìm kiếm**.
- **Bên phải**: Cụm icon tiện ích theo thứ tự: **thiết lập**, **trợ lý số MISA AVA**, **chat**, **thông báo**, **hỗ trợ**, **More** trong vòng tròn, rồi **avatar người dùng** ở ngoài cùng bên phải. Có thể ẩn một tiện ích khi không thuộc scope app, nhưng không đảo thứ tự các mục còn lại.

### Quy tắc app switcher 9 chấm

- Luôn đặt ở mép trái header, trước logo/tên app.
- Icon là lưới 3×3 chấm, nét/điểm cùng màu với icon header; kích thước nhìn tương đương icon 20px.
- Hover/focus giống các icon button khác trên header và bắt buộc có tooltip "Chuyển ứng dụng".
- Không thay app switcher bằng hamburger/menu-2, dots ngang, dots dọc hoặc logo app.

*(Chi tiết hình dạng, kích thước từng icon được quy định bằng hình minh họa trong tài liệu gốc; không có giá trị px/hex dạng text nên không liệt kê để tránh sai lệch.)*

## 4. Lưu ý về trợ lý số MISA AVA

- **Avatar trợ lý số MISA AVA chính là avatar mascot của từng ứng dụng.**
- Ví dụ: ứng dụng AMIS Kế toán là **AVA Kế toán**, CRM là **AVA Bán hàng**...
- Chỉ dùng asset mascot được Product/Brand cung cấp. Component nhận `assistant.avatarUrl` hoặc slot `assistant`; không tự vẽ hoặc thay bằng avatar người dùng.

## 5. Các icon khác (Bán chéo, Kiến thức hữu ích...) để đâu?

- Các mục **quảng cáo, bán chéo sản phẩm KHÔNG đặt trên header bar** nữa.
- Chúng được hiển thị ở **màn hình Tổng quan** của các sản phẩm, theo quy chuẩn riêng trong mục "Quảng cáo và bán chéo" của tài liệu quy chuẩn.

---

*Ghi chú: Tài liệu gốc mô tả quy tắc bằng lời kèm hình minh họa; các giá trị px/hex cụ thể nằm trong hình ảnh nên không liệt kê tại đây để tránh sai lệch.*
