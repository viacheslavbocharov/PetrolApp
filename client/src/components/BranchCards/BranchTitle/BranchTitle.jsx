import React from 'react'
import { useSelector } from 'react-redux';

export default function BranchTitle({ branchId }) {
  
  const { userBranches } = useSelector(state => state.branch);
  const branch = userBranches.find(branch => branch.id === branchId);

  return (
    <div>
      <h2>Type: {branch.type}</h2>
      <h3>Name: {branch.name}</h3>
      <h3>Address: {branch.address}</h3>
    </div>
  )
}

