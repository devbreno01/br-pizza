
import { getToken } from "@/lib/auth";
import { Orders } from "@/components/dashboard/orders";

import { apiClient } from "@/lib/api";
import { PaginatedOrders } from "@/lib/types";
import { PaginationControl } from "@/components/dashboard/pagination-control";
import { redirect } from "next/navigation";

export default async function Dashboard({ searchParams }: {
    searchParams: Promise<{ page?: string; limit?: string }>;
}) {
    const params = await searchParams;
    const query = new URLSearchParams({
        draft: "false",
        status: "false",
        page: params.page ?? "1",
        limit: params.limit ?? "10"
    });
    const token = await getToken();
    const { listOrders, page, limit, totalPages } = await apiClient<PaginatedOrders>(`/orders?${query}`, {
        token,
        cache: "no-store"
    });

    if (page > Math.max(totalPages, 1)) {
        redirect(`/dashboard?page=${Math.max(totalPages, 1)}&limit=${limit}`);
    }

    return (
          <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                              <h1 className="text-2xl sm:text-3xl font-bold text-white">Pedidos</h1>
                              <p className="text-sm sm:text-base mt-1">Gerencie seus pedidos</p>
                        </div>
                  </div>
                  <Orders orders={listOrders} token={token!} />
                  <PaginationControl currentPage={page} totalPages={totalPages} />
          </div>
    )
}