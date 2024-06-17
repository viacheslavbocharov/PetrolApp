import React from 'react';
import { useSelector } from 'react-redux';

export default function BranchTanks({ branchId }) {

  const { userBranches } = useSelector(state => state.branch);
  const branch = userBranches.find(branch => branch.id === branchId);

  return (
    <div>
      <div>A95: tank:{branch.tankVolumeA95} / available: {branch.currentVolumeA95}. Current price: {branch.currentPriceA95}</div>
      <div>A100: tank:{branch.tankVolumeA100} / available: {branch.currentVolumeA100}. Current price: {branch.currentPriceA100}</div>
      <div>Diesel: tank:{branch.tankVolumeDiesel} / available: {branch.currentVolumeDiesel}. Current price: {branch.currentPriceDiesel}</div>
    </div>
  )
}
