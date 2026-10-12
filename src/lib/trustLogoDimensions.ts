// Intrinsic dimensions of the approved trust-band assets, keyed by filename.
// Reserve each logo's existing proportions before its bytes arrive.
const dimensions: Record<string, readonly [number, number]> = {
  "heineken.png": [
    320,
    320
  ],
  "diageo.png": [
    650,
    650
  ],
  "nestle.svg": [
    300,
    82
  ],
  "bayer.webp": [
    1280,
    1280
  ],
  "cocacola.jpg": [
    739,
    415
  ],
  "gillete.webp": [
    900,
    350
  ],
  "hermes.png": [
    1024,
    768
  ],
  "bmw.svg": [
    1015,
    1015
  ],
  "audi.svg": [
    150,
    150
  ],
  "birkenstock_logo-20260205-171208-abe1c6.webp": [
    540,
    303
  ],
  "almarai-20260205-172745-4c7382.webp": [
    191,
    117
  ],
  "siemens.svg": [
    150,
    150
  ],
  "osram.png": [
    1198,
    480
  ],
  "infineon.webp": [
    1280,
    565
  ],
  "continental.webp": [
    8333,
    1515
  ],
  "rohde-schwarz.svg": [
    300,
    78
  ],
  "pistor_logo-20260205-172539-920b9d.webp": [
    600,
    156
  ],
  "fenix_logo-20260205-173105-c4ea9a.webp": [
    500,
    166
  ],
  "schuhschmid_logo-20260205-173716-c46e3c.webp": [
    236,
    146
  ],
  "landmark_logo-20260205-170506-0a7008.webp": [
    802,
    231
  ],
  "logo_hymmen.webp": [
    814,
    308
  ],
  "logo_xox.webp": [
    198,
    154
  ],
  "giesecke_vevrient_logo-20260205-174158-db4b45.webp": [
    531,
    81
  ],
  "zeitfracht_logo-20260205-174609-59b808.webp": [
    600,
    111
  ],
  "weig_karton-20260205-184124-c75641.webp": [
    1044,
    188
  ],
  "kymmene_papier-20260205-184555-f87378.webp": [
    319,
    400
  ],
  "ab-inbev.png": [
    500,
    281
  ],
  "bosch.svg": [
    433,
    97
  ],
  "sony.svg": [
    1280,
    225
  ],
  "vw.svg": [
    150,
    150
  ]
};

export function trustLogoDimensions(src: string): readonly [number, number] {
  const filename = src.split('?')[0].split('/').pop() ?? '';
  return dimensions[filename] ?? [176, 45];
}

// Automatically measured empty margins (all non-transparent pixels retained;
// uniform white margins detected conservatively, with padding for antialiasing).
// The original assets are preserved; only the marquee's viewport is cropped.
const crops: Record<string, readonly [number, number, number, number]> = {
  "heineken.png": [
    0.040625,
    0.04375,
    0.91875,
    0.909375
  ],
  "diageo.png": [
    0.044615,
    0.384615,
    0.926154,
    0.209231
  ],
  "cocacola.jpg": [
    0.092016,
    0.240964,
    0.822733,
    0.501205
  ],
  "gillete.webp": [
    0.205556,
    0.305714,
    0.587778,
    0.388571
  ],
  "hermes.png": [
    0.210938,
    0.270833,
    0.582031,
    0.457031
  ],
  "audi.svg": [
    0,
    0.296875,
    1,
    0.40625
  ],
  "siemens.svg": [
    0,
    0.390625,
    1,
    0.21875
  ],
  "osram.png": [
    0.15192,
    0.3,
    0.694491,
    0.4
  ],
  "fenix_logo-20260205-173105-c4ea9a.webp": [
    0.026,
    0,
    0.956,
    1
  ],
  "logo_hymmen.webp": [
    0,
    0.107143,
    1,
    0.788961
  ]
};

export function trustLogoPresentation(src: string) {
  const [width, height] = trustLogoDimensions(src);
  const filename = src.split('?')[0].split('/').pop() ?? '';
  const [x, y, w, h] = crops[filename] ?? [0, 0, 1, 1];
  const visibleWidth = width * w;
  const visibleHeight = height * h;
  // Similar visible area, with caps for wide wordmarks and round emblems.
  const scale = Math.min(176 / visibleWidth, 56 / visibleHeight,
    Math.sqrt(5600 / (visibleWidth * visibleHeight)));
  return { width, height, x, y, w, h,
    displayWidth: visibleWidth * scale, displayHeight: visibleHeight * scale };
}
