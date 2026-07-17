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

## 3. Trạng thái hiện tại (cập nhật 2026-07-16)

- **28 control** trong `ui/components/` (thêm `MCollapseExpandPanel.vue`, `MSwitch.vue` ngày 2026-07-17) + **5 màn hình mẫu desktop** trong `ui/templates/` (ListPage, FormPage, DetailPage, DashboardPage — app "AMIS Nhân sự"; `DocumentFormPage.vue` — app "AMIS Kế toán", mẫu form chứng từ full màn hình) + **4 màn hình mẫu mobile** trong `ui/templates/mobile/` (theo `references/patterns/mobile-pwa.md`: bottom nav 5 mục, danh sách dạng card, form 1 cột, top bar Back/More + action chính ghim đáy — dùng chung `MMobileTopBar.vue`/`MMobileBottomNav.vue`).
- Playground Vite (`ui/playground`, port 5199) có nav 9 trang (hash routing `#list #form #detail #dashboard` desktop + `#m-*` mobile trong khung điện thoại mô phỏng `PhoneFrame.vue`) — dùng để PD xem/duyệt trực tiếp trên web thay Figma.
- **State dùng chung toàn app**: `ui/components/theme-state.js` (singleton module-scope) — `currentTheme/applyTheme` (11 theme màu, gồm cả Gradient), `currentHeaderMode/applyHeaderMode` ('brand'/'light'), `currentDensity/applyDensity` (compact/medium/comfortable), `sidebarCollapsed` — tất cả tự lưu `localStorage`, set thuộc tính `data-mds-theme`/`data-density` trên `<html>`. Dialog `MSettingsDialog.vue` (mở từ nút gear trên `MHeaderBar`) là UI để đổi các giá trị này — 2/3 tab đã xong (màu sắc, hiển thị), tab Hình nền chưa làm. **Đã wire vào `DashboardPage.vue` + `ListPage.vue`**; `FormPage/DetailPage` (+ 4 bản mobile) KHÔNG cần wire vì không dùng `MHeaderBar`/`MSidebar` (xem mục 5).
- **Deploy public**: `ui/playground/dist/` được **commit sẵn vào repo** (không build trên host) + `netlify.toml` ở gốc (`publish = ui/playground/dist`). Có site Netlify riêng cho bản demo Dashboard đối chiếu: `mds-dashboard-demo` (đã link qua `.netlify/state.json`) — deploy thủ công bằng `netlify deploy --prod --dir=ui/playground/dist` với Personal Access Token của user (agent không tự chạy được lệnh này, xem mục "Bẫy" bên dưới).
- **Multi-agent/multi-phiên trên cùng repo**: thường có nhiều phiên Claude Code chạy song song trên cùng repo (chia việc theo "nhóm A/B/C..."). Quy tắc bắt buộc: **`git fetch` + xem diff trước khi sửa, và fetch lại lần nữa ngay trước khi push** (đã bị conflict 2 lần trong phiên 2026-07-16 vì bỏ qua bước này). Khi merge, ưu tiên giữ bản dùng token CSS var thay vì hardcode nếu 2 bên khác nhau ở cùng chỗ.
- Bản cài local của PM: `~/.claude/skills/misa-design-system` — đồng bộ bằng `git pull`. Codex có bản riêng ở `~/.codex/skills/misa-design-system`, cài qua `install.sh codex`.
- **Đối chiếu với bộ demo chuẩn của giám đốc thiết kế** (`http://dvviet-thin:3000`, source Vite tại `D:/Figma/mds-ui`) đã hoàn thành cả tài liệu (`references/`) lẫn code thật (`ui/components/`, `ui/templates/`) cho phần lõi: density 3 mức, dialog Thiết lập, theme Gradient, khung app 48/48/56px, sidebar 200/64px, card `shadow-card`, icon AVA/AMIS Chat đúng theo mode, chart palette + quy ước ECharts. Chi tiết đầy đủ + toàn bộ lịch sử các lần thử sai đã rút gọn xuống mục "Bài học quan trọng" bên dưới.

## 4. Quyết định đã chốt (đừng làm lại/đảo ngược mà không hỏi)

- Stack: **Vue 3 + Tailwind CSS**, không xét lại React trừ khi user yêu cầu.
- Copy-in, không npm publish.
- 10 theme màu chính thức cố định (blue mặc định `#245FDF`) — không tự pha thêm theme ngoài bộ này. Từ 2026-07-16 có thêm lựa chọn **Gradient** thứ 11 (token Green + header gradient) theo demo chuẩn của giám đốc thiết kế.
- Dashboard card dùng **viền mờ `shadow-card` (`0 0 2px rgba(0,0,0,0.10)`) hoặc border 1px, không drop shadow nổi**; shadow nổi chỉ dùng cho overlay (popup/dropdown/toast/dialog/drawer). (Sửa 2026-07-16: demo chuẩn dùng shadow-card thay border.)
- Sidebar active state là rounded tab trong gutter, không tô nền full-width, không vạch mép trái.
- Icon bắt buộc qua `MIcon` + registry, cấm inline SVG riêng (trừ vài ngoại lệ đã liệt trong `ui/CONVENTIONS.md`).

