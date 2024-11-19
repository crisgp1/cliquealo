import React, { useState } from 'react';
import { Search, Heart, Share2, MessageCircle, Filter, SlidersHorizontal } from 'lucide-react';

export function Publicacion() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Tecnología',
    'Hogar',
    'Deportes',
    'Moda',
    'Electrónica',
    'Jardín'
  ];

  const products = [
    {
      id: 1,
      title: 'MacBook Pro M2',
      price: 29999,
      location: 'Ciudad de México',
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'TechStore MX',
        rating: 4.9,
        verified: true
      },
      category: 'Tecnología'
    },
    {
      id: 2,
      title: 'Nintendo Switch OLED',
      price: 6999,
      location: 'Guadalajara',
      rating: 4.7,
      reviews: 89,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'GameWorld',
        rating: 4.8,
        verified: true
      },
      category: 'Tecnología'
    },
    {
      id: 3,
      title: 'Bicicleta Montaña Trek',
      price: 12999,
      location: 'Monterrey',
      rating: 4.9,
      reviews: 56,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'BikeXtreme',
        rating: 4.7,
        verified: true
      },
      category: 'Deportes'
    },
    {
      id: 4,
      title: 'Smartwatch Galaxy 5',
      price: 5999,
      location: 'Querétaro',
      rating: 4.6,
      reviews: 78,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'Samsung Store',
        rating: 4.9,
        verified: true
      },
      category: 'Tecnología'
    },
    {
      id: 5,
      title: 'Set de Jardín Premium',
      price: 8999,
      location: 'Mérida',
      rating: 4.5,
      reviews: 34,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'Garden Center',
        rating: 4.6,
        verified: true
      },
      category: 'Jardín'
    },
    {
      id: 6,
      title: 'iPhone 14 Pro Max',
      price: 24999,
      location: 'Puebla',
      rating: 4.9,
      reviews: 156,
      image: '/api/placeholder/800/600',
      seller: {
        name: 'iShop México',
        rating: 4.9,
        verified: true
      },
      category: 'Tecnología'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Search and Filter */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 
                             transition-colors text-gray-700 space-x-2">
              <SlidersHorizontal size={20} />
              <span>Filtros</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all
                          ${selectedCategory === category
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter(product => selectedCategory === 'Todos' || product.category === selectedCategory)
            .map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow 
                         overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm
                                   rounded-full hover:bg-white transition-colors">
                    <Heart size={20} className="text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="text-sm text-gray-500">{product.location}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Seller Info */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 
                                    rounded-full flex items-center justify-center text-white font-medium">
                        {product.seller.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.seller.name}
                          {product.seller.verified && (
                            <span className="ml-1 text-blue-500">✓</span>
                          )}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{product.seller.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <MessageCircle size={20} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}