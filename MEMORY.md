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
- **Feedback PD đợt xem playground đầu tiên (2026-07-13) — đã xử lý**:
  1. Sidebar/bottom-nav phải có dữ liệu demo ở MỌI mục, không chỉ mục mặc định. Đã sửa `ListPage.vue`: `activeMenu` giờ switch cả main content (Danh sách/Hợp đồng/Chấm công/Báo cáo/Thiết lập đều có mock data riêng), không chỉ đổi highlight. `DashboardPage.vue` sidebar: click mục khác "Tổng quan" → điều hướng hash sang `#list` (ListPage là nơi có đủ nội dung). Áp dụng quy tắc này cho **mọi màn hình mẫu có sidebar/bottom-nav mới thêm sau này** — không để mục nào là dead-end.
  2. Khung xem mobile trong playground quá đơn giản (chỉ viền đen bo góc) → PD chê xấu. Đã thay bằng `ui/playground/src/PhoneFrame.vue`: mô phỏng iPhone thật có Dynamic Island, status bar (giờ/sóng/wifi/pin bằng SVG tự vẽ, không phải icon MDS — đây là khung trình bày, không phải UI app), home indicator. Component này CHỈ dùng trong playground để trình bày, không phải MDS component.
  3. `MChart` (`ui/components/MChart.vue`) mặc định luôn bật legend ở góc trên-trái kể cả chart 1 series → đè lên nhãn trục Y. Quy tắc mới: **bar/line chart chỉ 1 series phải tự set `legend: { show: false }`** trong option truyền vào MChart (tiêu đề card đã đủ ngữ nghĩa, legend 1 mục là thừa và dễ đè chart).
  4. Legend donut/pie mặc định chỉ hiện tên, số đếm phải hover mới thấy → PD muốn mặc định thấy %, hover mới thấy số tuyệt đối. Quy tắc mới cho pie/donut nhiều lát: tính sẵn tổng trong script, dùng `legend.formatter` để in `"<tên>  <phần trăm>%"`, giữ `tooltip.valueFormatter` cho số đếm tuyệt đối khi hover. Đồng thời rút khoảng cách legend↔chart lại gần (xem `pieOption` trong `DashboardPage.vue`/`DashboardPageMobile.vue` làm mẫu).

## 4. Quyết định đã chốt (đừng làm lại/đảo ngược mà không hỏi)

- Stack: **Vue 3 + Tailwind CSS**, không xét lại React trừ khi user yêu cầu.
- Copy-in, không npm publish.
- 10 theme màu chính thức cố định (blue mặc định `#245FDF`) — không tự pha thêm theme ngoài bộ này. Từ 2026-07-16 có thêm lựa chọn **Gradient** thứ 11 (token Green + header gradient) theo demo chuẩn của giám đốc thiết kế.
- Dashboard card dùng **viền mờ `shadow-card` (`0 0 2px rgba(0,0,0,0.10)`) hoặc border 1px, không drop shadow nổi**; shadow nổi chỉ dùng cho overlay (popup/dropdown/toast/dialog/drawer). (Sửa 2026-07-16: demo chuẩn dùng shadow-card thay border.)
- Sidebar active state là rounded tab trong gutter, không tô nền full-width, không vạch mép trái.
- Icon bắt buộc qua `MIcon` + registry, cấm inline SVG riêng (trừ vài ngoại lệ đã liệt trong `ui/CONVENTIONS.md`).

### Đồng bộ với demo chuẩn của giám đốc thiết kế (2026-07-16)

Đối chiếu skill với bộ demo chuẩn `http://dvviet-thin:3000/ketoan-dashboard` (source Vite tại `D:/Figma/mds-ui` trên máy dvviet-thin — lấy source qua endpoint `?raw` của Vite dev server; các trang: KetoanDashboard, TienMatPage, TienGuiPage, BanHangPage, PhieuThuForm + components ControlHeader/AppSidebar/TableHeader/TablePaging/AppCheckbox/DropdownMenu/CollapseExpandPanel/TIcon/IconMisaAI/IconAmisChat). Các thay đổi đã áp vào skill: font **InterVariable v4** self-hosted; **density 3 mức** (btn 28/32/36, input 28/36/40, row 32/36/40 — row 2 dòng 56px và 3 dòng 72px cố định); **dialog Thiết lập màu sắc và hiển thị** (theme + chế độ header Màu sắc/Sáng + density + wallpaper/glass); theme **Gradient**; khung app 48/48/56px, sidebar 200/64px hover-overlay; card dashboard dùng `shadow-card`; radius scale 4/6/8/12; chart palette c1–c6 + quy ước ECharts chi tiết (communication.md); button AI gradient `#1482FF→#CF11FF`; **màu icon header theo mode** (AVA full-color cố định — SVG Figma node 20062:2582, AMIS Chat trắng/`#1570EF`, badge luôn đỏ) trong header-bar.md 3c; spec bảng dữ liệu đầy đủ (data-table.md mục 13: toolbar 4 icon cố định + bulk action, KPI row, paging 48px, resize cột, sticky action column); spec form chứng từ full màn hình (popup-form.md mục 5: form bar 48px, footer tối `--neutral-800` 52px với hint phím tắt + toggle + Cất/Cất và Thêm, bảng hạch toán inline-edit, dropzone đính kèm, biến thể aside 300px); checkbox/dropdown menu spec. Files: `SKILL.md`, `assets/tokens.css`, `references/styles.md`, `layout-patterns.md`, `communication.md`, `patterns/{header-bar,sidebar,data-table,popup-form}.md`, `components/{input,checkbox,context-menu}.md`.

