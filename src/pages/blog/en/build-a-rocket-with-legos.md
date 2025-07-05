---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Build a Rocket with LEGOs
author: Michael Di Prisco
description:  The Best Developers I Know Think in Blocks, Not Blueprints
date: 2025-07-05
AISupport: low
lang: en
hasTranslation: true
customTranslationUrl: /blog/costruire-un-razzo-con-i-lego
---

## Introduction

*"The Art of Programming is the Art of Organizing Complexity" - Edsger Dijkstra*

> I'm not a dogma guy, so don't expect me to talk about "ports and adapters" or "clean architecture" here. Instead, I want to share a mindset that has helped me and many others build better software. What follows is not just about software, but about how to think like a great developer.

Let's picture the following: you hand a group of developers a huge pile of LEGO bricks and ask them to build a rocket.

Some will sketch blueprints, carefully laying out every component before placing a single brick. Others will immediately start building, creating elaborate structures, only to watch them collapse under their own complexity. But a rare few - the best developers I've worked with - will do something different.

They'll visualize the rocket in their mind and then break it down into blocks so simple that anyone in the team could assemble them. They'll start small, test as they go, and invite others to snap pieces in place. And when the rocket finally takes off, it won't just be a marvel of design - it'll be maintainable, adaptable, and collaborative by nature.

> 👉 Those are the developers I want to work with.

## Complexity Is Not a Badge of Honor

There's a persistent myth in our industry: that the "best" developers are the ones who navigate complexity with elegance, mastering abstract patterns, functional purity, or architecture diagrams that look like subway maps.

But here's the truth: **The best developers make complexity disappear.**

They don't impose it on the team. They _tame_ it. They break it down into clear, simple steps that are easy to understand and even easier to collaborate on. They understand that their job isn't to make themselves look smart - it's to help everyone move fast without breaking things.

Their brain handles the complexity - but their output doesn't show it. It shows empathy.

### A practical example

In Jointly, we built a simple abstraction layer for our cache needs called [cache-candidate](https://github.com/JointlyTech/cache-candidate). It is a beast, automatically managing custom keys, dependency invalidation, TTLs, thunder herding problems, and more.

It can work both in memory and with Redis, and it has a simple interface that allows us to swap implementations without changing the code that uses it.  

The internal implementation? As of today, `516 lines of code` just for the core functionality, ignoring what is actually exposed, so you need to add that, the Redis implementation, the in-memory implementation, the plugins system, etc, which brings the total close to `1000`.

The external interface?

```typescript
import { cacheCandidate } from '@jointly/cache-candidate';

function getUsers(filters = {}) {
  return db.query('SELECT * FROM users WHERE ?', filters); // Example function to cache
}

const cachedGetUsers = cacheCandidate(getUsers); // ✅ Done!
```

And if you want to switch to Redis, have a custom key name, a specific TTL and a different expiration mode?

```typescript
const cachedGetUsers = cacheCandidate(getUsers, {
    ttl: 500,
    customKeyFunction: (rootArgs) => {
      return `users_in_system:${rootArgs[0].only_active_users ? 'active' : 'all'}`;
    },
    cache: makeRedisCache(),
    expirationMode: 'timeout-only'
  }); // ✅ Done!
```


Wait, what is that `makeRedisCache()`? It's a `25 LoC` compatibility layer we built around `kv` - an internal Redis client - just for the `cache-candidate` to work with Redis. It uses the simple adapter interface of `cache-candidate` to provide a Redis implementation based on specific needs we expressed inside `kv`.

This brings the total complexity of the system to around `1300 LoC`, yet the final user just had to install a package and copy three lines of code from the README to switch from in-memory to Redis.

See? The complexity is there, but it doesn't affect and afflict the **Developer Experience**. The interface is simple, and anyone can use it without needing to understand the underlying implementation. Paradoxically, a developer who doesn't know how to use Redis can still use the cache-candidate in such a configured way.

## Great Developers Are Systems Thinkers

These developers aren't necessarily the most skilled coders or the fastest bug-fixers. But they're incredible **problem solvers** because they:
- Deconstruct the problem space before jumping into solution mode.
- Spot dependencies and friction points early.
- Translate ambiguous requirements into crisp, executable building blocks.
- Empower others by making their contributions plug-and-play.
    

In short, they're not just engineers - they're **collaborative systems thinkers**.

### How to train your mind to think like this?
To cultivate this mindset, I always suggest the **5 Whys** technique. When faced with a complex problem, ask "Why?" five times. Each answer will help you peel back layers of complexity until you reach the root cause or the simplest form of the problem.

I find the 3rd or 4th "Why?" to be the most revealing and usually solves the problem.

## Skills to Cultivate

So how do you get there? Here are a few mindset shifts that separate great developers from good ones:

1.  **Think in steps, not just solutions** Can someone else follow your thought process? If not, simplify it.
2.  **Design for collaboration** Would you rather be a genius solo builder or the person who enables 5x progress by everyone else?
3.  **Favor boundaries over cleverness** A well-defined interface is often more valuable than a brilliant internal algorithm.
4.  **Don't just ask "How do I fix this?" - ask "How do I make it easy for someone else to change this tomorrow?"**
    
## How to cultivate this mindset in a team?
To cultivate this mindset in your team, I would suggest the following practices:
- **Pair programming**: Organize moments where developers work together on the same codebase, sharing ideas and approaches, trying to come out with a solution that is easy to understand and extend. If another dev can understand it without questions, it means it's simple enough.
- **Team-wide Code reviews**: Encourage team members to review each other's code, all together, without the dev who wrote it present. This way, they can ask questions and suggest improvements without the pressure of the original author being there. If you can't do that, at least try to have the author present but not speaking, so they can only listen to the feedback and answer questions. If answers are needed, it means the code could be improved.
- **Documentation written by a dev who didn't write the code**: Encourage team members to write documentation for code they didn't write. This forces them to understand the code and explain it in simple terms, which helps both the writer and the reader. This usually happens after the code review, so the _clarifying questions_ are already answered, and the writer can focus on explaining the code in a way that is easy to understand.

## "What if the system has to be complex?"
Sometimes, complexity is unavoidable. But even then, the best developers find ways to make it manageable. They create abstractions that hide the complexity behind simple interfaces. They document their thought processes so others can follow along. They build systems that are resilient to change, not brittle.

In this case, I usually suggest to focus on **DevExp**, **Documentation** and **Collaboration**. Make more than one person understand the system, and ensure that anyone can pick it up and work on it without needing to decipher a complex web of dependencies. It still could be a pain to work on, but at least it won't be a system people are afraid to touch.

## Final Thought

A LEGO rocket built collaboratively will always outperform a duct-taped space shuttle made by one. Not because it flies higher, but because anyone can fix it when it breaks - and everyone knows how it works.

Next time you're deep in a gnarly refactor, or knee-deep in a greenfield system, ask yourself:

> "Am I building a rocket, or am I just piling up bricks?"

Because the best developers? They build rockets. With LEGOs.