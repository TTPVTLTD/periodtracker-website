/**
 * Multi-Domain Global Backlink Generation Engine
 * Creates backlinks across DIFFERENT ROOT DOMAINS across the world.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper to make fast HTTP/HTTPS requests with timeout
function requestUrl(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    if (postData) req.write(postData);
    req.end();
  });
}

// 1. write.as API (Root Domain: write.as)
async function createWriteAsPost(title, bodyMarkdown) {
  try {
    const payload = JSON.stringify({ body: `# ${title}\n\n${bodyMarkdown}` });
    const res = await requestUrl('https://write.as/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const parsed = JSON.parse(res.body);
    if (parsed.data && parsed.data.id) {
      return `https://write.as/${parsed.data.id}`;
    }
  } catch (e) {
    return null;
  }
}

// 2. is.gd API (Root Domain: is.gd)
async function createIsGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 3. v.gd API (Root Domain: v.gd)
async function createVGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 4. tinyurl.com API (Root Domain: tinyurl.com)
async function createTinyUrlLink(longUrl) {
  try {
    const res = await requestUrl(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 5. da.gd API (Root Domain: da.gd)
async function createDaGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://da.gd/s?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 6. clck.ru API (Root Domain: clck.ru - Yandex)
async function createClckRuLink(longUrl) {
  try {
    const res = await requestUrl(`https://clck.ru/--?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 7. zip1.io API (Root Domain: zip1.io)
async function createZip1Link(longUrl) {
  try {
    const payload = JSON.stringify({ url: longUrl });
    const res = await requestUrl('https://zip1.io/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const parsed = JSON.parse(res.body);
    if (parsed.short_url) return parsed.short_url;
  } catch (e) {
    return null;
  }
}

// 8. spoo.me API (Root Domain: spoo.me)
async function createSpooMeLink(longUrl) {
  try {
    const form = `url=${encodeURIComponent(longUrl)}`;
    const res = await requestUrl('https://spoo.me/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(form)
      }
    }, form);
    const parsed = JSON.parse(res.body);
    if (parsed.short_url) return parsed.short_url;
  } catch (e) {
    return null;
  }
}

// 9. urlvanish.com API (Root Domain: urlvanish.com)
async function createUrlVanishLink(longUrl) {
  try {
    const res = await requestUrl(`https://urlvanish.com/api/shorten?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 10. 307.fi API (Root Domain: 307.fi)
async function create307FiLink(longUrl) {
  try {
    const res = await requestUrl(`https://aisenseapi.com/services/v1/url_shortener/${encodeURIComponent(longUrl)}`);
    const parsed = JSON.parse(res.body);
    if (parsed.short_url) return parsed.short_url;
  } catch (e) {
    return null;
  }
}

// 11. paste.rs API (Root Domain: paste.rs)
async function createPasteRsSnippet(content) {
  try {
    const res = await requestUrl('https://paste.rs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(content)
      }
    }, content);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 12. paste.c-net.org API (Root Domain: paste.c-net.org)
async function createPasteCNetSnippet(content) {
  try {
    const res = await requestUrl('https://paste.c-net.org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(content)
      }
    }, content);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 13. termbin.com (Root Domain: termbin.com via netcat)
async function createTermbinSnippet(content) {
  try {
    const cmd = `echo "${content.replace(/"/g, '\\"')}" | nc termbin.com 9999`;
    const out = execSync(cmd, { encoding: 'utf-8', timeout: 6000 }).trim();
    if (out.startsWith('http')) return out;
  } catch (e) {
    return null;
  }
}

// 14. telegra.ph API (Root Domain: telegra.ph)
async function createTelegraphArticle(title, author, contentNodes) {
  try {
    const token = '04c681ab1226648a788c4e24f5e8236ecb789f5b5a8aa0ce43b58a880625';
    const payload = JSON.stringify({
      access_token: token,
      title: title.slice(0, 255),
      author_name: author.slice(0, 127),
      author_url: 'https://trackperiods.com',
      content: contentNodes,
      return_content: false
    });
    const res = await requestUrl('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const parsed = JSON.parse(res.body);
    if (parsed.ok) return parsed.result.url;
  } catch (e) {
    return null;
  }
}

// 15. gist.github.com (Root Domain: gist.github.com)
async function createGistLink(title, filename, markdown) {
  try {
    const tmp = path.join(__dirname, `_gist_${Date.now()}_${filename}`);
    fs.writeFileSync(tmp, markdown);
    const cmd = `gh gist create -p -d "${title.replace(/"/g, '\\"')}" -f "${filename}" "${tmp}"`;
    const out = execSync(cmd, { encoding: 'utf-8', timeout: 8000 }).trim();
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    return out.split('\n').pop().trim();
  } catch (e) {
    return null;
  }
}

// TARGET URLS & MEDICAL TOPICS
const TARGETS = [
  {
    topic: 'Embryo Implantation Window & Timeline',
    targetUrl: 'https://trackperiods.com/calculators/implantation-calculator',
    guideUrl: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide',
    keywords: ['implantation calculator', 'conception implantation calculator', 'embryo implantation timeline'],
    desc: 'Calculate the 6 to 12 DPO embryo implantation window, symptoms, and earliest positive pregnancy test days.'
  },
  {
    topic: 'Beta hCG Doubling Time & Reference Charts',
    targetUrl: 'https://trackperiods.com/calculators/hcg-calculator',
    guideUrl: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide',
    keywords: ['hcg calculator', 'beta hcg doubling calculator', 'hCG levels by week'],
    desc: 'Track early pregnancy beta hCG doubling velocities, 48-72h percentage increases, and clinical reference ranges.'
  },
  {
    topic: 'Pregnancy Test Accuracy & DPO Timing',
    targetUrl: 'https://trackperiods.com/calculators/pregnancy-test-calculator',
    guideUrl: 'https://trackperiods.com/articles/when-to-take-a-pregnancy-test-dpo-accuracy-calculator-timeline',
    keywords: ['pregnancy test calculator', 'when to take a pregnancy test', '8 dpo pregnancy test accuracy'],
    desc: 'Day-by-day 8 DPO to 14 DPO testing accuracy timeline, test strip sensitivity (10 mIU vs 25 mIU), and avoiding false negatives.'
  },
  {
    topic: 'Period Blood Clots & Menstrual Flow Health',
    targetUrl: 'https://trackperiods.com/articles/period-blood-clots-what-they-mean',
    guideUrl: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide',
    keywords: ['period blood clots', 'jelly-like blood clots during period', 'quarter vs dime size rule'],
    desc: 'Clinical guide to menstrual clots: why jelly-like liver chunks form on heavy flow days, normal vs abnormal sizes, and red flags.'
  },
  {
    topic: 'Natural Family Planning & Safe Days Calendar',
    targetUrl: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide',
    guideUrl: 'https://trackperiods.com/calculators/ovulation-calculator',
    keywords: ['safe days to avoid pregnancy', 'natural family planning rules', 'safe days calculator'],
    desc: 'Calculate biologically safe infertile days to plan intimacy safely using calendar rhythm, BBT, and cervical mucus rules.'
  },
  {
    topic: 'Ovulation & Peak 6-Day Fertile Window',
    targetUrl: 'https://trackperiods.com/calculators/ovulation-calculator',
    guideUrl: 'https://trackperiods.com/articles/pcos-irregular-period-ovulation-tracking-guide',
    keywords: ['ovulation calculator', 'fertile window calculator', 'irregular cycle ovulation'],
    desc: 'Accurately predict peak fertile days, luteinizing hormone surge, and ovulation timing even with irregular cycles or PCOS.'
  },
  {
    topic: 'Period Tracker & Ovulation Cycle Platform Hub',
    targetUrl: 'https://trackperiods.com',
    guideUrl: 'https://trackperiods.com/app-features',
    keywords: ['period tracker ovulation cycle', 'private period tracker app', 'free fertility calculators'],
    desc: '100% private, on-device encrypted reproductive health platform featuring 8 clinical fertility calculators and offline mobile apps.'
  }
];

async function main() {
  console.log('====================================================');
  console.log('🌐 MULTI-DOMAIN GLOBAL BACKLINK GENERATION ENGINE');
  console.log('Generating backlinks across DIFFERENT ROOT DOMAINS...');
  console.log('====================================================\n');

  const results = [];
  const domainSet = new Set();

  function record(rootDomain, liveUrl, targetUrl, keyword, type) {
    if (!liveUrl) return;
    domainSet.add(rootDomain);
    const entry = {
      rootDomain,
      liveUrl,
      targetUrl,
      keyword,
      type,
      generatedAt: new Date().toISOString()
    };
    results.push(entry);
    console.log(`✅ [Domain: ${rootDomain.padEnd(16)}] -> ${liveUrl}`);
  }

  for (let i = 0; i < TARGETS.length; i++) {
    const t = TARGETS[i];
    console.log(`\n📌 Processing Target Cluster: ${t.topic}`);

    // Domain 1: write.as
    const writeAsUrl = await createWriteAsPost(
      `${t.topic} - Clinical Guide`,
      `Learn how to calculate and track your reproductive milestones.\n\nCalculate your personalized timeline with the free [${t.keywords[0]}](${t.targetUrl}).\n\nRead the full clinical guide: [${t.keywords[1] || t.topic}](${t.guideUrl}).\n\nOfficial Platform: [Period Tracker Ovulation Cycle](https://trackperiods.com).`
    );
    record('write.as', writeAsUrl, t.targetUrl, t.keywords[0], 'Web 2.0 Article');

    // Domain 2: is.gd
    const isGdUrl = await createIsGdLink(t.targetUrl);
    record('is.gd', isGdUrl, t.targetUrl, t.keywords[0], '301 Redirect Link');

    // Domain 3: v.gd
    const vGdUrl = await createVGdLink(t.targetUrl);
    record('v.gd', vGdUrl, t.targetUrl, t.keywords[1] || t.keywords[0], '301 Redirect Link');

    // Domain 4: tinyurl.com
    const tinyUrl = await createTinyUrlLink(t.targetUrl);
    record('tinyurl.com', tinyUrl, t.targetUrl, t.keywords[0], '301 Redirect Link');

    // Domain 5: da.gd
    const daGdUrl = await createDaGdLink(t.targetUrl);
    record('da.gd', daGdUrl, t.targetUrl, t.keywords[2] || t.keywords[0], '301 Redirect Link');

    // Domain 6: clck.ru (Yandex)
    const clckUrl = await createClckRuLink(t.targetUrl);
    record('clck.ru', clckUrl, t.targetUrl, t.keywords[0], '301 Redirect Link');

    // Domain 7: zip1.io
    const zip1Url = await createZip1Link(t.targetUrl);
    record('zip1.io', zip1Url, t.targetUrl, t.keywords[1] || t.keywords[0], '301 Redirect Link');

    // Domain 8: spoo.me
    const spooUrl = await createSpooMeLink(t.targetUrl);
    record('spoo.me', spooUrl, t.targetUrl, t.keywords[0], '301 Redirect Link');

    // Domain 9: urlvanish.com
    const vanishUrl = await createUrlVanishLink(t.targetUrl);
    record('urlvanish.com', vanishUrl, t.targetUrl, t.keywords[0], '301 Redirect Link');

    // Domain 10: 307.fi
    const fiUrl = await create307FiLink(t.targetUrl);
    record('307.fi', fiUrl, t.targetUrl, t.keywords[1] || t.keywords[0], '301 Redirect Link');

    // Domain 11: paste.rs
    const pasteRsUrl = await createPasteRsSnippet(
      `${t.topic}\n${t.desc}\n\nTool Link: ${t.targetUrl}\nClinical Guide: ${t.guideUrl}\nPlatform: https://trackperiods.com`
    );
    record('paste.rs', pasteRsUrl, t.targetUrl, t.keywords[0], 'Text Paste Link');

    // Domain 12: paste.c-net.org
    const cNetUrl = await createPasteCNetSnippet(
      `${t.topic}\n${t.desc}\n\nDirect Link: ${t.targetUrl}\nGuide: ${t.guideUrl}`
    );
    record('paste.c-net.org', cNetUrl, t.targetUrl, t.keywords[0], 'Text Paste Link');

    // Domain 13: termbin.com
    const termbinUrl = await createTermbinSnippet(
      `${t.topic}\nAccess online calculator: ${t.targetUrl}\nRead clinical report: ${t.guideUrl}`
    );
    record('termbin.com', termbinUrl, t.targetUrl, t.keywords[0], 'Terminal Note Link');

    // Domain 14: telegra.ph (Single article per topic with rich links)
    const telegraphUrl = await createTelegraphArticle(
      `${t.topic}: Clinical Overview & Calculator`,
      'Period Tracker Health Editorial',
      [
        { tag: 'p', children: [t.desc] },
        { tag: 'h4', children: ['Key Clinical Recommendations'] },
        { tag: 'p', children: [
          '• Use the online tool: ',
          { tag: 'a', attrs: { href: t.targetUrl }, children: [t.keywords[0]] }
        ]},
        { tag: 'p', children: [
          '• In-depth medical guide: ',
          { tag: 'a', attrs: { href: t.guideUrl }, children: [t.topic] }
        ]},
        { tag: 'p', children: [
          '• Verified source: ',
          { tag: 'a', attrs: { href: 'https://trackperiods.com' }, children: ['trackperiods.com'] }
        ]}
      ]
    );
    record('telegra.ph', telegraphUrl, t.targetUrl, t.keywords[0], 'Web 2.0 Article');

    // Domain 15: gist.github.com
    const slug = t.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 35);
    const gistUrl = await createGistLink(
      `${t.topic} Documentation`,
      `${slug}-guide.md`,
      `# ${t.topic}\n\n${t.desc}\n\n## Tools & Guides\n- [${t.keywords[0]}](${t.targetUrl})\n- [${t.topic} Clinical Guide](${t.guideUrl})\n- [Period Tracker & Ovulation Cycle](https://trackperiods.com)\n`
    );
    record('gist.github.com', gistUrl, t.targetUrl, t.keywords[0], 'GitHub Gist (DA 96)');

    // Gentle interval between batches
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save all distinct domain backlinks to file
  const outFile = path.join(__dirname, '..', 'syndication', 'different_domain_backlinks.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));

  console.log('\n====================================================');
  console.log(`🎉 SUCCESS: Generated ${results.length} LIVE Backlinks across ${domainSet.size} DIFFERENT ROOT DOMAINS!`);
  console.log('List of Unique Root Domains Used:');
  Array.from(domainSet).forEach((d, idx) => {
    const count = results.filter(r => r.rootDomain === d).length;
    console.log(`  ${idx + 1}. ${d} (${count} links)`);
  });
  console.log(`📁 Saved results to: ${outFile}`);
  console.log('====================================================\n');
}

main().catch(console.error);
