import { type Book } from "@domains/entities/book";
import { C } from "@duplojs/utils";

export interface BookRepository {
	save<T extends Book.Entity>(entity: T): Promise<T>;
}

export const BookRepository = C.createRepository<BookRepository>();
