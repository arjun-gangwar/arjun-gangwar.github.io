export interface Update {
  date: string; // ISO date, e.g. '2026-07-01'
  html: string; // may contain inline links
}

export const UPDATES: Update[] = [
  {
    date: '2026-06-10',
    html: 'New preprint: <em>Pixel-TTS: Image based Text Rendering for Robust Text-to-Speech</em>.',
  },
  {
    date: '2026-06-04',
    html: 'Paper accepted at Interspeech 26, <em>"HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec"</em>.',
  },
  {
    date: '2026-06-04',
    html: 'Paper accepted at Interspeech 26, <em>"Multilingual Multi-Speaker Unit Vocoders: A Systematic Analysis of Discrete Speech Representations"</em>.',
  },
  {
    date: '2026-05-13',
    html: 'I got awarded the <em>India AI Fellowship</em> for my MS.',
  },
  {
    date: '2026-02-25',
    html: 'Starting my intership at <em>MBZUAI</em> under the supervision of <em>Prof. Monojit Choudhury</em>.',
  },
  {
    date: '2025-05-19',
    html: 'Paper accepted at Interspeech 25, <em>"Improved Intelligibility of Dysarthric Speech using Conditional Flow Matching"</em>.',
  },
  {
    date: '2023-10-24',
    html: 'Released <a href="https://asr.iitm.ac.in/dataset">SPRING-INX</a>, a multilingual Indian language speech corpus from SPRING Lab, IIT Madras.',
  },
];
