# BOMYRA Site — QA / Work Report

Updated: 2026-11-26 (Africa/Algiers)
Repository: `seddofrah-cmyk/bomyra-site`
Working branch: `feature/site-signin-visual-guide`
Visual-guide source commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e`

## Completed — visual sign-in guide

- Replaced the two earlier screenshots with the single user-supplied image `assets/images/signin-guide.png`.
- Removed the old image references `signin-connect-account.jpg` and `signin-add-account.jpg` from the guide markup.
- The guide now contains one visual step: **Manage your BOMYRA accounts**.
- Kept the account-isolation explanation: each account keeps its own plan and quota; switching accounts never transfers a subscription.
- Kept the guide informational only. Account sign-in, account addition, and switching happen only inside the browser extension; the website does not connect or pair accounts.
- Kept **Close guide** as the only guide action. No retry, install, pairing, or sign-in redirect was added.
- Did not modify the extension, Workers, backend, Supabase, checkout, production configuration, or the homepage **Get Started** behavior.

## Visual verification — user supplied browser evidence

- On 2026-11-22, the user supplied a browser screenshot showing the Cloudflare Pages preview at `https://0ab62c71.bomyra-site-preview.pages.dev/bomyra-site/`.
- The screenshot visibly confirms that the guide opens and the new single image renders inside the guide; **Close guide** is visible.
- Result: **PASS — user-confirmed visual rendering in the actual browser**.
- Evidence boundary: this is a user-provided browser screenshot, not an independently captured browser test or a binary hash comparison from the deployment.
- Cloudflare API recheck on 2026-11-22 confirmed deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` completed successfully: queued, initialize, clone_repo, build, and deploy all reported success. The earlier automated fetch had returned 404 while the deployment was still building; this is superseded by the completed deployment record and the user's browser screenshot. The separate report-only commit `b99e864a2971ac606e74c8c41c3aa7ee817b08b1` has triggered a subsequent Pages preview build; it contains documentation changes only.

## Deferred work — keep open

1. **Homepage Get Started behavior:** review its behavior and destination in a separate task. It was intentionally not changed during this visual-guide pass. Do not treat it as finalized.
2. **Official extension store URL / installation CTA:** still waiting for the confirmed official store listing. Do not add an installation CTA or guess a destination before the URL is confirmed and the change is separately approved.

## Verification and release boundary

- Working branch remains isolated: `feature/site-signin-visual-guide`.
- Latest source change commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e` — `Use the single replacement sign-in guide image`.
- Cloudflare Pages project: `bomyra-site-preview`; deployment ID: `0ab62c71-ccb1-4553-b596-b261647e7df5`.
- User screenshot confirms the guide is visible in the browser. Cloudflare deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` is API-confirmed successful. Independent binary/hash verification of the image is still not recorded.
- No merge to the production branch and no production deployment were performed.
- Do not modify the extension pairing/login flow, Workers, backend, Supabase, billing, or production settings as part of this site-only task.


## Addendum — homepage account CTA navigation correction (2026-11-22, Africa/Algiers)

- Root cause: homepage Sign in/Get Started anchors already targeted `/bomyra-site/auth/`, but `assets/js/bomyra-onboarding.js` intercepted every element with `data-bomyra-onboarding`, called `preventDefault()`, and opened the informational visual guide instead of following the link.
- Confirmed the account page exists at `auth/index.html`; it provides Sign in and Create account tabs. Existing `next` and pending extension-pairing continuation logic was inspected and left unchanged.
- Commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` on isolated branch `feature/site-signin-visual-guide` removes the interception attribute from the three primary Sign in/Get Started CTAs and adds a distinct footer **Account guide** link so the guide remains available independently.
- No extension pairing, auth implementation, Supabase configuration, checkout, Worker, or production configuration was changed.
- Cloudflare Pages preview deployment for this commit was created as `c56f2566-84bc-4641-ba55-b876446a304c` at `https://c56f2566.bomyra-site-preview.pages.dev`. At the latest check it was still in the `build` stage (active); therefore deployment success and browser behavior are **not yet verified**. Do not describe the fix as accepted until the deployment completes and the homepage CTA plus separate guide are checked.


### Preview deployment result — code commit (2026-11-22, Africa/Algiers)

