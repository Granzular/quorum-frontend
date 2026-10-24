import { useRef } from "react";

type Props = {
  placeholder: string,
  filterParams?: string[],
  action: (query:string,filter?:string)=>void,
  className?: string
}

const SearchForm = ({placeholder="search here",filterParams,action,className=""}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const handleSubmit = ()=>{
    action(inputRef.current?.value ?? "", selectRef.current?.value);
  };

  return (
    <form role="search" onSubmit={(event)=>{event.preventDefault();handleSubmit()}} className={`${className} flex min-w-0 flex-col gap-2 sm:flex-row`}>
      <input
        onInput={handleSubmit}
        ref={inputRef}
        aria-label={placeholder}
        className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white p-2 text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        type="search"
        placeholder={placeholder}
      />
      {filterParams && filterParams.length > 0 && (
        <select
          onChange={handleSubmit}
          ref={selectRef}
          aria-label="Filter by level"
          className="rounded-xl border border-gray-300 bg-white p-2 text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <option value="">All levels</option>
          {filterParams.map((p)=> <option key={p} value={p}>{p}</option>)}
        </select>
      )}
    </form>
  )
}

export default SearchForm
