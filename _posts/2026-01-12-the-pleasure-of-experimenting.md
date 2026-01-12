---
title: The pleasure of experimenting
date: "2026-01-12"
status: publish

author: Bhagyesh Pathak
excerpt: ""
type: post
id:
category:
  - Uncategorized
tag: []
layout: post
---

I looove experiments. My childhood was full of hardware experiments and then I switched to software.

For FEEDHAMMER--the product I'm going to release for [Sisyphus Consulting Pvt. Ltd.](https://sisyphusconsulting.org), one of the key questions was this:

> What is Google Calendar's frequency of checking for new changes?

Now, as usual, I "researched" on the internet but there was no authoritative answer to this. And that makes sense because there are some obvious technical reasons.

So, what should I do?

Work on the product accepting the ballpark answers?
I would have but I like setting up experiments.

So, the solution was simple:
Write some code and record how often Google Calendar pings Feedhammer.

The dashboard you see in the screenshot is a quick-build for internal testing. I can't describe how helpful agentic coding becomes in such a scenario. But that's not what this post is about.

![Google Calendar Ping Dashboard]({{ '/assets/images/uploads/feedhammer_gc_monitoring_dashboard.png' | relative_url }}){: width="600px" }

The pleasure of interacting with the real world, setting up experiments, learning from them...that's beyond words.

---

For curious souls:
What's going on in the dashboard:

Google Calendar is checking 3 test feeds I have created on Feedhammer. And we can see that after the first check, GC has checked again roughly after 1 hour and 7 hours.

The experiment is still on, let's see how it goes.
