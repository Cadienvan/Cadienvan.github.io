---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Not Everyone Drives at 200 km/h
author: Michael Di Prisco
description: A reflection on speed, and the human cost of multi-agent orchestration.
date: 2026-07-04
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/non-tutti-guidano-a-200-kmh
---

For about a year now, a certain kind of developer has been living a different working day than the one we were trained for. We don't write most of the code anymore. We describe what we want, we spin up agents, we orchestrate them — one writing a module, another fixing tests, a third refactoring something we touched yesterday — and then we review what comes back. The unit of work stopped being "a function" and became "a fleet". The marginal cost of shipping a feature, the kind of thing that used to cost half a day, collapsed to almost nothing.

This is the part everyone agrees on, and the numbers get thrown around like confetti: 10x, 50x, the famous **100x engineer**. And honestly? It's real. I'm not here to play the old man explaining why nothing has actually changed. Everything has changed.

What I want to talk about is the part nobody puts on the slide: the *right* speed. Because there are two ways to get this wrong, and they're mirror images of each other. One is flooring it all day long just because the engine lets you. The other is being so spooked by the speed that you crawl along at 20 in the fast lane, refusing to touch the throttle at all. This is a piece about pace — about the human who forgets he has a speed limit when the machine doesn't, and about the equal, opposite mistake of never using the machine at all.

So let me start where I always start when I want to explain something: A metaphor.

## The 200 km/h engine

Picture it. They handed all of us, more or less in the same month, the same car. An engine that holds 200 km/h without even breaking a sweat. The first thing you do, obviously, is take it on the motorway and keep your foot down just to watch the needle climb. It's glorious. It's also the exact moment most of us stop thinking.

Because the interesting question was never "how fast does it go". The interesting question is "when does it actually make sense to go there".

Here's the thing I want to land before we go any further: the 100x is real, but **you can't be a 100x engineer 100% of the time.** In fact, you only need to be one in the 1% of moments that matter. The rest of the day is about figuring out *which* moments those are, and that's where the real game is played — not on the needle of the speedometer.

## "I can do fifty, so should I?"

Let me put it in terms anyone who orchestrates agents will recognize instantly. Writing one decent CRUD controller — validation, error handling, tests, the boring scaffolding that holds everything up — used to be half a morning. Today, in the same time it took me to write *one*, the AI hands me *fifty*. All consistent, all tidy, all with their little green test suite.

And here's where the trap springs, because the brain makes a logical jump that feels obvious and is actually poison: *"if I can do fifty in the same time, I might as well do fifty."* No. The fact that the marginal cost of a feature has collapsed does not raise, by a single millimeter, the number of features your product actually *needs*. It's the same old over-engineering trap — the one we know by heart — except now it runs at 200 km/h instead of 30.

"The best code is the code you never wrote" did not age out the moment the agents arrived. It got *more* true, not less. Because slowness used to be a natural brake: writing a lot cost a lot, so you thought twice. That brake is gone now, and the only one left with a foot on the pedal is you. If you don't do it, nobody does.

## The mania of agents that must never sit idle

I have to come clean here, because the most honest thing I can write on this subject is something I learned by getting it wrong myself.

