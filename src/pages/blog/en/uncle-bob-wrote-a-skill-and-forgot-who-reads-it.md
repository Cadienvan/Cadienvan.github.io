---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Uncle Bob Wrote a Skill and Forgot Who Reads It
author: Michael Di Prisco
description: Writing for a model is a different job from writing for a developer.
date: 2026-10-30
AISupport: high
lang: en
hasTranslation: true
customTranslationUrl: /blog/uncle-bob-ha-scritto-una-skill-e-ha-dimenticato-chi-la-legge
---

On October 25 Robert C. Martin posted a link to a GitHub repository with a short comment: "I composed this skill and have had pretty good luck with it. My grokbots use it when writing code." Three days later the post had more than 270,000 views and about 3,700 bookmarks against about 2,350 likes, which is what people do with something they mean to come back to. The repository, [ub-mode](https://github.com/unclebob/ub-mode), had passed 3,400 stars.

I have defended readability rules for about ten years, and plenty of them carry Uncle Bob's name, so I opened the file with some respect. I came out of it thinking that most of its lines add little for an agent, and that the few lines that could add a lot are the ones it explains the least. I want to go through it point by point, because none of the reasons have to do with whether Uncle Bob is a good engineer, which he is, and all of them have to do with the fact that a skill has a different reader from a book. Writing well for one is a different skill from writing well for the other.

## What is in the file

The whole skill is one `SKILL.md` of 152 lines. The README says it is "loosely based on portions of @poteto's rules", reduced and paired with three of his own tools: `crapper` for the CRAP score, `dryer` for duplication, `mutator` for mutation testing. The body is split into First Make it Work, Then Make it Right, and Practice, with 25 sections under those three parts and 61 bullets, almost all of them one line long, like "Reproduce it." or "Commit often, in small ordered commits."

Before the criticism, the parts I would keep. It is short, well under the 500 lines Anthropic suggests as a ceiling for a skill body. It points the agent at deterministic tools with numeric thresholds, which is rarer than it should be. The TDD section includes "See it fail for the reason you expect", a detail plenty of humans skip. And line 106 is the best thing in the file: "If the test would still pass when every function returned nothing, throw it out." You can run that check in your head against any test, and an agent can too. Keep that line in mind, because it shows what the rest of the file could have been.

It is also fair to say that ub-mode is meant to be invoked by hand, with `/ub-mode`, so nobody gets it by accident. That changes less than it seems. Once loaded it stays in the context, and its first instruction asks for the whole sequence "Every time you are asked to make a change", from the moment you invoked it to the end of the session.

## The reader already owns the book

The [Anthropic guide on writing skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) puts it in one line: "Default assumption: Claude is already very smart. Only add context Claude doesn't already have." Then it asks you to challenge every paragraph with a question, "Does this paragraph justify its token cost?" OpenAI's [skill-creator](https://github.com/openai/skills) carries the same line with Codex in place of Claude. His bots run on Grok, and the README lists `~/.grok/skills` first among the places to install it, but `~/.claude/skills` and `~/.cursor/skills` come right after, so Anthropic's guide applies to it directly, and OpenAI says the same thing for its own agent.

Now read ub-mode with that question in hand. "Check the data where it enters. Inside, trust it." "Do not silence the compiler." These are good rules, and any frontier model with no skill loaded will explain them better than the bullet does, with examples. The reader of this skill has already read Clean Code, and most of the books the other bullets come from.

The obvious objection is that knowing a rule and applying it are different things, and that a reminder might push the model to apply it. There is data on that. Dan Luu [ran agents on the same task under 26 different conditions](https://danluu.com/agentic-testing/) and found that TDD "underperformed", while the condition with no testing instructions at all "scored above average". When he named a technique, the agents mostly performed the visible part of it and skipped the part that gives it value. It is one experiment, on testing, and Luu himself warns against reading too much into the ranking. I wrote a whole piece on it, [Patterns Were Made for Humans](https://cadienvan.github.io/blog/en/patterns-were-made-for-humans/), so the short version here: in that experiment, naming a practice carried the ritual and lost the intent, and a one-line bullet is almost only the name.

Line 106 works for the opposite reason, since it gives a test that a bad test fails. Most of the other 60 bullets could have been rewritten the same way, as a check the agent can run.

## Two orders and no tie-breaker

If the model already knows these rules, does a reminder do nothing? Mostly, as long as the reminder agrees with what the model would have done anyway. It starts to matter when two reminders pull in opposite directions. Line 21 says "Ship the smallest edit that solves the problem." Seventeen lines later, line 38 says "Do not bolt a new requirement onto the old design", and asks the agent to work out what it would have built from scratch.

You can reconcile the two, and a senior engineer does it all the time: smallest edit for a fix, redesign when a new requirement does not fit. The skill gives both orders with nothing saying which one wins. In pstack, the source of ub-mode, that judgement was written down. Its router gives each of its 24 principles a trigger, the situation it applies to: the Laziness Protocol, for example, is for "Refactoring, sizing a diff, or tempted to add abstractions, layers, or signal threading", and Redesign From First Principles is for integrating a new requirement into an existing design. The reduction dropped the triggers, and with them the tie-breaker.

This matters more now than a year ago, because recent models are tuned to take instructions literally. Anthropic wrote it plainly in the [Opus 4.7 announcement](https://www.anthropic.com/news/claude-opus-4-7): "Opus 4.7 takes the instructions literally. Users should re-tune their prompts and harnesses accordingly." OpenAI said the same about GPT-5 in its [prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide), which follows instructions "with surgical precision", and added that "poorly-constructed prompts containing contradictory or vague instructions can be more damaging to GPT-5 than to other models", because it spends reasoning "searching for a way to reconcile the contradictions". A literal reader handed both orders will pick one, and you find out which when you read the diff.

The same literalness hits "every time". A typo in a README and a version bump both owe, on paper, a failing test, a CRAP pass, a duplication pass, a mutation run, an action log and an ordered commit. There is one escape hatch, for tests ("If an honest test is impractical, do not write a bad one"), and none for the rest. pstack sized the work in several places: its Build the Lever says "Skip it only when the task is trivial", and its TDD skill is for when the user asks for TDD or when the bug has an obvious, cheap test target. ub-mode makes TDD unconditional.

## The tools are the best idea and the least written part

The most interesting idea in ub-mode is that the agent should judge its code by numbers a tool produces, not by taste. Anthropic's guide recommends the same thing, deterministic scripts wherever consistency matters and a loop of running a validator, fixing what it reports and running it again. It is also the part of the file written with the least care. Here is everything the skill says about the three tools:

> Use the crapper tool<br>
> Reduce each function under CRAP 10 by splitting it, by testing it, or both.<br>
> Consider whether case statements are worth reducing.
>
> Use the dryer tool to eliminate duplication that rank 0.8 or above.
>
> Use the mutator tool<br>
> Cover the uncovered.<br>
> Kill the survivors.<br>
> Delete dead code.

The skill gives no link and no command line, and says nothing about what to do if the tool is not installed. The links are in the README, and the README tells you to copy only `SKILL.md` into your skills folder, so the agent never sees them. On Uncle Bob's own machine, with the tools already in place, none of this matters. The README, though, is addressed to other people's skill folders, and two days after the release someone opened an issue on the repository saying the agent does not know `crapper` exists and has to spend cycles looking for one.

What the agent would need to know is not trivial. The three tools are Python projects you clone, not packages you install, and `mutator` expects `crapper` checked out next to it. They read six languages: Clojure, Java, Go, TypeScript, Rust and Python, plus plain JavaScript for two of the three. On a PHP, C# or Kotlin codebase the skill tells the agent to use tools that cannot parse the code, and does not say what to do instead. The defaults do not match the skill either. `dryer` reports from a similarity of 0.82 unless you pass `--threshold 0.8`, so a bare run misses part of what the skill asks the agent to remove, and `crapper` has no threshold at all until you give it one. The day someone wires these tools into a hook or a CI step, the exit codes start to matter too: `crapper` fails only with `--threshold`, `dryer` exits with 0 even when it finds duplicates, and only `mutator` fails on its own when a mutant survives.

Then the numbers themselves. The README of `crapper` describes a score from 5 to 30 as "worth a look" and 30 and above as "complex and under-tested", and 30 is also the threshold usually associated with crap4j, the tool Alberto Savoia and Bob Evans built around the metric. ub-mode asks for under 10. The formula, `CC² × (1 − coverage)³ + CC`, can never come out lower than the cyclomatic complexity, so that also means no function above complexity 9, whatever its coverage. It may well be the right rule for his code. Anthropic's guide has a name for a number that arrives without its reason, borrowed from John Ousterhout, "voodoo constants", and a question to go with it: "If you don't know the right value, how will Claude determine it?" The author clearly has an answer, because two of his tool repositories, `dryer` and `mutator`, carry the same commit: "Bring every CRAP score under 10 except the option parser." Uncle Bob knows when a function deserves an exception. His skill does not, and "Consider whether case statements are worth reducing" is as close as it gets to telling the agent.

## Lost in the reduction

The README says plainly where ub-mode comes from: pstack, the set of skills Lauren Tan, poteto on GitHub, published as a [Cursor plugin](https://github.com/cursor/plugins/tree/main/pstack). Comparing the two was the most useful part of this whole exercise. pstack is a router file of 149 lines pointing to 58 skills, among them 24 principles and 23 playbooks, around 69,000 words across its skills. ub-mode is 741 words. Reducing is legitimate, and I would be the last person to complain about a shorter skill. The question is what got cut, and in the sections I compared, the reduction kept the heading and the slogan and dropped the condition that made the rule work.

Keep a Log is the clearest case. pstack says "Log decision points and checkpoints, not every action", and only for long, autonomous or multi-phase work. ub-mode says "Keep a log of every action you take and the reason you took it", on every change. The reduction turned the rule into its opposite.

Attack the Premise is the hardest to read. Lines 43 and 44 tell the agent to "count which actors hold the imbalance" and then "Remove the assignment", and the text never says what assignment. The wording matches an older version of the pstack principle, from September, in which there was a step in between: find what assigns those actors their role. That step is the one that went. pstack's own principle has since been rewritten, on October 14, and the current version no longer talks about a census of actors at all.

Build the Lever goes the same way. pstack asks the agent to prove the tool by rerunning it on the unit done by hand and comparing the two, and caps it with "never a framework". ub-mode keeps "build the tool" and "do one unit by hand", and drops the proof and the cap. pstack also ships a playbook for testing how a change to a skill affects the agent before promoting it, and there is no trace of it in ub-mode.

I recognise the move because I made the opposite one, and told it in the Patterns piece. When we adopted another public skill, Ponytail, we kept a couple of its rules and most of its section on when not to apply them, the list of things you never simplify away. The conditions were the part worth keeping. The ub-mode reduction kept the slogans, which the model already knows, and dropped the conditions, which it did not. A reduction made by someone who writes for humans keeps what a human needs to be reminded of, and a model needs nearly the reverse.

## Freedom upside down

The last line of the skill is "Push to the main line at the end." It has no source in pstack, whose main skill says "Always pause for irreversible writes: force-push to shared branches, deploys, data deletion, customer messages", and whose automation skill says "Don't push to main directly."

Next to the rest of the file, the line is out of proportion. The places where ub-mode is most precise are the harmless ones: a CRAP score under 10, a similarity under 0.8, numbers that at worst make the agent refactor a function it did not need to touch. The step that leaves your machine and lands where everyone else works gets no condition at all. It asks for no green build and no confirmation from the person who asked for the change. Anthropic's guide uses the picture of a narrow bridge with cliffs on both sides for this kind of operation, the place where instructions should be most exact. Here the bridge gets one line and the open field gets thresholds.

Trunk-based teams push to main all the time, and I have nothing against it, but they do it behind a green build, and the skill sets no such condition. Line 151 asks each commit to say how you proved it, which helps, and stops short of making the proof a requirement for the push. Whether an agent following this skill actually pushes depends on the permission settings of whatever runs it, so the only step in the file that other people will see is left to someone else's configuration. An issue opened on the repository two days after the release asks for the same fix: stop before pushing and let the human push, or push to a branch and open a PR.

## No baseline

"I have had pretty good luck with it" is a sincere sentence and I believe it. It is also not a measurement. Compared to what, though: the same grokbots with no skill at all? Nobody knows, and the repository does not claim otherwise. There is no eval and no baseline in it, and pstack's evaluation playbook is one of the things the reduction left behind.

Anthropic's guide is direct here. "Create evaluations BEFORE writing extensive documentation", and it spells out the order: run the model on representative tasks without the skill, write down the specific failures, measure that baseline, then write "just enough content to address the gaps", and compare again.

Skills can also make things worse. [SkillsBench](https://arxiv.org/abs/2602.12670), the largest public benchmark on the subject I know of, tested skills curated by humans across 87 tasks. On average they helped, by 16.6 points, but software engineering was among the domains that gained least, and on 13 of the 87 tasks the result with the skill was worse than without it. A [study from ETH Zurich](https://arxiv.org/abs/2602.11988) looked at the repository context files, the `AGENTS.md` family, and found that providing them "does not generally improve task success rates" while raising inference cost by over 20%. Neither study tested ub-mode, and I am not claiming they did. They say something simpler: a set of instructions that reads well is not, by that fact alone, a set of instructions that helps, and the only way to know is to run it against nothing.

## What I would write instead

None of this is mine. It is what the published guides say, and pstack, the source, already did most of it.

The file does not need to get longer. Cut the bullets the model already knows and spend those lines on what it cannot know, which is mostly about the tools: where they live, the exact command, the flag that sets the threshold, what to do on a language they do not read, and why the number is 10 when the tool's own README calls anything between 5 and 30 "worth a look". Give every principle the situation it applies to, the way pstack did, and where two of them can collide, write which one wins. "Smallest edit, unless the change adds a requirement the current design cannot hold" is one line and removes a guess. Say when the process is too much for the change at hand, because pstack did and the reduction dropped it.

Be most exact where a step leaves your machine, which in this file is the push, and leave the open field open. If the skill is meant for manual use, set `disable-model-invocation`, which the original `poteto-mode` set and ub-mode dropped, and which the [Claude Code docs](https://code.claude.com/docs/en/skills) describe as the flag for workflows "you want to trigger manually with `/name`". Then run the tasks you care about with the skill and without it, as the guide says, and keep what moved the result.

## The reader changed

Uncle Bob spent a career teaching us to write code for the next person who reads it, and he was right to. The next reader of a skill has read his books more times than any of us, and it follows what you write more literally than any colleague ever did. What it has not read is your repository, your thresholds and your tools, and that is what a skill can give it.

If you installed a skill from someone else this month, ub-mode or any other, try putting Anthropic's question to each of its lines: does this justify its token cost? And for the lines that pass, ask what the author measured to put them there. I would like to know what you find.
