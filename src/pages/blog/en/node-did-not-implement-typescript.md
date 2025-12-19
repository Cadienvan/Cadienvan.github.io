---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Node.js did not implement TypeScript
author: Michael Di Prisco
description: A brief article on the reasons why Node.js did not implement TypeScript.
date: 2024-08-12
lang: en
hasTranslation: true
customTranslationUrl: /blog/node-non-ha-implementato-typescript
---

## First things first

What follows is an explanation of what _has been_ and what _has not been_ done in Node.js regarding TypeScript.

This article is not intended to be a criticism of the Node.js team or the TypeScript team.

In fact, it's quite the opposite.

**I seriously think the Node.js team has made the best possible choice in "implementing" TypeScript the way they did.**

What I'm really stressing here is that Node.js did not implement TypeScript. They just added some sort of support for it. This is a crucial distinction that I think is often overlooked in discussions about Node.js and TypeScript.

In the last couple of weeks, I counted more than 50 articles cited in newsletters I read that mentioned Node.js implemented TypeScript.

I think it's time to clarify this point once and for all.

> Spoiler alert: Node.js did not implement TypeScript.

## TypeScript: a brief history and some data

In 2010, Microsoft released TypeScript, a superset of JavaScript that adds static typing to the language. TypeScript was designed to address some of the shortcomings of JavaScript, such as the lack of type safety and the difficulty of maintaining large codebases. Since its release, TypeScript has gained popularity among developers, with many projects adopting it as their primary language.

As per the latest [State Of JS Survey](https://2023.stateofjs.com/en-US/usage/) TypeScript is pratically everywhere. 78% developers uses TypeScript for at least 50% of their development time, so no wonder the echo of **"Node.js implemented TypeScript"** reached even the most profound corners of the web.

But, just to be clear, it didn't happen. And it probably never will.

## The issues

There are several reasons why Node.js did not implement TypeScript. Here are what I think are the two most important ones:

### #1: TypeScript injects things at runtime.

Did you know what an _enum_ becomes at runtime? An object.

And this is just one of the - luckily - few examples of how TypeScript injects things at runtime. This is a problem for Node.js because it would mean that the runtime would have to be aware of TypeScript's features, which would introduce a lot of complexity and overhead.

If Node.js wants to keep its consistency with ECMAScript and not having to deal with dependency management for the rest of its existence, it can't accept TypeScript as a dependency in the current form.

### #2: Semantic Versioning.

TypeScript doesn't follow semantic versioning (semver). 

Node.js, on the other hand, follows semver strictly and has three different release lines (Currently, we have 18.x, 20.x, 22.x). This means that breaking changes can be introduced in minor or patch releases, which can cause compatibility issues with existing code.

Also, the [amount of supported platforms](https://github.com/nodejs/node/blob/main/BUILDING.md#supported-platforms) is huge, so it's not easy to keep everything in check.

Node.js simply can't accept TypeScript as a dependency because it would break semver. This is a fundamental issue that prevents Node.js from implementing TypeScript.

## So, what did they do?

This is where the confusion arises. Node.js did not implement TypeScript, but they did add type stripping under an experimental flag. This feature allows developers to write TypeScript code and have it compiled to JavaScript without the type information. This is a compromise that allows developers to use TypeScript in Node.js without introducing the issues mentioned above.

Do you want an example? Here you go:

```typescript
function sum(a: number, b: number): number {
  return a + b;
}
```

This function, when compiled with the `--experimental-strip-types` flag, will become:

```javascript
function sum(a        , b        )         {
  return a + b;
}
```

Did you see that? The types are gone and have been replaced by spaces. _But, why?_, you might ask. Well, because doing so preserves sourcemaps references without the hassle of having a separate build process for those.

Internally, this is done via a package called `amaro` which wraps `swc` - a well-known build tool which does the actual stripping.

Of course, limitations exist, such as the inability to use TypeScript-specific features like the before-mentioned _enums_. But still, it's a big step forward to prevent people from writing 135 config files to make a `sum` function accept two numbers and return a third one.

Ciao,
Michael.