import { defineConfig, presetWind3, presetMini } from 'unocss'

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
    })
  ]
})