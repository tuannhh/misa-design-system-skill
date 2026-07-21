# Header bar (Thanh điều hướng trên cùng) — MDS 2.0

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Định nghĩa

Header bar là **thanh điều hướng nằm ở phía trên cùng** của giao diện website hoặc ứng dụng. Nó thường chứa các thành phần như: **logo, tên sản phẩm, tìm kiếm, thông báo, avatar người dùng, v.v.**

## 1. Biến thể

- Dùng `light` cho Platform/header nền trắng; chữ và icon neutral, có `border-bottom` 1px.
- Dùng `brand` cho app cần header theo màu primary (có thể đổi theme); chữ và icon trắng. Theme Gradient tô header bằng `linear-gradient(90deg, #245FDF, #0FBF79)`.
- **Biến thể do người dùng chọn** trong dialog "Thiết lập màu sắc và hiển thị" (mục Giao diện: **Màu sắc** = brand / **Sáng** = light), lưu `localStorage`. Chọn mặc định theo reference của sản phẩm đang làm; không tự suy ra biến thể chỉ từ tên app.
- Ô tìm kiếm ở trạng thái chưa focus phải có cảm giác secondary: nền trung tính (`--bg-neutral-light`) trên `light`, `rgba(255,255,255,0.2)` trên `brand`. Khi focus chỉ tăng nhẹ độ tương phản (`rgba(255,255,255,0.28)` trên brand) — không đổi thành input trắng đặc.

### Kích thước chuẩn (từ bộ demo chuẩn)

- Header cao **48px**, padding ngang 16px.
- Logo app: hộp trắng **32×32px** bo góc 6px, icon brand 18px bên trong (trên header brand); tên app **20px semibold** màu trắng (trên brand) / text-primary (trên light).
- Sau tên app: vạch dọc 1×20px `rgba(255,255,255,0.25)`, rồi **nút chọn công ty/đơn vị** (chữ 14px medium + chevron-down) và **badge năm dữ liệu** ("Dữ liệu năm 2025": cao 28px, nền white/20, chấm xanh 6px viền trắng).
- Ô tìm kiếm: rộng **240px**, cao 32px, bo 8px.
- Icon button trên header: **32×32px**, icon 24px, bo 8px, hover `rgba(255,255,255,0.15)` (brand) / `--bg-neutral-hover` (light); badge đếm đỏ `#F04438` pill min-width 16px chữ 10px bold ở góc trên phải.
- Avatar người dùng: **30px** tròn, nền trắng, chữ tắt 11px bold màu brand.

## 2. Tooltip

- Khi **hover vào các tính năng/icon trên header bar** đều phải hiển thị **tooltip** mô tả chức năng.

## 3. Các thành phần trên Header bar

Theo tài liệu, header bar gồm các nhóm thành phần (bố trí từ trái sang phải):

- **Bên trái ngoài cùng**: nút **chuyển ứng dụng** dạng lưới **9 chấm**. Đây là điểm nhận diện bắt buộc của MISA Platform, dùng để mở app switcher/platform menu.
- **Bên trái sau app switcher**: Logo + tên sản phẩm/ứng dụng (kèm điều hướng về màn hình chính).
- **Ở giữa/bên phải**: Ô **tìm kiếm**.
- **Bên phải**: Cụm icon tiện ích theo thứ tự: **thiết lập**, **trợ lý số MISA AVA**, **chat**, **thông báo**, **hỗ trợ**, **More** trong vòng tròn, rồi **avatar người dùng** ở ngoài cùng bên phải. Có thể ẩn một tiện ích khi không thuộc scope app, nhưng không đảo thứ tự các mục còn lại.

