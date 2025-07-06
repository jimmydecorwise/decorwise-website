import Link from 'next/link';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  FaceSmileIcon,
  CameraIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: FaceSmileIcon,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: CameraIcon,
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: ChatBubbleLeftRightIcon,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Decorwise Paintings</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming spaces with quality painting services. We deliver excellence in every stroke for both residential and commercial properties.
            </p>
            <div className="mt-4 flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/interior-painting" className="text-gray-300 hover:text-white text-sm">Interior Painting</a></li>
              <li><a href="/services/exterior-painting" className="text-gray-300 hover:text-white text-sm">Exterior Painting</a></li>
              <li><a href="/services/commercial-painting" className="text-gray-300 hover:text-white text-sm">Commercial Painting</a></li>
              <li><a href="/services/cabinet-refinishing" className="text-gray-300 hover:text-white text-sm">Cabinet Refinishing</a></li>
              <li><a href="/services/wallpaper-removal" className="text-gray-300 hover:text-white text-sm">Wallpaper Removal</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@decorwise.com" className="text-gray-300 hover:text-white text-sm">
                  info@decorwise.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Painters Lane<br />
                  Your City, State 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Decorwise Paintings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
