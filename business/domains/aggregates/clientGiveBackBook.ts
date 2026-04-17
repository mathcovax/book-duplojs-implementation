import { Book, Client } from "@domains/entities";
import { A, C, E, O, pipe } from "@duplojs/utils";

export function clientGiveBackBook(
	client: Client.Entity,
	book: Book.Entity & Book.Borrow,
) {
	const { currentBorrowerId } = Book.Borrow.getValue(book);

	if (!C.equal(client.id, currentBorrowerId)) {
		return E.left("client-is-not-borrower", {
			client,
			book,
		});
	}

	const location = pipe(
		O.entries(client.borrowedBooks),
		A.reduce(
			A.reduceFrom(null),
			({ element: [key, bookId], next, exit }) => C.equal(bookId, book.id)
				? exit(key)
				: next(null),
		),
	);

	if (location === null) {
		return E.left("client-have-not-book", {
			client,
			book,
		});
	}

	const updatedClient = pipe(
		client,
		Client.Entity.update({
			borrowedBooks: O.override(
				client.borrowedBooks,
				{ [location]: null },
			),
		}),
	);

	const availableBook = pipe(
		book,
		Book.Entity.update({ currentBorrowerId: null }),
		Book.Available.append,
	);

	return {
		client: updatedClient,
		book: availableBook,
	};
}
