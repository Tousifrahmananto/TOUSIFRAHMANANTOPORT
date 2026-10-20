import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const origin = 'https://tousifrahmanantoportfolio.vercel.app';
const name = 'Tousif Rahman Anto';
const role = 'Backend & Full-Stack Developer';
const description = 'Tousif Rahman Anto is a backend and full-stack developer in Dhaka, Bangladesh. Explore Node.js, TypeScript and Django projects, research and experience.';
const escape = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { projects, github, linkedin, fellowshipProfile } = await server.ssrLoadModule('/src/data.ts');
  const template = await readFile('dist/index.html', 'utf8');
  const person = {
    '@type': 'Person', '@id': `${origin}/#person`, name,
    url: `${origin}/`, jobTitle: role, image: `${origin}/images/portrait.jpg`,
    description, sameAs: [github, linkedin, fellowshipProfile],
    homeLocation: { '@type': 'Place', name: 'Dhaka, Bangladesh' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'BRAC University' },
    knowsAbout: ['JavaScript', 'TypeScript', 'Python', 'Node.js', 'Express', 'Django REST Framework', 'REST APIs', 'Socket.IO', 'MongoDB', 'PostgreSQL', 'React', 'Next.js'],
  };
  const website = {
    '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`,
    name, alternateName: `${name} Portfolio`, inLanguage: 'en',
    publisher: { '@id': person['@id'] },
  };
  const sourceCode = (project) => ({
    '@type': 'SoftwareSourceCode', '@id': `${origin}/work/${project.id}/#project`,
    name: project.title, description: project.summary,
    url: `${origin}/work/${project.id}/`, codeRepository: project.repo,
    keywords: project.stack, creator: { '@id': person['@id'] },
    ...(project.live ? { sameAs: [project.live] } : {}),
  });
  const routes = [{ path: '/', project: null }, ...projects.map((project) => ({ path: `/work/${project.id}/`, project })), { path: '/404.html', project: null }];
  for (const { path, project } of routes) {
    const missing = path === '/404.html';
    const url = `${origin}${path}`;
    const title = missing ? `Page not found | ${name}` : project ? `${project.title}: ${project.label} | ${name}` : `${name} | ${role}`;
    const summary = project ? project.summary : description;
    const graph = project ? [person, website, sourceCode(project), {
      '@type': 'WebPage', '@id': url, url, name: title, description: summary,
      mainEntity: { '@id': `${url}#project` }, author: { '@id': person['@id'] },
      isPartOf: { '@id': website['@id'] },
    }, {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: project.title, item: url },
      ],
    }] : [person, website, {
      '@type': 'ProfilePage', '@id': `${origin}/#profile`, url: `${origin}/`, name: title,
      mainEntity: { '@id': person['@id'] }, inLanguage: 'en',
      isPartOf: { '@id': website['@id'] },
      hasPart: projects.map((item) => ({ '@id': `${origin}/work/${item.id}/#project` })),
    }, ...projects.map(sourceCode)];
    const tags = [
      ['name', 'description', summary], ['name', 'author', name],
      ['name', 'robots', missing ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:type', 'website'], ['property', 'og:site_name', name],
      ['property', 'og:locale', 'en_US'], ['property', 'og:title', title],
      ['property', 'og:description', summary], ['property', 'og:url', url],
      ['property', 'og:image', `${origin}/images/portfolio-social.png`],
      ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
      ['property', 'og:image:alt', `${name}: backend and full-stack developer in Dhaka`],
      ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', title],
      ['name', 'twitter:description', summary], ['name', 'twitter:image', `${origin}/images/portfolio-social.png`],
      ['name', 'twitter:image:alt', `${name}: backend and full-stack developer in Dhaka`],
    ];
    const head = `<title>${escape(title)}</title>\n${tags.map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escape(value)}" />`).join('\n')}
    ${missing ? '' : `<link rel="canonical" href="${url}" />\n<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`}`;
    const html = template.replace(/<title>[^<]*<\/title>/, head)
      .replace('<div id="root"></div>', `<div id="root">${renderToString(createElement(App, { path }))}</div>`);
    const output = path === '/' ? 'dist/index.html' : missing ? 'dist/404.html' : `dist${path}index.html`;
    await mkdir(output.slice(0, output.lastIndexOf('/')), { recursive: true });
    await writeFile(output, html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.filter((route) => route.path !== '/404.html').map(({ path }) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  // Optional reading index for tools that support it; not a search ranking signal.
  await writeFile('dist/llms.txt', `# ${name}\n\n> ${role} in Dhaka, Bangladesh. BRAC University Computer Science & Engineering graduate, September 2026. Seeking internships and entry-level engineering roles.\n\n## Profile\n- [Portfolio](${origin}/): Background, skills, research, experience and credentials.\n- [GitHub](${github}): Source repositories.\n- [LinkedIn](${linkedin}): Professional profile.\n\n## Projects\n${projects.map((project) => `- [${project.title}](${origin}/work/${project.id}/): ${project.summary}`).join('\n')}\n\nThe HTML project pages are the primary source for project details. Thumbnails marked as illustrations use sample data. The undergraduate emotional-support chatbot is for non-clinical use.\n`);
  console.log(`Prerendered ${routes.length - 1} indexable pages plus a noindex 404; generated sitemap, robots.txt and optional reading index.`);
} finally {
  await server.close();
}
