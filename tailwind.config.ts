import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        platform: 'var(--platform)',
        sand: 'var(--sand)',
        
        // Semantic
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        
        // Mode Colors (isolated - only for ModeCard)
        mode: {
          billy: {
            heat: 'var(--mode-billy-heat)',
            glow: 'var(--mode-billy-glow)',
          },
          super: {
            electric: 'var(--mode-super-electric)',
            glow: 'var(--mode-super-glow)',
          },
        },
        
        // Rarity System
        rarity: {
          common: 'var(--rarity-common)',
          rare: 'var(--rarity-rare)',
          epic: 'var(--rarity-epic)',
          legendary: 'var(--rarity-legendary)',
          mythical: 'var(--rarity-mythical)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
