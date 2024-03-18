import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({book}) {
  return (
     <div className='group relative w-full border border-teal-500 hover:border-2 h-[150px] overflow-hidden rounded-lg sm:w-[400px] transition-all'>
      <Link to={`/books/${book.filename}`}>
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{book.title}</p>
        <Link
          to={`/books/${book.filename}`}
          className='z-10 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Go to Book
        </Link>
      </div>
    </div>
  )
}

export default BookCard