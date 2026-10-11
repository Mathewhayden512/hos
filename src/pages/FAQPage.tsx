import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FAQ } from '../types';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { Search, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [openId, setOpenId] = useState<number | null>(1);

  useEffect(() => {
    api.getFaqs()
      .then((res) => setFaqs(res))
      .catch(() => {
        setFaqs([
          {
            id: 1,
            category: 'Custom Orders',
            question: 'How do custom order requests work?',
            answer: 'Simply fill out our Custom Order Request form with your vision, preferred colors, and budget. We will review your request within 24-48 hours and provide a detailed quote and estimated completion timeline.',
            is_active: 1,
            order_num: 1,
          },
          {
            id: 2,
            category: 'Shipping & Delivery',
            question: 'What is the processing time for handmade items?',
            answer: 'Ready-to-ship items are dispatched within 2-3 business days. Custom handmade creations usually take 1-2 weeks depending on complexity and yarn availability.',
            is_active: 1,
            order_num: 2,
          },
          {
            id: 3,
            category: 'Care Instructions',
            question: 'How should I clean and wash my crochet items?',
            answer: 'We recommend gentle handwashing in cold water with mild detergent. Reshape laying flat on a dry towel. Avoid harsh wringing or machine drying.',
            is_active: 1,
            order_num: 3,
          },
          {
            id: 4,
            category: 'Materials',
            question: 'What kind of yarn and materials do you use?',
            answer: 'We exclusively select premium 100% combed cotton, ultra-soft merino wool blends, and eco-certified hypoallergenic yarns free of harsh dyes.',
            is_active: 1,
            order_num: 4,
          },
        ]);
      });
  }, []);

  const categories = ['All', 'Custom Orders', 'Shipping & Delivery', 'Care Instructions', 'Materials'];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeTab !== 'All' && faq.category !== activeTab) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Help Center</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Frequently Asked Questions</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-lg mx-auto">
          Find answers to common questions about ordering, custom creations, yarn quality, and shipping.
        </p>
        <LeafDivider />
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search questions (e.g. shipping time, washing)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#D8CBB9] rounded-2xl text-xs text-[#3B2418] shadow-stitch focus:outline-none focus:border-[#C97882]"
        />
        <Search className="w-5 h-5 text-[#879477] absolute left-3.5 top-3.5" />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === cat
                ? 'bg-[#3B2418] text-white shadow-sm'
                : 'bg-[#EFE6D8] text-[#3B2418] hover:bg-[#D8CBB9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-[#FFFDF9] p-8 rounded-2xl border border-[#D8CBB9] text-center text-xs text-[#879477]">
            No FAQ entries found matching your query.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] overflow-hidden shadow-stitch transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#3B2418] hover:text-[#C97882] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#879477] flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#879477] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-[#3B2418]/85 leading-relaxed border-t border-[#EFE6D8] pt-3 bg-[#FAF7EF]/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-[#FAF0F2] rounded-3xl p-8 border border-[#E8B5B8] text-center space-y-3">
        <h3 className="font-serif text-2xl font-bold text-[#3B2418]">Have a question not listed here?</h3>
        <p className="text-xs text-[#3B2418]/80 max-w-sm mx-auto">
          Our craft studio is always happy to assist with custom requests, sizing advice, or gift orders.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C97882] text-white rounded-xl text-xs font-semibold shadow-rose-glow hover:bg-[#b0616b]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact Customer Support</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
