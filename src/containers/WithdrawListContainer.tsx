import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Loader from "../sections/layouts/loader";

import { fetchWithdrawsAsync } from "../redux/withdrawSlice";
import { WithdrawsPage } from "../pages/WithdrawsPage";
function WithdrawListContainer() {
  const dispatch = useAppDispatch();
  const { withdraws } = useAppSelector((state) => state.Withdraws);

  const getWithdrawList = async () => {
    try {
      dispatch(fetchWithdrawsAsync());
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    getWithdrawList();
  };

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  if (!withdraws.length) return <Loader />;
  else return <WithdrawsPage refresh={refreshData} withdraws={withdraws} />;
}

export default WithdrawListContainer;
