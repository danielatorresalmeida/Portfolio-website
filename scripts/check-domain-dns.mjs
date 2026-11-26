/**
 * Read-only DNS preflight for a GitHub Pages / multi-project domain migration.
 * No credentials, zone updates, API calls or account mutations.
 *
 * Usage:
 *   npm run check:dns
 *   node scripts/check-domain-dns.mjs example.com
 */
import dns from 'node:dns/promises';

const domain = process.argv[2] || 'torresalmeida.com';
const names = [
  { host: domain, types: ['A', 'AAAA', 'MX', 'TXT'] },
  { host: `www.${domain}`, types: ['CNAME', 'A', 'AAAA'] },
  { host: `_dmarc.${domain}`, types: ['TXT'] },
  { host: `opus.${domain}`, types: ['CNAME', 'A'] },
  { host: `tasks.${domain}`, types: ['CNAME', 'A'] },
  { host: `devflow.${domain}`, types: ['CNAME', 'A'] },
];

const methods = { A: dns.resolve4, AAAA: dns.resolve6, MX: dns.resolveMx, TXT: dns.resolveTxt, CNAME: dns.resolveCname };

function summarise(type, value) {
  if (type === 'MX') return value.map(({ exchange, priority }) => `${priority} ${exchange}`);
  if (type === 'TXT') {
    const txt = value.map(parts => parts.join(''));
    const flags = [];
    if (txt.some(v => v.startsWith('v=spf1'))) flags.push('SPF present');
    if (txt.some(v => v.startsWith('v=DMARC1'))) flags.push('DMARC present');
    return [`${txt.length} TXT records`, ...flags];
  }
  return value;
}

console.log(`DNS preflight (read-only) · ${domain}`);
console.log('No settings or records will be changed.\n');

for (const { host, types } of names) {
  console.log(host);
  for (const type of types) {
    try {
      const value = await methods[type](host);
      console.log(`  ${type}: ${summarise(type, value).join(' | ')}`);
    } catch (error) {
      if (['ENODATA', 'ENOTFOUND', 'ENODOMAIN', 'NXDOMAIN', 'ESERVFAIL'].includes(error.code)) {
        console.log(`  ${type}: none / not available (${error.code})`);
      } else {
        console.log(`  ${type}: lookup failed (${error.code || 'unknown error'})`);
      }
    }
  }
}
console.log('\nBefore changing DNS: preserve MX, SPF, DKIM and DMARC records. Compare the actual DNS provider configuration with these public responses.');
