# Mobile adaptive & PWA - MDS 2.0

Đọc quy tắc này khi màn hình MISA chạy trên điện thoại, tablet, cửa sổ chia đôi hoặc được cài như PWA. Giữ nguyên nghiệp vụ, thứ tự ưu tiên và token MDS; không thu nhỏ giao diện desktop một cách cơ học và không giả định loại thiết bị chỉ từ user agent.

## Mục lục

1. [Nguyên tắc nền](#1-nguyên-tắc-nền)
2. [Window size class](#2-window-size-class)
3. [Điều hướng và app shell](#3-điều-hướng-và-app-shell)
4. [Biến đổi theo loại màn hình](#4-biến-đổi-theo-loại-màn-hình)
5. [Control, touch và bàn phím](#5-control-touch-và-bàn-phím)
6. [Safe area và viewport](#6-safe-area-và-viewport)
7. [Trạng thái PWA](#7-trạng-thái-pwa)
8. [Yêu cầu triển khai PWA](#8-yêu-cầu-triển-khai-pwa)
9. [Ma trận kiểm thử](#9-ma-trận-kiểm-thử)

## 1. Nguyên tắc nền

- Thiết kế theo **kích thước cửa sổ hiện tại**, không theo tên thiết bị. Tablet chia đôi màn hình có thể phải dùng layout compact; điện thoại gập mở rộng có thể dùng layout medium/expanded.
- Responsive giữ cùng thông tin và tác vụ cốt lõi với desktop. Chỉ đổi cách sắp xếp, mật độ, vị trí điều hướng và cách mở panel.
- Không dựa vào hover để lộ chức năng quan trọng. Mọi action phải dùng được bằng touch, keyboard và screen reader.
- Dùng icon trong `assets/icons/` và token MDS. Glyph giữ kích thước 16/20/24px; chỉ tăng vùng chạm bao quanh.
- Không tạo một UI riêng cho iOS và một UI riêng cho Android. Dùng một ngôn ngữ MDS, sau đó thích ứng safe area, touch target và capability của từng nền tảng.
- Khi thiếu chỗ, giữ lại tác vụ chính và trạng thái quan trọng; gom action phụ vào More theo đúng thứ tự nghiệp vụ, không làm mất chức năng.

## 2. Window size class

Đây là breakpoint hành vi, không phụ thuộc breakpoint mặc định của framework CSS:

| Size class | Độ rộng cửa sổ | Bố cục chính |
|---|---:|---|
| Compact | `< 600px` | 1 pane; không có sidebar cố định; nội dung xếp dọc |
| Medium | `600-839px` | 1-2 pane; navigation rail hoặc drawer; form tối đa 2 cột khi field ngắn |
| Expanded | `840-1199px` | 2 pane khi nghiệp vụ cần list-detail; sidebar collapsed/expanded theo không gian |
| Large | `>= 1200px` | Layout desktop MDS đầy đủ |

Quy tắc chuyển lớp:

- Layout phải cập nhật ngay khi xoay màn hình, chia đôi cửa sổ, kéo resize hoặc gập/mở thiết bị; không yêu cầu tải lại trang.
- Dùng container query cho component nhúng trong drawer/panel nếu chiều rộng component khác chiều rộng viewport.
- Xét thêm chiều cao: cửa sổ thấp dưới 480px không dùng header + tab + footer cố định cùng lúc nếu chúng làm vùng nội dung quá nhỏ.
- Nội dung có `min-width: 0`; text dài được wrap hoặc truncate có tooltip. Chỉ bảng, timeline và thumbnail strip được cuộn ngang có chủ đích.

## 3. Điều hướng và app shell

### Compact

- Header cao tối thiểu 48px, chừa safe area phía trên khi chạy standalone. Giữ nút chuyển ứng dụng 9 chấm hoặc nút quay lại theo ngữ cảnh; không thay 9 chấm bằng icon ngoài MDS.
- Tên app rút gọn khi thiếu chỗ. Ô tìm kiếm toàn cục chuyển thành icon mở search full-width; không ép input vào khoảng trống hẹp.
- Chỉ giữ trực tiếp 1-2 tiện ích thường dùng, thường là Thông báo và avatar. Thiết lập, AVA, Chat, Hỗ trợ và action ít dùng được đưa vào More nhưng vẫn giữ đúng icon/nhãn MDS trong menu.
- Dùng bottom navigation khi có tối đa 5 điểm đến cấp một ổn định. Mỗi mục phải có icon MDS và nhãn; không dùng dãy icon không nhãn.
- Nếu cấu trúc nhiều hơn 5 điểm đến hoặc có nhiều cấp con, dùng drawer điều hướng. Drawer không mở mặc định và phải khôi phục focus về nút mở khi đóng.

### Medium và Expanded

- Medium ưu tiên navigation rail rộng 56px hoặc drawer. Rail luôn có tooltip; item đang active dùng nền brand nhạt như sidebar MDS.
- Expanded có thể dùng sidebar 240px, rail 56px hoặc list-detail tùy nghiệp vụ. Không cố giữ sidebar nếu phần nội dung chính còn quá hẹp.
- Tablet ngang có thể hiện list-detail đồng thời; tablet dọc ưu tiên một pane và mở detail dạng page/drawer.

## 4. Biến đổi theo loại màn hình

### 4.1. Màn hình danh sách

**Compact:**

- Toolbar xếp thành 2 tầng: tiêu đề + primary action ở tầng đầu; search/filter ở tầng sau. Action phụ vào More.
- Giữ table khi người dùng cần so sánh cột. Cố định cột nhận diện đầu tiên, chỉ hiển thị các cột thiết yếu và cho cuộn ngang trong chính bảng.
- Chuyển sang card/list item khi người dùng xử lý từng bản ghi độc lập. Card không được làm mất trường nhận diện, trạng thái, số liệu chính hoặc row action.
- Bấm item mở detail dạng page. Drawer chỉ dùng cho xem nhanh hoặc thao tác ngắn; không dùng drawer hẹp cho form dài.
- Khi chọn hàng loạt, hiện action bar sticky phía dưới và chừa safe area. Luôn hiển thị số bản ghi đã chọn và nút bỏ chọn.

**Medium/Expanded:**

- Có thể dùng master-detail: master 280-360px cho thông tin nhận diện ngắn, detail dùng phần còn lại.
- Nếu bảng cần so sánh nhiều cột, ưu tiên full-width table và detail dạng drawer thay vì ép hai pane.
- Paging table vẫn dùng Prev/Next theo MDS; infinite scroll chỉ dùng cho feed/card khám phá.

### 4.2. Màn hình thêm/sửa

- Compact luôn 1 cột, label phía trên field. Nhóm thông tin dài dùng section/accordion có tiêu đề rõ; không dùng tab ẩn lỗi của section khác.
- Medium dùng 2 cột chỉ khi hai field ngắn, cùng ngữ nghĩa và vẫn đủ rộng. Field địa chỉ, mô tả, bảng con luôn full-width.
- Footer Lưu/Hủy sticky phía dưới. Thứ tự action vẫn theo MDS: secondary bên trái, Primary bên phải, More ngay sau Primary nếu có.
- Khi bàn phím ảo mở, field focus và thông báo lỗi phải nằm trong vùng nhìn thấy; footer không được che field cuối.
- Có cảnh báo thoát trang khi dữ liệu đã thay đổi, kể cả thao tác Back của trình duyệt/PWA.

### 4.3. Màn hình chi tiết

- Compact dùng top bar có Back, tiêu đề rút gọn và More. Thông tin tổng quan đặt trước, tab cuộn ngang có indicator rõ.
- Action chính có thể đặt trong sticky bottom bar; action theo bản ghi ít dùng vào More. Không dồn 4-5 text button lên header.
- Inline edit chỉ bật khi field đủ chỗ và bàn phím không che control. Trường phức tạp mở full-screen form hoặc bottom sheet phù hợp.
- Expanded ưu tiên list-detail nếu người dùng cần chuyển liên tục giữa nhiều bản ghi.

### 4.4. Dashboard

- Compact dùng một cột; KPI có thể 2 cột nếu giá trị dài nhất vẫn không tràn. Chart có chiều cao ổn định và hiển thị nhãn số quan trọng, không yêu cầu hover.
- Medium dùng lưới 2 cột; Expanded/Large dùng lưới desktop theo `layout-patterns.md`.
- Bộ lọc thời gian đặt gần tiêu đề dashboard hoặc chart liên quan. Filter không vừa phải mở bottom sheet/drawer, không xuống nhiều dòng lộn xộn.
- Card dashboard tiếp tục dùng stroke 1px, không dùng shadow.

### 4.5. Dialog, drawer và bottom sheet

- Confirm ngắn dùng dialog inset khỏi mép màn hình. Form ngắn hoặc bộ lọc dùng bottom sheet; form dài/phức tạp dùng full-screen page/dialog.
- Không mở dialog chồng dialog. Không đặt card trang trí bên trong dialog.
- Bottom sheet có drag handle chỉ khi hỗ trợ thao tác kéo; luôn có nút đóng/Back thay thế cho gesture.
- Popover không đủ chỗ phải tự đổi hướng hoặc chuyển thành bottom sheet trên compact.

### 4.6. Slideshow/xem ảnh

- Dùng `MImageViewer`; compact luôn full viewport, chừa safe area cho Close và thumbnail.
- Hỗ trợ swipe trái/phải, pinch-to-zoom và double-tap zoom khi trình duyệt cho phép; vẫn giữ nút Previous/Next cho accessibility.
- Thumbnail cuộn ngang, không ép thành nhiều cột. Khi zoom, swipe ảnh không được xung đột với cuộn trang phía sau.

## 5. Control, touch và bàn phím

- MDS Web yêu cầu icon tương tác đứng riêng có vùng chạm tối thiểu 40px. Trên màn hình touch/coarse pointer dùng **tối thiểu 48x48px** để đồng thời đáp ứng iOS (44pt) và Android (48dp).
- Khoảng cách giữa hai touch target tối thiểu 8px khi có thể. Glyph vẫn giữ 16/20/24px, không phóng icon thành 48px.
- Control phải có trạng thái pressed, focus-visible, disabled và loading. Không dùng màu làm tín hiệu duy nhất.
- Text input trên compact touch dùng font nhập liệu tối thiểu 16px để tránh iOS tự zoom; label/helper text vẫn theo typography MDS.
- Dùng `inputmode`, `autocomplete`, `enterkeyhint` và kiểu input đúng dữ liệu; không tự dựng bàn phím số bằng button.
- Khi validation lỗi: cuộn và focus field lỗi đầu tiên, đồng thời thông báo lỗi ngay cạnh field. Không chỉ báo bằng toast.
- Tablet phải dùng được với touch, trackpad/mouse và keyboard; Tab/Shift+Tab, Escape, Enter và arrow key theo spec control MDS.
- Tôn trọng `prefers-reduced-motion`; animation không được chặn thao tác hoặc kéo dài phản hồi.

## 6. Safe area và viewport

Trang PWA phải có:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Quy tắc CSS nền:

```css
.mds-app {
  min-height: 100dvh;
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-left: env(safe-area-inset-left);
}

.mds-sticky-actions {
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}

@media (pointer: coarse) {
  .mds-icon-action {
    min-width: 48px;
    min-height: 48px;
  }
}
```

- Dùng `100dvh` cho app shell/full-screen viewer; tránh chỉ dùng `100vh` vì thanh địa chỉ mobile có thể làm sai chiều cao.
- Chừa safe area ở cả portrait và landscape. Không hard-code chiều cao notch/Dynamic Island/navigation bar.
- Sticky header/footer phải nằm trong cùng scroll container được kiểm soát; tránh nhiều vùng scroll dọc lồng nhau.
- Khi bàn phím mở, dùng hành vi resize tự nhiên trước; chỉ dùng `VisualViewport` khi cần điều chỉnh overlay đặc biệt và phải có fallback.

## 7. Trạng thái PWA

PWA phải thiết kế thêm các trạng thái sau, dùng component thông báo MDS hiện có:

- **Offline:** Global Inline/Inline Notification trong vùng nội dung, nêu rõ dữ liệu nào còn xem được và action `Thử lại`. Không chỉ hiện toast.
- **Đang đồng bộ:** chỉ báo nhỏ cạnh dữ liệu liên quan; không khóa toàn bộ app nếu người dùng vẫn có thể tiếp tục.
- **Đồng bộ lỗi/xung đột:** giữ bản nháp, mô tả lựa chọn rõ ràng; không tự ghi đè dữ liệu từ thiết bị khác.
- **Có phiên bản mới:** Inline Notification có action `Cập nhật`. Không tự reload khi form đang có thay đổi chưa lưu.
- **Cài ứng dụng:** chỉ gợi ý sau khi người dùng đã hiểu giá trị ứng dụng; không bật prompt ngay lần mở đầu. Hướng dẫn iOS/Android theo capability detection, không giả định browser.
- **Push notification:** chỉ xin quyền sau một hành động có chủ đích. Có màn hình thiết lập loại thông báo và cách tắt.
- **Phiên đăng nhập hết hạn:** giữ ngữ cảnh/bản nháp an toàn, đưa người dùng đăng nhập lại rồi quay về tác vụ trước đó khi có thể.

## 8. Yêu cầu triển khai PWA

### Manifest tối thiểu

```json
{
  "id": "/",
  "name": "Tên đầy đủ ứng dụng MISA",
  "short_name": "Tên app",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#245fdf",
  "icons": [
    { "src": "/icons/app-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/app-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/app-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

- Màu manifest phải lấy từ theme MDS đang dùng; ví dụ trên là theme blue mặc định, không copy cứng sang app dùng theme khác.
- Cung cấp `apple-touch-icon` đúng asset thương hiệu. Test icon trên nền sáng/tối và mask Android; không dùng ảnh chụp màn hình làm icon.
- Manifest vẫn là chuẩn bắt buộc/khuyến nghị để có nhận diện và hành vi cài đặt nhất quán giữa các browser. iOS/iPadOS mới có thể cho thêm mọi website ra Home Screen, nhưng không được xem đó là lý do bỏ manifest hoặc service worker.
- Service worker đặt scope đủ bao phủ app. Cache app shell/static asset; API nghiệp vụ ưu tiên network-first và hiển thị dữ liệu stale có nhãn rõ.
- Không cache dữ liệu nhạy cảm, token đăng nhập hoặc dữ liệu tenant vào cache dùng chung. Offline write chỉ triển khai khi nghiệp vụ có quy tắc đồng bộ/xung đột rõ ràng.
- Dùng feature detection cho Push, Badging, Share, File System và Install Prompt; luôn có phương án thay thế khi capability không tồn tại.
- Bản cập nhật service worker phải có luồng thông báo/cập nhật rõ, không tự chiếm quyền điều khiển giữa lúc người dùng nhập liệu.

## 9. Ma trận kiểm thử

### Viewport bắt buộc

| Nhóm | Kích thước kiểm tra |
|---|---|
| Điện thoại nhỏ | 320x568 |
| iPhone phổ biến | 375x667, 390x844 |
| Android phổ biến | 360x800, 412x915 |
| Tablet dọc | 600x960, 768x1024, 820x1180 |
| Tablet ngang | 1024x768, 1180x820 |
| Cửa sổ desktop | 1280x800, 1440x900 |

### Môi trường bắt buộc

- iOS Safari và PWA Add to Home Screen; portrait, landscape, bàn phím mở, safe area có notch/Dynamic Island.
- Android Chrome và PWA standalone; back gesture/button, bàn phím mở, thanh hệ thống, permission prompt.
- iPadOS Safari/PWA với split view; Android tablet với multi-window; đổi size class trong lúc app đang chạy.
- Tablet với keyboard/trackpad; screen reader cơ bản (VoiceOver/TalkBack); zoom text 200%.
- Online, mạng chậm, offline, mất mạng giữa thao tác, service worker có phiên bản mới và phiên đăng nhập hết hạn.

### Checklist bàn giao

- [ ] Không có sidebar desktop cố định ở compact; điều hướng vẫn truy cập đủ chức năng.
- [ ] Không có horizontal scroll toàn trang; table/thumbnail cuộn trong đúng container.
- [ ] Touch target đạt 48x48px trên coarse pointer; không có action chỉ xuất hiện khi hover.
- [ ] Header, popup, dropdown, date picker, slideshow và sticky footer không bị cắt bởi safe area/bàn phím.
- [ ] List, form, detail và dashboard đổi layout đúng size class mà không reload.
- [ ] Loading, empty, error, offline, stale, update available và session expired đều có UI rõ ràng.
- [ ] Manifest/icon hợp lệ; PWA mở standalone đúng start URL; service worker không cache dữ liệu nhạy cảm.
- [ ] Mọi icon vẫn lấy từ `assets/icons/`; icon thiếu được bổ sung theo `components/icon.md` trước khi dùng.

## Tham chiếu nền tảng

- Apple Human Interface Guidelines: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) và [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
- Android Developers: [Window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes) và [accessibility touch target](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views).
- Web.dev: [Learn PWA](https://web.dev/learn/pwa/welcome), [Web App Manifest](https://web.dev/learn/pwa/web-app-manifest) và [service worker](https://web.dev/learn/pwa/service-workers).
- WebKit: [Home Screen web apps và Web Push](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [Badging](https://webkit.org/blog/14112/badging-for-home-screen-web-apps/) và [Safari 26 web apps](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/).
