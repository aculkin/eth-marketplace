import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { setupHooks } from './hooks/setupHooks'
import { loadContract } from '@utils/loadContract'

const Web3Context = createContext(null)

export const Web3Provider = ({ children }) => {
	const [web3Api, setWeb3Api] = useState({
		provider: null,
		web3: null,
		contract: null,
		isLoading: true,
		hooks: setupHooks()
	})
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider()
			if (provider) {
				const web3 = new Web3(provider)
				const contract = await loadContract('CourseMarketplace', web3)
				setWeb3Api((api) => ({
					...api,
					hooks: setupHooks(web3, provider),
					provider,
					contract,
					web3,
					isLoading: false
				}))
			} else {
				setWeb3Api((api) => ({ ...api, isLoading: false }))
			}
		}
		loadProvider()
	}, [])
	const _web3Api = useMemo(() => {
		const { web3, provider, isLoading } = web3Api
		return {
			...web3Api,
			requireInstall: !isLoading && !web3,
			connect: provider
				? async () => {
						try {
							await provider.request({ method: 'eth_requestAccounts' })
						} catch (error) {
							window.location.reload()
						}
				  }
				: () => {
						window.alert(
							'Cannot connect to Metamask, please refresh your browser'
						)
				  }
		}
	}, [web3Api])

	return (
		<Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
	)
}

export const useWeb3 = () => useContext(Web3Context)

export default Web3Provider

export const useHooks = (cb) => {
	const { hooks } = useWeb3()
	return cb(hooks)
}
