import assert from 'node:assert/strict';
import test from 'node:test';
import { approvedWhatsAppHref } from '../src/lib/contactSocial.ts';

test('WhatsApp is available only for the approved Mexico and verified Elmar numbers', () => {
  assert.equal(approvedWhatsAppHref({ id: 'maria-concepcion-lona-romero', phones: ['+49 170 4661 521', '+52 55 3431 5953'] }), 'https://wa.me/525534315953');
  assert.equal(approvedWhatsAppHref({ id: 'elmar-a-beckord', phones: ['+49 171 8892 788', '+55 52 3431 5953'] }), 'https://wa.me/491718892788');
  assert.equal(approvedWhatsAppHref({ id: 'manuel-josef-schmid', phones: ['+49 151 42471640'] }), undefined);
  assert.equal(approvedWhatsAppHref({ id: 'eduardo-benitez', phones: ['+55 52 3431 5953'] }), undefined);
});

test('WhatsApp links disappear if the exact approved phone is removed from CMS', () => {
  assert.equal(approvedWhatsAppHref({ id: 'maria-concepcion-lona-romero', phones: ['+49 170 4661 521'] }), undefined);
  assert.equal(approvedWhatsAppHref({ id: 'elmar-a-beckord', phones: ['+55 52 3431 5953'] }), undefined);
});
