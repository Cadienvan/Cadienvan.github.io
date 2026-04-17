---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: "There's a Time and a Place for Everything, but Not Now"
author: Michael Di Prisco
description: As Professor Oak teaches us, some solutions must be used in the right place, at the right time. Doing today what isn't needed yet — in architecture, leadership, or AI — can destroy a team.
date: 2026-04-17
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/tempo-e-luogo-per-ogni-cosa
---

I'm in my thirties and I still have my Game Boy Color on the shelf. I turn it on sometimes, especially when I need to remind myself that simplicity works. And every time I do, I stumble into one of the most important lessons in software engineering — disguised as dialogue from a children's video game.

In the world of Pokémon, when you try to ride your bicycle inside a building, the game stops you and tells you: *"There's a time and a place for everything, but not now."*

I've thought about that line a lot. More than I probably should, honestly.

Because in our industry, we do exactly the opposite. We bring the bicycle inside. We adopt tomorrow's solution to solve today's problem. And then we wonder why the team is stuck, the software is rigid, and nobody wants to touch that service that "works but nobody knows how."

**The problem isn't the solution. The problem is the timing.**

---

## The Future Trap

There's a subtle bias that hits the best teams: the idea that preparing architecture for the future is always a good idea. That being *forward-thinking* means building today what you'll need in three years.

It's not.

Building for a future that doesn't exist yet isn't foresight. It's speculation. And it's one of the most subtle forms of *over-engineering* there is, because it disguises itself as responsibility.

Think of it like training your Pokémon team: you don't attempt the Elite Four with a level 5 Pikachu, even if it's "theoretically" one of the most iconic Pokémon in the franchise. You need the right moment, the right context, the right level.

The right question isn't *"will this solution be useful someday?"*. The right question is: **"is this solution useful right now, for the problem I have right now?"**

---

## Three Examples I've Seen First-Hand

### 1. OLAP on 10 MB of Data

Picture a team of three people. A database with less than 10 MB of data. An application running simple queries on a handful of tables.

*"We should move to an OLAP architecture and build a Data Lake. It scales better."*

Scales what, exactly?

Scaling a problem that doesn't exist is one of the most effective ways to create a new one. A relational database with a few well-placed indexes would have solved everything in an afternoon. Instead, weeks are spent configuring tools designed for petabytes of data, while the real problem — the one the client is waiting for — sits in the queue.

In Pokémon terms: it's like teaching *Hydro Pump* to a level 3 Magikarp. The move exists, it's powerful, it makes sense — just not for that Pokémon, not at that moment. You have to wait until level 20 first. You have to earn your Gyarados.

❌ **The trap**: "When we scale, we'll already be ready."  
✅ **Reality**: When you scale, you'll know what to build. Right now, you don't.

### 2. Microservices for a Team of One

One project, one team, no need for separate deployments. Everything runs smoothly.

*"Let's do microservices. It's the standard."*

Microservices solve a specific problem: the need to scale teams, separate bounded contexts, deploy independently. If you don't have that problem, you've just imported dozens of new ones — network latency, service discovery, distributed tracing, failure handling — in exchange for zero concrete benefits.

The result? A distributed monolith. That is: all the disadvantages of microservices, none of the advantages.

It's the equivalent of teaching your Pokémon only moves of a different type, hoping it "covers more ground." In theory it makes sense. In practice, it'll never be super effective at anything, and it loses all the STAB bonuses — the Same Type Attack Bonus you get when you use a move that matches your Pokémon's type.

❌ **The trap**: "It's best practice."  
✅ **Reality**: It's best practice *in a specific context*. Your context is different.

### 3. AI Solving Problems You Don't Have

Worth mentioning: introducing a generative AI layer into a workflow where the bottleneck is human, not computational, is the architectural equivalent of bringing your bike into an underwater dungeon.

AI is a powerful tool. Like all powerful tools, it amplifies. If the problem is real, it amplifies the solution. If the problem isn't real, it amplifies the chaos.

In Pokémon too, an HM — Hidden Machine — can only be used in certain parts of the map. *Surf* gets you across the ocean. Using it in a grassy field takes you nowhere. It's not a flaw in the move. It's a flaw in the context in which you're using it.

---

## The Question Nobody Asks

Before adopting a new technology, a new pattern, a new framework, there's a simple question almost no team systematically asks itself:

**"What specific problem, that we have *today*, does this thing solve?"**

Not tomorrow. Not "when we scale." Today.

If the answer is vague, or starts with "well, in the future we could...", stop. It's not the time. It's not the place.

This doesn't mean being conservative. It means being honest with yourself and your context. It means recognizing that **architectural decisions have a cost**, and that cost is paid immediately — even if the benefits arrive, maybe, years from now.

---

## The Difference Between Vision and Escape

There's a subtle but crucial distinction between having vision and using the future as an excuse not to do the hard things now.

Vision says: *"Let's build the simplest thing that works. When the problem changes, we'll change too."*

Escape says: *"Let's build the most complex thing, so we don't have to face the real problem."*

I've seen both. The second one has one unmistakable signal: nobody knows exactly what problem is being solved, but everyone agrees the solution is very elegant.

Professor Oak didn't give you a Pokédex full of already-caught Pokémon. He didn't hand you the Master Ball on day one. He said: *"Go. Explore. Learn."* Every tool in its right moment, every badge earned in the field — not gifted.

---

## What to Do Instead

✅ **Tip**: Before adopting any "enterprise" or "scalable" solution, ask yourself — how many requests per second are we handling today? How many people use this system? What's the cost of getting this decision wrong in six months?

✅ **Tip**: Distinguish between *reversible* and *irreversible* decisions. The former can be made quickly and corrected just as quickly. The latter deserve more time, more context, more humility.

✅ **Tip**: Normalize "not yet" as a legitimate technical answer. It's not laziness. It's priority.

---

## Professor Oak Was Right

The bicycle works. It's a useful tool. But riding it inside a building isn't a problem with the bicycle — it's a problem of context.

The technologies you adopt prematurely aren't wrong in the abstract. Often they're excellent. The problem is that you're using them in the wrong place, at the wrong time, for a problem you don't have yet.

And meanwhile, the problem you do have — the real one, the one your users are waiting for you to solve — is sitting there, waiting.

**It's not the time to use the bike. Go on foot. It's faster.**