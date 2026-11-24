# Temporary raise of the API rate limit
Lets a user or an API client make more API requests per minute until a time. Use it for an import, or a move from another system, without any work on the server. After that time the usual limit applies again.

Open it from "Settings: API setting" with the button "API rate limit raises" above the list (URL `/api_rate_raises`).

* This feature is available in Exment v7.2.6 or later.  
* Only system administrators can use this page.

## Turn it on
On [Feature management](/feature), set "Temporary raise of the API rate limit" to "Use". It is off at first. While it is off, the page cannot be opened (404) and the raises are not used.

## The usual limit
The API allows 60 requests per minute (per user; with an API key, per key and per IP address). Over it, the API answers `429 Too Many Requests`. Change it with `EXMENT_API_MAX_RATE_LIMIT` in `.env`.

## Add a raise
| Item | What to enter |
|---|---|
| For | A user, or an API client (made on [API setting](/api.md)) |
| Requests per minute | More than the usual limit (e.g. 600) |
| For how long (hours) | Hours from now, at most 24 |
| Reason | Why (e.g. import from Backlog) |

- A raise for a user applies to all the user's requests: signed in, with an OAuth token, or with an [API key](/api_key).
- A raise for an API client applies to the tokens taken with that client.
- When both the user and the client have a raise, the higher one is used.

## The list
A raise past its time is shown "Expired" and is not used; it stays in the list. To stop one before its time, press "Delete": the usual limit applies again at once.

Adding and deleting are written to the Exment log (`storage/logs`): who, when, for whom, how many, until when, and the reason.

## Settings in .env
| Setting | Meaning |
|---|---|
| `EXMENT_API_MAX_RATE_LIMIT_CEILING` | The most requests per minute a raise may give, set by the SaaS operator. Empty (on premises): no ceiling. When it is lowered later, raises made before give no more than it |
| `EXMENT_API_RATE_RAISE_MAX_HOURS` | The longest a raise may last, in hours (default 24) |
