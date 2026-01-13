// ==========================================
// 📁 FILE 5: src/components/myAccount/OrderDetailModal.jsx
// ==========================================
import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaBox, FaPhone, FaDownload, FaCheckCircle, FaClock, FaShippingFast } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function OrderDetailModal({ order, onClose }) {
  const downloadInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/orders/${order._id}/invoice`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.invoice?.path) {
          window.open(`${API_BASE_URL}${data.invoice.path}`, '_blank');
        } else {
          alert('Invoice not available yet');
        }
      }
    } catch (error) {
      alert('Failed to download invoice');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      case 'Shipped': return <FaShippingFast className="text-blue-500" />;
      case 'Processing': return <FaClock className="text-orange-500" />;
      default: return <FaBox className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h3 className="text-2xl font-bold">Order Details</h3>
            <p className="text-sm text-gray-600">#{order._id}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="font-semibold">{order.status}</span>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="font-bold text-orange-600">AED {order.total.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Payment</p>
            <p className="font-semibold text-green-600">{order.paymentStatus}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-bold mb-4">Items</h4>
          <div className="space-y-3">
            {order.products.map((item, idx) => (
              <div key={idx} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <img
                  src={item.productId?.images?.[0] || item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.productId?.name || item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity} × AED {item.price.toFixed(2)}</p>
                </div>
                <p className="font-bold text-orange-600">AED {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {order.shippingAddress && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <FaShippingFast className="text-blue-600" />
              Delivery Address
            </h4>
            <p className="font-semibold">{order.shippingAddress.fullName || 'Customer'}</p>
            <p>{order.shippingAddress.address || order.shippingAddress}</p>
            {order.shippingAddress.city && <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>}
            {order.shippingAddress.mobile && (
              <p className="mt-2 flex items-center gap-2">
                <FaPhone className="text-blue-600" />
                {order.shippingAddress.mobile}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={downloadInvoice}
            className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <FaDownload />
            Download Invoice
          </button>
          <button onClick={onClose} className="flex-1 py-3 bg-gray-200 rounded-xl">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderDetailModal;