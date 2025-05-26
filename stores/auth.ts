import { defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

interface AuthState {
  username: string;
  email: string;
  isAuthenticated: boolean;
  userRole: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  permissions: string[];
  verificationId: string
  phone: string
  expiryTime: string
  twoFactorToken:string
}

interface AuthPayload {
  isAuthenticated: boolean;
  email: string;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  permissions: string[];
  verificationId: string
  phone: string
  expiryTime: string
  twoFactorToken:string
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    username: "",
    email: "",
    isAuthenticated: false,
    userRole: "",
    accessToken: "",
    refreshToken: "",
    refreshTokenExpiresIn: "",
    permissions: [],
    verificationId: "",
    expiryTime: "",
    phone:"",
    twoFactorToken:""
  }),

  actions: {
    setAuth(auth: Partial<AuthPayload>) {
      this.isAuthenticated = auth?.isAuthenticated ?? false;
      this.email = auth?.email ?? "";
      this.username = auth?.username ?? "";
      this.userRole = auth?.role ?? "";
      this.accessToken = auth?.accessToken ?? "";
      this.refreshToken = auth?.refreshToken ?? "";
      this.refreshTokenExpiresIn = auth?.refreshTokenExpiresIn ?? "";
    },

    setPermissions(auth: { permissions: string[] }) {
      this.permissions = auth?.permissions ?? [];
    },


    setOTPValues(auth: { verificationId: string, expiryTime:string, phone:string }) {
      this.verificationId = auth?.verificationId ?? "";
      this.expiryTime = auth?.expiryTime ?? "";
      this.phone = auth?.phone ?? "";
    },

    setTwoFactorToken(auth: { twoFactorToken: string}) {
      this.twoFactorToken = auth?.twoFactorToken ?? "";
    },

    $reset() {
      this.isAuthenticated = false;
      this.username = "";
      this.email = "";
      this.userRole = "";
      this.accessToken = "";
      this.refreshToken = "";
      this.refreshTokenExpiresIn = "";
      this.permissions = [];
      this.verificationId = "";
      this.expiryTime = "";
      this.phone = "";
    },
  },
  getters: {
    hasPermissions: (state) => {
      return (permission: string) => state.permissions.includes(permission);
    },

    hasRole: (state) => {
      return (role: string) => state.userRole === role;
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['isAuthenticated', 'accessToken', 'refreshToken', 'refreshTokenExpiresIn', 'twoFactorToken', 'verificationId']
    // storage: persistedState.cookies,
  },
});
