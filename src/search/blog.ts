import { create, insert } from "@orama/orama";
import * as inevitabot from "../pages/blog/inevitabot.md";
import * as inevitabotEn from "../pages/blog/en/inevitabot.md";
import * as asynchronousBatching from "../pages/blog/asynchronous-batching.md";
import * as asynchronousBatchingEn from "../pages/blog/en/asynchronous-batching.md";
import * as svalutazioneFrontend from "../pages/blog/svalutazione-frontend.md";
import * as svalutazioneFrontendEn from "../pages/blog/en/devaluing-frontend.md";
import * as ict from "../pages/blog/iterative-contract-testing.md";
import * as ictEn from "../pages/blog/en/iterative-contract-testing.md";
import * as testCoverage from "../pages/blog/la-verita-sulla-test-coverage.md";
import * as testCoverageEn from "../pages/blog/en/the-truth-about-test-coverage.md";
import * as nodeTypeScript from "../pages/blog/node-non-ha-implementato-typescript.md";
import * as nodeTypeScriptEn from "../pages/blog/en/node-did-not-implement-typescript.md";
import * as roadmapAlternative from "../pages/blog/l-alternativa-alle-roadmap.md";
import * as roadmapAlternativeEn from "../pages/blog/en/the-alternative-to-roadmaps.md";
import * as whatSitsAndWhatFits from "../pages/blog/what-sits-and-what-fits.md";
import * as whatSitsAndWhatFitsEn from "../pages/blog/en/what-sits-and-what-fits.md";
import * as colleagueBasedTesting from "../pages/blog/colleague-based-testing.md";
import * as colleagueBasedTestingEn from "../pages/blog/en/colleague-based-testing.md";
import * as authorityAndAccountability from "../pages/blog/autorita-e-responsabilita.md";
import * as authorityAndAccountabilityEn from "../pages/blog/en/authority-and-accountability.md";
import * as stayInTheProblemSpace from "../pages/blog/resta-nello-spazio-del-problema.md";
import * as stayInTheProblemSpaceEn from "../pages/blog/en/stay-in-the-problem-space.md";
import * as buildARocketWithLEGOs from "../pages/blog/costruire-un-razzo-con-i-lego.md";
import * as buildARocketWithLEGOsEn from "../pages/blog/en/build-a-rocket-with-legos.md";

