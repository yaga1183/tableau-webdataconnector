const fs = require('fs');

(() => {
  // ad-hoc: node with certain versions works with corsproxy
  try {
    const packageIssuePath = `./node_modules/hapi/lib/defaults.js`;
    const nodeVersionInfo = process.version.substring(1).split('.')[0];
    if (nodeVersionInfo >= 13 && fs.existsSync(packageIssuePath)) {
      const tmpDirUsage = fs.readFileSync(packageIssuePath).toString()
        .replace(`var Os = require('os');`, `var Os = require('os'); Os.tmpDir = Os.tmpdir;`);
      fs.writeFileSync(packageIssuePath, tmpDirUsage);
      console.log(`[preStart] ad-hoc temporary mitigation done for recent node versions work with corsproxy`);
    }
  } catch(err) {
    console.log(`[preStart] ad-hoc action failure: ${err}`);
  }
})();
