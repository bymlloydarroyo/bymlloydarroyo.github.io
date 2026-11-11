# Mark Lloyd Arroyo – Portfolio

A fast, modern, image-first portfolio. Plain HTML, CSS and JavaScript, with no build step and no dependencies.

**Features:** dark/light theme, glass header, filter chips (All / Posters / Logos), uniform 4:5 tiles, lazy-loaded images with shimmer placeholders, scroll-reveal animation, and a full-resolution lightbox with zoom (wheel, buttons, double-click/double-tap), drag-to-pan, arrow-key and swipe navigation, and an "Open original" link. Respects reduced-motion settings.

## Deploy on GitHub Pages
1. Create a new repository, e.g. `portfolio` (or `<username>.github.io` for a root URL).
2. Upload `index.html`, `styles.css`, `script.js` and `README.md`.
3. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. Your site goes live at `https://<username>.github.io/portfolio/` in about a minute.

## Images
Images load from your existing WordPress.com media library (`BASE` in `script.js`). If you ever delete that site, download the images into an `images/` folder, then change `BASE` to `"images/"` and the paths in `POSTERS` and `LOGOS` to the bare file names.

## Add or remove works
Edit the `POSTERS` and `LOGOS` lists at the top of `script.js`.
