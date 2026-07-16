<script setup>
/**
 * DashboardPage — template màn hình Tổng quan (Dashboard) chuẩn MDS 2.0.
 * Dựng lại theo bộ demo chuẩn của giám đốc thiết kế (đối chiếu 2026-07):
 * header 48px + sub-nav 48px, sidebar 200/64px hover-overlay, card dùng
 * .mds-card (shadow-card thay border), dialog Thiết lập màu sắc/hiển thị,
 * bảng mini trong card, biểu đồ ECharts theo spec communication.md.
 * Nội dung nghiệp vụ (kế toán) viết mới, không sao chép số liệu/văn bản
 * của bên thứ ba — chỉ tái hiện cấu trúc để đối chiếu hệ thống thiết kế.
 */
import { computed, ref } from 'vue'
import MHeaderBar from '../components/MHeaderBar.vue'
import MSidebar from '../components/MSidebar.vue'
import MSettingsDialog from '../components/MSettingsDialog.vue'
import MChart from '../components/MChart.vue'
import MIcon from '../components/MIcon.vue'
import MTabs from '../components/MTabs.vue'
import MToast from '../components/MToast.vue'
import { useToast } from '../components/toast.js'
import { currentTheme, currentHeaderMode, sidebarCollapsed } from '../components/theme-state.js'

const toast = useToast()

/* ── Điều hướng ─────────────────────────────────────────────── */

const sidebarItems = [
  { key: 'tong-quan', label: 'Tổng quan', icon: 'home' },
  { key: 'tien-mat', label: 'Tiền mặt', icon: 'cash' },
  { key: 'tien-gui', label: 'Tiền gửi', icon: 'wallet' },
  { key: 'mua-hang', label: 'Mua hàng', icon: 'briefcase' },
  { key: 'ban-hang', label: 'Bán hàng', icon: 'receipt' },
  { key: 'kho', label: 'Kho', icon: 'building' },
  { key: 'tien-luong', label: 'Tiền lương', icon: 'users' },
  { key: 'thue', label: 'Thuế', icon: 'file-text' },
  { key: 'bao-cao', label: 'Báo cáo', icon: 'chart-bar' },
  { key: 'ke-toan-dv', label: 'Kế toán dịch vụ', icon: 'database' },
  { key: 'danh-muc', label: 'Danh mục', icon: 'list' },
]
const activeMenu = ref('tong-quan')

const subTabs = [
  { key: 'tong-quan', label: 'Tổng quan' },
  { key: 'tinh-nang-moi', label: 'Tính năng mới' },
]
const activeSubTab = ref('tong-quan')

/* ── Dialog Thiết lập ───────────────────────────────────────── */
const showSettings = ref(false)

/* ── Màu biểu đồ — computed để tự đổi theo theme (Settings dialog) ── */
function cssVar(name) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
// void currentTheme.value: ép Vue theo dõi phụ thuộc dù cssVar đọc DOM, không reactive tự nhiên
function themedVar(name) {
  return computed(() => { void currentTheme.value; return cssVar(name) })
}
const brand600 = themedVar('--mds-brand-600')
const success = themedVar('--mds-success')
const warning = themedVar('--mds-warning')
const info = themedVar('--mds-info')
const danger = themedVar('--mds-danger')
const textMuted = themedVar('--mds-text-muted')
const border = themedVar('--mds-border')

const axisLabel = computed(() => ({ color: textMuted.value, fontSize: 11, fontFamily: 'Inter' }))
const splitLine = computed(() => ({ lineStyle: { color: cssVar('--mds-bg-disabled') } }))
// Legend chuẩn dashboard: dưới chart, chữ nhỏ uppercase, chấm màu — theo communication.md
const legendBelow = computed(() => ({
  bottom: 0, left: 'center', icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16,
  textStyle: { color: textMuted.value, fontSize: 11, fontFamily: 'Inter' },
}))

/* ── Chi nhánh (bộ lọc trên cùng) ───────────────────────────── */
const branchName = ref('Công ty TNHH Dịch vụ Thương mại Toàn Cầu')

/* ── Row 1: Tình hình tài chính + 2 card nợ ─────────────────── */
const periodTch = ref('Tháng này')
const tchLeft = [
  { label: 'Tiền mặt', value: '312' },
  { label: 'Tiền gửi', value: '208.451' },
  { label: 'Phải thu', value: '31.204' },
  { label: 'Phải trả', value: '402.118' },
]
const tchRight = [
  { label: 'Doanh thu', value: '33.480' },
  { label: 'Chi phí', value: '18.240' },
  { label: 'Lợi nhuận', value: '15.240' },
  { label: 'Hàng tồn kho', value: '311.006' },
]
const tongTien = '208.971'

