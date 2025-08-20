// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { getApiBalance, getApiPortfolio, getHealth } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseGetApiBalanceData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseGetApiBalanceKeyFn(clientOptions), queryFn: () => getApiBalance({ ...clientOptions }).then(response => response.data) });
export const ensureUseGetApiPortfolioData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseGetApiPortfolioKeyFn(clientOptions), queryFn: () => getApiPortfolio({ ...clientOptions }).then(response => response.data) });
export const ensureUseGetHealthData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseGetHealthKeyFn(clientOptions), queryFn: () => getHealth({ ...clientOptions }).then(response => response.data) });
