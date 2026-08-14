---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: On Building Loops
author: Michael Di Prisco
description: I stopped prompting the agent and started designing what prompts it.
date: 2026-08-14
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/costruire-loop
---

The way I work changed this year, and it took a side project on a twenty five year old videogame to make me notice.

I wanted to test some new Claude skills I created and went right to the thing I love the most: Nerdy RPG games from a different age.

I have been rebuilding the client of Legend of Mir 2, an MMORPG from the early 2000s whose codebase is C# on WinForms and therefore runs on Windows and nowhere else. The target is a browser client written in PixiJS. Most people would call this vibe coding, and for now I am not going to argue with them. I have read something like fifteen lines of that code, and the rest is a loop I asked Claude to write for itself.

I used to describe my job with these tools as orchestration. That was the cool kid on the block "back in the days", three or four months ago. Give the model a good harness, give it a plan, watch the steps, correct the drift. That is not what happened here. Here I spent an hour answering questions, a while longer arguing about scope, and then I typed the one sentence that mattered more than the others: **give me the loop to launch**.

I did not write any of it, and I did not orchestrate it either. I designed the thing that orchestrates it. The interesting part is not that I stopped deciding, it is that every decision I took moved one level up.

## The harness had a human in it

Some weeks ago I wrote that [the harness is king](https://cadienvan.github.io/blog/en/harness-is-king/). The model is the voice, the harness is the band, and a great voice with no band is a guy singing in a room. I still believe every word of it.

What I did not notice at the time is where I was standing in that metaphor. I was at the side of the stage, shouting the next song. The band was excellent, the arrangements were mine, the lights were set, and nothing happened at all until I said go. Then it played one song, beautifully, and stopped, and looked at me.

That works when the model needs correcting every ten minutes. It stops working once it does not. In February I wrote that the code was still under my control because I verified every line the agent produced. By August I had to say in public that the claim no longer stood: writing had become cheap, understanding cost exactly what it had always cost, and everything had piled up onto review. The code that arrives in a day no longer fits inside a linear human read, and pretending otherwise is a fake review.

Both of those positions held. An assumption underneath them did not, and I had never written it down because it had never needed writing: a working session begins when I begin it. Every harness I had built assumed a human at the trigger. Once the harness got good enough, the slowest component in it was me.

## It already has a name

I would like to tell you I worked this out by myself. I did not. While I was being interrogated about pets and inventories, other people had already named the thing.

It started at the beginning of June with Boris Cherny, who built Claude Code, and who was not giving advice, he was describing his day. "I don't prompt Claude anymore. I have loops running. They're the ones prompting Claude and figuring out what to do. My job is to write loops." A few days later Peter Steinberger [wrote](https://x.com/steipete/status/2063697162748260627) that you should not be prompting coding agents anymore, you should be designing loops that prompt your agents. Within a day Addy Osmani published an essay called [Loop Engineering](https://addyosmani.com/blog/loop-engineering/) that took the claim and gave it an anatomy: automations, worktrees, skills, connectors, sub-agents, and underneath all of them the state on disk. His definition is blunter than anything I had. "Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead." Three people in the same week, arriving from three different directions, which usually means the thing was already there and was only waiting for a name.

Two things from that essay outlived the rest for me. A month later Osmani added [the rule](https://addyosmani.com/blog/own-the-outer-loop/) I have found more useful than the anatomy: agents run the inner execution loop, engineers own the outer one. And inside the essay there is a warning most people skip. "The model that wrote the code is way too nice grading its own homework." A loop with no separate verifier is a machine deciding that its own work is fine, in a tight cycle, unattended, for hours.

Everything I built after reading that was an attempt to keep the outer loop and hand the verification to somebody who was not the author.

## The interrogation

A word on what Mir 2 is, for everyone who has never played it. It is a Korean isometric MMORPG from the early 2000s, enormous in Korea and China, largely unknown here, and it never quite died: two decades later people still run private servers of it. I played it as a teenager, which is the whole reason this project exists.

The interrogation came first, and it lasted about an hour.

It was not me asking. Earlier I had told Claude to navigate the repository and build its own knowledge base out of what it found, and it had written thirty six markdown files: eleven technical documents on protocols and architecture, between two hundred and three thousand lines each, eleven matching FAQ files so that a later agent looking for one fact would not have to read three thousand lines to find it, and fourteen on game mechanics.

Then it asked me to check its work. Around fifty questions, counting the ones where I had to go and look something up before I could answer. How player versus player combat resolves. Whether founding a guild requires a Wooma Horn, which is a sentence I did not expect to be asked this year, and which it does.

The one that mattered was about player killers. In Mir 2 you can attack other players, and killing enough of them turns your name red and marks you as a PK. When somebody kills a PK, the PK loses gear. I told it that the official game dropped everything you were wearing and the open source version dropped a single item. It went and read the source, came back, and told me I had it backwards. The official game drops one item. The open source servers drop the entire equip.

That correction is what made the rule necessary. Mir 2 was reverse engineered years ago by a group of people who published the result, and that is the version the community runs its private servers on, so the official sources and the code disagree in places and there is no authority to arbitrate between them. I gave it one: where they disagree, the open source wins, because that is the game people actually play. Every step since has resolved its own ambiguity against that rule. Twenty five steps, no escalation.

An hour of my time bought a decision that has been applied a few hundred times by something that never had to interrupt me to apply it. That is the actual return on the interrogation, and it is not the answers. It is the one line that made a whole class of future questions unnecessary.

The answers themselves were worth less than I expected, and one of them was wrong. Being the person who had played the game mattered less than having the source open. What I was genuinely good for was ruling on which source of truth wins, which is a decision no amount of reading the code produces.

The other thing the transcript tells you is where your documentation is thin. It asked hardest about guilds and about PvP, and those turned out to be the weakest sections of what it had written. An agent interrogates you at the exact points where it could not document itself. Read the questions in order and you get a map of everything you never wrote down.

## Give me the loop

The first thing I typed was not a request to build anything.

> Analizza i knowledge files, le skill, il CLAUDE.md e dimmi se ti sentiresti confidente nello scrivere un piano multi step da poter lanciare con un loop per realizzare una versione Web del client. Come vengono scaricati gli asset? Come funziona il login? Ci sono cose collegate tra server e client che dobbiamo prima slegare?
>
> *Read the knowledge files, the skills, the CLAUDE.md, and tell me whether you would feel confident writing a multi step plan I could launch in a loop to build a web version of the client. How do assets get downloaded? How does login work? Is there anything coupled between server and client that we need to untangle first?*

Nothing in there asks for code. It asks a colleague whether he thinks he can work unsupervised on this, and it names the three places where I suspected he could not. Assets, because Mir 2 is mostly around the client knowing what to show and when. Login, because auth is where a client and a server are married. Coupling, because a client written in the same solution as its server is never really a client.

I did not know the answers. I knew which questions would hurt, and that is a different skill and, these days, a more useful one.

The plan came back, and it was good, and it had a section at the bottom listing what was out of scope. PvP, guilds, pets, heroes, quest UI, dialogs. The two subjects it had interrogated me hardest about were sitting in that list. So I wrote the least sophisticated prompt of the entire project.

> Perché c'è fuori scope pvp, gilde, pet, eroi, quest UI e dialog? Mettili dentro. Il gioco deve essere completo
>
> *Why are pvp, guilds, pets, heroes, quest UI and dialogs out of scope? Put them in. The game has to be complete.*

Those six items were not missing from the plan because the model was lazy. They were missing from the knowledge base, and the plan had quietly inherited the hole.

Third prompt, and this is the one that moved the ground.

> Perfetto così, prepara ciò che ti serve e poi dammi il loop da lanciare
>
> *Good as it is. Prepare what you need, then give me the loop to launch.*

Read it with the stress in the right place. Give me the loop. I am not writing it. The system that would run for weeks without me was designed by the same thing that would run inside it, and I asked for it the way you ask a colleague for the keys.

What it prepared was a folder. A list of fourty two steps (Which became forty nine as of right now, and will probably become more than sixty). Markdown files holding my answers verbatim, and more markdown holding the decisions we had taken and why. Each unit of work generates its own plan when its turn comes and hands that plan to an orchestrator, so nothing has to be designed today against a codebase that will only exist in three weeks.

The folder is not the part that made it click, though. The part that made it click is what we decided to do with it. Not a script, not a scheduled prompt: one skill. The loop is a skill, and the skill is the thing that decides. Read the state on disk, find the next unfinished step, plan it, build it, verify it, write down what happened, stop. Which makes the entire act of running this project two words long.

```
/loop /proceed
```

That is the whole division of labour. I own the trigger and I own the stop. Everything between them is his.

Everything that matters sits in files, which is the component Osmani puts underneath all the others and the reason the loop outlives a dead context window. Nothing important is in the conversation.


## How it checks itself

A loop that verifies its own work is a machine agreeing with itself for eight hours, and I had Osmani's line about grading your own homework in mind when we designed this part.

So it built itself a verification layer, and it built more of it than I would have. As I write this it sits at over three thousand automated checks and ninety four reference screenshots that it diffs against. They are not tests in the sense a test suite is tests. They are a harness. When the image diff moves, an agent that did not write the change looks at what moved and decides whether the movement was intended.

I have not read those three thousand checks and I am not going to. Their value to me is not proof of correctness, it is that the loop can notice it broke yesterday's work while I am asleep, and can tell the difference between a regression and a deliberate change without waking me up.

The obvious question about running something like this for weeks is what it costs. A loop makes something like ten to a hundred times the model calls of a single prompt, and the cost of autonomous token consumption is the strongest objection anyone raises against the whole practice. My answer is boring: I run it on a coding plan, so for me the cost is flat. That is not a defence of the economics. It is the reason the economics never entered a single one of my decisions on this project, and I suspect somebody paying per token would have designed a more careful loop than mine.

Where that has taken it, at step twenty five of forty two: registration works, login works, character selection works, the base interface works, menus and submenus open, clicking behaves, chat runs. The game is not playable yet. All of it was written and checked while I was doing something else.

## What it costs me

I have no mental model of that codebase. If the loop stopped tonight and somebody handed me a bug report, I would open the repository as a complete stranger. Osmani coined the name for this in March, in [an essay dedicated to it](https://addyosmani.com/blog/comprehension-debt/): comprehension debt, the widening gap between the code that exists and the code any human genuinely understands. It is a better name than any I had, and it accumulates faster the better the loop gets.

Which brings me back to the word I let stand at the top of this piece.

By my own definition, published under my own name, this is not vibe coding. I said the dividing line does not sit in the percentage of generated code, it sits in how many decisions a human took before the agent wrote the first line. Vibe coding is describing what you want, watching whether it runs, and going on if it does, with no mental model of what was built. On this project I have no mental model of the code and a complete one of the decisions: what the client owns and what stays on the server, which source of truth wins when two disagree, what is allowed to fail and how, what could never be out of scope. Fifteen lines read is real and I am not walking it back. Fifty questions answered is also real, and it is the half that decides which of the two things this is.

That distinction is the whole reason I would not run this shape of loop at work, and the reason is not the automation. AI writing and AI checking with nothing decided in between is not engineering at any speed, it is piling up things nobody ever decided. What makes a loop safe is not the size of its verification layer. It is whether the decisions above it were taken by a person and written down somewhere the loop can read them.

On this project the trade is the right one anyway. It is private, it has no users, no team, no business attached, and it exists because I liked a game when I was fourteen. I have said before that vibe coding is ideal exactly here, on a side project where perfection was never the requirement, and I have not changed my mind about that either. Match the rigour to the stakes.

There is a cost hiding inside the win, though. The decisions are far fewer and each one weighs much more. One hour of answers steered weeks of work. If my ruling about the open source version had been wrong, it would have been wrong forty two steps deep and three thousand checks wide before anybody noticed, and the only reason it was not wrong is that the machine caught me being wrong about it first. Reach runs in both directions. That hour of questions is the cheapest insurance I have ever bought and also the least reversible thing I did.

## Conclusions

Ten years ago I decided lines. Then I decided components. Then I decided plans and let an agent fill them in. Now I decide the loop that decides the plans. Every rung up that ladder, the number of decisions goes down and the weight of each one goes up, and the failure mode changes from writing a bad function to answering a question badly at seven in the evening and finding out three weeks later.

So the advice is not to delegate more. It is to notice which level your decisions are currently sitting at, and to check whether the level above it is still occupied by anybody.

If you want a concrete first step, do not ask your agent for code tomorrow. Ask it whether it would feel confident writing a plan you could run in a loop, and what it needs from you before it can. Then sit there and answer the questions for an hour. Every question it asks is a missing page of your knowledge base, and that hour is the actual job now.

Osmani says the quiet part twice, and both halves belong here. "A loop running unattended is also a loop making mistakes unattended." And then, at the end of the essay: "Build the loop. But build it like someone who intends to stay the engineer, not just the person who presses go."

The band plays without me counting it in now. Somebody still has to decide what show it is.
