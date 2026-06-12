// ─────────────────────────────────────────────
//  Design tokens do Ecorrida
// ─────────────────────────────────────────────

export const Colors = {
  // Primária
  primary:       '#0A5C8A',   // azul petróleo profundo
  primaryDark:   '#074570',
  primaryLight:  '#D6EBF7',

  // Acento / sustentabilidade
  accent:        '#1AA065',   // verde esmeralda
  accentDark:    '#137A4E',
  accentLight:   '#D4F3E6',

  // Neutros
  white:         '#FFFFFF',
  bg:            '#F0F4F8',
  surface:       '#FFFFFF',
  border:        '#DDE4EC',

  // Texto
  textPrimary:   '#0D1B2A',
  textSecondary: '#4A6178',
  textMuted:     '#8FA3B4',

  // Status
  success:       '#1AA065',
  warning:       '#E8A020',
  danger:        '#D64045',

  // KNN scores
  scoreHigh:     '#1AA065',
  scoreMid:      '#E8A020',
  scoreLow:      '#D64045',
};

export const Radius = {
  sm:  8,
  md:  12,
  lg:  18,
  xl:  24,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#0A5C8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#0A5C8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const Font = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   17,
  xl:   20,
  xxl:  26,
  hero: 36,
};
