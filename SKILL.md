---
name: misa-design-system
description: >-
  Quy chuẩn System Design của MISA (MDS 2.0) cho mọi ứng dụng web trong hệ sinh thái MISA AMIS Platform.
  BẮT BUỘC dùng skill này mỗi khi tạo, sửa, hoặc review giao diện (UI) cho bất kỳ ứng dụng, màn hình, form,
  danh sách, popup, dashboard nào của MISA — kể cả khi người dùng không nhắc đến "design system".
  Trigger khi thấy: MISA, AMIS, MDS, làm app/web nội bộ MISA, tạo màn hình danh sách/chi tiết/thêm sửa,
  thiết kế UI, review UI, chuẩn hóa giao diện. Skill đảm bảo layout, component, button, form, màu sắc
  đúng quy chuẩn thiết kế MISA.
---

# MISA Design System (MDS 2.0)

Skill này giúp AI xây dựng UI đúng quy chuẩn thiết kế MISA khi phát triển ứng dụng trong MISA AMIS Platform. Mục tiêu: người dùng MISA mở bất kỳ app nào cũng thấy quen thuộc — cùng bố cục, cùng vị trí nút, cùng hành vi.

## Quy trình làm việc (làm theo thứ tự)

1. **Xác định loại màn hình** đang cần xây dựng: Tổng quan (dashboard), Danh sách, Thêm/Sửa, hay Chi tiết.
2. **Đọc reference tương ứng** trước khi viết code UI:
   - [references/layout-patterns.md](references/layout-patterns.md) — bố cục chuẩn cho từng loại màn hình, cách chọn biến thể (Master-Detail, tab, card, drawer...). **Luôn đọc file này khi dựng màn hình mới.**
   - [references/general-design-rules.md](references/general-design-rules.md) — 4 nguyên tắc thiết kế nền tảng (dễ học, dễ nhập liệu, kiểm soát thao tác, kiểm soát lỗi). Đọc khi thiết kế form nhập liệu hoặc luồng thao tác.
   - [references/components.md](references/components.md) — quy tắc chọn và dùng component (combo box, dropdown, button, popup...) theo bộ MDS Web Components v2.0. Đọc khi chọn component cho form/toolbar.
   - `references/components/*.md` — **spec chi tiết từng component** trích xuất từ Figma MDS v2.0 (input, tab, tree, date-time-picker, icon, icons-library). Khi dùng component nào, đọc file spec của component đó để làm đúng anatomy, biến thể, trạng thái.
3. **Áp dụng checklist** ở cuối file này trước khi bàn giao.

## Các quy tắc cốt lõi (áp dụng cho MỌI màn hình)

Đây là những quy tắc bất biến, vi phạm là sai quy chuẩn MISA:

- **Nút Primary luôn ở ngoài cùng bên phải** của toolbar/form. Nút phụ (secondary) nằm bên trái nút Primary. Nút "More" (⋯) nằm ngay bên phải nút Primary — và cặp Primary + More luôn ở ngoài cùng bên phải.
- **Màn hình Thêm/Sửa: nút Lưu và Hủy luôn ghim (sticky) ở cuối trang/form**, không trôi theo nội dung.
- **Màn hình Chi tiết: các nút thao tác với bản ghi luôn ghim ở góc trên bên phải.**
- **Màn hình Danh sách: nền xám**, bảng có khoảng cách với lề xung quanh; tiêu đề bảng bên trái toolbar, chức năng thao tác bên phải.
- **Mọi thao tác của người dùng phải có phản hồi**: disable button hoặc hiện busy indicator sau khi click; xử lý > 5 giây phải có thanh tiến trình (progress bar).
- **Lỗi nhập liệu**: cảnh báo dễ hiểu bằng tiếng Việt, tự động focus vào trường lỗi đầu tiên.
- **Icon và phím tắt của cùng một chức năng phải đồng nhất** trên toàn bộ ứng dụng; phím tắt phải có tooltip.

## Chọn control nhập liệu theo số lượng lựa chọn

| Số lựa chọn | Control |
|---|---|
| 2–3 | Radio button / Checkbox |
| 4–8 | Dropdown |
| > 8 | Combo box (có AutoComplete, LoadOnDemand) |

## Nguồn quy chuẩn gốc

Toàn bộ quy chuẩn cần thiết đã nằm trong skill này (`references/`). Tài liệu gốc (Figma MDS và trang quy chuẩn) là tài sản nội bộ, chỉ đội Product Design MISA nắm giữ — cần spec chưa có trong skill thì liên hệ đội Product Design, không tự suy đoán giá trị.

## Checklist trước khi bàn giao UI

Kiểm tra từng mục, sửa ngay nếu chưa đạt:

- [ ] Loại màn hình dùng đúng bố cục trong `layout-patterns.md` (đúng biến thể Master-Detail/tab/card phù hợp nghiệp vụ)
- [ ] Nút Primary ở ngoài cùng bên phải; More ở bên phải Primary
- [ ] Form Thêm/Sửa có Lưu/Hủy ghim cuối trang; màn Chi tiết có nút thao tác ghim góc trên phải
- [ ] Control nhập liệu chọn đúng theo số lựa chọn (radio/dropdown/combo)
- [ ] Có giá trị mặc định hợp lý cho các trường nhập liệu; thứ tự trường theo thói quen tác nghiệp
- [ ] Mọi button có trạng thái loading/disabled sau khi click; tác vụ > 5s có progress
- [ ] Thông báo lỗi tiếng Việt dễ hiểu, focus vào trường lỗi đầu tiên
- [ ] Icon/phím tắt đồng nhất, có tooltip
- [ ] Chức năng phức tạp có hướng dẫn ngay trên form