> **Bẫy thường gặp khi triển khai bằng `MHeaderBar.vue`**: slot `actions` render **TRƯỚC** nút Thiết lập (dùng cho nút phụ ngoài cụm chuẩn, ví dụ nút "Đăng nhập" khi chưa login) — **không được** nhét notification/identity tự chế vào slot này, sẽ đẩy chúng lệch sang trái thay vì đúng vị trí trong cụm/ngoài cùng bên phải. Muốn tuỳ biến nút avatar (vd dropdown kèm tên/vai trò thay vì chỉ avatar đơn giản) → dùng slot `user` (bọc quanh nút avatar mặc định, giữ đúng vị trí ngoài cùng bên phải). Ca lỗi thật đã gặp: app "AMIS Kho Ảnh" từng đặt cả chuông thông báo lẫn dropdown identity vào slot `actions`, khiến chúng hiện ở đầu cụm thay vì cuối — đã sửa 2026-07-20.

### Quy tắc app switcher 9 chấm

- Luôn đặt ở mép trái header, trước logo/tên app.
- Icon là lưới 3×3 chấm, nét/điểm cùng màu với icon header; kích thước nhìn tương đương icon 20px.
- Hover/focus giống các icon button khác trên header và bắt buộc có tooltip "Chuyển ứng dụng".
- Không thay app switcher bằng hamburger/menu-2, dots ngang, dots dọc hoặc logo app.

*(Chi tiết hình dạng, kích thước từng icon được quy định bằng hình minh họa trong tài liệu gốc; không có giá trị px/hex dạng text nên không liệt kê để tránh sai lệch.)*

## 3b. Dialog "Thiết lập màu sắc và hiển thị" (nút Thiết lập trên header)

Nút Thiết lập (icon settings) mở dialog cá nhân hóa toàn app — dạng dialog full-width trượt từ mép trên (bo góc 12px chỉ 2 góc trên, max-width 1440px), có 3 tab:

1. **Thiết lập màu sắc**: radio Giao diện (**Màu sắc** = header nền brand / **Sáng** = header trắng) + dãy swatch **10 theme màu + Gradient**; bên dưới có **preview thu nhỏ toàn app** (header, sub-nav, sidebar, dashboard) đổi màu theo lựa chọn trước khi Lưu.
2. **Thiết lập hiển thị**: chọn mật độ dữ liệu — Trung bình (mặc định) / Compact / Rộng, mỗi lựa chọn có preview 3 hàng bảng đúng chiều cao thật (xem bảng density trong `styles.md`).
3. **Hình nền**: chọn wallpaper cho app (lưới thumbnail + lựa chọn "Không có"). Khi bật wallpaper, giao diện chuyển sang **hiệu ứng kính (glass)**: card/table nền `rgba(255,255,255,0.72–0.80)` + `backdrop-filter: blur(14–16px)` + viền `rgba(255,255,255,0.6)`; header trắng, sidebar, dialog vẫn **solid** để đảm bảo độ đọc; dropdown gần solid (`0.95`).

Footer dialog: Hủy (outline) + Lưu (primary) — chỉ áp dụng thay đổi khi bấm Lưu. Mọi lựa chọn lưu `localStorage` (`mds-theme`, `mds-header-mode`, `mds-density`, `mds-wallpaper`).

## 3c. Màu icon trên header theo chế độ (QUAN TRỌNG — dễ làm sai)

Không phải icon nào trên header cũng đổi màu theo chế độ. Quy tắc từ bộ demo chuẩn:

| Thành phần | Header màu (brand) | Header sáng (light) |
|---|---|---|
| Icon thường (Thiết lập, Thông báo, Trợ giúp, More, 9 chấm) | trắng | `--icon-neutral` `#6B707A` |
| **Icon MISA AI (AVA)** | **giữ nguyên full-color** | **giữ nguyên full-color** |
| **Icon AMIS Chat** | trắng | **`#1570EF`** (giữ màu nhận diện, KHÔNG chuyển neutral) |
| Badge đếm trên Chat/Thông báo | đỏ `#F04438`, chữ trắng | đỏ `#F04438`, chữ trắng (không đổi) |
| Tên app, nút chọn công ty | trắng | `--text-primary` |
| Badge năm dữ liệu | nền `white/20`, chữ trắng | nền trong suốt + viền 1px `--stroke-neutral`, chữ `--text-primary` |
| Ô tìm kiếm | nền `white/20`, chữ/icon trắng mờ | nền `--bg-neutral-light`, icon neutral |
| Vạch ngăn dọc | `rgba(255,255,255,0.25)` | `--stroke-neutral-light` |
| Avatar người dùng | nền trắng, chữ màu brand | giữ nguyên |

