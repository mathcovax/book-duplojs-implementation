import { BookRepository, ClientRepository } from "@applications/repositories";
import { clientGiveBackBook } from "@domains/aggregates/clientGiveBackBook";
import { type Book } from "@domains/entities/book";
import { type Client } from "@domains/entities/client";
import { C, E, F, promiseObject } from "@duplojs/utils";

interface Input {
	client: Client.Entity;
	book: Book.Entity & Book.Borrow;
}

export const GiveBackBook = C.createUseCase(
	{
		BookRepository,
		ClientRepository,
	},
	({
		bookRepository,
		clientRepository,
	}) => F.toFunction(
		function *(input: Input) {
			const { client, book } = yield *F.breakIf(
				clientGiveBackBook(
					input.client,
					input.book,
				),
				E.isLeft,
			);

			return promiseObject({
				client: clientRepository.save(client),
				book: bookRepository.save(book),
			});
		},
	),
);
