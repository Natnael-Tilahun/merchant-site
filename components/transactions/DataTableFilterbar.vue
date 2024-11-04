<script setup lang="ts">
import { type Table } from "@tanstack/vue-table";
import { CalendarIcon } from "lucide-vue-next";
import DataTableViewOptions from "~/components/ui/dataTable/ViewOptions.vue";
// import { type Task } from "../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const props = defineProps<
  DataTableToolbarProps<any> & { refetch: () => void }
>();
const showOtherFilteration = ref(false);
const transactionFilterStore = useTransactionFilterStore();
const branchesStore = useBranchesStore();
const operatorsStore = useOperatorsStore();
const paymentStatusOptions = computed(() => [
  "NONE",
  "PENDING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
]);

const paymentInitiatorOptions = computed(() => [
  "NONE",
  "MERCHANT_INITIATED",
  "MERCHANT_OPERATOR_INITIATED",
  "PAYER_INITIATED",
]);

const clearFilter = () => {
  transactionFilterStore.$reset();
  props.refetch();
};
// const isFiltered = computed(
//   () => props.table.getState().columnFilters.length > 0
// );
</script>

<template>
  <UiPopover
    class="flex pt-10 gap-6 w-full mb-8 h-full overflow-y-scroll border-8 border-primary justify-between space-y-4"
  >
    <div class="flex items-center flex-wra self-start gap-4">
      <UiInput
        :placeholder="$t('filter_by_payer_name')"
        v-model="transactionFilterStore.payerName"
        class="h-10 min-w-[150px] md:min-w-[200px] lg:min-w-[350px] w-fit rounded-full px-4"
        @keydown.enter="refetch"
      />
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          class="text-base text-primary cursor-pointer flex items-center gap-2 font-medium border border-primary rounded-full px-2 py-1"
        >
          <Icon
            name="material-symbols:filter-list"
            class="h-6 w-6 text-primary"
          ></Icon>
          {{ $t("advanced_filter") }}
        </UiButton>
      </UiPopoverTrigger>

      <DataTableViewOptions :table="table" />
    </div>

    <UiPopoverContent class="space-y-5 rounded-xl w-full lg:p-6">
      <h1 class="lg:text-3xl md:text-2xl text-xl text-left font-medium">
        {{ $t("advanced_search") }}
      </h1>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full flex-wrap gap-x-6 gap-y-4"
      >
        <div class="space-y-1">
          <label for="payerAccountNumber" class="text-sm">{{
            $t("payer_account_number")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_payer_account_number')"
            v-model="transactionFilterStore.payerAccountNumber"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="payerPhone" class="text-sm">{{
            $t("payer_phone_number")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_payer_phone_number')"
            v-model="transactionFilterStore.payerPhone"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="payerId" class="text-sm">{{ $t("payer_id") }}</label>
          <UiInput
            :placeholder="$t('filter_by_payer_id')"
            v-model="transactionFilterStore.payerId"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="amountGreaterThanOrEqual" class="text-sm">{{
            $t("amount_greater_than_or_equal")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_amount_greater_than_or_equal')"
            v-model="transactionFilterStore.amountGreaterThanOrEqual"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="amountLessThanOrEqual" class="text-sm">{{
            $t("amount_less_than_or_equal")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_amount_less_than_or_equal')"
            v-model="transactionFilterStore.amountLessThanOrEqual"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="paymentReference" class="text-sm">{{
            $t("payment_reference")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_payment_reference')"
            v-model="transactionFilterStore.paymentReference"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="dynamicId" class="text-sm">{{ $t("dynamic_id") }}</label>
          <UiInput
            :placeholder="$t('filter_by_dynamic_id')"
            v-model="transactionFilterStore.dynamicId"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="mbTransactionId" class="text-sm">{{
            $t("mobile_banking_transaction_id")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_mobile_banking_transaction_id')"
            v-model="transactionFilterStore.mbTransactionId"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="coreTransactionId" class="text-sm">{{
            $t("core_transaction_id")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_core_transaction_id')"
            v-model="transactionFilterStore.coreTransactionId"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="merchantAccountNumber" class="text-sm">{{
            $t("merchant_account_number")
          }}</label>
          <UiInput
            :placeholder="$t('filter_by_merchant_account_number')"
            v-model="transactionFilterStore.merchantAccountNumber"
            class="h-10 min-w-[250px] w-full"
            @keydown.enter="refetch"
          />
        </div>

        <div class="space-y-1">
          <label for="paymentStatus" class="text-sm">{{
            $t("payment_status")
          }}</label>
          <UiSelect
            name="paymentStatus"
            v-model="transactionFilterStore.paymentStatus"
            @update:model-value="() => refetch()"
          >
            <UiSelectTrigger class="h-10 min-w-[150px] w-full">
              <UiSelectValue :placeholder="$t('filter_by_payment_status')" />
            </UiSelectTrigger>
            <UiSelectContent side="bottom">
              <UiSelectItem
                v-for="status in paymentStatusOptions"
                :key="status"
                :value="status"
              >
                {{ status }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <div class="space-y-1">
          <label for="paymentInitiator" class="text-sm">{{
            $t("payment_initiator")
          }}</label>
          <UiSelect
            name="paymentInitiator"
            v-model="transactionFilterStore.transactionInitiator"
            @update:model-value="() => refetch()"
          >
            <UiSelectTrigger class="h-10 w-full min-w-[150px]">
              <UiSelectValue :placeholder="$t('filter_by_payment_initiator')" />
            </UiSelectTrigger>
            <UiSelectContent side="bottom">
              <UiSelectItem
                v-for="initiator in paymentInitiatorOptions"
                :key="initiator"
                :value="initiator"
              >
                {{ initiator }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <div class="space-y-1">
          <label for="branch" class="text-sm">{{ $t("branch") }}</label>
          <UiSelect
            name="branch"
            v-model="transactionFilterStore.merchantBranchId"
            @update:model-value="() => refetch()"
          >
            <UiSelectTrigger class="h-10 min-w-[150px] w-full">
              <UiSelectValue :placeholder="$t('filter_by_branch')" />
            </UiSelectTrigger>
            <UiSelectContent side="bottom">
              <UiSelectItem
                v-for="branch in branchesStore.branches"
                :key="branch.merchantBranchId"
                :value="branch.merchantBranchId"
              >
                {{ branch.branchName }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <div class="space-y-1">
          <label for="operator" class="text-sm">{{ $t("operator") }}</label>
          <UiSelect
            name="operator"
            v-model="transactionFilterStore.merchantOperatorId"
            @update:model-value="() => refetch()"
          >
            <UiSelectTrigger class="h-10 min-w-[150px] w-full">
              <UiSelectValue :placeholder="$t('filter_by_operator')" />
            </UiSelectTrigger>
            <UiSelectContent side="bottom">
              <UiSelectItem
                v-for="operator in operatorsStore.operators"
                :key="operator.merchantOperatorId"
                :value="operator.merchantOperatorId"
              >
                {{ operator.fullName }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <div class="space-y-1">
          <label for="initiatedDate" class="text-sm">{{
            $t("initiated_date")
          }}</label>
          <UiPopover>
            <UiPopoverTrigger asChild>
              <UiButton
                variant="outline"
                class="h-10 min-w-[150px] w-full text-left font-normal flex items-center gap-2 justify-between"
              >
                {{
                  transactionFilterStore.initiatedDate
                    ? new Date(
                        transactionFilterStore.initiatedDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : $t("pick_a_date")
                }}
                <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent className="w-auto p-0">
              <UiCalendar
                mode="single"
                v-model="transactionFilterStore.initiatedDate"
                @update:model-value="(value: string) => { transactionFilterStore.initiatedDate = new Date(value).toISOString(); refetch(); }"
                className="rounded-md border"
              />
            </UiPopoverContent>
          </UiPopover>
        </div>

        <div class="space-y-1">
          <label for="completedDate" class="text-sm">{{
            $t("completed_date")
          }}</label>
          <UiPopover>
            <UiPopoverTrigger asChild>
              <UiButton
                variant="outline"
                class="h-10 min-w-[150px] w-full text-left font-normal flex items-center gap-2 justify-between"
              >
                {{
                  transactionFilterStore.completedDate
                    ? new Date(
                        transactionFilterStore.completedDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : $t("pick_a_date")
                }}
                <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent className="w-auto p-0">
              <UiCalendar
                mode="single"
                v-model="transactionFilterStore.completedDate"
                @update:model-value="(value: string) => { transactionFilterStore.completedDate = new Date(value).toISOString(); refetch(); }"
                className="rounded-md border"
              />
            </UiPopoverContent>
          </UiPopover>
        </div>

        <div class="space-y-1">
          <label for="expirationDate" class="text-sm">{{
            $t("expiration_date")
          }}</label>
          <UiPopover>
            <UiPopoverTrigger asChild>
              <UiButton
                variant="outline"
                class="h-10 min-w-[150px] w-full text-left font-normal flex items-center gap-2 justify-between"
              >
                {{
                  transactionFilterStore.expirationDate
                    ? new Date(
                        transactionFilterStore.expirationDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : $t("pick_a_date")
                }}
                <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent className="w-auto p-0">
              <UiCalendar
                mode="single"
                v-model="transactionFilterStore.expirationDate"
                @update:model-value="(value: string) => { transactionFilterStore.expirationDate = new Date(value).toISOString(); refetch(); }"
                className="rounded-md border"
              />
            </UiPopoverContent>
          </UiPopover>
        </div>

        <div class="flex items-center gap-6 w-full justify-end col-span-full">
          <UiButton variant="outline" @click="clearFilter">{{
            $t("clear")
          }}</UiButton>
          <UiButton @click="refetch">{{ $t("apply") }}</UiButton>
        </div>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
