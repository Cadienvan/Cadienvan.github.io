---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: In a World of Emergent Properties
author: Michael Di Prisco
description: Nobody taught the model that. We are going to have to live with it anyway.
date: 2026-08-14
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/in-un-mondo-di-proprieta-emergenti
---

There is a kind of traffic jam that has no cause. You are on the motorway, three lanes, no roadworks, no accident, no exit. Traffic slows to a crawl for four minutes and then, with nothing to show for it, opens up again. No car did that. If you interviewed every driver on that stretch, not one of them would be able to tell you what happened, and every single one would be telling the truth. The jam exists at a level none of them can see from inside the car. It comes out of a hundred people braking slightly harder than the person in front of them, and it is completely real: it costs fuel, it costs time, it will kill someone this year.

That is an emergent property. Not a mystery, not magic. A behaviour of the system that is not written anywhere in the parts.

I have been thinking about this constantly for the last few months, because the tools I use every day have started producing results that nobody put in them. In July I wrote on LinkedIn about Anthropic's global workspace research, where they describe an internal structure that lets the model access its own thoughts and reason over them. The part that stuck with me was not the structure. It was that nobody designed it. It showed up during training and its own makers found it afterwards, by looking. The people who build these things discover how they work after the fact.

Wonderful. And slightly unsettling.

The thesis of this piece is simple and I think it is going to define the next five years of our job: capability is arriving as emergence rather than as a feature someone shipped, and our relationship with these systems will have to reorganize itself around that. Not around better instructions. Around better constraints, and better verification.

## Today it is mathematics

Some weeks ago OpenAI announced Astra, a model family built to run very long tasks by coordinating agents over hours or days, and it did not announce it with a benchmark table. It announced it by publishing solutions to ten problems that had been open for more than a decade, across high-dimensional geometry, coding theory, group theory, quantum complexity, lattice cryptography and extremal combinatorics, all things I have a hard time mentioning. One of them is the first explicit construction of a non-sofic group. I am not going to pretend I can explain what that is, but mathematicians have been asking whether such a thing exists since 1999. Three others come from the Erdős list.

The manuscript is 249 pages. That is not the interesting number.

The interesting number is zero, which is the count of `sorry` in the Lean 4 repository they published alongside it. In Lean, `sorry` is the placeholder you leave when you have not proved a step yet. Zero means every step of all ten proofs is machine-checked. The other interesting number is a couple of thousand dollars of compute at API prices, and that one deserves a caveat: it was reported both as the total for all ten and as the cost per problem, and either way it is what it cost to generate the proofs they chose to publish, not what it cost to search for the ones that did not work out.

So here is the shape of the thing, and I want to be precise because the shape is the whole point. The production of those proofs was opaque. Nobody at OpenAI can hand you the tactic that closed the non-sofic group problem and explain why the model reached for it, any more than a driver can explain the phantom jam. The verification was mechanical, total, and cost approximately nothing. You do not have to trust Astra. You have to trust Lean, which is a much smaller and much older thing to trust.

Thomas Bloom at Manchester called it big news and then immediately made the correction that matters: the framing where AI replaces mathematicians misses the point, because the system is standing on a century of theory that humans built. Noam Brown, from the inside, pointed out that they did not touch the Millennium Prize Problems and that test-time compute has further to go. Both of those are worth holding onto. This is not the end of mathematics. It is the first case I know of where a genuinely opaque process produced a genuinely new result and handed over a certificate that made the opacity irrelevant.

Remember that trade, because everything else in this article is a variation on it.

## Today it is software

I have my own version of the same story, with worse mathematics and better data.

At Jointly, over the last quarter, the average size of a pull request went up 117% compared with the previous twelve months. Not the number of PRs. The size of each one. That is the direct consequence of adopting agentic engineering practices, and I want to be honest about what it does and does not mean, because a number like that is very easy to wave around and very easy to misread.

It is not a productivity metric. I did not become 117% better at anything. If you have been reviewing code for a while your reflex on reading that sentence is that it sounds like a regression, and that reflex is correct: for twenty years we have told each other that small PRs are the sign of a healthy team, because they are reviewable. A PR that doubles in size is a PR that got harder to hold in one head.

