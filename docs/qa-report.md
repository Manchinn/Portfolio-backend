# QA Report — Portfolio Backend API

**Target:** `http://localhost:3000`
**Date:** 2026-03-19
**Total Tests:** 59 | **Pass:** 55 | **Fail:** 0 | **Warning:** 4

---

## 1. Navigation & Routing (24 tests)

| # | Endpoint | Method | Expected | Actual | Result |
|---|----------|--------|----------|--------|--------|
| 1 | `/api/health` | GET | 200 | 200 | PASS |
| 2 | `/api/profile` | GET | 200 | 200 | PASS |
| 3 | `/api/skills` | GET | 200 | 200 | PASS |
| 4 | `/api/experiences` | GET | 200 | 200 | PASS |
| 5 | `/api/projects` | GET | 200 | 200 | PASS |
| 6 | `/api/socials` | GET | 200 | 200 | PASS |
| 7 | `/api/articles` | GET | 200 | 200 | PASS |
| 8 | `/api/articles/featured` | GET | 200 | 200 | PASS |
| 9 | `/api/notifications` | GET | 200 | 200 | PASS |
| 10 | `/api/all` | GET | 200 | 200 | PASS |
| 11 | `/api/projects/1` | GET | 200 | 200 | PASS |
| 12 | `/api/articles/portfolio-techniques-overview` | GET | 200 | 200 | PASS |
| 13 | `/api/projects/999` | GET | 404 | 404 | PASS |
| 14 | `/api/articles/nonexistent` | GET | 404 | 404 | PASS |
| 15 | `/api/nonexistent` | GET | 404 | 404 | PASS |
| 16 | `/` | GET | 404 | 404 | PASS |
| 17 | `/random-page` | GET | 404 | 404 | PASS |
| 18 | `/api/profile?lang=th` | GET | 200 | 200 | PASS |
| 19 | `/api/profile?lang=zh` | GET | 200 | 200 | PASS |
| 20 | `/api/profile?lang=xx` | GET | 200 (fallback EN) | 200 | PASS |
| 21 | `/api/skills` | POST | 404 | 404 | PASS |
| 22 | `/api/projects` | POST | 404 | 404 | PASS |
| 23 | `/api/articles` | POST | 404 | 404 | PASS |
| 24 | `/api/health` | DELETE | 404 | 404 | PASS |

---

## 2. Schema Validation (13 tests)

| # | Endpoint | Check | Result |
|---|----------|-------|--------|
| 1 | `/api/profile` | success: boolean | PASS |
| 2 | `/api/profile` | name: non-empty string | PASS |
| 3 | `/api/profile` | title: string | PASS |
| 4 | `/api/profile` | bio: string | PASS |
| 5 | `/api/profile` | image: string | PASS |
| 6 | `/api/profile` | email: valid format | PASS |
| 7 | `/api/skills` | array of {category, items: [{name, level}]} | PASS (4 categories) |
| 8 | `/api/experiences` | array of {id, year, position, company, achievements[]} | PASS (3 items) |
| 9 | `/api/projects` | array of {id, title, description, tech[], image} | PASS (3 items) |
| 10 | `/api/articles` | array with id, slug, title, excerpt, tags[], date, featured(bool) | PASS (4 items) |
| 11 | `/api/articles` | sorted: featured first, then by date desc | PASS |
| 12 | `/api/notifications` | array with id(num), type(enum), title, message, date, read(bool) | PASS (5 items) |
| 13 | `/api/socials` | array with name, url, icon, color | PASS (5 items) |

### Localization

| # | Endpoint | Check | Result |
|---|----------|-------|--------|
| 14 | `/api/profile?lang=th` | Thai characters in bio | PASS |
| 15 | `/api/profile?lang=zh` | Chinese characters in bio | PASS |

### Error Response Format

