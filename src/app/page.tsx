'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRightIcon, CheckCircleIcon, PaintBrushIcon, HomeIcon, BuildingOfficeIcon, ShieldCheckIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Service images
const heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.4.0&auto=format&fit=crop&w=2070&q=80';

// High-quality service images
const serviceImages = {
  interior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.4.0&auto=format&fit=crop&w=1000&q=80',
  exterior: '/images/exterior.jpg',
  commercial: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.4.0&auto=format&fit=crop&w=1000&q=80'
};

const services = [
  {
    name: 'Interior Painting',
    description: 'Transform your indoor spaces with our professional interior painting services. We use premium paints and techniques to give your home a fresh, modern look.',
    icon: HomeIcon,
    image: serviceImages.interior,
  },
  {
    name: 'Exterior Painting',
    description: 'Enhance your home\'s curb appeal and protection with our durable exterior painting solutions designed to withstand the elements.',
    icon: BuildingOfficeIcon,
    image: serviceImages.exterior,
  },
  {
    name: 'Commercial Painting',
    description: 'Professional painting services for businesses, offices, and commercial properties. Minimal disruption, maximum impact.',
    icon: BuildingOfficeIcon,
    image: serviceImages.commercial,
  },
];

const features = [
  {
    name: 'Expert Craftsmanship',
    description: 'Our skilled painters have years of experience delivering flawless finishes.',
    icon: PaintBrushIcon,
  },
  {
    name: 'Quality Materials',
    description: 'We use only premium paints and materials for lasting results.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Satisfaction Guaranteed',
    description: 'Your satisfaction is our top priority. We stand behind our work.',
    icon: CheckCircleIcon,
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null); // Clear any previous status
    
    try {
      console.log('Form submitted:', formData);
      
      // Import the client-side email function
      const { sendEmailClientSide } = await import('@/lib/email');
      
      // Call the client-side email function directly
      const result = await sendEmailClientSide({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
      console.log('Email sent successfully:', result);
      
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: `There was an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact us directly at jimmy@decorwisepainting.com`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="relative bg-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Beautiful home exterior with fresh paint"
            className="w-full h-full object-cover opacity-40 brightness-110"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Transform Your Space with Professional Painting
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Premium painting services for homes and businesses. Quality workmanship, attention to detail, and customer satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                Get a Free Quote
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#services"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Decorwise Paintings?</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.name}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Painting Services</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Transform your space with our comprehensive range of professional painting services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-64">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-white p-6">
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    </div>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Have a project in mind? Contact us today for a free, no-obligation quote.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Send us a message</h3>
                
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="+61 123 456 789"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <ArrowRightIcon className="ml-2 h-5 w-5" />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                      <PhoneIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                      <p className="text-base text-gray-900">+61 499 885 512</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                      <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p className="text-base text-gray-900">jimmy@decorwisepaintings.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                      <MapPinIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p className="text-base text-gray-900">13 Kilburn Grove<br />Derrimut, VIC 3026<br />Australia</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Business Hours</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Monday - Friday</span>
                      <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Saturday</span>
                      <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Sunday</span>
                      <span className="text-gray-900 font-medium">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free, no-obligation quote and let&apos;s bring your vision to life with our professional painting services.
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md text-lg font-semibold transition-colors duration-200 inline-flex items-center"
          >
            Get Your Free Quote
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
