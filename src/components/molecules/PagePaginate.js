import React from 'react'
import ReactPaginate from 'react-paginate'

const PagePagination = ({ handlePageClick, pageCount }) => {
  return (
    <div className="w-full h-12 flex mt-5 shadow-sm">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<PaginateButton text="Next" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PaginateButton text="Previous" />}
        renderOnZeroPageCount={null}
        containerClassName={``}
        activeClassName={` font-semibold mx-2`}
        pageClassName="font-semibold text-black mx-2"
      />
    </div>
  )
}

function PaginateButton({ text }) {
  return (
    <button className={` mx-2 py-1 px-4 font-medium rounded-lg`}>{text}</button>
  )
}

export default PagePagination
