---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: The truth about test coverage
author: Michael Di Prisco
description: A simple consideration about test coverage.
date: 2024-07-27
lang: en
hasTranslation: true
customTranslationUrl: /blog/la-verita-sulla-test-coverage
---

## A powerful truth.

Look at the following, simple and straightforward code:

```javascript
function sum(a, b) {
  return a + b;
}
```

Now, let's write some tests for it:

```javascript
test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 3)).toBe(5);
  expect(sum(3, 4)).toBe(7);
  expect(sum(4, 5)).toBe(9);
});
```

We got 100% coverage, right? Well, yes, we do, in fact we could say we got 400% coverage as all the code is fully tested 4 times, but _do we?_

The truth is that we don't. We are testing the function with a limited set of inputs, and we are not considering edge cases, nor we are testing the function with invalid inputs.

Consider the following:
  
```javascript
sum(1, '2');
sum(1, null);
sum(1, undefined);
```

What would happen in such a scenario? Would the function throw an error? Would it return a value? Would it break our application?

## Be aware of the test coverage trap.

Test coverage is a powerful tool, but it's not the ultimate solution. It's a metric that can help you understand how much of your code is being tested, but it doesn't tell you how well it's being tested.

Test coverage can help you with quantity, but it can do little with quality. It's up to you to write good tests, to consider edge cases, to test your code with invalid inputs, and to make sure that your tests are meaningful and valuable.

## Conclusion

This was a pretty short article, I admit, still, I hope it was useful to you as a reminder of the importance of writing good tests. Remember, test coverage is a tool, not a goal. It's up to you to make the most out of it.

_Ciao_,  
Michael.