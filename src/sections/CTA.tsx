import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const CTA = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, #f6e7c5 0%, #fdf8ea 25%, #f6e7c5 50%, #fdf8ea 75%, #f6e7c5 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Shape 1 */}
        <div
          className={`absolute top-1/4 left-10 w-32 h-32 bg-white/40 rounded-full blur-2xl transition-all duration-1200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            animation: 'float 8s ease-in-out infinite',
            transitionDelay: '200ms',
          }}
        />
        {/* Shape 2 */}
        <div
          className={`absolute bottom-1/4 right-10 w-48 h-48 bg-cream-dark/30 rounded-full blur-3xl transition-all duration-1200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            animation: 'float-slow 10s ease-in-out infinite',
            transitionDelay: '400ms',
          }}
        />
        {/* Shape 3 */}
        <div
          className={`absolute top-1/2 right-1/4 w-24 h-24 bg-white/30 rounded-full blur-xl transition-all duration-1200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            animation: 'float 6s ease-in-out infinite reverse',
            transitionDelay: '600ms',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-navy leading-tight mb-6 transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Ready to Find Your
          <br />
          <span className="text-cream-dark">Dream Home?</span>
        </h2>

        {/* Description */}
        <p
          className={`font-body text-base lg:text-lg text-navy/70 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-600 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Let our experts guide you through the journey of finding your perfect
          property. Start your search today and take the first step towards your
          dream lifestyle.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-600 ease-elastic ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <button className="group flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-medium text-sm hover:bg-navy-light transition-all duration-300 hover:shadow-soft-xl hover:scale-105">
            Get Started Today
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="group flex items-center gap-2 px-8 py-4 bg-white text-navy rounded-full font-medium text-sm hover:bg-cream transition-all duration-300 hover:shadow-soft">
            <Phone className="w-4 h-4" />
            Schedule a Call
          </button>
        </div>

        {/* Contact Info Cards */}
        <div
          className={`grid sm:grid-cols-3 gap-6 transition-all duration-600 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Phone */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft card-hover">
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-display text-sm font-semibold text-navy mb-1">
              Call Us
            </h3>
            <p className="font-body text-sm text-navy/60">
              +880 0133-155 0139
            </p>
          </div>

          {/* Email */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft card-hover">
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-display text-sm font-semibold text-navy mb-1">
              Email Us
            </h3>
            <p className="font-body text-sm text-navy/60">
              arnob.appign@gmail.com
            </p>
          </div>

          {/* Location */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft card-hover">
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-navy" />
            </div>
            <h3 className="font-display text-sm font-semibold text-navy mb-1">
              Visit Us
            </h3>
            <p className="font-body text-sm text-navy/60">
              123 Main Street, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
