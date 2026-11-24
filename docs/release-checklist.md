# Release checklist
- [x] User reported successful Supabase upgrade.sql execution.
- [x] User approved admin appearance.
- [x] Previous CI passed lint, production build, runtime high-severity audit and artifact checks.
- [ ] Latest commit CI.
- [ ] Browser checks at mobile and desktop widths, all themes and languages.
- [ ] Authenticated CMS save, restore, media upload, certificate publish and signed PDF.
- [ ] Anonymous access restrictions and analytics recording.
- [ ] Contact form delivery.
- [ ] Full development dependency audit.
- [ ] Production merge after verification.
Do not treat preview readiness as functional test evidence. Backup JSON restores CMS only, not binary media or certificates.
