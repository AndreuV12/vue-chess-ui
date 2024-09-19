import { defineStore } from "pinia";
import { getUser } from "../services/Auth";

export const useStore = defineStore("store", {
  state: () => ({
    user: getUser(),
  }),
});
