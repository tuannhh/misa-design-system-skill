# Quy ước chung (MDS 2.0)

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Quy định phím tắt

Những phím tắt liệt kê dưới đây là những phím tắt sử dụng phổ biến trên các ứng dụng của MISA. Tài liệu gốc chia phím tắt thành 2 nhóm minh họa: **phím tắt trên màn hình danh sách** và **phím tắt trên màn hình chi tiết** (danh sách tổ hợp phím cụ thể được thể hiện bằng hình ảnh trong tài liệu gốc; khi cần tra cứu tổ hợp phím chính xác, tham chiếu tài liệu nội bộ hoặc kế thừa từ các dự án MISA hiện có).

### Quy tắc đặt phím tắt

1. **Tránh sử dụng phím tắt không thể ghi đè**: không dùng các tổ hợp mà trình duyệt không cho phép ghi đè, ví dụ `Ctrl+T`, `Ctrl+N` (xung đột với phím tắt của trình duyệt).
2. **Hiển thị hướng dẫn**: hiển thị hướng dẫn phím tắt động (dynamic) khi người dùng chọn/focus vào đối tượng liên quan.
3. **Hiển thị tooltip**: các chức năng/action đã được gán phím tắt phải hiển thị tooltip ghi rõ phím tắt đó.
4. **Kế thừa (QUAN TRỌNG)**: tuân theo các quy định đã có; tham chiếu các dự án tương tự khác của MISA để đảm bảo tính nhất quán giữa các sản phẩm.

## Quy tắc chính tả

### Dấu chấm (.)
- **Ý nghĩa**: dùng để kết thúc một câu hoàn chỉnh có ý nghĩa.
- **Khoảng cách**: một khoảng trống sau dấu chấm.
- **Viết hoa**: các từ sau dấu chấm được viết hoa.
- **Ví dụ**: "Tôi thích ẩm thực Việt Nam. Nhất là phở."

### Dấu phẩy (,)
- **Ý nghĩa**: dùng để phân tách các thành phần trong một câu hoặc phân tách các câu đơn trong một câu ghép.
- **Khoảng cách**: một khoảng trống sau dấu phẩy.
- **Viết hoa**: không có quy tắc đặc biệt.
- **Ví dụ**: "Tôi thích đọc sách, đi xem phim và nghe nhạc."

### Dấu chấm phẩy (;)
- **Ý nghĩa**: dùng để ngắt câu khi muốn phân cách các phần tử hoặc ý tưởng liên quan.
- **Khoảng cách**: một khoảng trống sau dấu chấm phẩy.
- **Viết hoa**: không có quy tắc đặc biệt.
- **Ví dụ**: "Tôi sẽ đến trước, bạn đến sau; chúng ta sẽ gặp nhau ở đó."

### Dấu chấm than (!)
- **Ý nghĩa**: thể hiện cảm xúc mạnh mẽ, sự ngạc nhiên hoặc lời ra lệnh.
- **Khoảng cách**: một khoảng trống sau dấu chấm than.
- **Viết hoa**: không có quy tắc đặc biệt.
- **Ví dụ**: "Đến ngay đây!"

### Dấu chấm hỏi (?)
- **Ý nghĩa**: dùng để đặt câu hỏi.
- **Khoảng cách**: một khoảng trống sau dấu chấm hỏi.
- **Viết hoa**: không có quy tắc đặc biệt.
- **Ví dụ**: "Bạn đã đi xem phim chưa?"

### Dấu hai chấm (:)
- **Ý nghĩa**: dùng để giới thiệu một danh sách, một giải thích hoặc một trích dẫn.
- **Khoảng cách**: một khoảng trống sau dấu hai chấm.
- **Viết hoa**: chữ cái đầu tiên được viết hoa nếu là câu hoặc trích dẫn.
- **Ví dụ**: "Tôi có ba sở thích: hát, đọc sách, và viết blog."

### Dấu ngoặc đơn () và dấu ngoặc kép ("")
- **Ý nghĩa**: dùng để bao quanh các thông tin bổ sung, giải thích hoặc trích dẫn trong văn bản.
- **Khoảng cách**: không cần khoảng trống sau dấu ngoặc (mở ngoặc sát nội dung bên trong).
- **Viết hoa**: không có quy tắc đặc biệt.
- **Ví dụ**: "Tôi thích ẩm thực Việt Nam (nhất là phở)." hoặc "Anh ấy nói: 'Tôi yêu Việt Nam'."

## Quy tắc phân tách số

Căn cứ pháp lý: theo **Thông tư 200/2014/TT-BTC**, tất cả báo cáo tài chính/kế toán tại Việt Nam phải hiển thị số liệu theo quy tắc phân tách dưới đây.

