---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Asynchronous Batching
author: Michael Di Prisco
description: The (not so) secret weapon to improve web applications performance
date: 2023-12-11
lang: en
hasTranslation: true
---

<div class="nes-container is-rounded">
This post has been published and appeared for the first time, in italian, on <a href="https://www.theredcode.it/devops/asynchronous-batching-nodejs-fastify/" target="_blank">TheRedCode</a>.
</div>

## Introduction

Asynchronous programming is a fundamental concept in modern web development, and one powerful technique is asynchronous batching. In this post, we'll delve into the world of asynchronous batching using Node.js and Fastify, a web framework known for its speed and low overhead. We'll illustrate the concept by creating a Fastify server that responds to requests with the same Promise at a specific URL.

## Understanding Asynchronous Batching

At its core, asynchronous batching involves grouping multiple asynchronous operations into a single unit of work. This approach is particularly beneficial when dealing with repetitive tasks or requests, as it can significantly improve performance and resource utilization.

## Setting Up Fastify

To get started, ensure you have Node.js and npm installed on your machine. Create a new Fastify project, install the necessary dependencies (`npm i fastify`), and set up a basic server. Fastify's lightweight nature makes it an ideal choice for this demonstration.


```js
// Import Fastify
const fastify = require('fastify')();

// Define a basic route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello, Fastify!' };
});

// Set up the server to listen on port 3000
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
```

## Creating a Sample Endpoint

In our example, we'll focus on a specific URL endpoint that responds with the same Promise for every incoming request. This scenario may seem extremely simplified, but it serves as a straightforward illustration of asynchronous batching in action.

```js
// Define a shared Promise for the sake of simplicity
const sharedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ message: 'Batched response from shared Promise!' });
  }, 1000);
});

// Define the route for asynchronous batching
fastify.get('/batched', async (request, reply) => {
  // Return the shared Promise for every request
  return sharedPromise;
});
```

As you can see, in the piece of code above we are effectively creating a single Promise being returned by our endpoint. Doing so, we are effectively asking our server to execute a single task, but return the same resource to every client asking for it.

## Implementing Asynchronous Batching in real life

Developing the asynchronous batching functionality involves intercepting multiple incoming requests to the designated URL and returning the same Promise for all of them. In a real-world scenario, we will save the execution of our Promise in some sort of state (Global or local, it doesn't matter) so every client can effectively ask for the same resource.

## Performance Gains

Asynchronous batching shines in scenarios where multiple requests trigger identical or similar operations. By processing these requests together, we minimize the overhead associated with redundant tasks, leading to improved response times and more efficient resource utilization.

## Parallellism Considerations

While asynchronous batching enhances performance, it's crucial to consider the overhead on the Event Loop. Node's event-driven architecture inherently supports these situations, but careful design is essential to ensure the system behaves predictably under various loads.

## Conclusion

Asynchronous batching is a powerful tool in a developer's arsenal, offering significant performance improvements for certain types of workloads. By exploring its implementation in a Node Fastify server, we've gained insights into how this technique can be applied to streamline and optimize web application development. As you experiment with asynchronous batching, consider its potential applications beyond the presented example, as its benefits extend to a wide range of scenarios in the ever-evolving landscape of web development.

If you want to see it in action in a real scenario, look at our caching library where we implement it to prevent the issue usually solved by Async Batching: [Cache Stampede](https://github.com/JointlyTech/cache-candidate/#cache-stampede).

I hope you enjoyed, see you soon!