const periodRphaithu = ref('Tháng này')
const rPhaiThu = { total: '38.204', overdue: '412', current: '37.792' }
const rPhaiThuPct = 1.1 // % quá hạn/tổng, chỉ để vẽ thanh tiến trình minh họa

const rPhaiTra = { total: '0', overdue: '0', current: '0' }

/* ── Row 2: Doanh thu-chi phí-lợi nhuận + Hàng tồn kho ──────── */
const periodBar = ref('Năm nay')
const MONTHS = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']

const revenueData = [30120, 28640, 34210, 36880, 33480, 12040, 27960, 39420, 35180, 43260, 61240, 56980]
const costData_ = [17000, 15800, 19200, 20600, 18240, 6800, 15400, 21600, 19600, 23800, 32800, 30200]
const profitData = revenueData.map((v, i) => v - costData_[i])

const barLineOption = computed(() => ({
  legend: legendBelow.value,
  grid: { left: 8, right: 8, top: 16, bottom: 32, containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: MONTHS, axisLabel: axisLabel.value, axisTick: { show: false }, axisLine: { lineStyle: { color: border.value } } },
  yAxis: { type: 'value', axisLabel: { ...axisLabel.value, formatter: (v) => (v / 1000).toFixed(0) + 'tr' }, splitLine: splitLine.value },
  series: [
    { name: 'DOANH THU', type: 'bar', data: revenueData, barMaxWidth: 14, itemStyle: { color: brand600.value, borderRadius: [4, 4, 0, 0] } },
    { name: 'CHI PHÍ', type: 'bar', data: costData_, barMaxWidth: 14, itemStyle: { color: '#98A2B3', borderRadius: [4, 4, 0, 0] } },
    { name: 'LỢI NHUẬN', type: 'line', data: profitData, smooth: true, symbolSize: 6, lineStyle: { color: warning.value, width: 2 }, itemStyle: { color: warning.value } },
  ],
}))

const inventoryTotal = '311.006'
const inventoryRows = [
  { name: 'Giấy in văn phòng A4', qty: '182.400', value: '2.104', color: '#F59E0B' },
  { name: 'Mực in laser HP', qty: '96.220', value: '1.822', color: '#3B82F6' },
  { name: 'Bàn ghế văn phòng', qty: '54.100', value: '3.960', color: '#8B5CF6' },
  { name: 'Thiết bị mạng', qty: '31.760', value: '2.408', color: '#6B7280' },
  { name: 'Vật tư tiêu hao', qty: '128.900', value: '1.140', color: '#EF4444' },
]

/* ── Row 3: Doanh thu + Mặt hàng bán chạy ────────────────────── */
const periodRev = ref('Năm nay')
const revenueTotal = '399.568'
const revenueOnly = computed(() => ({
  grid: { left: 8, right: 8, top: 16, bottom: 8, containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { show: false },
  xAxis: { type: 'category', boundaryGap: false, data: MONTHS, axisLabel: axisLabel.value, axisTick: { show: false }, axisLine: { lineStyle: { color: border.value } } },
  yAxis: { type: 'value', axisLabel: { ...axisLabel.value, formatter: (v) => (v / 1000).toFixed(0) + 'tr' }, splitLine: splitLine.value },
  series: [{
    type: 'line', data: revenueData, smooth: true, symbolSize: 6,
    lineStyle: { color: brand600.value, width: 2 }, itemStyle: { color: brand600.value },
    areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: brand600.value + '33' }, { offset: 1, color: brand600.value + '00' }] } },
  }],
}))

const periodSell = ref('Năm nay')
const sellingTotal = '399.568'
const sellingRows = [
  { name: 'Bàn ghế văn phòng', qty: '18.400', revenue: '3.960', color: '#3B82F6' },
  { name: 'Thiết bị mạng', qty: '12.900', revenue: '2.408', color: '#8B5CF6' },
  { name: 'Giấy in văn phòng A4', qty: '61.200', revenue: '2.104', color: '#F59E0B' },
  { name: 'Vật tư tiêu hao', qty: '44.100', revenue: '1.140', color: '#6B7280' },
  { name: 'Mực in laser HP', qty: '9.600', revenue: '1.822', color: '#F97316' },
]

/* ── Row 4: Dòng tiền + Chi phí ───────────────────────────────── */
const periodCash = ref('Năm nay')
const tonData = [140000, 152000, 168000, 183000, 208971, 205000, 224000, 241000, 258000, 279000, 305000, 328000]
const chiData = [22000, 26000, 32000, 40000, 46000, 44000, 51000, 58000, 66000, 74000, 84000, 90000]
const thuData = tonData.map((v, i) => Math.round(v * 1.12) - (i > 0 ? tonData[i - 1] : 100000))

