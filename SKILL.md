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
- **Icon: dùng Tabler Icons với `stroke-width: 1.5`** làm thư viện triển khai (bộ demo chuẩn của giám đốc thiết kế dùng `@tabler/icons-vue`, wrapper `.ti`/`MIcon.vue`, icon kích thước `1em` theo font-size) — bộ icon MDS trên Figma cùng phong cách stroke 1.5 outline nên khớp với Tabler. Dùng qua component wrapper, **không inline SVG/map path riêng**, không trộn nhiều thư viện (FontAwesome, Material, Lucide, emoji). Ngoại lệ full-color: icon MISA AI (AVA) và AMIS Chat trên header là SVG asset riêng — xem [header-bar.md](references/patterns/header-bar.md) mục 3c.
- **Màu sắc, font, kích thước: dùng token trong [assets/tokens.css](assets/tokens.css)** — không hard-code mã hex.
- **Header Platform MISA luôn có nút chuyển ứng dụng 9 chấm ở mép trái**, trước logo/tên app; không thay bằng hamburger hoặc icon khác.
- **Header Platform chọn đúng biến thể theo sản phẩm/reference**: `light` (nền trắng) hoặc `brand` (nền primary) — người dùng đổi được trong dialog Thiết lập (Giao diện: Màu sắc/Sáng). Ô tìm kiếm ở trạng thái chưa focus là nền trung tính/white-alpha mờ; không dùng input trắng đặc trên header brand. Cụm tiện ích theo thứ tự: Thiết lập → AVA → Chat → Thông báo → Hỗ trợ → More tròn → avatar người dùng.
- **Màu icon header theo chế độ có ngoại lệ**: icon MISA AI (AVA) là asset full-color giữ nguyên ở cả 2 chế độ; icon AMIS Chat trắng trên header brand nhưng chuyển **#1570EF** (không phải neutral) trên header sáng; badge đếm luôn đỏ #F04438 — bảng đầy đủ trong [references/patterns/header-bar.md](references/patterns/header-bar.md) mục 3c.
- **AVA là asset mascot chính thức của MISA**: truyền asset chuẩn qua prop/slot, không tự minh họa lại mascot hoặc thay bằng avatar ngẫu nhiên.
- **Sidebar trắng kiểu mới dùng item bo góc trong gutter**, kể cả trạng thái thu gọn; không tô active tràn sát mép và không dùng vạch active 3px mép trái. Kích thước chuẩn: mở rộng 200px / thu gọn 64px, hover khi thu gọn thì mở đè lên app (không đẩy layout).
- **Mọi box trắng trên nền xám (dashboard card, KPI, panel bảng...) BẮT BUỘC dùng `box-shadow: 0 0 2px 0 rgba(0,0,0,0.10)` (token `--mds-shadow-card`, "Drop Shadow/Neutral/All 2") + `border-radius: 8px`** — chuẩn thống nhất toàn team, KHÔNG dùng border 1px để đóng khung, KHÔNG dùng drop shadow nổi. Shadow nổi (md/lg/dialog) chỉ dùng cho overlay (popup/dropdown/toast/dialog/drawer).
- **Màu viền (stroke) dùng chính thang Neutral**: viền mặc định = Stroke Neutral (Neutral/400 `#CED1D6`); phân tách rất nhẹ (dưới header, kẻ trong card, giữa dòng) = Stroke Neutral Light (Neutral/300 `#E9EAEB`). Không tạo hex viền riêng.
- **Khung app theo kích thước chuẩn**: Global Header 48px, Sub-nav tab 48px, Page header 56px, nền content xám `#ECEDEF`, padding/gap card 16px — xem mục "Khung ứng dụng chuẩn" trong [references/layout-patterns.md](references/layout-patterns.md).
- **Chiều cao control theo mật độ hiển thị (density)**: mặc định Trung bình (button 32px, input 36px, row bảng 36px); người dùng đổi được sang Compact/Rộng trong dialog Thiết lập — dùng token, không hard-code chiều cao.

## Chọn tone màu (theme) cho ứng dụng

MDS có **10 theme màu chính thức**: blue (mặc định MISA, Brand/600 `#245FDF`), indigo, cyan, teal, green, orange, red, pink, purple, blue-gray — mỗi theme là 1 file trong [assets/tokens/themes/](assets/tokens/themes/) chứa đủ thang Brand 50→900 + màu Text/Icon/Stroke/Bg tương ứng. Trong dialog Thiết lập của app còn có lựa chọn thứ 11 **Gradient** (token theme Green + header gradient `#245FDF→#0FBF79` — xem `references/styles.md`).

**Theme/giao diện là thiết lập của người dùng cuối, không chỉ của dev**: app chuẩn có dialog "Thiết lập màu sắc và hiển thị" mở từ nút Thiết lập trên header — gồm 3 tab: màu sắc (theme + chế độ header Màu sắc/Sáng), mật độ hiển thị (Compact/Trung bình/Rộng), hình nền (wallpaper + hiệu ứng kính). Spec chi tiết trong [references/patterns/header-bar.md](references/patterns/header-bar.md).

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

## Khi project KHÔNG dùng Vue 3, hoặc đã có kiến trúc/UI riêng từ trước

Nhiều project MISA không phải Vue 3 sạch từ đầu — ví dụ app vanilla JS/jQuery cũ, React, Angular, hoặc "lai" (1 khung Vue nhỏ bọc ngoài + phần thân trang render bằng chuỗi HTML/DOM thuần, template server-side...). Bài học rút ra từ 1 vụ thực tế (2026-07-20, app "MISA PR Workstation"): AI đã tự viết lại `<select>` gốc trình duyệt + class `.btn` tự chế "cho giống" MDS thay vì dùng đúng component/token — kết quả lệch hẳn bản demo dù nhìn "tạm ổn" ở cái nhìn đầu tiên. Để không lặp lại:

