import React from 'react';
import type { Language } from '../types';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (partnerCode: string, partnerName: string, role: 'partner' | 'regional' | 'admin') => void;
}

export const PartnerLoginModal: React.FC<PartnerLoginModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const content = {
    it: { title: 'Accesso DNS Partner Hub', body: 'L’accesso riservato sarà disponibile dopo il collegamento sicuro a DNS Identity. La vecchia modalità demo con codici partner non è più abilitata.', close: 'Chiudi' },
    de: { title: 'DNS Partner Hub Anmeldung', body: 'Der geschützte Zugang wird nach der sicheren Anbindung an DNS Identity freigeschaltet. Die bisherige Demo-Anmeldung mit Partnercodes ist deaktiviert.', close: 'Schließen' },
    en: { title: 'DNS Partner Hub login', body: 'Protected access will be enabled after secure integration with DNS Identity. The previous partner-code demo sign-in is disabled.', close: 'Close' },
  }[lang];
  return <div role="presentation" className="fixed inset-0 z-50 bg-[#052832]/85 flex items-center justify-center p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="partner-login-title" className="w-full max-w-md rounded-2xl bg-white text-[#083845] p-7 shadow-2xl space-y-5">
      <h2 id="partner-login-title" className="text-xl font-extrabold">{content.title}</h2>
      <p className="text-sm leading-relaxed">{content.body}</p>
      <button type="button" autoFocus onClick={onClose} className="rounded-lg bg-[#0D4D5E] px-5 py-3 font-semibold text-white">{content.close}</button>
    </section>
  </div>;
};
