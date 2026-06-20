---
layout: ../../../layouts/_partials/RetroBlogPostLayout.astro
title: Harness is King
author: Michael Di Prisco
description: A benchmark from a Pokémon fan.
date: 2026-06-20
AISupport: mid
lang: en
hasTranslation: true
customTranslationUrl: /blog/harness-is-king
---

Let me put it plainly: Elvis Presley had an incredible voice, we all agree. But what made him "The King" wasn't just his vocal range. It was the arrangements, the hip moves, the charisma on stage — the entire infrastructure moving around him. The same thing is happening in software today. The LLM model is the voice; the **harness** (the environment, the workflows, the context management) is everything else.

I wanted to test this theory with a direct experiment, using the exact same input across six different configurations. For transparency: in some cases I was on a free tier, in others I used personal AI subscriptions or credits.

## The Prompt
> In this folder you must autonomously build the following project:
> An open-world, procedurally generated world with a 60-minute day-night cycle and dynamic weather conditions.
>
> Use Three.js or any other library you deem appropriate.
> The world must include natural elements such as mountains, rivers, forests, and lakes, as well as man-made structures like buildings and roads.
> Don't create random buildings and roads — instead, create a "city" biome of random size among the other biomes, with buildings of different heights and architectural styles. Make sure the city integrates harmoniously with the rest of the world, avoiding abrupt transitions between biomes.
> The day-night cycle must affect the world's lighting, with realistic light and shadow effects. During the day, the sun should illuminate the world with warm, intense light, while at night the scene should be lit by the moon in a softer way.
>
> In this world you must integrate Pokémon. Use the API https://pokeapi.co/ for Pokémon data, adapting them to biomes. Pokémon without compatible biomes will live in cities.
>
> The player has no body but moves the camera in first person. The camera must be controlled via mouse and keyboard, with the ability to move freely through the world. Implement a collision system to prevent the player from walking through solid objects like buildings, trees, or mountains.
>
> You also have an "assets" folder containing GLB files of Pokémon named by their Pokédex number. Some of these GLBs contain animations — when available, you must integrate them into the game to make the Pokémon more realistic and dynamic. They don't have standard names, so find a way to integrate them autonomously. I must be able to click on a Pokémon to display its name and stats, retrieved from the API, and see a random animation.
>
> If I right-click on a Pokémon, I should be able to catch it, adding it to a personal collection. The collection must be viewable at any time, showing the caught Pokémon with their stats and animations. Use the GLB to display the Pokémon in 3D with an eye-catching three-dimensional card containing its data such as stats, evolutions, etc.
>
> The solution must work autonomously by running "npm run start" and must install all libraries and perform all required setup. Launch everything on ports around 17500.

## The Results

*   **Codex** _(Free tier, GPT 5.5 medium)_: The game simply doesn't work. I click "Start", the browser tells me it should have gone fullscreen, and the system just hangs there, motionless. **Score: 2/10**

*   **Claude Code** _(Haiku 4.5)_: Doesn't work, same as above. The game won't start, it freezes on the loading screen. **Score: 2/10**

*   **Cursor** _(Free tier, Composer 2.5 fast)_: On the first attempt the sprites weren't loading correctly, so I gave it another chance and pointed out the exact bug. It worked at that point, but with a small map, no animations, no UI element giving any sense of the day/night cycle, no weather effects. I ran out of credits just in time — it was doing one last pass in the internal browser. **Score: 5/10**

*   **Copilot** _(Opus 4.8, high effort)_: 723 AI credits gone, but the game runs. Wide map, off-scale sprites, no animations, but the package is complete. Varied city and working collection. **Score: 6/10**
![Copilot with Opus 4.8](../../../assets/copilot-pkm-opus-4-8.png)

*   **Claude Code** _(Opus 4.8, high effort)_: Runs great. It included ambient animations like snow and animated Pokémon (even if the scale is a bit off) and the map is huge. **Score: 8/10**
![Claude with Opus 4.8](../../../assets/claude-pkm-opus-4-8.png)

*   **Claude Code** _(Opus 4.8, ultracode with workflows)_: Staggering. Massive map with smoothly flowing biomes, mountains rising from the ground, collection with stunning cards and spot-on walk/idle animations. If the map had been truly procedural and infinite, I could have put it up for sale. **Score: 10/10**

Below is the video of this last test, because it's truly impressive and words don't do it justice. It's one minute long — I recommend watching the whole thing.

<iframe width="100%" height="480" src="https://www.youtube.com/embed/fJe7kDipcUg?si=tpozNMvxX7DhiIRC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusions

I'll make a very honest confession: since the release of Opus 4.5, I've stopped thinking I'm the best dev sitting at my PC. Some time ago I had the chance to test Fable 5 before it was pulled, and I became convinced that at the level of pure model capability we're close to a plateau that could remain stable for years.

The real difference now is made by the philosophical approach to the environment we build around the model. Look at the test data: in three out of five cases the underlying engine was exactly the same (Opus 4.8), yet the final output was night and day (in some cases, literally!). The orchestration ecosystem, the automated workflows, and the ability to self-correct in the terminal are worth far more than raw tokens.

Have you run similar experiments with these orchestrators, or are you still relying on the classic chat with the "naked" model?