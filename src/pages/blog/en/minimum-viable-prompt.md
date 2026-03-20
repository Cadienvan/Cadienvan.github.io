---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Minimum Viable Prompt
author: Michael Di Prisco
description: Why swapping massive, 20-paragraph prompts for a Minimum Viable Prompt and a conversational loop yields better software design and beats LLM sycophancy.
date: 2026-03-20
AISupport: mid
lang: en
hasTranslation: false
---

## Introduction

If you’ve spent any time on tech social media recently, you’ve probably seen them: the "Ultimate Prompt Templates." They are massive, 20-paragraph walls of text detailing every single constraint, persona, output format, and architectural pattern you want your AI to follow. 

For a while, I fell into this trap too. I would spend an hour engineering the "perfect" prompt to feed into models like Sonnet 4.5, hoping to get a production-ready architectural document or a flawless piece of code on the first try. 

But recently, I’ve completely changed my approach. I’ve stopped trying to compile my thoughts into a monolithic prompt. Instead, I’ve embraced what my colleague Corrado casually called the **Minimum Viable Prompt** (MVP) during a recent meeting. Thanks, Corrado, for the label—even though the term is floating around the internet, the way I mean it represents, at least in my day-to-day, a real paradigm shift in how I interact with LLMs.

What follows is my point of view on why _less is more_ when it comes to prompting, and why treating AI as a sparring partner rather than a compiler yields much better results.

## The Trap: Sycophancy Bias and Over-Engineering

When you write a hyper-detailed, 20-paragraph prompt, you think you are giving the AI the context it needs to succeed. In reality, you are often just painting it into a corner. 

Large Language Models suffer heavily from **sycophancy bias**. This means they are fundamentally wired to agree with the user. If you write a massive prompt outlining a highly complex, potentially flawed microservices architecture and ask the AI to "write the implementation," it will almost certainly tell you your architecture is brilliant and spit out the code. It won't challenge your core assumptions because you didn't leave room for it to do so.

By over-engineering the prompt, you are rushing straight into the solution space. As I wrote in [Stay in the problem space](./stay-in-the-problem-space), when a problem isn't clear, the solution can't be either. A mega-prompt often forces the AI to execute a bad idea perfectly.

## The Paradigm Shift: The Minimum Viable Prompt

So, what is the MVP in this context? 

Instead of treating the LLM like a function where you pass all arguments upfront, you treat it like a senior colleague you just pulled into a meeting room. You provide the absolute minimum context required to frame the problem, and then you start a conversation. 

I’ve found that using a model geared towards deep reasoning (like Opus 4.6) for this back-and-forth yields incredible results. 

### A Concrete Example: Develop a new feature for my side-project RPG.

> Oh, hey, I didn't have the time to tell you, but I'm building a web-based MMORPG! It's called "World Of Yggdrasil" and it's a passion project of mine. Do you wanna try it? [Click here!](https://woy.ovh)

I wanted to add a new feature: a dynamic weather system that affects gameplay.

❌ **The Old Way (The Mega-Prompt):**
> *"Act as an Expert Software Architect. I am building a web-based MMORPG called World Of Yggdrasil. I want to implement a dynamic weather system that affects gameplay. Every map in the game could randomly move from a weather to another every round (Let's say 3% chance every round), and the weather should affect player stats, dungeons, raids and monsters. I want sunny weather to provide 10% accuracy to players, rainy weather to provide 15% evasion, and snowy weather to reduce speed by 20%. As per the monsters, it depends on their nature. If their nature matches the weather, they get a 20% boost to all stats. If their nature is opposite to the weather, they get a 20% reduction to all stats. I also want a guide in the in-game sage explaining how this mechanic works. Also, add a contextual guide as the other ones in a modal as soon as the first weather mechanic is exposed to a new user. Keep the code testable and maintainable."*

**The Result:** The AI writes the code. But it never asks if you actually *need* a dynamic weather system. It never challenges the core mechanic. It just executes the prompt, which may lead to a lot of wasted effort if the feature turns out to be a bad idea or an unstable solution.

✅ **The New Way (The Minimum Viable Prompt):**
> *"Hey, I'm building a web-based MMORPG called World Of Yggdrasil. I'm thinking about adding a dynamic weather system that affects gameplay. What do you think about this idea?"*

**The Result:** The AI gives you options. You review them. You reply: *"Option 2 looks good, but our team lacks Terraform experience. Can we simplify the infrastructure?"* ➡️ You iterate. 
➡️ You challenge its suggestions. 
➡️ You reason *together*.

> Fun fact, there's no weather system in World Of Yggdrasil because Opus 4.6 convinced me it was a bad idea.

P.S. Of course, that prompt is just an example. The agent I was talking to is a custom agent which can use an entire folder of documentation docs built by itself during the project's lifetime as context, so I didn't need to explain the game mechanics or the codebase. The point is that I provided the minimum context necessary to start a conversation about the feature, rather than trying to cram every detail into a single prompt.

## Why the MVP Approach Wins

Adopting the Minimum Viable Prompt offers several tangible benefits for Software Engineers and Tech Leads:

* **It breaks the echo chamber:** By asking open-ended questions, you bypass the sycophancy bias. The AI is forced to evaluate the problem rather than just validating your pre-conceived solution.
* **It exposes blind spots:** A conversational approach allows the AI to ask clarifying questions or point out edge cases you hadn't considered.
* **It reduces cognitive load upfront:** You don't need to spend an hour writing a prompt. You spend that hour having a productive, high-bandwidth technical discussion.
* **It produces better architecture:** Software architecture is all about trade-offs. The MVP approach turns the AI into a sounding board for those trade-offs, leading to more pragmatic, context-fitting solutions.

## Conclusion

We need to stop using AI simply as advanced code-generation tools and start using them as reasoning engines. The next time you face a complex architectural decision or a gnarly refactoring task, step away from the mega-prompt. 

Start with a Minimum Viable Prompt. State the problem. Ask for trade-offs. Argue with the machine. You'll be surprised at how much better the final design becomes when you actually collaborate with the AI instead of just dictating to it.

---

👋 **Over to you:** How are you using LLMs in your daily workflow? Are you still meticulously crafting monolithic prompts, or have you shifted to a more iterative, conversational approach? Let me know in the comments.