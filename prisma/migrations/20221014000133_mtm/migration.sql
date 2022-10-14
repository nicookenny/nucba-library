-- CreateTable
CREATE TABLE "_categories_books" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categories_books_AB_unique" ON "_categories_books"("A", "B");

-- CreateIndex
CREATE INDEX "_categories_books_B_index" ON "_categories_books"("B");

-- AddForeignKey
ALTER TABLE "_categories_books" ADD CONSTRAINT "_categories_books_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories_books" ADD CONSTRAINT "_categories_books_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
