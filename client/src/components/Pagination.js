import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

        {pageNumbers.map(number => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))} 

        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        />
        <Pagination.Last
          onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
          disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        />
      </ul>
    </nav>
  );
};

export default CustomPagination;
