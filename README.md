# LYDIAN REKORDS — Static Website

## Pages
- `/` — homepage
- `/music-production/` (page file: `music-production/index.html`)
- `/videographics/` (page file: `videographics/index.html`)
- `/graphic-design/` (page file: `graphic-design/index.html`)
- `/contact/` (page file: `contact/index.html`)

## Local-first assets
The site's layout, colors, responsive behavior, menu, animations and interactions are implemented in local files under `assets/`. No Bootstrap, Tailwind, or Google Fonts CDN is required for the core site to display. The CSS includes local utility classes used by the contact form.

## Contact form
The form prepares a WhatsApp message to `+233 55 641 275` (displayed as `055 641 1275`). It does not store submissions.

## Hosting and clean URLs
Upload all files and folders to the website root. The included `.htaccess` supports clean URLs on Apache hosting. On Nginx or hosts without `.htaccess`, add equivalent rewrites to serve each folder's `index.html`.

## Domain and sitemap
The sitemap uses relative paths to avoid a placeholder domain. For Google Search Console, use your real website domain in an absolute sitemap URL and make sure the sitemap URLs are absolute with that same domain before submitting it. `robots.txt` is intentionally domain-neutral.


## Previewing locally
Open the root `index.html` file after extracting the ZIP. Asset and page links use relative paths so the styles, images, and scripts can load in a local file preview as well as when uploaded to a website folder. For live hosting, upload the contents of this folder together, keeping the `assets` and page folders in place.


## Local preview note
All navigation links point directly to each page’s `index.html` file. This avoids directory listings in local previews that do not automatically load folder index files.
