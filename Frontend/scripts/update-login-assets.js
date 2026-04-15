const fs = require('fs')
const path = require('path')

const root = process.cwd()
const distDir = path.join(root, 'dist')
const publicLoginPath = path.join(root, 'public', 'assets', 'login.html')
const distLoginPath = path.join(distDir, 'assets', 'login.html')
const manifestPathCandidates = [
  path.join(distDir, 'manifest.json'),
  path.join(distDir, '.vite', 'manifest.json')
]

const manifestPath = manifestPathCandidates.find((p) => fs.existsSync(p))

function replaceAssetReferences(html, jsPath) {
  return html.replace(/\/src\/main\.js/g, `/${jsPath}`)
}

try {
  if (!manifestPath) {
    throw new Error(`manifest.json not found in ${manifestPathCandidates.join(' or ')}`)
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const mainEntry = manifest['src/main.js'] || Object.values(manifest).find((entry) => entry.isEntry)
  if (!mainEntry || !mainEntry.file) {
    throw new Error('Could not find main entry in manifest')
  }

  const jsPath = mainEntry.file

  const sourcePaths = [distLoginPath]
  sourcePaths.forEach((htmlPath) => {
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Skipping missing file: ${htmlPath}`)
      return
    }

    const html = fs.readFileSync(htmlPath, 'utf-8')
    const updated = replaceAssetReferences(html, jsPath)
    fs.writeFileSync(htmlPath, updated, 'utf-8')
    console.log(`Updated login asset refs in ${htmlPath}`)
  })
} catch (error) {
  console.error('Failed to update login asset references:', error)
  process.exit(1)
}
