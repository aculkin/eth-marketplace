import createCourseHash from '@utils/hash'
import { normalizeOwnedCourse } from '@utils/normalize'
import useSWR from 'swr'

export const handler =
	(web3, contract) => (course, account) => {
		const swrRes = useSWR(
			() =>
				web3 && contract && account ? `web3/ownedCourse/${account}` : null,
			async () => {
				try {
					console.log('in the hook', course.id, account)
					const courseHash = createCourseHash(web3)(course.id, account)
					const ownedCourse = await contract.methods
						.getCourseByHash(courseHash)
						.call()
					if (
						ownedCourse.owner === '0x0000000000000000000000000000000000000000'
					) {
						return null
					}
					return normalizeOwnedCourse(web3)(course, ownedCourse)
				} catch (error) {
					console.log(error)
				}
			}
		)
		return swrRes
	}

export default handler
