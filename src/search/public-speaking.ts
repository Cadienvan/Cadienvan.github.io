import { create, insert } from "@orama/orama";
import conferences from "../data/conferences.json";
import interviews from "../data/interviews.json";

export default async function fill() {
  const publicSpeakingDB = await create({
    id: "public-speaking",
    schema: {
      title: "string",
      date: "string",
      occasion: "string",
      url: "string",
    } as const,
  });

  for (const conference of conferences) {
    await insert(publicSpeakingDB, {
      title: `Conferenza: ${conference.title}`,
      date: conference.date,
      occasion: conference.conference,
      url: conference.url,
    });
  }

  for (const interview of interviews) {
    await insert(publicSpeakingDB, {
      title: `Intervista: ${interview.title}`,
      date: interview.date,
      occasion: interview.interviewer,
      url: interview.url,
    });
  }

  return {
    instance: publicSpeakingDB,
    params: {
      tolerance: 2,
      limit: 10,
      boost: {
        title: 2,
        occasion: 1,
        date: 0.3,
      },
    },
  };
}
