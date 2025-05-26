import { defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { Branch } from "~/types";

interface BranchesState {
    branches: Branch[]
}

export const useBranchesStore = defineStore("branches", {
    state: (): BranchesState => ({
        branches: [],
    }),

    actions: {
        setBranches(branches: Branch[]) {
            this.branches = branches;
        },


        $reset() {
            this.branches = [];
        },
    },

    persist: {
        storage: persistedState.cookies,
    },
});
