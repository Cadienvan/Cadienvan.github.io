---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: The Presumption of Measuring AGI
author: Michael Di Prisco
description: How do you see something that cannot be seen?
date: 2026-11-23
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/la-presunzione-di-misurare-l-agi
---

We have always been very sure we would recognize intelligence when we saw it, mostly because the only example we had was ourselves.

Qwen3.5-0.8B was broken in maths and nobody knew. GPT-6 Astra fixed it and nobody taught it how.

If that can happen on an 800-million-parameter model and a plain maths test, I would like to know what makes us so confident about measuring AGI.

## What actually happened

On 2 November a group at MIT CSAIL [published an experiment](https://rikiyat.github.io/blog/weight-space-programming). They took Qwen3.5-0.8B, a small open model that scores 7.9% on MATH-500, and asked GPT-6 Astra to make it better by editing its weights directly.

What Astra had: a Python session with Qwen's weights loaded, no GPU, almost fifteen thousand practice problems from the training sets of GSM8K and MATH, and at most 50 forward passes. No gradients, no training. It never saw the benchmarks used for the score.

What it did: it noticed that Qwen loops (85 of the first 96 practice answers ran until the token limit), traced the loop to one direction in the MLPs of layers 15 and 19, and subtracted it. 131,072 weights out of 0.8 billion. Qwen had been driving with the handbrake on, and Astra found the lever.

What came out: MATH-500 from 7.9 to 48.1, GSM8K from 13.8 to 67.1, IFEval from 21.0 to 62.3.

What it does not show, in the authors' words: "Editing weights could remove an obstacle that hid an ability, but it could not add an ability the model lacked." On Gemma 3 270M, which has no handbrake to release, the gain was under a point. With 10 or 25 passes instead of 50, MATH-500 stopped at 12.3 and 14.1. It is a blog post, not a paper.

I take the authors' sentence with some caution, and for the same reason I am writing this piece. "An ability the model lacked" is a judgement about what is in the weights, and the only way we have to make it is the kind of measurement that said 7.9 a few lines above. What Gemma shows is that Astra, in fifty passes, found nothing to remove. Whether there was nothing to find is another matter.

Nobody trained Astra to do this, and the authors describe it as something that "currently seems like black magic". That is the half of the story everybody covered. I care about the other half: nobody knew Qwen could do maths.

## The benchmark was not lying

MATH-500 did its job. It gave Qwen five hundred problems, counted the right answers and reported 7.9%. The trouble starts one step later, when we read that number as "this model cannot do maths". What it measured was a loop: the model started reasoning, never stopped, hit the token limit, and an answer that does not arrive is a wrong answer.

There is a smaller detail in the post that I find even more telling. Qwen was tested with thinking turned on, and the authors note in passing that turning it off raises the base score. So the 7.9 depended on a flag as well. A score belongs to a model, a configuration and whatever runs around it, and we keep writing it down as if it belonged to the model alone.

I have been here before from the other side. In August [I wrote about](https://cadienvan.github.io/blog/en/in-a-world-of-emergent-properties/) Schaeffer's paper, which showed that many "emergent" abilities were drawn by the metric: score a smooth improvement with an all-or-nothing test and you get a cliff that is not there. That time the metric showed a jump that did not exist. This time it hid an ability that did. It is the same tool, and it has now been wrong in both directions.

So how many handbrakes are still on? In how many models, on how many tasks, is a low score one bug away from a high one? I do not know, and neither does anybody else, because finding this one took a frontier model, fifty forward passes and a group of researchers who thought of trying.

## Nobody agrees on what we are measuring

And that was maths, where at least everybody agrees on what a right answer is. Ask ten people for a definition of AGI and you get ten. I will take two, and I put them on the same level on purpose.

The first is mine. In 2023, in [Inevitabot](https://cadienvan.github.io/blog/en/inevitabot/), I described AGI as "the ability to perform any human intellectual task", with self-improvement and an understanding of the physical and social world that language models did not have, and I gave it a date: 2040. The second is in [OpenAI's charter](https://openai.com/charter): "highly autonomous systems that outperform humans at most economically valuable work".

One is the opinion of somebody with a blog and the other belongs to the company that says it is building the thing, and they share the same weakness: you cannot check either. "Any intellectual task" is a list that has never been written. "Most economically valuable work" depends on who picks the jobs and which humans you compare against. So in practice a benchmark ends up standing in for the definition, and then it carries the problem of the previous section with it.

We saw it in September. Astra's ARC-AGI-3 score came from a harness that kept the reasoning state between attempts, and with plain API calls it dropped a lot. The benchmark with AGI in its name had measured a model plus the machine around it, and its own maintainers had to say in public that saturating it does not demonstrate AGI.

## With what presumption

In September I wrote on LinkedIn that Astra was not AGI. I still think so. But the question has changed under me in less than three months: from "is this AGI?" to "would I be able to tell?". Around here questions go off faster than milk, and the answers we give them go off first.

Look at what we have learned about the models we already use, and when we learned it. Anthropic found a structure inside Claude that lets it access its own thoughts and reason over them, which nobody designed and which they found afterwards, by looking. A group at MIT found that a frontier model can read another model's weights and repair them, which nobody trained it to do, and in doing so showed that a small open model was six times better at maths than its score said.

Each of these is a fact about a system that had already been released, measured and ranked on a leaderboard. We found out later. On top of this we want to set a threshold, give it a name and a date, and announce the day it is crossed. With what presumption? We cannot say what the models of today are able to do, and I do not see how we will certify the one that is supposed to do everything.

## What if it were already here

What if AGI, with whichever definition you prefer, does not arrive on a release day? What if at some point it is already sitting in a set of weights, behind an obstacle that has not been found yet?

I will say what I believe first, so that the question is not read as an announcement. Today we are not there. Nothing I use every day can perform any intellectual task, and I still spend part of my days telling an agent that the file to edit is another one.

But consider how ability has reached us so far. The same model, Opus 4.8, [went from 6 to 10 out of ten](https://cadienvan.github.io/blog/en/harness-is-king/) on the same prompt when I changed the harness around it and nothing inside it. Qwen went from 7.9 to 48.1 when somebody subtracted one direction from two of its layers. In both cases the ability was in the weights the day before, and what was missing was the thing that lets it out: a harness, an edit, sometimes a flag. If that stays the pattern, the last step towards AGI may well be somebody finding what was in the way of a model we already had.

The objection is obvious and I concede it: removing a bug does not build an intelligence, the authors say so themselves, and "it may be there but hidden" is a claim that cannot be proved wrong. That is why I am not making it. My claim is narrower and it is about us. Our instruments missed a factor of six on a small model, and I would not bet on them noticing the day it matters.

## 2040, with a different verb

In Inevitabot I wrote that we would reach AGI by 2040. I am keeping the year and changing the verb. I think 2040 is when we will discover it, and that once we do we will go back through the models of the decade before and find it had been there for a while, waiting for somebody to look in the right place. This is speculation, as it was in 2023.

It would not be the first discovery whose date belongs to the people who made it. America was "discovered" in 1492, and the people living there had not been waiting for the news.

I do not have a better benchmark to offer, and I am suspicious of anyone who says they do. What I do in practice is smaller. When a score tells me a model cannot do something, I read it as "not with this configuration, this harness, this prompt", and I try another one before I believe it. It costs an afternoon, and Qwen is there to remind me how wrong the number can be.

Daniel Boorstin, who wrote a whole book about discoverers, said that "the greatest obstacle to discovery is not ignorance, it is the illusion of knowledge". Ours is that we will know it when we see it.
