import { 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Decorwise Paintings</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming spaces with quality painting services. We deliver excellence in every stroke for both residential and commercial properties.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:ml-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <a href="tel:+61499885512" className="text-gray-300 hover:text-white text-sm">
                  +61 499 885 512
                </a>
              </li>
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@decorwisepainting.com" className="text-gray-300 hover:text-white text-sm">
                  info@decorwisepainting.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                16 Pomodoro Rd<br />Tarneit, VIC 3029<br />Australia
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
