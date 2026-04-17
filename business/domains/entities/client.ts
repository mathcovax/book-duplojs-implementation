import { A, C, DPE, O, pipe } from "@duplojs/utils";
import { Book } from "./book";

export namespace Client {
	export const Id = C.createNewType("ClientId", DPE.string(), C.Uuid);
	export type Id = C.GetNewType<typeof Id>;

	export const Entity = C.createEntity(
		"Client",
		({ structure, nullable }) => ({
			id: Id,
			borrowedBooks: structure({
				one: nullable(Book.Id),
				two: nullable(Book.Id),
				three: nullable(Book.Id),
				four: nullable(Book.Id),
				five: nullable(Book.Id),
			}),
		}),
	);
	export type Entity = C.GetEntity<typeof Entity>;

	export const CanRent = C.createFlag<
		Entity,
		"CanRent",
		{ location: keyof Entity["borrowedBooks"] }
	>("CanRent");
	export type CanRent = C.GetFlag<typeof CanRent>;

	export const CanNotRent = C.createFlag<Entity, "CanNotRent">("CanNotRent");
	export type CanNotRent = C.GetFlag<typeof CanNotRent>;

	export function cantRent<T extends Entity>(client: T) {
		const availableLocation = pipe(
			O.entries(client.borrowedBooks),
			A.reduce(
				A.reduceFrom(null),
				({ element: [key, bookId], exit, next }) => bookId === null
					? exit(key)
					: next(null),
			),
		);

		if (availableLocation) {
			return CanRent.append(
				client,
				{ location: availableLocation },
			);
		}

		return CanNotRent.append(client);
	}
}
