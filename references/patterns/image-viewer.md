# Image viewer / Slideshow — MDS 2.0

Dùng `MImageViewer` khi người dùng cần xem ảnh lớn, duyệt nhiều ảnh, ảnh đính kèm hoặc ảnh trong danh sách. Không mở ảnh bằng tab mới hay tạo dialog HTML riêng.

## Cấu trúc và hành vi

- Viewer phủ toàn viewport trên overlay tối; ảnh nằm giữa, giữ tỷ lệ, không bị crop.
- Header có tên ảnh (nếu có), counter `3 / 12`, tải xuống (khi được phép) và nút đóng.
- Có nút mũi tên trái/phải khi có từ 2 ảnh; `Esc` đóng, `ArrowLeft`/`ArrowRight` chuyển ảnh. Nút disabled ở đầu/cuối, không vòng lặp tự động.
- Thanh thumbnail ở đáy khi có từ 2 ảnh; thumbnail đang chọn có stroke `--mds-brand-600`.
- Cung cấp `alt` cho mọi ảnh; ảnh lỗi phải có trạng thái thay thế, không để vùng trống.

## Mobile/PWA

- Viewer luôn full viewport, kể cả khi PWA có safe area.
- Nút điều hướng và đóng có vùng chạm tối thiểu 48px trên màn hình touch; thumbnail được cuộn ngang, không ép nhiều cột.
- Không dùng hover là cách duy nhất để thấy controls.

## Dùng component

```vue
<MImageViewer v-model="showImages" :images="attachments" :initial-index="selectedImage" />
```

`images` dùng dạng `{ src, alt?, name? }`. Chỉ bật `downloadable` khi nghiệp vụ cho phép tải tệp.
