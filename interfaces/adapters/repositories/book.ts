import { BookRepository } from "@applications/repositories";

export const bookRepository = BookRepository.createImplementation({
	save(book) {
		return Promise.resolve(book);
	},
});
