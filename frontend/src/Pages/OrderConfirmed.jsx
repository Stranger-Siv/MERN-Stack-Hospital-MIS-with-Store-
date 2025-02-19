import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-4">
        <div className="mb-6 flex justify-center">
          <MdCheckCircle className="text-green-500 text-7xl animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-[#2f3d7e] mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to home in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmed; 