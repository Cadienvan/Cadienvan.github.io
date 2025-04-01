---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Stay in the problem space.
author: Michael Di Prisco
description: When a problem isn't clear, the solution can't be either.
date: 2025-04-01
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/resta-nello-spazio-del-problema
---

When was the last time you jumped straight into coding or rushed to adopt the latest technology before fully grasping the core issue? 🤔 We've all been there. In software engineering, the allure of shiny new tools or clever solutions can often distract us from the foundational discipline: staying in the **problem space**.

## Problem First, Solution Later

Imagine you're debugging a critical issue: your application randomly crashes. You might instinctively start applying patches or quick fixes. But what if the issue resurfaces? You probably didn't spend enough time understanding the true nature of the problem.

The key is to resist this initial rush toward solutions. Deeply understanding the problem helps you uncover edge cases, hidden assumptions, and unclear requirements---elements that are often overlooked yet critically impact your software's robustness.

For example, let's consider the widely misunderstood concept of **test coverage**:

```
function sum(a, b) {
  return a + b;
}

```

Running some tests on this function might give you 100% coverage---but does it handle unexpected input correctly, such as a string or `undefined`? Real-world scenarios demand thorough problem-space exploration rather than superficial solutions driven by metrics alone.

✅ **Tip:** Always start with clarifying edge cases and unclear requirements before writing your first line of code.

---

## How Product Teams Can Enable Engineers

It's crucial not just for developers but also for product teams to embrace the problem-first approach. Often, product teams inadvertently present solutions disguised as problems:

> "We need a button here that sends a notification."

This is a solution, not a problem. Instead, framing it as:

> "Users don't notice when important changes occur."

Now, the team can creatively address the issue, potentially uncovering solutions more elegant or effective than a mere button.

### Bridging Software Engineering and Product Management

Encouraging product teams to articulate problems rather than dictate solutions shifts the role of software engineers towards **Product Engineers**---professionals who blend deep technical expertise with product insights. In an AI-driven world, this combined perspective becomes increasingly critical.

✅ **Tip:** Advocate for clear problem definitions from your Product team, and become a proactive partner in finding optimal solutions.

---

## Avoiding Over-engineering

Staying firmly in the problem space prevents the all-too-common pitfall of **over-engineering**. Consider the classic case of implementing an event-driven architecture for a simple, low-traffic application. While elegant on paper, such architecture might complicate the solution unnecessarily, diverting energy away from real customer value.

Focusing on the problem first---like exploring the need for batching requests asynchronously to improve performance---can reveal simpler, more effective solutions tailored precisely to the real issue.

## Practical Tips for Staying Problem-Focused

1.  **Clearly Define Problems:** Use techniques like "5 Whys" to drill down to root causes.

2.  **Engage Cross-Functional Teams:** Encourage dialogue between developers, product managers, and stakeholders to enrich understanding.

3.  **Measure Impact, Not Activity:** Focus on outcomes and impacts rather than arbitrary metrics.

4.  **Leverage Documentation Wisely:** Use lightweight documentation like Architecture Decision Records (ADRs) to track decisions made from a problem-centric perspective.

---

## Conclusion

The essence of creating impactful software lies in relentlessly staying in the problem space. Prioritize problem clarity, resist immediate solution temptations, and foster product-engineering collaboration. Embrace this discipline, and you'll drive sustainable, valuable outcomes that truly align with your business goals.

So next time you're tempted by a quick fix or a new framework, take a step back. Stay with the problem. Let solutions naturally follow.

---

👋 **Discussion Starter:** How often do you find yourself rushing into solutions before fully understanding the problem? Share your experiences below! Let's discuss how we can collectively stay grounded in the problem space.