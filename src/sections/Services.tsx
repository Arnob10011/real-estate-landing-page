import { useEffect, useRef, useState } from 'react';
import { Search, TrendingUp, FileCheck, Users, ArrowRight, ChevronDown } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const services: Service[] = [
  {
    id: 1,
    icon: <Search className="w-6 h-6" />,
    title: 'Property Search',
    description: 'Access exclusive listings and off-market properties tailored to your preferences.',
    details: [
      'Personalized property matching',
      'Off-market listings access',
      'Virtual tours available',
      'Neighborhood analysis',
    ],
  },
  {
    id: 2,
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Home Valuation',
    description: 'Get accurate market valuations from our expert analysts.',
    details: [
      'Comparative market analysis',
      'Price trend forecasting',
      'Investment potential assessment',
      'Regular market updates',
    ],
  },
  {
    id: 3,
    icon: <FileCheck className="w-6 h-6" />,
    title: 'Investment Consulting',
    description: 'Make informed decisions with our market insights and investment strategies.',
    details: [
      'Portfolio diversification advice',
      'ROI projections',
      'Risk assessment',
      'Tax benefit guidance',
    ],
  },
  {
    id: 4,
    icon: <Users className="w-6 h-6" />,
    title: 'Legal Support',
    description: 'Navigate contracts and paperwork with our experienced legal team.',
    details: [
      'Contract review & negotiation',
      'Title verification',
      'Closing coordination',
      'Regulatory compliance',
    ],
  },
];

const ServiceItem = ({ service, isActive, onClick, isVisible, index }: {
  service: Service;
  isActive: boolean;
  onClick: () => void;
  isVisible: boolean;
  index: number;
}) => {
  return (
    <div
      className={`border-b border-cream/50 transition-all duration-500 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-8 opacity-0'
      }`}
      style={{ transitionDelay: `${600 + index * 100}ms` }}
    >
      <button
        onClick={onClick}
        className={`w-full py-6 flex items-center justify-between group transition-all duration-300 ${
          isActive ? 'bg-cream/30' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive ? 'bg-navy text-white' : 'bg-cream text-navy group-hover:bg-navy group-hover:text-white'
          }`}>
            {service.icon}
          </div>
          <div className="text-left">
            <h3 className={`font-display text-lg font-semibold transition-colors duration-300 ${
              isActive ? 'text-navy' : 'text-navy/80 group-hover:text-navy'
            }`}>
              {service.title}
            </h3>
            <p className={`font-body text-sm text-navy/60 mt-1 transition-all duration-300 ${
              isActive ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {service.description}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-navy/50 transition-transform duration-300 ${
          isActive ? 'rotate-180' : 'group-hover:rotate-90'
        }`} />
      </button>
      
      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-expo-out ${
        isActive ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="pb-6 pl-16">
          <ul className="space-y-2">
            {service.details.map((detail, idx) => (
              <li key={idx} className="flex items-center gap-2 font-body text-sm text-navy/70">
                <div className="w-1.5 h-1.5 bg-cream-dark rounded-full" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        const parallaxValue = scrollProgress * 50;
        imageRef.current.style.transform = `translateY(${parallaxValue}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-cream-light overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cream/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div className="relative lg:sticky lg:top-32">
            <div
              ref={imageRef}
              className={`relative transition-all duration-1000 ease-expo-out ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
            >
              {/* Diagonal Clip Image */}
              <div 
                className="relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)',
                }}
              >
                <img
                  src="/services-image.jpg"
                  alt="Our Services"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -bottom-4 -right-4 w-full h-full border-2 border-cream -z-10 transition-all duration-800 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  transitionDelay: '400ms',
                  clipPath: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)',
                }}
              />

              {/* Floating Badge */}
              <div
                className={`absolute bottom-8 left-8 bg-white rounded-2xl shadow-soft-lg p-6 transition-all duration-800 ease-elastic ${
                  isVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-90'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cream rounded-xl flex items-center justify-center">
                    <FileCheck className="w-7 h-7 text-navy" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-navy">100%</div>
                    <div className="font-body text-sm text-navy/60">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            {/* Subtitle */}
            <div
              className={`transition-all duration-600 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="inline-block px-4 py-2 bg-cream rounded-full text-sm font-medium text-navy/80">
                WHAT WE OFFER
              </span>
            </div>

            {/* Title */}
            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight transition-all duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Comprehensive Real Estate Services
            </h2>

            {/* Description */}
            <p
              className={`font-body text-base lg:text-lg text-navy/70 leading-relaxed transition-all duration-600 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              From finding your dream home to securing the best investment, we
              provide end-to-end real estate solutions tailored to your unique needs.
            </p>

            {/* Services List */}
            <div className="pt-4">
              {services.map((service, index) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isActive={activeService === service.id}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                  isVisible={isVisible}
                  index={index}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`pt-4 transition-all duration-600 ease-elastic ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-90'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <button className="group flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-medium text-sm hover:bg-navy-light transition-all duration-300 hover:shadow-soft-lg">
                Explore All Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
