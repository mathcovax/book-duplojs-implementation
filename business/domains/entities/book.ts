import { C, DPE } from "@duplojs/utils";
import { Client } from "./client";

export namespace Book {
	export const Id = C.createNewType("BookId", DPE.string(), C.Uuid);
	export type Id = C.GetNewType<typeof Id>;

	export const Name = C.createNewType("BookName", DPE.string());
	export type Name = C.GetNewType<typeof Name>;

	export const Entity = C.createEntity(
		"Book",
		({ nullable }) => ({
			id: Id,
			name: Name,
			currentBorrowerId: nullable(Client.Id),
		}),
	);
	export type Entity = C.GetEntity<typeof Entity>;

	export const Borrow = C.createFlag<
		Entity,
		"Borrow",
		{ currentBorrowerId: Client.Id }
	>("Borrow");
	export type Borrow = C.GetFlag<typeof Borrow>;

	export const Available = C.createFlag<Entity, "Available">("Available");
	export type Available = C.GetFlag<typeof Available>;

	export function isBorrowed<T extends Entity>(book: T) {
		if (book.currentBorrowerId !== null) {
			return Borrow.append(
				book,
				{ currentBorrowerId: book.currentBorrowerId },
			);
		}

		return Available.append(book);
	}
}
