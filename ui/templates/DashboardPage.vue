<script setup>
/**
 * DashboardPage — template màn hình Tổng quan (Dashboard) chuẩn MDS 2.0
 * MHeaderBar + MSidebar + main nền xám: hàng KPI 4 card trắng,
 * hàng biểu đồ cột + đường (MChart/ECharts), hàng doughnut + bảng mini.
 * Màu biểu đồ lấy từ CSS variables MDS (không hard-code hex).
 */
import { ref, computed } from 'vue'
import MHeaderBar from '../components/MHeaderBar.vue'
import MSidebar from '../components/MSidebar.vue'
import MChart from '../components/MChart.vue'
import MDataTable from '../components/MDataTable.vue'
import MTag from '../components/MTag.vue'
import MToast from '../components/MToast.vue'
import { useToast } from '../components/toast.js'

const toast = useToast()

/* ── Điều hướng ─────────────────────────────────────────────── */

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

const activeMenu = ref('dashboard')
const sidebarCollapsed = ref(false)

/* ── Màu biểu đồ từ token MDS (ECharts cần chuỗi màu thật nên
      đọc giá trị CSS variable lúc runtime — vẫn KHÔNG hard-code hex) ── */

function cssVar(name) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

const brand600 = cssVar('--mds-brand-600')
const brand300 = cssVar('--mds-brand-300')
const danger = cssVar('--mds-danger')
const info = cssVar('--mds-info')
const warning = cssVar('--mds-warning')
const purple = cssVar('--mds-purple')
const textMuted = cssVar('--mds-text-muted')
const border = cssVar('--mds-border')

// Axis/legend dùng chung cho các biểu đồ trục
const axisLabel = { color: textMuted, fontSize: 12, fontFamily: 'Inter' }
const splitLine = { lineStyle: { color: border, type: 'dashed' } }

/* ── Hàng 1: KPI cards ──────────────────────────────────────── */

const kpis = [
  { label: 'Tổng nhân sự', value: '1.284', delta: '+2,4%', color: 'success' },
  { label: 'Tuyển mới tháng này', value: '36', delta: '+12,5%', color: 'success' },
  { label: 'Nghỉ việc', value: '12', delta: '+8,3%', color: 'danger' },
  { label: 'Tỷ lệ nghỉ', value: '0,9%', delta: '-0,2%', color: 'success' },
]

/* ── Hàng 2: biểu đồ cột + đường ────────────────────────────── */

// Nhân sự theo phòng ban
const barOption = computed(() => ({
  // top 40 chừa chỗ cho legend (16px) + khoảng thở, không che nhãn trục
  grid: { left: 8, right: 8, top: 40, bottom: 0, containLabel: true },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: {
    type: 'category',
    data: ['Kinh doanh', 'Phát triển SP', 'CSKH', 'Marketing', 'Kế toán', 'Nhân sự'],
    axisLabel: { ...axisLabel, interval: 0 },
    axisTick: { show: false },
    axisLine: { lineStyle: { color: border } },
  },
  yAxis: { type: 'value', axisLabel, splitLine },
  series: [
    {
      name: 'Nhân sự',
      type: 'bar',
      data: [412, 296, 188, 152, 132, 104],
      barWidth: 28,
      itemStyle: { color: brand600, borderRadius: [4, 4, 0, 0] },
    },
  ],
}))

// Biến động nhân sự 12 tháng: Tuyển mới / Nghỉ việc
const months = Array.from({ length: 12 }, (_, i) => `Thg ${i + 1}`)

const lineOption = computed(() => ({
  grid: { left: 8, right: 16, top: 40, bottom: 0, containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { top: 0, left: 0, itemWidth: 12, itemHeight: 8, textStyle: axisLabel },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: months,
    axisLabel,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: border } },
  },
  yAxis: { type: 'value', axisLabel, splitLine },
  series: [
    {
      name: 'Tuyển mới',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      data: [18, 22, 31, 26, 24, 28, 33, 29, 35, 30, 27, 36],
      itemStyle: { color: brand600 },
      lineStyle: { color: brand600, width: 2 },
      areaStyle: { color: brand300, opacity: 0.15 },
    },
    {
      name: 'Nghỉ việc',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      data: [8, 6, 10, 7, 9, 12, 8, 11, 9, 13, 10, 12],
      itemStyle: { color: danger },
      lineStyle: { color: danger, width: 2 },
    },
  ],
}))