**Phản hồi giám đốc thiết kế (2026-07-16, kèm ảnh Figma variables) — đã áp:**
- **Stroke dùng chính thang Neutral** (không hex riêng): Stroke Neutral = Neutral/400 `#CED1D6`, Neutral Light = Neutral/300 `#E9EAEB` (dùng cho phân tách **rất nhẹ**: dưới header/sub-nav, kẻ trong card), Divider = Neutral/300, Disable = Neutral/200; semantic (Brand/Info/Warning/Danger/Success) stroke = base/600, Light = /300, Disabled = /400. → styles.md bảng Stroke mapping, tokens.css var tham chiếu.
- **Box shadow là CHUẨN BẮT BUỘC toàn team** cho mọi box trắng trên nền xám (không dùng border đóng khung): `border-radius:8px; background:#FFF; box-shadow: 0 0 2px 0 var(--Alpha-Black-100, rgba(0,0,0,0.10))` — tên Figma "Drop Shadow/Neutral/All 2". Đây chốt lại điểm mâu thuẫn "border vs shadow" của bản trước: **dùng shadow-card, KHÔNG phải border 1px**. Đã sửa SKILL.md, styles.md, layout-patterns.md, tokens.css (value chính xác `0 0 2px 0`).
- **Icon co/cụp sidebar**: nút đáy đảo chiều icon + đổi hình dạng theo trạng thái (mở = 40×40 góc phải bo trên-trái; thu gọn = full-width đáy); + CollapseExpandPanel cho KPI/detail. → sidebar.md.

**2 điểm trước cần PD quyết → giám đốc chốt "cứ theo demo":** (1) Nguồn icon = **Tabler Icons stroke 1.5** (theo demo) — không còn coi là fallback. (2) `ui/components/` vẫn cần đồng bộ (việc còn mở). HomePage platform-home vẫn để ngoài skill (chưa có chỉ đạo đưa vào).

## 5. Việc còn mở

- Chờ feedback từ team PD MISA sau khi xem playground trên Netlify (link share ~2026-07-13) — có thể kéo theo yêu cầu đổi thẩm mỹ.
- Control chưa có: Tree, Upload, form validation helper (ghi trong `ui/README.md` mục Lộ trình).
- Chưa test bộ control trong một project MISA thật (pilot) — theo plan gốc, đây là bước cần làm trước khi đề xuất nhân rộng ra ngoài phòng của PM.
- Đồng bộ `ui/components/` + `ui/templates/` theo demo chuẩn 2026-07-16 — **đã làm phần lõi** (2026-07-16, sau khi kéo commit `d2c254a` từ máy khác về): input/select/combobox/date-picker height 32→36px; popup radius (dropdown/select/combobox/date picker) 4→12px (`rounded-xl`); mọi card/box trắng trên nền xám trong `ui/templates/` + `MDataTable.vue` đổi từ `border` sang `shadow-[var(--mds-shadow-card)]` (giữ border chỉ cho trạng thái tương tác: card báo cáo dùng `ring-1 hover:ring-brand-600`, card nhân viên mobile dùng border chỉ khi selected); `MSidebar.vue` rộng 240/56 → 200/64px; `MHeaderBar.vue` icon AVA đổi thành SVG gradient full-color cố định (tạm dựng, **chưa phải asset Figma chính thức** node 20062:2582 — cần thay khi có), icon AMIS Chat đổi thành bong bóng chat filled giữ màu `#1570EF` trên header light.
  - **Vẫn còn mở** (chưa làm, việc lớn hơn nên tách đợt sau nếu cần): settings dialog "Thiết lập màu sắc và hiển thị" (theme/mode/density/wallpaper + glass mode), sidebar hover-overlay mở rộng tạm thời khi thu gọn (hiện chỉ đổi kích thước, chưa có hành vi overlay-on-hover), density 3 mức (Compact/Trung bình/Rộng) — hiện mới áp mật độ Trung bình mặc định, nút AI gradient, spec bảng dữ liệu đầy đủ (data-table.md mục 13: KPI row, resize cột, sticky action column), spec form chứng từ full màn hình (popup-form.md mục 5), font InterVariable self-host (token đã đổi tên font-family nhưng **chưa nhúng file .woff2 thật** — hiện fallback về Inter thường qua CSS font stack nên chưa thấy khác biệt trực quan), CollapseExpandPanel, checkbox hover-ring spec.

## 6. Cách dùng file này

- Agent mới vào repo: đọc file này trước, rồi mới đọc SKILL.md/AGENTS.md để biết quy trình làm UI.
- Khi có quyết định lớn mới (đổi stack, đổi kiến trúc phân phối, chốt hướng feedback PD...) → cập nhật mục tương ứng, đừng để MEMORY.md rơi vào lạc hậu.
- Đừng chép nội dung đã có sẵn trong SKILL.md/CONVENTIONS.md/component-map.json vào đây — chỉ ghi phần "tại sao" và "bối cảnh" mà các file kia không có chỗ chứa.
