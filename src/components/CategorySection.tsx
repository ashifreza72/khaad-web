"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";

const categories = [
  {
    id: 1,
    title: "Khaad (Fertilizers)",
    highlight: "PREMIUM FERTILIZERS",
    description: "High-quality fertilizers for better yield",
    link: "/products?category=fertilizers",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    image: "/images/urea.png",
    categoryKey: "Fertilizers",
  },
  {
    id: 2,
    title: "Pesticides (Keetnashak)",
    highlight: "ORGANIC PESTICIDES",
    description: "Effective pest control solutions",
    link: "/products?category=pesticides",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    image: "/images/pesticide.png",
    categoryKey: "Pesticides",
  },
  {
    id: 3,
    title: "Beej (Seeds)",
    highlight: "PREMIUM QUALITY SEEDS",
    description: "For better farming",
    link: "/products?category=seeds",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    image: "/images/seed.png",
    categoryKey: "Seeds",
  },
];

const CategorySection = () => {
  return (
    <section className="py-6 px-4 md:px-8">
      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex md:grid md:grid-cols-3 gap-4">
        {categories.map((category) => {
          // Get the filtered products for each category
          const filteredProducts = getProductsByCategory(category.categoryKey) || [];

          return (
            <Link key={category.id} href={category.link} className="snap-center">
              <div
                className={`relative flex-shrink-0 min-w-[100vw] sm:min-w-[90%] md:w-full h-[260px] rounded-2xl overflow-hidden ${category.bgColor} transition-transform hover:scale-[1.02] duration-300 shadow-md`}
              >
                <div className="flex h-full">
                  {/* Text Content */}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <span className={`text-xs font-bold tracking-wider ${category.textColor}`}>
                      {category.highlight}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                    <div className="mt-4">
                      <span className={`inline-flex items-center text-sm font-semibold ${category.textColor}`}>
                        {filteredProducts.length} Products
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative w-24 md:w-32 h-full">
                    <Image
                      src={category.image}
                      alt={`${category.title} - ${category.description}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
