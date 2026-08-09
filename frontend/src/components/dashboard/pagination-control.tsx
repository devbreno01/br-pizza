"use client"

import { usePathname , useRouter, useSearchParams } from "next/navigation"; 
import {
    Pagination, 
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious
} from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number , 
    totalPages: number
}



export function PaginationControl({currentPage, totalPages}: PaginationProps){
    const router = useRouter(); 
    const pathName = usePathname();
    const searchParams = useSearchParams(); 
    
    const createPageUrl = (pageNumber: number ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString()); 
        return `${pathName}?${params.toString()}`;
    }

    if(totalPages <= 1 ) return null; 

    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                    href={createPageUrl(currentPage - 1)}
                    aria-disabled={currentPage <= 1 }
                    tabIndex={currentPage <= 1 ? -1 : undefined}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}/>  
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                href={createPageUrl(page)}
                                isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }

                    if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return null;
                })}

                <PaginationItem> 
                    <PaginationNext 
                        href={createPageUrl(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? -1 : undefined}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )


}