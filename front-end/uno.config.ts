import { defineConfig, presetWind3, presetMini } from 'unocss'
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  // ...UnoCSS options
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
      '!node_modules/**/*',
    ]
  },

  presets: [
    presetWind3(),
    presetMini({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ]
})