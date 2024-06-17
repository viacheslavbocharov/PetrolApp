import React, { useState } from 'react'
import BranchTitle from '../BranchCards/BranchTitle/BranchTitle';
import BranchFuelTab from './BranchFuleTab/BranchFuelTab';
import BranchStaffTab from './BranchStaffTab/BranchStaffTab';
import BranchFinancesTab from './BranchFinancesTab/BranchFinancesTab';
import { useSelector, useDispatch } from 'react-redux';
import { setDashboardShow, setBranchTab } from '../../store/dashboardSlice';
import BranchModalForm from '../BranchModalForm/BranchModalForm';
import { fetchUpdatedBranch } from '../../store/branchSlice';


export default function BranchDashboard() {
  const { chosenBranch, branchTab } = useSelector(state => state.dashboard);
  const { user} = useSelector(state => state.user);
  const [isBranchModalFormlOpen, setIsBranchModalFormlOpen] = useState(false);

  const dispatch = useDispatch();

  const handleBackToAllBranches = () => {
    dispatch(setDashboardShow('allbranches'));
  }

  const handleTabChange = (tabName) => {
    dispatch(setBranchTab(tabName));
  }

  const handleEditBranch = () => {
    setIsBranchModalFormlOpen(true);
  }

  const handleCloseModal = () => {
    setIsBranchModalFormlOpen(false);
  }

  const handleSaveBranch = (updatedBranch, user) => {
    dispatch(fetchUpdatedBranch({ updatedBranch: updatedBranch, editor: user }));
    console.log('Updated Branch:', updatedBranch);
    console.log('Initial user:', user);
    setIsBranchModalFormlOpen(false);
  }

  return (
    <div>
      <div>
        <button onClick={handleBackToAllBranches}>Back to all branches</button>
        <button onClick={handleEditBranch}>Edit branch</button>
      </div>
      <BranchTitle branchId={chosenBranch.id} />
      <div>
        <button onClick={() => handleTabChange('fuel')}>Fuel</button>
        <button onClick={() => handleTabChange('staff')}>Staff</button>
        <button onClick={() => handleTabChange('finances')}>Finances</button>
      </div>
      {branchTab === 'fuel' && <BranchFuelTab branch={chosenBranch}/>}
      {branchTab === 'staff' && <BranchStaffTab branch={chosenBranch}/>}
      {branchTab === 'finances' && <BranchFinancesTab branch={chosenBranch}/>}
     
      {isBranchModalFormlOpen && 
        <BranchModalForm 
          branch={chosenBranch} 
          onClose={handleCloseModal} 
          onSave={handleSaveBranch} 
        />}
        

    </div>
  )
}
