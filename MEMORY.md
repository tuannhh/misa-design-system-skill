# Memory bank — MISA Design System skill

File này lưu **bối cảnh và quyết định** không thể hiện được trong code/spec — để bất kỳ agent nào (Claude Code, Codex, Cursor, Antigravity...) mở repo lên là nắm được ngay, không phải đọc lại toàn bộ lịch sử commit. Cập nhật file này khi có thay đổi lớn về hướng đi hoặc quyết định quan trọng; đừng chép lại thứ đã có trong SKILL.md/CONVENTIONS.md/component-map.json.

## 1. Mục tiêu dự án

Product Designer (PD) của MISA hiện đang dùng Figma → dev tự map lại thành control FE, tốn thời gian và dễ lệch. Giám đốc thiết kế sản phẩm MISA + PM (chủ repo) đã chốt hướng đi: **PD prompt trực tiếp trên Claude Code/Codex ra FE chuẩn, bỏ qua Figma**, dev chỉ cần gắn API. Repo này là hạ tầng cho hướng đi đó: quy chuẩn thiết kế (MDS 2.0) + bộ control code sẵn (Vue 3 + Tailwind) + skill để AI tuân thủ.

**Không dùng lại MISA Control cũ** (bị đánh giá phức tạp, không đẹp) — bộ `ui/components/` là vẽ lại từ đầu, chỉ giữ *hành vi* chuẩn MDS đã trích xuất, còn *code/thẩm mỹ* làm mới hoàn toàn.

## 2. Kiến trúc & lý do

- **Phân phối kiểu copy-in** (không phải npm package): PD/dev chép trực tiếp file `.vue` vào project. Lý do: tránh phải maintain version/publish riêng, và "nói là code chứ prompt hết thôi" — PD không cần biết npm.
- **Vue 3 `<script setup>` + Tailwind, JS thuần (không TypeScript)** — khớp stack thật của MISA (Vue.js + Tailwind, xem MISA Tech Stack trong memory cá nhân của PM). Không TS để giảm rào cản khi AI sinh code nhanh.
- **Token qua CSS variables `var(--mds-*)`**, không hard-code hex — cho phép đổi cả 10 theme màu runtime bằng `data-mds-theme`.
- **Icon**: đã đổi từ "mỗi component tự inline SVG path" (Đợt 1–3) sang **registry tập trung** `MIcon.vue` + `iconRegistry.generated.js` (nhánh Codex `mds-platform-polish`, merge 2026-07-13). Lý do đổi: tránh icon lệch phong cách khi nhiều agent cùng viết component riêng lẻ; registry sinh tự động từ `scripts/build-icon-registry.py` đối chiếu đúng bundle Figma MDS hiện tại. **Không tự thêm icon mới bằng cách tự vẽ path** — phải đối chiếu Figma trước, thêm SVG chính thức vào `assets/icons/`, rồi chạy generator.
- **Nguồn quy chuẩn gốc là tài sản nội bộ Product Design MISA** — repo **PRIVATE**, không đưa link Figma/fileKey vào bất kỳ file nào (đã squash xóa khỏi git history một lần).

## 3. Trạng thái hiện tại (2026-07-13)

