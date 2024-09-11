const CartTotal = ({ calculateTotal }: any) => (
  <div className="bg-purple text-white p-3 mb-5">
    <h1 className="text-center font-heading">Cart Total</h1>
    <h2 className="flex justify-between my-5 text-sm md:text-base">
      <span className="font-heading">Subtotal</span> ${calculateTotal()}
    </h2>
    <hr className="my-5" />
    <div className="relative flex justify-center">
      <input
        type="text"
        placeholder="Enter coupon code"
        className="rounded-lg border border-black w-full h-10 px-3"
      />
      <button
        type="button"
        className="absolute right-0 top-1 px-4 font-heading font-medium"
      >
        Apply
      </button>
    </div>
    <hr className="my-5" />
  </div>
);

export default CartTotal;