What the number actually measures is where the work moved. When writing was slow, the unit of work was shaped by how much a person could type in a sitting. That constraint is gone. Now the unit of work is shaped by how much of a problem you can specify before delegating it, and it turns out you can specify a lot in a morning. The decisions moved to the front, the writing collapsed, and the artifact that lands in review is bigger because there is nothing left to make it small.

Which means the cost did not disappear. It moved. In February I wrote, publicly, that the code was still under my control because I verified every line the agent produced. Six months later that sentence does not stand up. The volume arriving today does not fit into a linear human read, and if I claim I read all of it I am doing a fake review. Writing costs almost nothing now, understanding costs exactly what it always did, and the whole cork has moved to review.

And, relevant to this article: I frequently cannot tell you what route the agent took. I can tell you what I decided beforehand, what the tests say, what CI says, and whether the thing does what I asked. The path in the middle is increasingly not something I inspect. It is something I gate.

## "That is just a measurement artifact"

There is a serious objection here and it deserves a serious section rather than a footnote, because the strongest version of it comes from people who are not hyping and not doom-mongering, and I would rather meet it than pretend it does not exist.

In 2023 Rylan Schaeffer and colleagues at Stanford published *Are Emergent Abilities of Large Language Models a Mirage?*, and the argument is uncomfortable in the good way. Their claim is that most reported emergent abilities are artifacts of the metric. If you score a task with something discontinuous, exact string match, all-or-nothing on a multi-step arithmetic answer, then a model whose per-token error rate is improving perfectly smoothly will appear to score zero, zero, zero, and then suddenly forty. Swap in a continuous metric that gives partial credit and the cliff turns into a ramp. In their reanalysis, two discontinuous metrics, multiple choice grade and exact string match, account for more than 92% of the emergent abilities claimed on BIG-Bench, and when the same tasks are rescored with something continuous the cliffs mostly turn into ramps.

I think they are right, and I think it changes less than it looks.

It is a paper about the shape of a curve on a plot. It says: nothing discontinuous happened inside the model, you just measured it badly. Fine. Take the win, and use it as a reason to stop saying "emergence" in the tone people reserve for ghosts. That tone has done real damage to the discourse.

But the shape of the curve is not the thing I have to manage on a Tuesday. The thing I have to manage is that a capability I did not plan for showed up in something I own, and that neither I nor the people who trained the model can account for how it got there. Smooth on a plot and surprising in a pull request are not in conflict. They are two different questions. Scaling laws being predictable in aggregate has never told anybody which specific competence will be usable at which specific scale, and the entire industry's release cycle is evidence of that, including the parts of it that discover their own architecture after the fact.

So I will drop the strong claim, since it does not survive and I do not need it. There is no magic threshold. What I am left with is the weaker claim, which is the one that actually costs money: **the capability arrives before the explanation does**, and it arrives in your codebase, not in a paper. Whether the underlying curve was smooth is, from where I am standing, a beautiful and completely academic consolation.

## Tomorrow it is everything you can check

If you accept the trade from the Astra section, the interesting prediction is not which domain is hardest. It is which domain has the cheapest gate.

Mathematics went first and everybody treated that as a story about difficulty. It is not. Mathematics went first because it is the one field that had already built, decades in advance and for entirely unrelated reasons, a total machine-checkable verifier for its own output. Lean did not exist to referee AI. It happened to be exactly the referee AI needed.

So rank the rest by cost of verification, not by prestige.

Hobby projects fall first, and in a sense they already have. The gate is "do I like it", it costs a glance, and there is no downside to a wrong answer. I have said before that vibe coding is exactly right for a side project built to save you time and wrong for something you intend to sell, and this is the same rule with the reasoning made explicit: the acceptable opacity is a function of the strength of the gate, and when the stakes are low the gate can be your own eyeballs.

Medicine has real gates and expensive ones: trials, second opinions, a specialist who confirms or does not. I have a small domestic data point I have written about before, where a model's hypothesis about my son's swollen cheek turned out to match what the pediatrician said, for the third time. That is not a story about replacing anyone. It is a story about a first filter running in front of a gate that still exists and still holds. Widening access to the filter is a genuine good; removing the gate would be a catastrophe. Both things are true.