- **26 control** trong `ui/components/` (Đợt 1+2+3 đã xong) + **4 màn hình mẫu desktop** trong `ui/templates/` (ListPage, FormPage, DetailPage, DashboardPage) + **4 màn hình mẫu mobile** trong `ui/templates/mobile/` (ListPageMobile, FormPageMobile, DetailPageMobile, DashboardPageMobile — thêm 2026-07-13, theo `references/patterns/mobile-pwa.md`: bottom nav 5 mục, danh sách dạng card thay bảng, form 1 cột, top bar Back/More + action chính ghim đáy). Có 2 component dùng chung `ui/templates/mobile/MMobileTopBar.vue` và `MMobileBottomNav.vue`.
- Playground Vite (`ui/playground`, port 5199) có nav 9 trang (hash routing `#list #form #detail #dashboard` bản desktop + `#m-list #m-form #m-detail #m-dashboard` bản mobile, hiện trong khung điện thoại 390x844 mô phỏng), dùng để PD xem/duyệt trực tiếp trên web — mục đích thay thế Figma làm nơi review UI.
- **Deploy public**: `ui/playground/dist/` được **commit sẵn vào repo** (không build trên host) + `netlify.toml` ở gốc (`publish = ui/playground/dist`, `buildCommand` rỗng). Lý do: Vercel build-on-host từng lỗi 404 nhiều lần không rõ nguyên nhân → đổi sang serve static có sẵn cho chắc.
  - ⚠️ **Bẫy đã gặp**: `.gitignore` có rule `dist/` — file `.vue`/README trong `ui/playground/dist/` không tự động được `git add -A` track vì bị ignore. Phải `git add -f` khi có asset hash mới, và nhớ `git rm` asset hash cũ (Vite đổi tên hash mỗi build, nếu không dọn thì dist phình rác). Trước khi push sau khi rebuild, LUÔN kiểm tra `git ls-files ui/playground/dist/` khớp với `ls ui/playground/dist/assets/`.
  - Sau mỗi lần sửa `ui/components/` hoặc `ui/templates/`: chạy `cd ui/playground && npm run build`, rồi add lại dist đúng cách, commit, push — Netlify tự deploy bản mới.
- **Multi-agent trên cùng repo**: cả Claude Code và Codex cùng chỉnh sửa trực tiếp trên GitHub (Codex qua branch riêng, ví dụ `codex/mds-platform-polish` — đã merge vào `main` và xóa branch 2026-07-13). Quy tắc: **trước khi làm việc, luôn `git fetch` + xem diff nhánh khác** trước khi merge, không làm việc mù trên bản cũ. Sau khi merge xong một nhánh feature, xóa nhánh đó (`git push origin --delete <branch>`) để người clone sau không bị rối giữa nhiều nhánh — `main` luôn là bản đầy đủ nhất.
- Bản cài local của PM: `~/.claude/skills/misa-design-system` (Claude Code) — đồng bộ bằng `git pull` từ repo local hoặc GitHub. Codex có bản riêng ở `~/.codex/skills/misa-design-system`, cài qua `install.sh codex`.

## 4. Quyết định đã chốt (đừng làm lại/đảo ngược mà không hỏi)

- Stack: **Vue 3 + Tailwind CSS**, không xét lại React trừ khi user yêu cầu.
- Copy-in, không npm publish.
- 10 theme chính thức cố định (blue mặc định `#245FDF`) — không tự pha thêm theme ngoài bộ này.
- Dashboard card dùng border 1px, **không shadow**; shadow chỉ dùng cho overlay (popup/dropdown/toast/dialog/drawer).
- Sidebar active state là rounded tab trong gutter, không tô nền full-width, không vạch mép trái.
- Icon bắt buộc qua `MIcon` + registry, cấm inline SVG riêng (trừ vài ngoại lệ đã liệt trong `ui/CONVENTIONS.md`).

## 5. Việc còn mở

- Chờ feedback từ team PD MISA sau khi xem playground trên Netlify (link share ~2026-07-13) — có thể kéo theo yêu cầu đổi thẩm mỹ.
- Control chưa có: Tree, Upload, form validation helper (ghi trong `ui/README.md` mục Lộ trình).
- Chưa test bộ control trong một project MISA thật (pilot) — theo plan gốc, đây là bước cần làm trước khi đề xuất nhân rộng ra ngoài phòng của PM.

## 6. Cách dùng file này

- Agent mới vào repo: đọc file này trước, rồi mới đọc SKILL.md/AGENTS.md để biết quy trình làm UI.
- Khi có quyết định lớn mới (đổi stack, đổi kiến trúc phân phối, chốt hướng feedback PD...) → cập nhật mục tương ứng, đừng để MEMORY.md rơi vào lạc hậu.
- Đừng chép nội dung đã có sẵn trong SKILL.md/CONVENTIONS.md/component-map.json vào đây — chỉ ghi phần "tại sao" và "bối cảnh" mà các file kia không có chỗ chứa.
