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

   | Đang làm gì | Đọc file |
   |---|---|
   | Dựng màn hình mới (bất kỳ) | [references/layout-patterns.md](references/layout-patterns.md) — bố cục 4 loại màn hình, chọn biến thể (Master-Detail, tab, card, drawer...) |
   | Màu sắc, font chữ, icon style | [references/styles.md](references/styles.md) — hệ màu 2 cấp, thang Brand, Text Styles, quy tắc icon stroke 1.5px |
   | Bảng dữ liệu (tick dòng, phân trang, lọc, sắp xếp) | [references/patterns/data-table.md](references/patterns/data-table.md) |
   | Header bar, Sidebar, Popup/Form | [references/patterns/](references/patterns/) — header-bar.md, sidebar.md, popup-form.md |
   | Form nhập liệu, luồng thao tác | [references/general-design-rules.md](references/general-design-rules.md) + [references/usability-requirements.md](references/usability-requirements.md) |
   | Thông báo, dialog, toast, loading, empty state, error page, biểu đồ | [references/communication.md](references/communication.md) |
   | Chọn/dùng component | [references/components.md](references/components.md) rồi đọc spec chi tiết trong `references/components/` (button, text-field, dropdown, combobox, checkbox, radio-button, date-time-picker, context-menu, tab, tree, input, icon...) |
   | Phím tắt, chính tả, định dạng số, tiêu đề trình duyệt, icon dùng chung, chat AI, bản quyền | [references/conventions.md](references/conventions.md) |

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
- **Icon: chỉ dùng SVG đóng gói sẵn trong [assets/icons/](assets/icons/)** — tra bảng hành động → icon tại [references/components/icons-map.md](references/components/icons-map.md). KHÔNG search icon trên internet, không dùng bộ icon khác (FontAwesome, Material...).
- **Màu sắc, font, kích thước: dùng token trong [assets/tokens.css](assets/tokens.css)** — không hard-code mã hex.

## Chọn tone màu (theme) cho ứng dụng

MDS có **10 theme chính thức**: blue (mặc định MISA, Brand/600 `#245FDF`), indigo, cyan, teal, green, orange, red, pink, purple, blue-gray — mỗi theme là 1 file trong [assets/tokens/themes/](assets/tokens/themes/) chứa đủ thang Brand 50→900 + màu Text/Icon/Stroke/Bg tương ứng.

**Khi người dùng muốn chọn/đổi tone màu app:**
1. Mở [assets/theme-preview.html](assets/theme-preview.html) trong trình duyệt (hoặc render các thẻ swatch tương tự) để người dùng xem 10 theme với thang màu + nút/tag minh họa và chọn.
2. Áp dụng theme đã chọn: import `assets/tokens/themes/<tên-theme>.css` vào project (kèm `base-colors.css`, `number.css`, `font.css`, `space-standard.css` nếu chưa có). Đổi theme runtime bằng thuộc tính `data-mds-theme="<tên>"` trên `<html>`.
3. **Không tự pha màu ngoài 10 theme.** App cần màu thương hiệu riêng ngoài bộ này → liên hệ đội Product Design.

Bộ token đầy đủ 2.639 biến (sinh từ Figma variables) nằm ở `assets/tokens/`; file nguồn JSON ở `assets/figma-tokens/` — cập nhật bằng `python3 scripts/build-tokens.py` khi có export mới.

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
- [ ] Nút Primary ở ngoài cùng bên phải; More ở bên phải Primary; mỗi màn hình chỉ 1 nút Primary
- [ ] Form Thêm/Sửa có Lưu/Hủy ghim cuối trang; màn Chi tiết có nút thao tác ghim góc trên phải
- [ ] Bảng dữ liệu: hành vi chọn dòng/chọn tất cả, phân trang, lọc, sắp xếp đúng `patterns/data-table.md`
- [ ] Control nhập liệu chọn đúng theo số lựa chọn (radio/dropdown/combo)
- [ ] Có giá trị mặc định hợp lý cho các trường nhập liệu; thứ tự trường theo thói quen tác nghiệp; Tab/Shift+Tab đi đúng thứ tự trái→phải, trên→dưới
- [ ] Mọi button có trạng thái loading/disabled sau khi click; xử lý > 1s có loading, > 5s có progress
- [ ] Thông báo lỗi tiếng Việt dễ hiểu, focus vào trường lỗi đầu tiên; toast tự đóng sau 5s
- [ ] Font Inter, chữ mặc định 13px; màu/size dùng token, không hard-code hex
- [ ] Icon từ `assets/icons/` (stroke 1.5px), đúng bảng icon dùng chung; phím tắt có tooltip
- [ ] Số định dạng kiểu Việt Nam: chấm ngăn nghìn, phẩy thập phân (1.234.567,89)
- [ ] Có empty state đúng chuẩn (initial state ≠ no data state); có cảnh báo thoát trang khi form đang nhập dở
- [ ] Chức năng phức tạp có hướng dẫn ngay trên form
