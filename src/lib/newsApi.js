export const API_BASE_URL = 'https://docipo.ipotrending.com/api/v1/common';

export async function fetchNewsList(page = 1, limit = 9) {
  try {
    const payload = {
      page,
      limit,
      web: 'trackperiods.com',
    };

    console.log("\n========== NEWS API REQUEST ==========");
    console.log(`ROUTE: ${API_BASE_URL}/getNewsList`);
    console.log(`PAYLOAD: ${JSON.stringify(payload, null, 2)}`);
    console.log("======================================\n");

    const res = await fetch(`${API_BASE_URL}/getNewsList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("\n========== NEWS API ERROR ==========");
      console.error(`STATUS: ${res.status}`);
      console.error(`RESPONSE: ${await res.text()}`);
      console.error("====================================\n");
      throw new Error('Failed to fetch news list');
    }

    const json = await res.json();
    console.log("\n========== NEWS API RESPONSE =========");
    console.log(`STATUS: ${res.status}`);
    console.log(`DATA: ${JSON.stringify(json, null, 2)}`);
    console.log("======================================\n");
    return json; 
  } catch (error) {
    console.error("News API Fetch Error (Detailed):", error.message);
    return null;
  }
}

export async function fetchNewsDetail(slug) {
  try {
    // Note: Assuming detail API exists. If not, fetching list and filtering.
    const res = await fetch(`${API_BASE_URL}/detail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, web: 'trackperiods.com' }),
      cache: 'no-store'
    });
    if (!res.ok) {
      // Fallback: search in list API
      const listRes = await fetchNewsList(1, 100);
      const allNews = listRes?.data?.data || listRes?.data || [];
      return allNews.find(n => n.slug === slug || n._id === slug || n.id?.toString() === slug?.toString()) || null;
    }
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error('News Detail Fetch Error:', error);
    return null;
  }
}
