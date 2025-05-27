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
import { updateEmployeeFormSchema } from "~/validations/updateEmployeeFormSchema";
const route = useRoute();
const { getEmployeeById, updateEmployee } = useEmployees();
const { getBranches } = useBranches();

const isError = ref(false);
const data = ref<Employee>();
const isSubmitting = ref(false);
const isLoading = ref(false);
const fullPath = ref(route.fullPath);
const pathSegments = ref([]);
const employeeId = ref<string>("");
const branchData = ref<Branch[]>([]);
type OperatorRole = "ADMIN" | "MANAGER" | "ATTENDANT" | "SUPERVISOR" | "NONE";

const operatorRoleData = ref<OperatorRole[]>([
  "ADMIN",
  "MANAGER",
  "ATTENDANT",
  "SUPERVISOR",
  "NONE",
]);

pathSegments.value = splitPath(fullPath.value);
const pathLength = pathSegments.value.length;
employeeId.value = pathSegments.value[pathLength - 1];

function splitPath(path: any) {
  return path.split("/").filter(Boolean);
}

const form = useForm({
  validationSchema: updateEmployeeFormSchema,
});

try {
  isLoading.value = true;
  branchData.value = await getBranches();
} catch (error) {
  console.error("Getting branches error: ", error);
} finally {
  isLoading.value = false;
}

try {
  isLoading.value = true;
  data.value = await getEmployeeById(employeeId.value);
  form.setValues({
    ...data.value,
    merchantBranchId: data.value.merchantBranch?.merchantBranchId,
    operatorRole: data.value?.operatorRole.toString(),
  });
} catch (error) {
  console.error("Getting operators error: ", error);
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
    const response = await updateEmployee(employeeId.value, employeeData); // Call your API function to fetch profile
    if (response) {
      data.value = response
      toast({
        title: "Operator Updated",
        description: "Operator updated successfully",
      });
    }

  }
  catch (err: any) {
    console.log("Error updating operator:", err.message);
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
        {{ $t("update_operator") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("update_operator_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="merchantOperatorId">
              <FormItem>
                <FormLabel>{{ $t("merchant_employee_id") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" disabled :placeholder="$t('enter_merchant_employee_id')"
                    v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>{{ $t("first_name") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" :placeholder="$t('enter_first_name')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="middleName">
              <FormItem>
                <FormLabel>{{ $t("middle_name") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" :placeholder="$t('enter_middle_name')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="operatorCode">
              <FormItem>
                <FormLabel>{{ $t("operator_code") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" :placeholder="$t('operator_code')" v-bind="componentField" />
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
                      <UiSelectValue :placeholder="$t('select_operator_role')" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem v-for="role in operatorRoleData" :key="role" :value="role">
                        {{ role }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="merchantBranchId">
              <FormItem>
                <FormLabel>{{ $t("branch") }} </FormLabel>
                <UiSelect v-bind="componentField">
                  <FormControl>
                    <UiSelectTrigger>
                      <UiSelectValue :placeholder="$t('select_branch')" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem v-for="branch in branchData" :key="branch.merchantBranchId"
                        :value="branch.merchantBranchId">
                        {{ branch.branchName }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="col-span-full w-full py-4 flex justify-between">
              <UiButton :disabled="isSubmitting" variant="outline" type="button" @click="$router.go(-1)">
                {{ $t("cancel") }}
              </UiButton>
              <UiButton :disabled="isSubmitting" type="submit">
                <Icon name="svg-spinners:8-dots-rotate" v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin"></Icon>

                {{ $t("update") }}
              </UiButton>
            </div>
          </div>
        </form>
      </div>
    </UiCard>
  </div>
</template>
