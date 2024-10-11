// @ts-check
import path from 'node:path';
import typedoc from 'typedoc';
import { fileURLToPath } from 'node:url';

const { Application, TypeDocReader } = typedoc;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../');

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
      excludeInternal: false,
      excludeExternals: true,
      skipErrorChecking: true,
      logLevel: 'Error',
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

const docs = await getTypedoc('./Component.tsx');

console.log(JSON.stringify(docs, null, 2));
