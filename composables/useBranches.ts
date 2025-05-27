import type { Branch } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const useBranches = () => {
  const runtimeConfig = useRuntimeConfig();
  const isLoading = ref<boolean>(false);

  const store = useAuthStore();
  const { fetch } = useApi();

  const getBranches: () => ApiResult<Branch[]> = async () => {
    try {
      const { data, pending, error, status } = await fetch<Branch[]>(
        `/api/v1/merchants/branches`,
        {
          method: "GET",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Branch[]) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteBranch: (id: string) => ApiResult<any> = async (id) => {
    try {
      const { data, pending, error, status } = await fetch<any>(
        `/api/v1/merchants/branches/${id}`,
        { method: "DELETE" }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value;
    } catch (err) {
      // handleApiError(err);
      return null;
    } finally {
      // Ensure to stop loading state whether login is successful or not
      isLoading.value = false;
    }
  };

  const getBranchById: (id: string) => ApiResult<Branch> = async (id) => {
    try {
      const { data, pending, error, status } = await fetch<Branch>(
        `/api/v1/merchants/branches/${id}`
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Branch) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const createBranch: (branchData: Branch) => ApiResult<Branch> = async (
    branchData
  ) => {
    try {
      const { data, pending, error, status } = await fetch<Branch>(
        "/api/v1/merchants/branches",
        {
          method: "POST",
          body: branchData,
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Branch) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const updateBranch: (
    id: string,
    branchData: Branch
  ) => ApiResult<Branch> = async (id, branchData) => {
    try {
      const { data, pending, error, status } = await fetch<Branch>(
        `/api/v1/merchants/branches/${id}`,
        {
          method: "PATCH",
          body: branchData,
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      return data.value ? (data.value as unknown as Branch) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  return {
    getBranches,
    deleteBranch,
    isLoading,
    getBranchById,
    createBranch,
    updateBranch,
  };
};
