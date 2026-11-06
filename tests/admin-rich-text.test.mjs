import assert from 'node:assert/strict';
import test from 'node:test';
import { sanitizeAdminRichText } from '../src/lib/adminRichText.ts';

test('rich editor keeps basic formatting and safe modal colors', () => {
  assert.equal(sanitizeAdminRichText('<strong>Bold</strong> <span style="color:#123456">Blue</span>'), '<strong>Bold</strong> <span style="color:#123456">Blue</span>');
});

test('rich editor drops scripts, events, dangerous links and CSS URLs', () => {
  const dirty = '<script>alert(1)</script><strong onclick="alert(2)">Safe</strong><a href="javascript:alert(3)">link</a><span style="background:url(javascript:alert(4));color:#123456">color</span><img src=x onerror=alert(5)>';
  const clean = sanitizeAdminRichText(dirty);
  assert.match(clean, /<strong>Safe<\/strong>/);
  assert.match(clean, /color:#123456/);
  assert.doesNotMatch(clean, /script|onclick|javascript:|url\(|<img|onerror/i);
});

test('rich editor preserves existing safe direction and inline display while removing editor metadata', () => {
  const html = '<p dir="auto" data-pm-slice="1 1 []">Stats</p><span style="display: inline !important;">Deutsch</span>';
  const clean = sanitizeAdminRichText(html);
  assert.match(clean, /<p dir="auto">Stats<\/p>/);
  assert.match(clean, /display:\s*inline\s*!important/);
  assert.doesNotMatch(clean, /data-pm-slice/);
});
