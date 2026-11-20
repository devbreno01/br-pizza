BEGIN;

CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "business_cnpj_key" ON "business"("cnpj");

ALTER TABLE "users" ADD COLUMN "id_pizza_place" TEXT;
ALTER TABLE "categories" RENAME COLUMN "user_id" TO "legacy_owner_id";
ALTER TABLE "categories" RENAME CONSTRAINT "categories_user_id_fkey" TO "categories_legacy_owner_id_fkey";
ALTER INDEX "categories_user_id_idx" RENAME TO "categories_legacy_owner_id_idx";
ALTER TABLE "categories" ADD COLUMN "business_id" TEXT;
ALTER TABLE "products" ADD COLUMN "business_id" TEXT;
ALTER TABLE "orders" ADD COLUMN "business_id" TEXT;

CREATE INDEX "users_id_pizza_place_idx" ON "users"("id_pizza_place");
CREATE INDEX "categories_business_id_idx" ON "categories"("business_id");
CREATE INDEX "products_business_id_idx" ON "products"("business_id");
CREATE INDEX "orders_business_id_idx" ON "orders"("business_id");

ALTER TABLE "users" ADD CONSTRAINT "users_id_pizza_place_fkey" FOREIGN KEY ("id_pizza_place") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "categories" ADD CONSTRAINT "categories_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
