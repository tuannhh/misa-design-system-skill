<script setup>
/**
 * ListPage — template màn hình Danh sách chuẩn MDS 2.0
 * Bố cục: MHeaderBar (trên) + MSidebar (trái) + main nền xám:
 * toolbar (tiêu đề trái — cụm thao tác phải, Primary ngoài cùng phải + More)
 * và MDataTable có chọn nhiều dòng, bulk actions, row actions, drawer thêm mới.
 */
import { ref, computed, reactive } from 'vue'
import MHeaderBar from '../components/MHeaderBar.vue'
import MSidebar from '../components/MSidebar.vue'
import MButton from '../components/MButton.vue'
import MInput from '../components/MInput.vue'
import MSelect from '../components/MSelect.vue'
import MDatePicker from '../components/MDatePicker.vue'
import MDateRangePicker from '../components/MDateRangePicker.vue'
import MTextarea from '../components/MTextarea.vue'
import MDataTable from '../components/MDataTable.vue'
import MDrawer from '../components/MDrawer.vue'
import MDropdownMenu from '../components/MDropdownMenu.vue'
import MTag from '../components/MTag.vue'
import MToast from '../components/MToast.vue'
import { useToast } from '../components/toast.js'

const toast = useToast()

/* ── Điều hướng: sidebar + header ───────────────────────────── */

const sidebarItems = [
  { key: 'dashboard', label: 'Tổng quan', icon: 'dashboard' },
  {
    key: 'nhan-vien',
    label: 'Nhân viên',
    icon: 'users',
    children: [
      { key: 'ds-nhan-vien', label: 'Danh sách' },
      { key: 'hop-dong', label: 'Hợp đồng' },
    ],
  },
  { key: 'cham-cong', label: 'Chấm công', icon: 'calendar' },
  { key: 'bao-cao', label: 'Báo cáo', icon: 'chart-bar' },
  { key: 'thiet-lap', label: 'Thiết lập', icon: 'settings' },
]

const activeMenu = ref('ds-nhan-vien')
const sidebarCollapsed = ref(false)

/* ── Bộ lọc toolbar ─────────────────────────────────────────── */

const search = ref('')
const dateRange = ref({ start: null, end: null })

/* ── Dữ liệu bảng (mock) ────────────────────────────────────── */

const columns = [
  { key: 'code', label: 'Mã nhân viên', width: 120, sortable: true },
  { key: 'name', label: 'Họ và tên', width: 180, sortable: true },
  { key: 'department', label: 'Phòng ban', width: 160 },
  { key: 'title', label: 'Chức danh', width: 180 },
  // Số tiền căn PHẢI theo chuẩn MISA
  { key: 'salary', label: 'Lương cơ bản', width: 130, align: 'right', sortable: true },
  { key: 'status', label: 'Trạng thái', width: 140 },
]

const employees = ref([
  { id: 1, code: 'NV-0001', name: 'Nguyễn Văn An', department: 'Kinh doanh', title: 'Trưởng phòng kinh doanh', salary: 25000000, status: 'Đang làm việc' },
  { id: 2, code: 'NV-0002', name: 'Trần Thị Bích', department: 'Kế toán', title: 'Kế toán trưởng', salary: 22000000, status: 'Đang làm việc' },
  { id: 3, code: 'NV-0003', name: 'Lê Hoàng Cường', department: 'Phát triển sản phẩm', title: 'Lập trình viên', salary: 18500000, status: 'Đang làm việc' },
  { id: 4, code: 'NV-0004', name: 'Phạm Thu Dung', department: 'Nhân sự', title: 'Chuyên viên tuyển dụng', salary: 13500000, status: 'Đang làm việc' },
  { id: 5, code: 'NV-0005', name: 'Hoàng Minh Đức', department: 'Kinh doanh', title: 'Nhân viên kinh doanh', salary: 12000000, status: 'Thử việc' },
  { id: 6, code: 'NV-0006', name: 'Vũ Thị Hà', department: 'Marketing', title: 'Chuyên viên nội dung', salary: 14000000, status: 'Đang làm việc' },
  { id: 7, code: 'NV-0007', name: 'Đặng Quốc Huy', department: 'Phát triển sản phẩm', title: 'Kỹ sư kiểm thử', salary: 16500000, status: 'Đang làm việc' },
  { id: 8, code: 'NV-0008', name: 'Bùi Thanh Lam', department: 'Chăm sóc khách hàng', title: 'Nhân viên hỗ trợ', salary: 11000000, status: 'Thử việc' },
  { id: 9, code: 'NV-0009', name: 'Ngô Văn Minh', department: 'Kế toán', title: 'Kế toán viên', salary: 13500000, status: 'Đã nghỉ việc' },
  { id: 10, code: 'NV-0010', name: 'Đỗ Thị Ngọc', department: 'Marketing', title: 'Thiết kế đồ họa', salary: 15000000, status: 'Đang làm việc' },
])

