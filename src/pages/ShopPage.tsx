import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, Filter, SlidersHorizontal, Heart, ShoppingBag, Eye, X } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const ShopPage: React.FC = () => {
  const { products, categories, toggleWishlist, isWishlisted, addToCart } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const searchQueryParam = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popularity'>('newest');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(150);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (selectedCategory !== 'all') {
        const catMatch = categories.find((c) => c.slug === selectedCategory || c.name.toLowerCase() === selectedCategory.toLowerCase());
        if (catMatch && p.category_id !== catMatch.id && p.category_name !== catMatch.name) {
          return false;
        }
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category_name.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Max price check
      const currentPrice = p.discount_price && p.discount_price > 0 ? p.discount_price : p.price;
      if (currentPrice > maxPriceFilter) return false;

      // Stock check
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discount_price && a.discount_price > 0 ? a.discount_price : a.price;
      const priceB = b.discount_price && b.discount_price > 0 ? b.discount_price : b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'popularity') return (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0);
      return b.id - a.id;
    });
  }, [products, categories, selectedCategory, searchQuery, maxPriceFilter, inStockOnly, sortBy]);

  const handleCategorySelect = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setSearchParams(catSlug === 'all' ? {} : { category: catSlug });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPriceFilter(150);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Artisanal Boutique</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Shop Handmade Creations</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-lg mx-auto">
          Browse our collection of hand-crocheted bouquets, knitted baby gifts, bags, and home decor items.
        </p>
        <LeafDivider />
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] p-5 shadow-stitch space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882]"
            />
            <Search className="w-4 h-4 text-[#879477] absolute left-3.5 top-3" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-[#3B2418]/50 hover:text-[#3B2418]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Availability Controls */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <label className="flex items-center gap-2 text-xs font-medium text-[#3B2418] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#C97882] focus:ring-0 accent-[#C97882]"
              />
              <span>In Stock Only</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#879477] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl px-3 py-2 text-xs text-[#3B2418] font-medium focus:outline-none focus:border-[#C97882]"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity / Bestseller</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#3B2418] text-white shadow-sm'
                : 'bg-[#EFE6D8] text-[#3B2418] hover:bg-[#D8CBB9]'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#C97882] text-white shadow-sm'
                  : 'bg-[#EFE6D8] text-[#3B2418] hover:bg-[#D8CBB9]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-xs text-[#879477] font-medium px-1">
        <span>Showing {filteredProducts.length} handcrafted pieces</span>
        {(selectedCategory !== 'all' || searchQuery || inStockOnly) && (
          <button onClick={handleResetFilters} className="text-[#C97882] hover:underline font-semibold">
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-3xl p-14 text-center border border-[#D8CBB9] space-y-4">
          <p className="font-serif text-2xl text-[#3B2418] font-bold">No handmade items found</p>
          <p className="text-xs text-[#3B2418]/70">Try adjusting your category filter or search keywords.</p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#C97882] text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-[#b0616b]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] overflow-hidden shadow-stitch hover:shadow-stitch-lg transition-all group flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-[#FAF7EF] overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.stock <= 0 ? (
                    <span className="px-2.5 py-1 bg-[#3B2418] text-white text-[10px] font-bold uppercase rounded-full shadow">
                      Sold Out
                    </span>
                  ) : product.discount_price && product.discount_price > 0 ? (
                    <span className="px-2.5 py-1 bg-[#C97882] text-white text-[10px] font-bold uppercase rounded-full shadow">
                      Sale
                    </span>
                  ) : product.is_bestseller ? (
                    <span className="px-2.5 py-1 bg-[#879477] text-white text-[10px] font-bold uppercase rounded-full shadow">
                      Bestseller
                    </span>
                  ) : null}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow transition-all ${
                    isWishlisted(product.id)
                      ? 'bg-[#C97882] text-white'
                      : 'bg-[#FFFDF9]/90 text-[#3B2418] hover:text-[#C97882]'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Quick Actions Hover */}
                <div className="absolute inset-0 bg-[#3B2418]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-3 bg-[#FFFDF9] text-[#3B2418] hover:text-[#C97882] rounded-full shadow-lg transition-transform transform hover:scale-110"
                    title="View Product Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {product.stock > 0 && (
                    <button
                      onClick={() => addToCart(product)}
                      className="p-3 bg-[#C97882] text-white hover:bg-[#b0616b] rounded-full shadow-lg transition-transform transform hover:scale-110"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#879477] uppercase tracking-wider">
                    {product.category_name}
                  </span>
                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="font-serif font-bold text-base text-[#3B2418] hover:text-[#C97882] cursor-pointer transition-colors line-clamp-1 mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#3B2418]/70 line-clamp-2 mt-1">
                    {product.short_description || product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D8CBB9]/60 flex items-center justify-between">
                  <div>
                    {product.discount_price && product.discount_price > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-lg text-[#C97882]">
                          ${product.discount_price.toFixed(2)}
                        </span>
                        <span className="text-xs line-through text-[#3B2418]/50">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-serif font-bold text-lg text-[#3B2418]">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={product.stock <= 0}
                    onClick={() => addToCart(product)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                      product.stock <= 0
                        ? 'bg-[#EFE6D8] text-[#3B2418]/40 border-transparent cursor-not-allowed'
                        : 'bg-[#FAF7EF] hover:bg-[#C97882] hover:text-white border-[#D8CBB9] text-[#3B2418]'
                    }`}
                  >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