Finance is interesting because its gates are adversarial by construction. Backtests, audits, regulators, and a counterparty who benefits from your error. That field will absorb opaque capability faster than its own rhetoric suggests, precisely because it never trusted anybody in the first place.

And then there is the long tail where the gate is weak or missing: the judgment calls, the strategy documents, the "does this architecture make sense in three years" question. That is where opaque capability stays a liability no matter how good the model gets, because there is nothing to check the answer against until the answer has already cost you a year. I do not have a fix for that one. I do not think there is one that comes from the model side.

## The domain I left off the list

There is one I skipped, and it should have been at the top, because its gate is the cheapest that has ever existed.

At the end of July OpenAI put GPT-5.6 Sol to work, inside Codex, on its own production GPU kernels. It rewrote them in Triton and Gluon and took around 20% off end-to-end serving cost. Then it redesigned its own speculative-decoding draft model across hundreds of autonomous experiments and added more than 15% to token generation efficiency. Those savings went outward, to the people paying the bills: Luna dropped 80%, Terra 20%. Three weeks before that, the same model had post-trained the smaller Luna from a prompt one of their own researchers called fairly under-specified, choosing the training configuration and the GPUs by itself, in place of what they estimated at two staff researchers for two weeks.

Ask why that domain fell first and you get the whole thesis in miniature. A GPU kernel has the best gate in all of software. It either produces the same output or it does not, and the wall clock tells you instantly whether the rewrite was worth anything. Correctness is mechanical, improvement is a number, and the loop closes in minutes. That is not a hard domain, it is the easiest one there is, and it happened to be sitting inside the building.

Two things are true here at the same time, and picking only one is how you end up either breathless or dismissive.

The deflation first, because it is deserved. Nothing woke up. One of the people involved was explicit that Sol did not invent the training recipe: most of the configuration already existed from its own post-training and the job was adapting it. The numbers are OpenAI's, measured by OpenAI, on a benchmark OpenAI built, and nobody outside has audited any of it. Treat them as a vendor's claim, because that is what they are.

Now the part that survives the deflation, and it survives easily: a model is a load-bearing component of the process that builds the next model, and the price I pay per million tokens went down because of work that no human did. You can argue about what to call that. You cannot argue that it is a demo. It showed up on an invoice.

## The uncomfortable part

Here is what follows, and I would rather say it plainly than dress it up.