const cashOption = computed(() => ({
  legend: legendBelow.value,
  grid: { left: 8, right: 8, top: 16, bottom: 32, containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: MONTHS, axisLabel: axisLabel.value, axisTick: { show: false }, axisLine: { lineStyle: { color: border.value } } },
  yAxis: { type: 'value', axisLabel: { ...axisLabel.value, formatter: (v) => (v / 1000).toFixed(0) + 'tr' }, splitLine: splitLine.value },
  series: [
    { name: 'THU', type: 'line', data: thuData, smooth: true, symbolSize: 6, lineStyle: { color: success.value, width: 2 }, itemStyle: { color: success.value } },
    { name: 'CHI', type: 'line', data: chiData, smooth: true, symbolSize: 6, lineStyle: { color: warning.value, width: 2 }, itemStyle: { color: warning.value } },
    { name: 'TỒN', type: 'line', data: tonData, smooth: true, symbolSize: 6, lineStyle: { color: info.value, width: 2 }, itemStyle: { color: info.value } },
  ],
}))

const periodCost = ref('Năm nay')
const costItems = [
  { name: 'Chi phí quảng cáo', color: '#F43F5E', value: 42 },
  { name: 'Chi phí sửa chữa, bảo dưỡng', color: '#3B82F6', value: 24 },
  { name: 'Chi phí tiếp khách', color: '#A78BFA', value: 18 },
  { name: 'Chi phí khác', color: '#1E293B', value: 16 },
]
const costTotal = '1.240'
const costOption = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: { show: false },
  series: [{
    type: 'pie', radius: ['55%', '80%'], center: ['50%', '50%'], padAngle: 2,
    itemStyle: { borderRadius: 4 }, label: { show: false },
    data: costItems.map((d) => ({ name: d.name, value: d.value, itemStyle: { color: d.color } })),
  }],
}))
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-page)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <!-- Header: mode do người dùng chọn trong dialog Thiết lập -->
    <MHeaderBar
      :variant="currentHeaderMode"
      app-name="Kế toán"
      company-name="Công ty TNHH Dịch vụ Thương mại Toàn Cầu"
      search-placeholder="Tìm kiếm"
      :notification-count="9"
      :user="{ name: 'Việt Thắng' }"
      @search="toast.info('Mở tìm kiếm toàn hệ thống')"
      @notifications="toast.info('Mở danh sách thông báo')"
      @settings="showSettings = true"
      @assistant="toast.info('Mở trợ lý AVA Kế toán')"
      @chat="toast.info('Mở AMIS Chat')"
      @user-click="toast.info('Mở menu tài khoản')"
      @app-switcher="toast.info('Mở danh sách ứng dụng')"
    />

    <!-- Sub-nav 48px -->
    <div class="flex h-12 shrink-0 items-center justify-between border-b border-[var(--mds-border-light,var(--mds-border))] bg-[var(--mds-bg)] px-4">
      <MTabs v-model="activeSubTab" :tabs="subTabs" class="[&_[role=tablist]]:border-b-0" />
      <button type="button" class="flex items-center gap-1.5 text-[13px] font-medium text-[var(--mds-success)] hover:underline">
        <MIcon name="check" :size="12" />
        Bắt đầu sử dụng
      </button>
    </div>

    <div class="flex min-h-0 flex-1">
      <MSidebar v-model="activeMenu" v-model:collapsed="sidebarCollapsed" :items="sidebarItems" />

      <!-- Main nền xám, cuộn dọc -->
      <main class="min-h-0 min-w-0 flex-1 overflow-y-auto p-4">
        <!-- Chi nhánh filter -->
        <div class="mb-3 flex items-center gap-2 text-[13px] text-[var(--mds-text-secondary,var(--mds-text-muted))]">
          <span class="shrink-0">Chi nhánh</span>
          <button type="button" class="flex items-center gap-1 text-[13px] font-medium text-[var(--mds-text)] hover:text-[var(--mds-brand-600)]">
            {{ branchName }}
            <MIcon name="chevron-down" :size="12" />
          </button>
        </div>

        <!-- ── Row 1: Tình hình tài chính + 2 card nợ ── -->
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr_1fr]">
          <!-- Tình hình tài chính -->
          <section class="group mds-card p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Tình hình tài chính</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodTch" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Tháng này</option>
                  <option>Quý này</option>
                  <option>Năm nay</option>
                </select>
              </div>
            </div>
            <p class="mb-2 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <div class="flex gap-0">
              <div class="flex-1">
                <div class="flex items-center justify-between border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5">
                  <span class="text-[12px] font-semibold uppercase text-[var(--mds-text-secondary,var(--mds-text-muted))]">Tổng tiền</span>
                  <span class="text-[13px] font-semibold">{{ tongTien }}</span>
                </div>
                <div v-for="r in tchLeft" :key="r.label" class="flex items-center justify-between border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 pl-2 last:border-b-0">
                  <span class="text-[13px] text-[var(--mds-text-secondary,var(--mds-text-muted))]">{{ r.label }}</span>
                  <span class="text-[13px] font-semibold text-[var(--mds-brand-600)]">{{ r.value }}</span>
                </div>
              </div>
              <div class="mx-4 w-px shrink-0 bg-[var(--mds-border-light,var(--mds-border))]" />
              <div class="flex-1">
                <div v-for="r in tchRight" :key="r.label" class="flex items-center justify-between border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 last:border-b-0">
                  <span class="text-[13px] text-[var(--mds-text-secondary,var(--mds-text-muted))]">{{ r.label }}</span>
                  <span class="text-[13px] font-semibold text-[var(--mds-brand-600)]">{{ r.value }}</span>
                </div>
              </div>
            </div>
            <div class="mt-2 border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 15h47
              <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>

          <!-- Nợ phải thu -->
          <section class="group mds-card flex flex-col p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Nợ phải thu theo hạn nợ</h3>
              <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
              </button>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="text-[28px] font-bold leading-none">{{ rPhaiThu.total }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-2.5 mt-1.5 text-[11px] uppercase text-[var(--mds-text-muted)]">Tổng</p>
            <div class="mb-2.5 flex justify-between">
              <div>
                <div class="text-[14px] font-semibold text-[var(--mds-warning)]">{{ rPhaiThu.overdue }} <span class="text-[11px] font-normal text-[var(--mds-text-muted)]">Triệu đồng</span></div>
                <div class="mt-0.5 text-[11px] uppercase text-[var(--mds-warning)]">Quá hạn</div>
              </div>
              <div class="text-right">
                <div class="text-[14px] font-semibold">{{ rPhaiThu.current }} <span class="text-[11px] font-normal text-[var(--mds-text-muted)]">Triệu đồng</span></div>
                <div class="mt-0.5 text-[11px] uppercase text-[var(--mds-text-muted)]">Trong hạn</div>
              </div>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-[var(--mds-border-light,var(--mds-border))]">
              <div class="h-full rounded-full bg-[var(--mds-warning)]" :style="{ width: rPhaiThuPct + '%' }" />
            </div>
            <div class="mt-auto border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 14h58 <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>

          <!-- Nợ phải trả -->
          <section class="group mds-card flex flex-col p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Nợ phải trả theo hạn nợ</h3>
              <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
              </button>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="text-[28px] font-bold leading-none">{{ rPhaiTra.total }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-2.5 mt-1.5 text-[11px] uppercase text-[var(--mds-text-muted)]">Tổng</p>
            <div class="mb-2.5 flex justify-between">
              <div>
                <div class="text-[14px] font-semibold text-[var(--mds-warning)]">{{ rPhaiTra.overdue }} <span class="text-[11px] font-normal text-[var(--mds-text-muted)]">Triệu đồng</span></div>
                <div class="mt-0.5 text-[11px] uppercase text-[var(--mds-warning)]">Quá hạn</div>
              </div>
              <div class="text-right">
                <div class="text-[14px] font-semibold">{{ rPhaiTra.current }} <span class="text-[11px] font-normal text-[var(--mds-text-muted)]">Triệu đồng</span></div>
                <div class="mt-0.5 text-[11px] uppercase text-[var(--mds-text-muted)]">Trong hạn</div>
              </div>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-[var(--mds-border-light,var(--mds-border))]">
              <div class="h-full w-full rounded-full bg-[var(--mds-warning)] opacity-40" />
            </div>
            <div class="mt-auto border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 14h58 <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>
        </div>

        <!-- ── Row 2: Doanh thu-chi phí-lợi nhuận + Hàng tồn kho ── -->
        <div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
          <section class="group mds-card p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Doanh thu, chi phí, lợi nhuận</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodBar" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                </select>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <MChart :option="barLineOption" :height="280" />
          </section>

          <section class="group mds-card flex flex-col p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Hàng hóa tồn kho</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="settings" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <div class="flex items-baseline gap-1.5">
              <span class="text-[22px] font-bold leading-none">{{ inventoryTotal }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-2 mt-1 text-[12px] text-[var(--mds-text-muted)]">Tổng giá trị</p>
            <table class="w-full border-collapse text-[12px]">
              <thead>
                <tr>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-left font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Tên</th>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Số lượng</th>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in inventoryRows" :key="r.name" class="hover:bg-[var(--mds-bg-hover-soft)]">
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5">
                    <span class="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" :style="{ background: r.color }" />{{ r.name }}
                  </td>
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right">{{ r.qty }}</td>
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold">{{ r.value }}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="mt-1.5 self-start text-[11px] font-medium text-[var(--mds-brand-600)] hover:underline">Xem thêm</button>
            <div class="mt-auto border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 14h58 <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>
        </div>

        <!-- ── Row 3: Doanh thu + Mặt hàng bán chạy ── -->
        <div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
          <section class="group mds-card p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Doanh thu</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodRev" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                </select>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <div class="mb-1 flex items-baseline gap-1.5">
              <span class="text-[22px] font-bold leading-none">{{ revenueTotal }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-1 text-[12px] text-[var(--mds-text-muted)]">Tổng doanh thu</p>
            <MChart :option="revenueOnly" :height="220" />
          </section>

          <section class="group mds-card flex flex-col p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Mặt hàng bán chạy</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="settings" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodSell" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                </select>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <div class="flex items-baseline gap-1.5">
              <span class="text-[22px] font-bold leading-none">{{ sellingTotal }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-2 mt-1 text-[12px] text-[var(--mds-text-muted)]">Tổng doanh thu</p>
            <table class="w-full border-collapse text-[12px]">
              <thead>
                <tr>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-left font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Tên</th>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Số lượng</th>
                  <th class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in sellingRows" :key="r.name" class="hover:bg-[var(--mds-bg-hover-soft)]">
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5">
                    <span class="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" :style="{ background: r.color }" />{{ r.name }}
                  </td>
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right">{{ r.qty }}</td>
                  <td class="border-b border-[var(--mds-border-light,var(--mds-border))] py-1.5 text-right font-semibold">{{ r.revenue }}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="mt-1.5 self-start text-[11px] font-medium text-[var(--mds-brand-600)] hover:underline">Xem thêm</button>
            <div class="mt-auto border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 15h47 <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>
        </div>

        <!-- ── Row 4: Dòng tiền + Chi phí ── -->
        <div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
          <section class="group mds-card p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Dòng tiền</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodCash" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                </select>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <MChart :option="cashOption" :height="260" />
          </section>

          <section class="group mds-card flex flex-col p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-[16px] font-semibold leading-[22px]">Chi phí</h3>
              <div class="flex items-center gap-1.5">
                <button type="button" class="flex h-6 w-6 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[var(--mds-bg-hover-soft)] group-hover:opacity-100">
                  <MIcon name="refresh" :size="12" class="text-[var(--mds-icon-neutral)]" />
                </button>
                <select v-model="periodCost" class="cursor-pointer bg-transparent text-[11px] text-[var(--mds-text-secondary,var(--mds-text-muted))] outline-none">
                  <option>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                </select>
              </div>
            </div>
            <p class="mb-1 mt-0.5 text-right text-[11px] text-[var(--mds-text-muted)]">Đvt: Triệu đồng</p>
            <div class="mb-1 flex items-baseline gap-1.5">
              <span class="text-[22px] font-bold leading-none">{{ costTotal }}</span>
              <span class="text-[14px] font-semibold text-[var(--mds-text-secondary,var(--mds-text-muted))]">Triệu đồng</span>
            </div>
            <p class="mb-1 text-[12px] text-[var(--mds-text-muted)]">Tổng</p>
            <div class="flex items-center gap-3">
              <MChart :option="costOption" :height="160" class="w-[160px] shrink-0" />
              <div class="flex flex-col gap-2">
                <div v-for="c in costItems" :key="c.name" class="flex items-center gap-2 text-[12px] text-[var(--mds-text-secondary,var(--mds-text-muted))]">
                  <span class="inline-block h-2 w-2 shrink-0 rounded-full" :style="{ background: c.color }" />
                  {{ c.name }}
                </div>
              </div>
            </div>
            <div class="mt-auto border-t border-[var(--mds-border-light,var(--mds-border))] pt-2 text-[11px] text-[var(--mds-text-muted)]">
              Số liệu tính đến 15h47 <button type="button" class="ml-1 font-medium text-[var(--mds-brand-600)] hover:underline">Tải lại</button>
            </div>
          </section>
        </div>
      </main>
    </div>

    <MSettingsDialog v-model="showSettings" />
    <MToast />
  </div>
</template>
