/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import useSWR from 'swr'

const adminAddresses = {
	'0x5c9edaa2d11bcb3dfad77e8f72b2328ff137a79885a9ea7bb16387911a79a57a': true
}

export const createAccountHook = (web3, provider) => () => {
	const { data, mutate, ...rest } = useSWR(
		() => (web3 ? 'web3/accounts' : null),
		async () => {
			const accounts = await web3.eth.getAccounts()
			return accounts[0]
		}
	)

	useEffect(() => {
		provider &&
			provider.on('accountsChanged', (accounts) => mutate(accounts[0] ?? null))
	}, [provider])

	return {
		data,
		isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
		mutate,
		...rest
	}
}
