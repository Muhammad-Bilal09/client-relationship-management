import { FaPlus, FaMinus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

const CartItem = ({
  item,
  handleUpdateQuantity,
  handleRemoveFromCart,
}: any) => (
  <tr key={item?.id} className="text-sm">
    <td className="px-4 py-2 whitespace-nowrap">
      <img
        className="w-16 md:w-24 lg:w-32 md:h-24 lg:h-32"
        src={item?.image}
        alt="Item Image"
      />
    </td>
    <td className="px-4 py-2">
      {item?.title?.length > 20
        ? `${item?.title?.slice(0, 20)}...`
        : item?.title}
    </td>
    <td className="px-4 py-2">${item?.price?.toFixed(2)}</td>
    <td className="px-4 py-2">
      <div className="flex items-center space-x-2">
        <button
          disabled={item?.quantity <= 1}
          onClick={() => handleUpdateQuantity(item?.id, item?.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          <FaMinus />
        </button>
        <p className="px-2">{item?.quantity}</p>
        <button
          onClick={() => handleUpdateQuantity(item?.id, item?.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          <FaPlus />
        </button>
      </div>
    </td>
    <td className="px-4 py-2">
      <button
        onClick={() => handleRemoveFromCart(item?.id)}
        className="bg-red-600 p-2 rounded-lg text-white"
      >
        <span className="flex items-center">
          Delete <CiCircleRemove className="ml-1 text-lg" />
        </span>
      </button>
    </td>
  </tr>
);

export default CartItem;
