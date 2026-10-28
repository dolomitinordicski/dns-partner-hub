import React from 'react';
import type { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenLegal?: (tab: 'privacy' | 'cookie' | 'note') => void;
}

/** Content only: DNS Foundation owns the footer shell, sizing and swoosh. */
export const Footer: React.FC<FooterProps> = ({ lang, onOpenLegal }) => (
  <footer className="dns-tool-footer-shell">
    <span className="dns-tool-footer-primary">© {new Date().getFullYear()} Dolomiti NordicSki · Partner Hub</span>
    <div className="dns-tool-footer-meta flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => onOpenLegal?.('privacy')}>Privacy</button>
      <button type="button" onClick={() => onOpenLegal?.('cookie')}>Cookies</button>
      <button type="button" onClick={() => onOpenLegal?.('note')}>
        {lang === 'de' ? 'Impressum' : lang === 'it' ? 'Note legali' : 'Legal notice'}
      </button>
    </div>
  </footer>
);
