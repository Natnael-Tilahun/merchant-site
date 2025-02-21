<script setup lang="ts">
import { ref, computed } from "vue";
import { columns } from "~/components/transactions/columns";
import { useTransactions } from "~/composables/useTransactions";
import { useRouter } from "vue-router"; // {{ edit_1 }}

const { getTransactions } = useTransactions();
const data = ref<Transaction[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const router = useRouter(); // {{ edit_2 }}

try {
  data.value = await getTransactions();
} catch (error) {
  console.error("Error fetching transactions:", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getTransactions();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrintTransactions = () => {
  console.log("account", data.value[0].merchantAccountNumber);
  router.push({
    path: "/transactions/print-transactions",
  });
};
</script>

<template>
  <div class="w-full min-h-screen flex flex-col gap-8">
    <div class="flex justify-between pt-4">
      <div>
        <h1 class="md:text-2xl text-lg font-medium">
          {{ $t("transactions") }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ $t("view_and_manage_transactions") }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <UiButton
          class="w-fit self-end px-5"
          @click="navigateToPrintTransactions"
          ><Icon name="material-symbols:download" size="24" class="mr-2"></Icon
          >{{ $t("download_transactions") }}</UiButton
        >

        <NuxtLink to="/transactions/initiate" class="w-fit self-end">
          <UiButton class="w-fit self-end px-5"
            ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon
            >{{ $t("initiate_transaction") }}</UiButton
          >
        </NuxtLink>
      </div>
    </div>
    <div v-if="isLoading" class="py-10 flex justify-center w-full border">
      <UiLoading />
    </div>

    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <TransactionsDataTableFilterbar :refetch="refetch" :table="table" />
        </template>
      </UiDataTable>
    </UiCard>

    <div v-else-if="isError">
      <UiErrorMessage :retry="refetch" :title="$t('something_went_wrong')" />
    </div>
  </div>
</template>
