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
└── references/
    ├── general-design-rules.md       # 4 nguyên tắc thiết kế chung
    ├── layout-patterns.md            # Bố cục các loại màn hình AMIS
    ├── components.md                 # Quy tắc chung khi dùng component MDS
    └── components/                   # Spec chi tiết từng component (từ Figma MDS v2.0)
        ├── input.md
        ├── tab.md
        ├── tree.md
        ├── date-time-picker.md
        ├── icon.md
        └── icons-library.md
```

## Cài đặt

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
