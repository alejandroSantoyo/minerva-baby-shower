-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "guest" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT,
    "totalPasses" INTEGER NOT NULL DEFAULT 2,
    "confirmedPasses" INTEGER,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_slug_key" ON "Invitation"("slug");
