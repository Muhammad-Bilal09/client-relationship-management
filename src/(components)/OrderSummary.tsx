import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { deleteOrder, fetchOrders } from "@/redux/slice/orderSlice";
import {
  TABLE_HEADERS,
  NO_ORDERS_MESSAGE,
  tableHeaderClasses,
  buttonClasses,
} from "@/constant/Summary";

const OrderSummary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orderDetails = useSelector(
    (state: RootState) => state?.order?.orderDetails
  );

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      {orderDetails && orderDetails.length > 0 ? (
        <div className="mt-10 px-2 lg:px-10">
          <h2 className="text-2xl md:text-3xl font-heading text-center mb-5">
            Order Summary
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y border-1 divide-gray-200">
              <thead>
                <tr className="bg-purple text-white">
                  {TABLE_HEADERS?.map((header, index) => (
                    <th key={index} className={tableHeaderClasses}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orderDetails?.map((order: any) => (
                  <tr key={order?.id} className="text-sm">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {order?.items && order?.items?.length > 0 ? (
                          order?.items?.map((item: any, index: number) => (
                            <img
                              key={index}
                              className="w-8 md:w-8 lg:w-8 md:h-8 lg:h-8"
                              src={item?.image || "/default-avatar.png"}
                              alt="Item Image"
                            />
                          ))
                        ) : (
                          <span>No images</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {order?.items && order?.items?.length > 0
                        ? order?.items
                            ?.map((item: any) => item?.title)
                            ?.join(", ")
                        : "No items"}
                    </td>
                    <td className="px-4 py-2">{order?.name || "N/A"}</td>
                    <td className="px-4 py-2">{order?.email || "N/A"}</td>
                    <td className="px-4 py-2">
                      $
                      {order?.items
                        ? order?.items
                            ?.reduce(
                              (total: number, item: any) =>
                                total + parseFloat(item?.total || "0"),
                              0
                            )
                            .toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="px-4 py-2">{order?.status || "N/A"}</td>
                    <td className="px-4 py-2">{order?.date || "N/A"}</td>
                    <td className="px-4 py-2">{order?.country || "N/A"}</td>
                    <td className="px-4 py-2">{order?.address || "N/A"}</td>
                    <td className="px-4 py-2">{order?.phone || "N/A"}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteOrder(order?.id)}
                        className={buttonClasses}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10 px-2 lg:px-10">
          <h2 className=" text-2xl md:text-3xl font-heading mb-5">
            {NO_ORDERS_MESSAGE}
          </h2>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
