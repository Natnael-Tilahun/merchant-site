import { useAuthStore } from "~/stores/auth";
import { toast } from "~/components/ui/toast";
import type { Transaction } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const useTransactions = () => {
  const runtimeConfig = useRuntimeConfig();
  const store = useAuthStore();
  const isLoading = ref<boolean>(false);
  const transactionFilterStore = useTransactionFilterStore();
  const { fetch } = useApi();

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
  ) => ApiResult<Transaction[]> = async (
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
      const { data, pending, error, status } = await fetch<Transaction[]>(
        `/api/v1/merchants/transactions`,
        {
          method: "GET",
          params: {
            "paymentStatus.equals":
              paymentStatus ?? transactionFilterStore.paymentStatus == "NONE"
                ? ""
                : transactionFilterStore.paymentStatus,
            page: pageNumber ?? transactionFilterStore.pageNumber,
            size: pageSize ?? transactionFilterStore.pageSize,
            sort: sortBy ?? transactionFilterStore.sortBy,
            ...(transactionInitiator ||
            (transactionFilterStore.transactionInitiator !== "NONE" &&
              transactionFilterStore.transactionInitiator !== "")
              ? {
                  "transactionInitiator.equals":
                    transactionInitiator ??
                    transactionFilterStore.transactionInitiator,
                }
              : {}),
            ...(amountGreaterThanOrEqual ||
            transactionFilterStore.amountGreaterThanOrEqual
              ? {
                  "amount.greaterThanOrEqual":
                    amountGreaterThanOrEqual ??
                    transactionFilterStore.amountGreaterThanOrEqual,
                }
              : {}),
            ...(amountLessThanOrEqual ||
            transactionFilterStore.amountLessThanOrEqual
              ? {
                  "amount.lessThanOrEqual":
                    amountLessThanOrEqual ??
                    transactionFilterStore.amountLessThanOrEqual,
                }
              : {}),
            ...(payerName || transactionFilterStore.payerName
              ? {
                  "payerName.contains":
                    payerName ?? transactionFilterStore.payerName,
                }
              : {}),
            ...(payerPhone || transactionFilterStore.payerPhone
              ? {
                  "payerPhone.contains":
                    payerPhone ?? transactionFilterStore.payerPhone,
                }
              : {}),
            ...(payerAccountNumber || transactionFilterStore.payerAccountNumber
              ? {
                  "payerAccountNumber.in":
                    payerAccountNumber ??
                    transactionFilterStore.payerAccountNumber,
                }
              : {}),
            ...(payerId || transactionFilterStore.payerId
              ? {
                  "payerId.contains": payerId ?? transactionFilterStore.payerId,
                }
              : {}),
            ...(paymentReference || transactionFilterStore.paymentReference
              ? {
                  "paymentReference.contains":
                    paymentReference ?? transactionFilterStore.paymentReference,
                }
              : {}),
            ...(dynamicId || transactionFilterStore.dynamicId
              ? {
                  "dynamicId.contains":
                    dynamicId ?? transactionFilterStore.dynamicId,
                }
              : {}),
            ...(mbTransactionId || transactionFilterStore.mbTransactionId
              ? {
                  "mbTransactionId.contains":
                    mbTransactionId ?? transactionFilterStore.mbTransactionId,
                }
              : {}),
            ...(coreTransactionId || transactionFilterStore.coreTransactionId
              ? {
                  "coreTransactionId.contains":
                    coreTransactionId ??
                    transactionFilterStore.coreTransactionId,
                }
              : {}),
            ...(merchantAccountNumber ||
            transactionFilterStore.merchantAccountNumber
              ? {
                  "merchantAccountNumber.contains":
                    merchantAccountNumber ??
                    transactionFilterStore.merchantAccountNumber,
                }
              : {}),
            ...(merchantBranchId || transactionFilterStore.merchantBranchId
              ? {
                  "merchantBranchId.equals":
                    merchantBranchId ?? transactionFilterStore.merchantBranchId,
                }
              : {}),
            ...(merchantOperatorId || transactionFilterStore.merchantOperatorId
              ? {
                  "merchantOperatorId.equals":
                    merchantOperatorId ??
                    transactionFilterStore.merchantOperatorId,
                }
              : {}),
            ...(initiatedDate || transactionFilterStore.initiatedDate
              ? {
                  "initiatedDate.greaterThanOrEqual":
                    initiatedDate ?? transactionFilterStore.initiatedDate,
                }
              : {}),
            ...(completedDate || transactionFilterStore.completedDate
              ? {
                  "completedDate.greaterThanOrEqual":
                    completedDate ?? transactionFilterStore.completedDate,
                }
              : {}),
            ...(expirationDate || transactionFilterStore.expirationDate
              ? {
                  "expirationDate.greaterThanOrEqual":
                    expirationDate ?? transactionFilterStore.expirationDate,
                }
              : {}),
          },
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Transaction[]) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const getTransactionById: (id: string) => ApiResult<Transaction> = async (
    id
  ) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction>(
        `/api/v1/merchants/transactions/${id}?PaymentStatus=NONE`
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Transaction) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const getTransactionsByOperatorId: (
    id: string
  ) => ApiResult<Transaction[]> = async (id) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction[]>(
        `/api/v1/merchants/operators/${id}/transactions`
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Transaction[]) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const getTransactionsByBranchId: (
    id: string
  ) => ApiResult<Transaction[]> = async (id) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction[]>(
        `/api/v1/merchants/branches/${id}/transactions`
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Transaction[]) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const initiateTransaction = async (transactionData: {
    amount: number;
    paymentReference: string;
  }) => {
    try {
      const { data, pending, error, status } = await fetch<Transaction>(
        "/api/v1/merchants/transactions",
        {
          method: "POST",
          body: transactionData,
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Transaction) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  return {
    getTransactions,
    getTransactionById,
    initiateTransaction,
    getTransactionsByOperatorId,
    getTransactionsByBranchId,
  };
};
