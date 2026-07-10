# Bảng tra icon chuẩn MDS — hành động → file SVG

Bộ icon SVG chuẩn được đóng gói sẵn tại **`assets/icons/`** (cùng repo/thư mục cài đặt của bộ quy chuẩn này). MDS 2.0 dùng bộ icon nền Tabler nên các file này chính là glyph chuẩn.

## Quy tắc bắt buộc khi dùng icon

1. **KHÔNG search icon trên internet, không dùng bộ icon khác** (FontAwesome, Material, Heroicons...). Chỉ dùng icon trong `assets/icons/`.
2. Copy file SVG cần dùng vào thư mục assets của project (hoặc inline SVG vào component).
3. **Không sửa path/hình dạng icon.** Các file đã được set sẵn `stroke-width="1.5"` theo quy chuẩn MDS (KHÔNG đổi về 2). Giữ `stroke="currentColor"` — đổi màu bằng CSS `color` với token trong `assets/tokens.css`:
   - Mặc định: `color: var(--mds-icon-neutral)` (#6B707A)
   - Nhấn mạnh/primary: `var(--mds-primary)` · Nguy hiểm: `var(--mds-danger)` · Thành công: `var(--mds-success)` · Cảnh báo: `var(--mds-warning)` · Thông tin: `var(--mds-info)`
4. Kích thước chuẩn: 16/20/24/32px theo token `--mds-icon-*` (mặc định 24px; icon trong button/input thường 16px). Icon tương tác đứng riêng lẻ cần vùng chạm tối thiểu 40px. Set qua `width`/`height`, không scale méo.
5. Icon cần thêm mà chưa có trong `assets/icons/`: lấy thêm từ bộ Tabler outline (cùng tên quy ước, nhớ đổi stroke-width về 1.5) hoặc hỏi đội Product Design — không chế icon mới.
6. Danh sách 21 hành động có icon quy định cứng toàn MISA (Thêm, Sửa, Xóa, In, Tìm kiếm, Reload, Thiết lập, Bộ lọc, Nhập/Xuất khẩu, xem dạng card/kanban/danh sách...): xem mục "Icon dùng chung" trong [../conventions.md](../conventions.md).

## Hành động CRUD & thao tác dữ liệu

| Hành động | File icon |
|---|---|
| Thêm mới | `plus.svg` |
| Sửa | `pencil.svg` |
| Xóa | `trash.svg` |
| Lưu | `device-floppy.svg` |
| Nhân bản / Sao chép | `copy.svg` |
| Tìm kiếm | `search.svg` |
| Lọc / Bỏ lọc | `filter.svg` / `filter-off.svg` |
| Nạp lại / Làm mới | `refresh.svg` |
| Sắp xếp tăng / giảm / đổi chiều | `sort-ascending.svg` / `sort-descending.svg` / `arrows-sort.svg` |
| Xuất khẩu / Nhập khẩu | `file-export.svg` / `file-import.svg` |
| Tải xuống / Tải lên | `download.svg` / `upload.svg` |
| In | `printer.svg` |
| Chia sẻ | `share.svg` |
| Gửi | `send.svg` |

## Điều hướng & bố cục

| Hành động | File icon |
|---|---|
| Mở rộng / Thu gọn | `chevron-down.svg` / `chevron-up.svg` |
| Sang trang trước / sau | `chevron-left.svg` / `chevron-right.svg` |
| Về trang đầu / cuối (phân trang) | `chevrons-left.svg` / `chevrons-right.svg` |
| Quay lại / Tiến / Lên / Xuống | `arrow-left.svg` / `arrow-right.svg` / `arrow-up.svg` / `arrow-down.svg` |
| Nút More (thao tác khác) | `dots.svg` (ngang) / `dots-vertical.svg` (dọc) |
| Menu | `menu-2.svg` |
| Xem dạng lưới card / danh sách | `layout-grid.svg` / `list.svg` |
| Đóng (popup, tag, drawer) | `x.svg` |
| Xác nhận / Đồng ý | `check.svg` |
| Trang chủ | `home.svg` |
| Link ngoài / Liên kết | `external-link.svg` / `link.svg` |

## Trạng thái & thông báo

| Ý nghĩa | File icon | Màu token |
|---|---|---|
| Thông tin | `info-circle.svg` | `--mds-info` |
| Cảnh báo | `alert-triangle.svg` hoặc `alert-circle.svg` | `--mds-warning` |
| Thành công | `circle-check.svg` | `--mds-success` |
| Lỗi | `circle-x.svg` | `--mds-danger` |
| Trợ giúp | `help.svg` | `--mds-icon-neutral` |
| Thông báo (chuông) | `bell.svg` | `--mds-icon-neutral` |

## Nghiệp vụ & đối tượng

| Ý nghĩa | File icon |
|---|---|
| Người dùng / Nhóm người dùng | `user.svg` / `users.svg` |
| Ngày tháng / Giờ | `calendar.svg` / `clock.svg` |
| Xem / Ẩn (mật khẩu, cột) | `eye.svg` / `eye-off.svg` |
| Email / Điện thoại | `mail.svg` / `phone.svg` |
| Thư mục / Tệp / Văn bản | `folder.svg` / `file.svg` / `file-text.svg` |
| Đính kèm | `paperclip.svg` |
| Khóa / Mở khóa | `lock.svg` / `lock-open.svg` |
| Đăng nhập / Đăng xuất | `login.svg` / `logout.svg` |
| Cài đặt / Thiết lập | `settings.svg` |
| Yêu thích / Đánh dấu | `star.svg` / `bookmark.svg` |
| Nhãn (tag) | `tag.svg` |
| Tin nhắn / Bình luận | `message.svg` |
| Trợ lý số MISA AVA | asset mascot chính thức qua `MHeaderBar` prop `assistant.avatarUrl` hoặc slot `assistant` |
| More trong vòng tròn header | `dots.svg` trong button tròn có border `--mds-border` |
| Ảnh / Chụp ảnh | `photo.svg` / `camera.svg` |
| Vị trí | `map-pin.svg` |
| Cơ quan, tòa nhà / Công việc | `building.svg` / `briefcase.svg` |
| Ví / Tiền mặt / Thẻ / Hóa đơn | `wallet.svg` / `cash.svg` / `credit-card.svg` / `receipt.svg` |
| Báo cáo cột / tròn | `chart-bar.svg` / `chart-pie.svg` |
| Dữ liệu / Đồng bộ lên / xuống | `database.svg` / `cloud-upload.svg` / `cloud-download.svg` |

## Ví dụ dùng trong code

```html
<!-- Inline SVG, màu theo token, 16px trong button -->
<button class="btn-secondary">
  <svg class="mds-icon" width="16" height="16"><!-- nội dung từ assets/icons/plus.svg --></svg>
  Thêm mới
</button>
```

```css
.mds-icon { color: var(--mds-icon-neutral); }
.btn-primary .mds-icon { color: #fff; }
.icon-danger { color: var(--mds-danger); }
```

> Phân loại đầy đủ 43 nhóm icon của MDS: xem [icons-library.md](icons-library.md).

## Khi thư viện chưa có icon

1. Tra `assets/icons/` và bảng này trước.
2. Nếu thật sự thiếu, thêm SVG outline vào chính `assets/icons/`, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="1.5"`, `fill="none"`, linecap/linejoin `round`.
3. Cập nhật bảng này và icon path map của component đang dùng. Không import trực tiếp FontAwesome, Material, Lucide hoặc URL SVG ngoài MDS vào app.
