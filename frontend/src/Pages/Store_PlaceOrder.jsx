import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import Navbar from '../components/Store_Navbar';


const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
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
  
    let newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = 'This field is required';
      }
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    
    // Prepare order details to pass to the confirm order page
    const orderDetails = {
      total: total, // Use the calculated total
      orderNumber: Math.floor(Math.random() * 1000000), // Generate a random order number or use a real one
    };
  
    navigate('/confirmorder', { state: { orderDetails } });
  };
  

  return (
    <div>
      <Navbar />
    <form className='flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6' onSubmit={handleSubmit}>
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-4">Delivery Information</p>
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded'
            required
          />
          <input
            type="text"
            name="street"
            placeholder='Street'
            value={formData.street}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded'
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
            <input
              type="text"
              name="state"
              placeholder='State'
              value={formData.state}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="zip"
              placeholder='Zip code'
              value={formData.zip}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
            <input
              type="text"
              name="country"
              placeholder='Country'
              value={formData.country}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder='Phone'
            value={formData.phone}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded'
            required
          />
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 mt-2">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Cart Totals</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Discount</p>
              <p>-${discount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Proceed To Payment
          </button>
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="mb-2 text-lg font-semibold">Have a promo code?</p>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={handlePromoCodeChange}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePromoCodeSubmit}
              className="w-full md:w-auto py-3 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="mt-2 text-red-500">{promoError}</p>}
        </div>
      </div>
    </form>
    </div>
  );
};

export default PlaceOrder;