### Đối chiếu demo chuẩn giám đốc thiết kế — chi tiết áp dụng

Nguồn: `http://dvviet-thin:3000` (source Vite tại `D:/Figma/mds-ui`, lấy qua endpoint `?raw`), các trang KetoanDashboard/TienMat/TienGui/BanHang/PhieuThuForm + component ControlHeader/AppSidebar/TableHeader/TablePaging/AppCheckbox/DropdownMenu/TIcon/IconMisaAI/IconAmisChat.

**Tài liệu (`references/`) đã cập nhật đầy đủ**: font InterVariable v4; density 3 mức; dialog Thiết lập màu sắc/hiển thị/hình nền; theme Gradient; khung app 48/48/56px; sidebar 200/64px hover-overlay; card `shadow-card`; radius scale 4/6/8/12; chart palette + quy ước ECharts (`communication.md`); button AI gradient; màu icon header theo mode (`header-bar.md` 3c); spec bảng dữ liệu (`data-table.md` mục 13); spec form chứng từ full màn hình (`popup-form.md` mục 5); stroke tham chiếu thang Neutral; box-shadow là chuẩn bắt buộc (không phải border) cho box trắng trên nền xám.

**Code thật (`ui/components/`, `ui/templates/`) đã cập nhật**:
- `MButton.vue`: height token hóa, thêm variant `outline/neutral/ghost/success/warning/ai`.
- `MInput.vue`/`MSelect.vue`/`MCombobox.vue`/`MDatePicker.vue`/`MDateRangePicker.vue`: đều dùng `h-[var(--mds-input-height)]` (density-aware).
- `MSidebar.vue`: 200px/64px đúng token.
- `MHeaderIconAva.vue`, `MHeaderIconChat.vue`: 2 asset SVG riêng lấy đúng nguyên văn từ demo gốc (không phải Tabler generic, không tự vẽ lại — xem bài học bên dưới).
- `theme-state.js` + `MSettingsDialog.vue`: hạ tầng state dùng chung + UI đổi theme/mode/density — đã wire vào `DashboardPage.vue` + `ListPage.vue`.
- `DashboardPage.vue`: dựng lại theo app "AMIS Nhân sự" (khớp ListPage/FormPage/DetailPage), cấu trúc/kỹ thuật theo demo chuẩn nhưng nội dung nghiệp vụ tự viết.
- Theme Gradient: `assets/tokens/themes/gradient.css` (hand-authored, không sinh bởi `build-tokens.py` — nếu có Figma export chính thức sau này thì đổi lại).

### Bài học quan trọng / bẫy đã gặp (đọc trước khi lặp lại việc tương tự)

1. **Icon bespoke từ demo KHÔNG có trong thư viện nội bộ — đừng đoán, dùng đúng source đã capture.** Icon AMIS Chat từng bị làm sai 3 lần (tự vẽ tay, badge tròn cố định, rồi đoán "chắc là icon `message` có sẵn trong `MIcon`") trước khi dùng đúng nguyên văn SVG capture từ `IconAmisChat.vue` gốc (1 path, `fill-rule="evenodd"`, dots là lỗ khoét, `fill="currentColor"` tint theo mode). **Nếu đã có source gốc chính xác trong tay, luôn dùng lại nguyên văn — đừng suy luận thư viện nội bộ "chắc đã có sẵn".**
2. **`<MChart>` tự có `class="w-full"` hardcode trên root** — truyền `class="w-[160px]"` trực tiếp vào component KHÔNG có tác dụng (2 class Tailwind cùng set width xung đột, thắng thua không đoán được). Luôn bọc `<div class="w-[...]">` bên ngoài rồi đặt `<MChart>` bên trong.
3. **Legend/flex item tự dựng cần `min-w-0`** nếu nằm trong container hẹp — flex item mặc định không co lại dưới content width, dễ tràn.
4. **`.gitignore` có rule `dist/`** — `ui/playground/dist/` phải `git add -f`, và phải `git rm --cached` asset hash cũ mỗi lần rebuild (Vite đổi hash), không thì rác tích lũy. Luôn đối chiếu `git ls-files ui/playground/dist/` khớp `ls ui/playground/dist/assets/` trước khi commit.
5. **Nhiều phiên Claude Code chạy song song trên cùng repo là bình thường** (chia việc theo "nhóm A/B/C...") — luôn `git fetch` trước khi bắt đầu VÀ ngay trước khi push (đã bị conflict 2 lần vì bỏ qua bước thứ 2). Khi merge, ưu tiên bản dùng token CSS var thay vì hardcode nếu 2 bên khác nhau cùng chỗ; khi 1 bên viết lại toàn bộ 1 template (vd `DashboardPage.vue`) theo nội dung khác app, luôn kiểm tra còn khớp `app-name`/nghiệp vụ với các trang còn lại của bộ demo hay không — đừng chỉ nhìn diff kỹ thuật.
6. **Node cài qua snap trên máy này bị lỗi thiếu glibc** (`GLIBCXX_3.4.31`/`GLIBC_2.38`, hệ thống chỉ có glibc 2.35) — dùng Node v20 portable đã tải về `~/.local/node` (không cần sudo). `.claude/launch.json` trong repo giữ `"npm"` chung chung (không hard-code path máy); launch.json thật để chạy Preview nằm ở `/home/bmtuan/Documents/.claude/launch.json` (NGOÀI repo git).
7. **`rounded-xl` (Tailwind v4) = 12px, đúng bằng `--mds-radius-popup`** — không phải bug dù trông như "hardcode thay vì token", đừng tốn công sửa lại.
8. **Netlify deploy**: đăng nhập qua trình duyệt (`netlify login`) hay timeout (~90s); Personal Access Token hoạt động nhưng lệnh `netlify deploy --prod` chèn token dạng chữ thô vào Bash command bị auto-mode classifier chặn (deploy production + lộ credential) — phải để **user tự chạy lệnh deploy trên máy họ**. Site `mds-dashboard-demo` đã tạo sẵn, chỉ cần `netlify deploy --prod --dir=ui/playground/dist` với token của user.

