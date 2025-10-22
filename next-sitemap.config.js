/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.siteniz.com', // burayı kendi domain’in ile değiştir
  generateRobotsTxt: true, // robots.txt oluştur
  sitemapSize: 5000, // sitemap büyüklüğü sınırı
  changefreq: 'weekly',
  priority: 0.7,
};
