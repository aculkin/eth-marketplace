import { createAccountHook } from './createAccountHook'
import { createNetworkHook } from './createNetworkHook'

export const setupHooks = (web3, provider) => ({
	useAccount: createAccountHook(web3, provider),
	useNetwork: createNetworkHook(web3, provider)
})
