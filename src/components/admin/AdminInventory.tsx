import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';
import { AlertTriangle, Boxes, Save, RefreshCw } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { showToast, refreshProducts } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [stockEdits, setStockEdits] = useState<Record<number, number>>({});
  const [savingId, setSavingId] = useState<number | null>(null);

  const loadInventory = async () => {
    try {
      const res = await api.getAdminInventory();
      setProducts(res);
      const initialMap: Record<number, number> = {};
      res.forEach((p) => { initialMap[p.id] = p.stock; });
      setStockEdits(initialMap);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleStockChange = (id: number, val: number) => {
    setStockEdits((prev) => ({ ...prev, [id]: Math.max(0, val) }));
  };

  const handleSaveStock = async (id: number) => {
    const newStock = stockEdits[id];
    setSavingId(id);
    try {
      await api.updateInventoryStock(id, newStock);
      showToast('Stock level updated successfully', 'success');
      loadInventory();
      refreshProducts();
    } catch (err: any) {
      showToast(err.message || 'Error updating stock', 'error');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Inventory & Stock Control</h1>
        <p className="text-xs text-[#879477]">Monitor stock thresholds and perform fast inline inventory adjustments</p>
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Low Stock Status</th>
                <th className="p-4">Update Stock</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {products.map((prod) => {
                const isLow = prod.stock <= 5;
                const hasChanged = stockEdits[prod.id] !== prod.stock;
                return (
                  <tr key={prod.id} className={`hover:bg-[#FAF7EF]/60 transition-colors ${isLow ? 'bg-[#FAF0F2]/40' : ''}`}>
                    <td className="p-4 font-bold text-[#3B2418]">{prod.name}</td>
                    <td className="p-4 font-mono text-[#879477]">{prod.sku}</td>
                    <td className="p-4 font-semibold">{prod.category_name}</td>
                    <td className="p-4 font-serif font-bold text-[#C97882]">${prod.price.toFixed(2)}</td>
                    <td className="p-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF0F2] border border-[#E8B5B8] text-[#C97882] font-bold text-[10px] rounded-full uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low Stock ({prod.stock} left)</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#EFE6D8] text-[#879477] font-semibold text-[10px] rounded-full">
                          In Stock ({prod.stock})
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        min={0}
                        value={stockEdits[prod.id] !== undefined ? stockEdits[prod.id] : prod.stock}
                        onChange={(e) => handleStockChange(prod.id, parseInt(e.target.value) || 0)}
                        className="w-20 p-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs font-bold focus:outline-none focus:border-[#C97882]"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleSaveStock(prod.id)}
                        disabled={savingId === prod.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ml-auto ${
                          hasChanged
                            ? 'bg-[#C97882] text-white shadow-rose-glow'
                            : 'bg-[#FAF7EF] border border-[#D8CBB9] text-[#3B2418]'
                        }`}
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{savingId === prod.id ? 'Saving...' : 'Save Stock'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