**Icon MISA AI (AVA) là asset full-color cố định** (SVG chuẩn từ Figma, node 20062:2582): hình tròn nền **gradient kim cương cyan `#37E1FF` → xanh `#2B67FF`**, vòng viền trắng 60% opacity 1.5px, bên trong là **mặt mascot AVA** (2 mắt gradient xanh, vùng mặt trắng→xanh nhạt, khoang miệng navy đậm `#0A1496→#020D42`, miệng cười trắng). KHÔNG tự vẽ lại, KHÔNG tint theo màu icon khác, KHÔNG thay bằng icon sparkles/robot generic.

**Icon AMIS Chat là asset riêng cố định `MHeaderIconChat.vue`** (bong bóng chat bo tròn, **fill đặc 1 màu** — KHÔNG phải icon outline/stroke như `message` trong `MIcon`/`iconRegistry`, KHÔNG phải badge tròn màu cố định kiểu AVA). Path SVG lấy đúng từ asset gốc `IconAmisChat.vue` của bộ demo chuẩn: 1 path duy nhất vẽ cả khung bong bóng lẫn 3 chấm bên trong, dùng `fill-rule="evenodd"` để 3 chấm hiện ra như "lỗ khoét" (trong suốt, lộ màu nền phía sau) thay vì tô riêng màu trắng. Màu icon dùng `fill="currentColor"`, tint qua `buttonClass` như icon thường: trắng trên header brand, `#1570EF` trên header sáng (KHÔNG chuyển `--icon-neutral`). **Lịch sử sai 2 lần trước khi đúng (2026-07-16)**: lần 1 dùng icon `message` outline generic của `MIcon` (sai hình dạng), lần 2 dựng badge tròn nền màu cố định kiểu AVA (sai hoàn toàn, giám đốc thiết kế bác bỏ cả 2 mode) — **không lặp lại 2 cách này**.

## 4. Lưu ý về trợ lý số MISA AVA

- **Avatar trợ lý số MISA AVA chính là avatar mascot của từng ứng dụng.**
- Ví dụ: ứng dụng AMIS Kế toán là **AVA Kế toán**, CRM là **AVA Bán hàng**...
- Chỉ dùng asset mascot được Product/Brand cung cấp. Component nhận `assistant.avatarUrl` hoặc slot `assistant`; không tự vẽ hoặc thay bằng avatar người dùng.
- Nút gọi AVA trong nội dung màn hình (vd nút "AVA Kế toán" cạnh section Hạch toán của form) dùng **button AI gradient** (`#1482FF→#CF11FF`, xem styles.md) kèm chính icon AVA full-color, thường ở dạng split button.

## 5. Các icon khác (Bán chéo, Kiến thức hữu ích...) để đâu?

- Các mục **quảng cáo, bán chéo sản phẩm KHÔNG đặt trên header bar** nữa.
- Chúng được hiển thị ở **màn hình Tổng quan** của các sản phẩm, theo quy chuẩn riêng trong mục "Quảng cáo và bán chéo" của tài liệu quy chuẩn.

---

*Ghi chú: Tài liệu gốc mô tả quy tắc bằng lời kèm hình minh họa; các giá trị px/hex cụ thể nằm trong hình ảnh nên không liệt kê tại đây để tránh sai lệch.*
