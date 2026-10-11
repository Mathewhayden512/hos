import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, FolderTree } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, refreshProducts, showToast } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/hero_showcase.jpg');

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setImageUrl('/images/hero_showcase.jpg');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.image_url || '/images/hero_showcase.jpg');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await api.updateCategory(editingId, { name, description, image_url: imageUrl });
        showToast('Category updated!', 'success');
      } else {
        await api.createCategory({ name, description, image_url: imageUrl });
        showToast('Category created!', 'success');
      }
      setIsModalOpen(false);
      refreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Error saving category', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete category?')) return;
    try {
      await api.deleteCategory(id);
      showToast('Category deleted', 'info');
      refreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Category Management</h1>
          <p className="text-xs text-[#879477]">Organize products into handmade craft collections</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#C97882] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] p-5 shadow-stitch flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-4">
              <img src={cat.image_url || '/images/hero_showcase.jpg'} alt={cat.name} className="w-14 h-14 rounded-xl object-cover border border-[#D8CBB9]" />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3B2418]">{cat.name}</h3>
                <p className="text-xs text-[#879477]">{cat.item_count || 0} products in category</p>
              </div>
            </div>
            <p className="text-xs text-[#3B2418]/80 line-clamp-2">{cat.description}</p>
            <div className="pt-3 border-t border-[#D8CBB9]/60 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(cat)} className="p-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-xs font-semibold">
                <Edit2 className="w-4 h-4 text-[#3B2418]" />
              </button>
              <button onClick={() => handleDelete(cat.id)} className="p-1.5 bg-[#FAF0F2] border border-[#E8B5B8] rounded-lg text-xs font-semibold text-[#C97882]">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-md w-full rounded-3xl p-6 border border-[#D8CBB9] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#3B2418]">
              {editingId ? 'Edit Category' : 'Create Category'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#3B2418]">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-[#3B2418]">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-[#3B2418]">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-[#FAF7EF] border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#C97882] text-white rounded-xl font-semibold">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
