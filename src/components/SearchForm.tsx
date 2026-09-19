import { useRef } from "react";

type Props = {
  placeholder: string,
  filterParams?: string[],
  action: (query:string,filter?:string)=>void,
  className?: string
}

const SearchForm = ({placeholder="search here",filterParams,action,className}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const handleSubmit = ()=>{
    if (inputRef!==null){
      const query:string|undefined =  inputRef.current?.value;
      const filter:string|undefined = selectRef.current?.value;
    action(query || "",filter);
    }
  };

  return (
              <form onSubmit={(event)=>{event.preventDefault();handleSubmit()}} className={className +' flex '}>
            <div className='relative rounded-xl p-0 focus-within:border-blue-600 focus-within:border-2 w-/10 gap-0.5'>
                 <input onInput={handleSubmit} ref={inputRef} className=' bg-white p-2 rounded-xl focus:outline-none top-1/2' type='text' placeholder={placeholder}/>
                  <select onChange={handleSubmit} ref={selectRef} className='absolute right-1 rounded bg-white border h-2/3 self-center ml-2 hover:text-blue-600'>
                <option key="0" value="">filter</option>
                {filterParams?.map((p)=> <option key={p} value={p}>{p}</option>)}
            </select>
            </div>
           </form>
  )
}

export default SearchForm