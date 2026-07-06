# Popup / Form (MDS 2.0)

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Định nghĩa

Popup là **cửa sổ nổi bật giữa màn hình, có lớp phủ (overlay)**, chỉ cho phép người dùng nhập dữ liệu vào popup; **phải lưu hoặc đóng thì mới tiếp tục được các thao tác khác** trên nền phía sau.

## 1. Dạng popup giới hạn kích thước

- Popup này hiển thị **giới hạn kích thước chiều rộng và chiều cao theo các trường dữ liệu bên trong nó** (kích thước co theo nội dung form).

### Tỉ lệ hiển thị

- Tỉ lệ tối ưu thông thường của popup nên tuân theo **tỉ lệ 4:3 hoặc 6:4** để mắt nhìn dễ chịu nhất.
- Nếu popup dài **vượt quá 80% chiều cao màn hình**: nên **giới hạn chiều cao**, nội dung bên trong **cuộn**.

### Các biến thể layout form trong popup

- Popup dạng thông tin **đơn giản 1 cột**.
- Popup dạng thông tin có **nhiều cột**.
- Popup **label trên - dưới** (label đặt phía trên ô nhập).
- Popup **label trên - dưới dạng nhiều cột**.

## 2. Dạng popup full màn hình

- Dùng cho các form nhập liệu cần nhập **cùng lúc nhiều thông tin**, cần hiển thị **full màn hình để tối ưu diện tích**.
- Để đồng nhất quy tắc UX **nhập liệu từ trên xuống dưới rồi mới bấm Lưu**, thứ tự hiển thị các thông tin tương tự popup loại nhỏ:
  1. **Header** (tiêu đề popup)
  2. **Các thông tin cần nhập** (body)
  3. **Footer** chứa các nút **Hủy, Lưu...** nằm **ghim ở cuối cùng**.
- **Chiều cao của popup responsive theo chiều cao màn hình**; nội dung dài thì có **thanh cuộn bên phải**.
- **Luôn ghim (fix) Header và Footer của popup** — chỉ phần body cuộn.

## 3. Popup xem chi tiết 1 bản ghi

- Có dạng popup riêng dùng để xem chi tiết 1 bản ghi (chế độ xem, không phải nhập liệu).

## 4. Quy tắc nút trong form — KHÔNG dùng nút Disable

- **Tránh dùng nút Submit dạng disable** vì gây mơ hồ cho người dùng.
- **Luôn để nút enable**; khi bấm, nếu còn lỗi thì:
  - **Focus vào ô lỗi đầu tiên**, và
  - **Hiển thị tooltip thông báo lỗi** để người dùng biết cách nhập đúng.

### Trạng thái đang xử lý

- Khi hệ thống đang xử lý việc cập nhật dữ liệu thì **disable nút và hiển thị kèm icon loading** để tránh lỗi **lưu trùng dữ liệu** (double submit).

### Bấm Sửa nhưng chưa thay đổi gì rồi bấm Lưu

- Nút Lưu **vẫn hành xử như khi có thay đổi**; tuy nhiên DEV có thể kiểm tra thay đổi và **không gọi cập nhật dữ liệu** để tối ưu hệ thống.

---

*Ghi chú: Tài liệu gốc mô tả quy tắc bằng lời kèm hình minh họa; các giá trị px/hex cụ thể nằm trong hình ảnh nên không liệt kê tại đây để tránh sai lệch.*
