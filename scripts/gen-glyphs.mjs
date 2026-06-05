import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';

const TEXT = 'wingky.';
const FS = 130; // Matches FS in index.astro frontmatter

const fontPath = path.resolve('./public/fonts/wingky.ttf');
const fontBuffer = fs.readFileSync(fontPath);
const font = opentype.parse(fontBuffer.buffer);
const scale = FS / font.unitsPerEm;

const glyphs = TEXT.split('').map(char => {
  const glyph = font.charToGlyph(char);
  const advance = (glyph.advanceWidth ?? 0) * scale;
  const opPath = glyph.getPath(0, FS, FS); // y=FS, fontSize=FS
  const d = opPath.toPathData(3);
  return { d, advance };
});

const glyphsJson = JSON.stringify(glyphs, null, 2);
const outputPath = path.resolve('./src/data/glyphs.json');
fs.writeFileSync(outputPath, glyphsJson);

console.log('Glyph data generated successfully to src/data/glyphs.json');