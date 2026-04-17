import { Book } from "@domains/entities/book";
import { C } from "@duplojs/utils";

interface Input<Generic extends Book.Entity> {
	book: Generic;
}

export const BookIsBorrowedUseCase = C.createUseCase(
	{},
	(__) => <
		Generic extends Book.Entity,
	>({ book }: Input<Generic>) => Book.isBorrowed(book),
);
