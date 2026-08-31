import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NavLink {
  sectionId: string;
  labelKey: string;
}

const NAV_LINKS: NavLink[] = [
  { sectionId: 'logical-ports', labelKey: 'nav.logicalPorts' },
  { sectionId: 'protocols', labelKey: 'nav.protocols' },
  { sectionId: 'osi-model', labelKey: 'nav.osiModel' },
  { sectionId: 'contact', labelKey: 'nav.contact' },
];

export function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-white">
      <div className="flex items-center justify-between px-5 py-4 sm:px-12 sm:py-[18px]">
        <span className="font-display flex items-center gap-[9px] text-[17px] font-semibold text-ink-900">
          <span className="h-[9px] w-[9px] flex-none rounded-[3px] bg-sky-400" />
          {t('site.title')}
        </span>

        <ul className="hidden gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900" href={`#${link.sectionId}`}>
                {t(link.labelKey)}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={t('nav.toggleMenu')}
          aria-expanded={isMenuOpen}
          className="flex flex-col gap-1 sm:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="block h-0.5 w-5 bg-ink-800" />
          <span className="block h-0.5 w-5 bg-ink-800" />
          <span className="block h-0.5 w-5 bg-ink-800" />
        </button>
      </div>

      {isMenuOpen && (
        <ul className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a
                className="text-sm font-medium text-ink-600"
                href={`#${link.sectionId}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
