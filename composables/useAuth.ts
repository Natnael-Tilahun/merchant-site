import { Toast, ToastAction, useToast } from "~/components/ui/toast";
import { useAuthUser } from "./useAuthUser";
import type {
  AuthResponse,
  Merchant,
  OtpDTO,
  TFAAccessTokenDTO,
  User,
  UserInput,
} from "~/types";
import { useApi } from "./useApi";
import type { ApiResult } from "~/types/api";
import { handleApiError } from "~/types/api";

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const authUser = useAuthUser();
  const userAdmin = useState<boolean>("userAdmin", () => false);
  const isLoading = ref<boolean>(false);
  const store = useAuthStore();
  const { toast } = useToast();
  const { fetch } = useApi();
  const { getProfile } = useMerchants();

  const setUser = (user: User) => {
    authUser.value = user;
  };

  const login = async (user: UserInput) => {
    try {
      const { data, pending, error, status } = await fetch<AuthResponse>(
        "/api/v1/auth/sign-in/password",
        {
          method: "POST",
          body: user,
          includeAuth: false,
        }
      );

      if (status.value === "error") {
        handleApiError(error);
      }

      if (status.value === "success") {
        store.setAuth({
          ...user,
          ...data?.value,
          isAuthenticated: data?.value.accessToken ? true : false,
        });
        await getProfile();
        navigateTo("/");
      }

      return data;
    } catch (error) {
      // handleApiError(error);
      return null;
    } finally {
      // Ensure to stop loading state whether login is successful or not
      isLoading.value = false;
    }
  };

  const register = async (user: UserInput) => {
    try {
      const { data, error, status } = await fetch<any>(
        "/api/v1/auth/sign-in/password",
        {
          method: "POST",
          body: user,
        }
      );

      if (status.value === "error") {
        handleApiError(error);
        throw new Error("Register error: " + error.value);
      }

      if (status.value === "success") {
        store.setAuth({
          ...user,
          ...data?.value,
          isAuthenticated: data?.value.accessToken ? true : false,
        });
        await getAuthorities();
        return data.value;
      }
    } catch (error) {
      console.error("Register error: ", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getRefreshToken = async () => {
    try {
      const { data, pending, error, status } = await fetch<any>(
        "/v1/api/auth/refresh-token",
        {
          method: "POST",
          body: {
            refreshToken: store.refreshToken,
          },
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as any) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const getAuthorities = async () => {
    try {
      const { data, pending, error, status } = await fetch<any[]>(
        `/api/v1/auth/roles`,
        {
          method: "GET",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      if (status.value === "success") {
        store.setPermissions({
          permissions: data?.value && data?.value?.permissions,
        });

        navigateTo("/");
      }

      return data.value ? (data.value as unknown as any) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const userLoggedIn = async () => {
    if (!authUser.value) {
      const { data, error, status } = await fetch(
        `/api/v1/auth/status`,
        {
          headers: useRequestHeaders(["cookie"]),
        }
      );

      if (status.value === "error") {
        return error.value;
      }

      if (status.value === "success") {
        return data.value;
      }
    }
  };

  const logout = async () => {
    store.$reset();
    return navigateTo("/login", { replace: true });
  };

  const requestTwoFactorAuth: (
    deliveryMethod?: string
  ) => ApiResult<OtpDTO> = async (deliveryMethod) => {
    try {
      const { data, pending, error, status } = await fetch<OtpDTO>(
        `/api/v1/auth/two-factor/request-token?deliveryMethod=${deliveryMethod}`,
        {
          method: "POST",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      const response = data.value as OtpDTO;
      if (status.value === "success" && response?.verificationId) {
        store.$patch({
          verificationId: response.verificationId,
        });
      }

      return response;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const validateTwoFactorAuth: (
    otp: string
  ) => ApiResult<TFAAccessTokenDTO> = async (otp) => {
    try {
      const { data, pending, error, status } = await fetch<TFAAccessTokenDTO>(
        `/api/v1/auth/two-factor/validate`,
        {
          method: "POST",
          body: {
            verificationId: store.verificationId,
            otp: otp,
          },
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        await handleApiError(error);
      }

      const response = data.value as TFAAccessTokenDTO;
      if (status.value === "success" && response?.token) {
        store.$patch({
          twoFactorToken: response.token,
        });
      }
      return response;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  return {
    login,
    userLoggedIn,
    userAdmin,
    Error,
    logout,
    authUser,
    getRefreshToken,
    requestTwoFactorAuth,
    validateTwoFactorAuth,
  };
};