## 5. Việc còn mở

- Chờ feedback từ team PD MISA sau khi xem playground trên Netlify — có thể kéo theo yêu cầu đổi thẩm mỹ.
- Control chưa có: Tree, Upload, form validation helper (ghi trong `ui/README.md` mục Lộ trình).
- Chưa test bộ control trong một project MISA thật (pilot) — bước cần làm trước khi đề xuất nhân rộng ra ngoài phòng PM.
- Chưa di chuyển bộ icon 81 file sang gói **`@tabler/icons-vue`** thật (việc lớn, rủi ro cao — icon nội bộ hiện đã cùng phong cách stroke 1.5px nên tạm ổn, ưu tiên thấp; **CHỦ ĐỘNG KHÔNG LÀM** theo yêu cầu user 2026-07-17).
- Netlify demo `mds-dashboard-demo` — chờ user tự deploy bằng token cá nhân, sau đó nên đối chiếu trực tiếp với `http://dvviet-thin:3000/ketoan-dashboard` và ghi lại điểm lệch còn sót (nếu có).
- **Đã xác nhận KHÔNG phải lỗ hổng** (từng bị hiểu nhầm là việc tồn): `FormPage`/`DetailPage` (+ 4 bản mobile) không dùng `MHeaderBar`/`MSidebar` nên không cần nối `theme-state.js` — theme/density vẫn tự áp dụng đúng qua thuộc tính global trên `<html>`.

### Hoàn thành 2026-07-17 (phiên tiếp theo sau khi clear context)

