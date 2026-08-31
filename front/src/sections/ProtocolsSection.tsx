import { useTranslation } from 'react-i18next';
import { SectionShell, ContentBlock, ProtocolGrid, TopicImage, ProtocolsIcon } from '../components';
import type { ProtocolsContent } from '../types/content';

export function ProtocolsSection() {
  const { t } = useTranslation();
  const content = t('protocols', { returnObjects: true }) as ProtocolsContent;
  const [definitionBlock, whyBlock, cardsBlock] = content.blocks;

  return (
    <SectionShell id="protocols" icon={<ProtocolsIcon className="h-[19px] w-[19px]" />} title={content.title} tinted>
      <div
        className="-mx-6 mb-8 overflow-hidden sm:-mx-20"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 94%, 97% 100%, 0 100%)' }}
      >
        <TopicImage
          topic="protocols"
          alt={content.imageAlt}
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/6]"
          fallbackClassName="aspect-[16/9] w-full text-[13px] sm:aspect-[21/6]"
        />
      </div>

      <div className="border-t border-line">
        <ContentBlock index={1} title={definitionBlock.title} tinted>
          <p className="max-w-[62ch] text-sm leading-relaxed text-ink-600">{definitionBlock.body}</p>
        </ContentBlock>

        <ContentBlock index={2} title={whyBlock.title} tinted>
          <TopicImage
            topic="protocols-dns"
            alt={content.dnsImageAlt}
            className="float-right mb-3 ml-5 h-24 w-24 rounded-full object-cover shadow-lg shadow-slate-900/20 sm:h-32 sm:w-32"
            fallbackClassName="float-right mb-3 ml-5 h-24 w-24 rounded-full text-[10px] sm:h-32 sm:w-32"
          />
          <p className="text-sm leading-relaxed text-ink-600">{whyBlock.body}</p>
          <div className="clear-both" />
        </ContentBlock>

        <ContentBlock index={3} title={cardsBlock.title} tinted isLast>
          <ProtocolGrid cards={cardsBlock.cards} />
        </ContentBlock>
      </div>
    </SectionShell>
  );
}
