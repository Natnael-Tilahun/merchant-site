import { Toast, ToastAction, useToast } from "~/components/ui/toast";

export const usePayment = () => {
  const runtimeConfig = useRuntimeConfig();
  const isLoading = ref<boolean>(false);
  const store = useAuthStore();
  const { toast } = useToast();

  type UserInputForPushUssd = {
    merchantTransactionId: string;
    customerPhone: string;
  }

  const generateQRCode: (user: UserInput) => Promise<Transaction> = async (user: UserInput) => {
    try {
      const { data, error, status } = await useAsyncData<Transaction>(`initPayment`, () =>
        $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
            body: JSON.stringify(user)
          })
      );

      if (status.value === "error") {
        toast({
          title: (error as any)?.value?.data?.title,
          description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
          variant: "destructive",
        });
        throw new Error("Init payment error: " + error.value);
      }

      if (!data.value) {
        throw new Error("No transactions data received");
      }

      toast({
        title: "QR Code generated successfully.",
        variant: 'default'
      });
      return data.value;

    } catch (error) {
      console.error("Init payment error: ", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const sendPushUssd: (user: UserInputForPushUssd) => Promise<Transaction> = async (user: UserInputForPushUssd) => {
    try {
      const { data, error, status } = await useAsyncData<Transaction>(`initPayment`, () =>
        $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions/push-ussd/${user.merchantTransactionId}?customerPhone=${user.customerPhone}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          })
      );

      if (status.value === "error") {
        toast({
          title: (error as any)?.value?.data?.title,
          description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
          variant: "destructive",
        });
        throw new Error("Push USSD error: " + error.value);
      }

      if (!data.value) {
        throw new Error("No transactions data received");
      }

      navigateTo("/", { replace: true });
      toast({
        title: "Push USSD sent successfully.",
        variant: 'default'
      });
      return data.value;

    } catch (error) {
      console.error("Push USSD error: ", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }



  return {
    generateQRCode,
    Error,
    sendPushUssd
  };
};
