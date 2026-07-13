<script setup>
/**
 * ListPageMobile — biến thể Compact của ListPage.
 * Toolbar 2 tầng (tiêu đề+Primary / search+filter); bảng → card vì user xử lý
 * từng bản ghi độc lập trên di động. Card giữ mã NV, tên, phòng ban, trạng thái, lương.
 * Chọn nhiều → action bar sticky đáy có safe-area; bấm card mở Chi tiết (page).
 */
import { ref, computed } from 'vue'
import MButton from '../../components/MButton.vue'
import MInput from '../../components/MInput.vue'
import MTag from '../../components/MTag.vue'
import MIcon from '../../components/MIcon.vue'
import MCheckbox from '../../components/MCheckbox.vue'
import MToast from '../../components/MToast.vue'
import { useToast } from '../../components/toast.js'
import MMobileTopBar from './MMobileTopBar.vue'
import MMobileBottomNav from './MMobileBottomNav.vue'

const toast = useToast()

const navItems = [
  { key: 'dashboard', label: 'Tổng quan', icon: 'home' },
  { key: 'nhan-vien', label: 'Nhân viên', icon: 'users' },
  { key: 'cham-cong', label: 'Chấm công', icon: 'calendar' },
  { key: 'bao-cao', label: 'Báo cáo', icon: 'chart-bar' },
  { key: 'thiet-lap', label: 'Thiết lập', icon: 'settings' },
]
const activeNav = ref('nhan-vien')

const employees = ref([
  { id: 1, code: 'NV-0001', name: 'Nguyễn Văn An', department: 'Kinh doanh', title: 'Trưởng phòng kinh doanh', salary: 25000000, status: 'Đang làm việc' },
  { id: 2, code: 'NV-0002', name: 'Trần Thị Bích', department: 'Kế toán', title: 'Kế toán trưởng', salary: 22000000, status: 'Đang làm việc' },
  { id: 3, code: 'NV-0003', name: 'Lê Hoàng Cường', department: 'Phát triển sản phẩm', title: 'Lập trình viên', salary: 18500000, status: 'Đang làm việc' },
  { id: 4, code: 'NV-0004', name: 'Phạm Thu Dung', department: 'Nhân sự', title: 'Chuyên viên tuyển dụng', salary: 13500000, status: 'Đang làm việc' },
  { id: 5, code: 'NV-0005', name: 'Hoàng Minh Đức', department: 'Kinh doanh', title: 'Nhân viên kinh doanh', salary: 12000000, status: 'Thử việc' },
  { id: 6, code: 'NV-0006', name: 'Vũ Thị Hà', department: 'Marketing', title: 'Chuyên viên nội dung', salary: 14000000, status: 'Đang làm việc' },
  { id: 7, code: 'NV-0007', name: 'Đặng Quốc Huy', department: 'Phát triển sản phẩm', title: 'Kỹ sư kiểm thử', salary: 16500000, status: 'Đang làm việc' },
  { id: 8, code: 'NV-0008', name: 'Bùi Thanh Lam', department: 'Chăm sóc khách hàng', title: 'Nhân viên hỗ trợ', salary: 11000000, status: 'Thử việc' },
])

const search = ref('')
const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return employees.value
  return employees.value.filter((r) => [r.code, r.name, r.department, r.title].some((v) => v.toLowerCase().includes(q)))
})

const formatMoney = (v) => Number(v || 0).toLocaleString('vi-VN')
const statusColor = (s) => (s === 'Đang làm việc' ? 'success' : s === 'Thử việc' ? 'warning' : 'neutral')

// Chọn nhiều: giữ item lâu hoặc bấm ô tick để vào selection mode
const selectionMode = ref(false)
const selected = ref([])

function toggleSelect(id) {
  const i = selected.value.indexOf(id)
  if (i >= 0) selected.value.splice(i, 1)
  else selected.value.push(id)
  selectionMode.value = selected.value.length > 0
}

function clearSelection() {
  selected.value = []
  selectionMode.value = false
}

function openDetail(row) {
  if (selectionMode.value) { toggleSelect(row.id); return }
  toast.info(`Mở chi tiết nhân viên ${row.name}`)
}

function bulkDelete() {
  employees.value = employees.value.filter((r) => !selected.value.includes(r.id))
  toast.success(`Đã xóa ${selected.value.length} nhân viên`)
  clearSelection()
}

function openAdd() {
  toast.info('Mở màn hình thêm nhân viên')
}

function openFilter() {
  toast.info('Mở bộ lọc (bottom sheet)')
}
</script>

<template>
  <div
    class="relative flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <MMobileTopBar mode="home" title="AMIS Nhân sự" :notification-count="3" @app-switcher="toast.info('Mở danh sách ứng dụng')" @notifications="toast.info('Mở danh sách thông báo')" />

    <!-- Toolbar 2 tầng: tiêu đề + Primary / search + filter -->
    <div class="shrink-0 border-b border-[var(--mds-border)] bg-[var(--mds-bg)] px-3 py-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">Nhân viên</h2>
        <MButton variant="primary" @click="openAdd">
          <template #icon><MIcon name="plus" :size="16" /></template>
          Thêm
        </MButton>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <div class="min-w-0 flex-1">
          <MInput v-model="search" placeholder="Tìm mã, tên nhân viên" clearable />
        </div>
        <button
          type="button"
          class="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--mds-border)] text-[var(--mds-icon-neutral)]"
          aria-label="Lọc"
          @click="openFilter"
        >
          <MIcon name="filter" :size="18" />
        </button>
      </div>
    </div>

    <!-- Danh sách card -->
    <main class="min-h-0 flex-1 overflow-y-auto p-3 pb-20">
      <div class="flex flex-col gap-2">
        <div
          v-for="row in filteredRows"
          :key="row.id"
          class="flex items-start gap-3 rounded-lg border bg-[var(--mds-bg)] p-3 active:bg-[var(--mds-bg-hover-soft)]"
          :class="selected.includes(row.id) ? 'border-[var(--mds-brand-600)]' : 'border-[var(--mds-border)]'"
          @click="openDetail(row)"
        >
          <div class="pt-0.5" @click.stop="toggleSelect(row.id)">
            <MCheckbox :model-value="selected.includes(row.id)" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <p class="truncate text-[14px] font-medium leading-[20px] text-[var(--mds-text)]">{{ row.name }}</p>
              <MTag :color="statusColor(row.status)" size="sm">{{ row.status }}</MTag>
            </div>
            <p class="truncate text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ row.code }} · {{ row.department }}</p>
            <p class="truncate text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ row.title }}</p>
            <p class="mt-1 text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">{{ formatMoney(row.salary) }} đ</p>
          </div>
        </div>
      </div>
      <p class="mt-3 text-center text-[12px] text-[var(--mds-text-muted)]">Tổng số bản ghi hiển thị: {{ filteredRows.length }}</p>
    </main>

    <!-- Action bar sticky khi chọn nhiều -->
    <div
      v-if="selectionMode"
      class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-[var(--mds-border)] bg-[var(--mds-bg)] px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      style="padding-bottom: max(8px, env(safe-area-inset-bottom))"
    >
      <button type="button" class="text-[13px] text-[var(--mds-brand-600)]" @click="clearSelection">Bỏ chọn ({{ selected.length }})</button>
      <MButton variant="danger" @click="bulkDelete">Xóa</MButton>
    </div>

    <MMobileBottomNav v-else :items="navItems" :active="activeNav" @select="(k) => (activeNav = k)" />
    <MToast />
  </div>
</template>
