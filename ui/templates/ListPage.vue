<script setup>
/**
 * ListPage — template màn hình Danh sách chuẩn MDS 2.0
 * Bố cục: MHeaderBar (trên) + MSidebar (trái) + main nền xám:
 * toolbar (tiêu đề trái — cụm thao tác phải, Primary ngoài cùng phải + More)
 * và MDataTable có chọn nhiều dòng, bulk actions, row actions, drawer thêm mới.
 */
import { ref, computed, reactive, watch } from 'vue'
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
import MIcon from '../components/MIcon.vue'
import MToast from '../components/MToast.vue'
import { useToast } from '../components/toast.js'

const toast = useToast()

/* ── Điều hướng: sidebar + header ───────────────────────────── */

const sidebarItems = [
  { key: 'dashboard', label: 'Tổng quan', icon: 'home' },
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

// "Tổng quan" là màn hình mẫu khác (DashboardPage) → điều hướng sang đó qua hash
// của playground; các mục còn lại đều có dữ liệu demo ngay trong trang này.
watch(activeMenu, (val) => {
  if (val === 'dashboard') location.hash = 'dashboard'
})

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

/* ── Nhân viên > Hợp đồng (mock) ─────────────────────────────── */

const contractColumns = [
  { key: 'code', label: 'Số hợp đồng', width: 140 },
  { key: 'employee', label: 'Nhân viên', width: 180 },
  { key: 'type', label: 'Loại hợp đồng', width: 200 },
  { key: 'signDate', label: 'Ngày ký', width: 110 },
  { key: 'effectiveDate', label: 'Ngày hiệu lực', width: 120 },
  { key: 'status', label: 'Trạng thái', width: 130 },
]

const contracts = ref([
  { id: 1, code: 'HĐLĐ-2023-0125', employee: 'Nguyễn Văn An', type: 'Không xác định thời hạn', signDate: '01/03/2023', effectiveDate: '01/03/2023', status: 'Đang hiệu lực' },
  { id: 2, code: 'HĐLĐ-2022-0098', employee: 'Trần Thị Bích', type: 'Không xác định thời hạn', signDate: '15/06/2022', effectiveDate: '15/06/2022', status: 'Đang hiệu lực' },
  { id: 3, code: 'HĐLĐ-2021-0064', employee: 'Lê Hoàng Cường', type: 'Xác định thời hạn 36 tháng', signDate: '01/09/2021', effectiveDate: '01/09/2021', status: 'Đang hiệu lực' },
  { id: 4, code: 'HĐTV-2026-0031', employee: 'Phạm Thu Dung', type: 'Thử việc', signDate: '02/06/2026', effectiveDate: '02/06/2026', status: 'Đang hiệu lực' },
  { id: 5, code: 'HĐTV-2026-0030', employee: 'Hoàng Minh Đức', type: 'Thử việc', signDate: '10/06/2026', effectiveDate: '10/06/2026', status: 'Đang hiệu lực' },
  { id: 6, code: 'HĐLĐ-2024-0112', employee: 'Vũ Thị Hà', type: 'Xác định thời hạn 12 tháng', signDate: '01/01/2024', effectiveDate: '01/01/2024', status: 'Đang hiệu lực' },
  { id: 7, code: 'HĐLĐ-2020-0089', employee: 'Ngô Văn Minh', type: 'Xác định thời hạn 36 tháng', signDate: '01/03/2020', effectiveDate: '01/03/2020', status: 'Hết hiệu lực' },
])

function openContractDetail(row) {
  toast.info(`Mở chi tiết hợp đồng ${row.code}`)
}

/* ── Chấm công (mock, hôm nay) ────────────────────────────────── */

const attendanceColumns = [
  { key: 'code', label: 'Mã nhân viên', width: 110 },
  { key: 'name', label: 'Họ và tên', width: 170 },
  { key: 'checkIn', label: 'Giờ vào', width: 100 },
  { key: 'checkOut', label: 'Giờ ra', width: 100 },
  { key: 'hours', label: 'Số giờ công', width: 110, align: 'right' },
  { key: 'status', label: 'Trạng thái', width: 130 },
]

const attendanceToday = ref([
  { id: 1, code: 'NV-0001', name: 'Nguyễn Văn An', checkIn: '08:02', checkOut: '17:35', hours: 8, status: 'Đúng giờ' },
  { id: 2, code: 'NV-0002', name: 'Trần Thị Bích', checkIn: '07:58', checkOut: '17:30', hours: 8, status: 'Đúng giờ' },
  { id: 3, code: 'NV-0003', name: 'Lê Hoàng Cường', checkIn: '08:21', checkOut: '17:40', hours: 7.5, status: 'Đi muộn' },
  { id: 4, code: 'NV-0004', name: 'Phạm Thu Dung', checkIn: '08:00', checkOut: '—', hours: 0, status: 'Đang làm việc' },
  { id: 5, code: 'NV-0005', name: 'Hoàng Minh Đức', checkIn: '—', checkOut: '—', hours: 0, status: 'Nghỉ phép' },
  { id: 6, code: 'NV-0006', name: 'Vũ Thị Hà', checkIn: '08:05', checkOut: '17:32', hours: 8, status: 'Đúng giờ' },
])

const attendanceStatusColor = (s) =>
  s === 'Đúng giờ' ? 'success' : s === 'Đi muộn' ? 'warning' : s === 'Nghỉ phép' ? 'neutral' : 'info'

/* ── Báo cáo (mock) ───────────────────────────────────────────── */

const reports = [
  { key: 'phong-ban', title: 'Báo cáo nhân sự theo phòng ban', description: 'Số lượng, biến động nhân sự theo từng phòng ban trong kỳ', icon: 'chart-bar', updated: 'Cập nhật 13/07/2026' },
  { key: 'bien-dong', title: 'Báo cáo biến động nhân sự', description: 'Tuyển mới, nghỉ việc, chuyển phòng ban theo tháng/quý/năm', icon: 'chart-pie', updated: 'Cập nhật 13/07/2026' },
  { key: 'luong', title: 'Báo cáo quỹ lương', description: 'Tổng hợp lương cơ bản, phụ cấp theo phòng ban và chức danh', icon: 'cash', updated: 'Cập nhật 12/07/2026' },
  { key: 'cham-cong', title: 'Báo cáo chấm công', description: 'Tổng hợp giờ công, đi muộn, nghỉ phép toàn công ty', icon: 'clock', updated: 'Cập nhật 13/07/2026' },
]

function openReport(report) {
  toast.info(`Mở ${report.title.charAt(0).toLowerCase()}${report.title.slice(1)}`)
}

/* ── Thiết lập (mock) ─────────────────────────────────────────── */

const settingSections = [
  { key: 'cong-ty', title: 'Thông tin công ty', description: 'Tên công ty, mã số thuế, địa chỉ, logo hiển thị trên hồ sơ', icon: 'building' },
  { key: 'phan-quyen', title: 'Phân quyền người dùng', description: 'Vai trò, nhóm quyền truy cập từng phân hệ nhân sự', icon: 'users' },
  { key: 'quy-trinh', title: 'Quy trình phê duyệt', description: 'Luồng duyệt hồ sơ, nghỉ phép, tăng lương theo cấp quản lý', icon: 'file-text' },
  { key: 'thong-bao', title: 'Thông báo', description: 'Kênh nhận thông báo: trong ứng dụng, email, di động', icon: 'bell' },
]

function openSetting(section) {
  toast.info(`Mở thiết lập: ${section.title}`)
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
      @app-switcher="toast.info('Mở danh sách ứng dụng')"
    />

    <div class="flex min-h-0 flex-1">
      <!-- Sidebar nền trắng -->
      <MSidebar v-model="activeMenu" v-model:collapsed="sidebarCollapsed" :items="sidebarItems" />

      <!-- Main NỀN XÁM — bảng có khoảng cách với lề, không dính sát mép -->
      <main class="flex min-w-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <!-- Nhân viên > Danh sách -->
        <template v-if="activeMenu === 'ds-nhan-vien'">
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
                  <MIcon name="upload" :size="16" />
                </template>
                Nhập khẩu
              </MButton>
              <!-- Nút Primary: ngoài cùng bên phải -->
              <MButton variant="primary" @click="openDrawer">
                <template #icon>
                  <MIcon name="plus" :size="16" />
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
        </template>

        <!-- Nhân viên > Hợp đồng -->
        <template v-else-if="activeMenu === 'hop-dong'">
          <div class="mb-3 flex shrink-0 items-center justify-between gap-3">
            <h2 class="text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Hợp đồng</h2>
            <MButton variant="primary">
              <template #icon><MIcon name="plus" :size="16" /></template>
              Thêm hợp đồng
            </MButton>
          </div>
          <MDataTable :columns="contractColumns" :rows="contracts" row-key="id" class="min-h-0 flex-1" @row-click="openContractDetail">
            <template #cell-status="{ row }">
              <MTag :color="row.status === 'Đang hiệu lực' ? 'success' : 'neutral'" size="sm">{{ row.status }}</MTag>
            </template>
            <template #footer-info>Tổng số hợp đồng: {{ contracts.length }}</template>
          </MDataTable>
        </template>

        <!-- Chấm công -->
        <template v-else-if="activeMenu === 'cham-cong'">
          <div class="mb-3 flex shrink-0 items-center justify-between gap-3">
            <h2 class="text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Chấm công hôm nay</h2>
            <MButton variant="secondary">
              <template #icon><MIcon name="file-export" :size="16" /></template>
              Xuất bảng công
            </MButton>
          </div>
          <MDataTable :columns="attendanceColumns" :rows="attendanceToday" row-key="id" class="min-h-0 flex-1">
            <template #cell-status="{ row }">
              <MTag :color="attendanceStatusColor(row.status)" size="sm">{{ row.status }}</MTag>
            </template>
            <template #footer-info>Tổng số nhân viên: {{ attendanceToday.length }}</template>
          </MDataTable>
        </template>

        <!-- Báo cáo -->
        <template v-else-if="activeMenu === 'bao-cao'">
          <h2 class="mb-3 shrink-0 text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Báo cáo</h2>
          <div class="min-h-0 flex-1 overflow-y-auto">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                v-for="report in reports"
                :key="report.key"
                type="button"
                class="flex items-start gap-3 rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4 text-left hover:border-[var(--mds-brand-600)]"
                @click="openReport(report)"
              >
                <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--mds-brand-50)] text-[var(--mds-brand-600)]">
                  <MIcon :name="report.icon" :size="20" />
                </span>
                <span class="min-w-0">
                  <span class="block text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">{{ report.title }}</span>
                  <span class="mt-0.5 block text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ report.description }}</span>
                  <span class="mt-2 block text-[11px] leading-[14px] text-[var(--mds-text-placeholder)]">{{ report.updated }}</span>
                </span>
              </button>
            </div>
          </div>
        </template>

        <!-- Thiết lập -->
        <template v-else-if="activeMenu === 'thiet-lap'">
          <h2 class="mb-3 shrink-0 text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Thiết lập</h2>
          <div class="min-h-0 flex-1 overflow-y-auto rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)]">
            <button
              v-for="(section, i) in settingSections"
              :key="section.key"
              type="button"
              class="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[var(--mds-bg-hover-soft)]"
              :class="i > 0 ? 'border-t border-[var(--mds-border)]' : ''"
              @click="openSetting(section)"
            >
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--mds-bg-disabled)] text-[var(--mds-icon-neutral)]">
                <MIcon :name="section.icon" :size="20" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-[14px] font-medium leading-[20px] text-[var(--mds-text)]">{{ section.title }}</span>
                <span class="mt-0.5 block text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ section.description }}</span>
              </span>
              <MIcon name="chevron-right" :size="18" class="shrink-0 text-[var(--mds-icon-neutral)]" />
            </button>
          </div>
        </template>
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
