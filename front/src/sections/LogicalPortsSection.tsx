import { useTranslation } from 'react-i18next';
import { SectionShell, ContentBlock, CompareCards, PortRangeVisual, TopicImage, PortsIcon } from '../components';
import type { LogicalPortsContent } from '../types/content';

export function LogicalPortsSection() {
  const { t } = useTranslation();
  const content = t('logicalPorts', { returnObjects: true }) as LogicalPortsContent;
  const [definitionBlock, rangesBlock, whyBlock] = content.blocks;

  return (
    <SectionShell id="logical-ports" icon={<PortsIcon className="h-[19px] w-[19px]" />} title={content.title}>
      <div className="border-t border-line">
        <ContentBlock index={1} title={definitionBlock.title}>
          <p className="max-w-[62ch] text-sm leading-relaxed text-ink-600">{definitionBlock.body}</p>
          <CompareCards items={definitionBlock.compare} />
        </ContentBlock>
      </div>

      <div className="relative my-8 sm:my-10">
        <TopicImage
          topic="logical-ports"
          alt={content.imageAlt}
          className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg shadow-slate-900/15 sm:aspect-[21/6]"
          fallbackClassName="aspect-[16/9] w-full rounded-2xl text-[13px] sm:aspect-[21/6]"
        />
        <div className="absolute -bottom-4 left-4 rounded-xl border border-line bg-white px-4 py-2.5 shadow-lg shadow-slate-900/15 sm:-bottom-[18px] sm:-left-[18px]">
          <div className="text-[10px] text-ink-400">IP : Puerto</div>
          <div className="font-display text-[13.5px] font-bold text-ink-900">192.168.1.10 : 443</div>
        </div>
      </div>

      <div className="border-t border-line pt-4">
        <ContentBlock index={2} title={rangesBlock.title}>
          <p className="max-w-[62ch] text-sm leading-relaxed text-ink-600">{rangesBlock.body}</p>
          <PortRangeVisual stats={rangesBlock.stats} ranges={rangesBlock.ranges} />
        </ContentBlock>

        <ContentBlock index={3} title={whyBlock.title} isLast>
          <div className="rounded-2xl bg-[linear-gradient(120deg,#0f172a,#1e293b)] p-6 text-sm leading-relaxed text-slate-200">
            {whyBlock.body}
          </div>
        </ContentBlock>
      </div>
    </SectionShell>
  );
}
