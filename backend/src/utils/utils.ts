export function parsePageQuery (pageQuery: unknown){
    if(typeof pageQuery === 'string'){
        const parsed = parseInt(pageQuery,10);
        return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
    }
    return 1;
}


export function parseLimitQuery (limitQuery: unknown){
    if(typeof limitQuery === 'string'){
        const parsed = parseInt(limitQuery,10);
        return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, 100) : 10;
    }
    return 10;
}

export interface Pagination {
    page: number;
    limit: number;
}

export function parsePagination(query: { page?: unknown; limit?: unknown }): Pagination {
    const limit = parseLimitQuery(query.limit);
    const maxPage = Math.floor(2_147_483_647 / limit) + 1;
    return { page: Math.min(parsePageQuery(query.page), maxPage), limit };
}

export function paginationOffset({ page, limit }: Pagination) {
    return { skip: (page - 1) * limit, take: limit };
}

export function paginationMetadata(pagination: Pagination, total: number) {
    return { ...pagination, totalPages: Math.ceil(total / pagination.limit) };
}
