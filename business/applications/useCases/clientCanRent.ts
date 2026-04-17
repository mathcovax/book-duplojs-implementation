import { Client } from "@domains/entities/client";
import { C } from "@duplojs/utils";

interface Input<Generic extends Client.Entity> {
	client: Generic;
}

export const ClientCanRent = C.createUseCase(
	{},
	(__) => <
		Generic extends Client.Entity,
	>({ client }: Input<Generic>) => Client.cantRent(client),
);
