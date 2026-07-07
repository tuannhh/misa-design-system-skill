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

## Danh sách control Đợt 1 (14)

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

Chi tiết props/emits: đọc trực tiếp file component (có comment tiếng Việt) hoặc `assets/component-map.json`.

## Quy tắc khi AI sinh màn hình

- Control đã có trong bảng trên → **bắt buộc dùng, cấm viết HTML thô thay thế**.
- Control chưa có (DataTable, DatePicker, Drawer... — Đợt 2) → dựng theo spec trong `references/`, dùng token, và đánh dấu TODO để bổ sung vào bộ.
- Mọi màu/kích thước qua `var(--mds-*)` — không hard-code.

## Xem & duyệt bộ control (playground)

```bash
cd ui/playground && npm install && npm run dev
# mở http://localhost:5199 — có nút đổi 10 theme ngay trên trang
```

## Lộ trình

- **Đợt 2:** DataTable (tick dòng/bulk bar/phân trang/lọc/sort theo spec data-table.md), DatePicker/Range tiếng Việt, Drawer, ContextMenu, Tooltip, Dropdown menu
- **Đợt 3:** HeaderBar, Sidebar, 4 layout màn hình mẫu, Chart wrapper (ECharts + chart tokens)
