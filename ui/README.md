# MDS UI — Bộ control Vue 3 + Tailwind chuẩn MISA

Bộ component mới xây từ đầu theo quy chuẩn MDS 2.0, phân phối kiểu **copy-in**: chép file `.vue` cần dùng vào project, không cần cài package riêng. Mục tiêu: PD mô tả màn hình bằng lời → AI lắp từ các control này → ra FE chuẩn chuyển thẳng cho dev.

## Cách dùng trong project Vue 3

1. Project cần có: Vue 3 + Tailwind CSS (v3/v4 đều được) + font Inter.
2. Copy thư mục `ui/components/` vào project (khuyến nghị `src/components/mds/`).
3. Import tokens vào CSS gốc của project:
   ```css
   @import "<đường-dẫn>/assets/tokens.css";
   @import "<đường-dẫn>/assets/tokens/base-colors.css";
   @import "<đường-dẫn>/assets/tokens/themes/blue.css"; /* + theme khác nếu cho đổi */
   ```
4. Đặt theme trên `<html data-mds-theme="blue">` (blue là mặc định MISA).
5. Đặt `<MToast />` một lần ở App.vue nếu dùng toast.

## Danh sách control (24)

| Control | File | Ghi chú nhanh |
|---|---|---|
| Button | `MButton.vue` | variant: primary/secondary/danger/link/icon · `loading` tự disable chặn double-submit |
| Tag | `MTag.vue` | 6 màu soft · `closable` |
| Spinner | `MSpinner.vue` | stroke currentColor, dùng trong button được |
| Progress | `MProgress.vue` | thanh 6px, cho tác vụ >5s |
| Input | `MInput.vue` | select-all khi focus · `clearable` · password eye · slot prefix/suffix · `error` |
| Textarea | `MTextarea.vue` | đếm ký tự realtime khi có `maxlength` |
| Checkbox | `MCheckbox.vue` | `indeterminate` cho checkbox đầu danh sách |
| Radio group | `MRadioGroup.vue` | `options` + `direction` |
| Select | `MSelect.vue` | dropdown 4–8 lựa chọn · bàn phím đầy đủ · teleport popover |
| Combobox | `MCombobox.vue` | >8 lựa chọn · gõ tìm bỏ dấu TV · `multiple` (2 tag + "+N") · `allowCreate` thêm nhanh · emit `search` cho load-on-demand |
| Dialog | `MDialog.vue` | Primary ngoài cùng phải · Esc đóng · cấm chồng dialog |
| Toast | `MToast.vue` + `toast.js` | `useToast()` · tự đóng 5s · max 3 · rộng ≤400px |
| Tabs | `MTabs.vue` | underline/pill · bàn phím ←→ |
| Empty state | `MEmptyState.vue` | `type`: initial/no-result · slot actions |
| Data table | `MDataTable.vue` | tick dòng → bulk action bar · phân trang prev/next không đánh số · sort server-side · row actions hover · sticky header · slot `cell-<key>` |
| Date picker | `MDatePicker.vue` | lịch T2–CN tiếng Việt · gõ tay dd/MM/yyyy · drill-down tháng/năm · nút Hôm nay |
| Date range | `MDateRangePicker.vue` | 8 preset VN (Hôm nay→Năm nay) · 2 lịch liền kề · Hủy/Áp dụng |
| Drawer | `MDrawer.vue` | trượt phải/trái · overlay hoặc đẩy nội dung · footer Primary phải |
| Context menu | `MContextMenu.vue` | `ref.open(event, payload)` · submenu · item danger · icon từ assets/icons |
| Tooltip | `MTooltip.vue` | hover/focus · `shortcut` hiện kbd phím tắt · 4 hướng tự lật |
| Dropdown menu | `MDropdownMenu.vue` | nút More ⋯ chuẩn MDS · item danger/divider · bàn phím đầy đủ |
| Header bar | `MHeaderBar.vue` | cao 48px nền brand · tìm kiếm Ctrl+K · chuông badge · avatar |
| Sidebar | `MSidebar.vue` | trắng · expanded 240px / collapsed 56px hover popover · active brand-50 + thanh 3px |
| Chart | `MChart.vue` | ECharts wrapper (cần `npm i echarts`) · palette chart tokens · số VN · auto-resize |

## 4 màn hình mẫu (`ui/templates/`)

Khi dựng màn hình mới, **clone template tương ứng làm khung** rồi sửa theo nghiệp vụ — không dựng layout từ đầu. Root template dùng `h-full`, mount trong container cao 100vh.

| Màn hình | File | Nội dung |
|---|---|---|
| Danh sách | `ListPage.vue` | HeaderBar + Sidebar + toolbar chuẩn + DataTable + Drawer thêm nhanh |
| Thêm/Sửa | `FormPage.vue` | form 2 cột + footer sticky Lưu/Hủy |
| Chi tiết | `DetailPage.vue` | nút thao tác ghim góc phải + Tabs |
| Tổng quan | `DashboardPage.vue` | 4 KPI card + 3 Chart + bảng mini |

Chi tiết props/emits: đọc trực tiếp file component (có comment tiếng Việt) hoặc `assets/component-map.json`.

## Quy tắc khi AI sinh màn hình

- Control đã có trong bảng trên → **bắt buộc dùng, cấm viết HTML thô thay thế**.
- Control chưa có (HeaderBar, Sidebar, Chart... — Đợt 3) → dựng theo spec trong `references/`, dùng token, và đánh dấu TODO để bổ sung vào bộ.
- Mọi màu/kích thước qua `var(--mds-*)` — không hard-code.

## Xem & duyệt bộ control (playground)

```bash
cd ui/playground && npm install && npm run dev
# mở http://localhost:5199 — có nút đổi 10 theme ngay trên trang
```

## Lộ trình

- ~~Đợt 1: 14 control lõi~~ ✅
- ~~Đợt 2: DataTable, DatePicker/Range, Drawer, ContextMenu, Tooltip, DropdownMenu~~ ✅
- ~~Đợt 3: HeaderBar, Sidebar, MChart (ECharts), 4 màn hình mẫu~~ ✅
- Tiếp theo (khi có feedback PD): tinh chỉnh thẩm mỹ, Tree, Upload, form validation helper
