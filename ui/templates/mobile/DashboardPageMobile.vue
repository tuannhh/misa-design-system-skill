<script setup>
/**
 * DashboardPageMobile — biến thể Compact (< 600px) của DashboardPage.
 * 1 cột; KPI 2 cột (giá trị ngắn không tràn); chart chiều cao ổn định,
 * hiện nhãn số quan trọng thay vì chỉ dựa vào hover; card vẫn stroke 1px không shadow.
 */
import { ref, computed } from 'vue'
import MChart from '../../components/MChart.vue'
import MTag from '../../components/MTag.vue'
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
const activeNav = ref('dashboard')

function cssVar(name) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
const brand600 = cssVar('--mds-brand-600')
const danger = cssVar('--mds-danger')
const info = cssVar('--mds-info')
const warning = cssVar('--mds-warning')
const purple = cssVar('--mds-purple')
const textMuted = cssVar('--mds-text-muted')
const border = cssVar('--mds-border')
const axisLabel = { color: textMuted, fontSize: 11, fontFamily: 'Inter' }
const splitLine = { lineStyle: { color: border, type: 'dashed' } }

const kpis = [
  { label: 'Tổng nhân sự', value: '1.284', delta: '+2,4%', color: 'success' },
  { label: 'Tuyển mới tháng này', value: '36', delta: '+12,5%', color: 'success' },
  { label: 'Nghỉ việc', value: '12', delta: '+8,3%', color: 'danger' },
  { label: 'Tỷ lệ nghỉ', value: '0,9%', delta: '-0,2%', color: 'success' },
]

const barOption = computed(() => ({
  // Chỉ 1 series, tiêu đề card đã đủ ngữ nghĩa → tắt legend để không đè lên nhãn trục
  legend: { show: false },
  grid: { left: 4, right: 4, top: 8, bottom: 0, containLabel: true },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: {
    type: 'category',
    data: ['KD', 'PTSP', 'CSKH', 'MKT', 'KT', 'NS'],
    axisLabel,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: border } },
  },
  yAxis: { type: 'value', axisLabel, splitLine },
  series: [
    { name: 'Nhân sự', type: 'bar', data: [412, 296, 188, 152, 132, 104], barWidth: 18, itemStyle: { color: brand600, borderRadius: [3, 3, 0, 0] } },
  ],
}))

const contractData = [
  { value: 812, name: 'Không xác định thời hạn' },
  { value: 296, name: 'Xác định thời hạn' },
  { value: 98, name: 'Thử việc' },
  { value: 78, name: 'Thời vụ / CTV' },
]
const contractTotal = contractData.reduce((s, d) => s + d.value, 0)
// Legend mặc định hiện %, hover mới thấy số đếm tuyệt đối (qua tooltip)
function legendPercentLabel(name) {
  const item = contractData.find((d) => d.name === name)
  const pct = item ? ((item.value / contractTotal) * 100).toFixed(1).replace('.', ',') : ''
  return `${name}  ${pct}%`
}

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => `${v} nhân viên` },
  legend: {
    orient: 'horizontal',
    bottom: 0,
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 10,
    textStyle: { ...axisLabel, fontSize: 10 },
    formatter: legendPercentLabel,
  },
  color: [brand600, info, warning, purple],
  series: [
    {
      name: 'Loại hợp đồng',
      type: 'pie',
      radius: ['50%', '75%'],
      center: ['50%', '40%'],
      avoidLabelOverlap: true,
      itemStyle: { borderWidth: 2, borderColor: cssVar('--mds-bg') },
      label: { show: false },
      data: contractData,
    },
  ],
}))
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <MMobileTopBar
      title="AMIS Nhân sự"
      :notification-count="3"
      user-initials="NV"
      @app-switcher="toast.info('Mở danh sách ứng dụng')"
      @notifications="toast.info('Mở danh sách thông báo')"
      @user-click="toast.info('Mở menu tài khoản')"
    />

    <main class="min-h-0 flex-1 overflow-y-auto p-3">
      <h2 class="mb-3 text-[18px] font-semibold leading-[24px] text-[var(--mds-text)]">Tổng quan</h2>

      <!-- KPI 2 cột trên compact -->
      <div class="grid grid-cols-2 gap-3">
        <div v-for="kpi in kpis" :key="kpi.label" class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-3">
          <p class="text-[11px] leading-[14px] text-[var(--mds-text-muted)]">{{ kpi.label }}</p>
          <div class="mt-1 flex flex-wrap items-center gap-1.5">
            <span class="text-[18px] font-semibold leading-[24px] text-[var(--mds-text)]">{{ kpi.value }}</span>
            <MTag :color="kpi.color" size="sm">{{ kpi.delta }}</MTag>
          </div>
        </div>
      </div>

      <section class="mt-3 rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-3">
        <h3 class="mb-2 text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">Nhân sự theo phòng ban</h3>
        <MChart :option="barOption" :height="200" />
      </section>

      <section class="mt-3 rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-3">
        <h3 class="mb-2 text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">Cơ cấu theo loại hợp đồng</h3>
        <MChart :option="pieOption" :height="220" />
      </section>
    </main>

    <MMobileBottomNav :items="navItems" :active="activeNav" @select="(k) => (activeNav = k)" />
    <MToast />
  </div>
</template>
