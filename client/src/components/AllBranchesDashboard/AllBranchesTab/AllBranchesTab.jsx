import React, {useState} from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBranches } from '../../../store/branchSlice';
import { fetchAddBranch } from '../../../store/branchSlice';
import BranchFuelCard from '../../BranchCards/BranchFuelCard/BranchFuelCard';
import BranchModalForm from '../../BranchModalForm/BranchModalForm';


export default function AllBranchesTab() {

  const { user } = useSelector(state => state.user);
  const { userBranches, error } = useSelector(state => state.branch);
  const dispatch = useDispatch();
  const [isBranchModalFormlOpen, setIsBranchModalFormlOpen] = useState(false);


  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchBranches(user.id));
    }
  }, [dispatch, user]);

  const handleAddBranch = () => {
    setIsBranchModalFormlOpen(true);
  }

  const handleCloseModal = () => {
    setIsBranchModalFormlOpen(false);
  }

  const handleSaveBranch = (newBranch, user) => {

    dispatch(fetchAddBranch({ newBranch: newBranch, editor: user }));
    setIsBranchModalFormlOpen(false);
  }

  let draftBranch ={
    id: '',
    name: '',
    address: '',
    phone: '',
    type: '',
    tankVolumeA95: null,
    tankVolumeA100: null,
    tankVolumeDiesel: null,
    currentVolumeA95: 0,
    currentVolumeA100: 0,
    currentVolumeDiesel: 0,
    currentPriceA95: 0,
    currentPriceA100: 0,
    currentPriceDiesel: 0,
    currentInterestA95: 1,
    currentInterestA100: 1,
    currentInterestDiesel: 1,
    staff: [],
    branchPurchases: []
  }


  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
        // value={searchValue}
        // onChange={handleSearchChange}
        />
        <button onClick={handleAddBranch} >Add Branch</button>
      </div>
      <ul>
        {userBranches.map(branch => (
          <li key={branch.id}>
            <BranchFuelCard branch={branch} />
          </li>
        ))}
      </ul>
      {isBranchModalFormlOpen && 
        <BranchModalForm 
          branch={draftBranch} 
          onClose={handleCloseModal} 
          onSave={handleSaveBranch} 
        />}
    </div>
  )
}