### Phân tách hàng nghìn
- Tất cả các báo cáo tài chính cần hiển thị số liệu dùng **dấu chấm (.)** để phân tách hàng nghìn.
- Áp dụng cho tất cả biểu mẫu, bảng kế toán và báo cáo tài chính tại Việt Nam.
- **Ví dụ**: `1.000` · `1.234.567` · `12.345.600`

### Phân tách phần thập phân
- **Dấu phẩy (,)** được sử dụng để phân tách phần thập phân trong số liệu.
- **Ví dụ**: `1,25` · `12.350,50` · `1.234.567,89`

### Lưu ý chuẩn quốc tế
- Chuẩn quốc tế (EN/US) ngược lại: dấu phẩy phân tách hàng nghìn, dấu chấm phân tách thập phân (ví dụ: `1,234,567.89`).
- Phần mềm hỗ trợ nhiều quốc gia cần cho phép người dùng thiết lập quy tắc hiển thị số theo từng thị trường.

## Tiêu đề trình duyệt (Browser title)

### Mục đích
- Khi người dùng mở nhiều tab trên trình duyệt để làm việc, nhìn danh sách các tab đang mở là nhận biết nhanh được tab nào đang mở phần mềm gì.
- Khi sử dụng các công cụ thống kê như GA, Mixpanel... dễ dàng biết được người dùng đang sử dụng ở màn hình nào.

### Ngữ cảnh 1: Tài khoản đăng nhập chỉ 1 công ty/đơn vị

**Màn hình danh sách**
- Cấu trúc: `Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Tên ứng dụng`
- Ví dụ: `Rút dự toán | Kho bạc | Mimosa Online`

**Màn hình chi tiết**
- Màn hình thêm: `Thêm [Tên phân hệ hiện tại] | Tên phân hệ cha, ông... (nếu có) | Tên ứng dụng`
  - Ví dụ: `Thêm rút dự toán | Kho bạc | MISA Mimosa Online`
- Màn hình sửa: `Sửa [Mã (nếu có)] - [Tên bản ghi (nếu có)] | Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Tên ứng dụng`
  - Ví dụ: `Sửa RDT00012 | Rút dự toán | Kho bạc | MISA Mimosa Online`
- Màn hình xem: `[Mã (nếu có)] - Tên bản ghi chi tiết | Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Tên ứng dụng`
  - Ví dụ: `RDT00012 - Rút dự toán | Kho bạc | MISA Mimosa Online`
- Trường hợp không có tên bản ghi:
  - Có mã: `ĐMH00002 | Đơn mua hàng | Mua hàng | AMIS Kế toán`
  - Không có mã: `Nguyễn Văn A | Tôi duyệt | Đơn xin nghỉ | AMIS Nhân viên`

### Ngữ cảnh 2: Tài khoản đăng nhập nhiều công ty/đơn vị

**Màn hình danh sách**
- Cấu trúc: `Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Mã đơn vị (nếu có) - Tên công ty, đơn vị | Tên ứng dụng`
- Ví dụ: `Rút dự toán | Kho bạc | Trường THPT Hà Tiên | Mimosa Online`

**Màn hình chi tiết**
- Màn hình thêm: `Thêm [Tên phân hệ hiện tại] | Tên phân hệ cha, ông... (nếu có) | Mã đơn vị (nếu có) - Tên công ty, đơn vị | Tên ứng dụng`
  - Ví dụ: `Thêm rút dự toán | Kho bạc | Trường THPT Hà Tiên | MISA Mimosa Online`
- Màn hình sửa: `Sửa [Mã (nếu có)] - [Tên bản ghi (nếu có)] | Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Mã đơn vị (nếu có) - Tên công ty, đơn vị | Tên ứng dụng`
  - Ví dụ: `Sửa RDT00012 | Rút dự toán | Kho bạc | Trường THPT Hà Tiên | MISA Mimosa Online`
- Màn hình xem: `[Mã (nếu có)] - Tên bản ghi chi tiết | Tên phân hệ hiện tại | Tên phân hệ cha, ông... (nếu có) | Mã đơn vị (nếu có) - Tên công ty, đơn vị | Tên ứng dụng`
  - Ví dụ: `RDT00012 - Rút dự toán | Kho bạc | Trường THPT Hà Tiên | MISA Mimosa Online`
- Trường hợp không có tên bản ghi:
  - Có mã: `ĐMH00002 | Đơn mua hàng | Mua hàng | Công ty cổ phần MISA | AMIS Kế toán`
  - Không có mã: `Nguyễn Văn A | Tôi duyệt | Đơn xin nghỉ | Công ty cổ phần MISA | AMIS Nhân viên`

