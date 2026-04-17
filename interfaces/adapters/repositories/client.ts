import { ClientRepository } from "@applications/repositories";

export const clientRepository = ClientRepository.createImplementation({
	save(client) {
		return Promise.resolve(client);
	},
});
