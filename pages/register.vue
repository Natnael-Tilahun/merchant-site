<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ref } from "vue";
import { toast } from "~/components/ui/toast";
import { newMerchantFormSchema } from "~/validations/newMerchantFormSchema";
const { createNeweMerchant } = useMerchants();
const isError = ref(false);
const data = ref<Merchant>();
const isSubmitting = ref(false);

definePageMeta({
  layout: false,
});

const form = useForm({
  validationSchema: newMerchantFormSchema,
});

const onSubmit = form.handleSubmit(async (values: any) => {
  try {
    isSubmitting.value = true;
    data.value = await createNeweMerchant(values); // Call your API function to fetch profile
    navigateTo(`/`);
    console.log("New Merchant data; ", data.value);
    toast({
      title: "Merchant Created",
      description: "Merchant created successfully",
    });
  } catch (err: any) {
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8 px-5 md:px-10 lg:px-20 py-10">
    <div class="">
      <h1 class="md:text-2xl text-lg font-medium">
        {{ $t("create_new_merchant_account") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("create_new_merchant_account_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="businessName">
              <FormItem>
                <FormLabel>{{ $t("business_name") }} </FormLabel>
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
                <FormLabel>{{ $t("business_phone_number") }} </FormLabel>
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
                <FormLabel>{{ $t("business_number") }} </FormLabel>
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
                <FormLabel>{{ $t("business_type") }} </FormLabel>
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
                <FormLabel>{{ $t("city") }} </FormLabel>
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
                <FormLabel>{{ $t("business_email") }} </FormLabel>
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
            <FormField v-slot="{ componentField }" name="postalNumber">
              <FormItem>
                <FormLabel>{{ $t("postal_number") }} </FormLabel>
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
                <FormLabel>{{ $t("short_code") }} </FormLabel>
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
            <FormField v-slot="{ componentField }" name="faxNumber">
              <FormItem>
                <FormLabel>{{ $t("fax_number") }} </FormLabel>
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
                <FormLabel>{{ $t("trade_license_number") }} </FormLabel>
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
                <FormLabel>{{ $t("trade_license_issue_date") }} </FormLabel>
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
            <FormField
              v-slot="{ componentField }"
              name="tradeLicenseExpiryDate"
            >
              <FormItem>
                <FormLabel>{{ $t("trade_license_expiry_date") }} </FormLabel>
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
                <FormLabel>{{ $t("tax_payer_id_number") }} </FormLabel>
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
                <FormLabel>{{ $t("tax_payer_issue_date") }} </FormLabel>
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
                <FormLabel>{{ $t("tax_payer_expiry_date") }} </FormLabel>
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
      </div>
    </UiCard>
  </div>
</template>
