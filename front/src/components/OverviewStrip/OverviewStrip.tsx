import { useTranslation } from 'react-i18next';
import { PortsIcon, ProtocolsIcon, LayersIcon } from '../icons';
import type { OverviewItem } from '../../types/content';

const ICONS_BY_INDEX = [PortsIcon, ProtocolsIcon, LayersIcon];

export function OverviewStrip() {
  const { t } = useTranslation();
  const items = t('overview.items', { returnObjects: true }) as OverviewItem[];

  return (
    <div className="border-b border-line bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items.map((item, index) => {
          const Icon = ICONS_BY_INDEX[index];
          return (
            <a
              key={item.target}
              href={`#${item.target}`}
              className={`flex gap-3.5 px-[22px] py-5 no-underline sm:px-9 sm:py-[30px] ${
                index < items.length - 1 ? 'border-b border-line sm:border-r sm:border-b-0' : ''
              }`}
            >
              <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] bg-sky-100 text-sky-700">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="font-display mb-1 text-[14.5px] font-semibold text-ink-900">{item.title}</div>
                <div className="text-[13px] leading-snug text-ink-600">{item.text}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
