<script setup lang="ts">
import { ref, onMounted } from "vue";
import { columns } from "~/components/operators/columns";

const { getEmployees } = useEmployees();
const isError = ref(false);
const isLoading = ref(false);
const data = ref<Employee[]>([]);
const operatorsStore = useOperatorsStore();

try {
  isLoading.value = true;
  data.value = await getEmployees();
  operatorsStore.setOperators(data.value);
} catch (error) {
  console.error("Getting operators error: ", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getEmployees();
    operatorsStore.setOperators(data.value);
  } catch (error) {
    console.error("Getting operators error: ", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<!-- Render DataTable only if data is available -->
<template>
  <div class="w-full flex flex-col gap-8 mx-auto">
    <div class="flex justify-between pt-4">
      <div>
        <h1 class="md:text-2xl text-lg font-medium">
          {{ $t("operators") }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ $t("view_and_manage_operators") }}
        </p>
      </div>
      <NuxtLink to="/operators/new" class="w-fit self-end">
        <UiButton class="w-fit self-end px-5"
          ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon>
          {{ $t("add_operator") }}
        </UiButton>
      </NuxtLink>
    </div>

    <div v-if="isLoading" class="py-10 flex justify-center w-full">
      <UiLoading />
    </div>

    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <div class="flex flex-1 items-center space-x-2">
            <UiInput
              :placeholder="$t('filter_by_operator_name')"
              :model-value="(table?.getColumn('fullName')?.getFilterValue() as string) ?? ''"
              class="h-8 w-[150px] lg:w-[250px]"
              @input="
                table
                  ?.getColumn('fullName')
                  ?.setFilterValue($event.target.value)
              "
            />
          </div>
        </template>
      </UiDataTable>
    </UiCard>
    <div v-else-if="isError">
      <UiErrorMessage :retry="refetch" :title="$t('something_went_wrong')" />
    </div>
  </div>
</template>
