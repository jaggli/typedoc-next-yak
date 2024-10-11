// @ts-check
import path from 'node:path';
import fs from 'node:fs';
import typedoc from 'typedoc';
import { fileURLToPath } from 'node:url';

const { Application, TypeDocReader } = typedoc;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

/**
 * Get typedoc for one file
 * @param {string} file
 */
export const getTypedoc = async (file) => {
  const filePath = path.resolve(__dirname, file);

  /** @type {typedoc.JSONOutput.ProjectReflection | null}  */
  let fileDocs = null;

  // according to https://github.com/TypeStrong/typedoc/issues/2504
  const typedocApplication = await Application.bootstrap(
    {
      entryPoints: [filePath],
      tsconfig: path.join(rootDir, 'tsconfig.json'),
      basePath: rootDir,
      cleanOutputDir: false,
      pretty: true,
      disableGit: true,
      skipErrorChecking: true,
      excludeExternals: false,
      excludeNotDocumented: false,
      excludeNotDocumentedKinds: [],
      excludeInternal: false,
      excludePrivate: false,
      excludeProtected: false,
      excludeReferences: false,
      excludeCategories: [],
      logLevel: 'Verbose',
      sourceLinkTemplate: 'https://stackblitz.com/~/github.com/jaggli/typedoc-next-yak/{path}#line={line}'
    },
    // a subset of DEFAULT_READERS https://github.com/TypeStrong/typedoc/blob/f0f3d96f53ec0cc7767c21d6d5549305a986cdf0/src/lib/application.ts#L70
    [new TypeDocReader()]
  );

  const project = await typedocApplication.convert();

  if (project) {
    // get json from serializer
    const reflection = await typedocApplication.serializer.projectToObject(
      project,
      rootDir
    );

    fileDocs = reflection;
  }

  return fileDocs;
};

/**
 * Find a named child
 * @param {typedoc.JSONOutput.ProjectReflection | null} docs 
 * @param {string} name 
 */
const findChild = (docs, name) => {
  return docs?.children?.find(child => child.name === "Component")?.type
}

// Styled component
const styledDocs = await getTypedoc('StyledComponent.ts');
const styledFilename = path.resolve(rootDir, "output/styled-output.json");
fs.writeFileSync(styledFilename, JSON.stringify(styledDocs, null, 2));
console.log("Wrote all styled docs to", styledFilename);
console.log("Type of StyledComponent: \n\n ", findChild(styledDocs, "StyledComponent")?.type, "\n");

// Yak component
const yakDocs = await getTypedoc('YakComponent.ts');
const yakFilename = path.resolve(rootDir, "output/yak-output.json");
fs.writeFileSync(yakFilename, JSON.stringify(yakDocs, null, 2));
console.log("Wrote all yak docs to", yakFilename);
console.log("Type of YakComponent: \n\n ", findChild(yakDocs, "YakComponent")?.type, "\n");