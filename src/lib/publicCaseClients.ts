import type { ClientItem } from './supabase/types';

const normalizeNote = (note: string) => note.trim().replace(/\s+/g, ' ').toLowerCase();
const noteSet = (notes: string[]) => new Set(notes.map(normalizeNote));

const NAME_REVIEW_NOTES = noteSet([
  'REVIEW: verify exact name',
  'REVIEW: verificar nombre exacto',
  'REVIEW: genauen Namen prüfen',
]);

// Match confirmed editorial copy AND its client context; never hide all REVIEW notes.
const INTERNAL_CLIENT_NOTES = new Map<string, ReadonlySet<string>>([
  ['hermes-cosmoper', NAME_REVIEW_NOTES],
  ['popeci-machines', NAME_REVIEW_NOTES],
  ['hilti', noteSet([
    'REVIEW: first handwritten location "L?" is ambiguous',
    'REVIEW: la primera ubicación manuscrita "L?" es ambigua',
    'REVIEW: erste handschriftliche Location "L?" ist unklar',
  ])],
  ['heineken', noteSet([
    'REVIEW: verify Southeast Asia locations belong to Heineken entry',
    'REVIEW: verificar que las ubicaciones de Southeast Asia pertenecen a Heineken',
    'REVIEW: prüfen, ob die Southeast-Asia-Standorte zum Heineken-Eintrag gehören',
  ])],
  ['schmid-fashion', noteSet([
    'REVIEW: verify whether this is separate from Schuh Schmid Case Study',
    'REVIEW: verificar si es una experiencia separada del Case Study Schuh Schmid',
    'REVIEW: prüfen, ob dies getrennt vom Case Study Schuh Schmid ist',
  ])],
  ['osram-light', noteSet([
    'REVIEW: handwritten location "SB" is ambiguous',
    'REVIEW: la ubicación manuscrita "SB" es ambigua',
    'REVIEW: handschriftliche Location "SB" ist unklar',
  ])],
  ['landmark-fashion', noteSet([
    'REVIEW: verify whether this is separate from Landmark Case Study',
    'REVIEW: verificar si es una experiencia separada del Case Study Landmark',
    'REVIEW: prüfen, ob dies getrennt vom Case Study Landmark ist',
  ])],
]);

export function publicCaseClients(items: ClientItem[]): ClientItem[] {
  return items.map((item) => item.note && INTERNAL_CLIENT_NOTES.get(item.id)?.has(normalizeNote(item.note))
    ? { ...item, note: undefined }
    : item);
}
