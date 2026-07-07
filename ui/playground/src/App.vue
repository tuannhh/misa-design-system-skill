<script setup>
import { ref } from 'vue'
import MButton from '@mds/MButton.vue'
import MTag from '@mds/MTag.vue'
import MSpinner from '@mds/MSpinner.vue'
import MProgress from '@mds/MProgress.vue'
import MInput from '@mds/MInput.vue'
import MTextarea from '@mds/MTextarea.vue'
import MCheckbox from '@mds/MCheckbox.vue'
import MRadioGroup from '@mds/MRadioGroup.vue'
import MSelect from '@mds/MSelect.vue'
import MCombobox from '@mds/MCombobox.vue'
import MDialog from '@mds/MDialog.vue'
import MToast from '@mds/MToast.vue'
import { useToast } from '@mds/toast.js'
import MTabs from '@mds/MTabs.vue'
import MEmptyState from '@mds/MEmptyState.vue'

const toast = useToast()
const themes = ['blue', 'indigo', 'cyan', 'teal', 'green', 'orange', 'red', 'pink', 'purple', 'blue-gray']
const theme = ref('blue')
function setTheme(t) {
  theme.value = t
  document.documentElement.setAttribute('data-mds-theme', t)
}

const loadingBtn = ref(false)
function demoLoading() {
  loadingBtn.value = true
  setTimeout(() => (loadingBtn.value = false), 2000)
}

const name = ref('Nguyễn Văn An')
const note = ref('')
const agree = ref(true)
const half = ref(false)
const gender = ref('male')
const dept = ref(null)
const staff = ref([])
const donvi = ref(null)
const dialogOpen = ref(false)
const activeTab = ref('info')

const deptOptions = [
  { label: 'Phòng Kinh doanh', value: 'kd' },
  { label: 'Phòng Marketing', value: 'mkt' },
  { label: 'Phòng Nhân sự', value: 'ns' },
  { label: 'Phòng Kế toán', value: 'kt' },
  { label: 'Ban Giám đốc', value: 'bgd' },
]
const staffOptions = [
  'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Thu Dung', 'Hoàng Văn Em',
  'Vũ Thị Phương', 'Đặng Minh Giang', 'Bùi Thu Hà', 'Ngô Văn Inh', 'Đỗ Thị Kim',
].map((n, i) => ({ label: n, value: i }))
</script>

