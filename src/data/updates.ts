export interface Update {
  date: string; // ISO date, e.g. '2026-07-01'
  html: string; // may contain inline links
}

export const UPDATES: Update[] = [
  {
    date: '2026-01-15',
    html: 'New preprint: <em>Pixel-TTS: Image based Text Rendering for Robust Text-to-Speech</em>.',
  },
  {
    date: '2026-01-10',
    html: 'New preprint: <em>HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec</em>.',
  },
  {
    date: '2025-06-01',
    html: 'Paper accepted: <em>Improved Intelligibility of Dysarthric Speech using Conditional Flow Matching</em>.',
  },
  {
    date: '2023-10-01',
    html: 'Released <a href="https://asr.iitm.ac.in/dataset">SPRING-INX</a>, a multilingual Indian language speech corpus from SPRING Lab, IIT Madras.',
  },
];
