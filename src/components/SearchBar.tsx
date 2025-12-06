import { useSignal } from "@preact/signals";
import searchDB from "../search/index";

// Filter out future posts from search results
function filterFuturePosts(results: { document: { title: string; url: string; date?: string } }[]) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  return results.filter(r => {
    // Only filter blog posts (they have a date field)
    if (!r.document.date) return true;
    
    const postDate = new Date(r.document.date);
    postDate.setHours(0, 0, 0, 0);
    return postDate <= now;
  });
}

export default function Counter() {
  const searchResults = useSignal([] as { title: string; url: string }[]);

  async function search(e) {
    const term = e.target.value;
    if (term.length < 2) {
      searchResults.value = [];
      return;
    }
    const results = await searchDB(term);
    const filteredResults = filterFuturePosts(results);
    searchResults.value = filteredResults.map(r => r.document);
  }

  return (
    <>
      <div class='nes-field'>
        <input id='search-bar' type='text' class='nes-input' placeholder='Cosa stai cercando?' onInput={search} />
      </div>
      {searchResults.value.length > 0 && (
        <ul class='nes-list'>
          <>
            {searchResults.value.map(({ title, url }) => (
              <li>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  <span>{title}</span>
                </a>
              </li>
            ))}

            <li>
              Powered by{" "}
              <a href='https://oramasearch.com/' target='_blank' rel='noopener noreferrer'>
                Orama
              </a>
              .
            </li>
          </>
        </ul>
      )}
    </>
  );
}
