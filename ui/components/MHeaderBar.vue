<script setup>
// MHeaderBar — Header Platform MISA: light hoặc brand theo reference sản phẩm.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'light', validator: (v) => ['light', 'brand'].includes(v) },
  appName: { type: String, default: '' },
  companyName: { type: String, default: '' },
  searchPlaceholder: { type: String, default: 'Tìm kiếm' },
  notificationCount: { type: Number, default: 0 },
  assistant: { type: Object, default: null },
  user: { type: Object, default: null },
  showSettings: { type: Boolean, default: true },
  showAssistant: { type: Boolean, default: true },
  showChat: { type: Boolean, default: true },
  showNotifications: { type: Boolean, default: true },
  showHelp: { type: Boolean, default: true },
  showMore: { type: Boolean, default: true },
})

const emit = defineEmits(['search', 'notifications', 'settings', 'assistant', 'chat', 'help', 'more', 'user-click', 'logo-click', 'app-switcher'])
const searchInput = ref(null)
const searchText = ref('')

const isBrand = computed(() => props.variant === 'brand')
const headerClass = computed(() => isBrand.value
  ? 'bg-[var(--mds-brand-600)] text-white'
  : 'border-b border-[var(--mds-border)] bg-[var(--mds-bg)] text-[var(--mds-text)]')
const buttonClass = computed(() => isBrand.value
  ? 'text-white hover:bg-white/15 focus-visible:outline-white'
  : 'text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)] focus-visible:outline-[var(--mds-brand-600)]')
const searchClass = computed(() => isBrand.value
  ? 'bg-white/15 text-white placeholder:text-white/70 focus:bg-white focus:text-[var(--mds-text)] focus:placeholder:text-[var(--mds-text-placeholder)]'
  : 'bg-[var(--mds-bg-disabled)] text-[var(--mds-text)] placeholder:text-[var(--mds-text-muted)] focus:bg-white focus:ring-1 focus:ring-[var(--mds-brand-600)]')
const searchIconClass = computed(() => isBrand.value
  ? 'text-white/70 peer-focus:text-[var(--mds-icon-neutral)]'
  : 'text-[var(--mds-icon-neutral)]')
const badgeText = computed(() => props.notificationCount > 99 ? '99+' : String(props.notificationCount))
const appInitial = computed(() => (props.appName || '').trim().charAt(0).toUpperCase())
const userInitials = computed(() => initials(props.user?.name))
const assistantInitials = computed(() => initials(props.assistant?.name || 'AVA'))

function initials(name) {
  const words = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return ''
  return (words.length >= 2 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase()
}
function onGlobalKeydown(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchInput.value?.focus()
  }
}
function onSearchFocus(event) { event.target.select() }
function onSearchEnter() { emit('search', searchText.value) }

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <header class="flex h-12 w-full items-center gap-2 px-3 text-[13px] leading-[18px]" :class="headerClass">
    <button type="button" :class="buttonClass" class="grid h-8 w-8 shrink-0 place-items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" title="Chuyển ứng dụng" aria-label="Chuyển ứng dụng" @click="emit('app-switcher')">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <circle v-for="[cx, cy] in [[5,5],[10,5],[15,5],[5,10],[10,10],[15,10],[5,15],[10,15],[15,15]]" :key="`${cx}-${cy}`" :cx="cx" :cy="cy" r="1.4" />
      </svg>
    </button>

    <button type="button" :class="buttonClass" class="flex shrink-0 items-center gap-2 rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" :title="appName" @click="emit('logo-click')">
      <slot name="logo">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--mds-brand-600)] text-[16px] font-semibold text-white">{{ appInitial }}</span>
      </slot>
      <span class="hidden text-[16px] font-semibold leading-[22px] sm:block">{{ appName }}</span>
    </button>

    <button v-if="companyName" type="button" :class="isBrand ? 'text-white/90 hover:bg-white/15' : 'text-[var(--mds-text)] hover:bg-[var(--mds-bg-hover-soft)]'" class="hidden max-w-[240px] items-center gap-1 truncate rounded-lg px-2 py-1.5 font-medium lg:flex" :title="companyName">
      <span class="truncate">{{ companyName }}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6l6 -6" /></svg>
    </button>

    <div class="flex min-w-0 flex-1 justify-center px-2">
      <div class="relative w-full max-w-[500px]">
        <input ref="searchInput" v-model="searchText" type="search" :placeholder="searchPlaceholder" class="peer h-8 w-full rounded-lg pl-9 pr-3 outline-none transition-colors" :class="searchClass" @focus="onSearchFocus" @keydown.enter="onSearchEnter" />
        <svg class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" :class="searchIconClass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-1">
      <slot name="actions" />
      <button v-if="showSettings" type="button" :class="buttonClass" class="grid h-8 w-8 place-items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" title="Thiết lập" @click="emit('settings')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg></button>
      <button v-if="showAssistant" type="button" class="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-[var(--mds-brand-100)] text-[11px] font-semibold text-[var(--mds-brand-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mds-brand-600)]" :title="assistant?.name || 'MISA AVA'" @click="emit('assistant')"><slot name="assistant"><img v-if="assistant?.avatarUrl" :src="assistant.avatarUrl" :alt="assistant.name || 'MISA AVA'" class="h-full w-full object-cover" /><span v-else>{{ assistantInitials }}</span></slot></button>
      <button v-if="showChat" type="button" :class="buttonClass" class="grid h-8 w-8 place-items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" title="Chat" @click="emit('chat')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" /></svg></button>
      <button v-if="showNotifications" type="button" :class="buttonClass" class="relative grid h-8 w-8 place-items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" title="Thông báo" @click="emit('notifications')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg><span v-if="notificationCount > 0" class="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--mds-danger)] px-1 text-[10px] font-medium leading-none text-white">{{ badgeText }}</span></button>
      <button v-if="showHelp" type="button" :class="buttonClass" class="hidden h-8 w-8 place-items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:grid" title="Hỗ trợ" @click="emit('help')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></svg></button>
      <button v-if="showMore" type="button" :class="isBrand ? 'border-white/40 text-white hover:bg-white/15 focus-visible:outline-white' : 'border-[var(--mds-border)] text-[var(--mds-icon-neutral)] hover:bg-[var(--mds-bg-hover-soft)] focus-visible:outline-[var(--mds-brand-600)]'" class="hidden h-7 w-7 place-items-center rounded-full border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:grid" title="Thêm" @click="emit('more')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg></button>
      <button v-if="user" type="button" class="ml-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[var(--mds-brand-100)] text-[12px] font-semibold text-[var(--mds-brand-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mds-brand-600)]" :title="user.name" @click="emit('user-click')"><img v-if="user.avatarUrl" :src="user.avatarUrl" :alt="user.name" class="h-full w-full object-cover" /><span v-else class="flex h-full w-full items-center justify-center">{{ userInitials }}</span></button>
    </div>
  </header>
</template>