export default async function fill() {
  const blogDB = await create({
    id: "blog",
    schema: {
      title: "string",
      date: "string",
      content: "string",
      url: "string",
    } as const,
  });

  await insert(blogDB, {
    title: `Blog: ${inevitabot.frontmatter.title} 🇮🇹`,
    date: inevitabot.frontmatter.date,
    content: inevitabot.rawContent(),
    url: "/blog/inevitabot",
  });

  await insert(blogDB, {
    title: `Blog: ${inevitabotEn.frontmatter.title} 🇬🇧`,
    date: inevitabotEn.frontmatter.date,
    content: inevitabotEn.rawContent(),
    url: "/blog/en/inevitabot",
  });

  await insert(blogDB, {
    title: `Blog: ${asynchronousBatching.frontmatter.title} 🇮🇹`,
    date: asynchronousBatching.frontmatter.date,
    content: asynchronousBatching.rawContent(),
    url: "/blog/asynchronous-batching",
  });

  await insert(blogDB, {
    title: `Blog: ${asynchronousBatchingEn.frontmatter.title} 🇬🇧`,
    date: asynchronousBatchingEn.frontmatter.date,
    content: asynchronousBatchingEn.rawContent(),
    url: "/blog/en/asynchronous-batching",
  });

  await insert(blogDB, {
    title: `Blog: ${svalutazioneFrontend.frontmatter.title} 🇮🇹`,
    date: svalutazioneFrontend.frontmatter.date,
    content: svalutazioneFrontend.rawContent(),
    url: "/blog/svalutazione-frontend",
  });

  await insert(blogDB, {
    title: `Blog: ${svalutazioneFrontendEn.frontmatter.title} 🇬🇧`,
    date: svalutazioneFrontendEn.frontmatter.date,
    content: svalutazioneFrontendEn.rawContent(),
    url: "/blog/en/devaluing-frontend",
  });

  await insert(blogDB, {
    title: `Blog: ${ict.frontmatter.title} 🇮🇹`,
    date: ict.frontmatter.date,
    content: ict.rawContent(),
    url: "/blog/iterative-contract-testing",
  });

  await insert(blogDB, {
    title: `Blog: ${ictEn.frontmatter.title} 🇬🇧`,
    date: ictEn.frontmatter.date,
    content: ictEn.rawContent(),
    url: "/blog/en/iterative-contract-testing",
  });

  await insert(blogDB, {
    title: `Blog: ${testCoverage.frontmatter.title} 🇮🇹`,
    date: testCoverage.frontmatter.date,
    content: testCoverage.rawContent(),
    url: "/blog/la-verita-sulla-test-coverage",
  });

  await insert(blogDB, {
    title: `Blog: ${testCoverageEn.frontmatter.title} 🇬🇧`,
    date: testCoverageEn.frontmatter.date,
    content: testCoverageEn.rawContent(),
    url: "/blog/en/the-truth-about-test-coverage",
  });

  await insert(blogDB, {
    title: `Blog: ${nodeTypeScript.frontmatter.title} 🇮🇹`,
    date: nodeTypeScript.frontmatter.date,
    content: nodeTypeScript.rawContent(),
    url: "/blog/node-non-ha-implementato-typescript",
  });

  await insert(blogDB, {
    title: `Blog: ${nodeTypeScriptEn.frontmatter.title} 🇬🇧`,
    date: nodeTypeScriptEn.frontmatter.date,
    content: nodeTypeScriptEn.rawContent(),
    url: "/blog/en/node-did-not-implement-typescript",
  });

  await insert(blogDB, {
    title: `Blog: ${roadmapAlternative.frontmatter.title} 🇮🇹`,
    date: roadmapAlternative.frontmatter.date,
    content: roadmapAlternative.rawContent(),
    url: "/blog/l-alternativa-alle-roadmap",
  });

  await insert(blogDB, {
    title: `Blog: ${roadmapAlternativeEn.frontmatter.title} 🇬🇧`,
    date: roadmapAlternativeEn.frontmatter.date,
    content: roadmapAlternativeEn.rawContent(),
    url: "/blog/en/the-alternative-to-roadmaps",
  });

  await insert(blogDB, {
    title: `Blog: ${whatSitsAndWhatFits.frontmatter.title} 🇮🇹`,
    date: whatSitsAndWhatFits.frontmatter.date,
    content: whatSitsAndWhatFits.rawContent(),
    url: "/blog/what-sits-and-what-fits",
  });

  await insert(blogDB, {
    title: `Blog: ${whatSitsAndWhatFitsEn.frontmatter.title} 🇬🇧`,
    date: whatSitsAndWhatFitsEn.frontmatter.date,
    content: whatSitsAndWhatFitsEn.rawContent(),
    url: "/blog/en/what-sits-and-what-fits",
  });

  await insert(blogDB, {
    title: `Blog: ${colleagueBasedTesting.frontmatter.title} 🇮🇹`,
    date: colleagueBasedTesting.frontmatter.date,
    content: colleagueBasedTesting.rawContent(),
    url: "/blog/colleague-based-testing",
  });

  await insert(blogDB, {
    title: `Blog: ${colleagueBasedTestingEn.frontmatter.title} 🇬🇧`,
    date: colleagueBasedTestingEn.frontmatter.date,
    content: colleagueBasedTestingEn.rawContent(),
    url: "/blog/en/colleague-based-testing",
  });

  await insert(blogDB, {
    title: `Blog: ${authorityAndAccountability.frontmatter.title} 🇮🇹`,
    date: authorityAndAccountability.frontmatter.date,
    content: authorityAndAccountability.rawContent(),
    url: "/blog/autorita-e-responsabilita",
  });

  await insert(blogDB, {
    title: `Blog: ${authorityAndAccountabilityEn.frontmatter.title} 🇬🇧`,
    date: authorityAndAccountabilityEn.frontmatter.date,
    content: authorityAndAccountabilityEn.rawContent(),
    url: "/blog/en/authority-and-accountability",
  });

  await insert(blogDB, {
    title: `Blog: ${stayInTheProblemSpace.frontmatter.title} 🇮🇹`,
    date: stayInTheProblemSpace.frontmatter.date,
    content: stayInTheProblemSpace.rawContent(),
    url: "/blog/resta-nello-spazio-del-problema",
  });

  await insert(blogDB, {
    title: `Blog: ${stayInTheProblemSpaceEn.frontmatter.title} 🇬🇧`,
    date: stayInTheProblemSpaceEn.frontmatter.date,
    content: stayInTheProblemSpaceEn.rawContent(),
    url: "/blog/en/stay-in-the-problem-space",
  });

  await insert(blogDB, {
    title: `Blog: ${buildARocketWithLEGOs.frontmatter.title} 🇮🇹`,
    date: buildARocketWithLEGOs.frontmatter.date,
    content: buildARocketWithLEGOs.rawContent(),
    url: "/blog/costruire-un-razzo-con-i-lego",
  });

  await insert(blogDB, {
    title: `Blog: ${buildARocketWithLEGOsEn.frontmatter.title} 🇬🇧`,
    date: buildARocketWithLEGOsEn.frontmatter.date,
    content: buildARocketWithLEGOsEn.rawContent(),
    url: "/blog/en/build-a-rocket-with-legos",
  });



  return {
    instance: blogDB,
    params: {
      tolerance: 3,
      limit: 5,
      boost: {
        title: 5,
        url: 1,
        content: 0.1,
        date: 0.1,
      },
    },
  };
}
