<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "~/validations/profileFormSchema";
import { toast } from "~/components/ui/toast";
import { format } from "date-fns";

const { getProfile, updateProfile } = useMerchants();
const isError = ref(false);
const data = ref<Merchant>();
const isSubmitting = ref(false);
const isLoading = ref(false);

const form = useForm({
  validationSchema: profileFormSchema,
});

// Function to format date to YYYY-MM-DD
const formatDate = (date: string | Date): string => {
  return format(new Date(date), "yyyy-MM-dd");
};

try {
  isLoading.value = true;
  data.value = await getProfile(); // Call your API function to fetch profile
  console.log("Profile data; ", data.value);
  form.setValues({
    ...data.value,
    tradeLicenseIssueDate: formatDate(data.value.tradeLicenseIssueDate),
    tradeLicenseExpiryDate: formatDate(data.value.tradeLicenseExpiryDate),
    taxPayerIssueDate: formatDate(data.value.taxPayerIssueDate),
    taxPayerExpiryDate: formatDate(data.value.taxPayerExpiryDate),
  });

  form.setFieldValue("defaultPaymentReceivingAccountNumber", parseInt(data.value?.defaultPaymentReceivingAccountNumber))
  form.setFieldValue("city", data.value?.address?.city);
  form.setFieldValue("businessEmail", data.value?.address?.businessEmail);
  form.setFieldValue("postalNumber", data.value?.address?.postalNumber);
} catch (error) {
  console.error("Error fetching profile:", error);
  toast({
    title: "Uh oh! Something went wrong.",
    description: `There was a problem with your request: ${error}`,
    variant: "destructive",
  });
} finally {
  isLoading.value = false;
}

const onSubmit = form.handleSubmit(async (values: any) => {
  const merchantData = {
    ...values,
    tradeLicenseIssueDate: new Date(values.tradeLicenseIssueDate).toISOString(),
    tradeLicenseExpiryDate: new Date(
      values.tradeLicenseExpiryDate
    ).toISOString(),
    taxPayerIssueDate: new Date(values.taxPayerIssueDate).toISOString(),
    taxPayerExpiryDate: new Date(values.taxPayerExpiryDate).toISOString(),
  };

  try {
    isSubmitting.value = true;
    const response = await updateProfile(merchantData); // Call your API function to fetch profile
    if(response){
      data.value = response
    toast({
      title: "Merchant Updated",
      description: "Merchant profile updated successfully",
    });
  }
  } catch (err: any) {
    console.error("Error updating merchant profile:", err.message);
    toast({
      title: "Merchant Update Error",
      variant: "destructive",
      description: err.message,
    });
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">{{ $t("profile") }}</h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("update_your_profile") }}
      </p>
    </div>

    <UiCard class="p-6 space-y-8" v-if="isLoading">
      <div class="grid grid-cols-2 gap-8">
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
      </div>
      <div class="w-full flex justify-between">
        <UiSkeleton class="h-16 w-1/5" />
        <UiSkeleton class="h-16 w-1/5" />
      </div>
    </UiCard>

    <UiCard v-else class="p-6">
      <form @submit="onSubmit">
        <div class="grid md:grid-cols-2 gap-6">
          <FormField v-slot="{ componentField }" name="merchantId">
            <FormItem>
              <FormLabel>{{ $t("merchant_id") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  disabled
                  :placeholder="$t('enter_merchant_id')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessName">
            <FormItem>
              <FormLabel>{{ $t("business_name") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_business_name')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessPhoneNumber">
            <FormItem>
              <FormLabel>{{ $t("business_phone_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_business_phone_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessNumber">
            <FormItem>
              <FormLabel>{{ $t("business_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_business_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessType">
            <FormItem>
              <FormLabel>{{ $t("business_type") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_business_type')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel>{{ $t("city") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_city')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessEmail">
            <FormItem>
              <FormLabel>{{ $t("business_email") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_business_email')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="merchantLevel">
            <FormItem>
              <FormLabel>{{ $t("merchant_Level") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('merchant_Level')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>{{ $t("status") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('status')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="postalNumber">
            <FormItem>
              <FormLabel>{{ $t("postal_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_postal_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="shortCode">
            <FormItem>
              <FormLabel>{{ $t("short_code") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_short_code')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="defaultPaymentReceivingAccountNumber">
            <FormItem>
              <FormLabel>{{ $t("default_Payment_Receiving_Account_Number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="number"
                  :placeholder="$t('default_Payment_Receiving_Account_Number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="faxNumber">
            <FormItem>
              <FormLabel>{{ $t("fax_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_fax_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseNumber">
            <FormItem>
              <FormLabel>{{ $t("trade_license_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_trade_license_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseIssueDate">
            <FormItem>
              <FormLabel>{{ $t("trade_license_issue_date") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  :placeholder="$t('enter_trade_license_issue_date')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseExpiryDate">
            <FormItem>
              <FormLabel>{{ $t("trade_license_expiry_date") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  :placeholder="$t('enter_trade_license_expiry_date')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerIdNumber">
            <FormItem>
              <FormLabel>{{ $t("tax_payer_id_number") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  :placeholder="$t('enter_tax_payer_id_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerIssueDate">
            <FormItem>
              <FormLabel>{{ $t("tax_payer_issue_date") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  :placeholder="$t('enter_tax_payer_issue_date')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerExpiryDate">
            <FormItem>
              <FormLabel>{{ $t("tax_payer_expiry_date") }}</FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  :placeholder="$t('enter_tax_payer_expiry_date')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="col-span-full w-full py-4 flex justify-between">
            <UiButton
              :disabled="isSubmitting"
              variant="outline"
              type="button"
              @click="$router.go(-1)"
            >
              {{ $t("cancel") }}
            </UiButton>
            <UiButton :disabled="isSubmitting" type="submit">
              <Icon
                name="svg-spinners:8-dots-rotate"
                v-if="isSubmitting"
                class="mr-2 h-4 w-4 animate-spin"
              ></Icon>

              {{ $t("submit") }}
            </UiButton>
          </div>
        </div>
      </form>
    </UiCard>
  </div>
</template>
