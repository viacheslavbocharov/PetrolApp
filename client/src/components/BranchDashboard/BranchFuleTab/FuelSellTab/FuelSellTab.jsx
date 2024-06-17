import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFuelSell } from '../../../../store/branchSlice';


export default function FuelSellTab() {
  const [fuelType, setFuelType] = useState('');
  const [liters, setLiters] = useState('');
  const [notes, setNotes] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [retailPriceA95, setRetailPriceA95] = useState('');
  const [retailPriceA100, setRetailPriceA100] = useState('');
  const [retailPriceDiesel, setRetailPriceDiesel] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseInterest, setPurchaseInterest] = useState('');
  const [error, setError] = useState('');


  const dispatch = useDispatch();
  const { chosenBranchId } = useSelector(state => state.dashboard);
  const { user } = useSelector(state => state.user);
  const { userBranches } = useSelector(state => state.branch);
  const chosenBranch = userBranches.find(branch => branch.id === chosenBranchId);


  useEffect(() => {
    const priceA95 = parseFloat((chosenBranch.currentPriceA95 * chosenBranch.currentInterestA95).toFixed(2));
    setRetailPriceA95(priceA95);
    const priceA100 = parseFloat((chosenBranch.currentPriceA100 * chosenBranch.currentInterestA100).toFixed(2));
    setRetailPriceA100(priceA100);
    const priceDiesel = parseFloat((chosenBranch.currentPriceDiesel * chosenBranch.currentInterestDiesel).toFixed(2));
    setRetailPriceDiesel(priceDiesel);
  }, [chosenBranch]);



  useEffect(() => {
    let pricePerLiter;
    let interestPerLiter;
    let newTotalCost;
    if (liters !== '') {
      switch (fuelType) {
        case 'a95':
          pricePerLiter = chosenBranch.currentPriceA95;
          interestPerLiter = chosenBranch.currentInterestA95;
          newTotalCost = parseFloat(liters) * pricePerLiter * interestPerLiter;
          break;
        case 'a100':
          pricePerLiter = chosenBranch.currentPriceA100;
          interestPerLiter = chosenBranch.currentInterestA100;
          newTotalCost = parseFloat(liters) * pricePerLiter * interestPerLiter;
          break;
        case 'diesel':
          pricePerLiter = chosenBranch.currentPriceDiesel;
          interestPerLiter = chosenBranch.currentInterestDiesel;
          newTotalCost = parseFloat(liters) * pricePerLiter * interestPerLiter;
          break;
        case '':
          newTotalCost = 0;
          break;
        default:
          newTotalCost = 0;
      }
    } else {
      newTotalCost = 0;
    }

    setTotalCost(newTotalCost.toFixed(2));
    setPurchasePrice(pricePerLiter);
    setPurchaseInterest(interestPerLiter);
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
      type: 'sell',
      fuel: fuelType,
      liters: parseFloat(liters),
      currentPrice: purchasePrice,
      currentInterest: purchaseInterest,
      date: currentDate,
      donorId: chosenBranch.id,
      recipientId: 'retailBuyer',
      description: notes
    };

    console.log(purchase);

    dispatch(fetchFuelSell(purchase));

    
  };


  return (
    <div>
      <h3>Sell fuel to retail buyer</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="a95"
              checked={fuelType === 'a95'}
              onChange={(e) => setFuelType(e.target.value)}
            />
            A95 - Retail £{retailPriceA95}
          </label>
          <label>
            <input
              type="radio"
              value="a100"
              checked={fuelType === 'a100'}
              onChange={(e) => setFuelType(e.target.value)}
            />
            A100 - Retail £{retailPriceA100}
          </label>
          <label>
            <input
              type="radio"
              value="diesel"
              checked={fuelType === 'diesel'}
              onChange={(e) => setFuelType(e.target.value)}
            />
            Diesel - Retail £{retailPriceDiesel}
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
          <div>Total: {totalCost}</div>
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


