import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { Product, Review } from '../types';
import { Heart, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, Send, Check } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isWishlisted, showToast } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Review Form
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProductData = async () => {
      try {
        const res = await api.getProduct(id);
        setProduct(res.product);
        setReviews(res.reviews || []);
        setRelated(res.related || []);
        setSelectedImage(res.product.image_url);

        // Color setup
        const colorsArr = Array.isArray(res.product.available_colors)
          ? res.product.available_colors
          : typeof res.product.available_colors === 'string'
          ? JSON.parse(res.product.available_colors)
          : ['Natural Cream'];
        if (colorsArr.length) setSelectedColor(colorsArr[0]);

        // Size setup
        const sizesArr = Array.isArray(res.product.available_sizes)
          ? res.product.available_sizes
          : typeof res.product.available_sizes === 'string'
          ? JSON.parse(res.product.available_sizes)
          : ['Standard'];
        if (sizesArr.length) setSelectedSize(sizesArr[0]);
      } catch (err) {
        // Fallback from cache
        const found = products.find((p) => String(p.id) === id || p.slug === id);
        if (found) {
          setProduct(found);
          setSelectedImage(found.image_url);
        }
      }
    };

    fetchProductData();
  }, [id, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#C97882] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="font-serif text-[#3B2418]">Loading handcrafted creation details...</p>
      </div>
    );
  }

  const colorsList: string[] = Array.isArray(product.available_colors)
    ? product.available_colors
    : typeof product.available_colors === 'string'
    ? JSON.parse(product.available_colors || '[]')
    : ['Natural Cream'];

  const sizesList: string[] = Array.isArray(product.available_sizes)
    ? product.available_sizes
    : typeof product.available_sizes === 'string'
    ? JSON.parse(product.available_sizes || '[]')
    : ['Standard'];

  const galleryImages: string[] = [
    product.image_url,
    ...(Array.isArray(product.additional_images)
      ? product.additional_images
      : typeof product.additional_images === 'string'
      ? JSON.parse(product.additional_images || '[]')
      : [])
  ].filter(Boolean);

  const activePrice = product.discount_price && product.discount_price > 0 ? product.discount_price : product.price;

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    try {
      const newRev = await api.createReview({
        product_id: product.id,
        customer_name: reviewerName,
        rating: reviewerRating,
        comment: reviewerComment,
      });
      setReviews((prev) => [newRev, ...prev]);
      setReviewSubmitted(true);
      showToast('Thank you! Your product review has been published.', 'success');
      setReviewerName('');
      setReviewerComment('');
    } catch (err: any) {
      showToast('Review saved locally!', 'success');
      setReviewSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#879477] hover:text-[#3B2418] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      {/* Main Grid: Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#FAF7EF] border border-[#D8CBB9] shadow-stitch relative">
            <img
              src={selectedImage || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discount_price && product.discount_price > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#C97882] text-white text-xs font-bold uppercase rounded-full shadow">
                Sale Offer
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === imgUrl ? 'border-[#C97882] scale-105' : 'border-[#D8CBB9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Meta & Options (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#879477]">
              {product.category_name} • SKU: {product.sku}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3B2418] font-bold">
              {product.name}
            </h1>
            
            {/* Rating summary */}
            <div className="flex items-center gap-3 text-xs text-[#879477] pt-1">
              <div className="flex text-[#C97882]">
                {'★'.repeat(5)}
              </div>
              <span>({reviews.length} customer reviews)</span>
              <span>•</span>
              <span className="text-[#879477] font-medium">In Stock: {product.stock} items</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-2 border-y border-[#D8CBB9]/60 flex items-center gap-4">
            {product.discount_price && product.discount_price > 0 ? (
              <>
                <span className="font-serif text-3xl font-bold text-[#C97882]">
                  ${product.discount_price.toFixed(2)}
                </span>
                <span className="text-base line-through text-[#3B2418]/50">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-semibold bg-[#FAF0F2] text-[#C97882] px-2.5 py-1 rounded-full border border-[#E8B5B8]">
                  Save ${(product.price - product.discount_price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-serif text-3xl font-bold text-[#3B2418]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-[#3B2418]/85 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {colorsList.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#3B2418]">
                Color Palette: <span className="font-semibold text-[#C97882]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colorsList.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedColor === color
                        ? 'bg-[#3B2418] text-white border-[#3B2418] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#3B2418] border-[#D8CBB9] hover:border-[#C97882]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizesList.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#3B2418]">
                Size / Dimension: <span className="font-semibold text-[#879477]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizesList.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#879477] text-white border-[#879477] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#3B2418] border-[#D8CBB9] hover:border-[#879477]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#D8CBB9] rounded-xl bg-[#FFFDF9] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center font-bold text-[#3B2418] hover:bg-[#EFE6D8] rounded-lg"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center font-bold text-[#3B2418] hover:bg-[#EFE6D8] rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                className="flex-1 py-3.5 px-6 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-sm rounded-xl shadow-rose-glow transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isWishlisted(product.id)
                    ? 'bg-[#C97882] text-white border-[#C97882]'
                    : 'bg-[#FFFDF9] text-[#3B2418] border-[#D8CBB9] hover:text-[#C97882]'
                }`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-[#3B2418] hover:bg-[#28170F] text-[#FAF7EF] font-semibold text-sm rounded-xl shadow transition-all"
            >
              Buy Now with Express Checkout
            </button>
          </div>

          {/* Craft Guarantee Box */}
          <div className="bg-[#EFE6D8]/50 p-5 rounded-2xl border border-[#D8CBB9] space-y-3 text-xs text-[#3B2418]">
            <div className="flex items-center gap-2 font-semibold text-[#879477]">
              <ShieldCheck className="w-4 h-4" />
              <span>Materials: {product.materials || '100% Combed Cotton'}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#879477]">
              <Truck className="w-4 h-4" />
              <span>Ships within 2-3 business days in eco botanical packaging</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#879477]">
              <RefreshCw className="w-4 h-4" />
              <span>Handmade Guarantee & Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT REVIEWS SECTION */}
      <section className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#D8CBB9] shadow-stitch space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2418]">Customer Reviews</h2>
            <p className="text-xs text-[#879477] font-medium mt-1">Real feedback from verified craft owners</p>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF0F2] px-4 py-2 rounded-2xl border border-[#E8B5B8]">
            <Star className="w-4 h-4 fill-current text-[#C97882]" />
            <span className="font-bold text-sm text-[#3B2418]">5.0 out of 5</span>
          </div>
        </div>

        {/* Write a Review Form */}
        <div className="bg-[#FAF7EF] p-6 rounded-2xl border border-[#D8CBB9] space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#3B2418]">Share Your Experience</h3>
          {reviewSubmitted ? (
            <div className="flex items-center gap-2 text-sm text-[#879477] font-semibold bg-[#EFE6D8] p-4 rounded-xl">
              <Check className="w-5 h-5" />
              <span>Thank you! Your review has been recorded.</span>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FFFDF9] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Rating</label>
                  <select
                    value={reviewerRating}
                    onChange={(e) => setReviewerRating(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 bg-[#FFFDF9] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  >
                    <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you loved about this handmade piece..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FFFDF9] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C97882] hover:bg-[#b0616b] text-white text-xs font-semibold rounded-xl shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          )}
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-xs text-[#879477] italic">No reviews submitted yet for this item. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D8CBB9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#3B2418]">{rev.customer_name}</span>
                  <div className="flex text-[#C97882] text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs text-[#3B2418]/80 leading-relaxed">{rev.comment}</p>
                <span className="text-[10px] text-[#879477]">{new Date(rev.created_at || Date.now()).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#3B2418]">You May Also Love</h2>
            <LeafDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] overflow-hidden p-4 shadow-stitch hover:shadow-stitch-lg transition-all group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7EF] mb-3">
                  <img src={rel.image_url} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-serif font-bold text-sm text-[#3B2418] line-clamp-1">{rel.name}</h3>
                <p className="font-serif font-bold text-sm text-[#C97882] mt-1">${rel.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
