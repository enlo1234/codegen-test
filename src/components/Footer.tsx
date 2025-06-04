import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
          © {new Date().getFullYear()} Analytics Integration Explorer. Built with React and TailwindCSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;