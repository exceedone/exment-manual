# When a firewall or a proxy stops a save

When a firewall (AWS WAF, Cloudflare, a proxy of the company...) stands in front of the Exment server, some saves can be stopped there, before they reach Exment.
This page tells how to recognize it, and gives examples of how to fix it.

> The notice and the item of the security check come with v7.3.x.

## When it happens

A firewall looks for words used in attacks in the body of what is sent. Words like these can stop an ordinary save:

- addresses of the server itself or of the internal network, such as `http://localhost/`, `http://127.0.0.1/`, `http://10.0.0.1/`
- `169.254.169.254` (the metadata address of a cloud)
- paths such as `../`, `../../etc/passwd`, `C:\Windows\`
- tags such as `<script>`, or a very long body

For example, when a security report or the steps on a server are written in an issue or a comment.

## How to recognize it

### The notice on the screen

Every answer of Exment carries the header `X-Exment`. When a save gets a 403, 406, 413... without it, the screen shows:

> The save was refused on its way (a firewall or similar)

It does not say "no permission". What was written stays in the form.
"Details" shows the status, where it was sent, the names of the headers of the answer and its first lines. Copy them when you tell your administrator.

When an ordinary form save (one that changes the page) is stopped, the firewall's page appears. Going back to the form with the browser's back button shows "The last save may not have reached Exment".

### The browser log

With the browser log on, the row of that request says "not answered by Exment (a firewall or a proxy in front?)" with the names of the headers of the answer. Nothing of the body is kept.

### The security check

An administrator opens "Settings: System" → "Security check" and presses "Try" on "A firewall in front of the site". This browser sends a small body with the words above to the site and sees whether it is stopped.

- "OK": nothing in front stops it.
- "Fix it": it was stopped in front. Review the firewall as below.

### The firewall's records

Which rule stopped it is in the records of the firewall.

- AWS WAF: "Sampled requests" of the Web ACL, or `aws wafv2 get-sampled-requests`; or its logs (CloudWatch Logs...)
- Cloudflare: "Security" → "Events"

## How to fix it

**Do not turn a whole rule set off.** Exclude the rule only for the path that was stopped; keep the other paths (login, API...) protected as they are.

### AWS WAF (managed rules)

In the managed rule group `AWSManagedRulesCommonRuleSet`, `EC2MetaDataSSRF_BODY`, `GenericRFI_BODY`, `GenericLFI_BODY`, `CrossSiteScripting_BODY`, `SizeRestrictions_BODY` and others stop on words of the body.

1. Set only the rules that stop it to "Count" in the managed rule group (rule action override).
2. Add a rule of your own after the managed group that blocks the requests carrying the label of that rule (e.g. `awswaf:managed:aws:core-rule-set:GenericLFI_Body`).
3. In that rule, do not block when the URI path is a path of saving (e.g. starting with `/admin/data/`, `/admin/files`, or ending with `/fileupload`).

Saves are then not stopped for the words of their body, and the other paths are stopped as before. Keep the Web ACL before the change (`aws wafv2 get-web-acl`).

### Cloudflare

In "Security" → "WAF", add an exception (skip) for the managed rule that stops it:

- When: the URI path starts with a path of saving (e.g. `/admin/data/`)
- Skip: only the rules that stopped it (their IDs in the events)

### A proxy of the company

Tell the administrator of the proxy the time, the path and the status (what "Details" shows), and ask to exclude that path only.

## When the body is too large (413)

Besides a firewall, the web server has limits of its own:

- nginx: `client_max_body_size` (1 MB by default)
- PHP: `post_max_size`, `upload_max_filesize` ([php.ini](/additional_php_ini))
- Exment's length of a text: `EXMENT_CHAR_LENGTH_LIMIT_COUNT` in `.env` (63,999 characters by default)

## See also

- [Behind a reverse proxy](/additional_reverse_proxy)
- [Troubleshooting](/troubleshooting)
