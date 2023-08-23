import { PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../reducer";
import { ModalContent } from "../../../types";

export const openModal = (
  state: ModalState,
  action: PayloadAction<boolean>
) => {
  state.open = action.payload;
};

export const setModalContent = (
  state: ModalState,
  action: PayloadAction<ModalContent>
) => {
  state.content = action.payload;
};
