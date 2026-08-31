import { Fragment } from 'react';
import type { CompareItem } from '../../types/content';

interface CompareCardsProps {
  items: CompareItem[];
}

export function CompareCards({ items }: CompareCardsProps) {
  return (
    <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          <div className="flex-1 rounded-[10px] border border-line bg-white p-3.5">
            <div className="font-display text-[12.5px] font-bold text-ink-900">{item.label}</div>
            <div className="mt-[3px] text-xs leading-relaxed text-ink-600">{item.text}</div>
          </div>
          {index < items.length - 1 && (
            <span className="hidden self-center text-sm text-ink-400 sm:inline">＋</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
