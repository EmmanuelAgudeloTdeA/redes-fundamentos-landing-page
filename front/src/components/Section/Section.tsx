import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../services';

interface SectionProps {
  id: string;
  titleKey: string;
  bodyKey: string;
  imageAltKey: string;
  imageTopic: string;
  reversed?: boolean;
}

export function Section({ id, titleKey, bodyKey, imageAltKey, imageTopic, reversed = false }: SectionProps) {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id={id}
      className={`mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-14 sm:px-8 md:flex-row ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="flex-1">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{t(titleKey)}</h2>
        <p className="leading-relaxed text-slate-600">{t(bodyKey)}</p>
      </div>
      {!imageFailed && (
        <div className="flex flex-1 justify-center">
          <img
            className="w-full max-w-sm rounded-xl object-cover shadow-lg shadow-slate-900/15"
            src={getImageUrl(imageTopic)}
            alt={t(imageAltKey)}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
    </section>
  );
}
