import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Loader from "../sections/layouts/loader";

import { fetchOverviewAsync } from "../redux/overviewSlice";
import { OverviewPage } from "../pages/OverviewPage";

function OverviewContainer() {
  const dispatch = useAppDispatch();
  const { botOverview } = useAppSelector((state) => state.Overview);

  const getData = async () => {
    try {
      dispatch(fetchOverviewAsync());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  if (!botOverview) return <Loader />;
  else return <OverviewPage refresh={getData} overview={botOverview} />;
}

export default OverviewContainer;
