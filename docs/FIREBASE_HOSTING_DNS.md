# DNS Partner Hub — Firebase Hosting release

Target Google Cloud/Firebase project: `dns-core` only.
Hosting target: `partner-hub`, mapped to dedicated Firebase Hosting site ID `dns-partner-hub`.
The site ID is **proposed and has not been verified as existing**.
No deploy of Firebase Functions, Firestore rules, Auth or any other sites.

## DNS administrator prerequisites
1. Verify the DNS-owned Firebase project `dns-core`, and create or confirm a distinct Firebase Hosting site with ID `dns-partner-hub`. If unavailable, update only the hosting site ID in `.firebaserc`. Preserve existing sites.
2. Configure Google Cloud Workload Identity Federation for GitHub repo `dolomitinordicski/dns-partner-hub`, restricted to approved branch/environment. Create a limited deployment service account authorized for Firebase Hosting. Do not use personal accounts or long-lived JSON keys.
3. In GitHub repo Settings → Environments, create `dns-partner-hub-production` with required reviewers. Configure secrets `DNS_GCP_WORKLOAD_IDENTITY_PROVIDER` and `DNS_GCP_DEPLOY_SERVICE_ACCOUNT`.
4. The existing frontend Firebase app config references a **different legacy project**. Before public deploy, replace that client config with the DNS-owned Firebase web app configuration, and audit all legacy calls. Hosting config alone does not change runtime Firebase project.
5. Verify that the legacy voucher/region UI is isolated (PR #4) and DNS permission rules are safe. Do not activate protected capabilities or certified widget server privileges until audited.
6. Run GitHub Actions workflow `DNS Partner Hub — Firebase Hosting` manually after merge; it performs typecheck, build and deploys **only** `hosting:partner-hub`. Inspect its job log and published URL before announcing the site.

## Rollback
Use the Firebase Hosting release history of this dedicated site to roll back. Do not delete or overwrite the old legacy app, DNS Core data or unrelated hosting targets.

## Limitations
Static Vite build under `dist/` is hosted. Express server routes (including `/api/notify-voucher`) are **not deployed** by this workflow. Any backend endpoints must be separately implemented and authenticated under DNS Core. No user emails, OTPs, questionnaires or guest records are transferred by this workflow.
