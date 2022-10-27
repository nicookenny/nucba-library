-- DropForeignKey
ALTER TABLE "categories_books" DROP CONSTRAINT "categories_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "categories_books" DROP CONSTRAINT "categories_books_categoryID_fkey";

-- AddForeignKey
ALTER TABLE "categories_books" ADD CONSTRAINT "categories_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_books" ADD CONSTRAINT "categories_books_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
