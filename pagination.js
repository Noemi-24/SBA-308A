export class Paginator {
    constructor(itemsPerPage = 9) {
        this.allItems = [];
        this.currentPage = 0;
        this.itemsPerPage = itemsPerPage;
    }

    setItems(items) {
        this.allItems = items;
        this.currentPage = 0;
    }

    getCurrentPageItems() {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.allItems.slice(start, end);
    }

    getTotalPages() {
        return Math.ceil(this.allItems.length / this.itemsPerPage);
    }

    nextPage() {
        if (this.currentPage < this.getTotalPages() - 1) {
            this.currentPage++;
            return true;
        }
        return false;
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            return true;
        }
        return false;
    }

    goToPage(pageNum) {
        if (pageNum >= 0 && pageNum < this.getTotalPages()) {
            this.currentPage = pageNum;
            return true;
        }
        return false;
    }

    getPageInfo() {
        return {
            current: this.currentPage + 1,
            total: this.getTotalPages(),
            showing: this.getCurrentPageItems().length,
            totalItems: this.allItems.length
        };
    }
}

export function createPaginationControls(paginator, onPageChange) {
    const info = paginator.getPageInfo();
    
    return `
        <nav aria-label="Dog breeds pagination" class="mt-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="mb-0 text-muted">
                Showing ${info.showing} breeds (Page ${info.current} of ${info.total})
                </p>
            </div>
            <ul class="pagination justify-content-center">
                <li class="page-item ${paginator.currentPage === 0 ? 'disabled' : ''}">
                <button class="page-link" id="prev-page" ${paginator.currentPage === 0 ? 'disabled' : ''}>
                    Previous
                </button>
                </li>
                <li class="page-item active">
                <span class="page-link">${info.current}</span>
                </li>
                <li class="page-item ${paginator.currentPage >= info.total - 1 ? 'disabled' : ''}">
                <button class="page-link" id="next-page" ${paginator.currentPage >= info.total - 1 ? 'disabled' : ''}>
                    Next
                </button>
                </li>
            </ul>
        </nav>
    `;
}