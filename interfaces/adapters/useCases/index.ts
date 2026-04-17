import { useCaseInstances } from "@duplojs/utils/clean";
import * as UseCase from "@applications/useCases";
import * as Repositories from "@adapters/repositories";

export const useCase = useCaseInstances(
	{
		...UseCase,
	},
	{
		...Repositories,
	},
);
