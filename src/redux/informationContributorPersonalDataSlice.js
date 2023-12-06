import { createSlice } from '@reduxjs/toolkit';

// Slice para 'informationContributorPersonalData'
export const informationContributorPersonalDataSlice = createSlice({
  name: 'informationContributor',
  initialState: null,
  reducers: {
    setInformationContributorPersonalData: (state, action) => action.payload,
  },
});

// Exportar la acción y el reducer
export const { setInformationContributorPersonalData } = informationContributorPersonalDataSlice.actions;
export default informationContributorPersonalDataSlice.reducer;