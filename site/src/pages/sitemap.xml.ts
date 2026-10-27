// /sitemap.xml: a sitemap index pointing at the page sitemap that
// @astrojs/sitemap writes (sitemap-0.xml), so the conventional URL works.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ? site.origin : '';
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `  <sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap>\n` +
    '</sitemapindex>\n';
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
