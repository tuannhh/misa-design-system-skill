# Checkbox

> Nguồn: tài liệu quy chuẩn nội bộ MISA (đội Product Design)

## Định nghĩa

Checkbox là một thành phần giao diện người dùng (UI component) cho phép người dùng chọn một hoặc nhiều tùy chọn trong danh sách.

## Ứng dụng

Checkbox thường được sử dụng trong các biểu mẫu (form), bộ lọc (filter) hoặc danh sách thiết lập (settings).

## Trạng thái (States)

Checkbox có 4 trạng thái:

1. **Trạng thái bình thường (Normal / Unchecked)** — checkbox chưa được chọn.
2. **Trạng thái đang check chọn (Checked)** — checkbox đã được chọn.
3. **Trạng thái không xác định (Indeterminate)** — trạng thái này thường xảy ra khi checkbox đứng đầu danh sách, bên dưới có một số item đang được check và một số item không check.
4. **Trạng thái lỗi (Error)** — checkbox ở trạng thái báo lỗi.

## Ghi chú

- Tài liệu gốc minh họa các trạng thái bằng hình ảnh; các giá trị chi tiết về kích thước/màu sắc nằm trong file thiết kế thành phần (MDS Web Components v2.0) của đội Product Design.
- Khi cần thể hiện lựa chọn duy nhất (chỉ chọn 1 trong nhiều), dùng Radio button thay vì Checkbox.
