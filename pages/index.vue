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

const branchNumber = computed(() => branchData.value.length);
const employeeNumber = computed(() => employeeData.value.length);
const totalTransactionAmount = computed(() =>
  transactionData.value.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )
);

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
          <UiCardTitle class="text-sm font-medium">
            {{ $t("transactions") }}
          </UiCardTitle>
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
