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
	const { web3 } = useWeb3()
	const { canPurchaseCourse } = useWalletInfo()

	const purchaseCourse = (order) => {
		alert(JSON.stringify(order))
	}

	return (
		<>
			<div className='pt-4'>
				<MarketHeader />
			</div>
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
