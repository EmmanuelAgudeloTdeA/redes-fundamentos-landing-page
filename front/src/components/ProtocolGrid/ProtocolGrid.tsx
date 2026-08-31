import type { ProtocolCardData } from '../../types/content';

interface ProtocolGridProps {
  cards: ProtocolCardData[];
}

export function ProtocolGrid({ cards }: ProtocolGridProps) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.acronym} className="rounded-xl border border-line bg-white p-[18px]">
          <div className="font-display text-[17px] font-bold text-ink-900">{card.acronym}</div>
          <div className="mt-0.5 mb-2 text-[11px] text-ink-400">{card.fullName}</div>
          <div className="text-[12.5px] leading-snug text-ink-600">{card.description}</div>
        </div>
      ))}
    </div>
  );
}
