---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Colleague-based Testing.
author: Michael Di Prisco
description: A different approach to maintain readability.
date: 2025-01-27
AISupport: low
lang: en
hasTranslation: true
---

## 🚀 The Readability Test You Might Be Missing: Is Your Code Understandable to Others?

As software developers, we often focus on ensuring that our code *works* - that it compiles, passes tests, and meets requirements. But there's another equally important aspect: making sure our code is actually *readable*. If your code isn't easy to understand, you're creating technical debt for future developers - and maybe even for your future self. So how do you measure something as subjective as readability? One simple and powerful approach is to **test** your code with your peers.

---

## Why Test Code for Readability?

When we talk about *software tests*, we usually think about unit tests, integration tests, and end-to-end tests. But code is also a message to other developers, not just a set of instructions for machines. If you want to confirm that your code is as clear as you think it is, try this:

1.  **Ask Your Colleagues**: During a code review or informal walkthrough, see if teammates can explain what a piece of code does *without any additional explanation from you*.  
  If they struggle to describe the functionality, it's a sign you might need to refactor names, simplify logic, or add concise comments.
2.  **Check Your Test Names**: Are they descriptive enough to explain *why* you're testing something? For example,
    ```js
    it('should calculate average excluding invalid votes')
    ```

    is far more informative than `test case 18`. A well-named test can serve as documentation all by itself.

This kind of _readability test_ helps ensure that your code is not just correct, but also *understandable* - and that can significantly reduce future maintenance costs.

---

## Practical Tips for Better Readability

Below are a few strategies that can help you pass the "colleague comprehension test":

### 1\. Use Meaningful Names

-   **Variables & Functions**: Give clear, descriptive names that communicate intent. Instead of `data` or `val`, go for `studentRecords` or `averageScore`.

-   **Classes & Methods**: A method named `processData()` might be okay, but `filterOutInvalidData()` or `calculateCustomerDiscount()` is more precise.

### 2\. Keep Functions Focused

-   **Single Responsibility Principle**: Each function or method should have *one job*. If someone reading your function struggles to understand it, chances are you're doing too much in one place.

-   **Break Down Logic**: Long functions can often be decomposed into smaller, well-named methods.

### 3\. Leave Hints, Not Essays

-   **Comment What's Non-Obvious**: Over-commenting can be as bad as under-commenting. If your variable names and function signatures are straightforward, you don't need a paragraph describing what they do. But if there's a complex calculation or subtle domain-specific logic, a short comment can be a lifesaver.

-   **Keep Comments Updated**: An outdated comment is worse than no comment at all, as it can cause confusion.

### 4\. Write Tests That Explain the "Why"

-   **Explain Use Cases in Test Names**: For instance, `test_calculate_total_price_including_taxes()` immediately informs the reader about what's being validated.

-   **Use Test Descriptions**: If your test runner supports them, use descriptive messages. They help future maintainers understand *why* a test fails and *what* should be fixed.

### 5\. Code Reviews as a Readability Barometer

-   **Encourage Feedback**: During reviews, explicitly ask: "Is the intent of my code clear? Could you explain it back to me?"

-   **Iterate and Improve**: If your reviewer has to *ask* what something means, consider renaming or refactoring. Think of it as an opportunity to refine your approach.

---

## The "Colleague-based Testing" Experiment


One of the best ways to test if your code is understandable is to take a snippet of it - ideally, something new or somewhat complex - and show it to a colleague. Then ask:

> **"Could you read through this and tell me what you think it does?"**

Don't offer any explanations or clarifications beforehand. Let them read the code and paraphrase what they see. If they're *mostly* spot-on, congrats! Your code is likely in good shape. If they struggle, take notes on where the confusion arises - maybe variable names aren't explicit enough, or the logic is too intertwined. This feedback loop is invaluable in improving code clarity.

---

## What's in It for You?

Spending time to write readable code might feel like an extra chore initially, but it pays dividends in the long run:

-   **Faster Onboarding**: New team members ramp up quickly when they can grasp the codebase without heroic efforts.

-   **Easier Maintenance**: When bugs arise - or new features need to be added - readable code ensures you don't waste hours deciphering cryptic logic.

-   **Better Collaboration**: Code reviews are more productive when the reviewer can focus on the bigger picture instead of asking basic questions about naming or function intent.

---

## Over to You: Do You Test for Readability?

Ultimately, writing code for humans is just as important as writing code for machines. We often forget that someone else will read our code - maybe tomorrow, maybe a year from now. By applying the "colleague comprehension test," you can ensure that your code isn't just *working*, but also *transparent* and *maintainable*.

**❓ How do you ensure your code is readable?**\
Have you ever explicitly tested your code with a colleague to see if it's understandable? Drop a comment below and share your experiences or any tips you've found useful. Your insights might just spark a productive conversation and help fellow developers write cleaner, more readable code!

> 🔎 **Pro Tip**: Next time you do a code review, add an extra step:\
> **"Explain in your own words what this code is doing."**\
> It's a quick, practical test that can reveal a lot about your code's clarity.

---

## Ready to Take Action?
➡️ **Try this experiment on your current project** - you might be surprised at what you discover about your own code.\
✅ **Refactor any confusing parts** - your future self (and teammates) will thank you.

And remember, clarity is key to sustainability in software engineering. Happy coding!