When I was building [Warriors of Yggdrasil](https://woy.ovh/) — back then still with Copilot, not Claude like now — I developed a kind of obsession. I felt *guilty* if I had an agent sitting idle. Literally guilty, as if I was wasting something. So I installed GitHub on my phone. And Todoist. I'd jot down the day's ToDos and fire them off one after another, never letting the car idle. It got to the point — and I write this because it's exactly where I should have noticed — where I'd wake up at night for the kids and, *while I was up anyway*, kick off a couple of agents before going back to bed.

You know how it ended? It turned out to be a well-made game. Genuinely. But half the features were never used or appreciated by anyone, because there were simply *too many* of them. I'd stuffed a game full of stuff not because it was needed, but because I could. Because letting an agent sit idle felt like waste, and the easiest way to stop feeling guilty was to always give it something to do.

This is a mania, let's call it by its name. It's FOMO dressed up as productivity. It's the voice telling you that if the GPU isn't grinding, you're falling behind. But the value of what you build is not measured in agent-hours burned. An idle agent is not waste. It is, far more often, the only moment you have the mental room to ask whether the next thing you're about to throw at it actually deserves to exist.

## The machine's throughput is not yours

And now we get to the part I think is most underrated, because it's the uncomfortable one: the machine can hold 200 km/h for eight hours straight. You can't.

Multi-agent orchestration demands that you hold an extremely high level of abstraction in your head — several pieces in flight at once, each in a different state, each needing to be verified, corrected, redirected. It's a new kind of cognitive labor, and our brains are not trained to sustain it at that pace for an entire day. Expecting to is the fastest way to arrive at the evening completely drained and, worse, to make terrible decisions in the final hours without even noticing. And don't let me even start about Loop Engineering, because that's a whole other world.

The machine's throughput is effectively unlimited. Yours is finite, and it should be treated as the scarce resource it is. If the AI does in twenty minutes what used to take eight hours, the bottleneck is no longer the machine: **the bottleneck is now you.** And a bottleneck is something you respect, not something you whip.

If I had to sketch what a healthy day looks like — not a dogma, a starting point — I'd picture it roughly like this: one hour of heavy orchestration in the morning, when your head is fresh and can hold the abstraction; then two or three hours of testing and verifying what came out, because that's where good work gets separated from noise; a real lunch break; an hour of study, training, documentation, paperwork — including things that have nothing to do with AI or development at all; and finally a closing sprint to wrap up what you opened in the morning. One hour of orchestration, not eight. The rest is the human work that gives that hour its meaning. Prompting a couple of fixes is not as cognitively demanding as orchestrating a dozen agents, and it should be treated as such. The machine can do the heavy lifting, but you have to decide when to let it.

## Not everything has to be productive

And then there's something I want to say plainly, no irony, because I genuinely mean it.

Not everything you write has to go through an agent. If there's a part of your software you *want* to write by hand — because you enjoy it, because you want to make it a *piece of art*, because that module is yours and you want to chisel it line by line — then do it. You don't have to justify it with a metric. The pleasure of the craft is reason enough.

Maybe, afterwards — and I do mean maybe — ask the AI to take a look. A review, an extra pair of eyes on the things you missed. That's perfectly fine too. But the point stands: writing something with your own hands because it brings you joy is not inefficiency to be corrected. It's one of the few things that keep this a job worth doing, rather than an assembly line where the only task left to the human is to press "approve".

## The other ditch: 20 km/h in the fast lane

Everything up to here has been a warning about going too fast. So let me be just as blunt about the opposite, because it's the quieter mistake and in certain rooms it even looks respectable: the engineer who refuses to touch the throttle at all.

You know the type — and on a bad day it's us. Out of pride, or fear, or nostalgia for how the job used to feel, they do everything by hand. Agents are "cheating". AI is a toy for people who can't really code. So they drive 20 km/h everywhere, including the open motorway where the entire point is to move, and they mistake it for craftsmanship.

It isn't. Being slow when you could be fast is not a virtue; it's a cost you quietly hand to everyone downstream — the users who get the feature three sprints late, the teammate blocked on your part, the business that had somewhere to be. The road doesn't care that you hand-wrote every line. "I did it all myself" is not a feature anyone asked for.

The 100x is real — I said it at the top and I'll say it again here. Refusing it doesn't make you principled; it makes you the car doing 20 in the fast lane with a queue building up behind it. And notice this is the exact same error as the mania I confessed to earlier, just pointing the other way: both are letting a reflex — *always floor it*, or *never touch it* — decide for you, instead of reading the road. Writing a module by hand because it brings you joy and it's the right stretch for it is craft. Refusing the engine because using it might make you feel like less of a Software Engineer is just slow.

---

Let's come back to the car, because that's where we started.

Nobody can take away the pleasure of knowing that, when it's needed, I can open the throttle and hit 200. That capability is real, it's enormous, and I have no intention of disowning it. But the good driver isn't the one who keeps his foot down from the driveway to the toll booth. It's the one who knows *when* to push and when to shift down, when the road asks for speed and when it asks for attention.

It's the exact same maturity we need to decide when to follow the rules and when to bend them: not a reflex, but a choice. Never too fast, never too slow — the right speed for the road you're actually on. The top speed is a gift from the engine. The right gear is something you choose. And that choice — not the needle on the speedometer — is the only thing that still makes the difference between a good engineer and someone who just happens to own a fast car.

Not everyone drives at 200 km/h. The best ones know why.
