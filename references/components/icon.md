# Icon

> Nguồn: Icon.pdf — export từ Figma MDS Web Components v2.0

Trạng thái component: **Đã phát hành** (MISA Design System — https://www.misa.vn, © 2024 MISA JSC).

## 1. Mô tả & nguyên tắc

- Icon trong MDS là icon dạng vector, nguồn gốc từ bộ **Tabler Icons** (https://tabler.io/icons) hoặc tự vẽ theo quy tắc của MDS.
- Mỗi icon có 2 style: **Outline** (mặc định, nét viền) và **Filled** (tô đặc). Khi dùng style Filled thì chỉ được chọn icon có biến thể dạng Filled (đặt tên `*-filled`, ví dụ `star-filled`, `info-circle-filled`, `alert-triangle-filled`, `circle-check-filled`…).
- Icon được flatten thành 1 vector duy nhất trong Frame đúng kích thước, tên Frame = tên icon trên Tabler (ví dụ `a-b-2`).

## 2. Hai component sử dụng

Sử dụng 1 trong 2 component sau:

| Component | Hành vi | Kích thước hỗ trợ |
|---|---|---|
| **Icon Swap Resize** | Icon tự động resize theo mode Space; kích thước hiển thị có thể không chuẩn xác tuyệt đối theo Size đã chọn | 4 kích thước: **12, 16, 20, 24px** |
| **Icon Swap** | Icon hiển thị đúng chính xác kích thước đã chọn | Đầy đủ các kích thước từ **12 đến 48px** |

### Variants (props của component)

| Prop | Ý nghĩa |
|---|---|
| `Size` | Kích thước icon |
| `Color` | Màu sắc icon (ví dụ giá trị: Neutral…) |
| `Hierarchy` | Phân cấp màu sắc (ví dụ giá trị: Secondary…) |
| `Filled` | Bật/tắt style Filled (toggle, mặc định tắt = Outline) |
| `Icon` | Lựa chọn icon cụ thể |

Giá trị mặc định thấy trong panel Figma: Size = 16, Color = Neutral, Hierarchy = Secondary, Filled = off.

## 3. Kích thước chuẩn (px)

Thang kích thước icon thể hiện trong bảng size của file (mỗi màu có đủ 2 style Outline/Filled ở từng size):

| Nhóm | Kích thước frame icon (px) |
|---|---|
| Icon Swap Resize | 12, 16, 20, 24 |
| Icon Swap (đầy đủ) | 12, 16, 20, 24, 28, 32, 36, 40, 44, 48 |

Ghi chú: glyph bên trong (ví dụ icon hình tròn) chiếm ~75% frame (glyph 18px trong frame 24px) — đúng theo lưới của Tabler Icons.

## 4. Màu sắc icon

Bảng màu icon trích trực tiếp từ vector trong file (áp dụng cho cả Outline và Filled):

| Màu (tên gợi ý theo ngữ cảnh) | Hex | Ghi chú |
|---|---|---|
| Neutral (xám — mặc định/secondary) | `#6B707A` | Xám trung tính, dùng cho icon thường |
| Xám nhạt | `#8F949D` | Sắc độ xám nhạt hơn, xuất hiện trong bảng màu filled |
| Xanh dương chính (Primary/Brand) | `#245FDF` | Màu xanh chủ đạo |
| Xanh dương đậm | `#2753CE` | Biến thể đậm của xanh chính |
| Xanh dương sáng (Info) | `#2E90FA` | |
| Tím (Purple) | `#9E77ED` | |
| Cam (Warning) | `#F79009` | |
| Đỏ (Danger/Error) | `#F04438` | |
| Xanh lá (Success) | `#12B76A` | |
| Trắng | `#FFFFFF` | Dùng trên nền đậm/nền màu |
| Gradient tím–xanh | — | Biến thể gradient (AI), không đọc được mã màu chính xác từ file |

Lưu ý: file Figma không ghi nhãn tên token cho từng màu; tên ngữ cảnh ở trên suy từ quy ước màu chức năng (warning/danger/success) — mã hex là chính xác 100% từ vector.

## 5. Icon trong container (nút icon / icon badge)

Trang cuối thể hiện icon đặt trong container vuông bo góc **32×32px**, glyph icon nhỏ bên trong (~14px), 3 kiểu:

### 5.1. Solid — nền đậm, icon trắng (`#FFFFFF`)

| Màu | Nền container |
|---|---|
| Xanh chính | `#245FDF` |
| Tím | `#9E77ED` |
| Xanh dương | `#1570EF` |
| Cam | `#F79009` |
| Đỏ | `#F04438` |
| Xanh lá | `#12B76A` |
| Xám | `#717680` |

### 5.2. Soft — nền nhạt, icon giữ màu chính

| Màu icon | Nền container | Icon |
|---|---|---|
| Xanh chính | `#DDEAFC` | `#245FDF` |
| Tím | `#EDE9FE` | `#9E77ED` |
| Xanh dương sáng | `#EFF8FF` | `#2E90FA` |
| Cam | `#FFFAEB` | `#F79009` |
| Đỏ | `#FEF3F2` | `#F04438` |
| Xanh lá | `#ECFDF3` | `#12B76A` |
| Xám | `#FAFAFA` | `#6B707A` |

### 5.3. Outline — nền trắng, viền màu nhạt, icon màu chính (container ~34px kể cả viền)

| Màu icon | Viền container | Icon |
|---|---|---|
| Xanh chính | `#68A6F2` | `#245FDF` |
| Tím | `#C4B5FD` | `#9E77ED` |
| Xanh dương sáng | `#53B1FD` | `#2E90FA` |
| Cam | `#FDBA74` | `#F79009` |
| Đỏ | `#F97066` | `#F04438` |
| Xanh lá | `#32D583` | `#12B76A` |
| Xám | `#CED1D6` | `#6B707A` |

## 6. Quy trình thêm icon mới vào Design System (quy tắc cho designer)

Trường hợp chưa có icon trong DS thì có thể tự thêm icon mới:

1. Tìm icon trên https://tabler.io/icons hoặc tự vẽ theo quy tắc của MDS.
2. **Copy SVG** và paste vào Figma; copy tên icon trên web (nhấn vào tên) để đổi tên Frame theo đúng tên đó (ví dụ `a-b-2`).
3. Xóa layer khung bao bọc hình vuông (thường là layer cuối cùng), chọn tất cả layer trong Frame và **Flatten (Ctrl + E)** — lưu ý **không đổi tên layer**.
4. Bấm **Ctrl + Alt + K** để tạo thành Component (frame chuẩn 24×24).

## 7. Fix lỗi icon

- Một số icon bị lỗi **reset stroke và color về mặc định** do quá trình chuyển file.
- Cách khắc phục: **bật rồi tắt lại prop Filled** trong panel component — icon sẽ trở về trạng thái chuẩn.

## 8. Do / Don't (rút từ tài liệu)

| Do | Don't |
|---|---|
| Dùng `Icon Swap` khi cần kích thước hiển thị chính xác tuyệt đối | Không dùng `Icon Swap Resize` cho ngữ cảnh yêu cầu size chuẩn xác (nó resize theo Space, có thể lệch size) |
| Khi bật Filled, chọn icon có biến thể `*-filled` | Không bật Filled với icon chỉ có bản outline |
| Đặt tên Frame/Component đúng tên icon trên Tabler | Không đổi tên layer vector sau khi Flatten |
| Xóa layer khung vuông bao ngoài trước khi Flatten | Không giữ layer khung nền khi tạo component icon |