// Lọc client-side theo ô tìm kiếm (thực tế gọi API server-side)
const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return employees.value
  return employees.value.filter((r) =>
    [r.code, r.name, r.department, r.title].some((v) => v.toLowerCase().includes(q))
  )
})

const selected = ref([])
const page = ref(1)
const pageSize = ref(20)

// Số tiền định dạng VN: 13.500.000
const formatMoney = (v) => Number(v || 0).toLocaleString('vi-VN')

// Màu MTag theo trạng thái nhân viên
const statusColor = (s) =>
  s === 'Đang làm việc' ? 'success' : s === 'Thử việc' ? 'warning' : 'neutral'

/* ── Thao tác toolbar ───────────────────────────────────────── */

const moreItems = [
  { key: 'export', label: 'Xuất khẩu', icon: 'file-export' },
  { key: 'print', label: 'In danh sách', icon: 'printer' },
  { divider: true },
  { key: 'columns', label: 'Tùy chỉnh cột', icon: 'settings' },
]

function onMore(item) {
  const key = item && item.key ? item.key : item
  if (key === 'export') toast.success('Đang xuất khẩu danh sách nhân viên')
  else if (key === 'print') toast.info('Đang chuẩn bị bản in')
  else toast.info('Mở tùy chỉnh cột')
}

function onImport() {
  toast.info('Mở màn hình nhập khẩu nhân viên từ Excel')
}

/* ── Bulk actions ───────────────────────────────────────────── */

function bulkExport() {
  toast.success(`Đã xuất khẩu ${selected.value.length} nhân viên`)
}

function bulkDelete() {
  employees.value = employees.value.filter((r) => !selected.value.includes(r.id))
  toast.success(`Đã xóa ${selected.value.length} nhân viên`)
  selected.value = []
}

/* ── Row actions ────────────────────────────────────────────── */

const rowMenuItems = [
  { key: 'edit', label: 'Sửa', icon: 'pencil' },
  { key: 'duplicate', label: 'Nhân bản', icon: 'copy' },
  { divider: true },
  { key: 'delete', label: 'Xóa', icon: 'trash', danger: true },
]

function onRowAction(item, row) {
  const key = item && item.key ? item.key : item
  if (key === 'edit') {
    toast.info(`Mở màn hình sửa nhân viên ${row.name}`)
  } else if (key === 'duplicate') {
    const nextId = Math.max(...employees.value.map((r) => r.id)) + 1
    employees.value = [
      ...employees.value,
      { ...row, id: nextId, code: `NV-${String(nextId).padStart(4, '0')}` },
    ]
    toast.success(`Đã nhân bản nhân viên ${row.name}`)
  } else if (key === 'delete') {
    employees.value = employees.value.filter((r) => r.id !== row.id)
    toast.success(`Đã xóa nhân viên ${row.name}`)
  }
}

// Bấm vào dòng để chuyển sang trang chi tiết (spec màn Danh sách)
function openDetail(row) {
  toast.info(`Mở chi tiết nhân viên ${row.name}`)
}

/* ── Drawer Thêm nhân viên ──────────────────────────────────── */