### Lưu ý
- Trường hợp tên phân hệ dài, nhiều phân hệ thì trình duyệt sẽ tự hiển thị theo thứ tự từ trái qua phải; dài quá sẽ hiển thị `...`, khi hover sẽ có tooltip hiển thị đầy đủ.

## Icon dùng chung

Dưới đây là danh sách các icon thông dụng dùng chung cho tất cả các ứng dụng MISA (quy ước chính thức). Mỗi hành động dưới đây có một icon chuẩn thống nhất; hình dạng icon cụ thể được quy định bằng hình ảnh trong bộ MDS 2.0 — khi triển khai phải dùng đúng icon trong thư viện MDS, không tự chế icon khác cho cùng hành động:

1. Bắt đầu sử dụng
2. Thêm
3. Sửa, tùy chỉnh
4. Thông tin
5. Trợ giúp
6. Xóa
7. Đóng
8. Nhân bản
9. In
10. Tìm kiếm
11. Tìm kiếm AI
12. Reload
13. Thiết lập
14. Bộ lọc
15. Nhập khẩu
16. Xuất khẩu
17. Xem dạng card
18. Xem dạng kanban
19. Xem dạng danh sách
20. Danh mục
21. Báo cáo

Nguyên tắc: cùng một hành động thì mọi ứng dụng MISA phải dùng cùng một icon trong danh sách trên để đảm bảo tính nhất quán.

## Cửa sổ chat AI Agent

### Vị trí và kích thước
- Khi bấm vào avatar agent trên header của các sản phẩm sẽ hiển thị ra cửa sổ chat tương tác với các agent.
- Cửa sổ nằm dưới UI ứng dụng, không che mất nội dung.
- Kích thước: rộng tối đa là **50% màn hình**.

### Tương tác và responsive
- Hover vào cạnh box chat: hiển thị stroke màu AMIS Chat kèm mũi tên để kéo rộng/thu hẹp.
- Các dự án cần xử lý responsive để khi co kéo độ rộng cửa sổ này, giao diện vẫn đảm bảo thao tác được mà không bị che mất thông tin.
- Có thể hiển thị scroll ngang khi kích thước quá nhỏ.

### Tùy chỉnh theo sản phẩm
- Tên agent, avatar, hình ảnh mascot phải custom theo từng sản phẩm.

### Tích hợp AMIS Chat
- Cửa sổ chat là cửa sổ AMIS Chat chính thức.
- Bấm vào logo AMIS Chat trên header cũng hiển thị box chat tại đúng vị trí này.

## Quảng cáo và bán chéo

- Khi có nhu cầu quảng cáo bán chéo giữa các sản phẩm, trên **màn hình tổng quan** (dashboard) của ứng dụng sẽ có một vùng thông tin cho phép đặt các liên kết dẫn đến các chức năng cần quảng cáo.
- Các thông tin này luôn được **cố định ở phía trên cùng của biểu đồ** và hiển thị tối đa các mục.
- Luôn mở màn hình tổng quan của ứng dụng (khi vào app) để đảm bảo người dùng được tiếp cận với các thông tin quảng cáo, bán chéo sản phẩm.
- Khi các thông tin không thể hiển thị đầy đủ, các mục còn lại sẽ được ẩn vào liên kết **"Xem thêm"**; khi bấm, thông tin mở rộng xuống phía dưới theo UI thiết kế.
- Khi cần thu gọn, người dùng nhấn **"Thu gọn"** để quay về trạng thái ban đầu.
- Ngoại lệ: các ứng dụng không có màn hình tổng quan, hoặc người dùng không có quyền xem dashboard, thì hiện tại chưa xem được nội dung này.

## Thông tin bản quyền

### Bản quyền chung của MISA
- Áp dụng cho website và form login chung.
- Định dạng: `Copyright © + (Năm thành lập - Năm hiện tại) + Tên công ty`
- Minh họa: `Copyright © 1994 - 2025 MISA JSC` (1994 là năm thành lập; 2025 là năm hiện tại).

### Bản quyền riêng từng sản phẩm
- Định dạng: `Copyright © + (Năm đăng ký nhãn hiệu - Năm hiện tại) + Tên công ty`
- Lưu ý quan trọng:
  - Khi năm đăng ký nhãn hiệu trùng với năm hiện tại, chỉ hiển thị **một năm**.
  - Năm hiện tại nên được cấu hình **tự động cập nhật**.

### Ví dụ
- **MISA SME.NET 2015** — năm đăng ký nhãn hiệu: 2009; năm hiện tại: 2016 → `Copyright © 2009 - 2016 MISA JSC`
- **CukCuk.vn** — năm đăng ký nhãn hiệu: 2016; năm hiện tại: 2016 → `Copyright © 2016 MISA JSC`

### Footer trang
- `Copyright © 1994 - 2025 MISA JSC. All Rights Reserved`
