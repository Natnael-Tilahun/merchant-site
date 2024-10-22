<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { initiatePaymentFormSchema } from "~/validations/initiatePaymentFormSchema.js";

const isLoading = ref(false);
const paymentResponse = ref<Transaction | null>(null);
const { generateQRCode } = usePayment();

const form = useForm({
  validationSchema: initiatePaymentFormSchema,
});

const onSubmit = form.handleSubmit(async (values: any) => {
  isLoading.value = true;
  try {
    const data = await generateQRCode(values);
    paymentResponse.value = data;
  } catch (error) {
    console.error("Login error: ", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form class="w-full" @submit="onSubmit">
    <div class="grid gap-2">
      <FormField v-slot="{ componentField }" name="amount">
        <FormItem>
          <FormLabel> Amount</FormLabel>
          <FormControl>
            <UiInput
              type="text"
              class="h-8"
              placeholder="100012345678"
              v-bind="componentField"
              :disabled="isLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="paymentReference">
        <FormItem>
          <FormLabel> Payment Reference</FormLabel>
          <FormControl>
            <UiInput
              type="text"
              class="h-8"
              placeholder="100012345678"
              v-bind="componentField"
              :disabled="isLoading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <UiButton
        class="hover:bg-fuchsia-700 font-medium w-full text-sm xl:text-base mt-2 lg:mt-0"
        :disabled="isLoading"
      >
        <Icon
          name="svg-spinners:8-dots-rotate"
          v-if="isLoading"
          class="h-4 w-4 animate-spin"
        ></Icon>

        Generate QR Code
      </UiButton>
    </div>
  </form>
</template>
