import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages).keys()].slice(1);
    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }
    return (
        <Pagination>
            {/* <Pagination.First /> */}
            <Pagination.Prev onClick={prevPage} />
            {
                pageNumbers.map(page => <Pagination.Item active={currentPage === page} onClick={() => setCurrentPage(page)} key={page}>{page}</Pagination.Item>)
            }
            <Pagination.Next onClick={nextPage} />
            {/* <Pagination.Last /> */}
        </Pagination>
    );
};

export default PaginationComp;