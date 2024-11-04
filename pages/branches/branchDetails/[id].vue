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
import { updateBranchFormSchema } from "~/validations/updateBranchFormSchema";
const route = useRoute();
const { updateBranch, getBranchById } = useBranches();
const isError = ref(false);
const data = ref<Branch>();
const isSubmitting = ref(false);
const isLoading = ref(false);
const fullPath = ref(route.fullPath);
const pathSegments = ref([]);
const branchId = ref<string>("");

pathSegments.value = splitPath(fullPath.value);
const pathLength = pathSegments.value.length;
branchId.value = pathSegments.value[pathLength - 1];

function splitPath(path: any) {
  return path.split("/").filter(Boolean);
}

const form = useForm({
  validationSchema: updateBranchFormSchema,
});

try {
  isLoading.value = true;
  data.value = await getBranchById(branchId.value);
  form.setValues({
    ...data.value,
    city: data.value.address.city,
    businessEmail: data.value.address.businessEmail,
    postalNumber: data.value.address.postalNumber,
  });
} catch (error) {
  console.error("Getting branch error: ", error);
} finally {
  isLoading.value = false;
}

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
    data.value = await updateBranch(branchId.value, branchData); // Call your API function to fetch profile
    console.log("Branch data; ", data.value);
    toast({
      title: "Branch Updated",
      description: "Branch updated successfully",
    });
  } catch (err: any) {
    console.error("Error updating branch:", err.message);
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
        {{ $t("update_branch") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("update_branch_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="merchantBranchId">
              <FormItem>
                <FormLabel>{{ $t("merchant_branch_id") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    disabled
                    :placeholder="$t('enter_merchant_branch_id')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
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

                {{ $t("update") }}
              </UiButton>
            </div>
          </div>
        </form>
      </div>
    </UiCard>
  </div>
</template>
