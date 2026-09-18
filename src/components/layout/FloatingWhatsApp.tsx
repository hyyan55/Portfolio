import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, socials } = useData();

  if (!settings.showWhatsAppButton) return null;

  const whatsappLink = socials.find(s => s.platform.toLowerCase() === 'whatsapp');
  const cleanNumber = (settings.whatsappNumber || '+249912345678').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappDefaultMessage || settings.whatsAppMessage || 'مرحباً حيان، اطلعت على موقعك وأود التواصل معك');
  const url = whatsappLink?.url?.includes('wa.me') ? whatsappLink.url : `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="مراسلة عبر واتساب"
      className="fixed bottom-6 start-6 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] text-white font-medium text-xs shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
    >
      <MessageCircle className="w-4 h-4 fill-white text-white" />
      <span className="hidden sm:inline">مراسلة عبر واتساب</span>
    </a>
  );
};
