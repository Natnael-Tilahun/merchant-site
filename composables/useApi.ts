import { useAuthStore } from "~/stores/auth";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const store = useAuthStore();
  const getHeaders = (includeAuth = true) => {
    const headers: Record<string, string> = {
      "X-App-ID": runtimeConfig.public.X_APP_ID,
      "X-App-Version": runtimeConfig.public.X_APP_VERSION,
      "X-2FA-Token": store.twoFactorToken ? store.twoFactorToken : "",
    };

    if (includeAuth && store.accessToken) {
      headers.Authorization = `Bearer ${store.accessToken}`;
    }

    return headers;
  };

  const fetch = async <T>(
    endpoint: string,
    options: {
      method?: string;
      body?: any;
      params?: Record<string, any>;
      baseUrl?: string;
      includeAuth?: boolean;
      headers?: Record<string, string>;
    } = {}
  ) => {
    const {
      method = "GET",
      body,
      params,
      baseUrl = runtimeConfig.public.API_BASE_URL,
      includeAuth = true,
      headers = {},
    } = options;

    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    const url = `${baseUrl}${endpoint}${queryString}`;

    const finalHeaders = { ...getHeaders(includeAuth), ...headers };

    const { data, pending, error, status } = await useFetch<T>(url, {
      method,
      body,
      headers: finalHeaders,
    });

    return { data, pending, error, status };
  };

  return {
    fetch,
    getHeaders,
  };
};
