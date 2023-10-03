import SearchResults from "./search-results/search-results";
import { useState } from "react";

interface SearchProps {}

export default function Search({}: SearchProps) {
  //What the user has entered in the search field.
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div>
      <input
        placeholder="Search"
        value={searchInput}
        onChange={({ target: { value: searchInput } }) => {
          setSearchInput(searchInput);
        }}
      />
      <SearchResults searchQuery={searchInput} />
    </div>
  );
}
