<script setup>
/**
 * DetailPageMobile — biến thể Compact của DetailPage.
 * Top bar: Back + tiêu đề rút gọn + More. Action chính (Phê duyệt) đặt
 * trong sticky bottom bar; action ít dùng (Sửa, Nhân bản, Xuất hồ sơ, Xóa) vào More.
 * Tab cuộn ngang có indicator; nội dung chia section card như bản desktop.
 */
import { ref } from 'vue'
import MButton from '../../components/MButton.vue'
import MTabs from '../../components/MTabs.vue'
import MTag from '../../components/MTag.vue'
import MDataTable from '../../components/MDataTable.vue'
import MEmptyState from '../../components/MEmptyState.vue'
import MToast from '../../components/MToast.vue'
import { useToast } from '../../components/toast.js'
import MMobileTopBar from './MMobileTopBar.vue'

const toast = useToast()

const employee = {
  code: 'NV-0001', name: 'Nguyễn Văn An', status: 'Đang làm việc',
  department: 'Kinh doanh', title: 'Trưởng phòng kinh doanh', startDate: '12/03/2019',
  manager: 'Trần Quốc Bảo', email: 'nvan@misa.com.vn', phone: '0912 345 678',
  birthday: '24/08/1990', gender: 'Nam', idNumber: '001090012345',
  address: 'Số 8 Tôn Thất Thuyết, Cầu Giấy, Hà Nội',
}

const personalFields = [
  { label: 'Mã nhân viên', value: employee.code },
  { label: 'Ngày sinh', value: employee.birthday },
  { label: 'Giới tính', value: employee.gender },
  { label: 'Số CCCD', value: employee.idNumber },
  { label: 'Email', value: employee.email },
  { label: 'Số điện thoại', value: employee.phone },
  { label: 'Địa chỉ', value: employee.address },
]
const workFields = [
  { label: 'Phòng ban', value: employee.department },
  { label: 'Chức danh', value: employee.title },
  { label: 'Ngày vào làm', value: employee.startDate },
  { label: 'Quản lý trực tiếp', value: employee.manager },
]

const tabs = [
  { key: 'thong-tin-chung', label: 'Thông tin chung' },
  { key: 'hop-dong', label: 'Hợp đồng' },
  { key: 'cham-cong', label: 'Chấm công' },
  { key: 'lich-su', label: 'Lịch sử' },
]
const activeTab = ref('thong-tin-chung')

const contractColumns = [
  { key: 'code', label: 'Số hợp đồng', width: 130 },
  { key: 'type', label: 'Loại hợp đồng', width: 180 },
  { key: 'status', label: 'Trạng thái', width: 110 },
]
const contracts = [
  { id: 1, code: 'HĐLĐ-2023-0125', type: 'Không xác định thời hạn', status: 'Đang hiệu lực' },
  { id: 2, code: 'HĐLĐ-2020-0089', type: 'Xác định thời hạn 36 tháng', status: 'Hết hiệu lực' },
  { id: 3, code: 'HĐTV-2019-0031', type: 'Thử việc', status: 'Hết hiệu lực' },
]

function goBack() {
  toast.info('Quay lại danh sách nhân viên')
}
function onApprove() {
  toast.success(`Đã phê duyệt hồ sơ nhân viên ${employee.name}`)
}
function onMore() {
  toast.info('Sửa · Nhân bản · Xuất hồ sơ · Xóa')
}
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <MMobileTopBar mode="page" :title="employee.name" @back="goBack" @more="onMore" />

    <div class="flex shrink-0 items-center gap-2 border-b border-[var(--mds-border)] bg-[var(--mds-bg)] px-3 pb-2 pt-1">
      <MTag color="success">{{ employee.status }}</MTag>
      <span class="text-[12px] text-[var(--mds-text-muted)]">{{ employee.code }} · {{ employee.department }}</span>
    </div>

    <!-- Tab cuộn ngang trên compact -->
    <MTabs
      v-model="activeTab"
      :tabs="tabs"
      class="flex min-h-0 flex-1 flex-col [&>[role=tablist]]:shrink-0 [&>[role=tablist]]:overflow-x-auto [&>[role=tablist]]:whitespace-nowrap [&>[role=tablist]]:bg-[var(--mds-bg)] [&>[role=tablist]]:px-3 [&>[role=tabpanel]]:min-h-0 [&>[role=tabpanel]]:flex-1 [&>[role=tabpanel]]:overflow-y-auto"
    >
      <div v-if="activeTab === 'thong-tin-chung'" class="flex flex-col gap-3 p-3 pb-20">
        <section class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
          <h3 class="mb-3 text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">Thông tin cá nhân</h3>
          <dl class="flex flex-col gap-3">
            <div v-for="field in personalFields" :key="field.label">
              <dt class="text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ field.label }}</dt>
              <dd class="mt-0.5 text-[13px] leading-[18px] text-[var(--mds-text)]">{{ field.value }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
          <h3 class="mb-3 text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">Thông tin công việc</h3>
          <dl class="flex flex-col gap-3">
            <div v-for="field in workFields" :key="field.label">
              <dt class="text-[12px] leading-[16px] text-[var(--mds-text-muted)]">{{ field.label }}</dt>
              <dd class="mt-0.5 text-[13px] leading-[18px] text-[var(--mds-text)]">{{ field.value }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div v-else-if="activeTab === 'hop-dong'" class="p-3 pb-20">
        <MDataTable :columns="contractColumns" :rows="contracts" row-key="id">
          <template #cell-status="{ row }">
            <MTag :color="row.status === 'Đang hiệu lực' ? 'success' : 'neutral'" size="sm">{{ row.status }}</MTag>
          </template>
          <template #footer-info>Tổng số hợp đồng: {{ contracts.length }}</template>
        </MDataTable>
      </div>

      <div v-else-if="activeTab === 'cham-cong'" class="p-3 pb-20">
        <div class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)]">
          <MEmptyState type="initial" title="Chưa có dữ liệu chấm công" description="Dữ liệu chấm công sẽ hiển thị tại đây khi phát sinh" />
        </div>
      </div>

      <div v-else class="p-3 pb-20">
        <div class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)]">
          <MEmptyState type="initial" title="Chưa có lịch sử thay đổi" description="Mọi thay đổi trên hồ sơ nhân viên sẽ được ghi lại tại đây" />
        </div>
      </div>
    </MTabs>

    <!-- Action chính sticky đáy; action phụ đã gom vào More trên top bar -->
    <footer
      class="shrink-0 border-t border-[var(--mds-border)] bg-[var(--mds-bg)] px-3 pt-3"
      style="padding-bottom: max(12px, env(safe-area-inset-bottom))"
    >
      <MButton variant="primary" class="w-full" @click="onApprove">Phê duyệt</MButton>
    </footer>

    <MToast />
  </div>
</template>

<style scoped>
/* Tab cuộn ngang trên compact: ẩn thanh cuộn (vẫn cuộn được bằng tay/swipe),
   thanh cuộn mặc định của desktop browser đè lên chữ tab rất xấu. */
:deep([role='tablist']) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
:deep([role='tablist']::-webkit-scrollbar) {
  display: none;
  height: 0;
}
</style>
