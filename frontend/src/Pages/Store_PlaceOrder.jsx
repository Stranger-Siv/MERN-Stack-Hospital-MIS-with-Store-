import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import Navbar from '../components/Store_Navbar';
import { MdArrowBack, MdLocalShipping, MdPayment } from 'react-icons/md';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zip: '', country: '', phone: '',
  });
  const [errors, setErrors] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const totalBeforeDiscount = subtotal + deliveryFee;
  const total = totalBeforeDiscount - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoCodeSubmit = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10); // Apply a $10 discount
      setPromoError(''); // Clear any previous errors
    } else if (promoCode.trim() === '') {
      setPromoError('Promo code cannot be empty');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/orderconfirmed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/cart')}
        className="fixed bottom-7 right-8 z-50 bg-[#2f3d7e] text-white p-4 rounded-full shadow-lg hover:bg-[#1f2b5e] transition-all duration-200 
          animate-bounce hover:animate-none
          hover:scale-110
          ring-4 ring-blue-100 hover:ring-blue-200
          hover:shadow-xl"
      >
        <MdArrowBack className="text-2xl" />
      </button>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-6">
            <MdLocalShipping className="text-[#2f3d7e] text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-[#2f3d7e] mb-4">Checkout</h1>
          <p className="text-gray-600">Complete your order details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Delivery Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-[#2f3d7e] mb-6">Delivery Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                {/* Other form fields with same styling */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                />
                
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                />

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-[#2f3d7e] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between font-bold text-lg text-[#2f3d7e]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2f3d7e] focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCodeSubmit}
                    className="px-6 py-3 bg-[#2f3d7e] text-white rounded-lg hover:bg-[#1f2b5e] transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="mt-2 text-red-500 text-sm">{promoError}</p>
                )}
              </div>

              <button
                onClick={() => navigate('/orderconfirmed')}
                className="w-full bg-[#2f3d7e] text-white py-4 rounded-lg hover:bg-[#1f2b5e] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MdPayment className="text-xl" />
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
