import React from 'react';
import { useShop } from '../context/ShopContext';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { Heart, Sparkles, Award, ShieldCheck, Sun, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const { settings } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Our Story & Purpose</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#3B2418]">
          {settings.about_headline || 'Slow Handmade Creation, Woven with Purpose'}
        </h1>
        <p className="font-serif italic text-xl text-[#879477]">
          “Handmade with Love, Rooted in Faith.”
        </p>
        <LeafDivider />
      </div>

      {/* Main Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Image */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border-4 border-[#FFFDF9] shadow-stitch-lg bg-[#FAF7EF]">
            <img
              src="/images/hero_showcase.jpg"
              alt="Hannah Grace Crafting"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#FFFDF9]/90 backdrop-blur-md p-4 rounded-2xl border border-[#D8CBB9] text-center">
              <span className="font-script text-2xl text-[#C97882]">Hannah Grace</span>
              <p className="text-xs text-[#879477] font-semibold">Founder & Lead Artisan</p>
            </div>
          </div>
        </div>

        {/* Right Column Narrative */}
        <div className="lg:col-span-6 space-y-6 text-[#3B2418]/90 text-base leading-relaxed">
          <h2 className="font-serif text-3xl font-bold text-[#3B2418]">
            The Journey Behind Every Stitch
          </h2>
          <p>
            {settings.about_text || 'A Millennial’s Stitch began with a quiet prayer, a ball of soft yarn, and a passion for crafting meaningful, lasting pieces. Every knot, loop, and stitch is guided by love, creativity, and faith.'}
          </p>
          <p>
            In a fast-paced world of mass production, we slow down. We believe that true luxury lies in the personal touch—in the hours spent hand-knitting a newborn cardigan or crocheting individual flower petals that will never wither.
          </p>
          <p>
            Our faith inspires us to do everything with excellence, devotion, and gratitude. When you receive a package from A Millennial’s Stitch, you are not just receiving a product; you are holding a prayer, a gift, and a piece of artisan craft.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#879477]">
            <div className="flex items-center gap-2 bg-[#FAF7EF] px-3.5 py-2 rounded-xl border border-[#D8CBB9]">
              <Heart className="w-4 h-4 text-[#C97882]" />
              <span>100% Slow Handmade</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF7EF] px-3.5 py-2 rounded-xl border border-[#D8CBB9]">
              <Sparkles className="w-4 h-4 text-[#879477]" />
              <span>Rooted in Devotion</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF7EF] px-3.5 py-2 rounded-xl border border-[#D8CBB9]">
              <Award className="w-4 h-4 text-[#879477]" />
              <span>Premium Quality Yarns</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <section className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#D8CBB9] shadow-stitch space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Our Core Pillars</span>
          <h2 className="font-serif text-3xl font-bold text-[#3B2418]">What We Stand For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF7EF] border border-[#D8CBB9] space-y-3">
            <span className="text-2xl">🧶</span>
            <h3 className="font-serif font-bold text-lg text-[#3B2418]">Handmade Integrity</h3>
            <p className="text-xs text-[#3B2418]/80 leading-relaxed">
              No shortcuts or mass production. Every stitch is completed by skilled hands with meticulous care.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7EF] border border-[#D8CBB9] space-y-3">
            <span className="text-2xl">✝️</span>
            <h3 className="font-serif font-bold text-lg text-[#3B2418]">Rooted in Faith</h3>
            <p className="text-xs text-[#3B2418]/80 leading-relaxed">
              Our business is built on love, prayer, integrity, and serving others with joy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7EF] border border-[#D8CBB9] space-y-3">
            <span className="text-2xl">🌸</span>
            <h3 className="font-serif font-bold text-lg text-[#3B2418]">Everlasting Beauty</h3>
            <p className="text-xs text-[#3B2418]/80 leading-relaxed">
              From floral bouquets to baby heirlooms, we craft pieces meant to be cherished for years to come.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7EF] border border-[#D8CBB9] space-y-3">
            <span className="text-2xl">🎁</span>
            <h3 className="font-serif font-bold text-lg text-[#3B2418]">Meaningful Gifts</h3>
            <p className="text-xs text-[#3B2418]/80 leading-relaxed">
              Packaged in custom botanical wrapping, ready to bring tears of joy to your loved ones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-[#EFE6D8] rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#D8CBB9]">
        <h3 className="font-serif text-3xl font-bold text-[#3B2418]">Ready to Explore Our Handmade Work?</h3>
        <p className="text-sm text-[#3B2418]/80 max-w-md mx-auto">
          Shop our current ready-to-ship pieces or request a custom order designed specifically for your occasion.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link to="/shop" className="px-6 py-3 bg-[#C97882] text-white rounded-xl font-semibold text-xs shadow-rose-glow hover:bg-[#b0616b]">
            Explore Shop
          </Link>
          <Link to="/custom-orders" className="px-6 py-3 bg-[#FFFDF9] text-[#3B2418] rounded-xl font-semibold text-xs border border-[#D8CBB9] hover:bg-[#FAF7EF]">
            Request Custom
          </Link>
        </div>
      </div>

    </div>
  );
};