const departmentOptions = [
  { label: 'Kinh doanh', value: 'kinh-doanh' },
  { label: 'Kế toán', value: 'ke-toan' },
  { label: 'Nhân sự', value: 'nhan-su' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Phát triển sản phẩm', value: 'phat-trien-san-pham' },
  { label: 'Chăm sóc khách hàng', value: 'cskh' },
]

const drawerOpen = ref(false)
const saving = ref(false)

const form = reactive({ name: '', department: null, startDate: null, note: '' })
const formErrors = reactive({ name: '' })

function resetForm() {
  form.name = ''
  form.department = null
  form.startDate = null
  form.note = ''
  formErrors.name = ''
}

function openDrawer() {
  resetForm()
  drawerOpen.value = true
}

function saveEmployee() {
  // Validate bắt buộc: message đỏ 12px hiển thị dưới control (qua prop error)
  formErrors.name = form.name.trim() ? '' : 'Họ tên không được để trống'
  if (formErrors.name) return

  saving.value = true
  const nextId = Math.max(...employees.value.map((r) => r.id), 0) + 1
  const dep = departmentOptions.find((o) => o.value === form.department)
  employees.value = [
    {
      id: nextId,
      code: `NV-${String(nextId).padStart(4, '0')}`,
      name: form.name.trim(),
      department: dep ? dep.label : '',
      title: '',
      salary: 0,
      status: 'Thử việc',
    },
    ...employees.value,
  ]
  saving.value = false
  drawerOpen.value = false
  toast.success(`Đã thêm nhân viên ${form.name.trim()}`)
}
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <!-- Header nền brand-600 chữ trắng -->
    <MHeaderBar
      app-name="AMIS Nhân sự"
      search-placeholder="Tìm kiếm trong AMIS Nhân sự"
      :notification-count="3"
      :user="{ name: 'Nguyễn Văn An' }"
      @search="toast.info('Mở tìm kiếm toàn hệ thống')"
      @notifications="toast.info('Mở danh sách thông báo')"
      @settings="toast.info('Mở thiết lập ứng dụng')"
      @user-click="toast.info('Mở menu tài khoản')"
    />

    <div class="flex min-h-0 flex-1">
      <!-- Sidebar nền trắng -->
      <MSidebar v-model="activeMenu" v-model:collapsed="sidebarCollapsed" :items="sidebarItems" />

      <!-- Main NỀN XÁM — bảng có khoảng cách với lề, không dính sát mép -->
      <main class="flex min-w-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <!-- Toolbar: TRÁI tiêu đề — PHẢI thao tác, Primary ngoài cùng phải + More bên phải Primary -->
        <div class="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
          <h2 class="text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Nhân viên</h2>

          <div class="flex flex-wrap items-center gap-2">
            <div class="w-[240px]">
              <MInput v-model="search" placeholder="Tìm kiếm mã, tên nhân viên" clearable />
            </div>
            <div class="w-[236px]">
              <MDateRangePicker v-model="dateRange" />
            </div>
            <!-- Nút phụ: bên trái nút chính -->
            <MButton variant="secondary" @click="onImport">
              <template #icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                  <path d="M7 9l5 -5l5 5" />
                  <path d="M12 4l0 12" />
                </svg>
              </template>
              Nhập khẩu
            </MButton>
            <!-- Nút Primary: ngoài cùng bên phải -->
            <MButton variant="primary" @click="openDrawer">
              <template #icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </template>
              Thêm nhân viên
            </MButton>
            <!-- Nút More: ngay bên phải nút Primary -->
            <MDropdownMenu :items="moreItems" @select="onMore" />
          </div>
        </div>

        <!-- Bảng danh sách: chọn nhiều dòng + bulk actions + row actions -->
        <MDataTable
          v-model:selected="selected"
          v-model:page="page"
          v-model:page-size="pageSize"
          :columns="columns"
          :rows="filteredRows"
          row-key="id"
          selectable
          :has-next="false"
          class="min-h-0 flex-1"
          @row-click="openDetail"
        >
          <!-- Lương: định dạng số VN 13.500.000, căn phải theo cột -->
          <template #cell-salary="{ value }">
            {{ formatMoney(value) }}
          </template>

          <!-- Trạng thái: MTag màu theo trạng thái -->
          <template #cell-status="{ row }">
            <MTag :color="statusColor(row.status)" size="sm">{{ row.status }}</MTag>
          </template>

          <!-- Bulk actions khi chọn ≥1 dòng -->
          <template #bulk-actions>
            <MButton variant="secondary" @click="bulkExport">Xuất khẩu</MButton>
            <MButton variant="danger" @click="bulkDelete">Xóa</MButton>
          </template>

          <!-- Row actions: hiện khi hover dòng -->
          <template #row-actions="{ row }">
            <MDropdownMenu :items="rowMenuItems" @select="onRowAction($event, row)" />
          </template>

          <template #footer-info>
            Tổng số bản ghi hiển thị: {{ filteredRows.length }}
          </template>
        </MDataTable>
      </main>
    </div>

    <!-- Drawer Thêm nhân viên -->
    <MDrawer v-model="drawerOpen" title="Thêm nhân viên" :width="480">
      <div class="flex flex-col gap-4">
        <div>
          <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
            Họ tên <span class="text-[var(--mds-danger)]">*</span>
          </label>
          <MInput v-model="form.name" placeholder="Nhập họ tên nhân viên" :error="formErrors.name" />
        </div>

        <div>
          <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
            Phòng ban
          </label>
          <MSelect v-model="form.department" :options="departmentOptions" placeholder="Chọn phòng ban" />
        </div>

        <div>
          <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
            Ngày vào làm
          </label>
          <MDatePicker v-model="form.startDate" />
        </div>

        <div>
          <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
            Ghi chú
          </label>
          <MTextarea v-model="form.note" :rows="3" :maxlength="500" placeholder="Nhập ghi chú" />
        </div>
      </div>

      <!-- Footer: Primary ngoài cùng bên phải theo MDS -->
      <template #footer>
        <MButton variant="secondary" @click="drawerOpen = false">Hủy</MButton>
        <MButton variant="primary" :loading="saving" @click="saveEmployee">Lưu</MButton>
      </template>
    </MDrawer>

    <MToast />
  </div>
</template>
