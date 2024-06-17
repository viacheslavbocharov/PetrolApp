import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFuelTransfer } from '../../../../store/branchSlice';
import BranchTanks from '../../../BranchCards/BranchTanks/BranchTanks';


export default function FuelTransferTab() {
  const [fuelType, setFuelType] = useState('');
  const [liters, setLiters] = useState('');
  const [notes, setNotes] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [error, setError] = useState('');
  const [recipientBranchId, setrecipientBranchId] = useState(null);


  const dispatch = useDispatch();
  const { chosenBranchId } = useSelector(state => state.dashboard);
  const { user } = useSelector(state => state.user);
  const { userBranches } = useSelector(state => state.branch);
  const chosenBranch = userBranches.find(branch => branch.id === chosenBranchId);
  // const recipientBranch = userBranches.find(branch => branch.id === recipientBranchId);


  useEffect(() => {
    let pricePerLiter;

    if (liters !== '') {
      switch (fuelType) {
        case 'a95':
          pricePerLiter = chosenBranch.currentPriceA95;
          break;
        case 'a100':
          pricePerLiter = chosenBranch.currentPriceA100;
          break;
        case 'diesel':
          pricePerLiter = chosenBranch.currentPriceDiesel;
          break;
        case '':
          break;
        default:
      }
    }

    setCurrentPrice(pricePerLiter);
  }, [liters, fuelType]);


  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const currentDate = new Date().getTime();

    let purchase = {
      id: generateUniqueId(),
      employeeId: user.id,
      type: 'transfer',
      fuel: fuelType,
      liters: parseFloat(liters),
      currentPrice: currentPrice,
      currentInterest: 1,
      date: currentDate,
      donorId: chosenBranch.id,
      recipientId: recipientBranchId,
      description: notes
    };

    dispatch(fetchFuelTransfer(purchase));
  };


  return (
    <div>
      <h3>Transfer fuel to other branch</h3>
      <div>
        <label>
          Recipient:
          <select
            value={recipientBranchId}
            onChange={(e) => setrecipientBranchId(e.target.value)}
            required
          >
            <option value="">Select Branch</option>
            {userBranches.map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.name} - {branch.address}
              </option>
            ))}
          </select>
        </label>
      </div>
      {recipientBranchId && <div><BranchTanks branchId={recipientBranchId} /></div>}
      {recipientBranchId &&
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="a95"
                checked={fuelType === 'a95'}
                onChange={(e) => setFuelType(e.target.value)}
              />
              A95
            </label>
            <label>
              <input
                type="radio"
                value="a100"
                checked={fuelType === 'a100'}
                onChange={(e) => setFuelType(e.target.value)}
              />
              A100
            </label>
            <label>
              <input
                type="radio"
                value="diesel"
                checked={fuelType === 'diesel'}
                onChange={(e) => setFuelType(e.target.value)}
              />
              Diesel
            </label>
          </div>
          <div>
            <label>
              Liters:
              <input
                type="number"
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Notes:
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Purchase</button>
          {error !== '' && <div>{error}</div>}
        </form>}
    </div>
  );
}


