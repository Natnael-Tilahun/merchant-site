<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useTransactions } from "~/composables/useTransactions";
import { toast } from "~/components/ui/toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const { generateQRCode } = usePayment();
const isLoading = ref(false);
const paymentResponse = ref<Transaction | null>(null);
const showQRCode = ref(false);
const formSchema = toTypedSchema(
  z.object({
    amount: z.number().min(0),
    paymentReference: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values: any) => {
  isLoading.value = true;
  try {
    const data = await generateQRCode(values);
    paymentResponse.value = data;
    showQRCode.value = true;
    form.resetForm();
  } catch (error) {
    console.error("Login error: ", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">Initiate Transaction</h1>
      <p class="text-sm text-muted-foreground">Create a new transaction</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
      <UiCard
        class="p-6 w-full h-full"
        :class="
          !showQRCode
            ? 'w-full col-span-2 '
            : 'col-span-1 md:col-span-2 lg:col-span-1'
        "
      >
        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="amount">
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <UiInput
                  type="number"
                  placeholder="Enter amount"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="paymentReference">
            <FormItem>
              <FormLabel>Payment Reference</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter payment reference"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <UiButton type="submit" :disabled="isLoading">
            {{ isLoading ? "Initiating..." : "Initiate Transaction" }}
          </UiButton>
        </form>
      </UiCard>
      <DashboardInitTransactionDetail
        v-if="showQRCode"
        :data="paymentResponse"
        class="col-span-2"
      />
    </div>
  </div>
</template>