1. **Không tự chế lại token.** Dù không dùng được file `.vue` thật, vẫn PHẢI import nguyên vẹn `assets/tokens.css` (+ theme cần dùng trong `assets/tokens/themes/`) vào project, dùng đúng biến `var(--mds-*)`. **Tuyệt đối không tự khai báo lại một bộ biến số song song** (ví dụ tự viết `:root{--layout-sidebar-w: 240px}` bên cạnh `--mds-layout-sidebar-w: 200px` đã import) — hai bộ token lệch nhau là dấu hiệu chắc chắn đã làm sai, rất khó phát hiện bằng mắt vì cả hai đều "nhìn giống nhau".
2. **Không dùng phần tử HTML thô cho control đã có trong bộ**, kể cả khi framework không phải Vue: `<select>` gốc, `<button>` tự set style tay, checkbox/radio mặc định trình duyệt đều SAI quy chuẩn (không có chevron riêng, không đúng radius/state hover-focus-disabled, checkbox không bo góc 4px/tô brand khi check...). Thứ tự ưu tiên khi không thể mount thẳng file `.vue`:
   - **Ưu tiên 1**: viết lại phần UI đó thành đảo Vue nhỏ (mount 1 component Vue cụ thể vào 1 vùng DOM), dùng đúng file `.vue` trong `ui/components/` — áp dụng được cả trong app không phải Vue-SPA nếu có Vite/bundler.
   - **Ưu tiên 2** (framework khác hẳn Vue, hoặc không thể refactor lớn): viết lại đúng hành vi + markup + class CSS của component MDS bằng ngôn ngữ/framework của project (ví dụ dropdown popover tự dựng bằng React/vanilla JS y hệt cấu trúc trigger+popover của `MSelect.vue`), đọc kỹ file `.vue` gốc để chép đúng class Tailwind/token, KHÔNG chỉ nhìn ảnh chụp rồi áng chừng.
   - **Ưu tiên 3** (rủi ro rewrite quá lớn cho app cũ đang chạy production thật — vd sửa hàng chục nơi dùng native `<select>` trong 1 file JS khổng lồ có thể gãy logic `onchange` khắp nơi): CHO PHÉP giữ nguyên phần tử HTML gốc + chỉ ép CSS để đạt tối đa sự giống nhau về mặt nhìn (native `<select>` thêm `appearance:none` + `background-image` chevron đúng SVG/màu MDS; checkbox/radio thêm `appearance:none` + vẽ lại đúng 16px/radius 4px/màu brand khi check) — nhưng PHẢI nói rõ với người dùng đây là "parity một phần" (hành vi/markup panel dropdown vẫn là mặc định trình duyệt, không có bàn phím nav/animation như MSelect thật), không được báo cáo là "đã dùng đúng component".
3. **Đừng chỉ nhìn ảnh chụp tĩnh là xong.** Bug thực tế ở trên (nút thu gọn sidebar không phản hồi khi bấm, icon rơi về `help-circle`) chỉ lộ ra khi bấm/hover thật và soi CSS đang thắng ở trạng thái nào — ảnh chụp trạng thái mặc định không thấy được. Trước khi báo "xong", phải tự thao tác (click, hover, đổi theme/density) trên trình duyệt thật, không chỉ đọc code hoặc xem 1 tấm ảnh.
4. **Nếu có bản build/deploy tách biệt với source đang sửa** (Cloud Run, Railway, Netlify...), luôn build+test lại **local trước**, đối chiếu commit đang chạy production có khớp source hiện tại không — một bug "code đúng nhưng vẫn lỗi trên production" nhiều khả năng là do bản deploy đang chạy cũ hơn source, không phải do logic sai.

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
- [ ] Mọi box trắng trên nền xám dùng đúng `box-shadow: 0 0 2px 0 rgba(0,0,0,0.10)` + radius 8px (không border đóng khung, không shadow nổi); stroke dùng thang Neutral (400 mặc định / 300 phân tách nhẹ); header 48px, sub-nav 48px, sidebar 200/64px đúng khung chuẩn
- [ ] Chiều cao control dùng token density (button 32/input 36 ở mật độ Trung bình), không hard-code
- [ ] Slideshow dùng `MImageViewer`, có Esc, mũi tên, counter, thumbnail và alt text
- [ ] Mobile/PWA đã kiểm tra theo `mobile-pwa.md`: đổi layout theo size class, không có desktop sidebar cố định ở compact, touch target >= 48px trên coarse pointer, safe area/bàn phím không che footer hoặc field
- [ ] Số định dạng kiểu Việt Nam: chấm ngăn nghìn, phẩy thập phân (1.234.567,89)
- [ ] Có empty state đúng chuẩn (initial state ≠ no data state); có cảnh báo thoát trang khi form đang nhập dở
- [ ] Chức năng phức tạp có hướng dẫn ngay trên form
- [ ] **Nếu project không dùng Vue 3 / không mount được file `.vue` thật**: đã import nguyên `assets/tokens.css` (không tự khai báo token song song), control select/checkbox/radio/button đã được style lại đúng chuẩn (không phải mặc định trình duyệt) — đã tự bấm/hover/thao tác thật trên trình duyệt để xác nhận, không chỉ xem ảnh chụp tĩnh
