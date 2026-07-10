# Mobile responsive & PWA — MDS 2.0

Đọc quy tắc này khi màn hình MISA cần chạy trên điện thoại, tablet hoặc được cài như PWA. Giữ cùng nghiệp vụ và hierarchy với desktop; không thu nhỏ desktop một cách cơ học.

## Breakpoint và bố cục

- Desktop từ 1024px: dùng layout desktop theo template.
- Tablet 768–1023px: sidebar chuyển rail thu gọn hoặc drawer, bảng giữ cuộn ngang có chủ đích.
- Mobile dưới 768px: không giữ sidebar cố định; mở navigation bằng drawer. Toolbar chuyển dòng theo thứ tự ưu tiên, action phụ vào More.
- Danh sách: giữ bảng khi cần đối chiếu cột; chỉ chuyển card khi workflow cần đọc từng bản ghi. Cột số luôn canh phải.
- Form: chuyển 2 cột thành 1 cột; footer Lưu/Hủy sticky phía dưới, chừa safe area.
- Dialog: rộng gần full viewport, tối đa theo nội dung; Drawer ưu tiên từ dưới lên cho thao tác ngắn.

## Touch, safe area và PWA

- Vùng chạm của icon/button tối thiểu 40×40px trên mobile; icon vẫn dùng kích thước MDS 16/20/24px.
- Không dựa duy nhất vào hover; luôn có focus, trạng thái pressed và nhãn/tooltip phù hợp.
- Chừa `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` cho header, bottom navigation và footer sticky khi chạy PWA toàn màn hình.
- Không che input bằng bàn phím: field đang focus phải được cuộn vào vùng nhìn thấy.
- Network/loading/error/empty phải xuất hiện ngay trong vùng nội dung, không chỉ bằng toast.

## Điều hướng mobile

- Header giữ app switcher hoặc nút quay lại theo luồng, logo/tên app rút gọn khi thiếu chỗ.
- Các tiện ích ít dùng (Settings, Help, More) được gom vào menu khi không đủ chiều ngang; Chat/Notification chỉ giữ trên header khi là tác vụ thường xuyên.
- Bottom navigation chỉ dùng cho tối đa 5 điểm đến cấp một, có icon MDS và nhãn; không thay thế sidebar bằng dãy icon không nhãn.

## Kiểm tra trước bàn giao

- Test tại 320px, 375px, 768px và 1024px.
- Không tràn chữ, không có horizontal scroll ngoài bảng/thumbnail cần cuộn.
- Kiểm tra menu, popup, dropdown, date picker, slideshow và footer sticky khi màn hình thấp.
