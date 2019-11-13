import { UPDATE_USER } from "../constants/action-types";

export function updateUser(payload) {
  return { type: UPDATE_USER, payload }
};