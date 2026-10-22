/**
 * High-Authority Backlink Generation & Live Syndication Script
 * Period Tracker Ovulation Cycle - trackperiods.com
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TELEGRAPH_ACCESS_TOKEN = '04c681ab1226648a788c4e24f5e8236ecb789f5b5a8aa0ce43b58a880625';

function postToTelegraph(title, authorName, nodes) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      access_token: TELEGRAPH_ACCESS_TOKEN,
      title: title.slice(0, 255),
      author_name: authorName.slice(0, 127),
      author_url: 'https://trackperiods.com',
      content: nodes,
      return_content: false
    });

    const req = https.request('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.ok) {
            resolve(parsed.result.url);
          } else {
            reject(new Error(parsed.error || 'Telegraph API error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function createGitHubGist(title, filename, content) {
  try {
    const tmpFile = path.join(__dirname, `_tmp_${Date.now()}_${filename}`);
    fs.writeFileSync(tmpFile, content);
    const cmd = `gh gist create -p -d "${title.replace(/"/g, '\\"')}" -f "${filename}" "${tmpFile}"`;
    const out = execSync(cmd, { encoding: 'utf-8' }).trim();
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    return out.split('\n').pop().trim();
  } catch (err) {
    console.error('Error creating GitHub Gist:', err.message);
    return null;
  }
}

// Master Article Catalog for Web 2.0 Syndication
const CAMPAIGN_ARTICLES = [
  // Cluster A: Implantation
  {
    cluster: 'Cluster A: Implantation Calculator',
    targetUrl: 'https://trackperiods.com/calculators/implantation-calculator',
    guideUrl: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide',
    title: 'How to Calculate Embryo Implantation Dates and Early Symptoms',
    author: 'Fertility Science Review',
    keywords: ['implantation calculator', 'conception implantation calculator', 'embryo implantation timeline'],
    summary: 'Clinical explanation of the 6 to 12 DPO embryo implantation window, spotting vs period, and online calculation formulas.',
    bodyParas: [
      'For women trying to conceive, the two-week wait between ovulation and a missed menstrual period is filled with anticipation. Embryo implantation is the biological milestone that marks the true beginning of pregnancy.',
      'Conception happens inside the fallopian tube within 24 hours of ovulation. The fertilized zygote divides as it travels down into the uterine cavity, developing into a blastocyst. According to landmark clinical research, 84% of blastocysts implant into the receptive endometrium between 8 and 10 Days Past Ovulation (DPO).',
      'Symptoms during implantation include mild uterine tingling, lower pelvic twinges, and light pinkish or brown spotting that lasts under 48 hours without clots. Understanding this distinction prevents confusing implantation bleeding with an early period.'
    ],
    anchors: [
      { text: 'free Implantation Calculator', url: 'https://trackperiods.com/calculators/implantation-calculator' },
      { text: 'embryo implantation timeline guide', url: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide' },
      { text: 'conception implantation calculator tool', url: 'https://trackperiods.com/calculators/implantation-calculator' }
    ]
  },
  {
    cluster: 'Cluster A: Implantation Calculator',
    targetUrl: 'https://trackperiods.com/calculators/implantation-calculator',
    guideUrl: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide',
    title: 'Implantation Bleeding vs Period: 5 Signs to Look For',
    author: 'Reproductive Endocrinology Insights',
    keywords: ['implantation calculator', 'implantation bleeding vs period', 'implantation dates'],
    summary: 'Essential diagnostic guide for distinguishing early pregnancy implantation spotting from a true menstrual period.',
    bodyParas: [
      'One of the most frequent questions in reproductive medicine is whether light bleeding is an early period or implantation spotting. The two events have distinct physiological causes and characteristics.',
      'Implantation spotting occurs when the blastocyst burrows into microscopic uterine blood vessels. The flow is very light—scant pinkish or rust-colored drops that never require a pad or tampon. In contrast, menstrual flow is bright red, continuous, and frequently contains small coagulated clots.',
      'Timing also provides key clues: implantation occurs 6 to 12 days after ovulation, typically a few days before an expected period. Using cycle tracking math allows you to determine your highest probability implantation window.'
    ],
    anchors: [
      { text: 'online Implantation Calculator', url: 'https://trackperiods.com/calculators/implantation-calculator' },
      { text: 'Period Tracker Ovulation Cycle', url: 'https://trackperiods.com/' },
      { text: 'Embryo Implantation Timeline', url: 'https://trackperiods.com/articles/embryo-implantation-timeline-symptoms-calculator-guide' }
    ]
  },

  // Cluster B: hCG Doubling
  {
    cluster: 'Cluster B: hCG Calculator',
    targetUrl: 'https://trackperiods.com/calculators/hcg-calculator',
    guideUrl: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide',
    title: 'hCG Doubling Time in Early Pregnancy: Complete Reference Chart',
    author: 'Obstetrics & Maternal Care',
    keywords: ['hcg calculator', 'beta hcg doubling calculator', 'hcg doubling time calculator'],
    summary: 'A mathematical and clinical breakdown of human Chorionic Gonadotropin doubling rates, 48-hour velocity, and lab interpretation.',
    bodyParas: [
      'Human Chorionic Gonadotropin (beta hCG) is the signature hormone of early pregnancy produced by syncytiotrophoblast cells. Its primary biological function is maintaining progesterone production from the corpus luteum.',
      'In a healthy early singleton pregnancy below 1,200 mIU/mL, beta hCG concentrations double every 48 to 72 hours. This represents a minimum 35% to 53% increase across a 48-hour period between blood draws.',
      'Once hCG surpasses 1,200 mIU/mL, doubling naturally decelerates to 72–96 hours, and above 6,000 mIU/mL, it slows further. Understanding these mathematical thresholds prevents unnecessary anxiety over slowing doubling curves.'
    ],
    anchors: [
      { text: 'Beta hCG Doubling Calculator', url: 'https://trackperiods.com/calculators/hcg-calculator' },
      { text: 'hCG Levels Chart by Week Guide', url: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide' },
      { text: 'online hCG calculator', url: 'https://trackperiods.com/calculators/hcg-calculator' }
    ]
  },
  {
    cluster: 'Cluster B: hCG Calculator',
    targetUrl: 'https://trackperiods.com/calculators/hcg-calculator',
    guideUrl: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide',
    title: 'What Does Slow Rising hCG Mean? Clinical Guidelines',
    author: 'Clinical Endocrinology Watch',
    keywords: ['slow rising hcg calculator', 'beta hcg levels', 'hcg calculator'],
    summary: 'Understanding slow rising beta hCG, when ultrasound is diagnostic, and how doubling time calculators assist clinical evaluations.',
    bodyParas: [
      'When consecutive blood draws reveal slower-than-expected hCG doubling, physicians assess the entire clinical picture rather than relying on a single data point. Approximately 15% of healthy singleton pregnancies display slower initial doubling.',
      'However, persistent plateaus or doubling times exceeding 96 hours before 6 weeks can indicate ectopic pregnancy or non-viable gestation. When hCG levels reach 1,500 to 2,000 mIU/mL (the discriminatory zone), transvaginal ultrasound is capable of visualizing a gestational sac.',
      'Using standardized doubling formulas allows expectant parents and clinicians to track exact percentage velocities between draws.'
    ],
    anchors: [
      { text: 'free hCG Calculator', url: 'https://trackperiods.com/calculators/hcg-calculator' },
      { text: 'hCG chart by week of pregnancy', url: 'https://trackperiods.com/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide' },
      { text: 'trackperiods.com', url: 'https://trackperiods.com/' }
    ]
  },

  // Cluster C: Pregnancy Test Calculator & DPO
  {
    cluster: 'Cluster C: Pregnancy Test Calculator',
    targetUrl: 'https://trackperiods.com/calculators/pregnancy-test-calculator',
    guideUrl: 'https://trackperiods.com/articles/when-to-take-a-pregnancy-test-dpo-accuracy-calculator-timeline',
    title: 'When to Take a Pregnancy Test: 8 DPO to 14 DPO Accuracy Guide',
    author: 'Reproductive Medicine Digest',
    keywords: ['pregnancy test calculator', 'when to take a pregnancy test calculator', '8 dpo pregnancy test'],
    summary: 'Avoid false negatives: day-by-day testing accuracy timeline based on Days Past Ovulation and test strip analytical sensitivity.',
    bodyParas: [
      'Taking a home pregnancy test too early is the most common cause of false-negative emotional distress. Tests detect hCG in urine, which only begins circulating after embryo implantation occurs (typically 8 to 10 DPO).',
      'Clinical testing confirms the day-by-day accuracy curve: at 8 DPO, only 33% of pregnant women receive a positive result; at 10 DPO, accuracy rises to 74%; by 12 DPO, accuracy reaches 93%; and on the day of a missed period (14 DPO), accuracy reaches 99%.',
      'First morning urine contains the highest concentration of hCG after overnight fluid restriction. Diluted afternoon urine can easily mask early detectable lines.'
    ],
    anchors: [
      { text: 'Pregnancy Test Calculator', url: 'https://trackperiods.com/calculators/pregnancy-test-calculator' },
      { text: 'DPO Pregnancy Test Accuracy Guide', url: 'https://trackperiods.com/articles/when-to-take-a-pregnancy-test-dpo-accuracy-calculator-timeline' },
      { text: 'calculate testing dates online', url: 'https://trackperiods.com/calculators/pregnancy-test-calculator' }
    ]
  },

  // Cluster D: Period Blood Clots & Safe Days
  {
    cluster: 'Cluster D: Period Blood Clots & Safe Days',
    targetUrl: 'https://trackperiods.com/articles/period-blood-clots-what-they-mean',
    guideUrl: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide',
    title: 'Period Blood Clots: Why Jelly Chunks Form and Size Guidelines',
    author: 'Gynecological Health Review',
    keywords: ['period blood clots', 'jelly-like blood clots during period', 'chunks in period blood'],
    summary: 'Clinical guide to menstrual clots: why jelly-like liver chunks form on heavy flow days, the quarter vs dime rule, and red flags.',
    bodyParas: [
      'Seeing thick, jelly-like chunks in menstrual blood can be alarming, but passing small gelatinous clots during heavy flow days is standard physiology. The uterus produces anticoagulants to thin menstrual flow, but rapid shedding overwhelms these enzymes, allowing blood to coagulate into jelly clots.',
      'Gynecologists assess clots by size: dime or nickel-sized clots (under 1 inch / 2.5 cm) are normal. Clots consistently larger than a quarter (greater than 1 inch) indicate menorrhagia and warrant evaluation for fibroids, adenomyosis, or hormonal imbalance.',
      'Emergency red flags include passing golf-ball-sized clots, soaking through 2 or more heavy pads per hour for consecutive hours, or experiencing dizziness and shortness of breath.'
    ],
    anchors: [
      { text: 'Period Blood Clots Guide', url: 'https://trackperiods.com/articles/period-blood-clots-what-they-mean' },
      { text: 'Safe Days to Avoid Pregnancy Guide', url: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide' },
      { text: 'Period Tracker Ovulation Cycle platform', url: 'https://trackperiods.com/' }
    ]
  },
  {
    cluster: 'Cluster D: Period Blood Clots & Safe Days',
    targetUrl: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide',
    guideUrl: 'https://trackperiods.com/calculators/ovulation-calculator',
    title: 'Natural Family Planning: How to Calculate Safe Days to Avoid Pregnancy',
    author: 'Natural Fertility & Reproductive Health',
    keywords: ['safe days to avoid pregnancy', 'natural family planning', 'safe days calculator'],
    summary: 'Biologically calculated safe days using the rhythm method, basal body temperature, and cervical mucus tracking.',
    bodyParas: [
      'Natural Family Planning relies on the biological fact that conception is only possible during a 6-day fertile window: the 5 days prior to ovulation plus the day of ovulation itself. Sperm survive up to 5 days in alkaline cervical fluid, while an ovulated egg survives 12 to 24 hours.',
      'For regular 28-day cycles, ovulation occurs around Day 14. Days 1 through 7 and Days 18 through 28 carry the lowest biological probability of conception. However, cycle fluctuations require combining calendar counting with cervical mucus and temperature checks.',
      'Using digital cycle tracking with end-to-end local privacy provides dependable predictions without exposing sensitive intimate health data to third parties.'
    ],
    anchors: [
      { text: 'Safe Days Calculation Guide', url: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide' },
      { text: 'free Ovulation Calculator', url: 'https://trackperiods.com/calculators/ovulation-calculator' },
      { text: 'Period Tracker private app', url: 'https://trackperiods.com/app-features' }
    ]
  },

  // Cluster E: General Hub & Privacy App
  {
    cluster: 'Cluster E: General Hub & Privacy App',
    targetUrl: 'https://trackperiods.com',
    guideUrl: 'https://trackperiods.com/app-features',
    title: 'The Rise of 100% Private On-Device Period & Ovulation Tracking',
    author: 'Digital Health & Privacy Journal',
    keywords: ['private period tracker', 'period tracker ovulation cycle', 'best period tracker app'],
    summary: 'Why privacy-conscious women are switching to on-device encrypted period and ovulation tracking tools that never sell personal data.',
    bodyParas: [
      'In recent years, reproductive privacy has become a paramount concern for millions of women worldwide. Many popular menstrual tracking apps store cycle dates, intimacy logs, and pregnancy test results on remote cloud servers where they may be sold to advertisers or data brokers.',
      'A new standard in reproductive health is on-device architecture, where all cycle predictions, symptom tracking, and medical logs are stored exclusively on the user’s personal phone with cryptographic encryption.',
      'The Period Tracker & Ovulation Cycle suite provides 8 free clinical calculators, educational wellness guides, and offline mobile tracking on iOS and Android with zero external tracking.'
    ],
    anchors: [
      { text: 'Period Tracker Ovulation Cycle', url: 'https://trackperiods.com' },
      { text: 'private mobile app features', url: 'https://trackperiods.com/app-features' },
      { text: '8 fertility & cycle calculators', url: 'https://trackperiods.com/calculators' }
    ]
  }
];

async function run() {
  console.log('====================================================');
  console.log('🚀 STARTING HIGH-AUTHORITY BACKLINK GENERATION ENGINE');
  console.log('====================================================\n');

  const liveLinks = [];

  // Step 1: Deploy Live Web 2.0 Articles on Telegraph (telegra.ph)
  console.log('--- Step 1: Publishing Live Web 2.0 Articles on Telegraph ---');
  for (let i = 0; i < CAMPAIGN_ARTICLES.length; i++) {
    const art = CAMPAIGN_ARTICLES[i];
    try {
      const nodes = [
        { tag: 'p', children: [art.summary] },
        { tag: 'h4', children: ['Key Clinical Findings'] }
      ];

      art.bodyParas.forEach(p => {
        nodes.push({ tag: 'p', children: [p] });
      });

      nodes.push({ tag: 'h4', children: ['Interactive Tools & Verified Resources'] });
      art.anchors.forEach(a => {
        nodes.push({
          tag: 'p',
          children: [
            '• Explore: ',
            { tag: 'a', attrs: { href: a.url }, children: [a.text] }
          ]
        });
      });

      nodes.push({
        tag: 'p',
        children: [
          'Source & Complete Suite: ',
          { tag: 'a', attrs: { href: 'https://trackperiods.com/' }, children: ['trackperiods.com'] }
        ]
      });

      const liveUrl = await postToTelegraph(art.title, art.author, nodes);
      console.log(`[Telegraph ${i + 1}/${CAMPAIGN_ARTICLES.length}] Created: ${liveUrl}`);
      liveLinks.push({
        type: 'Telegraph Web 2.0',
        title: art.title,
        url: liveUrl,
        targetUrl: art.targetUrl,
        cluster: art.cluster
      });
      // brief pause to avoid rate limiting
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`[Telegraph ${i + 1}] Error:`, err.message);
    }
  }

  // Step 2: Deploy Public GitHub Gists (DA 96 authority)
  console.log('\n--- Step 2: Publishing Public High-DA GitHub Gists ---');
  for (let i = 0; i < CAMPAIGN_ARTICLES.length; i++) {
    const art = CAMPAIGN_ARTICLES[i];
    try {
      const slug = art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 45);
      const filename = `${slug}-reference.md`;

      const gistMd = `# ${art.title}
*Published by ${art.author} | Verified by Period Tracker & Ovulation Cycle Research*

## Summary
${art.summary}

## Clinical Details
${art.bodyParas.join('\n\n')}

## Recommended Clinical Tools & External Links
${art.anchors.map(a => `- [${a.text}](${a.url})`).join('\n')}
- [Period Tracker Ovulation Cycle Platform](https://trackperiods.com/)

---
*Reference catalog provided free by [trackperiods.com](https://trackperiods.com).*
`;

      const gistUrl = createGitHubGist(art.title, filename, gistMd);
      if (gistUrl) {
        console.log(`[GitHub Gist ${i + 1}/${CAMPAIGN_ARTICLES.length}] Created: ${gistUrl}`);
        liveLinks.push({
          type: 'GitHub Gist (DA 96)',
          title: art.title,
          url: gistUrl,
          targetUrl: art.targetUrl,
          cluster: art.cluster
        });
      }
      await new Promise(r => setTimeout(r, 800));
    } catch (err) {
      console.error(`[GitHub Gist ${i + 1}] Error:`, err.message);
    }
  }

  // Step 3: Generate Multi-Platform Syndication Vault
  console.log('\n--- Step 3: Compiling Multi-Platform Syndication Vault ---');
  const syndicationDir = path.join(__dirname, '..', 'syndication');
  if (!fs.existsSync(syndicationDir)) fs.mkdirSync(syndicationDir, { recursive: true });

  // 1. Quora & Reddit Q&A Copy-Paste Deck
  const qaDeck = CAMPAIGN_ARTICLES.map(art => ({
    topic: art.cluster,
    targetUrl: art.targetUrl,
    recommendedForums: ['Quora', 'Reddit r/TryingForABaby', 'Reddit r/Periods', 'Reddit r/BabyBumps', 'Reddit r/WomensHealth'],
    sampleQuestions: [
      `How do I accurately calculate my ${art.keywords[0]}?`,
      `What is considered normal vs abnormal for ${art.keywords[1] || art.keywords[0]}?`,
      `Are online calculators accurate for ${art.keywords[0]}?`
    ],
    markdownAnswer: `### Expert Response:
${art.summary}

${art.bodyParas[0]}

${art.bodyParas[1]}

You can verify your dates and personalized numbers with this free [${art.anchors[0].text}](${art.anchors[0].url}). For full clinical guidelines, check [${art.anchors[1].text}](${art.anchors[1].url}).`
  }));
  fs.writeFileSync(path.join(syndicationDir, 'quora_reddit_qa_deck.json'), JSON.stringify(qaDeck, null, 2));

  // 2. Medium & Substack Ready-to-Post Markdown Files
  CAMPAIGN_ARTICLES.forEach((art, idx) => {
    const mdContent = `---
title: "${art.title}"
author: "${art.author}"
canonical: "${art.guideUrl || art.targetUrl}"
tags: [${art.keywords.map(k => `"${k}"`).join(', ')}]
---

# ${art.title}

> ${art.summary}

${art.bodyParas.join('\n\n')}

### Verified Medical Calculators & Clinical References
${art.anchors.map(a => `- **[${a.text}](${a.url})**`).join('\n')}
- **[trackperiods.com Official Portal](https://trackperiods.com/)**

---
*Originally published on [Period Tracker & Ovulation Cycle](${art.targetUrl}).*
`;
    const fname = `medium_substack_article_${idx + 1}.md`;
    fs.writeFileSync(path.join(syndicationDir, fname), mdContent);
  });

  // 3. Social Bookmarks & Directory Submissions List
  const directoryDeck = [
    { name: 'Product Hunt', category: 'Tech & Health', url: 'https://trackperiods.com', tag: 'Period Tracker Ovulation Cycle - Private Menstrual Tracker' },
    { name: 'AlternativeTo', category: 'App Directory', url: 'https://trackperiods.com/app-features', tag: 'Alternative to Flo and Clue with 100% on-device privacy' },
    { name: 'SaaSHub', category: 'Software Directory', url: 'https://trackperiods.com', tag: 'Top Private Women Health Suite' },
    { name: 'Slant.co', category: 'Product Recommendations', url: 'https://trackperiods.com/app-features', tag: 'Best period tracker for privacy' },
    { name: 'Pinterest', category: 'Visual Infographics', url: 'https://trackperiods.com/calculators/implantation-calculator', tag: 'Embryo Implantation Timeline SVG Chart' },
    { name: 'Pinterest', category: 'Visual Infographics', url: 'https://trackperiods.com/calculators/hcg-calculator', tag: 'Beta hCG Doubling Curve Chart' },
    { name: 'Pinterest', category: 'Visual Infographics', url: 'https://trackperiods.com/calculators/pregnancy-test-calculator', tag: 'DPO Pregnancy Test Accuracy Timeline' },
    { name: 'SlideShare', category: 'Document Sharing', url: 'https://trackperiods.com/articles/period-blood-clots-what-they-mean', tag: 'Period Blood Clots: Sizes, Normal vs Abnormal' },
    { name: 'Scribd', category: 'Document Sharing', url: 'https://trackperiods.com/articles/safe-days-to-avoid-pregnancy-calculation-guide', tag: 'Natural Family Planning Calculation Guide' }
  ];
  fs.writeFileSync(path.join(syndicationDir, 'directories_and_citations.json'), JSON.stringify(directoryDeck, null, 2));

  // Save Live Backlink Audit Log
  const logFile = path.join(syndicationDir, 'live_generated_backlinks.json');
  fs.writeFileSync(logFile, JSON.stringify(liveLinks, null, 2));

  console.log(`\n🎉 Successfully published ${liveLinks.length} LIVE High-Authority Backlinks!`);
  console.log(`📁 Syndication packs generated in: ${syndicationDir}`);
  console.log('====================================================\n');
}

run().catch(console.error);
