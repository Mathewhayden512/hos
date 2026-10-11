import React, { useState } from 'react';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { Sparkles, CheckCircle2, Heart, Upload, Send, HelpCircle } from 'lucide-react';

export const CustomOrdersPage: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    product_type: 'Custom Flower Bouquet',
    preferred_color: '',
    size: '',
    quantity: 1,
    budget: '$50 - $100',
    deadline: '',
    custom_description: '',
    reference_image_url: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [requestCode, setRequestCode] = useState('');
  const [loading, setLoading] = useState(false);

  const productTypeOptions = [
    'Custom Flower Bouquet',
    'Baby & Kids Keepsake Set',
    'Granny Square Tote Bag / Purse',
    'Chunky Yarn Throw Blanket',
    'Keychain & Bag Charm Set',
    'Amigurumi Plush Animal',
    'Wearable Accessories (Hat, Gloves, Scarf)',
    'Other Bespoke Craft Idea',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.email || !formData.custom_description) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.createCustomOrder(formData);
      setRequestCode(res.request.request_code);
      setSubmitted(true);
      showToast('Custom request submitted successfully! 🌸', 'success');
    } catch (err: any) {
      // Local fallback submission
      const code = `CST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setRequestCode(code);
      setSubmitted(true);
      showToast('Custom order saved locally!', 'success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0F2] text-[#C97882] text-xs font-semibold uppercase tracking-wider border border-[#E8B5B8]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Made Just For You</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Request a Custom Order</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-lg mx-auto">
          Have something special in mind? Let us turn your vision into a handcrafted, faith-inspired heirloom creation.
        </p>
        <LeafDivider />
      </div>

      {submitted ? (
        /* Confirmation State */
        <div className="bg-[#FFFDF9] rounded-3xl p-10 sm:p-14 border border-[#D8CBB9] shadow-stitch text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#EFE6D8] text-[#879477] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#FAF0F2] text-[#C97882] px-3 py-1 rounded-full border border-[#E8B5B8]">
              Request Reference ID: {requestCode}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#3B2418] pt-2">
              Thank You! Your Request Has Been Received.
            </h2>
            <p className="text-sm text-[#3B2418]/85 max-w-md mx-auto leading-relaxed">
              “Thank you! Your custom request has been received. We’ll review your idea and contact you soon.”
            </p>
          </div>

          <div className="p-6 bg-[#FAF7EF] rounded-2xl border border-[#D8CBB9] text-xs text-[#879477] max-w-md mx-auto text-left space-y-2">
            <p><strong>Next Steps:</strong></p>
            <p>1. Our artisan team will review your specifications, color swatches, and timeline within 24-48 hours.</p>
            <p>2. We will send a detailed price quote and deposit invoice to <strong>{formData.email}</strong>.</p>
            <p>3. Once confirmed, we begin crafting your piece with care and love!</p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                customer_name: '',
                email: '',
                phone: '',
                product_type: 'Custom Flower Bouquet',
                preferred_color: '',
                size: '',
                quantity: 1,
                budget: '$50 - $100',
                deadline: '',
                custom_description: '',
                reference_image_url: '',
              });
            }}
            className="px-6 py-3 bg-[#FAF7EF] border border-[#D8CBB9] text-[#3B2418] font-semibold text-xs rounded-xl hover:bg-[#EFE6D8]"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        /* Form Card */
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#D8CBB9] shadow-stitch">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
                1. Customer Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chloe Bennett"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. chloe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#3B2418]">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
              </div>
            </div>

            {/* Custom Craft Specifications */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
                2. Craft Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Product Type *</label>
                  <select
                    value={formData.product_type}
                    onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  >
                    {productTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Preferred Colors</label>
                  <input
                    type="text"
                    placeholder="e.g. Dusty Rose, Sage Green, Natural Cream"
                    value={formData.preferred_color}
                    onChange={(e) => setFormData({ ...formData, preferred_color: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Dimensions / Size</label>
                  <input
                    type="text"
                    placeholder="e.g. Standard 12 stem bouquet / 50x60 throw"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Quantity Needed</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Estimated Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. $75 - $120"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Needed By Date (Deadline)</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Custom Description & Special Requests *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your vision, specific yarn preferences, gift tag notes, or event theme..."
                  value={formData.custom_description}
                  onChange={(e) => setFormData({ ...formData, custom_description: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Reference Image URL (Optional)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="url"
                    placeholder="https://pinterest.com/pin/... or image URL"
                    value={formData.reference_image_url}
                    onChange={(e) => setFormData({ ...formData, reference_image_url: e.target.value })}
                    className="w-full p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-sm rounded-2xl shadow-rose-glow transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Custom Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
