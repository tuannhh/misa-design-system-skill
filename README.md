# MISA Design System Skill

Bộ quy chuẩn giúp AI coding agent (Claude Code, Codex, Cursor, VS Code Copilot, Antigravity, Kiro, Xcode...) xây dựng UI **đúng quy chuẩn thiết kế MISA (MDS 2.0)** khi phát triển ứng dụng trong hệ sinh thái MISA AMIS Platform.

Khi được cài, AI sẽ tự động áp dụng:
- 4 nguyên tắc thiết kế chung của MISA (dễ học, dễ nhập liệu, kiểm soát thao tác, kiểm soát lỗi)
- Bố cục chuẩn cho 4 loại màn hình: Tổng quan, Danh sách (6 biến thể), Thêm/Sửa, Chi tiết
- Quy tắc component theo bộ MDS Web Components v2.0, kèm **spec chi tiết từng component** (Input, Tab, Tree, Date time picker, Icon...) trích xuất từ Figma
- Checklist kiểm tra UI trước khi bàn giao

## Cấu trúc

```
misa-design-system/
├── SKILL.md                          # Chuẩn Agent Skills — Claude Code / Codex
├── AGENTS.md                         # Chuẩn AGENTS.md — Cursor, Antigravity, Copilot, Zed...
├── install.sh                        # Script cài tự động cho từng agent
├── assets/
│   ├── tokens.css                    # Token nhanh (thang Brand Blue, trạng thái, size)
│   ├── tokens/                       # 2.639 token CSS sinh từ Figma variables:
│   │   ├── themes/                   #   10 theme màu app (blue, indigo, teal...)
│   │   ├── base-colors.css           #   Info/Warning/Danger/Success/Neutral 50→950
│   │   ├── space-*.css               #   3 chế độ mật độ spacing từng component
│   │   ├── chart-*.css               #   Bảng màu biểu đồ (palette/divergent/single-hue)
│   │   ├── number.css · font.css     #   Spacing/radius scale, font
│   ├── figma-tokens/                 # JSON gốc export từ Figma (nguồn để build lại)
│   ├── theme-preview.html            # Trang chọn tone màu — mở cho user chọn 1/10 theme
│   └── icons/                        # 81 icon SVG chuẩn MDS stroke 1.5px (không search mạng)
├── scripts/build-tokens.py           # Sinh lại assets/tokens/ khi có export Figma mới
└── references/
    ├── general-design-rules.md       # 4 nguyên tắc thiết kế chung
    ├── usability-requirements.md     # Yêu cầu tiện dụng (Tab order, SelectAll, tooltip...)
    ├── layout-patterns.md            # Bố cục các loại màn hình AMIS
    ├── styles.md                     # Hệ màu 2 cấp, Text Styles (Inter), quy tắc icon
    ├── communication.md              # Thông báo, dialog, loading, empty state, error page, biểu đồ
    ├── conventions.md                # Phím tắt, chính tả, định dạng số VN, icon dùng chung...
    ├── components.md                 # Quy tắc chung khi dùng component MDS
    ├── patterns/                     # Data table (chọn dòng/phân trang/lọc/sắp xếp),
    │                                 # Header bar, Sidebar, Popup/Form
    └── components/                   # Spec từng component: button, text-field, dropdown,
        │                             # combobox, checkbox, radio, date-time-picker,
        │                             # context-menu, input, tab, tree, icon...
        └── icons-map.md              # Bảng tra: hành động → file icon + token màu
```

## Cài đặt

> Repo này ở chế độ **private** — tài liệu nội bộ MISA. Nhân viên cần được thêm làm collaborator (gửi username GitHub cho người quản lý repo) và đăng nhập `gh auth login` hoặc dùng git credential trước khi clone. **Không chia sẻ nội dung repo ra ngoài MISA.**

Clone repo về máy một lần:

```bash
git clone https://github.com/tuannhh/misa-design-system-skill.git ~/misa-design-system-skill
cd ~/misa-design-system-skill
```

Rồi chạy script cài cho agent bạn dùng:

| Agent | Lệnh cài | Cơ chế |
|---|---|---|
| **Claude Code** | `./install.sh claude` | Skill tại `~/.claude/skills/` (toàn máy) |
| **Codex** | `./install.sh codex` | Skill tại `~/.codex/skills/` (toàn máy) |
| **Cursor** | `./install.sh cursor /đường/dẫn/project` | Rule tại `.cursor/rules/` + docs trong project |
| **VS Code (Copilot)** | `./install.sh vscode /đường/dẫn/project` | Instructions tại `.github/instructions/` |
| **Kiro** | `./install.sh kiro /đường/dẫn/project` | Steering tại `.kiro/steering/` |
| **Antigravity / Zed / khác** | `./install.sh antigravity /đường/dẫn/project` | Tạo/nối vào `AGENTS.md` của project |

Với Cursor/VS Code/Kiro/Antigravity, script đồng thời copy toàn bộ quy chuẩn vào `docs/misa-design-system/` của project để agent đọc chi tiết khi cần — nhớ commit các file này vào git của project để cả team dùng chung.

### Xcode (Coding Intelligence)

Xcode chưa có cơ chế rules file tự động. Cách dùng:
1. Chạy `./install.sh antigravity /đường/dẫn/project` để có `docs/misa-design-system/` trong project.
2. Khi chat với Coding Intelligence, đính kèm hoặc yêu cầu: *"Đọc docs/misa-design-system/misa-design-rules.md và tuân theo khi làm UI"*. Nếu dùng Claude qua Xcode, nội dung project có `AGENTS.md` cũng sẽ được tham chiếu.

### Cài thủ công (không dùng script)

- **Claude Code:** `git clone https://github.com/tuannhh/misa-design-system-skill.git ~/.claude/skills/misa-design-system`
- **Agent đọc AGENTS.md:** copy `AGENTS.md` + thư mục `references/` vào project.

### Cập nhật

```bash
cd ~/misa-design-system-skill && git pull
# rồi chạy lại ./install.sh <agent> [project] để cập nhật bản đã cài
```

## Nguồn quy chuẩn gốc

Tài liệu gốc (Figma MDS Web Components v2.0 và trang quy chuẩn thiết kế) là **tài sản nội bộ của đội Product Design MISA** — không lưu link trong repo này. Spec trong `references/components/` được trích xuất từ bản export chính thức; cần bổ sung spec mới, liên hệ đội Product Design.

## Đóng góp

Khi quy chuẩn thiết kế MISA thay đổi: cập nhật file trong `references/`, đồng bộ quy tắc cốt lõi ở cả `SKILL.md` lẫn `AGENTS.md`, rồi tạo pull request. Có thêm component mới từ Figma? Export PDF và nhờ AI trích xuất thành file mới trong `references/components/`.

---
© MISA JSC — Tài liệu quy chuẩn thiết kế nội bộ.