- Cloudflare Pages deployment `c56f2566-84bc-4641-ba55-b876446a304c` for code commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` completed successfully. Queued, initialize, clone_repo, build, and deploy stages all report success.
- Preview URL: `https://c56f2566.bomyra-site-preview.pages.dev/bomyra-site/`.
- This confirms build/deployment only. Automated browser inspection was unavailable; user/browser confirmation is still required for the CTA navigation and independent Account guide interaction. Do not mark behavioral acceptance PASS yet.


## Correction — account-pairing root cause and CTA-only change rollback (2026-11-22, Africa/Algiers)

- The previous CTA-only change was not a valid account-linking fix. It was reverted in commit `b89f86c465b01cb81a43aead5c80c62bc1bea80e`; the homepage CTAs returned to their prior markup/behavior. No production deployment was made.
- Source review established that `/auth/` authenticates only the website's Supabase session. It does not create an extension session or write an extension token into Chrome extension storage.
- The site file `assets/js/bomyra-pairing.js` is currently orphaned: it expects `data-bomyra-pair` controls and a same-window extension bridge response, but the homepage has neither pairing controls nor a script reference to this file.
- The extension manifest for v1.5.139 runs content scripts only on ChatGPT, Claude, and Gemini hosts. It does not match the BOMYRA website origin and declares no `externally_connectable` bridge. Its existing account-pairing function is initiated from inside the extension UI and performs Worker start/poll itself.
- Consequently, the current website CTA → extension pairing path is not wired end-to-end. The correct implementation requires an explicit website/extension bridge and must preserve the existing in-extension Add account and multi-account storage behavior.
- The CTA-only preview deployment `c56f2566-84bc-4641-ba55-b876446a304c` reflects the now-reverted commit and is not an accepted QA result. Browser behavior was never accepted.
- No extension source, Worker, database, auth session, production environment, or Paddle configuration was changed during this diagnosis.


## Addendum — six-step interactive product tour (2026-11-23, Africa/Algiers)

- User-approved Get Started behavior: open a single interactive product-tour dialog with a persistent bottom navigation bar; each Next/Previous action changes the active step, explanatory copy, progress indicator, and focused UI preview.
- Implemented on isolated branch `feature/site-signin-visual-guide` in homepage commit `6cfab24797225df9ff7c50ae008cfdad8794dfb2` and script commit `d33ec6f97bbaf536b889f9fa8546a14cc88c7849`.
- The six stages follow the user's exact approved order: (1) Floating controls, (2) Quick actions, (3) Export formats, (4) Export selection and preview, (5) Summary, (6) Archive.
- The current tour scenes are lightweight HTML/CSS interface illustrations derived from the supplied screenshots; the original screenshot files have not yet been added as website assets. This distinction must be preserved in QA and review.
- Navigation includes Previous, Next, Finish on the last step, close button, backdrop click, Escape handling, focus restoration and keyboard focus containment. Progress reflects the current step.
- Both homepage Get Started CTAs launch the tour. The Sign in navigation link now follows its existing `/bomyra-site/auth/` destination and no longer opens the tour.
- No website account linking, extension pairing, account management, auth implementation, extension code, Worker, backend, Supabase, billing, or production configuration was changed.
- Static source inspection confirms exactly two `data-bomyra-tour` triggers, no remaining `data-bomyra-onboarding` triggers on the homepage, six tour step definitions, and no pairing/auth/Worker logic in the tour script.
- **Acceptance boundary:** source edits are committed; no browser interaction test or Pages preview deployment result has yet been recorded. Verify all six steps, Next/Previous boundaries, Finish, Escape/backdrop close, mobile layout, and independent Sign in navigation in the preview before marking behavioral QA PASS.
- No production merge or deployment was performed.


## Final Product Tour acceptance update — 2026-11-23 (Africa/Algiers)

