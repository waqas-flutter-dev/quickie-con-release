# Releases

Drop release binaries here (they'll be served directly by GitHub Pages):

- `quickiecon.apk` — Android
- `quickiecon-setup.exe` — Windows installer
- `quickiecon.dmg` — macOS (later)

## Direct download URLs

Once a file is committed and Pages has deployed, it downloads directly (no GitHub redirect page) at:

```
https://waqas-flutter-dev.github.io/quickie-con-release/releases/<filename>
```

Example: `https://waqas-flutter-dev.github.io/quickie-con-release/releases/quickiecon.apk`

Use these exact URLs as the download links on the website.

**Note:** GitHub Pages has a soft ~100 MB per-file limit and serves the repo over HTTP. Keep individual binaries under that; if a build is larger, use a GitHub Release asset instead.
