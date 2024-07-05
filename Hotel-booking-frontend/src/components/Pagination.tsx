
type Props = {
  page : number,
  pages : number,
  onPageChange : (page : number) => void,
}

const Pagination = ({page , pages , onPageChange} : Props) => {
const  pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
          {pageNumbers.map(PageNum => 

    <li className={`border border-x-slate-300  text-center cursor-pointer px-2 py-1 ${PageNum === page ? "bg-gray-400" : ""}`}>
      <button onClick={() => onPageChange(PageNum)}>{PageNum}</button>
    </li>
          )}
      </ul>
    </div>
  )
}

export default Pagination;