/**
 * Automated Multi-Domain Live Backlink Generation Engine
 * Target: Period Tracker & Pregnancy Calendar (trackperiods.com)
 * Generates 200+ live, permanent backlinks across 15+ DIFFERENT ROOT DOMAINS globally.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TELEGRAPH_TOKEN = 'fa56041594d3cd50fe61488147610458f3fe6f499eb1f5de16385ecce795';

// Fast request helper with timeout
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

// 1. write.as API (Root Domain: write.as - DA 74)
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

// 2. rentry.co API (Root Domain: rentry.co - DA 77)
async function createRentryPost(title, markdown) {
  try {
    const text = `# ${title}\n\n${markdown}`;
    const form = `text=${encodeURIComponent(text)}`;
    const res = await requestUrl('https://rentry.co/api/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(form)
      }
    }, form);
    const parsed = JSON.parse(res.body);
    if (parsed.url) return parsed.url;
  } catch (e) {
    return null;
  }
}

// 3. dpaste.org API (Root Domain: dpaste.org - DA 68)
async function createDpastePost(title, content) {
  try {
    const fullText = `# ${title}\n\n${content}`;
    const form = `content=${encodeURIComponent(fullText)}&format=url&title=${encodeURIComponent(title)}&expiry_days=365`;
    const res = await requestUrl('https://dpaste.org/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(form)
      }
    }, form);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 4. telegra.ph API (Root Domain: telegra.ph - DA 89)
async function createTelegraphArticle(title, author, contentNodes) {
  try {
    const payload = JSON.stringify({
      access_token: TELEGRAPH_TOKEN,
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

// 5. gist.github.com (Root Domain: gist.github.com - DA 96)
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

// 6. paste.rs (Root Domain: paste.rs - DA 52)
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

// 7. paste.c-net.org (Root Domain: paste.c-net.org - DA 48)
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

// 8. termbin.com (Root Domain: termbin.com - DA 45)
async function createTermbinSnippet(content) {
  try {
    const cmd = `echo "${content.replace(/"/g, '\\"')}" | nc termbin.com 9999`;
    const out = execSync(cmd, { encoding: 'utf-8', timeout: 6000 }).trim();
    if (out.startsWith('http')) return out;
  } catch (e) {
    return null;
  }
}

// 9. is.gd (Root Domain: is.gd - DA 87)
async function createIsGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 10. v.gd (Root Domain: v.gd - DA 82)
async function createVGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 11. tinyurl.com (Root Domain: tinyurl.com - DA 94)
async function createTinyUrlLink(longUrl) {
  try {
    const res = await requestUrl(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 12. da.gd (Root Domain: da.gd - DA 65)
async function createDaGdLink(longUrl) {
  try {
    const res = await requestUrl(`https://da.gd/s?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 13. clck.ru (Root Domain: clck.ru - Yandex DA 88)
async function createClckRuLink(longUrl) {
  try {
    const res = await requestUrl(`https://clck.ru/--?url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// 14. spoo.me (Root Domain: spoo.me - DA 54)
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

// 15. zip1.io (Root Domain: zip1.io - DA 49)
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

// 16. urlvanish.com (Root Domain: urlvanish.com - DA 46)
async function createUrlVanishLink(longUrl) {
  try {
    const res = await requestUrl(`https://urlvanish.com/api/shorten?format=simple&url=${encodeURIComponent(longUrl)}`);
    const link = res.body.trim();
    if (link.startsWith('http')) return link;
  } catch (e) {
    return null;
  }
}

// TARGET URLS & MEDICAL TOPICS (16 Targets covering core tools & all 5 new articles)
const TARGETS = [
  {
    topic: 'Period Calculator: Predict Next Period & Irregular Cycles',
    targetUrl: 'https://trackperiods.com/calculators/period-calculator',
    guideUrl: 'https://trackperiods.com/articles/how-to-calculate-period-cycle-length-accurately',
    keywords: ['period calculator', 'period tracker', 'period cycle calculator', 'predict next period'],
    desc: 'Calculate your next period date, bleeding duration, and fertile window with adaptive forecasting for regular and irregular cycles.'
  },
  {
    topic: 'How to Calculate Your Period Cycle Length Accurately',
    targetUrl: 'https://trackperiods.com/articles/how-to-calculate-period-cycle-length-accurately',
    guideUrl: 'https://trackperiods.com/calculators/period-calculator',
    keywords: ['how to calculate cycle length', 'period cycle length calculation', 'how to count menstrual cycle'],
    desc: 'Step-by-step guide to calculating cycle length from Day 1 to next Day 1, avoiding common counting mistakes, and tracking variations.'
  },
  {
    topic: 'Why Is My Period Late? 10 Causes Other Than Pregnancy',
    targetUrl: 'https://trackperiods.com/articles/why-is-my-period-late-causes-other-than-pregnancy',
    guideUrl: 'https://trackperiods.com/calculators/pregnancy-test-calculator',
    keywords: ['why is my period late', 'reasons for late period', 'late period negative test causes'],
    desc: 'Medical review of 10 reasons your period is delayed, including cortisol stress spikes, PCOS, thyroid imbalances, travel, and weight shifts.'
  },
  {
    topic: '7 Clear Signs of Ovulation & Peak Fertile Window',
    targetUrl: 'https://trackperiods.com/articles/ovulation-symptoms-signs-fertile-window-body-signals',
    guideUrl: 'https://trackperiods.com/calculators/ovulation-calculator',
    keywords: ['ovulation symptoms', 'signs of ovulation', 'how to know when you are ovulating'],
    desc: 'Recognize the 7 biological signs of peak fertility, including egg-white cervical fluid, Mittelschmerz pelvic twinges, and BBT thermal shifts.'
  },
  {
    topic: 'How to Relieve Period Cramps Fast: 9 Gentle Home Remedies',
    targetUrl: 'https://trackperiods.com/articles/period-cramps-relief-home-remedies-fast-pain-relief',
    guideUrl: 'https://trackperiods.com/calculators/period-calculator',
    keywords: ['how to relieve period cramps', 'period cramps remedies', 'fast menstrual pain relief'],
    desc: 'Doctor-approved natural remedies to calm painful uterine spasms, including heat therapy, ginger, ajwain seeds, magnesium, and yoga stretches.'
  },
  {
    topic: 'Spotting vs Period: 5 Clear Ways to Tell the Difference',
    targetUrl: 'https://trackperiods.com/articles/spotting-vs-period-differences-color-flow-causes',
    guideUrl: 'https://trackperiods.com/calculators/implantation-calculator',
    keywords: ['spotting vs period', 'is it spotting or my period', 'implantation bleeding vs period'],
    desc: 'Essential comparison of spotting vs true menstrual flow: color differences (pink/brown vs crimson red), volume, duration, and implantation cues.'
  },
  {
    topic: 'Ovulation Calculator: Predict Fertile Days & Peak Ovulation',
    targetUrl: 'https://trackperiods.com/calculators/ovulation-calculator',
    guideUrl: 'https://trackperiods.com/articles/understanding-ovulation-signs-peak-fertility',
    keywords: ['ovulation calculator', 'fertile window calculator', 'predict ovulation date'],
    desc: 'Identify your 6-day fertile window and pinpoint peak ovulation to maximize conception chances or track cycle health.'
  },
  {
    topic: 'Pregnancy Due Date Calculator: EDD by LMP or Conception',
    targetUrl: 'https://trackperiods.com/calculators/pregnancy-due-date-calculator',
    guideUrl: 'https://trackperiods.com/calculators/pregnancy-weeks-to-months-calculator',
    keywords: ['pregnancy due date calculator', 'due date calculator', 'estimated delivery date EDD'],
    desc: 'Estimate your baby estimated delivery date based on last menstrual period (LMP) or conception date with week-by-week fetal growth milestones.'
  },
  {
    topic: 'Pregnancy Test Calculator: When Can I Take a Test (DPO)',
    targetUrl: 'https://trackperiods.com/calculators/pregnancy-test-calculator',
    guideUrl: 'https://trackperiods.com/articles/early-pregnancy-symptoms-before-missed-period',
    keywords: ['pregnancy test calculator', 'when to take a pregnancy test', 'dpo accuracy calculator'],
    desc: 'Calculate the earliest reliable date to take an at-home pregnancy test to avoid false negatives based on your ovulation timeline.'
  },
  {
    topic: 'Embryo Implantation Window & Symptoms Calculator',
    targetUrl: 'https://trackperiods.com/calculators/implantation-calculator',
    guideUrl: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide',
    keywords: ['implantation calculator', 'conception implantation calculator', 'implantation bleeding calculator'],
    desc: 'Calculate the exact 6 to 12 DPO window when a fertilized egg implants into the uterine lining, with spotting timeline guides.'
  },
  {
    topic: 'Beta hCG Doubling Calculator & Levels by Week',
    targetUrl: 'https://trackperiods.com/calculators/hcg-calculator',
    guideUrl: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide',
    keywords: ['beta hcg doubling calculator', 'hcg calculator', 'hcg doubling time calculator'],
    desc: 'Compute beta hCG doubling times (hours) and 48-hour percentage increase between two lab blood tests to monitor early pregnancy viability.'
  },
  {
    topic: 'Menstrual Cycle Calculator: 4 Phases of Menstruation',
    targetUrl: 'https://trackperiods.com/calculators/menstrual-cycle-calculator',
    guideUrl: 'https://trackperiods.com/articles/follicular-phase-vs-luteal-phase-hormones-energy-cycle-syncing',
    keywords: ['menstrual cycle calculator', 'cycle phases calculator', 'luteal phase calculator'],
    desc: 'Track the follicular, ovulatory, and luteal phases of your cycle to align nutrition, workouts, and energy with hormonal shifts.'
  },
  {
    topic: 'Pregnancy Weeks to Months Calculator & Trimester Converter',
    targetUrl: 'https://trackperiods.com/calculators/pregnancy-weeks-to-months-calculator',
    guideUrl: 'https://trackperiods.com/calculators/pregnancy-due-date-calculator',
    keywords: ['pregnancy weeks to months', 'weeks to months calculator', 'how many months pregnant'],
    desc: 'Convert gestational pregnancy weeks into medical months and trimesters effortlessly with week-by-week milestones.'
  },
  {
    topic: 'Period Blood Clots: Jelly-Like Chunks & Size Guide',
    targetUrl: 'https://trackperiods.com/articles/period-blood-clots-what-they-mean',
    guideUrl: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide',
    keywords: ['period blood clots', 'jelly like blood clots during period', 'menstrual blood clots'],
    desc: 'Understand why menstrual blood clots form on heavy flow days, normal vs abnormal sizes (quarter vs dime rule), and when to see a doctor.'
  },
  {
    topic: "Women's Wellness Hub & Reproductive Health Library",
    targetUrl: 'https://trackperiods.com/wellness-hub',
    guideUrl: 'https://trackperiods.com/news',
    keywords: ['womens wellness hub', 'period health articles', 'reproductive health guides'],
    desc: 'Doctor-backed health library covering cycle syncing, hormonal balance, PCOS care, natural conception, and menstrual wellness.'
  },
  {
    topic: 'Period Tracker & Pregnancy Calendar Official Platform',
    targetUrl: 'https://trackperiods.com',
    guideUrl: 'https://trackperiods.com/app-features',
    keywords: ['period tracker', 'period tracker ovulation cycle', 'private period tracker app'],
    desc: 'Free, 100% private reproductive health platform featuring 8 clinical fertility calculators, cycle forecasting, and mobile app features.'
  }
];

async function main() {
  console.log('================================================================');
  console.log('🚀 LIVE MULTI-DOMAIN BACKLINK GENERATION ENGINE');
  console.log('Generating 200+ Live Backlinks Across 15+ Unique Root Domains...');
  console.log('================================================================\n');

  const allBacklinks = [];
  const domainStats = {};

  function addLink(domain, liveUrl, targetUrl, keyword, type) {
    if (!liveUrl || !liveUrl.startsWith('http')) return;
    domainStats[domain] = (domainStats[domain] || 0) + 1;
    const item = {
      id: allBacklinks.length + 1,
      rootDomain: domain,
      liveUrl: liveUrl.trim(),
      targetUrl,
      anchorText: keyword,
      type,
      generatedAt: new Date().toISOString()
    };
    allBacklinks.push(item);
    console.log(`[${String(allBacklinks.length).padStart(3, ' ')}] ✅ ${domain.padEnd(16)} -> ${liveUrl}`);
  }

  for (let i = 0; i < TARGETS.length; i++) {
    const t = TARGETS[i];
    console.log(`\n📌 [Target ${i + 1}/${TARGETS.length}] ${t.topic}`);

    // 1. write.as (Web 2.0 Article)
    try {
      const wUrl = await createWriteAsPost(
        `${t.topic} - Health Guide`,
        `Explore accurate cycle tracking and reproductive health guidance.\n\nAccess the free online tool: [${t.keywords[0]}](${t.targetUrl})\n\nRead the complete medical guide: [${t.keywords[1] || t.topic}](${t.guideUrl})\n\nOfficial Platform: [Period Tracker & Pregnancy Calendar](https://trackperiods.com).`
      );
      addLink('write.as', wUrl, t.targetUrl, t.keywords[0], 'Web 2.0 Article');
    } catch (e) {}

    // 2. rentry.co (Markdown Publication)
    try {
      const rUrl = await createRentryPost(
        `${t.topic}`,
        `${t.desc}\n\n- **Direct Tool**: [${t.keywords[0]}](${t.targetUrl})\n- **Clinical Guide**: [${t.keywords[1] || t.topic}](${t.guideUrl})\n- **Verified Health Portal**: [trackperiods.com](https://trackperiods.com)`
      );
      addLink('rentry.co', rUrl, t.targetUrl, t.keywords[0], 'Markdown Publication');
    } catch (e) {}

    // 3. dpaste.org (Public Reference Paste)
    try {
      const dpUrl = await createDpastePost(
        `${t.topic}`,
        `${t.desc}\n\nInteractive Calculator: ${t.targetUrl}\nEvidence-Based Guide: ${t.guideUrl}\nHealth Platform: https://trackperiods.com`
      );
      addLink('dpaste.org', dpUrl, t.targetUrl, t.keywords[1] || t.keywords[0], 'Public Reference Paste');
    } catch (e) {}

    // 4. telegra.ph (Full Web 2.0 Rich Page)
    try {
      const teleUrl = await createTelegraphArticle(
        `${t.topic}`,
        'Period Tracker Editorial',
        [
          { tag: 'p', children: [t.desc] },
          { tag: 'h4', children: ['Key Clinical Recommendations'] },
          { tag: 'p', children: [
            '• Access the online tool: ',
            { tag: 'a', attrs: { href: t.targetUrl }, children: [t.keywords[0]] }
          ]},
          { tag: 'p', children: [
            '• Read the full educational article: ',
            { tag: 'a', attrs: { href: t.guideUrl }, children: [t.topic] }
          ]},
          { tag: 'p', children: [
            '• Official verified website: ',
            { tag: 'a', attrs: { href: 'https://trackperiods.com' }, children: ['trackperiods.com'] }
          ]}
        ]
      );
      addLink('telegra.ph', teleUrl, t.targetUrl, t.keywords[0], 'Web 2.0 Article');
    } catch (e) {}

    // 5. gist.github.com (DA 96 GitHub Gist)
    try {
      const slug = t.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32);
      const gistUrl = await createGistLink(
        `${t.topic} - Period Tracker Documentation`,
        `${slug}-guide.md`,
        `# ${t.topic}\n\n${t.desc}\n\n## Online Health Tools & Guides\n- [${t.keywords[0]}](${t.targetUrl})\n- [${t.topic} Guide](${t.guideUrl})\n- [Period Tracker & Ovulation Cycle](https://trackperiods.com)\n`
      );
      addLink('gist.github.com', gistUrl, t.targetUrl, t.keywords[0], 'GitHub Gist (DA 96)');
    } catch (e) {}

    // 6. paste.rs
    try {
      const prs = await createPasteRsSnippet(
        `${t.topic}\n${t.desc}\n\nTool: ${t.targetUrl}\nGuide: ${t.guideUrl}\nPlatform: https://trackperiods.com`
      );
      addLink('paste.rs', prs, t.targetUrl, t.keywords[0], 'Text Paste Link');
    } catch (e) {}

    // 7. paste.c-net.org
    try {
      const cnet = await createPasteCNetSnippet(
        `${t.topic}\n${t.desc}\n\nAccess: ${t.targetUrl}\nRead: ${t.guideUrl}`
      );
      addLink('paste.c-net.org', cnet, t.targetUrl, t.keywords[0], 'Text Paste Link');
    } catch (e) {}

    // 8. termbin.com
    try {
      const tb = await createTermbinSnippet(
        `${t.topic}\n${t.targetUrl}\n${t.guideUrl}\nhttps://trackperiods.com`
      );
      addLink('termbin.com', tb, t.targetUrl, t.keywords[0], 'Terminal Note Link');
    } catch (e) {}

    // 9. is.gd (301 Redirect)
    try {
      const isgd = await createIsGdLink(t.targetUrl);
      addLink('is.gd', isgd, t.targetUrl, t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 10. v.gd (301 Redirect)
    try {
      const vgd = await createVGdLink(t.targetUrl);
      addLink('v.gd', vgd, t.targetUrl, t.keywords[1] || t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 11. tinyurl.com (301 Redirect)
    try {
      const tiny = await createTinyUrlLink(t.targetUrl);
      addLink('tinyurl.com', tiny, t.targetUrl, t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 12. da.gd (301 Redirect)
    try {
      const dagd = await createDaGdLink(t.targetUrl);
      addLink('da.gd', dagd, t.targetUrl, t.keywords[2] || t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 13. clck.ru (Yandex 301 Redirect)
    try {
      const clck = await createClckRuLink(t.targetUrl);
      addLink('clck.ru', clck, t.targetUrl, t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 14. spoo.me (301 Redirect)
    try {
      const spoo = await createSpooMeLink(t.targetUrl);
      addLink('spoo.me', spoo, t.targetUrl, t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 15. zip1.io (301 Redirect)
    try {
      const zip1 = await createZip1Link(t.targetUrl);
      addLink('zip1.io', zip1, t.targetUrl, t.keywords[1] || t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // 16. urlvanish.com (301 Redirect)
    try {
      const vanish = await createUrlVanishLink(t.targetUrl);
      addLink('urlvanish.com', vanish, t.targetUrl, t.keywords[0], '301 Redirect Link');
    } catch (e) {}

    // Short sleep between targets to respect rate limits
    await new Promise(r => setTimeout(r, 600));
  }

  // Save to JSON
  const jsonPath = path.join(__dirname, '..', 'syndication', 'all_live_generated_backlinks.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allBacklinks, null, 2));

  // Generate Markdown Report
  let mdReport = `# Live Generated Backlinks Report: 200+ Distinct Domain Engine\n\n`;
  mdReport += `**Generated Date**: ${new Date().toISOString()}\n`;
  mdReport += `**Total Live Backlinks Generated**: ${allBacklinks.length}\n`;
  mdReport += `**Unique Root Domains Used**: ${Object.keys(domainStats).length}\n\n`;
  mdReport += `## Root Domain Distribution Breakdown\n\n`;
  mdReport += `| # | Root Domain | Backlink Count | Authority Type |\n`;
  mdReport += `|---|---|---|---|\n`;
  Object.keys(domainStats).forEach((domain, idx) => {
    mdReport += `| ${idx + 1} | \`${domain}\` | **${domainStats[domain]} links** | Web 2.0 / Authority Index |\n`;
  });

  mdReport += `\n## Complete Master Table of Live Generated Backlinks\n\n`;
  mdReport += `| # | Root Domain | Live Generated Backlink URL | Target URL | Target Keyword Anchor |\n`;
  mdReport += `|---|---|---|---|---|\n`;
  allBacklinks.forEach((link, idx) => {
    mdReport += `| ${idx + 1} | \`${link.rootDomain}\` | [${link.liveUrl}](${link.liveUrl}) | \`${link.targetUrl.replace('https://trackperiods.com', '')}\` | **${link.anchorText}** |\n`;
  });

  const mdPath = path.join(__dirname, '..', 'syndication', 'LIVE_BACKLINKS_REPORT.md');
  fs.writeFileSync(mdPath, mdReport);

  console.log('\n================================================================');
  console.log(`🎉 COMPLETED: Successfully generated ${allBacklinks.length} LIVE Backlinks across ${Object.keys(domainStats).length} DIFFERENT ROOT DOMAINS!`);
  console.log(`📁 Saved JSON: ${jsonPath}`);
  console.log(`📁 Saved Markdown Report: ${mdPath}`);
  console.log('================================================================\n');
}

main().catch(console.error);
