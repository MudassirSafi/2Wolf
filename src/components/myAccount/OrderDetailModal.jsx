// src/components/myAccount/OrderDetailModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaBox, FaShippingFast, FaPhone, FaDownload,
  FaCheckCircle, FaClock 
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function OrderDetailModal({ order, onClose }) {
  const navigate = useNavigate();

  const downloadInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/invoices/${order._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.invoice?.path) {
          window.open(`${API_BASE_URL}${data.invoice.path}`, '_blank');
        } else {
          alert('Invoice will be available once order is confirmed');
        }
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
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
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Order Details</h3>
            <p className="text-sm text-gray-600">#{order._id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Order Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="font-semibold text-gray-900">{order.status}</span>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-orange-600">AED {order.total.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Payment</p>
            <span className={`font-semibold ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Products List */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaBox className="text-orange-500" />
            Items ({order.products.length})
          </h4>
          <div className="space-y-3">
            {order.products.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                <img
                  src={item.productId?.images?.[0] || item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1 truncate">
                    {item.productId?.name || item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × AED {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg sm:text-xl font-bold text-orange-600">
                    AED {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>AED {(order.subtotal || order.total).toFixed(2)}</span>
            </div>
            {order.shippingFee > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>AED {order.shippingFee.toFixed(2)}</span>
              </div>
            )}
            {order.tax > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>AED {order.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">AED {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaShippingFast className="text-blue-600" />
              Delivery Address
            </h4>
            <div className="text-gray-700 text-sm sm:text-base">
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              {order.shippingAddress.postCode && <p>Postal Code: {order.shippingAddress.postCode}</p>}
              <p className="mt-2 flex items-center gap-2">
                <FaPhone className="text-blue-600" />
                {order.shippingAddress.mobile}
              </p>
            </div>
          </div>
        )}

        {/* Tracking Info */}
        {order.shipping?.trackingNumber && (
          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Tracking Information</h4>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">
              <strong>Tracking Number:</strong> {order.shipping.trackingNumber}
            </p>
            <p className="text-gray-700 mb-3 text-sm sm:text-base">
              <strong>Carrier:</strong> {order.shipping.carrier || 'J&T Express'}
            </p>
            <button
              onClick={() => {
                onClose();
                navigate(`/track-order/${order.shipping.trackingNumber}`);
              }}
              className="w-full py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
            >
              Track Shipment
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={downloadInvoice}
            className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-2"
          >
            <FaDownload />
            Download Invoice
          </button>
          <button
            onClick={onClose}
            className="py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}