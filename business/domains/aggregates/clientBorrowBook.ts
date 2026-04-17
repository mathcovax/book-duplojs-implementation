import { Book, Client } from "@domains/entities";
import { O, pipe } from "@duplojs/utils";

export function clientBorrowBook(
	client: Client.Entity & Client.CanRent,
	book: Book.Entity & Book.Available,
) {
	const borrowedBook = pipe(
		book,
		Book.Entity.update({ currentBorrowerId: client.id }),
		Book.Borrow.append({ currentBorrowerId: client.id }),
	);

	const { location } = Client.CanRent.getValue(client);
	const updatedClient = pipe(
		client,
		Client.Entity.update({
			borrowedBooks: O.override(
				client.borrowedBooks,
				{ [location]: book.id },
			),
		}),
	);

	return {
		book: borrowedBook,
		client: updatedClient,
	};
}
