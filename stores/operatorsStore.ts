import { defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

interface OperatorsState {
    operators: Employee[]
}

export const useOperatorsStore = defineStore("operators", {
    state: (): OperatorsState => ({
        operators: [],
    }),

    actions: {
        setOperators(operators: Employee[]) {
            this.operators = operators;
        },


        $reset() {
            this.operators = [];
        },
    },

    persist: {
        storage: persistedState.cookies,
    },
});
