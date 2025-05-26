import { Toast, ToastAction, toast, useToast } from "~/components/ui/toast";
import type { Employee } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const useEmployees = () => {
    const runtimeConfig = useRuntimeConfig();
    const isLoading = ref<boolean>(false);

    const store = useAuthStore();
    const { fetch } = useApi();


    const getEmployees: () => ApiResult<Employee[]> = async () => {

        try {
            const { data ,pending, error, status } = await fetch<Employee[]>(
                `/api/v1/merchants/operators`,
                {
                  method: "GET"
                }
              );
        
              isLoading.value = pending.value;
        
              if (status.value === "error") {
                handleApiError(error);
              }
        
              return data.value ? (data.value as unknown as Employee[]) : null;

        } catch (err) {
            handleApiError(err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };


    const deleteEmployee: (id: string) => ApiResult<any> = async (id) => {

           try {
            const { data, pending, error, status } = await fetch<any>(
              `/api/v1/merchants/operators/${id}`,
              { method: "DELETE" }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value;
          } catch (err) {
            handleApiError(err);
            return null;
          }
          finally {
            // Ensure to stop loading state whether login is successful or not
            isLoading.value = false;
        }
    }

    const getEmployeeById: (id: string) => ApiResult<Employee> = async (id) => {

        try {
            const { data, pending, error, status } = await fetch<Employee>(
              `/api/v1/merchants/operators/${id}`
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Employee) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }
    };

    const getBranchOperators: (id: string) => ApiResult<Employee[]> = async (id) => {

        try {
            const { data, pending, error, status } = await fetch<Employee[]>(
              `/api/v1/merchants/branches/${id}/employees`
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Employee[]) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }
    };

    const createEmployee: (employeeData: Employee) => ApiResult<Employee> = async (employeeData) => {
        
        try {
            const { data, pending, error, status } = await fetch<Employee>(
              '/api/v1/merchants/operators',
              {
                method: "POST",
                body: employeeData
              }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Employee) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }
    };

    const updateEmployee: (id: string, employeeData: Employee) => ApiResult<Employee> = async (id, employeeData) => {
        
        try {
            const { data, pending, error, status } = await fetch<Employee>(
              `/api/v1/merchants/operators/${id}`,
              {
                method: "PATCH",
                body: employeeData
              }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Employee) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }
    };

    const resetEmployeePassword: (id: string, newPassword: string) => ApiResult<Employee | null> = async (id, newPassword) => {
        const employeeData = {
            newPassword: newPassword
        }

        try {
            const { data, pending, error, status } = await fetch<Employee>(
              '/api/v1/merchants/operators/${id}/reset-password',
              {
                method: "POST",
                body: employeeData
              }
            );
      
            isLoading.value = pending.value;
      
            if (status.value === "error") {
              handleApiError(error);
            }
      
            return data.value ? (data.value as unknown as Employee) : null;
          } catch (err) {
            handleApiError(err);
            return null;
          }
    };

    return {
        getEmployees,
        deleteEmployee,
        isLoading,
        getEmployeeById,
        createEmployee,
        updateEmployee,
        resetEmployeePassword,
        getBranchOperators
    };
};
