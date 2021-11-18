import { CourseHero, Curriculum, Keypoints } from '@components/ui/course'
import { Message, Modal } from '@components/ui/common'
import { BaseLayout } from '@components/ui/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { useAccount, useOwnedCourse } from '@components/hooks/web3'
import { useWeb3 } from '@components/providers'

export default function Course({ course }) {
	const { isLoading } = useWeb3()
	const { account } = useAccount()
	const { ownedCourse } = useOwnedCourse(course, account.data)
	const courseState = ownedCourse.data?.state
	const isLocked =
		!courseState || courseState === 'purchased' || courseState === 'deactivated'
	return (
		<>
			<div className='py-4'>
				<CourseHero
					hasOwner={!!ownedCourse.data}
					title={course.title}
					description={course.description}
					image={course.coverImage}
				/>
			</div>
			<Keypoints points={course.wsl} />
			<div className='max-w-5xl mx-auto'>
				{courseState === 'purchased' && (
					<Message type='warning'>
						Course is Purchased and waiting for activation: Process can take up
						to 24 hours
						<i className='block font-normal'>
							If you have any questions please contact info@email.com
						</i>
					</Message>
				)}
				{courseState === 'activated' && (
					<Message type='success'>
						Happy viewing, the course is activated and ready to be watched!
						<i className='block font-normal'>
							If you have any questions please contact info@email.com
						</i>
					</Message>
				)}
				{courseState === 'deactivated' && (
					<Message type='danger'>
						Course has been deactivated, due to the incorrect purchase data. the
						functionality to watch the course has been temporarily disabled.
						<i className='block font-normal'>Please contact info@email.com</i>
					</Message>
				)}
			</div>
			<Curriculum
				isLoading={isLoading}
				locked={isLocked}
				courseState={courseState}
			/>
			<Modal />
		</>
	)
}

export const getStaticProps = ({ params }) => {
	const { data } = getAllCourses()
	const course = data.find((c) => c.slug === params.slug)

	return {
		props: { course }
	}
}

export const getStaticPaths = () => {
	const { data } = getAllCourses()
	return {
		paths: data.map((c) => ({ params: { slug: c.slug } })),
		fallback: false
	}
}

Course.Layout = BaseLayout
