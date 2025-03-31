---
title: "TFN#67: \U0001FA9CStaff or Admin?"
date: '2024-08-23T10:35:06+05:30'
status: publish

author: Bhagyesh Pathak
excerpt: Reader, I don't know what it is. But in the past few months, I have been
  thinking more about online safety and privacy than before. Maybe it is the news
  I read or the general state of the world. You would have also noticed it, right?For
  example, a few months back, I shared two letters on this theme:1. How strong is
  your password? Check and generate memorable passwords2. Instant use-and-throw email
  ID using 10minutemailI found this gif that I used at the beginning of the second
  letter quite...
type: post
id: 2276
category:
- Newsletter
tag: []
layout: post
---

Reader, I don’t know what it is. But in the past few months, I have been thinking more about online safety and privacy than before. Maybe it is the news I read or the general state of the world. You would have also noticed it, right?  
For example, a few months back, I shared two letters on this theme:  
1\. [How strong is your password? Check and generate memorable passwords](https://bhagyeshpathak.com/blog/%f0%9f%aa%9chow-strong-is-your-password-check-and-generate-memorable-passwords/)​  
2\. [Instant use-and-throw email ID using 10minutemail](https://bhagyeshpathak.com/blog/%f0%9f%aa%9cinstant-use-and-throw-email-id-using-10minutemail/)​  
I found this gif that I used at the beginning of the second letter quite funny. Most of us are as miserable as the black dog, begging the tele-caller to leave us alone.

![0 5.gif](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/bbJxXAsJ8LhjYWa4rutpGQ)

**Anyways, back to the subject of today’s letter: Staff or Admin?**

Most of us know about these **two roles** in computer applications. If we join a new organization, we may get an orientation on the latest Operations Management Software or Attendance Management System and we’d be marked “staff” in the system. And we accept it as a norm.  
Everyone also intuitively understands that there are a few people in the organizations, who would be “admin”. They can access things that we won’t be able to.  
And that makes most of the knowledge-workers’ idea about access control simple: either you’re an admin or a staff. And that’s all about access control.

But there’s more to it, there are four types
--------------------------------------------

The admin/staff access control we know is called Role-Based Access Control. That’s one of the four major types of access controls.  
Let’s look at all four types now.

### 1. Discretionary Access Control (DAC)

You must be using Google Drive, Dropbox etc services. When you want to share the files with someone, you add them to the file. Sometimes when you want to access someone’s files, you ask them to add you.  
So people control who can access what. It is up to the **individual discretion**.  
This is quite a flexible type of access control, but it is less secure because it relies on the individual’s judgement.

![1 24.png](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/TyGA6FZAfKJjucEjRjXCo)

### 2. Mandatory Access Control (MAC)

In this type of access control, a central authority/policy provides a mandate about who can access what. To protect confidential and sensitive information, this access control is implemented. There are no exceptions. And the users don’t have any real choice.

For example, if you’re working in the banking sector, based on your clearance level, you may be privy to confidential information. The central authority/policy would have mandated you to have the privilege to access the confidential information. This also makes **it easy to keep people accountable**. If there were 500 people out of 50,000 bank employees who were privy to some confidential information, any breach of trust would narrow down to the 500 suspects.

Look at this decision diagram of [SELinux Security Server](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/using_selinux/getting-started-with-selinux_using-selinux#introduction-to-selinux_getting-started-with-selinux). It allows system administrators to implement MAC.  
The diagram shows when a user requests to read a file, the server refers to the policy first and decides whether the user should be able to read the file.

![2 3.jpg](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/gW36B48txwZR2yDwQkbFEp)

### 3. Role-Based Access Control (RBAC)

All of us are aware of this type of access control. So much so that I have seen people fight to gain an “admin” tag in their system. It helps some people gain social status in the workplace. Because the “admin” role has more power and privilege than the “staff” or other roles.

See these **Home Screens** I created for one of my clients: [Sachet Foundation](https://www.linkedin.com/company/sachetfoundation)​  
On the left, there’s an Admin Screen and on the right, there’s a Staff Screen.  
Admin gets to see the “Change Log” and also gets to access the “admin panel” by clicking on the admin role label. But the “staff” role can’t do any of that.

![5 11.png](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/3hp64yp1YruUzsBDh6wz7X)

### 4. Attribute-Based Access Control (ABAC)

This last one is even more interesting and more complex than any of the other access control types. And it works in combination with other access control types.  
ABAC provides permissions based on the attributes of the user. These attributes can be IP Address, location from the office, device ID, time of day, department name, etc.

For example, look at this **Azure Cloud Server’s access control**. IP Address is used as the identifier attribute in this case. So, we have to add the IP Addresses of the users to let them access the resource (in my case, the database). This is on top of the role-based access control. The user would need to have the username and password to logon their app and additionally, have the right IP Address.

![6 8.png](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/tVg12xHmy69fx9DfGDUC8h)

So, that’s about the four types of access controls.

**​**

**But now you might be wondering:**

“Which access control type should I choose?”
--------------------------------------------

In most of the knowledge work, there is hardly any scenario to make a choice. Because **there’s a default set in software systems**. But if you’re developing a policy or getting a software developed for your company, consider the following factors:

- **Data sensitivity:** How sensitive data are you dealing with? The more sensitive the data, the stricter the access control.
- **Team Size and Structure:** If there’s a small team, the first type of access control DAC would suffice. The more complex the organization structure gets, role-based access control would be recommended.
- **Ease of Management:** RBAC and ABAC require dedicated oversight from a system administrator and that’s an additional overhead.
- **Regulatory Requirement:** If your industry is highly regulated, you may want to check with industry standards about access control. You may need to implement some combination of strict access controls.

Have you worked in a highly regulated industry? What are the security measures like? I have never worked in such an industry, so I’m curious how it is. Want to share anything else?  
​**Hit Reply and share with me.**

---

**Reads of the week:**

![](https://embed.filekitcdn.com/e/tkwVjiL2WnM6sb9P2ZThes/6eRrgRFqnBgDuk8suj9Uos)

​[Click to read](https://stories.riafy.me/why-generative-ai-doesnt-make-it-past-poc-0bc53740e4ed)​  
I have been tinkering with LLM aka AI for the last few months. When I read this article, it resonated. It is exciting when we create a Proof Of Concept (POC) prototype showing AI use cases, but it is a daunting task to repeat the same success in production software.

It is just that the design and planning of the whole integration need to be well-thought-out.