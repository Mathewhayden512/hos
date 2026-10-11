import React, { useState } from 'react';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { Eye, X, Heart, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Everlasting Rose & Daisy Bouquet',
      category: 'Crochet',
      img: '/images/crochet_bouquet.jpg',
      desc: 'Handcrafted dusty rose blossoms with cotton stems wrapped in vintage craft paper.'
    },
    {
      id: 2,
      title: 'Heirloom Newborn Knitted Cardigan & Booties',
      category: 'Baby',
      img: '/images/baby_cardigan.jpg',
      desc: 'Cream baby sweater set with wooden heart buttons and satin tie ribbons.'
    },
    {
      id: 3,
      title: 'Boho Floral Granny Square Tote',
      category: 'Accessories',
      img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      desc: '16 hand-crocheted floral granny squares with natural linen inner lining.'
    },
    {
      id: 4,
      title: 'Chunky Cable Knit Throw Blanket',
      category: 'Knitting',
      img: '/images/hero_showcase.jpg',
      desc: 'Plush hand-knitted chenille throw blanket in warm cream.'
    },
    {
      id: 5,
      title: 'Scalloped Botanical Coaster Set',
      category: 'Gifts',
      img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      desc: 'Set of 4 absorbent floral crochet mug coasters with scalloped edges.'
    },
    {
      id: 6,
      title: 'Crochet Mini Sunflower Bag Charm',
      category: 'Accessories',
      img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      desc: 'Sunny mini sunflower bag charm with anti-tarnish gold metal clasp.'
    },
    {
      id: 7,
      title: 'Botanical Cable Hand Warmer Gloves',
      category: 'Knitting',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      desc: 'Fingerless texting gloves in dusty rose cable knit.'
    },
    {
      id: 8,
      title: 'Bespoke Nursery Amigurumi Bear Set',
      category: 'Custom Orders',
      img: '/images/baby_cardigan.jpg',
      desc: 'Custom order request featuring plush amigurumi bear and monogrammed baby blanket tag.'
    }
  ];

  const categories = ['All', 'Crochet', 'Knitting', 'Gifts', 'Baby', 'Accessories', 'Custom Orders'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Craft Showcase</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Handmade Gallery</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-lg mx-auto">
          A visual celebration of our favorite custom creations, flower drops, and knitted heirlooms.
        </p>
        <LeafDivider />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#3B2418] text-white shadow-sm'
                : 'bg-[#EFE6D8] text-[#3B2418] hover:bg-[#D8CBB9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="break-inside-avoid bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] overflow-hidden shadow-stitch hover:shadow-stitch-lg transition-all group cursor-pointer relative"
          >
            <div className="relative overflow-hidden bg-[#FAF7EF]">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#3B2418]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-[#FFFDF9] rounded-full text-[#3B2418] shadow-lg">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-[10px] font-bold text-[#C97882] uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="font-serif font-bold text-base text-[#3B2418]">{item.title}</h3>
              <p className="text-xs text-[#3B2418]/70 line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-[#FFFDF9] max-w-2xl w-full rounded-3xl overflow-hidden border border-[#D8CBB9] shadow-2xl p-6 space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-[#FAF7EF] rounded-full text-[#3B2418] hover:text-[#C97882] border border-[#D8CBB9]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden bg-[#FAF7EF]">
              <img src={selectedImage.img} alt={selectedImage.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C97882] uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3B2418]">{selectedImage.title}</h3>
              <p className="text-xs text-[#3B2418]/85 leading-relaxed">{selectedImage.desc}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-5 py-2 bg-[#C97882] text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-[#b0616b]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
