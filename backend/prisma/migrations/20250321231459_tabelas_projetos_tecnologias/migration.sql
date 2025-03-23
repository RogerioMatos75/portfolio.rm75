/*
  Warnings:

  - You are about to drop the column `createdAt` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `demoUrl` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `repoUrl` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `projects` table. All the data in the column will be lost.
  - The `imageUrl` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `category` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `technologies` table. All the data in the column will be lost.
  - Changed the type of `nivel` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `destaque` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `description` on table `technologies` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `destaque` on the `technologies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "technologies_name_key";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "createdAt",
DROP COLUMN "demoUrl",
DROP COLUMN "featured",
DROP COLUMN "repoUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "nivel",
ADD COLUMN     "nivel" INTEGER NOT NULL,
DROP COLUMN "destaque",
ADD COLUMN     "destaque" BOOLEAN NOT NULL,
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];

-- AlterTable
ALTER TABLE "technologies" DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "destaque",
ADD COLUMN     "destaque" BOOLEAN NOT NULL;
