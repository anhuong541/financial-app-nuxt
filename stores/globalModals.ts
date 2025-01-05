import { defineStore } from "pinia";

export type ModalsType = "addHabitModalStore" | "editHabitModal";

// General modal store type
type ModalState = {
  open: boolean;
};

// Generic modal store factory
function createModalStore(modalName: string) {
  return defineStore(modalName, {
    state: (): ModalState => ({
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
}

// Create individual modal stores
export const addHabitModalStore = createModalStore("addHabitModal");
export const editHabitModalStore = createModalStore("editHabitModal");

// Export all modals in a single object for centralized management
const globalModals = {
  addHabitModalStore,
  editHabitModalStore,
};

// Export for centralized management
export default globalModals;
