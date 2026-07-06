# Styles — Màu sắc, Kiểu chữ, Icons

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Màu sắc

Hệ màu MDS tổ chức 2 cấp:

### Nhóm Base — màu cấp 1 (khai báo giá trị trực tiếp)

| Bộ màu | Mục đích |
|---|---|
| Brand | Màu chính của app |
| Accent | Màu nhấn mạnh (ít sử dụng) |
| Info | Thông tin mang tính hướng dẫn |
| Warning | Thông báo cảnh báo |
| Danger | Hành động nguy hiểm: Xóa, hủy dữ liệu... |
| Success | Thông báo thành công |
| Neutral | Màu trung tính: text, border, background (thang số 50→950) |
| Alpha White | Trắng có opacity — đặt trên nền màu đậm |
| Alpha Black | Đen có opacity — đặt trên nền trắng |

- Base còn có: Black `#000000`, White `#FFFFFF`.
- **Các ứng dụng có thể tùy chỉnh màu nhóm Base theo app của mình** (thang màu sinh theo công cụ uicolors.app từ mã màu chính).

### Thang Brand mặc định (đọc từ bảng biến chính thức)

| Biến | Hex |
|---|---|
| Brand/Default | `#2563EB` |
| Brand/Hover | `#1D4ED8` |
| Brand/Pressed | `#1E40AF` |
| Brand/Disabled | `#93C5FD` |
| Brand/Light Selected | `#EFF6FF` |
| Brand/Light Hover | `#DBEAFE` |
| Brand/Light Pressed | `#BFDBFE` |

Mỗi bộ màu Base đều có đủ các bậc: Default, Hover, Pressed, Disabled, Light Selected, Light Hover, Light Pressed.

### Nhóm cấp 2: Text / Icon / Stroke / Bg (chỉ tham chiếu, KHÔNG khai báo hex mới)

Nhóm này link tới biến nhóm Base — khi đổi màu Base, toàn bộ cấp 2 tự ăn theo. **Dự án không chỉnh màu trực tiếp ở cấp 2.**

Mapping nhóm Text (mẫu chuẩn):

| Biến Text | Tham chiếu |
|---|---|
| Primary Neutral | Base/Neutral/950 |
| Secondary Neutral | Base/Neutral/600 |
| Hint Neutral | Base/Neutral/400 |
| Disabled Neutral | Base/Neutral/400 |
| Brand / Link | Base/Brand/Default |
| Brand Disabled / Link Disabled | Base/Brand/Disabled |
| White | Base/White |
| White Disabled | Base/Alpha White/700 |
| Info | Base/Info/Default |

**Cách áp dụng khi code:** khai báo thang Base thành CSS variables (xem `assets/tokens.css`), các màu ngữ nghĩa (text, icon, border, bg) luôn trỏ về biến Base — không hard-code hex rải rác trong component.

> Lưu ý: một số spec component đo từ bản export (input.md, icon.md) ghi `#245FDF` cho primary — đây là biến thể Brand của app cụ thể. Brand mặc định của MDS là `#2563EB`; khi làm app mới, dùng thang Brand mặc định trừ khi app có màu thương hiệu riêng.

## Kiểu chữ

- **Font duy nhất: Inter** cho tất cả ứng dụng MISA (sans-serif tối ưu cho màn hình).
- **Kích thước tiêu chuẩn: 13px** — nếu không có lý do đặc biệt, toàn bộ text dùng size này.

### Text Styles (size/line-height, px)

| Style | Size/LH | Dùng cho |
|---|---|---|
| H1 — Banner Title | 24/36 | Tiêu đề lớn trên banner |
| H2 — App, Page Title | 20/28 | Tiêu đề app, tiêu đề page |
| H3 — Form, Card, Section, Group Title | 16/22 | Tiêu đề form, popup, dialog, section, group |
| Body Regular | 13/18 | **Mặc định cho mọi text** |
| Body Large | 16/20 | Đoạn văn bản lớn, rich text, nội dung bài viết |

### Weight trong Body (khi nào dùng gì)

| Weight | Dùng cho |
|---|---|
| Regular | Label, dữ liệu trên bảng, mô tả — mọi dữ liệu thông thường |
| Medium | Chữ trong Button, Tag, Header của bảng, Navigation text |
| Semi Bold | Nội dung cần phân cấp mạnh hơn Medium (vd: Tên người) |
| Bold | Data number cần nhấn mạnh |

## Icons

- **Dạng stroke, nét 1.5px** (KHÔNG dùng nét 2px) — cho cả đường nét trong và ngoài; đầu nét tròn (rounded) hoặc phẳng (butt-cap). Nét 1.5px giúp giao diện thoáng, hợp với web app/dashboard nhiều dữ liệu.
- Nguồn icon: bộ opensource **Tabler** (đã đóng gói sẵn trong `assets/icons/` với stroke 1.5px — xem [components/icons-map.md](components/icons-map.md)).
- **Kích thước:** phổ biến 16 / 20 / 24 / 32px; 3 mức tiêu chuẩn: nhỏ 16px — trung bình 24px (mặc định) — lớn 32px. Kích thước icon nên khớp line-height của text đi kèm.
- **Vùng chạm:** icon tương tác đứng riêng lẻ cần vùng chạm tối thiểu **40px**.
- **Radius:** viền ngoài bo 3px (icon chi tiết phức tạp: 2px).
- **Filled icon** chỉ dùng 2 trường hợp: (1) cặp filled/outline thể hiện trạng thái active/inactive; (2) icon đứng một mình trên nền phức tạp cần tương phản (vd: pin vị trí trên bản đồ).
- Màu icon theo ngữ cảnh và theme — dùng token, không tô màu tùy tiện.
