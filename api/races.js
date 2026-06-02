export default async function handler(req, res) {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSE-4-4owEM6hdZO-ZecZXyH3K8D4OZV_tLbvv6RhiLZj9sLkgtP_xGSGO6YFBWTFnFkHmBF3mMZdX7/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error('시트 fetch 실패');
    const text = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300'); // 5분 캐시
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
