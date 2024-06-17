import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardShow: 'allbranches',
    allBranchesTab: 'branches',
    chosenBranch: null,
    chosenBranchId: null,
    branchTab: 'fuel',
    fuelAction: 'fuelSell'
  },
  reducers: {
    setDashboardShow: (state, action) => {
      state.dashboardShow = action.payload;
    },
    setaAllBranchesTab: (state, action) => {
      state.allBranchesTab = action.payload;
    },
    setChosenBranch: (state, action) => {
      state.chosenBranch = action.payload;
    },
    setChosenBranchId: (state, action) => {
      state.chosenBranchId = action.payload;
    },
    setBranchTab: (state, action) => {
      state.branchTab = action.payload;
    },
    setFuelAction: (state, action) => {
      state.fuelAction = action.payload;
    },
  },
});

export const { setDashboardShow, setaAllBranchesTab, setChosenBranch, setChosenBranchId, setBranchTab, setFuelAction } = dashboardSlice.actions;

export default dashboardSlice.reducer;