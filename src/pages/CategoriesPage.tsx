import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Craft Collections</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Browse by Category</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-xl mx-auto">
          Explore our handcrafted categories designed to bring warmth, beauty, and faith into your everyday life.
        </p>
        <LeafDivider />
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch hover:shadow-stitch-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden bg-[#FAF7EF]">
              <img
                src={cat.image_url || '/images/hero_showcase.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2418]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider bg-[#C97882] px-2.5 py-1 rounded-full text-white">
                  {cat.item_count ? `${cat.item_count} Items` : 'Craft Collection'}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-2 drop-shadow-sm">{cat.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#3B2418]/80 leading-relaxed">
                {cat.description}
              </p>

              <Link
                to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="w-full py-3 bg-[#FAF7EF] hover:bg-[#C97882] hover:text-white border border-[#D8CBB9] rounded-xl text-xs font-semibold text-[#3B2418] transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Creation Callout */}
      <div className="bg-[#FAF0F2] rounded-3xl p-8 sm:p-12 border border-[#E8B5B8] shadow-stitch flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif text-2xl font-bold text-[#3B2418]">Looking for something custom?</h3>
          <p className="text-xs text-[#3B2418]/80 max-w-md">
            We love bringing personalized crochet flowers, baby blankets, and unique gifts to life.
          </p>
        </div>
        <Link
          to="/custom-orders"
          className="px-6 py-3.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Request Custom Order</span>
        </Link>
      </div>

    </div>
  );
};
