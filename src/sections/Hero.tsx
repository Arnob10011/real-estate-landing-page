import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Home, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        const parallaxValue = scrollY * 0.3;
        imageRef.current.style.transform = `translateY(${-parallaxValue}px) scale(${1 + scrollY * 0.0002})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    const propertiesSection = document.querySelector('#properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-cream-light"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Shape 1 */}
        <div
          className={`absolute -left-20 top-1/4 w-64 h-64 bg-cream rounded-full opacity-60 blur-3xl transition-all duration-1000 ${
            isLoaded ? 'translate-x-0 opacity-60' : '-translate-x-full opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        />
        {/* Floating Shape 2 */}
        <div
          className={`absolute right-1/4 -bottom-20 w-80 h-80 bg-cream-dark/30 rounded-full opacity-40 blur-3xl transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-40' : 'translate-y-full opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #0d151d 1px, transparent 1px),
                              linear-gradient(to bottom, #0d151d 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Content Column */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Subtitle */}
            <div
              className={`overflow-hidden transition-all duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cream rounded-full text-sm font-medium text-navy/80">
                <span className="w-2 h-2 bg-navy rounded-full animate-pulse" />
                WELCOME TO LUXE ESTATES
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-navy leading-tight">
              {['Find', 'Your', 'Dream', 'Home'].map((word, index) => (
                <span
                  key={word}
                  className={`inline-block mr-3 transition-all duration-700 ease-expo-out ${
                    isLoaded
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {word}
                </span>
              ))}
              <span
                className={`inline-block text-cream-dark transition-all duration-700 ease-expo-out ${
                  isLoaded
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                Today
              </span>
            </h1>

            {/* Description */}
            <p
              className={`font-body text-base lg:text-lg text-navy/70 max-w-lg leading-relaxed transition-all duration-600 ${
                isLoaded
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-8 opacity-0 blur-sm'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              Discover exceptional properties in prime locations. Our curated
              collection of luxury homes awaits your exploration. Let us guide
              you to your perfect sanctuary.
            </p>

            {/* Search Form */}
            <div
              className={`transition-all duration-800 ease-elastic ${
                isLoaded
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="bg-white rounded-2xl shadow-soft-lg p-2 flex flex-col sm:flex-row gap-2">
                {/* Location Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-cream-light rounded-xl">
                  <MapPin className="w-5 h-5 text-navy/50 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1 bg-transparent font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none"
                  />
                </div>

                {/* Property Type Dropdown */}
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-light rounded-xl">
                  <Home className="w-5 h-5 text-navy/50 flex-shrink-0" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent font-body text-sm text-navy focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-navy/50" />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-medium text-sm hover:bg-navy-light transition-all duration-300 hover:scale-105 hover:shadow-soft-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-8 pt-4 transition-all duration-600 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              {[
                { value: '500+', label: 'Properties' },
                { value: '200+', label: 'Happy Clients' },
                { value: '15+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-2xl lg:text-3xl font-semibold text-navy">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-navy/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className={`relative transition-all duration-1200 ease-expo-out ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-24 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl">
                <img
                  src="/hero-image.jpg"
                  alt="Real estate professional"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div
                className={`absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft-lg p-4 transition-all duration-800 ease-elastic ${
                  isLoaded
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-12 opacity-0 scale-90'
                }`}
                style={{ transitionDelay: '1200ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-navy">
                      2,400+
                    </div>
                    <div className="font-body text-xs text-navy/60">
                      Homes Available
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Shape */}
              <div
                className={`absolute -top-8 -right-8 w-32 h-32 bg-cream rounded-full opacity-80 animate-float-slow transition-all duration-1000 ${
                  isLoaded ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#fdf8ea"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
