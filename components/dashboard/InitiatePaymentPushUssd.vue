<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { initiatePaymentPushUssdFormSchema } from "~/validations/initiatePaymentPushUssdFormSchema.js";
import { defineProps } from "vue";
import { Toast, ToastAction, useToast } from "~/components/ui/toast";

const isLoading = ref(false);
const { sendPushUssd } = usePayment();
const { toast } = useToast();

const form = useForm({
  validationSchema: initiatePaymentPushUssdFormSchema,
});

// Define props
const props = defineProps(["merchantTransactionId"]);

const onSubmit = form.handleSubmit(async (values: any) => {
  isLoading.value = true;
  const transactionData = {
    merchantTransactionId: props.merchantTransactionId,
    customerPhone: values.customerPhone,
  };

  try {
    const data = await sendPushUssd(transactionData);
    if(data){
      toast({
        title: "Push USSD sent successfully.",
        variant: "default",
      });
      navigateTo("/", { replace: true });
    }
  } catch (error) {
    console.error("Login error: ", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <UiCard :class="['w-full h-full p-6', $props.class].join(' ')">
    <form @submit="onSubmit">
      <div class="flex flex-col justify-betwee h-full gap-4 md:gap-6">
        <div class="md:space-y-6 space-y-4">
          <p class="font-semibold text-xl text-center">
            {{ $t("send_push_ussd") }}
          </p>
          <FormField v-slot="{ componentField }" name="customerPhone">
            <FormItem>
              <FormLabel>{{ $t("phone_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  class="h-10"
                  placeholder="0911111111"
                  v-bind="componentField"
                  :disabled="isLoading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <UiButton
          class="hover:bg-fuchsia-800 text-base font-medium w-full"
          :disabled="isLoading"
        >
          <Icon
            name="svg-spinners:8-dots-rotate"
            v-if="isLoading"
            class="mr-2 h-4 w-4 animate-spin"
          ></Icon>

          {{ $t("send_push_ussd") }}
        </UiButton>
      </div>
    </form>
  </UiCard>
</template>
