import { useDispatch, useSelector } from 'react-redux';
import RestaurantCategoryItem from '../components/RestaurantCategoryItem';
import { clearCart } from '../slices/cartSlice';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="text-center mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="w-6/12 m-auto">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            {cartItems.length === 0 && <h1>Your cart is empty!</h1>}
            <RestaurantCategoryItem items={cartItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
