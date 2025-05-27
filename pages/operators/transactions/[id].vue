<script setup lang="ts">
import { ref } from "vue";
import { columns } from "~/components/transactions/columns";
import { useTransactions } from "~/composables/useTransactions";
import type { Transaction } from "~/types";

const { getTransactionsByOperatorId } = useTransactions();
const data = ref<Transaction[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const route = useRoute();
const filterValue = ref("");

const handleFilter = (table: any) => {
  table.getColumn("payerName")?.setFilterValue(filterValue.value);
  table.getColumn("payerAccountNumber")?.setFilterValue(filterValue.value);
};

try {
  const id = route.params.id as string;
  data.value = await getTransactionsByOperatorId(id);
} catch (error) {
  console.error("Error fetching transactions:", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    const id = route.params.id as string;
    isLoading.value = true;
    data.value = await getTransactionsByOperatorId(id);
  } catch (error) {
    console.error("Error fetching operator transactions:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">
        {{ data[0]?.operatorName && $t("operator") + data[0]?.operatorName }}
        {{ $t("transactions") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("view_and_manage_transactions") }}
      </p>
    </div>

    <div v-if="isLoading" class="py-10 flex justify-center w-full">
      <UiLoading />
    </div>

    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <div class="flex flex-1 items-center space-x-2">
            <UiInput
              :placeholder="$t('filter_by_payer_name_or_account_number')"
              v-model="filterValue"
              class="h-8 w-[250px] lg:w-[350px]"
              @input="handleFilter(table)"
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
