---
title: LVE Is Live — a Junk Site That Only Collects Junk 0days
description: Have you lost sleep over findings that look terrifying and are, in practice, completely useless? Today, they finally have a home.
pubDate: 2026-11-28
tags:
  - Cybersecurity
  - LVE
lang: en
---

Have you ever audited a backend XSS that only fires after an administrator logs in?  
Have you ever audited a blind SQL injection that needs admin rights — with a WAF still sitting in front of it?  
Have you ever let an AI scan turn up a pile of findings that look terrifying and are, in practice, completely useless?  
Have you lost sleep because there was nowhere to submit them?  
Plus all the usual Self-XSS, and the rabbit holes that look promising and go nowhere…

Today, it's here. In an age of every flavor of xxx2shell — those writeups that turn some bug into a shell — we need a product that steps a little outside reality.

**LVE is officially live: a junk website that only collects junk 0days.**

## Address

<a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>

## How this started

In the year 2023, a mysterious stranger disclosed to CVE that DVWA's source code contained an SQL injection. Yes — DVWA, the deliberately vulnerable training range that is written to be full of holes. And so CVE-2023-39848 arrived in a blaze of glory, caused a brief stir, and was later rejected. (Let us remember it fondly.)

This sort of thing is not rare:

A scanner lights up a page of “hardcoded secrets,” and you click through to find an example from the official docs. A report reads “arbitrary code execution,” except you already have to be an administrator. A CVE is scored 9.8, and the maintainer writes a long public rebuttal: this is not a vulnerability.

These things look like vulnerabilities. Finding them even feels like a discovery. Submit them, and all you get back is “expected behavior.”

So we built LVE — Lame Vulnerabilities and Exposures, a registry for lame vulns. CVE collects the dangerous ones. LVE collects the dumb ones.

## What it collects

LVE only records public findings that look like a vulnerability but are not actually harmful. Each record has a formal ID (LVE-YYYY-NNNN), the affected product and version, where it lives, a description, and the most important field of all: why it is harmless.

That includes default credentials and documentation samples in open-source frameworks, findings that only “work” after you already are an administrator, and cases that were filed as CVEs and then publicly denied by the vendor or maintainer. Anything that is genuinely dangerous should be reported to the vendor through the proper channels — this is not that place.

## The DS Lameness Score

The higher the CVSS, the more dangerous. The higher the DS, the dumber the finding. We score from 1 to 10 across six metrics: preconditions, actual impact, default exploitability, whether it is public or by design, vendor behavior, and how badly it was over-reported. There are four tiers: Mild, Moderate, Severe, and Absurd. A perfect 10 is a thoroughly lame vulnerability.

## The first batch

The first 37 records all come from real audits of public open-source projects, covering Flask, Django, Rails, Spring Boot, Jenkins, Keycloak, Strapi, Superset, Redis, the official WordPress Docker image, and more. Each one is pinned to a specific commit, with a link that goes straight to the source. We also include classic cases that were filed as CVEs and then publicly denied — among them PostgreSQL (CVE-2019-9193), curl (CVE-2020-19909), and CPython (CVE-2023-36632).

## How to submit

Open a GitHub Issue with the template. The only required fields are the product, the location, what it looks like, why it is harmless, plus a consent checkbox. The six score metrics are optional; the maintainer can fill them in when closing the issue. Once the maintainer closes it, the finding receives an LVE ID and is published, and your GitHub username is added to the hall of fame.

Submit here: <a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">the GitHub Issue template</a>

Source repository: <a href="https://github.com/Gh0xE9/lve_website" target="_blank" rel="noopener noreferrer"><code>github.com/Gh0xE9/lve_website</code></a>

The site has a Chinese and English interface.

## Disclaimer

This site records public information only and does not provide exploit code. LVE is an entertainment project and is not affiliated with CVE, CNVD, or NVD. If a finding is genuinely dangerous, report it to the vendor through the proper channels.

The lame vulns you found finally have a place to go.

Visit: <a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>  
Submit: <a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">the GitHub Issue template</a>
