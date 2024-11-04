<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const language = computed({
  get: () => locale.value,
  set: async (value) => {
    await setLocale(value);
    if (process.client) {
      localStorage.setItem("user-locale", value);
    }
  },
});
</script>

<template>
  <UiSelect v-model="language">
    <UiSelectTrigger class="w-[180px]">
      <UiSelectValue placeholder="Select a language" />
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectItem v-for="language in locales" :value="language.code">
          {{ language.name }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>
