import { createSlice } from "@reduxjs/toolkit";
import { ModalContent } from "../../../types";
import { openModal, setModalContent } from "../actions";

export interface ModalState {
  open: boolean;
  content: ModalContent;
}

const initialState: ModalState = {
  open: false,
  content: ModalContent.noContent,
};

const name = "MODAL";

const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    openModal,
    setModalContent,
  },
});

export const {
  openModal: openModalAction,
  setModalContent: setModalContentAction,
} = modalSlice.actions;

export default modalSlice.reducer;
