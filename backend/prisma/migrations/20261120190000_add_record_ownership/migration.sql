ALTER TABLE "categories" ADD COLUMN "user_id" TEXT;
ALTER TABLE "orders" ADD COLUMN "user_id" TEXT;

CREATE INDEX "categories_user_id_idx" ON "categories"("user_id");
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
