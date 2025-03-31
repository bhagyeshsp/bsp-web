---
title: "TFN#50: \U0001FA9CApplying DRY principle in your work"
date: '2024-04-26T09:31:07+05:30'
status: publish

author: Bhagyesh Pathak
excerpt: 'I have always been fascinated by programming languages. There are so many
  of them: python, C, C++, Java, SQL, VBA, etc. Don''t worry, I''m not going to bore
  you to death talking about programming. But what I want to talk about is the DRY
  (Don''t Repeat Yourself) principle used in programming. Any good programmer is supposed
  to follow it. So, what''s the DRY principle? Many programming languages are designed
  with the philosophy that programmers should avoid repetition wherever possible.
  And those...'
type: post
id: 2163
category:
- Newsletter
tag: []
layout: post
---

I have always been fascinated by programming languages.

There are so many of them: python, C, C++, Java, SQL, VBA, etc.

Don’t worry, I’m not going to bore you to death talking about programming.

But what I want to talk about is the **DRY (Don’t Repeat Yourself) principle** used in programming.

Any good programmer is supposed to follow it.

So, what’s the DRY principle?

Many programming languages are designed with the philosophy that programmers should avoid repetition wherever possible. And those languages help them implement this philosophy.

Let’s understand it through a programming example.

Believe me, it is easy. Even if you think it’s not your cup of tea or coffee 😉

*But if you are allergic to any code, scroll down to the end of this letter.*

### So, let’s get started

Suppose, we want to write a code that calculates the area of rectangles. Nothing complicated. Just an area of rectangles.

How would we do it?

We know the formula: Area = width \* height

And imagine, right now, we have three rectangles to calculate.

Here we go.

Our first thought would be to do as follows:

calculate rectangle 1 area calculate rectangle 2 areacalculate rectangle 3 area![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/t7pprNqj4XiNFd7DbK8UkS)

So, we repeated ourselves every time we wanted to calculate the area:

area1 = width1 * height1area2 = width2 * height2area3 = width3 * height3### Hmmmmm…

What if we have 100 rectangles to calculate?

We can’t or rather should not repeat ourselves 100 times. As you can see in the code above,

1 calculation = 3 lines of code

That equals 300 lines of code for 100 rectangles!

### That’s where the DRY principle comes in handy

To show you this, first, let’s write a tiny code named “calculate\_area”.

This code needs two things to work: width and height. It will multiply them automatically and give us the answer using that “return” code.

![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/s8faojMC4x6iRmPMmeFen9)

Now, we will provide our rectangle dimensions in that code.

For example,

Rectangle-1’s width and height are 5 and 10Rectangle-2’s width and height are 7 and 3Rectangle-3’s width and height are 2 and 15Their area1, area2, and area3 can be calculated as shown in the code below.

![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/7fuds6zq8viuMHGtp5maVc)

That’s it! The area calculation is done!

We could calculate with 1 line, instead of 3 lines.

What if we want to calculate the area of 10 more rectangles?

Not an issue, add 10 more lines.

![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/jv97F8xhojJAfpXoxNXka3)

And that’s how we calculated the area of 13 triangles in a single window.

### What does the full code look like? (For the curious creatures)

Here are the full code images:

​[Non-DRY code image](https://imgur.com/F4fWQ6l) (81 lines of code)

​[DRY code image](https://imgur.com/gmYdeL9) (36 lines of code)

And by the way, the programming language used in our example is Python.

### That’s the power of philosophy

If you see the full codes, you’ll learn that we saved almost 50 lines of code by applying the DRY principle. This makes our work clutter-free. Minimizes mistakes.

Applying the DRY principle in day-to-day work
---------------------------------------------

All this coding information is fine, but how to apply the DRY principle in daily non-programming work? That’s what we are interested in.

### 1. Glossary and abbreviations in documentation

This is the single most used DRY principle in non-programming work. When we provide a list of glossary items and abbreviations at the beginning of a document, we don’t need to redefine all the glossary words and abbreviations again. Smart, huh?

### 2. Centralized Standard Operating Procedures (SOPs)

In many organizations, most of the work is predictable. When a new person is hired, it is useful to provide a list of SOPs related to his/her work. Instead of handholding the blank slate hires from the beginning, SOPs save a ton of time and effort.

*“But Bhagyesh, reading an SOP can’t replace the guidance from other colleagues.”*

Of course, it can’t. We are talking about augmenting the human interaction, not replacing it.

### 3. Templates and checklists

If you have ever used a template or a checklist at work, you have applied the DRY principle. Templates such as purchase request form, leave application form etc etc. You get the idea. These are instruments that save us time and effort.

### 4. Training materials

Imagine what would happen if teachers had to re-create their teaching material every day.

Insane, right? That’s why, creating a set of training materials would save us from repeating ourselves if your work involves training.

### 5. Google Docs and Sheets

There are many cloud documentation tools. But you must have used Google Docs and Sheets. Such tools are built to support the DRY principle.

They save us from sending a Microsoft Word or Excel document to 5 people for review. Then those 5 people send the document back to us. The whole back-and-forth dance. Instead, we don’t repeat ourselves. Everyone is in sync.

### In a nutshell

There is nothing wrong with repeating ourselves in some situations. For example, we have to repeat ourselves on every other page of legal documentation. For clarity and surety that we are not making a mistake.

But for most knowledge work, the DRY principle is the go-to principle.

So, how did you like today’s letter?

Was it lengthy? I thought it was.

**Hit Reply and tell me!**

---

**Reads of the week:**

### Boeing and DEI

![twitter profile avatar](https://i0.wp.com/pbs.twimg.com/profile_images/1459175734602350593/cW3fs5lR_normal.jpg?ssl=1)James Lindsay, full varsity ![Twitter Logo](https://functions-js.convertkit.com/icons?icon=twitter&foreground=1d8ced&background=000000&shape=icon-only&scale=1)@ConceptualJames

[Let’s have a close look at Boeing and DEI!  
Boeing’s corporate filings with the SEC reveal that in beginning 2022, the annual bonus plan to reward CEO and executives for increasing profit for shareholders and prioritizing safety was changed to reward them if they hit DEI targets.](https://twitter.com/ConceptualJames/status/1745110176372339167)![photo](https://i0.wp.com/pbs.twimg.com/media/GDfgc2vWsAAMAMQ.jpg?w=420&ssl=1)

9:17 PM • Jan 10, 20246393Retweets20071Likes

[Read 1708 replies](https://twitter.com/ConceptualJames/status/1745110176372339167)

​

Like me, if you too fly in a Boeing aircraft, you must read this. No wonder, the DEI and ESG ideology is not only pervasive but also evil, murderous and anti-human.

This is also in line with what I shared 10 weeks back: [Complex Systems Won’t Survive the Competence Crisis](https://www.palladiummag.com/2023/06/01/complex-systems-wont-survive-the-competence-crisis/)​

For the full context, you can also read the article below:

[![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/cntgCiBqnKGvxg3EDHVMEw)](https://www.vox.com/2024/1/8/24030677/boeing-alaska-airlines-plane-737-max-door-plug)