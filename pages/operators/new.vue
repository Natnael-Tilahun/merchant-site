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
import { newEmployeeFormSchema } from "~/validations/newEmployeeFormSchema";
const { createEmployee } = useEmployees();
const { getBranches } = useBranches();

const isError = ref(false);
const data = ref<Employee>();
const isSubmitting = ref(false);
const isLoading = ref(false);
const branchData = ref<Branch[]>([]);
type OperatorRole = "ADMIN" | "MANAGER" | "ATTENDANT" | "SUPERVISOR" | "NONE";
const operatorRoleData = ref<OperatorRole[]>([
  "ADMIN",
  "MANAGER",
  "ATTENDANT",
  "SUPERVISOR",
  "NONE",
]);

const form = useForm({
  validationSchema: newEmployeeFormSchema,
});

try {
  isLoading.value = true;
  branchData.value = await getBranches();
} catch (error) {
  console.error("Getting branches error: ", error);
} finally {
  isLoading.value = false;
}

const onSubmit = form.handleSubmit(async (values: any) => {
  try {
    isSubmitting.value = true;
    const employeeData = {
      ...values,
      fullName: values.firstName + " " + values.middleName,
    };
    
    // Log the data being sent for debugging
    console.log("Sending employee data:", employeeData);
    
    data.value = await createEmployee(employeeData);
    
    if (data.value) {
      navigateTo(`/operators`);
      toast({
        title: "Operator Created",
        description: "Operator created successfully",
      });
    }
  } catch (err: any) {
    // The error will already be handled by handleApiError
    // console.error("Error creating new operator:", err);
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
        {{ $t("create_new_operator") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("create_new_operator_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>{{ $t("first_name") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_first_name')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="middleName">
              <FormItem>
                <FormLabel>{{ $t("middle_name") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_middle_name')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>{{ $t("username") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_username')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>{{ $t("password") }} </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    :placeholder="$t('enter_password')"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="operatorRole">
              <FormItem>
                <FormLabel>{{ $t("operator_role") }} </FormLabel>

                <UiSelect v-bind="componentField">
                  <FormControl>
                    <UiSelectTrigger>
                      <UiSelectValue
                        :placeholder="$t('select_operator_role')"
                      />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="role in operatorRoleData"
                        :key="role"
                        :value="role"
                      >
                        {{ role }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="branchId">
              <FormItem>
                <FormLabel>{{ $t("operator_branch") }} </FormLabel>

                <UiSelect v-bind="componentField">
                  <FormControl>
                    <UiSelectTrigger>
                      <UiSelectValue :placeholder="$t('select_branch')" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="branch in branchData"
                        :key="branch.merchantBranchId"
                        :value="branch.merchantBranchId"
                      >
                        {{ branch.branchName }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
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
