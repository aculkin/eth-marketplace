import { Button, Message } from '@components/ui/common'
import { CourseFilter, OwnedCourseCard } from '@components/ui/course'
import { BaseLayout } from '@components/ui/layout'
import { MarketHeader } from '@components/ui/marketplace'

export const OwnedCourses = () => {
	return (
		<>
			<div className='pt-4'>
				<MarketHeader />
			</div>
			<section className='grid grid-cols-1'>
				<OwnedCourseCard>
					<Message type='success'>Purchased!</Message>
					<Button>Watch the Course</Button>
				</OwnedCourseCard>
			</section>
		</>
	)
}

export default OwnedCourses

OwnedCourses.Layout = BaseLayout
