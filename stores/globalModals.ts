import { defineStore, type StoreDefinition } from "pinia";

export type ModalsType = "addHabitModalStore";

type GlobalModalsType = {
  [key: string]: StoreDefinition<
    "addHabitModal",
    {
      open: boolean;
    },
    {},
    {
      onChangeModal(): void;
      onClose(): void;
    }
  >;
};

export const addHabitModalStore = defineStore("addHabitModal", {
  state: () => ({
    open: false,
  }),
  actions: {
    onChangeModal() {
      this.open = !this.open;
    },
    onClose() {
      this.open = false;
    },
  },
});

const globalModals: GlobalModalsType = {
  addHabitModalStore,
};

export default globalModals;
