import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const AdminShippingPanel = () => {
  const [activeTab, setActiveTab] = useState('shipments');
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  // Fetch pending orders (orders without shipment)
  useEffect(() => {
    if (activeTab === 'create') {
      fetchPendingOrders();
    }
  }, [activeTab]);

  // Fetch all shipments
  useEffect(() => {
    if (activeTab === 'shipments') {
      fetchShipments();
    }
  }, [activeTab]);

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders?status=Pending,Processing', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/shipping/all', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setShipments(data.shipments || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
    setLoading(false);
  };

  const createShipment = async (orderId) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/shipping/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ orderId })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(`✅ Shipment created!\nTracking: ${data.trackingNumber}`);
        fetchPendingOrders();
        setActiveTab('shipments');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      alert('Error creating shipment');
      console.error(error);
    }
    setLoading(false);
  };

  const trackShipment = async () => {
    if (!trackingNumber) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/shipping/track/${trackingNumber}`);
      const data = await response.json();
      
      if (response.ok) {
        setTrackingData(data.tracking);
      } else {
        alert('Tracking not found');
      }
    } catch (error) {
      alert('Error tracking shipment');
      console.error(error);
    }
    setLoading(false);
  };

  const downloadLabel = async (trackingNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shipping/label/${trackingNumber}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      
      if (response.ok) {
        window.open(data.label.labelUrl, '_blank');
      } else {
        alert('Label not available');
      }
    } catch (error) {
      alert('Error downloading label');
      console.error(error);
    }
  };

  const cancelShipment = async (trackingNumber) => {
    if (!confirm('Are you sure you want to cancel this shipment?')) return;
    
    const reason = prompt('Enter cancellation reason:');
    if (!reason) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/shipping/cancel/${trackingNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reason })
      });
      
      if (response.ok) {
        alert('✅ Shipment cancelled successfully');
        fetchShipments();
      } else {
        alert('Failed to cancel shipment');
      }
    } catch (error) {
      alert('Error cancelling shipment');
      console.error(error);
    }
  };

  const schedulePickup = async () => {
    const pickupDate = prompt('Enter pickup date (YYYY-MM-DD):');
    if (!pickupDate) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/shipping/schedule-pickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          pickupDate,
          pickupTime: '09:00-18:00',
          totalQuantity: 1,
          remark: 'Regular pickup'
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(`✅ Pickup scheduled!\nPickup No: ${data.pickup.pickupNo}`);
      } else {
        alert('Failed to schedule pickup');
      }
    } catch (error) {
      alert('Error scheduling pickup');
      console.error(error);
    }
  };

  return (
    <AdminLayout>  {/* ✅ Wrap everything */}
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            📦 J&T Express Shipping Management
          </h1>
          <p className="text-gray-400">Manage shipments, track packages, and schedule pickups</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto">
          {[
            { id: 'shipments', label: '📋 All Shipments', icon: '📦' },
            { id: 'create', label: '➕ Create Shipment', icon: '🚚' },
            { id: 'track', label: '🔍 Track Package', icon: '📍' },
            { id: 'pickup', label: '📅 Schedule Pickup', icon: '🏪' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
          
          {/* All Shipments Tab */}
          {activeTab === 'shipments' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">All Shipments</h2>
              {loading ? (
                <p className="text-center py-8">Loading shipments...</p>
              ) : shipments.length === 0 ? (
                <p className="text-center py-8 text-gray-400">No shipments yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left">Tracking #</th>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Destination</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map(shipment => (
                        <tr key={shipment._id} className="border-t border-gray-700 hover:bg-gray-700/30">
                          <td className="px-4 py-3 font-mono text-sm">{shipment.trackingNumber}</td>
                          <td className="px-4 py-3 text-sm">{shipment.order?._id.slice(-6)}</td>
                          <td className="px-4 py-3">{shipment.receiver.name}</td>
                          <td className="px-4 py-3">{shipment.receiver.city}, {shipment.receiver.countryCode}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              shipment.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                              shipment.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                              shipment.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setTrackingNumber(shipment.trackingNumber);
                                  setActiveTab('track');
                                }}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                                title="Track"
                              >
                                🔍
                              </button>
                              <button
                                onClick={() => downloadLabel(shipment.trackingNumber)}
                                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
                                title="Download Label"
                              >
                                🏷️
                              </button>
                              {shipment.status !== 'Delivered' && shipment.status !== 'Cancelled' && (
                                <button
                                  onClick={() => cancelShipment(shipment.trackingNumber)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                                  title="Cancel"
                                >
                                  ❌
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Create Shipment Tab */}
          {activeTab === 'create' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Create New Shipment</h2>
              {loading ? (
                <p className="text-center py-8">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-center py-8 text-gray-400">No pending orders</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-400">Customer</p>
                          <p className="font-medium">{order.shippingAddress?.fullName}</p>
                          <p className="text-sm">{order.shippingAddress?.mobile}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Delivery Address</p>
                          <p className="text-sm">{order.shippingAddress?.address}</p>
                          <p className="text-sm">{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                        <div>
                          <p className="text-sm text-gray-400">Total Amount</p>
                          <p className="text-xl font-bold text-purple-400">${order.total.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => createShipment(order._id)}
                          disabled={loading}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold disabled:opacity-50"
                        >
                          🚚 Create Shipment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Track Package Tab */}
          {activeTab === 'track' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Track Package</h2>
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="flex-1 px-4 py-3 bg-gray-700 rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={trackShipment}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold disabled:opacity-50"
                  >
                    🔍 Track
                  </button>
                </div>

                {trackingData && (
                  <div className="space-y-4">
                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Tracking: {trackingData.billCode}</h3>
                        <span className={`px-4 py-2 rounded-full font-semibold ${
                          trackingData.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                          trackingData.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {trackingData.status}
                        </span>
                      </div>
                      <p className="text-gray-400">
                        📍 Current Location: <span className="text-white">{trackingData.currentLocation}</span>
                      </p>
                      {trackingData.lastUpdate && (
                        <p className="text-sm text-gray-500 mt-2">
                          Last updated: {new Date(trackingData.lastUpdate).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                      <h4 className="font-bold mb-4">📜 Tracking History</h4>
                      <div className="space-y-3">
                        {trackingData.history?.map((event, idx) => (
                          <div key={idx} className="flex gap-4 pb-3 border-b border-gray-600 last:border-0">
                            <div className="flex-shrink-0">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{event.status}</p>
                              <p className="text-sm text-gray-400">{event.location}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(event.time).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Pickup Tab */}
          {activeTab === 'pickup' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Schedule Pickup</h2>
              <div className="max-w-2xl mx-auto bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <p className="text-gray-400 mb-6">
                  Schedule a pickup for your packages. J&T Express will collect from your warehouse.
                </p>
                <button
                  onClick={schedulePickup}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold"
                >
                  📅 Schedule Pickup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </AdminLayout>
  );
};

export default AdminShippingPanel;