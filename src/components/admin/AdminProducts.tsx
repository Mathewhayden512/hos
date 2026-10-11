import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Product, Category } from '../../types';
import { Plus, Edit2, Trash2, Search, X, Check, Star } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { categories, refreshProducts, showToast } = useShop();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: 1,
    category_name: 'Crochet Accessories',
    description: '',
    short_description: '',
    price: 35.00,
    discount_price: 0,
    stock: 10,
    image_url: '/images/crochet_bouquet.jpg',
    materials: '100% Combed Cotton Yarn',
    dimensions: 'Standard Size',
    available_colors: '["Natural Cream", "Dusty Rose", "Sage Green"]',
    available_sizes: '["Standard"]',
    is_featured: false,
    is_bestseller: false,
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({ activeOnly: false });
      setProductsList(res);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `AMS-${Math.floor(1000 + Math.random() * 9000)}`,
      category_id: categories[0]?.id || 1,
      category_name: categories[0]?.name || 'Crochet Accessories',
      description: '',
      short_description: '',
      price: 38.00,
      discount_price: 0,
      stock: 10,
      image_url: '/images/crochet_bouquet.jpg',
      materials: '100% Cotton Yarn',
      dimensions: 'Standard',
      available_colors: '["Natural Cream", "Dusty Rose"]',
      available_sizes: '["Standard"]',
      is_featured: false,
      is_bestseller: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category_id: product.category_id,
      category_name: product.category_name,
      description: product.description,
      short_description: product.short_description || '',
      price: product.price,
      discount_price: product.discount_price || 0,
      stock: product.stock,
      image_url: product.image_url,
      materials: product.materials || '100% Cotton',
      dimensions: product.dimensions || 'Standard',
      available_colors: typeof product.available_colors === 'string' ? product.available_colors : JSON.stringify(product.available_colors || []),
      available_sizes: typeof product.available_sizes === 'string' ? product.available_sizes : JSON.stringify(product.available_sizes || []),
      is_featured: !!product.is_featured,
      is_bestseller: !!product.is_bestseller,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      showToast('Product deleted successfully', 'info');
      setProductsList((prev) => prev.filter((p) => p.id !== id));
      refreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete product', 'error');
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData as any);
        showToast(`Updated "${formData.name}" successfully!`, 'success');
      } else {
        await api.createProduct(formData as any);
        showToast(`Created new product "${formData.name}"!`, 'success');
      }
      setIsModalOpen(false);
      loadProducts();
      refreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Error saving product', 'error');
    }
  };

  const filteredProducts = productsList.filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category_name.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Product Management</h1>
          <p className="text-xs text-[#879477]">Manage product catalog, prices, variations, and stock levels</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#D8CBB9] shadow-stitch">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products by name, SKU, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882]"
          />
          <Search className="w-4 h-4 text-[#879477] absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <img src={prod.image_url} alt={prod.name} className="w-10 h-10 rounded-xl object-cover border border-[#D8CBB9]" />
                    <span className="line-clamp-1">{prod.name}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#879477]">{prod.sku}</td>
                  <td className="p-4 font-semibold">{prod.category_name}</td>
                  <td className="p-4 font-serif font-bold text-[#C97882]">${prod.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${prod.stock <= 5 ? 'bg-[#FAF0F2] text-[#C97882]' : 'bg-[#EFE6D8] text-[#3B2418]'}`}>
                      {prod.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 space-x-1">
                    {prod.is_bestseller ? <span className="px-2 py-0.5 bg-[#879477] text-white text-[9px] font-bold rounded">Bestseller</span> : null}
                    {prod.is_featured ? <span className="px-2 py-0.5 bg-[#C97882] text-white text-[9px] font-bold rounded">Featured</span> : null}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      className="p-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-[#3B2418] hover:text-[#C97882]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 bg-[#FAF0F2] border border-[#E8B5B8] rounded-lg text-[#C97882]"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D8CBB9] pb-3">
              <h3 className="font-serif font-bold text-2xl text-[#3B2418]">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#879477] hover:text-[#3B2418]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-[#3B2418]">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Category *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => {
                      const selectedCat = categories.find((c) => c.id === Number(e.target.value));
                      setFormData({
                        ...formData,
                        category_id: Number(e.target.value),
                        category_name: selectedCat?.name || 'General'
                      });
                    }}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Discount / Sale Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discount_price}
                    onChange={(e) => setFormData({ ...formData, discount_price: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Current Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Primary Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-[#3B2418]">Product Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Materials</label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#3B2418]">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_bestseller}
                      onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                      className="accent-[#C97882]"
                    />
                    <span className="font-bold">Mark as Bestseller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="accent-[#C97882]"
                    />
                    <span className="font-bold">Mark as Featured</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8CBB9] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-[#FAF7EF] border border-[#D8CBB9] text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C97882] text-white text-xs font-semibold rounded-xl shadow-rose-glow"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
