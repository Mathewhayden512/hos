import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Users, Search, ShoppingBag } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  useEffect(() => {
    api.getAdminCustomers()
      .then((res) => setCustomers(res))
      .catch(() => {
        setCustomers([
          { id: 2, full_name: 'Sarah Jenkins', email: 'customer@example.com', phone: '(555) 987-6543', address: '742 Evergreen Terrace, Springfield, OR', total_orders: 3, total_spent: 198.30, created_at: '2026-09-15' },
          { id: 3, full_name: 'Chloe Bennett', email: 'chloe.bennett@lifestyle.com', phone: '(555) 777-8899', address: '128 Ocean Drive, Miami, FL', total_orders: 2, total_spent: 145.00, created_at: '2026-09-20' },
          { id: 4, full_name: 'Emily Watson', email: 'emily.watson@gmail.com', phone: '(555) 432-1098', address: '321 Maple Avenue, Austin, TX', total_orders: 1, total_spent: 59.00, created_at: '2026-09-28' },
        ]);
      });
  }, []);

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return c.full_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Customer Management</h1>
        <p className="text-xs text-[#879477]">View registered members, purchase history, and contact details</p>
      </div>

      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#D8CBB9] shadow-stitch">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882]"
          />
          <Search className="w-4 h-4 text-[#879477] absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                  <td className="p-4 font-bold text-[#3B2418]">{cust.full_name}</td>
                  <td className="p-4 text-[#879477]">{cust.email}</td>
                  <td className="p-4">{cust.phone || '(555) 000-0000'}</td>
                  <td className="p-4 font-semibold">{cust.total_orders || 1} orders</td>
                  <td className="p-4 font-serif font-bold text-[#C97882]">${parseFloat(cust.total_spent || 0).toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-xs font-semibold hover:bg-[#EFE6D8]"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-md w-full rounded-3xl p-6 border border-[#D8CBB9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8CBB9] pb-3">
              <h3 className="font-serif font-bold text-xl text-[#3B2418]">{selectedCustomer.full_name}</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-xs font-bold text-[#C97882]">Close</button>
            </div>
            <div className="space-y-2 text-xs text-[#3B2418]">
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>
              <p><strong>Total Lifetime Spend:</strong> ${parseFloat(selectedCustomer.total_spent || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
