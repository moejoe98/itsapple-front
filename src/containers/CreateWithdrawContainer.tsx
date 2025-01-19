import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchWithdrawDataAsync,
  createWithdrawAsync,
  sendOtpAsync,
} from "../redux/withdrawSlice";
import { CreateWithdrawPage } from "../pages/CreateWithdrawPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../sections/layouts/loader";

function CreateWithdrawContainer() {
  const dispatch = useAppDispatch();
  const { balance, chains, status } = useAppSelector(
    (state) => state.Withdraws
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchWithdrawDataAsync());
  }, [dispatch]);

  const createData = async (withdraw: any) => {
    setLoading(true);
    try {
      await dispatch(createWithdrawAsync(withdraw)).unwrap();
      toast.success("Withdraw created successfully!", {
        position: "top-right",
      });
      dispatch(fetchWithdrawDataAsync());
    } catch (error: any) {
      toast.error(
        Array.isArray(error?.message)
          ? error?.message[0]
          : error?.message || "Failed to create withdraw.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(sendOtpAsync()).unwrap();
      toast.success("OTP sent successfully!!", {
        position: "top-right",
      });
      return true;
    } catch (error: any) {
      toast.error(error || "Failed to send OTP.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
  };

  if (!chains.length) return <Loader />;
  else
    return (
      <>
        <CreateWithdrawPage
          create={createData}
          loading={loading}
          balance={balance}
          chains={chains}
          handleSendOtp={handleSendOtp}
        />
        <ToastContainer />
      </>
    );
}

export default CreateWithdrawContainer;
