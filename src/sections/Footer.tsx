import { useEffect, useRef, useState } from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Mail } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Properties', href: '#properties' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#cta' },
  ];

  const services = [
    'Property Search',
    'Home Valuation',
    'Investment Consulting',
    'Legal Support',
    'Property Management',
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-navy text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div
            className={`lg:col-span-1 transition-all duration-600 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-cream rounded-full">
                <Home className="w-6 h-6 text-navy" />
              </div>
              <span className="font-display text-xl font-semibold">
                Luxe Estates
              </span>
            </a>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              Your trusted partner in finding the perfect home. We make luxury
              real estate accessible with personalized service and expert guidance.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cream hover:text-navy transition-all duration-300 hover:scale-110 hover:rotate-6 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-600 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={index}
                  className={`transition-all duration-300 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 50}ms` }}
                >
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-cream hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cream group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`transition-all duration-600 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="font-display text-lg font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className={`transition-all duration-300 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <span className="font-body text-sm text-white/60">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className={`transition-all duration-600 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="font-display text-lg font-semibold mb-6">
              Newsletter
            </h3>
            <p className="font-body text-sm text-white/60 mb-4">
              Subscribe to get the latest property listings and market updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-xl font-body text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-cream"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-cream text-navy rounded-xl font-medium text-sm hover:bg-cream-dark transition-all duration-300 hover:shadow-glow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t border-white/10 mt-16 pt-8 transition-all duration-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-body text-sm text-white/40">
              © {new Date().getFullYear()} Luxe Estates. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-body text-sm text-white/40 hover:text-cream transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-sm text-white/40 hover:text-cream transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-cream text-navy rounded-full shadow-soft-lg flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300 hover:scale-110 z-50 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
