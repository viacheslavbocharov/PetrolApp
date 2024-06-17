import React from 'react'
import BranchTitle from '../BranchTitle/BranchTitle'
import BranchTanks from '../BranchTanks/BranchTanks'
import { useSelector, useDispatch } from 'react-redux';
import { setChosenBranch, setChosenBranchId, setDashboardShow } from '../../../store/dashboardSlice';


export default function BranchFuelCard({branch}) {
  const dispatch = useDispatch();
  // console.log(branch)
  const handleDashboardChange = () => {
    dispatch(setChosenBranch(branch));
    dispatch(setChosenBranchId(branch.id))
    dispatch(setDashboardShow('onebranch'));
  };
    

  return (
    <div onClick={handleDashboardChange}>
        <BranchTitle branchId={branch.id}/>
        <BranchTanks branchId={branch.id}/>
    </div>
  )
}