/* ── Hàng 3: doughnut + bảng mini ───────────────────────────── */

// Cơ cấu theo loại hợp đồng
const pieOption = computed(() => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => `${v} nhân viên` },
  legend: { orient: 'vertical', right: 0, top: 'middle', itemWidth: 12, itemHeight: 8, textStyle: axisLabel },
  color: [brand600, info, warning, purple],
  series: [
    {
      name: 'Loại hợp đồng',
      type: 'pie',
      radius: ['55%', '80%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderWidth: 2, borderColor: cssVar('--mds-bg') },
      label: { show: false },
      data: [
        { value: 812, name: 'Không xác định thời hạn' },
        { value: 296, name: 'Xác định thời hạn' },
        { value: 98, name: 'Thử việc' },
        { value: 78, name: 'Thời vụ / Cộng tác viên' },
      ],
    },
  ],
}))

// Nhân viên mới nhất (bảng mini, không selectable)
const newestColumns = [
  { key: 'code', label: 'Mã nhân viên', width: 110 },
  { key: 'name', label: 'Họ và tên', width: 160 },
  { key: 'department', label: 'Phòng ban', width: 140 },
  { key: 'startDate', label: 'Ngày vào làm', width: 110 },
]

const newestEmployees = [
  { id: 1, code: 'NV-1284', name: 'Lý Thu Trang', department: 'Marketing', startDate: '02/07/2026' },
  { id: 2, code: 'NV-1283', name: 'Phan Đình Khoa', department: 'Kinh doanh', startDate: '29/06/2026' },
  { id: 3, code: 'NV-1282', name: 'Trương Mỹ Linh', department: 'CSKH', startDate: '25/06/2026' },
  { id: 4, code: 'NV-1281', name: 'Đinh Công Sơn', department: 'Phát triển sản phẩm', startDate: '22/06/2026' },
  { id: 5, code: 'NV-1280', name: 'Mai Ngọc Ánh', department: 'Kế toán', startDate: '18/06/2026' },
]
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
      <MSidebar v-model="activeMenu" v-model:collapsed="sidebarCollapsed" :items="sidebarItems" />

      <!-- Main nền xám, cuộn dọc -->
      <main class="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-4 pt-3">
        <h2 class="mb-3 text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Tổng quan</h2>

        <!-- Hàng 1: 4 KPI card trắng -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="kpi in kpis"
            :key="kpi.label"
            class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4"
          >
            <p class="text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ kpi.label }}</p>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-[24px] font-semibold leading-[36px] text-[var(--mds-text)]">
                {{ kpi.value }}
              </span>
              <!-- % so với tháng trước -->
              <MTag :color="kpi.color" size="sm">{{ kpi.delta }}</MTag>
            </div>
          </div>
        </div>

        <!-- Hàng 2: biểu đồ cột + đường -->
        <div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
            <h3 class="mb-3 text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
              Nhân sự theo phòng ban
            </h3>
            <MChart :option="barOption" :height="300" />
          </section>

          <section class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
            <h3 class="mb-3 text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
              Biến động nhân sự 12 tháng
            </h3>
            <MChart :option="lineOption" :height="300" />
          </section>
        </div>

        <!-- Hàng 3: doughnut + bảng mini -->
        <div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
            <h3 class="mb-3 text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
              Cơ cấu theo loại hợp đồng
            </h3>
            <MChart :option="pieOption" :height="300" />
          </section>

          <section class="flex flex-col rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
            <h3 class="mb-3 text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
              Nhân viên mới nhất
            </h3>
            <MDataTable
              :columns="newestColumns"
              :rows="newestEmployees"
              row-key="id"
              class="min-h-0 flex-1"
              @row-click="(row) => toast.info(`Mở chi tiết nhân viên ${row.name}`)"
            >
              <template #footer-info>{{ newestEmployees.length }} nhân viên vào làm gần nhất</template>
            </MDataTable>
          </section>
        </div>
      </main>
    </div>

    <MToast />
  </div>
</template>
