---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: My first 10 years in the world of development
author: Michael Di Prisco
description: A reflection on my first 10 years in the world of development, from the first lines of code to the present day.
date: 2024-06-30
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/i-miei-primi-10-anni-da-sviluppatore
---

# Ten years.

Some days ago, I became 30. And, with that, I realized I've been working in the software development industry for ten years. Ten years of code, bugs, pull requests, and deployments. Ten years of learning, failing, succeeding, and growing. Ten years of challenges, opportunities, and experiences that have shaped me into the developer I am today.

Our industry is constantly evolving, and the last ten years have been no exception. I've seen technologies come and go, trends rise and fall, and paradigms shift and change.

Today, I want to share some of the lessons I've learned along the way, the insights I've gained, and the principles I've come to live by. These are not just technical lessons but also personal and professional ones that have helped me grow and evolve as a developer and as a person.

P.S. I rewrote (Or should I say _refactor_?) this same post at least 10 times, trying to be as concise as possible, without losing the essence of what I wanted to convey. I hope I succeeded. In case I didn't, let it be a reminder that perfection is a journey, not a destination. Also, I had the luck to get in touch and work with some of the brightest minds in the industry, and I can't thank them enough for the lessons they taught me.

## A little background.

I started my career in Ireland as a "know-nothing" developer for a little agency, working on WordPress and PHP websites. I then moved to Italy for a really big multi-national company, where I mainly worked as a front-end developer with a little hop in Python-land, then moved to a Full-Stack Developer role in a small local web agency, also acting as a Project Manager for small clients. Moving on, I joined a consulting firm with 20 developers acting both as a Developer and a Team Leader / Project Manager, challenging myself with my first international clients. I then moved to a small startup, where I have been the only developer for most of the time, and I had to build the entire digital workflow from scratch. Finally, I landed at a mid-sized product company, where I am now responsible for a team of 6 developers, acting as a Tech Lead and a Software Architect.

Many hats worn, way more mistakes made, and consequently a lot of lessons learned. I had the incredible luck to find myself in different contexts, with different challenges, and different people, and I'm grateful for every single one of them.

## What's changed in the industry?

Pretty much everything. When I started, **jQuery** was the king, WordPress was the go-to solution for every website and `-moz-` and `-webkit-` prefixes were still a thing. 
Today, we can build entire applications with a single command, we have tools that can write code for us, and we can deploy our applications worldwide in seconds. The industry has evolved at an incredible pace, and it's been both exciting and challenging to keep up with all of this.

Yet, it seems like nothing has changed after all: we still have legacy codebases, flaky tests and 42 ways for centering a div. Also, we still don't know how to estimate.

## What's changed in me?

I started as a developer whose only concern was _writing the best code_. I was obsessed with writing the most performant, clean, and elegant code possible. I was convinced that if I wrote the best code, everything else would fall into place. _Oh my_, how wrong I was.

Over the years, I've come to realize that writing code is just a mean to an end. I started focusing more on people, communication and collaboration, and less on the code itself. I've learned that the best code in the world is worth nothing if you can't work effectively with your team, if you can't communicate your ideas, if you can't collaborate with others. Also, _business_ is not just a word we use to identify the people who pay us, but it's the reason why we write code in the first place.

# My 13 principles.

10 years, 13 principles. I tried to condense them to 10, but I failed. I hope you'll forgive me for this.

## 0. The best code is the code you never wrote.

