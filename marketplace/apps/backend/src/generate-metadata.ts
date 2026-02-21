import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const metadataPath = join(__dirname, 'metadata.ts');

// Reset to placeholder so the type-checker doesn't choke on
// previously-generated extensionless imports (nodenext compat).
writeFileSync(metadataPath, 'export default async () => ({});\n');

const isWatch = process.argv.includes('--watch');

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      classValidatorShim: true,
      pathToSource: __dirname,
    }),
  ],
  outputDir: __dirname,
  watch: isWatch,
  tsconfigPath: 'apps/backend/tsconfig.app.json',
});

if (!isWatch) {
  const content = readFileSync(metadataPath, 'utf-8');
  if (!content.includes('@ts-nocheck')) {
    writeFileSync(metadataPath, `// @ts-nocheck\n${content}`);
  }
}
