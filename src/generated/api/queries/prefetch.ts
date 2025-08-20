// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { getApiBalance, getApiPortfolio, getApiStocksSearch, getHealth } from "../requests/services.gen";
import { GetApiStocksSearchData } from "../requests/types.gen";
import * as Common from "./common";
export const prefetchUseGetApiBalance = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGetApiBalanceKeyFn(clientOptions), queryFn: () => getApiBalance({ ...clientOptions }).then(response => response.data) });
export const prefetchUseGetApiPortfolio = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGetApiPortfolioKeyFn(clientOptions), queryFn: () => getApiPortfolio({ ...clientOptions }).then(response => response.data) });
export const prefetchUseGetApiStocksSearch = (queryClient: QueryClient, clientOptions: Options<GetApiStocksSearchData, true>) => queryClient.prefetchQuery({ queryKey: Common.UseGetApiStocksSearchKeyFn(clientOptions), queryFn: () => getApiStocksSearch({ ...clientOptions }).then(response => response.data) });
export const prefetchUseGetHealth = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGetHealthKeyFn(clientOptions), queryFn: () => getHealth({ ...clientOptions }).then(response => response.data) });
