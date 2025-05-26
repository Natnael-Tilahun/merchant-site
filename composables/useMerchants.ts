import { Toast, ToastAction, toast, useToast } from "~/components/ui/toast";
import { useAuthUser } from "./useAuthUser";
import type { Merchant } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const useMerchants = () => {
    const runtimeConfig = useRuntimeConfig();
    const isLoading = ref<boolean>(false);
    const isSubmitting = ref<boolean>(false);

    const store = useAuthStore();
    const { fetch } = useApi();

    const getProfile: () => ApiResult<Merchant> = async () => {
        try {
            const { data ,pending, error, status } = await fetch<Merchant>(
                `/api/v1/merchants`,
                {
                  method: "GET"
                }
              );
        
              isLoading.value = pending.value;
        
              if (status.value === "error") {
                handleApiError(error);
              }
        
              return data.value ? (data.value as unknown as Merchant) : null;

        } catch (err) {
            handleApiError(err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    const createNeweMerchant: (merchantData: any) => ApiResult<Merchant> = async (merchantData) => {
        
        try {
            const { data, pending, error, status } = await fetch<Merchant>(
              '/api/v1/merchants/register',
              {
                method: "POST",
                body: merchantData
              }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Merchant) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }

    };

    const updateProfile: (merchantData: any) => ApiResult<Merchant> = async (merchantData) => {           
        try {
            const { data, pending, error, status } = await fetch<Merchant>(
              `/api/v1/merchants/update`,
              {
                method: "POST",
                body: merchantData
              }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Merchant) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }

    };

    return {
        isLoading,
        getProfile,
        createNeweMerchant,
        updateProfile,
        isSubmitting
    };
};
