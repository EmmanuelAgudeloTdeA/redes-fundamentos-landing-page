export interface OverviewItem {
  target: string;
  title: string;
  text: string;
}

export interface CompareItem {
  label: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PortRange {
  range: string;
  label: string;
  badges?: string[];
}

export interface ProtocolCardData {
  acronym: string;
  fullName: string;
  description: string;
}

export interface OsiLayer {
  number: number;
  name: string;
  description: string;
}

export interface LogicalPortsContent {
  title: string;
  imageAlt: string;
  blocks: [
    { title: string; body: string; compare: CompareItem[] },
    { title: string; body: string; stats: StatItem[]; ranges: PortRange[] },
    { title: string; body: string },
  ];
}

export interface ProtocolsContent {
  title: string;
  imageAlt: string;
  dnsImageAlt: string;
  blocks: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; cards: ProtocolCardData[] },
  ];
}

export interface OsiModelContent {
  title: string;
  imageAlt: string;
  physicalLayerImageAlt: string;
  blocks: [
    { title: string; body: string },
    { title: string; intro: string; layers: OsiLayer[] },
    { title: string; body: string },
  ];
}
