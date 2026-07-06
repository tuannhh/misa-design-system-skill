# Bố cục màn hình — MISA AMIS Platform

> Nguồn: tài liệu quy chuẩn nội bộ MISA (liên hệ đội Product Design)

Ứng dụng trong MISA AMIS Platform có 4 loại màn hình chính. Xác định loại màn hình trước, rồi chọn biến thể phù hợp với nghiệp vụ theo hướng dẫn "Phù hợp khi" của từng biến thể.

## 1. Màn hình Tổng quan (Dashboard)

- Cho phép tạo **nhiều giao diện** chứa các loại biểu đồ khác nhau.
- Hỗ trợ **kéo thả vị trí và điều chỉnh độ rộng** của từng widget/biểu đồ.
- Nút **Lưu/Hủy thống nhất ở cuối trang** khi ở chế độ tùy chỉnh.

## 2. Màn hình Danh sách (List)

### Đặc điểm chung — áp dụng cho mọi biến thể

- **Nền xám**, có khoảng cách giữa bảng và lề xung quanh (bảng không dính sát mép màn hình).
- **Bấm vào dòng** để chuyển sang trang chi tiết hoặc mở popup chi tiết.

### Quy tắc sắp xếp Toolbar (bắt buộc)

- **Bên trái:** tiêu đề bảng.
- **Bên phải:** các chức năng thao tác.
- **Nút chính (Primary): luôn đặt ở vị trí ngoài cùng bên phải.**
- Nút phụ: bên trái nút chính.
- Nút "More" (⋯): **ngay bên phải nút chính**.

### 6 biến thể danh sách — cách chọn

**1. Danh sách có tab**
Mỗi tab là một danh sách khác nhau với nội dung riêng biệt.
*Phù hợp khi:* dữ liệu chia thành các nhóm/trạng thái rõ rệt cùng cấu trúc thao tác.

**2. Master-Detail (Master rộng, Detail nhỏ)**
Master hiển thị bảng nhiều trường; Detail là panel nhỏ hiển thị tóm tắt/preview.
*Phù hợp khi:* quản lý khối lượng lớn bản ghi, thao tác liên tục trên nhiều mục.

**3. Master-Detail (Master nhỏ, Detail rộng)**
Master chỉ hiện thông tin tóm tắt (tên, mã, tiêu đề, trạng thái); Detail rộng chứa nội dung chi tiết phong phú, có thể gồm nhiều trường và bảng phụ.
*Phù hợp khi:* người dùng chọn nhanh một mục rồi làm việc sâu trên từng bản ghi (kiểu email client, chat, hồ sơ).

**4. Master trên, Detail dưới**
Master phía trên dạng bảng/danh sách lớn; Detail phía dưới với tab hoặc vùng mở rộng theo dòng đang chọn.
*Phù hợp khi:* làm việc trên desktop màn rộng, cần so sánh/cập nhật liên tục, dashboard nghiệp vụ, quy trình phức tạp.

**5. Master trái, Detail Drawer phải**
Detail trượt ra dạng drawer **che đè lên** danh sách; có thể co kéo độ rộng; vẫn bấm được dòng bên trái khi drawer đang mở.
*Phù hợp khi:* độ rộng phần chi tiết cần linh hoạt, người dùng muốn xem nhanh nội dung từng mục mà không rời danh sách.

**6. Danh sách Card**
Sắp xếp hiện đại, bố cục trực quan; mỗi card hiển thị linh hoạt: mô tả, tag, trạng thái, hình ảnh, nút thao tác.
*Phù hợp khi:* cần làm nổi bật từng mục (task, ticket, sản phẩm), thao tác trực tiếp nhanh trên từng mục, hoặc tối ưu cho mobile.

## 3. Màn hình Thêm/Sửa (Add/Edit)

**Nguyên tắc chung: nút Lưu và Hủy luôn ghim (sticky) ở vị trí cuối cùng của trang** — không trôi mất khi cuộn.

Ba biến thể theo lượng thông tin:

| Biến thể | Dùng khi |
|---|---|
| **Dạng Page** (trang riêng) | Thêm dữ liệu không quá nhiều trường |
| **Popup nhỏ** | Danh mục, thông tin ít và đơn giản |
| **Popup full màn hình** | Rất nhiều thông tin, cần tối ưu không gian |

## 4. Màn hình Chi tiết (Detail)

### Tách riêng mode xem (view mode ≠ edit mode)

Dùng cho giao diện phức tạp:

- Form Thêm/Sửa thường chỉ cập nhật thông tin cơ bản; màn Chi tiết có thể cập nhật nhiều thông tin khác.
- **Luôn ghim các nút thao tác với bản ghi ở góc trên, bên phải.**
- **Hover vào từng trường cho phép chỉnh sửa riêng lẻ** (inline edit) đối với các trường hỗ trợ.

Biến thể:
- **Dạng Page:** nhiều tab chia nhóm thông tin khác nhau.
- **Dạng Popup** (ít hoặc nhiều thông tin): tùy nhu cầu.

### Không tách mode xem

Xem và sửa đồng thời trên cùng giao diện — chỉ dùng cho **form đơn giản, rủi ro thấp**.

## Quy tắc hiển thị nút (áp dụng toàn hệ thống)

> "Nút More luôn nằm phía bên phải của nút Primary, và 2 nút này luôn nằm phía ngoài cùng bên phải của form."

Thứ tự từ trái sang phải trên toolbar/form: `[các nút phụ] [nút Primary] [nút More ⋯]` — cụm này căn phải.
