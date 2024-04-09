export default function Pagination({className, prevPageUrl, nextPageUrl, currentPage, totalPages}) {
    return (
        <div className={`join ${className} ${currentPage === 1 && currentPage === totalPages ? 'hidden' : ''}`}>
            <a href={prevPageUrl} className="join-item btn lg:btn-md btn-sm" disabled={prevPageUrl === null}>«</a>
            <a className="join-item btn btn-primary lg:btn-md btn-sm">Page {currentPage} of {totalPages}</a>
            <a href={nextPageUrl} className="join-item btn lg:btn-md btn-sm" disabled={nextPageUrl === null}>»</a>
        </div>
    );
}