import React from 'react';
import { CGUContent } from '@/components/LegalContent';

export const metadata = {
  title: 'CGU - Picoverse',
  description: 'Conditions Générales d’Utilisation de Picoverse.',
};

export default function CGUPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B0911] text-[#252B37] dark:text-[#F3EEF8]">
      <CGUContent />
    </div>
  );
}
