# Auth email templates

Supabase sends these. They are not deployed from this repo; paste them in by hand.

1. Supabase Dashboard → Authentication → Emails → Templates.
2. **Confirm signup**: subject `Confirm your uSync email`, body = `confirm-signup.html`.
3. **Reset password**: subject `Reset your uSync password`, body = `reset-password.html`.
4. Save, then test with a spare address (sign up, and "Forgot password").

Keep `{{ .ConfirmationURL }}` intact; it is the link.

## Sender avatar (BIMI)

`bimi-logo.svg` is SVG Tiny PS. Host it at `https://usync.gg/bimi-logo.svg` (copy to `public/`),
set DMARC to `p=quarantine` or `p=reject`, then add DNS:
`default._bimi.usync.gg TXT "v=BIMI1; l=https://usync.gg/bimi-logo.svg;"`.
Gmail also needs a VMC/CMC certificate (`a=` tag).
