/**
 * Palette Configurations Export
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export { default as PaletteDefault } from './PaletteDefault';
export { default as PaletteAutumn } from './PaletteAutumn';
export { default as PaletteOcean } from './PaletteOcean';
export { default as PaletteSpring } from './PaletteSpring';
export { default as PaletteWinter } from './PaletteWinter';
export { default as PaletteCosmic } from './PaletteCosmic';

// Export all palette configs as an array
import PaletteDefault from './PaletteDefault';
import PaletteAutumn from './PaletteAutumn';
import PaletteOcean from './PaletteOcean';
import PaletteSpring from './PaletteSpring';
import PaletteWinter from './PaletteWinter';
import PaletteCosmic from './PaletteCosmic';

export const AllPalettes = [
  PaletteDefault,
  PaletteOcean,
  PaletteCosmic,
  PaletteWinter,
  PaletteAutumn,
  PaletteSpring,
];