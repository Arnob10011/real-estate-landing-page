import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, Home, CheckCircle, Clock } from 'lucide-react';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  isVisible: boolean;
}

const AnimatedStat = ({ value, suffix, label, icon, isVisible }: StatProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isVisible]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft card-hover border border-cream/50">
      <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="font-display text-3xl lg:text-4xl font-semibold text-navy">
        {count}
        {suffix}
      </div>
      <div className="font-body text-sm text-navy/60 mt-1">{label}</div>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        const parallaxValue = scrollProgress * 40;
        imageRef.current.style.transform = `translateY(${parallaxValue}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: 15, suffix: '+', label: 'Years Experience', icon: <Award className="w-6 h-6 text-navy" /> },
    { value: 200, suffix: '+', label: 'Homes Sold', icon: <Home className="w-6 h-6 text-navy" /> },
    { value: 100, suffix: '%', label: 'Commitment', icon: <CheckCircle className="w-6 h-6 text-navy" /> },
    { value: 24, suffix: '/7', label: 'Support', icon: <Clock className="w-6 h-6 text-navy" /> },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-cream-light overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream/30 -skew-x-12 translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative">
            <div
              ref={imageRef}
              className={`relative transition-all duration-1000 ease-expo-out ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
            >
              {/* Blob Masked Image */}
              <div className="relative animate-blob overflow-hidden">
                <img
                  src="/about-image.jpg"
                  alt="About Luxe Estates"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -bottom-6 -right-6 w-48 h-48 bg-cream rounded-full -z-10 transition-all duration-800 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              />
              <div
                className={`absolute -top-6 -left-6 w-32 h-32 border-2 border-cream rounded-full -z-10 transition-all duration-800 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              />

              {/* Experience Badge */}
              <div
                className={`absolute top-8 -right-4 bg-navy text-white rounded-2xl p-6 shadow-soft-xl transition-all duration-800 ease-elastic ${
                  isVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-90'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="font-display text-4xl font-bold">15+</div>
                <div className="font-body text-sm text-white/70">Years of<br />Excellence</div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
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
                ABOUT US
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
              Your Trusted Real Estate Partner
            </h2>

            {/* Description */}
            <p
              className={`font-body text-base lg:text-lg text-navy/70 leading-relaxed transition-all duration-600 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              With over 15 years of experience, we've helped thousands of families
              find their perfect home. Our commitment to excellence and personalized
              service sets us apart in the luxury real estate market.
            </p>

            <p
              className={`font-body text-base text-navy/60 leading-relaxed transition-all duration-600 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              We understand that buying or selling a home is more than just a
              transaction—it's a life-changing experience. That's why our team of
              highly-seasoned real estate professionals is dedicated to providing
              exceptional, personalized service for all of our clients.
            </p>

            {/* Features List */}
            <div
              className={`grid sm:grid-cols-2 gap-4 pt-4 transition-all duration-600 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {[
                'Expert Market Analysis',
                'Personalized Property Search',
                'Negotiation Excellence',
                'End-to-End Support',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-navy" />
                  </div>
                  <span className="font-body text-sm text-navy/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`pt-4 transition-all duration-600 ease-elastic ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-90'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <button className="group flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-medium text-sm hover:bg-navy-light transition-all duration-300 hover:shadow-soft-lg">
                Learn More About Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-600 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${1000 + index * 100}ms` }}
            >
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
