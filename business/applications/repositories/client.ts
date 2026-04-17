import { type Client } from "@domains/entities/client";
import { C } from "@duplojs/utils";

export interface ClientRepository {
	save<T extends Client.Entity>(entity: T): Promise<T>;
}

export const ClientRepository = C.createRepository<ClientRepository>();
