export interface Publication {
  key: string; // BibTeX citation key
  title: string;
  authors: string[]; // 'Arjun Gangwar' is highlighted automatically
  venue: string;
  year: number;
  arxiv?: string; // arXiv ID, e.g. '2310.14654'
  pdf?: string; // direct PDF link (defaults to arXiv PDF when arxiv is set)
  code?: string;
  demo?: string;
}

// TODO: expand initials to full names where known (taken from Google Scholar).
export const PUBLICATIONS: Publication[] = [
  {
    key: 'arigala2026pixeltts',
    title: 'Pixel-TTS: Image based Text Rendering for Robust Text-to-Speech',
    authors: ['A. Arigala', 'Arjun Gangwar', 'S. Umesh', 'Y. Kementchedjhieva'],
    venue: 'arXiv preprint',
    year: 2026,
    arxiv: '2606.14750',
  },
  {
    key: 'gangwar2026hybridcodec',
    title: 'HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec',
    authors: ['Arjun Gangwar', 'S. Umesh'],
    venue: 'arXiv preprint',
    year: 2026,
    arxiv: '2606.06743',
  },
  {
    key: 'kothari2026vocoders',
    title:
      'Multilingual Multi-Speaker Unit Vocoders: A Systematic Analysis of Discrete Speech Representations',
    authors: ['N. Kothari', 'Arjun Gangwar', 'A. Arigala', 'S. Umesh'],
    venue: 'arXiv preprint',
    year: 2026,
    arxiv: '2606.06740',
  },
  {
    key: 'das2025dysarthric',
    title: 'Improved Intelligibility of Dysarthric Speech using Conditional Flow Matching',
    authors: ['S. Das', 'N. Singh', 'Arjun Gangwar', 'S. Umesh'],
    venue: 'arXiv preprint',
    year: 2025,
    arxiv: '2506.16127',
  },
  {
    key: 'gangwar2025multilingualasr',
    title: 'Building Robust and Scalable Multilingual ASR for Indian Languages',
    authors: ['Arjun Gangwar', 'K. Jayakumar', 'S. Umesh'],
    venue: 'arXiv preprint',
    year: 2025,
    arxiv: '2511.15418',
  },
  {
    key: 'gangwar2023springinx',
    title:
      'SPRING-INX: A Multilingual Indian Language Speech Corpus by SPRING Lab, IIT Madras',
    authors: [
      'Arjun Gangwar',
      'S. Umesh',
      'R. Sarab',
      'A. K. Dubey',
      'G. Divakaran',
      'S. V. Gangashetty',
    ],
    venue: 'arXiv preprint',
    year: 2023,
    arxiv: '2310.14654',
  },
];

export function bibtex(pub: Publication): string {
  const lines = [
    `@article{${pub.key},`,
    `  title   = {${pub.title}},`,
    `  author  = {${pub.authors.join(' and ')}},`,
    pub.arxiv
      ? `  journal = {arXiv preprint arXiv:${pub.arxiv}},`
      : `  journal = {${pub.venue}},`,
    `  year    = {${pub.year}}`,
    `}`,
  ];
  return lines.join('\n');
}
