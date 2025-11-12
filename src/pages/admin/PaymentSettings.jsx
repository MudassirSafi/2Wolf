// ==========================================
// 📁 FILE: src/pages/admin/PaymentSettings.jsx
// ==========================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const PaymentSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: true,
    paypal: true,
    cashOnDelivery: false
  });

  const handleSave = () => {
    // TODO: Integrate with backend API
    alert('Payment settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/settings" className="text-[#6D28D9] hover:text-[#5B21B6]">← Back</Link>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Payment Settings</h1>
            <p className="text-[#9CA3AF]">Configure payment gateways and options</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#E5E5E5] mb-6">Payment Methods</h2>
          <div className="space-y-6">
            {/* Stripe */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">💳</div>
                <div>
                  <h3 className="text-[#E5E5E5] font-semibold">Stripe</h3>
                  <p className="text-[#9CA3AF] text-sm">Accept credit cards, debit cards, and more</p>
                </div>
              </div>
              <button
                onClick={() => setPaymentMethods({...paymentMethods, stripe: !paymentMethods.stripe})}
                className={`w-14 h-8 rounded-full transition ${paymentMethods.stripe ? 'bg-[#6D28D9]' : 'bg-[#2A2A2A]'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${paymentMethods.stripe ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>

            {/* PayPal */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">💰</div>
                <div>
                  <h3 className="text-[#E5E5E5] font-semibold">PayPal</h3>
                  <p className="text-[#9CA3AF] text-sm">Accept PayPal payments</p>
                </div>
              </div>
              <button
                onClick={() => setPaymentMethods({...paymentMethods, paypal: !paymentMethods.paypal})}
                className={`w-14 h-8 rounded-full transition ${paymentMethods.paypal ? 'bg-[#6D28D9]' : 'bg-[#2A2A2A]'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${paymentMethods.paypal ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>

            {/* Cash on Delivery */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-2xl">💵</div>
                <div>
                  <h3 className="text-[#E5E5E5] font-semibold">Cash on Delivery</h3>
                  <p className="text-[#9CA3AF] text-sm">Accept cash payments on delivery</p>
                </div>
              </div>
              <button
                onClick={() => setPaymentMethods({...paymentMethods, cashOnDelivery: !paymentMethods.cashOnDelivery})}
                className={`w-14 h-8 rounded-full transition ${paymentMethods.cashOnDelivery ? 'bg-[#6D28D9]' : 'bg-[#2A2A2A]'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${paymentMethods.cashOnDelivery ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="px-8 py-3 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition">
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
};

export default PaymentSettings;
