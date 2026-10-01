---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Patterns Were Made for Humans
author: Michael Di Prisco
description: My honest take on the agentic testing experiment by Dan Luu
date: 2026-10-01
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/i-pattern-sono-nati-per-gli-umani
---

I read [Dan Luu's latest experiment](https://danluu.com/agentic-testing/) a couple of weeks ago, and it put numbers on something I have been thinking for a while.

The question he asks is narrow. What happens when someone with no testing expertise, who has heard that you should use TDD or property-based testing, tells an agent to do it? He had agents implement a Zstd decoder in Rust, scored the results against hidden tests, and ran the same task under 26 different instructions, from TDD and fuzzing to TLA+ and Lean 4, plus four skills. One of the conditions, Default, carried no testing instructions at all. It finished well above average.

The details are worse than the headline. When you name a technique, agents mostly keep writing the tests they would have written anyway, dressed up in the framework you asked for. Under TDD they wrote many small tests up front that were easy to pass, and missed the subtle bugs. With formal tools they proved properties unrelated to the tests that were failing. In one case agents used an SMT solver - I admit I had to check what it was - to prove things about a computation and still wrote `|` where it needed `+`. With fuzzing and property-based testing they mostly checked that malformed input does not panic. Asked for differential testing, they implemented the thing twice in the same way and put the same bug in both copies.

The skills did not rescue it. The ones an agent turned up when asked for good testing skills were long and read like tutorials. The official Hegel skill made runs up to 41% more expensive and no more correct. The best result came from a skill Luu wrote himself in a couple of minutes. It is five lines: name the areas likely to hide subtle bugs before implementing, pick checks on both sides of a boundary, re-derive risky results in a fresh context, and stop wasting effort on random inputs that only prove nothing crashes.

It is easy to read this as "write short skills". I think that misses what happened, and I think Luu would agree. His skill did not explain testing to someone who has never tested. It reads more like the colleague who has already been burned by this kind of code and leans over your shoulder while you work to tell you where it usually bites. He says so further down, too: what works for him is spending a few minutes on the structure of Zstd and giving Zstd-specific guidance, and he does not want a generic test skill at all. The shortness is a side effect of the skill knowing what it is talking about and speaking to the gap between what the agent does by default and what this job needs.

Two honest caveats before I build on it. Luu calls his own skill a first draft that did not work as intended, since the fresh-context step almost never happened. He also warns that even 160 runs per condition are noisy, and that the top-line numbers mislead unless you read what the agents actually did. So I am treating it as one careful person's experiment, and it happens to line up with what I see every day.

## The ritual without the reason

The failure Luu describes has a precise shape: the agent performs the visible part of a technique and skips the part that gives it value. The cleanest case is rstest, a Rust library that exists to make parametrised test cases easy. The agents imported it, wrote their tests inside it, and never used the parametrisation, which is the one thing that makes rstest worth having. With property-based testing they found a trivial property and ran random inputs against it. On paper the technique was applied every time.

None of this should surprise anyone who has worked in a codebase with a coverage gate. I [wrote about it back in 2024](https://cadienvan.github.io/blog/en/the-truth-about-test-coverage/) with a deliberately silly example: a `sum(a, b)` function and four tests that add small positive integers. You get 100% coverage and a green pipeline, and nobody has asked what happens with `'2'`, `null` or `undefined`. Coverage is the part of testing you can see. The value is in the edge cases somebody had to sit down and think about, and the number cannot tell you whether anybody did.

Yossi Kreinin left a comment on Luu's piece that I keep coming back to. The state of software testing out there is atrocious, so when agents fall back on what they learned, poor results are what we should expect. And what they learned was us. Millions of repositories where "we do TDD" meant "there is a tests folder", and the model copied the habit exactly.

So I do not read the experiment as agents being bad at testing in some new way. They are bad at it in a very human way, the way a team is when it adopts a method because a conference talk said so and never asks what problem the method was solving. What changed is the speed, since a team takes months to turn TDD into a ritual and an agent does it before the first commit.

## Made for humans

Near the end of the piece Luu makes an observation that I think carries the whole argument. Every skill he tested, apart from his own, was written like tutorial instructions for a human: its goal was to explain how to do something. The model already knows how, at least in theory. It has read more about property-based testing than any of us. What it needs, in his words, are statements that modify its default behaviour, and a tutorial mostly adds text for it to read and ignore.

In July I wrote on LinkedIn that frameworks never served to write code, they served to save human effort. Shared conventions so a new hire understands the project in a day, an ecosystem so nobody rewrites authentication from scratch, a name like React that a thousand developers can put on a CV. None of those advantages is technical. They are human costs, paid off in advance.

I think the same holds for most of the patterns and methods we were trained on, and Luu's results are what it looks like when you forget it. TDD keeps a problem small enough for a human head to hold one step at a time, and it makes the fear of breaking something bearable. Design patterns give us a shared vocabulary, so that "this is an Observer" in a review saves ten minutes between two people who both know what that means. Conventions let a person guess where a piece of code lives without asking. These are tools shaped around our memory, our attention and our nerves, and they work very well for exactly that.

An agent does not have those limits in the same shape. It has different ones: it drifts, it is too pleased with its own work, it applies the form of an instruction and loses the intent. Luu's five lines were aimed at those.

This does not mean throwing the methods away, and I want to be precise about it, because I have been arguing against dogma for most of my career and "no dogma" is easy to mishear as "no method". Working without dogma still means working with criteria. In [*What Sits and What Fits*](https://cadienvan.github.io/blog/en/what-sits-and-what-fits/) I wrote that the rules give structure and the craft is knowing when context should override them. That has not changed. What changed is that one of the pieces of context is now the reader. Luu could write his skill only because he knows fuzzing and property-based testing well enough to know how they fail, so knowing the methods is what lets you give an agent something better than their names. And some of them stay for the humans who are still in the loop: TDD as a way for a person to pin down what a requirement means before anybody writes code, patterns as the language we use when we discuss a design rather than when we type it.

## What goes in the instructions instead

If the name of a technique does not carry its purpose, the purpose has to get into the instructions some other way. What I write for agents these days has very little to do with libraries. Mostly it is what I know about the domain and where it is fragile: which calculations have a law behind them, which ones touch money, which import has produced duplicates before. Increasingly it is also what must be true when the work is done, written as a sentence the result can be checked against. I called these prompted gates in [*In a World of Emergent Properties*](https://cadienvan.github.io/blog/en/in-a-world-of-emergent-properties/) and I will not go through the argument again. "The importer must never create a duplicate customer, whatever the file looks like" is still the example I would pick.

A concrete case from our own setup shows what I mean by specific. [Ponytail](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) is a public skill that turns the agent into "a lazy senior developer". It asks whether the code needs to exist at all, whether something in the codebase already does it, whether the standard library covers it, whether it can be one line. It is a good skill, and it is built for everything: writing, refactoring, reviewing, designing, choosing dependencies, with intensity levels, an output format, and the instruction to stay active on every response. That is the generic, do-everything shape Luu's numbers warn about.

We did not install it as it was. We read it with one question in mind: what in here makes the code that reaches review easier to review? Review is where our bottleneck is, and I have written about that more than once, so it was the only question that mattered to us. We kept a couple of its rules, a couple of rungs of its ladder, and most of its section on when not to be lazy, the list of things you never simplify away. Whatever was about writing style, or about a pattern for its own sake, stayed out. Then we attached what we kept to two agents in our harness: the executor, which writes the code, and the test writer. Each one gets the part that concerns its job and nothing else.

What makes it work for us has little to do with how short it is. It encodes what we want to see in a pull request, in our codebase, for our reviewers. A team with a different bottleneck would cut the same skill in a different place, and it should. That is what I mean when I say skills should be written like domain experts.

## Thinking like a product engineer

In 2025 I wrote a short piece called [*Stay in the Problem Space*](https://cadienvan.github.io/blog/en/stay-in-the-problem-space/). Its central example was a product request: "we need a button here that sends a notification". My complaint was that it is a solution presented as a problem. The actual problem is "users don't notice when important changes occur", and an engineer who gets that sentence instead of the button might find something better than a button.

Reading Luu, I realised that "use TDD" is our button. With an agent, we are the product team and the agent is the engineer, and we keep handing it solutions presented as problems. It then does what engineers have always done with a button request when nobody explains why: it builds the button, cleanly, and nobody checks whether users notice anything now.

In that piece I wrote that the shift from software engineer to product engineer would matter more in an AI-driven world. I still think so, though for a slightly different reason than the one I had in mind. I thought product insight would matter because engineers work more closely with the business. It matters because, in front of an agent, the engineer is the one who has to state the problem. So the questions that work are the ones a product engineer asks: what has to happen, for whom, and how would I notice if it did not. For a Zstd decoder, "it must never return wrong bytes silently, and these are the places where it usually does" tells the agent more about what to test than the name of any technique. "How would I notice if it did not" is also what a test was for, long before we started counting them.

## The part nobody likes

There is one more consequence, and it is the one I expect pushback on. If patterns, conventions and readability rules exist largely for the human who reads the code, then it is not obvious that we will read every line in the future, or that we should care about doing it.

I told the first half of this in [*On Building Loops*](https://cadienvan.github.io/blog/en/on-building-loops/), so I will keep it short. In February I claimed I verified every line an agent produced, and by August I had to admit that at today's volume a full read would be a fake review. I have not stopped reading altogether, and it would be dishonest to say so. What I am training myself to do is a functional review first, and a look at the critical parts afterwards, when they need it. Closing a review without scrolling through the diff still feels like leaving the house without checking the gas.

The second half, "or that we should care", is the part that is new for me. In the July post I pointed out that we have been through this once already. When we moved to high-level languages we stopped asking what happens under the hood, and today nobody feels bad for not knowing how the compiler allocates registers. The knowledge did not disappear. It became something someone else handles for us, and our attention moved up a level. I think a good part of what we call code quality is heading the same way, and that includes some of the readability rules I have defended for ten years, which all assume the maintainer is a person. Some of them will survive, because somebody will still open that file on a bad day and need to understand it, but I no longer expect all of them to.

Caring less about every line does not mean caring less about whether the code works, and this is where I want to be careful. The checking moves somewhere else. It moves up, to the decisions taken before the agent starts, written down where the agent can read them. And it moves out, to what the code has to guarantee, stated in a form that can be checked. Reading was the main way I controlled code for most of my career, and it is getting expensive while the other ways are getting cheap. What worries me is a team where the AI writes, the AI checks, and nobody decided anything in between. Reading more lines would not fix that team.

## But Mike, LLMs are non-deterministic!

Somebody is already typing it in the comments, so let me get there first. True: ask the same model the same question twice and you may get two answers. Now look at the people. Anyone who has done code review for a few years has seen the same reviewer approve a pattern on Tuesday and reject it on Thursday, with total conviction both times, or has watched their own code get reviewed differently at 10 am and at 6 pm on a Friday. Humans are not deterministic either, we just agreed not to bring it up in retrospectives.

What I would ask back is what we are comparing the model with. Two engineers given the same ticket write different solutions, and the same engineer writes a different one after a bad night. Human output varies a lot, and we built the whole discipline of review, tests and CI to live with that. A harness is the same machinery, applied on purpose to an agent. Types, linters, test suites, image diffs and the gates I described before do not depend on the model behaving the same way twice. They judge the result, and they judge it identically on every run. The model stays as variable as it was, and the more of the work passes through them, the less that variance matters, because what reaches me has already gone through the same filter. In my Mir 2 loop that filter is more than three thousand checks and ninety-four reference screenshots, and I trust it far more than I would trust my own attention at the end of a long day.

None of this covers everything. Where the gate is weak, a judgment call or whether an architecture will still make sense in three years, nothing deterministic can check the answer, and there the variance of the model is a real problem. If you want to know how I build this kind of harness in my own private projects and the comments ask for it, I may well write it up.

## Where that leaves the methods

I keep studying patterns and methods, and I would still rather work with an engineer who knows them well than with one who does not. What I have stopped doing is putting their names in front of an agent and expecting the name to carry the intent. Luu's numbers say it mostly does not, and our own setup points the same way.

If you want a concrete first step, open the instructions you give your agents and look for every line that names a method: use TDD, follow SOLID, apply the repository pattern. For each one, ask yourself what you were actually worried about when you wrote it, and write that down instead, in the words of someone who knows your domain. You will often find that "use TDD" really meant "please do not break the invoice calculation again", and that sentence is a much better instruction. Some lines will turn out to have been about nothing in particular, and those you can delete.

Then I would like to know what you found. Are you still asking your agents to follow a method, or have you started asking them for a result?
