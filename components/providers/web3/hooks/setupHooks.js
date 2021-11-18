import { handler as createAccountHook } from './accountHook'
import { handler as createNetworkHook } from './networkHook'
import { handler as createOwnedCoursesHook } from './ownedCoursesHook'
import { handler as createOwnedCourseHook } from './ownedCourseHook'
import { handler as createManagedCoursesHook } from './managedCoursesHook'

export const setupHooks = ({ web3, provider, contract }) => ({
	useAccount: createAccountHook(web3, provider),
	useNetwork: createNetworkHook(web3, provider),
	useOwnedCourses: createOwnedCoursesHook(web3, contract),
	useOwnedCourse: createOwnedCourseHook(web3, contract),
	useManagedCourses: createManagedCoursesHook(web3, contract)
})
