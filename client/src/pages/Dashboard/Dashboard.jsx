import React from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import AllBranchesDashboard from '../../components/AllBranchesDashboard/AllBranchesDashboard';
import BranchDashboard from '../../components/BranchDashboard/BranchDashboard';
import EmployeeDashboard from '../../components/EmployeeDashboard/EmployeeDashboard'



const Dashboard = () => {
  const { user, isAuthorize, userRole } = useSelector(state => state.user);
  const { dashboardShow } = useSelector(state => state.dashboard);
  

  if (!isAuthorize || !user || !userRole) {
    return <div>Access Denied</div>;
  }

  return (
    <>
      <DashboardHeader />
      {userRole !== 'employee' && (
        <>
          {dashboardShow === 'allbranches' && <AllBranchesDashboard />}
          {dashboardShow === 'onebranch' && <BranchDashboard />}
        </>
      )}
      {userRole === 'employee' && <EmployeeDashboard />}
    </>
  );
};

export default Dashboard;
