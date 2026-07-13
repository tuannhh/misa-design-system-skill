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

> **Trước khi làm bất kỳ việc gì trong repo này** (sửa component, thêm control, đổi kiến trúc...), đọc [MEMORY.md](MEMORY.md) — bối cảnh dự án, quyết định đã chốt, bẫy đã gặp (vd: `.gitignore` chặn dist/), quy tắc merge nhiều nhánh. Có quyết định lớn mới thì cập nhật lại MEMORY.md.

## Quy trình làm việc (làm theo thứ tự)

1. **Xác định loại màn hình** đang cần xây dựng: Tổng quan (dashboard), Danh sách, Thêm/Sửa, hay Chi tiết.
2. **Đọc reference tương ứng** trước khi viết code UI:

   | Đang làm gì | Đọc file |
   |---|---|
   | Dựng màn hình mới (bất kỳ) | [references/layout-patterns.md](references/layout-patterns.md) — bố cục 4 loại màn hình, chọn biến thể (Master-Detail, tab, card, drawer...) |
   | Màu sắc, font chữ, icon style | [references/styles.md](references/styles.md) — hệ màu 2 cấp, thang Brand, Text Styles, quy tắc icon stroke 1.5px |
   | Bảng dữ liệu (tick dòng, phân trang, lọc, sắp xếp) | [references/patterns/data-table.md](references/patterns/data-table.md) |
   | Header bar, Sidebar, Popup/Form | [references/patterns/](references/patterns/) — header-bar.md, sidebar.md, popup-form.md |
   | Xem ảnh/slideshow | [references/patterns/image-viewer.md](references/patterns/image-viewer.md) |
   | Mobile, responsive hoặc PWA | [references/patterns/mobile-pwa.md](references/patterns/mobile-pwa.md) |
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
- **Icon: Figma MDS là nguồn chuẩn; [assets/icons/](assets/icons/) là gói lõi đã xác minh, không phải toàn bộ thư viện.** Tra bundle → bảng map → trang Icons Figma. Dùng `MIcon.vue`, không inline SVG/map path riêng. Nếu Figma có nhưng bundle thiếu, bổ sung đúng SVG chính thức và chạy generator; chỉ dùng Tabler/tự vẽ sau khi xác minh Figma thật sự chưa có. Không trộn FontAwesome, Material, Lucide hay emoji vào app.
- **Màu sắc, font, kích thước: dùng token trong [assets/tokens.css](assets/tokens.css)** — không hard-code mã hex.
- **Header Platform MISA luôn có nút chuyển ứng dụng 9 chấm ở mép trái**, trước logo/tên app; không thay bằng hamburger hoặc icon khác.
- **Header Platform chọn đúng biến thể theo sản phẩm/reference**: `light` (nền trắng) hoặc `brand` (nền primary). Ô tìm kiếm ở trạng thái chưa focus là nền trung tính/white-alpha mờ; không dùng input trắng đặc trên header brand. Cụm tiện ích theo thứ tự: Thiết lập → AVA → Chat → Thông báo → Hỗ trợ → More tròn → avatar người dùng.
- **AVA là asset mascot chính thức của MISA**: truyền asset chuẩn qua prop/slot, không tự minh họa lại mascot hoặc thay bằng avatar ngẫu nhiên.
- **Sidebar trắng kiểu mới dùng item bo góc trong gutter**, kể cả trạng thái thu gọn; không tô active tràn sát mép và không dùng vạch active 3px mép trái.
- **Dashboard card/box dùng stroke 1px, không dùng shadow**; shadow chỉ dùng cho overlay như popup/dropdown/toast/dialog/drawer.

## Chọn tone màu (theme) cho ứng dụng

MDS có **10 theme chính thức**: blue (mặc định MISA, Brand/600 `#245FDF`), indigo, cyan, teal, green, orange, red, pink, purple, blue-gray — mỗi theme là 1 file trong [assets/tokens/themes/](assets/tokens/themes/) chứa đủ thang Brand 50→900 + màu Text/Icon/Stroke/Bg tương ứng.

