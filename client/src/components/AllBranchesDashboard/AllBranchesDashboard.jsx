import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setaAllBranchesTab } from '../../store/dashboardSlice';
import AllBranchesTab from './AllBranchesTab/AllBranchesTab';
import AllStaffTab from './AllStaffTab/AllStaffTab';
import AllFinancesTab from './AllFinancesTab/AllFinancesTab';


export default function AllBranchesDashboard() {
    const { allBranchesTab } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
  
    const handleDashboardChange = (tabName) => {
      dispatch(setaAllBranchesTab(tabName));
    };

    return (
        <div>
            <div>
                <button onClick={() => handleDashboardChange('branches')}>Branches</button>
                <button onClick={() => handleDashboardChange('staff')}>Staff</button>
                <button onClick={() => handleDashboardChange('finances')}>Finances</button>
            </div>
            {allBranchesTab === 'branches' && <AllBranchesTab />}
            {allBranchesTab === 'staff' && <AllStaffTab />}
            {allBranchesTab === 'finances' && <AllFinancesTab />}
        </div>
    )
}