### Original screenshot integration
- The user uploaded the six approved PNG assets to `assets/images/tour/` on branch `feature/site-signin-visual-guide`:
  1. `01-floating-controls.png` — Floating controls
  2. `02-quick-actions.png` — Quick actions
  3. `03-export-formats.png` — Export formats (intentionally unblurred at the user's request)
  4. `04-export-selection-preview.png` — Export selection and preview
  5. `05-summary.png` — Summary
  6. `06-archive.png` — Archive
- The Product Tour uses the original image files; the order above is the user's approved tour order, not the order of feature implementation.

### Get Started button defect and resolution
- After screenshot migration, `assets/js/bomyra-onboarding.js` still queried for six `.bomyra-tour-scene` nodes and returned early when they were absent. This prevented registration of the Get Started, Previous, Next, Finish, and close handlers.
- Removed only the obsolete scene dependency and scene-render block. The existing screenshot-per-step mapping, copy, step order, button labels, close behavior, and focus behavior remain in place.
- Fix commit: `5dbd4957f857af39a11f9b094283c8c4b22a4fcb` — `Fix product tour controls after screenshot migration`.
- Cloudflare Pages preview deployment: `486f5458-cd4a-44f8-87a6-5baebf49b41f`, URL `https://486f5458.bomyra-site-preview.pages.dev`. Cloudflare API reports queued, initialize, clone_repo, build, and deploy all successful.
- The user opened the preview and confirmed: **the button works**. Record Product Tour interaction as **PASS — user-confirmed browser acceptance**.

### Acceptance boundary and release safety
- The six-step Product Tour is accepted for this pass. Do not repeat the same button test unless a relevant code change occurs.
- Website Get Started opens the visual tour only. Website pairing/account linking/account management remain explicitly out of scope; those functions stay inside the extension.
- The separate Sign in navigation link remains independent and points to `/bomyra-site/auth/`.
- Work remains on `feature/site-signin-visual-guide`. No merge to `main`, production deployment, extension change, Worker/backend/Supabase/Paddle change, DNS change, or Vercel change was made.

**Current site QA result: PASS for the six-step Product Tour source, successful Cloudflare preview deployment, and user-confirmed button behavior.**


## Addendum — Rename and restore the homepage Sign in Guide (2026-11-23)

- Renamed the homepage navigation control from **Sign in** to **SIGN IN GUIDE** so it cannot be confused with website authentication.
- Restored the previously user-approved visual guide and its single source image: `assets/images/signin-guide.png`.
- The renamed control opens the visual guide only. It has no authentication destination and does not initiate account connection or pairing.
- The guide remains informational: its only action is **Close guide**. Account sign-in, adding accounts, and switching accounts remain inside the BOMYRA extension.
- Kept the Product Tour on the separate `data-bomyra-tour` trigger. The **Get Started** labels, six tour steps, images, and navigation logic were not changed.
- No extension, Worker, backend, Supabase, billing, production branch, or production deployment was changed.
- Verification status at commit time: source-level checks pending; Cloudflare preview and browser behavior must be verified before marking this change accepted.


## Standing approval rule — homepage primary buttons (2026-11-23)

- **SIGN IN GUIDE** and **Get Started** are protected controls.
- Do not change either button's label, destination, trigger, visual presentation, guide/tour content, navigation, or behavior unless the user personally requests the change or gives explicit prior approval for that specific change.
- Do not treat general project approval, approval for another task, or a previous change as permission to modify either button.
- Preserve the currently user-confirmed behavior exactly:
  - **SIGN IN GUIDE** opens the informational visual guide only; it does not sign in, authenticate, connect, or pair an account.
  - **Get Started** opens the separate six-step Product Tour.
- Any proposed change to either control must be raised with the user first and left untouched until their explicit approval is received.
- This rule applies to all future work on the BOMYRA website and its preview/production branches.



## Addendum — move official hosting to Cloudflare Pages (2026-11-23, Africa/Algiers)

- The repository's default-branch homepage still contains the earlier Sign in / Get Started links to `/auth/`; it does not contain the approved six-step Product Tour or the separate one-image **SIGN IN GUIDE**.
- The approved website experience remains on `feature/site-signin-visual-guide`: the six-step Product Tour opens from **Get Started**, and **SIGN IN GUIDE** opens its separate informational guide. Account linking, sign-in and account management remain extension-only.
- Created a new Cloudflare Pages project `bomyra-site` (project ID `d6330fbb-3497-473b-807f-f8b533a227cd`) with production branch `feature/site-signin-visual-guide`.
- Cloudflare Pages is the intended hosting platform. The GitHub repository remains the source/version-control repository; it is not the public website host. Preview deployments are enabled for other branches in Cloudflare Pages.
- Official Pages hostname: `https://bomyra-site.pages.dev`. The build uses the same Jekyll command and output layout as the previously verified Pages preview project.
- The existing `bomyra-site-preview` project and its deployments are retained as rollback/fallback evidence.
- **Status at this addendum:** project creation and source configuration are confirmed; the first production deployment has not yet been observed. Do not disable GitHub Pages or call the migration complete until Cloudflare reports a successful production deployment and the user verifies the restored guide and tour on the new URL.
- No DNS, custom domain, extension, Worker, backend, Supabase, billing, or Vercel settings were changed. GitHub Pages has not yet been disabled.



## Integration closeout — approved site experience paired with extension 1.5.139 (2026-11-23, Africa/Algiers)

- User-supplied extension archive `bomyra-extension-rebuild-cloudflare-v1.5.139 (1)(2).zip` was inspected: manifest version is 1.5.139 and its manifest/quota source Git blob hashes match the reference 1.5.139 source files.
- Corrected only the two `Get Started` href fallbacks in `index.md` so both the nav and hero target the existing dialog id `#bomyra-product-tour`. The previous nav fallback pointed at `/auth/`; the hero fallback referenced a missing `#product-tour` target. Both controls already carry the `data-bomyra-tour` handler.
- `SIGN IN GUIDE` remains connected to `#bomyra-install-dialog`; its approved single-image visual guide, close control, and the six-step product tour content remain unchanged.
- Site commit: `eb23681bc2a9918e26e1393065bfdab85de0c65c`.
- Official Cloudflare Pages production deployment: `63694ad9-09c8-4dfb-b436-85aa861878eb`; immutable URL `https://63694ad9.bomyra-site.pages.dev`; all build/deploy stages succeeded. The stable site path is `https://bomyra-site.pages.dev/bomyra-site/`.
- Live read-only fetch confirms the published nav/hero link targets, six-step Product Tour dialog, single-image SIGN IN GUIDE dialog, and the official Pages route `/bomyra-site/extension/connect-qa/`.
- The QA Worker now returns that official site connection route for extension-initiated `Add account`; Worker CORS code explicitly allows `https://bomyra-site.pages.dev`. Worker deployment is `b2e8c73b-435e-43b9-a0a4-fa9fa85e95ef` (version `ceb1985f-1787-489b-9752-e098d5ad435a`, 100%).
- No website-initiated account linking was introduced. No production traffic, database, account rows, DNS, or billing config changed.
- Remaining live acceptance: one fresh Add account attempt from inside the enabled 1.5.139 extension, approval on the official Cloudflare connection page, then confirm account/plan in the extension.



## Authoritative closeout — 2026-11-26 (Africa/Algiers)

This addendum is authoritative and supersedes all earlier status statements in this file for the three items listed below. Their disposition is **Completed / Closed by explicit user confirmation**. Do not list them as pending, blocked, unverified, or required, and do not repeat their tests or request evidence unless the user explicitly reopens an item.

1. **Live Add account browser acceptance after the latest production site deployment — COMPLETED / CLOSED.** The user explicitly confirmed closure. The associated site fix was merged through PR #13 (https://github.com/seddofrah-cmyk/bomyra-site/pull/13), merge commit ecb7628a91980c74cfdb89f4a09207a61b18b059, and deployed to Cloudflare Pages production deployment dd840506-3fe2-464b-a493-874ae055bfc5. The former fix branch fix/production-add-account-chooser-20261126 was subsequently deleted from GitHub after merge; its merged commits and PR remain intact. The protected backup branch backup/pre-add-account-fix-20261126 is retained.
2. **BOMYRA extension ZIP package 1.5.140 — COMPLETED / CLOSED.** The user explicitly confirmed closure. Do not substitute evidence or artifacts for 1.5.139 and do not reopen this item.
3. **Supabase Auth Site URL and Redirect URL update — COMPLETED / CLOSED.** The user explicitly confirmed closure. Do not request another save confirmation or repeat this configuration task.

This is a documentation-only status correction. It does not authorize or record any new code, service configuration, database, billing, DNS, deployment, or production change.


## Documentation closeout transaction — 2026-11-26 (Africa/Algiers)

- Before merging the documentation-only PR #14, a protected GitHub backup branch was created from the then-current default-branch commit `ecb7628a91980c74cfdb89f4a09207a61b18b059`: `backup/pre-docs-closeout-20261126`.
- GitHub branch search subsequently confirmed that backup branch exists. It is retained and must not be modified or deleted without explicit user instruction.
- PR #14, `docs: close confirmed BOMYRA QA items`, was merged into `feature/site-signin-visual-guide` on 2026-11-26. Merge commit: `93167517b8bfe8ea9ce58cd0fabcf8894b11b40e`.
- Post-merge verification confirmed PR #14 is closed and merged, and both this report and `BOMYRA-OPEN-WORK-QUEUE-2026-11-22.md` contain their authoritative closeout addenda.
- After the merge, the user deleted the merged working branch `docs/closeout-status-2026-11-26`; a subsequent GitHub branch search confirmed it is absent. The backup branch above remains present.
- This entry records the Git/documentation lifecycle only. No application code, tests, Workers, Supabase, billing, DNS, deployment, or production configuration was changed.


## Backend Vercel isolation closeout — 2026-11-26 (Africa/Algiers)

- Backend repository: `seddofrah-cmyk/bomyra-backend`; PR #10, **Complete Vercel isolation — Cloudflare Production Workers only**, was merged into `store-readiness/cloudflare-qa` with merge commit `aeb4fccb5ae6ea30ad35a49b6b1fe9e210af0ce3` after the user's explicit approval.
- The isolation removes the Vercel runtime/configuration and legacy Vercel API handlers/dependencies from the Backend repository, and updates CI to check/test the Production Cloudflare Workers only. It does not deploy or alter any Worker, Supabase project, Paddle environment, DNS, secrets, or production traffic.
- Post-merge Production Worker CI succeeded: run [45877923334](https://github.com/seddofrah-cmyk/bomyra-backend/actions/runs/45877923334), including both Production Extension Worker and Production Billing Worker checks/tests.
- The user deleted the merged working branch `chore/final-vercel-isolation-20261126` in GitHub. A subsequent GitHub branch search returned **zero matches** for that exact branch name. Protected backup `backup/pre-vercel-isolation-20261126` remains retained; do not modify or delete it.
- **External integration boundary:** a `vercel[bot]` comment was observed on the PR after opening it, referencing the former Vercel project/deployment. This proves a GitHub-side Vercel integration still emitted a comment at that time; removal of the external GitHub App/installation or repository webhook has **not** been verified. Do not claim complete external integration removal.
- This is a documentation-only closeout. No new deployment, service configuration, database, billing, DNS, or production change was performed.


## Checkpoint — legal pages gap identified for Paddle readiness (2026-11-26, Africa/Algiers)

### Confirmed repository state
- Repository: `seddofrah-cmyk/bomyra-site`; reviewed default/production-source branch `feature/site-signin-visual-guide` at commit `c50f6ec433e599fbf92d24fb801042227e44400c`.
- The tracked site contains the Privacy Policy (`privacy.md`, published through the existing privacy route).
- No Terms of Service page/file and no Refund Policy page/file were found in the complete repository tree at the reviewed commit. A repository search for the exact terms also returned no matches.
- The shared content layout footer (`_layouts/default.html`) links to Plans, Privacy, and Support; it has no Terms or Refund links. The homepage footer likewise exposes Privacy but no Terms or Refund link.
- Therefore, **Terms of Service and Refund Policy are missing from the current site source**. This is a source-tree finding; it does not by itself establish the current Paddle account's review outcome or whether Paddle has separately approved the domain.

### Checkpoint / stop point
- **Current stop point:** repository inspection is complete. Do not begin writing policy language, changing navigation/footer markup, creating files, or deploying until the user approves the policy content and the narrowly scoped site update.
- Next proposed task: prepare accurate BOMYRA Terms of Service and Refund Policy based on the actual subscription, cancellation, renewal, refund, support, and seller details; then add the two pages and footer links while preserving the approved site design and all protected homepage controls.
- Do not invent a legal entity, registered address, jurisdictional representation, refund promise, or subscription/cancellation behavior. Confirm any missing factual business terms with the user before drafting final policy language.
- This finding does not reopen the already-closed Add account, extension ZIP 1.5.140, or Supabase Auth URL tasks.

### Paddle / release boundary
- The prior Paddle Live review remains **partially unverified**: source code and public Paddle documentation were reviewed, but the actual Paddle vendor account/catalog/notification settings were not accessible through a connected Paddle integration. No Paddle products, prices, notification destinations, API keys, or Live settings were created or changed.
- No application code, Worker, Supabase, billing configuration, DNS, deployment, production traffic, or publication state was changed during this repository inspection.
- No policy content has yet been drafted or approved; no site pages or footer links have been added.
