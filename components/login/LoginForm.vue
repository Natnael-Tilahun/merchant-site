<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { customerLoginFormSchema } from "~/validations/customerLoginFormSchema";
const isLoading = ref<boolean>(false);
const { login } = useAuth();
let showPassword = ref(false);

const form = useForm({
  validationSchema: customerLoginFormSchema,
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = form.handleSubmit(async (values: any) => {
  isLoading.value = true;
  const userCredentials = {
    username: values.username,
    password: values.password,
  };

  try {
    await login(userCredentials);
  } catch (error) {
    console.error("Login error: ", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-3">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>
              {{ $t("username") }} {{ $t("or") }} {{ $t("email") }}
            </FormLabel>
            <FormControl>
              <UiInput
                type="text"
                :placeholder="$t('username')"
                v-bind="componentField"
                :disabled="isLoading"
                aria-autocomplete="username"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>{{ $t("password") }}</FormLabel>
            <FormControl>
              <div
                className="relative flex items-center bg-input rounded-lg pl- focus-within:ring-1 focus-within:ring-primary"
              >
                <UiInput
                  :type="[showPassword ? 'text' : 'password']"
                  placeholder="******"
                  v-bind="componentField"
                  :disabled="isLoading"
                  aria-autocomplete="password"
                />

                <Icon
                  v-if="showPassword"
                  name="material-symbols:visibility-off-rounded"
                  class="absolute flex right-0 pr-3 items-center w-8 h-8"
                  @Click="togglePasswordVisibility"
                ></Icon>
                <Icon
                  v-else
                  name="material-symbols:visibility-rounded"
                  class="absolute flex right-0 pr-3 items-center w-8 h-8"
                  @Click="togglePasswordVisibility"
                ></Icon>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end items-center pb-3">
 
          <NuxtLink
            to="/forgotPassword"
            class="text-primary text-right text-sm"
          >
            {{ $t("forgot_password") }}?
          </NuxtLink>
        </div>
        <UiButton :disabled="isLoading">
          <Icon
            v-if="isLoading"
            name="svg-spinners:8-dots-rotate"
            class="mr-2 h-4 w-4 animate-spin"
          ></Icon>

          {{ $t("sign_in") }}
        </UiButton>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> Or </span>
      </div>
    </div>
    <UiButton variant="outline" type="button" :disabled="isLoading">
      <Icon
        name="svg-spinners:8-dots-rotate"
        v-if="isLoading"
        class="mr-2 h-4 w-4 animate-spin"
      ></Icon>
      {{ $t("register_as_a_merchant") }}
    </UiButton>
  </div>
</template>