**Khi người dùng muốn chọn/đổi tone màu app:**
1. Mở [assets/theme-preview.html](assets/theme-preview.html) trong trình duyệt (hoặc render các thẻ swatch tương tự) để người dùng xem 10 theme với thang màu + nút/tag minh họa và chọn.
2. Áp dụng theme đã chọn: import `assets/tokens/themes/<tên-theme>.css` vào project (kèm `base-colors.css`, `number.css`, `font.css`, `space-standard.css` nếu chưa có). Đổi theme runtime bằng thuộc tính `data-mds-theme="<tên>"` trên `<html>`.
3. **Không tự pha màu ngoài 10 theme.** App cần màu thương hiệu riêng ngoài bộ này → liên hệ đội Product Design.

Bộ token đầy đủ 2.639 biến (sinh từ Figma variables) nằm ở `assets/tokens/`; file nguồn JSON ở `assets/figma-tokens/` — cập nhật bằng `python3 scripts/build-tokens.py` khi có export mới.

## Sinh FE trực tiếp bằng bộ MDS UI (PD design-in-code)

Repo này kèm **bộ control Vue 3 + Tailwind viết sẵn** tại [ui/components/](ui/components/) (**26 control**: Icon, Button, Input, Textarea, Checkbox, RadioGroup, Select, Combobox, Tag, Spinner, Progress, Dialog, Toast, Tabs, EmptyState, DataTable, DatePicker, DateRangePicker, Drawer, ContextMenu, Tooltip, DropdownMenu, HeaderBar, Sidebar, Chart, ImageViewer) và **4 màn hình mẫu** tại [ui/templates/](ui/templates/) (ListPage, FormPage, DetailPage, DashboardPage). Khi người dùng (PD/PM) yêu cầu dựng màn hình cho app MISA:

1. **Bắt đầu từ màn hình mẫu**: xác định loại màn hình → clone file trong `ui/templates/` làm khung rồi sửa theo nghiệp vụ, KHÔNG dựng layout từ đầu (root template dùng `h-full` — mount trong container cao 100vh).
2. **Bắt buộc dùng control có sẵn** — tra nhanh props/emits/quy tắc trong [assets/component-map.json](assets/component-map.json), chi tiết đọc file `.vue` (có comment tiếng Việt). **CẤM viết HTML thô** (button, input, select...) cho control đã có trong bộ.
3. Project chưa có bộ control → copy các file `.vue` cần dùng vào `src/components/mds/` + import tokens theo hướng dẫn [ui/README.md](ui/README.md). Dùng MChart thì `npm i echarts`.
4. Đổ **mock data tiếng Việt giống thật** (tên người, phòng ban, mã chứng từ...), đủ các trạng thái (loading, empty, error).
5. Mở dev server/preview cho người dùng xem và chỉnh bằng ngôn ngữ tự nhiên — sản phẩm chốt chính là FE chuyển cho dev gắn API.
6. Control chưa có trong bộ (Tree, Upload...): dựng inline theo spec trong `references/`, dùng token `var(--mds-*)`, và ghi chú TODO đề xuất bổ sung vào bộ chung.

Xem/duyệt toàn bộ control: `cd ui/playground && npm install && npm run dev` (có nút đổi 10 theme).

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
- [ ] Icon dùng `MIcon` từ bundle đã xác minh (stroke 1.5px), đúng bảng icon dùng chung; icon thiếu đã được đối chiếu Figma và bổ sung vào MDS trước khi dùng; phím tắt có tooltip
- [ ] Header có nút chuyển ứng dụng 9 chấm ở mép trái trước logo/tên app
- [ ] Header dùng đúng biến thể `light`/`brand`; đủ cụm Setting, AVA, Chat, Notification, Help, More, avatar theo scope sản phẩm
- [ ] Sidebar collapsed/expanded giống rail trắng MISA: item bo góc trong gutter, active không tràn mép
- [ ] Card/box dashboard dùng border/stroke 1px, không dùng shadow
- [ ] Slideshow dùng `MImageViewer`, có Esc, mũi tên, counter, thumbnail và alt text
- [ ] Mobile/PWA đã kiểm tra theo `mobile-pwa.md`: đổi layout theo size class, không có desktop sidebar cố định ở compact, touch target >= 48px trên coarse pointer, safe area/bàn phím không che footer hoặc field
- [ ] Số định dạng kiểu Việt Nam: chấm ngăn nghìn, phẩy thập phân (1.234.567,89)
- [ ] Có empty state đúng chuẩn (initial state ≠ no data state); có cảnh báo thoát trang khi form đang nhập dở
- [ ] Chức năng phức tạp có hướng dẫn ngay trên form
