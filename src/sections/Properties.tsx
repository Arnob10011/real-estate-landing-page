import { useEffect, useRef, useState } from 'react';
import { MapPin, Bed, Bath, Square, ArrowRight, Heart } from 'lucide-react';

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  featured?: boolean;
}

const properties: Property[] = [
  {
    id: 1,
    image: '/property-1.jpg',
    title: 'Modern Waterfront Villa',
    location: 'Beverly Hills, CA',
    price: '$4,500,000',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    featured: true,
  },
  {
    id: 2,
    image: '/property-2.jpg',
    title: 'Downtown Luxury Loft',
    location: 'Manhattan, NY',
    price: '$2,800,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
  },
  {
    id: 3,
    image: '/property-3.jpg',
    title: 'Mountain View Estate',
    location: 'Aspen, CO',
    price: '$6,200,000',
    beds: 6,
    baths: 5,
    sqft: '5,500',
    featured: true,
  },
];

const PropertyCard = ({ property, index, isVisible }: { property: Property; index: number; isVisible: boolean }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft transition-all duration-700 ease-expo-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0'
      } ${isHovered ? 'shadow-soft-xl -translate-y-3' : ''}`}
      style={{
        transitionDelay: `${400 + index * 150}ms`,
        transform: isHovered ? 'translateY(-12px) perspective(1000px) rotateX(2deg) rotateY(-2deg)' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 lg:h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-smooth ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-cream rounded-full">
            <span className="font-body text-xs font-medium text-navy">Featured</span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-navy hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 transition-transform duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="px-4 py-2 bg-white rounded-xl shadow-soft">
            <span className="font-display text-lg font-semibold text-navy">{property.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-navy mb-2 group-hover:text-navy-light transition-colors duration-300">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-navy/60 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="font-body text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 pt-4 border-t border-cream/50">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-navy/50" />
            <span className="font-body text-sm text-navy/70">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-navy/50" />
            <span className="font-body text-sm text-navy/70">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-navy/50" />
            <span className="font-body text-sm text-navy/70">{property.sqft} sqft</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className={`w-full mt-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
          isHovered
            ? 'bg-navy text-white'
            : 'bg-cream text-navy'
        }`}>
          View Details
        </button>
      </div>
    </div>
  );
};

const Properties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-cream-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0d151d 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* Subtitle with Lines */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`h-px bg-cream-dark transition-all duration-600 ease-expo-out ${
                isVisible ? 'w-12' : 'w-0'
              }`}
            />
            <span className="font-body text-sm font-medium text-navy/70 tracking-wider">
              FEATURED LISTINGS
            </span>
            <div
              className={`h-px bg-cream-dark transition-all duration-600 ease-expo-out ${
                isVisible ? 'w-12' : 'w-0'
              }`}
            />
          </div>

          {/* Title */}
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy mb-4 transition-all duration-700 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Explore Our Premium Properties
          </h2>

          {/* Description */}
          <p
            className={`font-body text-base text-navy/60 transition-all duration-600 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Handpicked luxury homes that define exceptional living. Each property
            is carefully selected to meet our high standards of quality and elegance.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-600 ease-elastic ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-medium text-sm hover:bg-navy-light transition-all duration-300 hover:shadow-soft-lg">
            View All Properties
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Properties;
