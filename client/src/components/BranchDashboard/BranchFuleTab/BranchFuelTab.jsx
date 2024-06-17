import React from 'react'
import BranchTanks from '../../BranchCards/BranchTanks/BranchTanks'
import { useSelector, useDispatch } from 'react-redux';
import { setFuelAction } from '../../../store/dashboardSlice';
import FuelSellTab from './FuelSellTab/FuelSellTab';
import FuelTransferTab from './FuelTransferTab/FuelTransferTab';
import FuelBuyTab from './FuelBuyTab/FuelBuyTab';



export default function BranchFuelTab({branch}) {
  const dispatch = useDispatch();
  const { chosenBranch, fuelAction } = useSelector(state => state.dashboard);
  
  const handleActionChange = (actionName) => {
    dispatch(setFuelAction(actionName));
  }
  return (
    <div>
      BranchFuelTab
      <BranchTanks branchId={branch.id}/>
      <div>
        <button onClick={() => handleActionChange('fuelSell')}>Sell</button>
        <button onClick={() => handleActionChange('fuelTransfer')}>Transfer</button>
        <button onClick={() => handleActionChange('fuelBuy')}>Buy</button>
      </div>
      {fuelAction === 'fuelSell' && <FuelSellTab />}
      {fuelAction === 'fuelTransfer' && <FuelTransferTab />}
      {fuelAction === 'fuelBuy' && <FuelBuyTab />}
      
    </div>
  )
}
