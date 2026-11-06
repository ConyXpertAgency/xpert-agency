import type { ClientItem } from './supabase/types';

const normalizeNote = (note: string) => note.trim().replace(/\s+/g, ' ').toLowerCase();

// Suppress only the confirmed internal copy, not legitimate commercial notes.
const INTERNAL_LANDMARK_NOTES = new Set([
  'REVIEW: verify whether this is separate from Landmark Case Study',
  'REVIEW: verificar si es una experiencia separada del Case Study Landmark',
  'REVIEW: prüfen, ob dies getrennt vom Case Study Landmark ist',
].map(normalizeNote));

export function publicCaseClients(items: ClientItem[]): ClientItem[] {
  return items.map((item) => item.note && INTERNAL_LANDMARK_NOTES.has(normalizeNote(item.note))
    ? { ...item, note: undefined }
    : item);
}
