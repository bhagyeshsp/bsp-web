---
title: "What will happen to Razorpay?"
date: "2026-09-01"
status: publish
description: "What will happen to Razorpay when Stripe and other global payment firms enter the Indian market?"
author: Bhagyesh Pathak
type: post
id:
category:
  - Uncategorized
tag: []
layout: post
---

I had noted this experience in mid-January this year.

I have used Razorpay for implementing subscriptions product in one of my clients' projects. The amount of hoops I had to jump through to get my subscription do what I intended to do was painful.

I was testing several things with Razorpay. But the one I want to share with you is about testing this scenario: when a customer's card is charged and the subscription gets activated, Razorpay's server sends a ping to my server. I was waiting for that ping on a scheduled day and time. It should work like an atomic clock. But I didn't receive it. That's the background, now going ahead:

In the Test Mode, I had setup a dry-run to check the triggers of different webhook triggers. One of the key webhook triggers that I wanted to check was `subscription.activated`. It was important for me to get it right during tier change of the subscription from the user's side. The day of expected trigger arrived and I kept waiting for hours. I checked all logs, even the events that had setup the subscription to take effect on the D-day. No luck.

Finally, I wrote to Razorpay.

![razorpay-1]({{ '/assets/images/uploads/razorpay-1.webp' | relative_url }}){: width="400px" }

The customer agent connected over chat. She tried to diagnose what had gone wrong for 20 minutes. I supplied plenty of screenshots, logs, background during the conversation. All to no avail.

The customer agent referred me to a specialist team. That took 24 more hours. And what response do I get from the specialist team?

That Razorpay doesn't send `charged` or `activated` webhook events in Test Mode! Wow! In the whole response, only the highlighted line is the answer to my query. Everything else is just fluff. The email didn't refer to any documentation mentioning this difference.

![razorpay-2]({{ '/assets/images/uploads/razorpay-2.webp' | relative_url }}){: width="400px" }

![razorpay-3]({{ '/assets/images/uploads/razorpay-3.webp' | relative_url }}){: width="400px" }

I'm just wondering how Razorpay intends to lead in their core market--that is India, with such a abysmal developer experience? The Govt of India's policies have tied global giant Stripe's hands FOR NOW. What would happen after Stripe's full-fledged entry?

Carnage.

If Razorpay is serious about growing and maintaining, the number one thing they need to fix is their developer experience. Because the economy is moving more and more towards subscription models and whoever provides a superior developer experience, is going to get the market.

For example, I chose Dodo Payments for my next project, not Razorpay.