We are going to hand over more control, to systems we understand less, and we are going to do it on purpose. Not out of recklessness. Out of arithmetic. The kernel story is what that arithmetic looks like when it wins. Nobody handed a model the serving stack out of conviction about the future of intelligence. They handed it over because it came back 20% cheaper, and that is an argument no engineering organization has ever been able to refuse for long. Refusing the engine does not make you principled, it makes you the car doing 20 in the fast lane with a queue building up behind it, and I have written [a whole essay](https://cadienvan.github.io/blog/en/not-everyone-drives-at-200-kmh/) about that ditch and the opposite one. The refusal will not hold, because the person who does not refuse will be shipping.

The usual consolation is that we have done this before, and it is a good consolation as far as it goes. When we moved to high-level languages we stopped asking what happens under the hood, and nobody today weeps for their inability to describe how the compiler allocates registers. That knowledge did not vanish, it became somebody else's problem. Frameworks are the next layer heading under the hood for exactly the same reason.

But I want to name the difference, because glossing over it is how you end up writing a comfortable article instead of a true one. A compiler is deterministic. Its output is inspectable, reproducible, and identical tomorrow. When we let go of register allocation we let go of something we could have gone back and read at any moment. What we are letting go of now is different in kind: a process that will not necessarily do the same thing twice, whose internals its own authors are still discovering, and whose competence surface has edges nobody has mapped.

So no, this is not just the compiler again. It rhymes, and the rhyme is genuinely reassuring, and the difference is genuinely real. If you only feel one of those two things you are not paying attention.

## What replaces reading the code

If I am not reading every line, the honest question is what I am doing instead. Three things, and they are the actual skill of the next few years.

**The harness.** I have written [a whole piece](https://cadienvan.github.io/blog/en/harness-is-king/) arguing that the harness beats the model, with numbers: the same engine went from 2/10 to 10/10 depending on what was wrapped around it, and a stronger naked model lost to a weaker harnessed one. I still believe it, and in a world of emergent capability it matters more, not less. The model sets the ceiling. The harness decides how much of that ceiling you actually reach, and, more importantly for this argument, it decides what the model is physically able to break.

**The context.** The real input is not the prompt, it is everything the agent can see: the decisions you wrote down before it started, the domain boundaries, the constraints, what is allowed to fail and how. This is the whole distinction between vibe coding and agentic engineering, and the dividing line has never been the percentage of generated code. It is how many decisions a human took before the agent wrote its first line. Emergent capability makes that line sharper, not blurrier. A system that will find routes you did not anticipate is a system whose boundaries had better be explicit.

**Prompted gates.** This is the one I think becomes standard practice, and it is the least discussed of the three. A prompted gate is a test written in words rather than in code. Not an assertion over a return value: a property, stated in a sentence, evaluated by a model against the diff, the tests, and the running system. "The importer must never create a duplicate customer, whatever the file looks like." "No log line in this PR may contain a fiscal code." That second one is not hypothetical, I built it as a GitHub Action that fails CI when it finds personal data in logs, and the team extended it to security and internal library checks. It works. It has been working for a year.

The obvious objection is that a gate written in words is itself probabilistic, so I have replaced a check I could trust with one I cannot. I have two answers. The first is that we have shipped software on human code review for thirty years, and human code review is a probabilistic gate with a worse false-negative rate and a much higher price. The second is that these things stack. A prompted gate is a broad, cheap first filter; deterministic tests go where correctness is load-bearing, legally or financially; and where the stakes justify it, you go all the way to the Lean end of the spectrum and demand a certificate. Astra is the proof that the hard end is reachable. Most of our work does not need the hard end. All of our work needs to know which end it is on.

That is the discipline, and it is not new. It is the same trade-off reflex we have always applied, pointed at a new axis: how much opacity am I buying, and what is the gate that makes it acceptable?

## The 2030 bet

Now the speculative part, flagged as speculation, the way I flagged it [in 2023](https://cadienvan.github.io/blog/en/inevitabot/) when I wrote down a set of dates and put my name on them.

Back then I wrote that LLMs were the first piece and that the focus would move towards AGI somewhere around 2030 to 2035. I am narrowing that, and I am changing its character. I no longer think the next step is mainly about being bigger or more general. I think it is about being **less probabilistic**, and I think we see it before 2030.

The candidate everybody is pointing at is the world model, and it is worth a plain definition because the term is being used to mean four different things. A world model is a system that learns the dynamics of an environment: an internal simulation of how that environment evolves and how actions change it, so it can predict what happens next and plan inside the simulation. The one-line version, which I like because it is honest about the gap: a language model predicts the next token, a world model predicts the next state of the world. LeCun has made this the centre of his work with JEPA, predicting in an abstract space rather than in pixels. Fei-Fei Li is coming at it from spatial intelligence, with explicit 3D structure. They disagree about the route, which is a good sign rather than a bad one.

I am not betting on world models specifically. I am betting on the property, and the property is that the next real breakthrough will be the one that gives us back some determinism without giving back the capability. Something you can ask twice and get the same answer. Something with a state you can inspect rather than a distribution you can sample. It may come from world models, it may come from something with a name none of us has heard yet, and if I had to guess I would say the harness and the model converge until the distinction stops being useful.

What I am fairly confident about is the second half. In a world where capability keeps arriving unannounced, the durable skills are not prompting and are not architecture in the old sense. They are: building the enclosure, curating what the system can see, and writing gates strong enough that you can afford not to look inside. Those are engineering skills. They are not going anywhere. They are just not the skills that get you hired today.

Because the thing about the motorway jam is that you cannot fix it by fixing one car, and you cannot fix it by understanding one driver. You fix it, when you fix it at all, by changing the conditions the whole system runs under: speed limits, spacing, ramp metering. Nobody negotiates with the emergence. They build the road so that what emerges is something they can live with.

That is the job now. I find it a lot more interesting than typing, which was never the part I enjoyed anyway.