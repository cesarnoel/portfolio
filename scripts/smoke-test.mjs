/**
 * Rendered-tree smoke test.
 *
 *   node scripts/smoke-test.mjs
 *
 * Bundles the app with esbuild (already present as a Vite dependency), renders
 * the whole React tree through react-dom/server and asserts that every section,
 * card, timeline entry and form field made it into the markup. It runs without
 * a browser, so it is a fast guard against import/JSX/runtime regressions.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'node_modules', '.portfolio-smoke');
const outfile = path.join(outDir, 'bundle.mjs');

const appEntry = path.join(projectRoot, 'src', 'App.jsx').split(path.sep).join('/');

const entry = `
import { renderToStaticMarkup } from 'react-dom/server';
import App from '${appEntry}';

export const render = () => renderToStaticMarkup(<App />);
`;

// --- 1. Compile the app for Node -------------------------------------------------
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'entry.jsx'), entry, 'utf8');

await build({
  entryPoints: [path.join(outDir, 'entry.jsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});

// --- 2. Render ------------------------------------------------------------------
const { render } = await import(pathToFileURL(outfile).href);
const html = render();

// --- 3. Assert ------------------------------------------------------------------
const presenceChecks = [
  ['hero section present', /id="home"/],
  ['about section present', /id="about"/],
  ['skills section present', /id="skills"/],
  ['projects section present', /id="projects"/],
  ['designs section present', /id="designs"/],
  ['experience section present', /id="experience"/],
  ['contact section present', /id="contact"/],
  ['hero greeting rendered', /Hello, I(?:&#x27;|')m Cesar Noel/],
  ['navigation links rendered', /class="nav-link[^"]*"[^>]*>Graphic Design Works</],
  ['first project title rendered', /AIB Private Investigations/],
  ['last project title rendered', /Demo E-Commerce Site/],
  ['project screenshot rendered', /\/media\/projects\/screenshot-1\.jpg/],
  ['portrait rendered', /\/media\/cesar-noel-quinon\.jpg/],
  ['design gallery rendered', /design-gallery__item/],
  ['skill bar receives --level', /--level:98%/],
  ['skill group icon rendered', /skill-card__icon/],
  ['timeline entries rendered', /timeline__card/],
  ['contact form field rendered', /id="contact-message"/],
  ['footer rendered', /site-footer__bottom/],
  ['theme toggle rendered', /aria-pressed="false"/],
  ['SASS button classes applied', /class="btn btn--primary"/],
  ['SASS utility classes applied', /text-gradient/],
];

const countChecks = [
  ['project cards', (html.match(/class="project-card reveal"/g) ?? []).length, 7],
  ['timeline items', (html.match(/class="timeline__item"/g) ?? []).length, 2],
  ['stat cards', (html.match(/class="stat reveal"/g) ?? []).length, 4],
  ['skill progress bars', (html.match(/role="progressbar"/g) ?? []).length, 12],
  ['design gallery images', (html.match(/design-gallery__item/g) ?? []).length, 8],
];

let failures = 0;

for (const [label, pattern] of presenceChecks) {
  const passed = pattern.test(html);
  if (!passed) failures += 1;
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}`);
}

for (const [label, actual, expected] of countChecks) {
  const passed = actual === expected;
  if (!passed) failures += 1;
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}: ${actual} (expected ${expected})`);
}

console.log(`\nRendered ${html.length.toLocaleString('en-US')} characters of HTML.`);

// --- 4. Clean up the temporary bundle -------------------------------------------
await rm(outDir, { recursive: true, force: true });

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}

console.log('All smoke checks passed.');
