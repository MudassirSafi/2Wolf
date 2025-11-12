// ==========================================
// 📁 FILE: src/pages/admin/Products.jsx
// ==========================================
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../hooks/useProducts';
import AddProductModal from './AddProductModal';

const Products = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || p.category === filterCategory)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Products</h1>
            <p className="text-[#9CA3AF]">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition"
          >
            + Add New Product
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
          >
            <option>All</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Footwear</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Product</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">SKU</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Price</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Stock</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => (
                <tr key={product.id} className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'} hover:bg-[#2A2A2A] transition`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-[#E5E5E5] font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{product.sku}</td>
                  <td className="py-4 px-6 text-[#E5E5E5] font-semibold">${product.price}</td>
                  <td className="py-4 px-6 text-[#E5E5E5]">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-[#6D28D9] hover:text-[#5B21B6] transition">✏️</button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:text-red-500 transition">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <AddProductModal onClose={() => setShowAddModal(false)} onAdd={addProduct} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;

