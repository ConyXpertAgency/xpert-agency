type LabeledNavigationItem = { href: string; label: string };

export const normalizeNavLabels = <T extends LabeledNavigationItem>(items: T[], lang: string): T[] =>
  items.map((item) =>
    lang === 'en' && item.href === '/about'
      ? { ...item, label: 'About Us' }
      : item,
  );
