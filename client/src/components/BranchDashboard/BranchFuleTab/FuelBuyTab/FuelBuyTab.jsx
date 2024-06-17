import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFuelBuy } from '../../../../store/branchSlice';


export default function FuelBuyTab() {
  const [fuelType, setFuelType] = useState('');
  const [liters, setLiters] = useState('');
  const [notes, setNotes] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [error, setError] = useState('');


  const dispatch = useDispatch();
  const { chosenBranchId } = useSelector(state => state.dashboard);
  const { user } = useSelector(state => state.user);
  const { userBranches } = useSelector(state => state.branch);
  const chosenBranch = userBranches.find(branch => branch.id === chosenBranchId);


  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date().getTime();

    let purchase = {
      id: generateUniqueId(),
      employeeId: user.id,
      type: 'buy',
      fuel: fuelType,
      liters: parseFloat(liters),
      currentPrice: parseFloat(purchasePrice),
      currentInterest: 1,
      date: currentDate,
      donorId: 'supplier',
      recipientId: chosenBranch.id,
      description: notes
    };

    console.log(purchase);

    dispatch(fetchFuelBuy(purchase));

    
  };


  return (
    <div>
      <h3>Buy fuel from supplier</h3>
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
            £ per liter:
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
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
      </form>
    </div>
  );
}



