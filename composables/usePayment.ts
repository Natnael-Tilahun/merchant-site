import { Toast, ToastAction, useToast } from "~/components/ui/toast";
import type { Transaction, UserInput } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const usePayment = () => {
  const runtimeConfig = useRuntimeConfig();
  const isLoading = ref<boolean>(false);
  const store = useAuthStore();
  const { toast } = useToast();
  const { fetch } = useApi();

  type UserInputForPushUssd = {
    merchantTransactionId: string;
    customerPhone: string;
  };

  const generateQRCode: (user: UserInput) => ApiResult<Transaction> = async (
    user: UserInput
  ) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction>(
        "/api/v1/merchants/transactions",
        {
          method: "POST",
          body: user,
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      toast({
        title: "QR Code generated successfully.",
        variant: "default",
      });
      return data.value ? (data.value as unknown as Transaction) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const sendPushUssd: (
    user: UserInputForPushUssd
  ) => ApiResult<Transaction> = async (user: UserInputForPushUssd) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction>(
        `/api/v1/merchants/transactions/push-ussd/${user.merchantTransactionId}?customerPhone=${user.customerPhone}`,
        {
          method: "POST",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      navigateTo("/", { replace: true });
      toast({
        title: "Push USSD sent successfully.",
        variant: "default",
      });

      return data.value ? (data.value as unknown as Transaction) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  return {
    generateQRCode,
    Error,
    sendPushUssd,
  };
};
