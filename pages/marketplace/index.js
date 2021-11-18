import { useState } from 'react'

import { CourseCard, CourseList } from '@components/ui/course'
import { BaseLayout } from '@components/ui/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useWalletInfo } from '@components/hooks/web3'
import { Button } from '@components/ui/common'
import { OrderModal } from '@components/ui/order'
import { MarketHeader } from '@components/ui/marketplace'
import { useWeb3 } from '@components/providers'

export default function Marketplace({ courses }) {
	const [selectedCourse, setSelectedCourse] = useState(null)
	const { web3, contract } = useWeb3()
	const { canPurchaseCourse, account } = useWalletInfo()

	const purchaseCourse = async (order) => {
		const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)

		const orderHash = web3.utils.soliditySha3(
			{
				type: 'bytes16',
				value: hexCourseId
			},
			{
				type: 'address',
				value: account.data
			}
		)

		const emailHash = web3.utils.sha3(order.email)

		const proof = web3.utils.soliditySha3(
			{ type: 'bytes32', value: emailHash },
			{ type: 'bytes32', value: orderHash }
		)

		const value = web3.utils.toWei(String(order.price))
		try {
			const result = await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value })
			setSelectedCourse(null)
		} catch (error) {
			console.log('Purchase course: Operation has failed.')
			console.log(error)
		}
	}

	return (
		<>
			<MarketHeader />
			<CourseList courses={courses}>
				{(course) => (
					<CourseCard
						course={course}
						disabled={!canPurchaseCourse}
						key={course.id}
						Footer={() => (
							<div className='mt-3'>
								<Button
									variant='lightPurple'
									disabled={!canPurchaseCourse}
									hoverable={canPurchaseCourse ? true : false}
									onClick={() => setSelectedCourse(course)}
								>
									{canPurchaseCourse ? 'Purchase' : 'Unable to purchase'}
								</Button>
							</div>
						)}
					/>
				)}
			</CourseList>
			{selectedCourse && (
				<OrderModal
					onSubmit={purchaseCourse}
					course={selectedCourse}
					onClose={() => setSelectedCourse(null)}
				/>
			)}
		</>
	)
}

export const getStaticProps = () => {
	const { data } = getAllCourses()

	return {
		props: { courses: data }
	}
}

Marketplace.Layout = BaseLayout
