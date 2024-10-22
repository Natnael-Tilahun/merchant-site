import { useAuthStore } from "~/stores/auth";
import { toast } from "~/components/ui/toast";

export const useTransactions = () => {
    const runtimeConfig = useRuntimeConfig();
    const store = useAuthStore();
    const isLoading = ref<boolean>(false);
    const transactionFilterStore = useTransactionFilterStore();



    const getTransactions: (
        paymentStatus?: string,
        pageNumber?: string,
        pageSize?: string,
        sortBy?: string,
        transactionInitiator?: string,
        amountGreaterThanOrEqual?: string,
        amountLessThanOrEqual?: string,
        payerName?: string,
        payerPhone?: string,
        payerAccountNumber?: string,
        payerId?: string,
        paymentReference?: string,
        dynamicId?: string,
        mbTransactionId?: string,
        coreTransactionId?: string,
        merchantAccountNumber?: string,
        merchantBranchId?: string,
        merchantOperatorId?: string,
        initiatedDate?: string,
        completedDate?: string,
        expirationDate?: string
    ) => Promise<Transaction[]> = async (
        paymentStatus = undefined,
        pageNumber = undefined,
        pageSize = undefined,
        sortBy = undefined,
        transactionInitiator = undefined,
        amountGreaterThanOrEqual = undefined,
        amountLessThanOrEqual = undefined,
        payerName = undefined,
        payerPhone = undefined,
        payerAccountNumber = undefined,
        payerId = undefined,
        paymentReference = undefined,
        dynamicId = undefined,
        mbTransactionId = undefined,
        coreTransactionId = undefined,
        merchantAccountNumber = undefined,
        merchantBranchId = undefined,
        merchantOperatorId = undefined,
        initiatedDate = undefined,
        completedDate = undefined,
        expirationDate = undefined
    ) => {
            try {
                const { data, error, status } = await useAsyncData<Transaction[]>(`transactions`, () =>
                    $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions?paymentStatus.equals=${paymentStatus ?? transactionFilterStore.paymentStatus == 'NONE' ? '' : transactionFilterStore.paymentStatus}&page=${pageNumber ?? transactionFilterStore.pageNumber}&size=${pageSize ?? transactionFilterStore.pageSize}&sort=${sortBy ?? transactionFilterStore.sortBy}&transactionInitiator.equals=${transactionInitiator ?? transactionFilterStore.transactionInitiator == 'NONE' ? '' : transactionFilterStore.transactionInitiator}&amount.greaterThanOrEqual=${amountGreaterThanOrEqual ?? transactionFilterStore.amountGreaterThanOrEqual}&amount.lessThanOrEqual=${amountLessThanOrEqual ?? transactionFilterStore.amountLessThanOrEqual}&payerName.contains=${payerName ?? transactionFilterStore.payerName}&payerPhone.contains=${payerPhone ?? transactionFilterStore.payerPhone}&payerAccountNumber.contains=${payerAccountNumber ?? transactionFilterStore.payerAccountNumber}&payerId.contains=${payerId ?? transactionFilterStore.payerId}&paymentReference.contains=${paymentReference ?? transactionFilterStore.paymentReference}&dynamicId.contains=${dynamicId ?? transactionFilterStore.dynamicId}&mbTransactionId.contains=${mbTransactionId ?? transactionFilterStore.mbTransactionId}&coreTransactionId.contains=${coreTransactionId ?? transactionFilterStore.coreTransactionId}&merchantAccountNumber.contains=${merchantAccountNumber ?? transactionFilterStore.merchantAccountNumber}&merchantBranchId.equals=${merchantBranchId ?? transactionFilterStore.merchantBranchId}&merchantOperatorId.equals=${merchantOperatorId ?? transactionFilterStore.merchantOperatorId}&initiatedDate.equals=${initiatedDate ?? transactionFilterStore.initiatedDate}&completedDate.equals=${completedDate ?? transactionFilterStore.completedDate}&expirationDate.in=${expirationDate ?? transactionFilterStore.expirationDate}`, {
                        headers: {
                            Authorization: `Bearer ${store.accessToken}`,
                        },
                    })
                );

                if (status.value == "error") {
                    console.log("Getting transactions error : ", error);
                    toast({
                        title: (error as any)?.value?.data?.title,
                        description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                        variant: "destructive",
                    });
                    throw new Error("Getting transactions error: " + error.value?.message);
                }

                if (!data.value) {
                    throw new Error("No transactions data received");
                }

                return data.value;

            } catch (error) {
                throw error;
            } finally {
                isLoading.value = false;
            }
        };

    const getTransactionById: (id: string) => Promise<Transaction> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions/${id}?PaymentStatus=NONE`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transaction data received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const getTransactionsByOperatorId: (id: string) => Promise<Transaction[]> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}/transactions`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transactions for operator received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };


    const getTransactionsByBranchId: (id: string) => Promise<Transaction[]> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}/transactions`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transactions for branch received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const initiateTransaction = async (transactionData: { amount: number; paymentReference: string }) => {
        try {
            const { data, error } = await useFetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${store.accessToken}`,
                },
                body: JSON.stringify(transactionData),
            });

            if (error.value) {
                throw new Error(error.value.message);
            }

            return data.value;
        } catch (err) {
            console.error("Error initiating transaction:", err);
            throw err;
        }
    };

    return {
        getTransactions,
        getTransactionById,
        initiateTransaction,
        getTransactionsByOperatorId,
        getTransactionsByBranchId
    };
};