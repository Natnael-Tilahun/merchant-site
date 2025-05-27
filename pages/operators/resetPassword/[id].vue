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
import { resetEmployeePasswordFormSchema } from "~/validations/resetEmployeePasswordFormSchema";
const route = useRoute();
const { resetEmployeePassword } = useEmployees();

const isError = ref(false);
const data = ref<Employee | null>();
const isSubmitting = ref(false);
const fullPath = ref(route.fullPath);
const pathSegments = ref([]);
const employeeId = ref<string>("");

pathSegments.value = splitPath(fullPath.value);
const pathLength = pathSegments.value.length;
employeeId.value = pathSegments.value[pathLength - 1];

function splitPath(path: any) {
  return path.split("/").filter(Boolean);
}

const form = useForm({
  validationSchema: resetEmployeePasswordFormSchema,
});

const onSubmit = form.handleSubmit(async (values: any) => {
  try {
    isSubmitting.value = true;
    data.value = await resetEmployeePassword(
      employeeId.value,
      values.newPassword
    );
    if (data.value) {
      toast({
        title: "Operator password resetted.",
        description: "Operator password resetted successfully",
      });
      navigateTo("/operators");
    }
  } catch (err: any) {
    console.error("Error resetting operator password:", err.message);
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
        {{ $t("reset_operator_password") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("reset_operator_password_description") }}
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" :value="employeeId" name="merchantOperatorId">
              <FormItem>
                <FormLabel>{{ $t("merchant_operator_id") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" disabled class="border-2 bg-muted dark:border-gray-700 dark:bg-gray-600"
                    :placeholder="$t('enter_merchant_operator_id')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="newPassword">
              <FormItem>
                <FormLabel>{{ $t("new_password") }} </FormLabel>
                <FormControl>
                  <UiInput type="text" :placeholder="$t('enter_new_password')" v-bind="componentField" />
                </FormControl>
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
