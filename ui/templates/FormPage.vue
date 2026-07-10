<script setup>
/**
 * FormPage — template màn hình Thêm/Sửa (dạng Page) chuẩn MDS 2.0
 * Header trắng đơn giản (back + tiêu đề), body form 2 cột trên card trắng
 * căn giữa nền xám; nút Lưu/Hủy GHIM (sticky) ở cuối trang — không trôi khi cuộn,
 * Primary ngoài cùng bên phải theo MDS.
 */
import { ref, reactive } from 'vue'
import MButton from '../components/MButton.vue'
import MInput from '../components/MInput.vue'
import MSelect from '../components/MSelect.vue'
import MDatePicker from '../components/MDatePicker.vue'
import MRadioGroup from '../components/MRadioGroup.vue'
import MTextarea from '../components/MTextarea.vue'
import MToast from '../components/MToast.vue'
import MIcon from '../components/MIcon.vue'
import { useToast } from '../components/toast.js'

const toast = useToast()

/* ── Options ────────────────────────────────────────────────── */

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

/* ── State form ─────────────────────────────────────────────── */

const form = reactive({
  name: '',
  code: 'NV-0011',
  gender: 'nam',
  birthday: null,
  department: null,
  title: '',
  email: '',
  phone: '',
  note: '',
})

const errors = reactive({ name: '' })
const saving = ref(false)

function resetForm() {
  form.name = ''
  form.gender = 'nam'
  form.birthday = null
  form.department = null
  form.title = ''
  form.email = ''
  form.phone = ''
  form.note = ''
  errors.name = ''
  // Mã NV mock: tăng số cuối để mô phỏng sinh mã tự động
  form.code = `NV-${String(Number(form.code.slice(3)) + 1).padStart(4, '0')}`
}

// Validate: trường bắt buộc trống → viền danger + message đỏ dưới control
function validate() {
  errors.name = form.name.trim() ? '' : 'Họ tên không được để trống'
  return !errors.name
}

function goBack() {
  toast.info('Quay lại danh sách nhân viên')
}

function cancel() {
  goBack()
}

function save() {
  if (!validate()) return
  saving.value = true
  toast.success(`Đã lưu nhân viên ${form.name.trim()}`)
  saving.value = false
  goBack()
}

// Lưu và Thêm mới: lưu xong reset form để nhập tiếp bản ghi mới
function saveAndNew() {
  if (!validate()) return
  saving.value = true
  toast.success(`Đã lưu nhân viên ${form.name.trim()}. Tiếp tục thêm mới.`)
  saving.value = false
  resetForm()
}
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden bg-[var(--mds-bg-disabled)] text-[13px] leading-[18px] text-[var(--mds-text)]"
    :style="{ fontFamily: 'var(--mds-font-family)' }"
  >
    <!-- Header trắng đơn giản: back + tiêu đề trang -->
    <header
      class="flex h-14 shrink-0 items-center gap-2 border-b border-[var(--mds-border)] bg-[var(--mds-bg)] px-4"
    >
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mds-brand-600)]"
        aria-label="Quay lại"
        @click="goBack"
      >
        <MIcon name="chevron-left" :size="20" />
      </button>
      <h1 class="text-[20px] font-semibold leading-[28px] text-[var(--mds-text)]">Thêm nhân viên</h1>
    </header>

    <!-- Body cuộn được, card form căn giữa -->
    <main class="min-h-0 flex-1 overflow-y-auto">
      <div class="mx-auto w-full max-w-3xl px-4 py-6">
        <div class="rounded-lg border border-[var(--mds-border)] bg-[var(--mds-bg)] p-6">
          <h3 class="mb-4 text-[16px] font-semibold leading-[22px] text-[var(--mds-text)]">
            Thông tin nhân viên
          </h3>

          <!-- Form 2 cột; label 13px medium trên input, dấu * đỏ cho bắt buộc -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Họ tên <span class="text-[var(--mds-danger)]">*</span>
              </label>
              <MInput v-model="form.name" placeholder="Nhập họ tên" :error="errors.name" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Mã nhân viên
              </label>
              <MInput v-model="form.code" placeholder="Mã tự sinh" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Giới tính
              </label>
              <!-- RadioGroup ngang, canh theo chiều cao control 32px -->
              <div class="flex h-8 items-center">
                <MRadioGroup v-model="form.gender" :options="genderOptions" direction="horizontal" />
              </div>
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Ngày sinh
              </label>
              <MDatePicker v-model="form.birthday" :max="new Date()" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Phòng ban
              </label>
              <MSelect v-model="form.department" :options="departmentOptions" placeholder="Chọn phòng ban" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Chức danh
              </label>
              <MInput v-model="form.title" placeholder="VD: Nhân viên kinh doanh" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Email
              </label>
              <MInput v-model="form.email" type="email" placeholder="ten@misa.com.vn" />
            </div>

            <div>
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Số điện thoại
              </label>
              <MInput v-model="form.phone" placeholder="VD: 0912 345 678" />
            </div>

            <!-- Ghi chú: full 2 cột -->
            <div class="sm:col-span-2">
              <label class="mb-1 block text-[13px] font-medium leading-[18px] text-[var(--mds-text)]">
                Ghi chú
              </label>
              <MTextarea v-model="form.note" :rows="3" :maxlength="500" placeholder="Nhập ghi chú" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer STICKY cuối trang (nguyên tắc màn Thêm/Sửa: Lưu/Hủy luôn ghim,
         không trôi khi cuộn) — Primary ngoài cùng bên phải theo MDS -->
    <footer
      class="flex shrink-0 items-center justify-between border-t border-[var(--mds-border)] bg-[var(--mds-bg)] px-4 py-3"
    >
      <MButton variant="secondary" @click="cancel">Hủy</MButton>
      <div class="flex items-center gap-2">
        <MButton variant="secondary" :loading="saving" @click="save">Lưu</MButton>
        <MButton variant="primary" :loading="saving" @click="saveAndNew">Lưu và Thêm mới</MButton>
      </div>
    </footer>

    <MToast />
  </div>
</template>