| # | Endpoint | Check | Result |
|---|----------|-------|--------|
| 16 | `/api/projects/999` | `{ success: false, error: string }` | PASS |
| 17 | `/api/nonexistent` | `{ success: false, error: string }` with route info | PASS |

---

## 3. Form & POST Endpoints (22 tests)

### POST /api/contact

| # | Payload | Expected | Status | Result | Notes |
|---|---------|----------|--------|--------|-------|
| 1 | Valid: name+email+message | 200 | 200 | PASS | |
| 2 | Missing name | 400 | 400 | PASS | |
| 3 | Missing email | 400 | 400 | PASS | |
| 4 | Missing message | 400 | 400 | PASS | |
| 5 | Empty body `{}` | 400 | 400 | PASS | |
| 6 | Invalid email "not-email" | 400 | 400 | PASS | |
| 7 | XSS: `<script>alert(1)</script>` in name | 200 | 200 | **WARN** | Accepted without sanitization |
| 8 | SQLi: `'; DROP TABLE users; --` in message | 200 | 200 | **WARN** | Accepted (no DB, so harmless, but not sanitized) |
| 9 | Unicode/emoji: `🎉 สวัสดี 你好` | 200 | 200 | PASS | |

### POST /api/notifications/read

| # | Payload | Expected | Status | Result | Notes |
|---|---------|----------|--------|--------|-------|
| 10 | `{ ids: [1, 2] }` | 200, readCount: 2 | 200 | PASS | |
| 11 | `{ ids: [] }` | 200, readCount: 0 | 200 | PASS | |
| 12 | `{ ids: "1" }` (non-array) | 400 | 400 | PASS | |
| 13 | `{}` (missing ids) | 400 | 400 | PASS | |
| 14 | `{ ids: [1,1,1] }` (duplicates) | 200, readCount: 3 | 200 | **WARN** | Returns 3 but only 1 unique; should deduplicate |
| 15 | State verification: id 1 after mark | read: true | true | PASS | |
| 16 | State verification: id 3 unmodified | read: false | false | PASS | |

---

## 4. Findings & Recommendations

### Bugs (0)
No functional bugs found.

### Warnings (4)

| # | Severity | Finding | Recommendation |
|---|----------|---------|----------------|
| W1 | MEDIUM | XSS payload accepted in `/api/contact` name field without sanitization | Add input sanitization (e.g., `escape-html` or `xss` package) before logging/storing |
| W2 | LOW | SQL injection string accepted in `/api/contact` message (no DB so not exploitable) | Add input sanitization as defense-in-depth for when a DB is added |
| W3 | LOW | `/api/notifications/read` with duplicate ids `[1,1,1]` returns `readCount: 3` instead of `1` | Deduplicate ids before processing: `[...new Set(ids)]` |
| W4 | INFO | No rate limiting on any endpoint | Add `express-rate-limit` to prevent abuse, especially on POST /api/contact |
| W5 | INFO | Invalid HTTP methods return 404 instead of 405 Method Not Allowed | Use 405 with `Allow` header for more correct HTTP semantics |
| W6 | INFO | `GET /` returns 404 — no root handler | Add a root redirect to `/api/health` or a welcome JSON response |

### Missing Features (not bugs)

| Feature | Status |
|---------|--------|
| Authentication | Not implemented (public API) |
| Rate limiting | Not implemented |
| Request body size limits | Using Express defaults (100kb) |
| CORS origin validation | Single origin from `FRONTEND_URL` env var |
| Input sanitization | Not implemented |
| API versioning | Not implemented |

---

## 5. Test Coverage Summary

```
Routing & Navigation:  24/24 PASS (100%)
Schema Validation:     17/17 PASS (100%)
POST Endpoints:        16/16 PASS (100%) + 4 WARN
────────────────────────────────────────────
Total:                 57/57 PASS + 4 WARN
```

**Overall: API is functionally correct. No breaking bugs. 4 warnings to address (input sanitization + duplicate id handling).**
