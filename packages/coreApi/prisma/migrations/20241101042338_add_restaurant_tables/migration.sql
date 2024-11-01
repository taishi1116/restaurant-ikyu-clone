/*
  Warnings:

  - You are about to drop the column `birthDay` on the `guests` table. All the data in the column will be lost.
  - You are about to drop the column `birthMonth` on the `guests` table. All the data in the column will be lost.
  - You are about to drop the column `birthYear` on the `guests` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `guests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_id]` on the table `guests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `guests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_day` to the `guests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_month` to the `guests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_year` to the `guests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_code` to the `guests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanTimeZone" AS ENUM ('DINNER', 'LUNCH');

-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('MANAGER', 'STAFF');

-- AlterTable
ALTER TABLE "guests" DROP COLUMN "birthDay",
DROP COLUMN "birthMonth",
DROP COLUMN "birthYear",
DROP COLUMN "postCode",
ADD COLUMN     "auth_id" TEXT NOT NULL,
ADD COLUMN     "birth_day" INTEGER NOT NULL,
ADD COLUMN     "birth_month" INTEGER NOT NULL,
ADD COLUMN     "birth_year" INTEGER NOT NULL,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "post_code" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "auth_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "auth_id" TEXT NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "building" TEXT,
    "nearest_station" TEXT,
    "access" TEXT NOT NULL,
    "closed_day" TEXT NOT NULL,
    "service_charge_rate" DOUBLE PRECISION NOT NULL,
    "cover_charge" INTEGER NOT NULL,
    "introduction_title" CHAR(35) NOT NULL,
    "introduction_content" CHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants_stripe" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "stripe_id" TEXT NOT NULL,

    CONSTRAINT "restaurants_stripe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants_images" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "image" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants_features" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "title" CHAR(35) NOT NULL,
    "description" CHAR(200) NOT NULL,
    "image" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods_master" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_methods_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants_payment_methods" (
    "restaurant_id" UUID NOT NULL,
    "payment_method_master_id" UUID NOT NULL,

    CONSTRAINT "restaurants_payment_methods_pkey" PRIMARY KEY ("restaurant_id","payment_method_master_id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "time_zone" "PlanTimeZone" NOT NULL,
    "menu" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cources" (
    "id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cources_dates" (
    "id" UUID NOT NULL,
    "cource_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,

    CONSTRAINT "cources_dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_auth_id_key" ON "admins"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_auth_id_key" ON "employees"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_name_key" ON "restaurants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_stripe_restaurant_id_key" ON "restaurants_stripe"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_stripe_stripe_id_key" ON "restaurants_stripe"("stripe_id");

-- CreateIndex
CREATE INDEX "restaurants_payment_methods_restaurant_id_idx" ON "restaurants_payment_methods"("restaurant_id");

-- CreateIndex
CREATE INDEX "plans_restaurant_id_idx" ON "plans"("restaurant_id");

-- CreateIndex
CREATE INDEX "cources_plan_id_idx" ON "cources"("plan_id");

-- CreateIndex
CREATE INDEX "cources_dates_cource_id_idx" ON "cources_dates"("cource_id");

-- CreateIndex
CREATE UNIQUE INDEX "guests_auth_id_key" ON "guests"("auth_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants_stripe" ADD CONSTRAINT "restaurants_stripe_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants_images" ADD CONSTRAINT "restaurants_images_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants_features" ADD CONSTRAINT "restaurants_features_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants_payment_methods" ADD CONSTRAINT "restaurants_payment_methods_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants_payment_methods" ADD CONSTRAINT "restaurants_payment_methods_payment_method_master_id_fkey" FOREIGN KEY ("payment_method_master_id") REFERENCES "payment_methods_master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cources" ADD CONSTRAINT "cources_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cources_dates" ADD CONSTRAINT "cources_dates_cource_id_fkey" FOREIGN KEY ("cource_id") REFERENCES "cources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