<template>
  <div class="mx-auto max-w-5xl p-8 space-y-8">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-[20px] leading-[28px] font-semibold">MDS UI — Bộ control mới</h1>
        <p class="text-[var(--mds-text-placeholder)]">Vue 3 + Tailwind · chuẩn MDS 2.0 · Đợt 1: 14 control lõi</p>
      </div>
      <div class="flex items-center gap-1">
        <button v-for="t in themes" :key="t" @click="setTheme(t)"
          class="h-6 w-6 rounded-full border-2 cursor-pointer"
          :class="theme === t ? 'border-[var(--mds-text)]' : 'border-transparent'"
          :data-mds-theme="t" :title="t"
          :style="{ background: 'var(--mds-brand-600)' }" />
      </div>
    </header>

    <section class="rounded-lg bg-white p-6 space-y-4">
      <h3 class="text-[16px] leading-[22px] font-semibold">Button</h3>
      <div class="flex flex-wrap items-center gap-3">
        <MButton variant="primary">Lưu</MButton>
        <MButton>Hủy</MButton>
        <MButton variant="danger">Xóa</MButton>
        <MButton variant="link">Xem chi tiết</MButton>
        <MButton variant="primary" :loading="loadingBtn" @click="demoLoading">Lưu (loading 2s)</MButton>
        <MButton disabled>Disabled</MButton>
        <MButton variant="primary" size="lg">Size lớn</MButton>
      </div>
    </section>

    <section class="rounded-lg bg-white p-6 space-y-4">
      <h3 class="text-[16px] leading-[22px] font-semibold">Tag · Spinner · Progress</h3>
      <div class="flex flex-wrap items-center gap-3">
        <MTag color="brand">Đang thực hiện</MTag>
        <MTag color="success">Hoàn thành</MTag>
        <MTag color="warning">Chờ duyệt</MTag>
        <MTag color="danger" closable>Quá hạn</MTag>
        <MTag>Nháp</MTag>
        <MSpinner :size="20" class="text-[var(--mds-brand-600)]" />
      </div>
      <MProgress :value="65" label="65%" class="max-w-sm" />
    </section>

    <section class="rounded-lg bg-white p-6 space-y-4">
      <h3 class="text-[16px] leading-[22px] font-semibold">Input · Textarea · Checkbox · Radio</h3>
      <div class="grid grid-cols-2 gap-4 max-w-3xl">
        <MInput v-model="name" placeholder="Họ và tên" clearable />
        <MInput model-value="" placeholder="Có lỗi" error="Trường này là bắt buộc" />
        <MInput model-value="Chỉ đọc" readonly />
        <MInput model-value="Vô hiệu" disabled />
        <MInput type="password" model-value="matkhau123" placeholder="Mật khẩu" />
        <MTextarea v-model="note" placeholder="Ghi chú" :maxlength="200" />
      </div>
      <div class="flex items-center gap-6">
        <MCheckbox v-model="agree" label="Đồng ý điều khoản" />
        <MCheckbox v-model="half" indeterminate label="Chọn một phần" />
        <MCheckbox :model-value="true" disabled label="Disabled" />
      </div>
      <MRadioGroup v-model="gender" :options="[
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
        { label: 'Khác', value: 'other' },
      ]" direction="horizontal" />
    </section>

    <section class="rounded-lg bg-white p-6 space-y-4">
      <h3 class="text-[16px] leading-[22px] font-semibold">Select (4–8 lựa chọn) · Combobox (&gt;8, gõ tìm)</h3>
      <div class="grid grid-cols-2 gap-4 max-w-3xl">
        <MSelect v-model="dept" :options="deptOptions" placeholder="Chọn phòng ban" />
        <MCombobox v-model="staff" :options="staffOptions" multiple placeholder="Chọn nhân viên (gõ để tìm)" />
        <MCombobox v-model="donvi" :options="deptOptions" allow-create placeholder="Đơn vị (gõ mới + Enter để thêm nhanh)" />
      </div>
    </section>

    <section class="rounded-lg bg-white p-6 space-y-4">
      <h3 class="text-[16px] leading-[22px] font-semibold">Dialog · Toast · Tabs · Empty state</h3>
      <div class="flex flex-wrap items-center gap-3">
        <MButton variant="primary" @click="dialogOpen = true">Mở dialog</MButton>
        <MButton @click="toast.success('Lưu dữ liệu thành công')">Toast thành công</MButton>
        <MButton @click="toast.error('Không thể kết nối máy chủ')">Toast lỗi</MButton>
        <MButton @click="toast.warning('Bản ghi sắp hết hạn')">Toast cảnh báo</MButton>
      </div>
      <MTabs v-model="activeTab" :tabs="[
        { key: 'info', label: 'Thông tin chung' },
        { key: 'contract', label: 'Hợp đồng' },
        { key: 'history', label: 'Lịch sử' },
        { key: 'off', label: 'Vô hiệu', disabled: true },
      ]">
        <div v-if="activeTab === 'info'" class="py-3">Nội dung tab thông tin chung.</div>
        <div v-else-if="activeTab === 'contract'" class="py-3">Nội dung tab hợp đồng.</div>
        <div v-else class="py-3">
          <MEmptyState type="no-result" title="Không tìm thấy kết quả" description="Thử thay đổi điều kiện lọc và tìm lại." />
        </div>
      </MTabs>
    </section>

    <MDialog v-model="dialogOpen" title="Xóa hợp đồng" type="danger"
      @confirm="dialogOpen = false; toast.success('Đã xóa hợp đồng')" @cancel="dialogOpen = false">
      Bạn có chắc muốn xóa hợp đồng HD-2026-0715 không?
    </MDialog>
    <MToast />
  </div>
</template>
