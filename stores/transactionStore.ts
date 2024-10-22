import { defineStore } from "pinia";

interface TransactionFilterState {
    paymentStatus: string;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    paymentMethod: string;
    paymentType: string;
    expirationDate: string;
    completedDate: string;
    initiatedDate: string;
    transactionInitiator: string;
    amountGreaterThanOrEqual: string;
    amountLessThanOrEqual: string;
    merchantAccountNumber: string;
    payerAccountNumber: string;
    payerId: string;
    payerName: string;
    payerPhone: string;
    merchantId: string;
    merchantOperatorId: string;
    merchantBranchId: string;
    mbTransactionId: string;
    dynamicId: string;
    transactionRefId: string;
    paymentReference: string;
    coreTransactionId: string;
}

export const useTransactionFilterStore = defineStore("transactionStore", {
    state: (): TransactionFilterState => ({
        paymentStatus: "COMPLETED",
        pageNumber: 0,
        pageSize: 20,
        sortBy: "desc",
        paymentMethod: "",
        paymentType: "",
        expirationDate: "",
        completedDate: "",
        initiatedDate: "",
        transactionInitiator: "",
        amountGreaterThanOrEqual: "",
        amountLessThanOrEqual: "",
        merchantAccountNumber: "",
        payerAccountNumber: "",
        payerId: "",
        payerName: "",
        payerPhone: "",
        merchantId: "",
        merchantOperatorId: "",
        merchantBranchId: "",
        mbTransactionId: "",
        dynamicId: "",
        transactionRefId: "",
        paymentReference: "",
        coreTransactionId: "",
    }),

    actions: {
        setFilter(filter: Partial<TransactionFilterState>) {
            console.log(filter);
            this.paymentStatus = filter?.paymentStatus ?? "";
            this.pageNumber = filter?.pageNumber ?? 1;
            this.pageSize = filter?.pageSize ?? 20;
            this.sortBy = filter?.sortBy ?? "";
            this.paymentMethod = filter?.paymentMethod ?? "";
            this.paymentType = filter?.paymentType ?? "";
            this.expirationDate = filter?.expirationDate ? new Date(filter.expirationDate).toISOString() : "";
            this.completedDate = filter?.completedDate ? new Date(filter.completedDate).toISOString() : "";
            this.initiatedDate = filter?.initiatedDate ? new Date(filter.initiatedDate).toISOString() : "";
            this.transactionInitiator = filter?.transactionInitiator ?? "";
            this.amountGreaterThanOrEqual = filter?.amountGreaterThanOrEqual ?? "";
            this.amountLessThanOrEqual = filter?.amountLessThanOrEqual ?? "";
            this.merchantAccountNumber = filter?.merchantAccountNumber ?? "";
            this.payerAccountNumber = filter?.payerAccountNumber ?? "";
            this.payerId = filter?.payerId ?? "";
            this.payerName = filter?.payerName ?? "";
            this.payerPhone = filter?.payerPhone ?? "";
            this.merchantId = filter?.merchantId ?? "";
            this.merchantOperatorId = filter?.merchantOperatorId ?? "";
            this.merchantBranchId = filter?.merchantBranchId ?? "";
            this.mbTransactionId = filter?.mbTransactionId ?? "";
            this.dynamicId = filter?.dynamicId ?? "";
            this.transactionRefId = filter?.transactionRefId ?? "";
            this.paymentReference = filter?.paymentReference ?? "";
            this.coreTransactionId = filter?.coreTransactionId ?? "";
        },


        $reset() {
            this.paymentStatus = "";
            this.pageNumber = 0;
            this.pageSize = 20;
            this.sortBy = "desc";
            this.paymentMethod = "";
            this.paymentType = "";
            this.expirationDate = "";
            this.completedDate = "";
            this.initiatedDate = "";
            this.transactionInitiator = "";
            this.amountGreaterThanOrEqual = "";
            this.amountLessThanOrEqual = "";
            this.merchantAccountNumber = "";
            this.payerAccountNumber = "";
            this.payerId = "";
            this.payerName = "";
            this.payerPhone = "";
            this.merchantId = "";
            this.merchantOperatorId = "";
            this.merchantBranchId = "";
            this.mbTransactionId = "";
            this.dynamicId = "";
            this.transactionRefId = "";
            this.paymentReference = "";
            this.coreTransactionId = "";
        },
    },
    // persist: {
    //     storage: persistedState.cookies,
    // },
});
