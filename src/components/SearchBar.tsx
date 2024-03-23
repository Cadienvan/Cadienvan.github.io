import { useSignal } from "@preact/signals";
import searchDB from "../search/index";

export default function Counter() {
  const searchResults = useSignal([] as { title: string; url: string }[]);

  async function search(e) {
    const term = e.target.value;
    if (term.length < 2) {
      searchResults.value = [];
      return;
    }
    const results = await searchDB(term);
    searchResults.value = results.map(r => r.document);
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
