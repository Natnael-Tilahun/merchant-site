<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton";

const route = useRoute();

const { getBranches } = useBranches();
const { getEmployees } = useEmployees();
const { getTransactions } = useTransactions();

const isLoading = ref(true);
const branchData = ref<Branch[]>([]);
const employeeData = ref<Employee[]>([]);
const transactionData = ref<Transaction[]>([]);
const transactionFilterStore = useTransactionFilterStore();
const currentPaymentSummaryOption = ref("Daily");
const transactionsNumber = ref();
const todaysTransactions = ref<Transaction[]>([]);

const branchNumber = computed(() => branchData.value.length);
const employeeNumber = computed(() => employeeData.value.length);

const paymentSummaryOptions = computed(() => [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
]);


// const totalTransactionAmount = computed(() =>
//   transactionData.value.reduce(
//     (sum, transaction) => sum + transaction.amount,
//     0
//   )
// );

try {
  transactionFilterStore.$reset();
  [branchData.value, employeeData.value, transactionData.value] =
    await Promise.all([
      getBranches(),
      getEmployees(),
      getTransactions(
        "COMPLETED",
        "0",
        "10000",
        "DESC",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ),
    ]);
    todaysTransactions.value = transactionData.value.filter((transaction) => {
    const transactionDate = new Date(transaction.expirationDate); // Assuming 'date' is the field for transaction date
    const today = new Date();
    return (
      transactionDate.getDate() === today.getDate() &&
      transactionDate.getMonth() === today.getMonth() &&
      transactionDate.getFullYear() === today.getFullYear()
    );
  });
  transactionsNumber.value = todaysTransactions.value.length;
} catch (error) {
  console.error("Error fetching data:", error);
} finally {
  isLoading.value = false;
}

watch(
  transactionData,
  (newData) => {
    console.log("Transaction Data in index.vue:", newData);
  },
  { immediate: true }
);

const totalTransactionAmount = computed(() => {
  const today = new Date();
  let startOfPeriod = new Date();
  let endOfPeriod = new Date();

  switch (currentPaymentSummaryOption.value) {
    case "Daily":
      transactionsNumber.value = todaysTransactions.value.length;
      return todaysTransactions.value.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
    case "Weekly":
      // Set to start of week (Sunday)
      startOfPeriod.setDate(today.getDate() - today.getDay());
      startOfPeriod.setHours(0, 0, 0, 0);
      // Set to end of week (Saturday 23:59:59)
      endOfPeriod = new Date(startOfPeriod);
      endOfPeriod.setDate(startOfPeriod.getDate() + 6);
      endOfPeriod.setHours(23, 59, 59, 999);
      break;
    case "Monthly":
      // Start of month
      startOfPeriod = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
      // End of month
      endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "Yearly":
      // Start of year
      startOfPeriod = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
      // End of year
      endOfPeriod = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      return 0; // Fallback
  }
  // Filter transactions based on the selected period
  const filteredTransactions = transactionData.value.filter((transaction) => {
    const transactionDate = new Date(transaction.expirationDate);
    return transactionDate >= startOfPeriod && transactionDate <= endOfPeriod;
  });
  transactionsNumber.value = filteredTransactions.length;
  return filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
});
</script>

<template>
  <div class="lg:space-y-16 md:space-y-10 space-y-6 dark:bg-gray-900">
    <div
      class="grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      v-if="isLoading"
    >
      <div class="h-32 flex flex-col gap-4 shadow-md rounded-3xl p-8">
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
        <UiSkeleton class="h-32 w-10 bg-slate-300" />
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
      </div>
      <div class="h-32 flex flex-col gap-4 shadow-md rounded-3xl p-8">
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
        <UiSkeleton class="h-32 w-10 bg-slate-300" />
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
      </div>
      <div class="h-32 flex flex-col gap-4 shadow-md rounded-3xl p-8">
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
        <UiSkeleton class="h-32 w-10 bg-slate-300" />
        <UiSkeleton class="h-32 w-20 bg-slate-300" />
      </div>
    </div>
    <div
      v-else
      class="grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <UiCard class="shadow-md rounded-3xl dark:bg-gray-800">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium">
            {{ $t("branches") }}
          </UiCardTitle>
          <Icon
            name="material-symbols:home"
            size="18"
            class="text-muted-foreground"
          ></Icon>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+{{ branchNumber }}</div>
          <p class="text-xs text-muted-foreground">
            +10.1% {{ $t("from_last_month") }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard class="shadow-md rounded-3xl dark:bg-gray-800">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium">
            {{ $t("operators") }}
          </UiCardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+{{ employeeNumber }}</div>
          <p class="text-xs text-muted-foreground">
            +19% {{ $t("from_last_month") }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard class="shadow-md rounded-3xl dark:bg-gray-800">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
        <!-- <div> -->

        <UiCardTitle class="font-semibold text-base"
            >My {{ currentPaymentSummaryOption }} {{ $t("transactions") }}</UiCardTitle
          >

          <UiSelect name="paymentStatus" v-model="currentPaymentSummaryOption">
            <UiSelectTrigger
              class="h-8 w-[100px] z-10 border border-muted-foreground/30"
            >
              <UiSelectValue :placeholder="`${currentPaymentSummaryOption}`" />
            </UiSelectTrigger>
            <UiSelectContent side="bottom">
              <UiSelectItem
                v-for="option in paymentSummaryOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        <!-- </div> -->

          <!-- <UiCardTitle class="text-sm font-medium">
            {{ $t("transactions") }}
          </UiCardTitle> -->
          
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg> -->
        </UiCardHeader>
        <UiCardContent class="flex justify-between">
          <div class="flex flex-col">
            <div class="text-2xl font-bold">
              {{
                isLoading
                  ? "Loading..."
                  : `${totalTransactionAmount.toFixed(2)} ${$t("birr")}`
              }}
            </div>
            <p class="text-xs text-muted-foreground">
              {{ $t("total_transaction_amount") }}
            </p>
          </div>
          <NuxtLink to="/transactions/initiate" class="w-fit self-end">
            <UiButton
              size="sm"
              variant="outline"
              class="w-fit self-end px-4 font-bold text-base rounded-full bg-primary text-background"
            >
              <Icon name="material-symbols:add" size="28" class="mr-"></Icon>
              {{ $t("new") }}
            </UiButton>
          </NuxtLink>
        </UiCardContent>
      </UiCard>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <UiCard class="col-span-4 shadow-md rounded-xl dark:bg-gray-800">
        <UiCardHeader>
          <UiCardTitle>
            {{ $t("overview") }}
          </UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="pl-2">
          <DashboardOverview :transactionData="transactionData" />
        </UiCardContent>
      </UiCard>
      <UiCard class="col-span-3 shadow-md rounded-xl dark:bg-gray-800">
        <UiCardHeader>
          <div class="flex justify-between w-full items-center">
            <div class="space-y-1">
              <UiCardTitle>{{ $t("recent_sales") }}</UiCardTitle>
              <UiCardDescription class="text-xs">
                {{ $t("recent_5_transactions") }}
              </UiCardDescription>
            </div>
            <NuxtLink
              class="text-primary text-sm md:text-base"
              to="/transactions"
            >
              {{ $t("view_all") }}
            </NuxtLink>
          </div>
        </UiCardHeader>

        <UiCardContent>
          <DashboardRecentSales :transactionData="transactionData" />
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