Some days ago, I read an article talking about [Senior Engineer Fatigue](https://luminousmen.com/post/senior-engineer-fatigue), and it resonated a lot with me. The article clearly states:
> The best code is the code you never wrote.

And I couldn't agree more. The best code is the code you never wrote, the feature you never implemented, the library you never built. Ask yourself and the people around you if you really need that feature, if you really need that library, if you really need that code. Most of the time, the answer will be _no_.

Does this mean you should stop writing code? Absolutely not. It means you should be more thoughtful about the code you write, the features you implement, and the libraries you build. It means you should focus on solving the problem at hand, not only on writing performant and clean code. It means you should be pragmatic, not dogmatic.


## 1. People over processes.

**I'd trade a 100% coverage in a 500k LOC codebase for a team that knows how to communicate and collaborate effectively.**

Having a perfect CI/CD pipeline, a well-documented codebase, a robust testing suite and a plethora of Senior Developers working with you is great, but it’s worth nothing if _Developer #17_ doesn't become _John_ or _Jane_ to you.

As Software Architects and Engineers, we often get caught up in the technical aspects of our work like _cohesion_ and _coupling_, forgetting that those terms also - and let me say it clearly, **mainly** - apply to the relationships we build with our colleagues.

Does it mean you can slack off on the technical side? Absolutely not. It means that you should invest as much time in building relationships as you do in writing code. I’ve seen firsthand how investing in relationships can lead to better collaboration, communication, and ultimately, better software, even in contexts where skills are not at the top. Your colleagues are not your family, but why couldn't they be teammates in a match you're playing together?

## 2. Make your code readable.

> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
> _John F. Woods, 1991_

One of the most valuable lessons I’ve learned is the importance of writing readable code. Code readability is not just a preference; it's a necessity. When you consider that you and your team will read your code far more often than you'll write it, the value of clarity becomes undeniable.

Early in my career, I was focused solely on making my code more performant (and, let me be honest with you, uselessly complicated). However, as I gained experience and took on roles involving code reviews and mentoring junior developers, I realized that readability has a far greater impact on the maintainability and extensibility of a codebase than efficiency or cleverness.

Look at the following example:

```js
const data = [1, 2, 3, 4, 5];

const result = data
  .reduce((acc, n) => {
    acc.push({ value: n * 2 });
    if (n * 2 > 5) {
      acc.pop();
    }
    return acc;
  }, [])
  .reduce((str, obj) => {
    return str + obj.value + ', ';
  }, '')
  .slice(0, -2);

console.log(result);
```

And now look at the same code, but with a little more care for readability:

```js
const data = [1, 2, 3, 4, 5];
const objects = [];
let resultString = '';

for (let i = 0; i < data.length; i++) {
  if (data[i] * 2 > 5) {
    continue;
  }
  objects.push({ value: data[i] * 2 });
}

for (let i = 0; i < objects.length; i++) {
  resultString += objects[i].value + ', ';
}

if (resultString.length > 0) {
  resultString = resultString.slice(0, -2);
}

console.log(resultString);
```

Even without comments, you can clearly see what's happening in the second example. The code is broken down into clearer, more manageable pieces, making it easier to understand and maintain. The first example, on the other hand, is a dense block of code that requires careful reading to decipher its intent, even though it's probably more performant and clever.

Of course, the same doesn't apply to all contexts; much of the code I wrote in my Open Source libraries is more concise and less readable, as the scope is narrow and the audience is different. But when you're working on a product with other devs, readability should be a top priority.

You will read your code far more often than you'll write it. And your team will read it even more often. So, make it readable.

N.B. The code I shown is just an example which came to my mind while writing the article, of course many better ways to write the same code exist.

## 3. You are part of the business.

If I have to say a thing I repeatedly see in developers, it's the _us vs. them_ mentality. _Us_ being the developers, _them_ being the business. This is a really dangerous mindset I've also been guilty of in the past, and still sometimes fall into. This couldn't be further from the truth.

In today's world, everything you see is made by a developer and has some software running through it. The PC, tablet or smartphone you're using to read this article, the car you drive, the coffee machine you use every morning, the fridge you open every night looking for something to eat - and, by the way, you'll never find anything good in there, you should go shopping more often - everything has software running through it. And we, as developers, are **literally** the ones who make the world go round.

So, why should we be _against_ the business? We are the business. We are the ones who make the business work. We are the ones who make the business grow. We are the ones who make the business succeed. And if we forget it, we will be the ones who make the business fail.

You are usually the person who knows the most about the business you are working on, as you are the one who makes it work. So, don't be afraid to speak up, to share your ideas, to challenge the status quo. You are part of the business, and you have a lot to say about it.

## 4. Trunk-based. Kinda.

**Trunk-based development is great, but it's not for everyone.**

We are in the middle of the _Trunk-based vs. Feature Branches_ war. I've seen both sides, and I've seen both sides fail. I've seen both sides succeed. I've seen both sides fail and succeed at the same time.

Trunk-based development can help reduce integration issues, improve collaboration, and speed up the development process but, as with any development practice, that is not a one-size-fits-all solution. While it helps with what I mentioned above, it can complicate review processes, effectively reducing the development process because of regressions and bugs.

While I favor trunk-based development, I also believe in continuous learning and improvement. Feature branches can be very effective in certain situations, and trunk-based development can sometimes fall short. The key is finding the right balance for your team and project.

As of my experience, I'd recommend a balanced approach: use feature branches for larger, more collaborative features, and trunk-based development for smaller, straightforward changes. If you do use feature branches, aim to merge them within a day. If the feature isn't ready to merge by the next morning, then you should have put a <s>ring</s> _feature flag_ on it.

![Put a ring on it meme](../../../assets/put-a-ring-on-it.gif)

Generally speaking, I'm against following the rules rigidly, but strongly in favor of understanding them and adapting them to your needs.

## 5. Enough Testing Makes You Sleep Better. Too Much Testing Gives You Headaches.

**I'm against a 100% test coverage in a codebase, but strongly in favor of testing every critical path.**

The goal should not be to cover every single line of code with tests, but rather to focus on testing the parts of your code that matter the most.

Testing everything that matters means identifying the core functionalities and critical paths in your application and ensuring they are thoroughly tested. These are the areas where bugs would have the most significant impact, so ensuring their correctness is paramount. For instance, in an e-commerce application, testing the checkout process is far more crucial than testing minor UI details.

Kent Beck once said:
> I'm not a great programmer; I'm just a good programmer with great habits.

Well, I think testing is one of those habits that can make a significant difference in the quality of your software. But please, don't test everything. Don't do this to yourself. You'll end up with a test suite that takes hours to run, is impossible to maintain, and breaks every time you change a line of code.

## 6. Track technical debt, and pay it when it's due.

**Technical debt is a fact of life in software development. The key is to manage it effectively.**

I face technical debt every day. And you know why? Because the code I write today will be the burdens of tomorrow.

And legacy code sometimes becomes technical debt.

**Technical debt is not inherently bad**. It's a natural byproduct of the development process, and it can be a valuable tool for balancing the need for speed with the need for quality. The key is to manage technical debt effectively, tracking it, prioritizing it, and paying it off continously.

As an aspiring Software Architect, I studied Architecture Decision Records, and I found them to be a great tool for tracking technical debt nonetheless. By documenting the decisions we make and the trade-offs we accept, we can create a record of our technical debt and use it to inform future decisions, or re-pay it when the time comes. Make the amount of Technical Debt Records a metric for your team, and try to keep it as low as possible.

## 7. Unit tests, integration tests, and end-to-end tests.

**☢️ Warning: Opinionated content ahead. ☢️**

As per the famous _test pyramid_, I'd rather flip it when working in a big project: I believe end-to-end tests should be the majority of your test base, followed by integration and unit tests. This is because e2e tests are the closest thing you can get to a real meaningful user interaction.

Of course, reaching this goal can be hard, especially in legacy codebases, so I'd relapse to integration tests followed by e2e and unit tests in this case.

Do I hate unit tests? **Absolutely not**. I think they are a great tool to ensure your code is modular and testable, but when you work on a large codebase, integration between components is the closest thing you can get to end-to-end tests and, consequently, to a real user interaction. On the other side, unit tests are a key part of every package and library I develop and maintain, as they ensure protection against both common and edge cases.

I strongly believe effective testing is about quality, not quantity.

Don't you believe me? Let me give you some numbers:
_In the codebase I'm currently working on, we have more than **3000** assertions in our integration tests, **800** of those are in the payment process. Less than 50 of those are needed to cover the happy path, the rest are edge cases and error handling._

## 8. Documentation is important, but you can't write it alone.

**The best documentation is the one written by the team, for the team.**

A team isn't something you can pretend to be by yourself, and the same applies to documentation. By involving the team in the documentation process, you can leverage the collective knowledge and experience of your team members to create comprehensive and accurate documentation that reflects the shared understanding of the team.

Moreover, involving the team in the documentation process can foster a sense of ownership and accountability. When team members contribute to the documentation, they are more likely to refer to it, update it, and maintain it over time.

Of course, _team_ doesn't mean _everyone, everytime_. You should involve the right people in the documentation process, those who have the most knowledge and experience in the areas being documented, and don't be afraid to ask for a rewrite or a clarification if something is not clear or accurate.

Lastly, documentation should not be a separate activity from software development, but should be integrated into the development process itself. Documentation should be written alongside the code, so that it is always up to date and accurate.

Just to be clear: I don't mean you should write comments **in the code**. I mean you should write documentation **with the code**. Comments are a great tool for explaining _why_ you wrote a piece of code, but they are not a substitute for documentation. Documentation should provide a high-level overview of the codebase or the functionality you are representing, explain how the different components interact with each other, and provide guidance on how to use and maintain the code.

## 9. Stability over innovation.

**Innovating for the sake of innovating is a luxury few can afford. And even when you can afford it in the first place, the price you will pay along the way will be too high.**

Everyone loves working on the latest and greatest technologies, but the reality is that most of the time, stability is more important than innovation.

_Business is king_, and the primary goal of any software development project is to deliver value to the business. This means that stability, reliability, and maintainability should always take precedence over innovation. While it's essential to stay up-to-date with the latest technologies and trends, it's equally important to ensure that your software is stable, reliable, and maintainable.

So, should we just stop innovating? Absolutely not. Innovation is essential for growth and progress, but it should be done with care and consideration.

Migrating from PHP to Rust just because it's cool is not a good reason to innovate. Doing it because your infrastructure bills are skyrocketing, and Rust can help your company save money, is.

Moving all your codebase from JavaScript to TypeScript just because it's the new cool kid on the block is not a good reason to innovate. Doing it because it can help your team write more reliable and maintainable code is.

Also, innovation equals challenges, and challenges equal mistakes. So, if you're going to innovate, be prepared to fail, and pay for it. Failing is not the end of the world and can be a valuable learning experience, but it's not something you should encourage just for the sake of it.

## 10. Reinvent the wheel, sometimes.

**Reinventing the wheel is by far the best way to fail, but also the best way to learn.**

I can't count the number of times I've built my own form build, my own state management library, my own router, my own everything. And I can't count the number of times I've failed. Yet, I don't regret any of those failures.

The first time I built my own form builder, I completely messed up state management, validation, field customization and error handling.

What did you just say? _Those are the core features of a form builder_? Yes, they are. And I failed at all of them. Next time, I messed up only 3 of them. Then 2. Then 1. Then none. I became a _form builder ninja_. And as soon as I got there, I started using a library that did all of that for me.

What? _You wasted all that time learning and now you're using a library?_ Yes, I do. But now I know how it works, and every time I use it, I do it with confidence and knowledge.

Some years ago, I built my own JavaScript framework. It was so bad the URL parser was more than 1k lines of code. But you know what? I learned a lot about how frameworks work, how they handle things such as routing, component rendering, event emitting. And now, every time I use Angular, or Vue, or React, I'm not scared about reactivity or state management, because I know how it works.

## 11. You can't know everything, but you can know how to find everything.

> The best developers are not those who know everything, but those who know how to find everything.

The first suggestion I give to every junior developer I meet is: _learn how to find the problem_, and, more broadly, _learn how to search_. The ability to search effectively is a valuable skill that can help you solve problems and learn new things.

Let's start with the "solve problems" part. When you encounter a problem you don't know how to solve, you should do three simple things:
1. _forget about the first solution which came to mind_, because 99% of the time it's wrong;
2.  _break the problem apart_, because 9 out of 10 times the problem is not the whole payment system going down everytime a new transaction comes in, but probably an unchecked variable or a soft-deleted field;
3. _ask for help_ to a rubber duck. A wide amount of problems solve themselves just when you unfold them repeating the process loudly. If it doesn't work, ask a colleague. If it doesn't work... _Search for it_!

_Wait, what?! Being a Master Googler can be a valuable skill?_ Yes, it is. Knowing how to search effectively can help you find answers to your questions, discover new tools and technologies, and learn from the experiences of others. Also, it's unlikely you'll be the first person to encounter a particular problem, so chances are someone else has already asked the same question and received an answer you can tweak to your needs.

## 12. There are no silver bullets.

> Everything in Software Architecture is a trade-off.
> _Mark Richards and Neal Ford, 2020._

If you think you found a solution that can fit more than a couple problems, it just means you didn't understand the problem.

This is by far the most important lesson I've learned in my first 10 years as a developer.

There are no silver bullets in software development. There are no one-size-fits-all solutions. There are no magic pills that will solve all your problems.

Think about trade-offs whenever you make a decision. Think about the pros and cons of each option. Think about the impact of your decision on the project, the team, and the business. Think about the long-term consequences of your decision. And if those trade-offs are good for you, go for it.

# Conclusions.

Who knows what the next decade will bring? Surely, I can find _what_ will be: AI, for sure. But the _how_ is a pretty different matter.

## Some thanks.

Hundreds of people have forged this article and helped me grow in the last 10 years. I can't thank them all, but I feel the need to thank some of them.

Flavia, my wife, who had the patience to listen to me talking about code for hours.  
Lorenzo, who makes me wanna be a better man, and a better father, every day.  
Christian, my brother, who taught me how to install a graphics card and how to write my first line of code.  
Michele, my first mentor, who taught me how to be a critical thinker and a problem solver.  
Max, a dear friend, who taught me how to be a better person, both in and out of work.  
Serena, who has always been there to help me when I needed it.  
Enry, who believed in me since the first moment we met.

Thanks,
Michael.