- **Tab Hình nền** trong `MSettingsDialog.vue`: 5 lựa chọn (Không có + 4 wallpaper gradient CSS), bật wallpaper tự kéo theo `data-mds-glass="true"` trên `<html>` (KHÔNG có toggle riêng — đúng spec header-bar.md mục 3). CSS ở cuối `assets/tokens.css`: `.mds-card` (và mọi phần tử dùng class này, đã gắn thêm vào `MDataTable.vue`) chuyển nền `rgba(255,255,255,0.78)` + `backdrop-filter: blur(15px)` khi glass bật; header/sidebar/dialog KHÔNG dùng class này nên tự động vẫn solid. State mới trong `theme-state.js`: `WALLPAPER_LIST`, `currentWallpaper`, `applyWallpaper()`, lưu `localStorage` key `mds-wallpaper`.
- **Font InterVariable**: đã tải file `.woff2` thật (weight + italic) từ rsms.me về `assets/fonts/` (KHÔNG còn CDN) + `assets/fonts/inter.css` (`@font-face`) import trong `ui/playground/src/style.css`. Gỡ `<link rel="stylesheet" href="https://rsms.me/...">` khỏi `ui/playground/index.html`.
- **`MDataTable.vue`** viết lại theo `data-table.md` mục 13: slot `#kpi` (thu/mở bằng `MCollapseExpandPanel`), slot `#toolbar-search`/`#toolbar-actions` + 4 icon cố định Làm mới/Xuất file/Thiết lập cột/Bộ lọc (emit `refresh`/`export`/`column-settings`/`filter-click`), header nền `--mds-neutral-200`, resize cột kéo mép phải (yêu cầu `table-fixed` trên `<table>` mới có tác dụng — nếu thiếu class này resize sẽ không đổi width thật dù state đã update), cell ngăn vạch chấm (header vẫn liền), cột thao tác dòng tách riêng thành `<td>` sticky mép phải (chỉ hiện khi có slot `#row-actions`, không còn nhúng đè lên cột dữ liệu cuối như bản cũ), prop `total` mới để tính range "1 - 20" + nút về đầu/về cuối. `ListPage.vue` (mục Nhân viên) đã wire đủ các slot mới để làm ví dụ thật.
- **`references/patterns/popup-form.md` mục 5** (form chứng từ full màn hình): template mới `ui/templates/DocumentFormPage.vue` — app minh họa **"AMIS Kế toán"** (khác domain "AMIS Nhân sự" của List/Dashboard, vì mẫu gốc là Phiếu thu kế toán) dùng chung `MHeaderBar`/`MSidebar` (header+sidebar giữ nguyên khi form full màn hình, đúng spec). Có form bar 48px, bảng hạch toán inline-edit, dropzone đính kèm, và đặc biệt **footer tối `--neutral-800` (`#484E59`, biến chưa tồn tại trong tokens.css nên dùng fallback `var(--mds-neutral-800,#484E59)`)** với hint phím tắt + `MSwitch` (component mới, toggle 36×20px) + split button primary. Thêm nav `#doc-form` trong `ui/playground/src/App.vue`.
- **`MCollapseExpandPanel.vue`** (component mới): prop `side` ('top'/'bottom'/'left'/'right') quyết định kích thước 40×16 hay 16×40 + góc bo (bo góc phía KHÔNG gắn vào đường kẻ) + icon chevron đảo chiều. Dùng trong hàng KPI của `MDataTable` và demo trong `ControlsPage.vue`.
- **Bẫy mới gặp khi viết `MCollapseExpandPanel.vue`/`MSwitch.vue`**: Write tool 2 lần để sót tag `</content>` thừa ở cuối file (lỗi copy nội dung) → Vue SFC compiler lỗi "Invalid end tag", cả app trắng trang (mount lỗi) mà không có gì trong console ngoài lỗi network 500 khi fetch đúng file đó — luôn kiểm tra `preview_network` filter `failed` khi thấy trang trắng bất thường, đừng chỉ nhìn console.
- Đã đối chiếu, **cố tình bỏ qua việc số 3 (di chuyển icon sang `@tabler/icons-vue`)** theo yêu cầu trực tiếp của user trong phiên 2026-07-17.
- **Deploy thử local (production build)**: `npm run build` (Node portable `~/.local/node`, xem bài học #6) chạy OK, output `ui/playground/dist/` gồm cả 2 file font thật. Thêm config `mds-playground-preview` (port 5198, `vite preview`) vào `/home/bmtuan/Documents/.claude/launch.json` (ngoài repo) để lần sau preview bản build production không cần dev server. Đã verify các trang chính trên bản build — không lỗi console.
- **Bẫy mới**: mỗi lần `npm run build` đổi tên file hash trong `ui/playground/dist/assets/`, các asset cũ vẫn nằm trong git index (do `.gitignore` có `dist/` nên git không tự phát hiện file mới/cũ) — PHẢI tự `git rm --cached <asset cũ>` + `git add -f <asset mới>` trước khi commit, không thì rác tích lũy hoặc `dist/index.html` trỏ tới file đã xóa. Đối chiếu `git ls-files ui/playground/dist/assets/` khớp `ls ui/playground/dist/assets/` là cách kiểm tra nhanh nhất.
- **Nhận file export Figma token thật (2026-07-17)**: user cung cấp 6 file zip export trực tiếp từ Figma Variables (Chart Colors, Number, Base Colors, Themes ×10, Space, Font Family) để đối chiếu xem token trong repo (`assets/tokens.css` + `assets/tokens/*.css`) có bị lệch/thiếu so với bản Figma mới nhất không. Đây là việc SOÁT, chưa áp dụng — nếu phát hiện lệch, hỏi user trước khi sửa token (ảnh hưởng toàn bộ theme/spacing).

## 6. Cách dùng file này

- Agent mới vào repo: đọc file này trước, rồi mới đọc SKILL.md/AGENTS.md để biết quy trình làm UI.
- Khi có quyết định lớn mới (đổi stack, đổi kiến trúc phân phối, chốt hướng feedback PD...) → cập nhật mục tương ứng, đừng để MEMORY.md rơi vào lạc hậu.
- Đừng chép nội dung đã có sẵn trong SKILL.md/CONVENTIONS.md/component-map.json vào đây — chỉ ghi phần "tại sao" và "bối cảnh" mà các file kia không có chỗ chứa.
