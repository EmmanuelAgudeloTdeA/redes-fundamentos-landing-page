import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-br from-slate-800 to-slate-700 px-4 py-16 text-center text-slate-50">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{t('header.title')}</h1>
      <p className="mx-auto max-w-xl text-slate-300">{t('header.subtitle')}</p>
    </header>
  );
}
