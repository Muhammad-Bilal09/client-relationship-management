import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchOrders,
  prepareChartData,
  prepareSalesData,
} from "@/redux/slice/analyticalSlice";
import toast from "react-hot-toast";

export const useAnalyticalData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderDetails, chartData, salesData, loading, error } = useSelector(
    (state: RootState) => state?.analytical
  );

  useEffect(() => {
    dispatch(fetchOrders())?.then((result) => {
      if (fetchOrders?.fulfilled?.match(result)) {
        dispatch(prepareChartData(result?.payload));
        dispatch(prepareSalesData(result?.payload));
      } else {
        toast.error("Error fetching orders");
      }
    });
  }, [dispatch]);

  return { orderDetails, chartData, salesData, loading, error };
};
