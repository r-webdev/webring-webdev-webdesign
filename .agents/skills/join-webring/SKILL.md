---
name: join-webring
description: Helps a user join the Web Dev & Design Webring by adding webring navigation to their site and submitting their entry to src/data/sites.json via a pull request. Use when the user wants to add their site or portfolio to the webring, asks how to join, or wants an entry in sites.json reviewed.
---

# Join the Web Dev & Design Webring

Guide the user through joining the webring. The canonical human-readable guide is [JOINING.md](../../../JOINING.md); keep this skill consistent with it.

## Prerequisites

- The user needs a free GitHub account to open a pull request.
- Collect the site details. **Never assume, invent, or infer values** (e.g. don't derive a name from the domain or rewrite the description into a name). For each missing value, ask for it specifically:
  - `name` (required): the site or portfolio name.
  - `url` (required): the full site URL, including `https://`.
  - `description` (required): 1-2 sentences about the site.
  - `badge` (optional): a link (URL) to their 88×31 px badge image. Ask whether they have one; if they don't, omit the key.
- Do not proceed to Step 1 or edit `sites.json` until `name`, `url` and `description` are all provided by the user.

## Step 1: Webring navigation on the user's site

The site must link to:

- the **previous** site in the webring
- the **next** site in the webring
- the **main webring page**: `https://webring.webdev-webdesign.com`

**Do not just point the user at the generator. Output the ready-to-paste HTML snippet directly**, in a fenced `html` code block, with the user's site URL already filled in. This is the same output as the generator at `https://webring.webdev-webdesign.com/#embed-heading` (source: `src/components/EmbedGenerator.astro`). If the user's URL isn't known yet, ask for it first.

Build the snippet like this, where `FROM` is the user's site URL **percent-encoded** (as `encodeURIComponent` does):

```html
<!-- Web dev & web design webring -->
<nav class="wd-web-webring" aria-label="Web dev and web design webring">
  <a href="https://webring.webdev-webdesign.com/prev/?from=FROM">&larr; Prev</a>
  <a href="https://webring.webdev-webdesign.com/">Web dev &amp; design webring</a>
  <a href="https://webring.webdev-webdesign.com/random/?from=FROM">Random</a>
  <a href="https://webring.webdev-webdesign.com/next/?from=FROM">Next &rarr;</a>
</nav>
```

URL rules:

- Normalize the site URL first: must be `http(s)`, drop any `#fragment`, and drop a trailing `/` unless the path is just `/` (so `https://example.com/blog/` becomes `https://example.com/blog`, while `https://example.com` becomes `https://example.com/`).
- The URL in the snippet must be **exactly the same** as the `url` in the `sites.json` entry, or prev/next won't recognise the site and visitors get sent back to the hub. Use the same normalized URL in both.
- Example: for `https://example.com/` the prev link is `https://webring.webdev-webdesign.com/prev/?from=https%3A%2F%2Fexample.com%2F`.

After the snippet, add one short line: paste it into the header, footer or sidebar of every page, and style the `nav.wd-web-webring` element to match the site. Designing their own 88×31 badge is encouraged. The snippet is deliberately unstyled. Do not lecture about what maintainers check or speculate about whether the site is real.

## Step 2: Fork the repository

Fork `https://github.com/r-webdev/webring-webdev-webdesign` to the user's GitHub account. (If working locally with the `gh` CLI, `gh repo fork --clone` does this.)

## Step 3: Add the entry to `src/data/sites.json`

`sites.json` is a JSON array. Append a new object at the end of the array, making sure the previous last entry is followed by a comma:

```json
{
  "name": "<your site name>",
  "url": "https://your-website-url.com",
  "description": "Brief description of your site or portfolio",
  "badge": "https://your-site.com/path-to-badge-88x31.png"
}
```

Field rules:

- `name`: site or portfolio name
- `url`: full URL including `https://`
- `description`: 1-2 sentences about the work or focus of the site
- `badge`: optional URL to an 88×31 px image. Omit the key entirely if there is no badge. **Do not include comments in the JSON**, which the example in JOINING.md shows only for illustration.

After editing, validate that the file still parses, e.g. `node -e "JSON.parse(require('fs').readFileSync('src/data/sites.json','utf8'))"`.

## Step 4: Open a pull request

- Title format: `feat: add site: <your site name>`
- Target the `main` branch of `r-webdev/webring-webdev-webdesign`.

Only create commits, push, or open the PR after the user confirms; these are outward-facing actions.

## Step 5: Review

Maintainers will verify the navigation is implemented on the site, check the entry for completeness, and merge. Once merged the site appears in the rotation automatically.

## Checklist

- [ ] Webring navigation with prev/next/main links is live on the user's site
- [ ] Entry added to `src/data/sites.json` with valid JSON
- [ ] Pull request opened with the correct title
