<script setup>
/**
 * FormPageMobile — biến thể Compact của FormPage.
 * Luôn 1 cột, label phía trên field; footer Lưu/Hủy sticky,
 * chừa safe-area-bottom để không bị thanh gesture iOS/Android che.
 */
import { ref, reactive } from 'vue'
import MButton from '../../components/MButton.vue'
import MInput from '../../components/MInput.vue'
import MSelect from '../../components/MSelect.vue'
import MDatePicker from '../../components/MDatePicker.vue'
import MRadioGroup from '../../components/MRadioGroup.vue'
import MTextarea from '../../components/MTextarea.vue'
import MToast from '../../components/MToast.vue'
import { useToast } from '../../components/toast.js'
import MMobileTopBar from './MMobileTopBar.vue'

const toast = useToast()

const genderOptions = [
  { label: 'Nam', value: 'nam' },
  { label: 'Nữ', value: 'nu' },
  { label: 'Khác', value: 'khac' },
]
const departmentOptions = [
  { label: 'Kinh doanh', value: 'kinh-doanh' },
  { label: 'Kế toán', value: 'ke-toan' },
  { label: 'Nhân sự', value: 'nhan-su' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Phát triển sản phẩm', value: 'phat-trien-san-pham' },
  { label: 'Chăm sóc khách hàng', value: 'cskh' },
]

const form = reactive({
  name: '', code: 'NV-0011', gender: 'nam', birthday: null,
  department: null, title: '', email: '', phone: '', note: '',
})
const errors = reactive({ name: '' })
const saving = ref(false)

function validate() {
  errors.name = form.name.trim() ? '' : 'Họ tên không được để trống'
  return !errors.name
}

function goBack() {
  toast.info('Quay lại danh sách nhân viên')
}

function save() {
  if (!validate()) return
  saving.value = true
  toast.success(`Đã lưu nhân viên ${form.name.trim()}`)
  saving.value = false
  goBack()
}
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <MMobileTopBar mode="page" title="Thêm nhân viên" @back="goBack" @more="toast.info('Mở thao tác khác')" />

    <!-- Body cuộn được, 1 cột trên compact -->
    <main class="min-h-0 flex-1 overflow-y-auto p-3">
      <div class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-4">
        <h3 class="mb-3 text-[14px] font-semibold leading-[20px] text-[var(--mds-text)]">Thông tin nhân viên</h3>

        <div class="flex flex-col gap-4">
          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
              Họ tên <span class="text-[var(--mds-danger)]">*</span>
            </label>
            <MInput v-model="form.name" placeholder="Nhập họ tên" :error="errors.name" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Mã nhân viên</label>
            <MInput v-model="form.code" placeholder="Mã tự sinh" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Giới tính</label>
            <MRadioGroup v-model="form.gender" :options="genderOptions" direction="horizontal" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Ngày sinh</label>
            <MDatePicker v-model="form.birthday" :max="new Date()" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Phòng ban</label>
            <MSelect v-model="form.department" :options="departmentOptions" placeholder="Chọn phòng ban" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Chức danh</label>
            <MInput v-model="form.title" placeholder="VD: Nhân viên kinh doanh" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Email</label>
            <MInput v-model="form.email" type="email" placeholder="ten@misa.com.vn" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Số điện thoại</label>
            <MInput v-model="form.phone" placeholder="VD: 0912 345 678" />
          </div>

          <div>
            <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">Ghi chú</label>
            <MTextarea v-model="form.note" :rows="3" :maxlength="500" placeholder="Nhập ghi chú" />
          </div>
        </div>
      </div>
    </main>

    <!-- Footer sticky, chừa safe-area-bottom -->
    <footer
      class="flex shrink-0 items-center justify-between gap-2 border-t border-[var(--mds-border)] bg-[var(--mds-bg)] px-3 pt-3"
      style="padding-bottom: max(12px, env(safe-area-inset-bottom))"
    >
      <MButton variant="secondary" @click="goBack">Hủy</MButton>
      <MButton variant="primary" :loading="saving" @click="save">Lưu</MButton>
    </footer>

    <MToast />
  </div>
</template>
