import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext'
import Navbar from '../components/Store_Navbar'



const Cart = () => {
  const { cartItems, removeFromCart, food_list, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const totalBeforeDiscount = subtotal + deliveryFee;
  const total = totalBeforeDiscount - discount;

  return (
    <div>
    <Navbar />
    
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 text-gray-700 font-semibold border-b pb-2 mb-4">
          <p className="text-left col-span-1">Image</p>
          <p className="text-left col-span-2">Title</p>
          <p className="text-right">Price</p>
          <p className="text-right">Qty</p>
          <p className="text-right">Total</p>
          <p className="text-right">Rem</p>
        </div>
        {food_list.length > 0 ? (
          food_list.map((item) => {
            const quantity = cartItems[item._id];
            if (quantity > 0) {
              return (
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center border-b py-4" key={item._id}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-md col-span-1 sm:col-span-1" />
                  <p className="col-span-1 sm:col-span-2 text-left font-medium">{item.name}</p>
                  <p className="text-right text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-right text-gray-600">{quantity}</p>
                  <p className="text-right text-gray-600">${(item.price * quantity).toFixed(2)}</p>
                  <p className="text-right">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-300 font-medium p-2 sm:p-5"
                      onClick={() => removeFromCart(item._id)}>
                        ❌
                    </button>
                  </p>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p className="text-center text-gray-500 py-4">Your cart is empty</p>
        )}
      </div>

      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2 py-2 px-4 bg-gray-50 rounded-md shadow-sm">
              <p className="font-medium">Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2 py-2 px-4 bg-gray-50 rounded-md shadow-sm border-t border-gray-200">
              <p className="font-medium">Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between font-bold py-2 px-4 bg-gray-50 rounded-md shadow-sm border-t border-gray-200">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/placeorder')}
            className="mt-6 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;
