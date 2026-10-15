// Prépare localement le dossier Netlify sans publier ni modifier GitHub Pages TEST.
// Exécuter depuis la racine du dépôt : node preparation-netlify/build-v19-netlify.mjs
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
const root = process.cwd();
const output = join(root, 'preparation-netlify', 'dist-v19');
const read = (p) => readFile(join(root, p), 'utf8');
const expectedProject = 'uqyvfkjgitufaxmswjzv';
let html = await read('index.html');
const config = await read('config.js');
if (!config.includes(expectedProject + '.supabase.co')) throw Error('Supabase V19 incorrect : arrêt');
if (!html.includes("const EXPECTED_TEST_PROJECT='"+expectedProject+"'")) throw Error('Garde Supabase V19 introuvable');
if (!html.includes('async function connectV19Push()')) throw Error('Raccordement push V19 absent');
const marker = '<script src="config.js"></script>';
if (!html.includes(marker)) throw Error('Balise config introuvable');
html = html.replace(marker, marker + '\n<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>\n<script src="onesignal-v19-bridge.js" defer></script>');
html = html.replace('<title>V19 TEST — Fonctions regroupées</title>', '<title>Renforcement musculaire Cattenom</title>');
html = html.replace(/<div class="testbanner">.*?<\/div>/s, '');
html = html.replaceAll('V19 TEST', 'V19');
// La version définitive n'expose aucun lien vers la simulation fictive.
html = html.replace(/<a href="simulation-v19-test-validation-globale\.html"[^>]*>.*?<\/a>/s, '');
await mkdir(output, {recursive:true});
await writeFile(join(output, 'index.html'), html);
for (const file of ['config.js','logo.png']) await copyFile(join(root,file),join(output,file));
for (const file of ['onesignal-v19-bridge.js','onesignalsdkworker.js','netlify.toml']) await copyFile(join(root,'preparation-netlify',file),join(output,file));
console.log('Dossier créé : preparation-netlify/dist-v19');
console.log('AUCUN déploiement effectué. V18 reste intacte.');
