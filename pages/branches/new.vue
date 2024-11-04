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
import { newBranchFormSchema } from "~/validations/newBranchFormSchema";
const { createBranch } = useBranches();
const isError = ref(false);
const data = ref<Branch>();
const isSubmitting = ref(false);

const form = useForm({
  validationSchema: newBranchFormSchema,
});

const onSubmit = form.handleSubmit(async (values: any) => {
  try {
    isSubmitting.value = true;
    const branchData = {
      ...values,
      address: {
        city: values.city,
        businessEmail: values.businessEmail,
        postalNumber: values.postalNumber,
      },
    };
    data.value = await createBranch(branchData); // Call your API function to fetch profile
    navigateTo(`/branches`);
    console.log("New branch data; ", data.value);
    toast({
      title: "Branch Created",
      description: "Branch created successfully",
    });
  } catch (err: any) {
    console.error("Error creating new branch:", err.message);
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">
        {{ $t("create_new_branch") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("create_new_branch_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="branchName">
              <FormItem>
                <FormLabel>{{ $t("branch_name") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_branch_name')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="branchCode">
              <FormItem>
                <FormLabel>{{ $t("branch_code") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_branch_code')"
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
