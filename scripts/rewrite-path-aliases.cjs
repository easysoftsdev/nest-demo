const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const aliasPrefix = '@/';
const fileExtensions = new Set(['.js', '.cjs', '.mjs', '.d.ts']);
const aliasPattern = /(['"])@\/([^'"]+)\1/g;

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function toRelativeAliasTarget(filePath, specifier) {
  const fromDir = path.dirname(filePath);
  const targetPath = path.resolve(distDir, specifier);
  let relativePath = path.relative(fromDir, targetPath);

  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }

  return toPosix(relativePath);
}

function rewriteFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const rewritten = original.replace(aliasPattern, (match, quote, specifier) => {
    const nextPath = toRelativeAliasTarget(filePath, specifier);
    return `${quote}${nextPath}${quote}`;
  });

  if (rewritten !== original) {
    fs.writeFileSync(filePath, rewritten);
  }
}

function walk(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath);
      continue;
    }

    if (fileExtensions.has(path.extname(entry.name))) {
      rewriteFile(entryPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  walk(distDir);
}
