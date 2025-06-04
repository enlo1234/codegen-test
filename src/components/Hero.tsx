import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <div className="relative px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Simple, beautiful, 
            <span className="text-blue-500"> effective.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to our minimalist webpage. We believe in clean design that focuses on what matters most - your content and your message.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg">
              Get started
            </Button>
            <Button variant="secondary" size="lg" className="group">
              Learn more 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;