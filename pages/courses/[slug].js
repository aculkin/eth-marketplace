import { CourseHero, Curriculum, Keypoints } from '@components/ui/course'
import { Modal } from '@components/ui/common'
import { BaseLayout } from '@components/ui/layout'
import { getAllCourses } from '@content/courses/fetcher'

export default function Course({ course }) {
	return (
		<>
			<div className='py-4'>
				<CourseHero
					title={course.title}
					description={course.description}
					image={course.coverImage}
				/>
			</div>
			<Keypoints points={course.wsl} />
			<Curriculum locked={true} />
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
