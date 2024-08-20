import { createSlice } from "@reduxjs/toolkit";

const i18nSlice = createSlice({
  name: "i18n",
  initialState: {
    currentI18nLng: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.currentI18nLng = action.payload;
    },
  },
});

export const { changeLanguage } = i18nSlice.actions;

export const selectCurrentI18nLng = (state) => state.i18n.currentI18nLng;

export default i18nSlice.reducer;
