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

  return (
    <nav className="sticky top-0 z-10 flex flex-col items-center justify-between gap-3 bg-slate-900 px-4 py-4 text-slate-50 sm:flex-row sm:px-8">
      <span className="text-lg font-bold">{t('site.title')}</span>
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.sectionId}>
            <a
              className="text-sm text-slate-300 transition-colors hover:text-white"
              href={`#${link.sectionId}`}
            >
              {t(link.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
