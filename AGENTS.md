# Quy chuẩn UI MISA Design System (MDS 2.0)

> File này dành cho các coding agent đọc chuẩn AGENTS.md (Cursor, Antigravity, Codex, GitHub Copilot, Zed...).
> Người dùng Claude Code dùng bản SKILL.md cùng thư mục (nội dung tương đương).

Mọi giao diện (UI) tạo ra cho ứng dụng MISA / MISA AMIS Platform **bắt buộc** tuân theo quy chuẩn dưới đây. Mục tiêu: người dùng MISA mở bất kỳ app nào cũng thấy quen thuộc — cùng bố cục, cùng vị trí nút, cùng hành vi.

## Quy trình khi làm UI

1. Xác định loại màn hình: **Tổng quan (dashboard) / Danh sách / Thêm-Sửa / Chi tiết**.
2. Đọc file quy chuẩn tương ứng trong thư mục `references/` (cùng thư mục với file này):
   - `references/layout-patterns.md` — bố cục chuẩn từng loại màn hình, cách chọn biến thể. **Luôn đọc khi dựng màn hình mới.**
   - `references/general-design-rules.md` — 4 nguyên tắc thiết kế nền tảng. Đọc khi thiết kế form nhập liệu/luồng thao tác.
   - `references/components.md` — quy tắc chọn và dùng component MDS. Đọc khi chọn component.
   - `references/components/*.md` — spec chi tiết từng component (input, tab, tree, date-time-picker, icon...). Đọc file của component đang dùng.
3. Trước khi bàn giao, đối chiếu **Checklist** cuối file này.

## Quy tắc cốt lõi (áp dụng cho MỌI màn hình)

- **Nút Primary luôn ở ngoài cùng bên phải** của toolbar/form. Nút phụ nằm bên trái nút Primary. Nút "More" (⋯) nằm ngay bên phải nút Primary — cụm `[nút phụ] [Primary] [More]` luôn căn phải.
- **Màn hình Thêm/Sửa: nút Lưu và Hủy luôn ghim (sticky) ở cuối trang/form.**
- **Màn hình Chi tiết: các nút thao tác với bản ghi ghim ở góc trên bên phải.**
- **Màn hình Danh sách: nền xám**, bảng cách lề xung quanh; tiêu đề bảng bên trái toolbar, chức năng thao tác bên phải; click dòng mở chi tiết.
- **Mọi thao tác phải có phản hồi**: disable button hoặc busy indicator sau khi click; xử lý > 5 giây phải có progress bar.
- **Lỗi nhập liệu**: cảnh báo tiếng Việt dễ hiểu, tự động focus trường lỗi đầu tiên.
- **Icon và phím tắt của cùng chức năng phải đồng nhất** toàn ứng dụng; phím tắt có tooltip.
- Trường nhập liệu: có giá trị mặc định hợp lý, thứ tự theo thói quen tác nghiệp, tự động điền khi có thể.

## Chọn control nhập liệu theo số lượng lựa chọn

| Số lựa chọn | Control |
|---|---|
| 2–3 | Radio button / Checkbox |
| 4–8 | Dropdown |
| > 8 | Combo box (AutoComplete + LoadOnDemand, thao tác được hoàn toàn bằng bàn phím, cho thêm nhanh danh mục) |

## Checklist trước khi bàn giao UI

- [ ] Đúng bố cục loại màn hình theo `references/layout-patterns.md` (đúng biến thể phù hợp nghiệp vụ)
- [ ] Nút Primary ngoài cùng bên phải; More bên phải Primary
- [ ] Form Thêm/Sửa: Lưu/Hủy ghim cuối trang; màn Chi tiết: nút thao tác ghim góc trên phải
- [ ] Control nhập liệu đúng theo số lựa chọn (radio/dropdown/combo)
- [ ] Trường nhập có giá trị mặc định hợp lý; thứ tự theo tác nghiệp
- [ ] Button có loading/disabled sau click; tác vụ > 5s có progress
- [ ] Lỗi tiếng Việt dễ hiểu, focus trường lỗi đầu tiên
- [ ] Icon/phím tắt đồng nhất, có tooltip; chức năng phức tạp có hướng dẫn trên form
- [ ] Component dùng đúng spec trong `references/components/` (nếu có file spec tương ứng)

## Nguồn quy chuẩn gốc

Toàn bộ quy chuẩn cần thiết đã nằm trong thư mục `references/`. Tài liệu gốc là tài sản nội bộ của đội Product Design MISA — cần spec chưa có thì liên hệ đội Product Design, không tự suy đoán giá trị.
