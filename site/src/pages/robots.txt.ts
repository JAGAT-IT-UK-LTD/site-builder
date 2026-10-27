// robots.txt per domain (replaces the old static file whose Sitemap line said
// REPLACE_DOMAIN — the deploy-time rewrite script was deprecated, so the
// placeholder was being served live).
import type { APIRoute } from 'astro';

// Extra per-domain disallow rules that were live on the server but not in git.
const EXTRA: Record<string, string[]> = {
  'adminruhulamin.co.uk': ['/ap-sms.apk'],
};

export const GET: APIRoute = ({ site }) => {
  const origin = site ? site.origin : '';
  const host = site ? site.host : '';
  const lines = ['User-agent: *', 'Allow: /'];
  for (const p of EXTRA[host] ?? []) lines.push(`Disallow: ${p}`);
  lines.push('', `Sitemap: ${origin}/sitemap.xml`, '');
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
