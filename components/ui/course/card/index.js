import Image from 'next/image'
import Link from 'next/link'

export const Card = ({ course, disabled, Footer }) => {
	return (
		<div
			key={course.id}
			className='bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'
		>
			<div className='flex h-full'>
				<div className='flex-1 h-full next-image-wrapper'>
					<Image
						height='230'
						width='200'
						layout='responsive'
						className={`object-cover ${disabled && 'filter grayscale'}`}
						src={course.coverImage}
						alt={course.title}
					/>
				</div>
				<div className='p-8 pb-4 flex-2'>
					<div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
						{course.type}
					</div>
					<Link href={`/courses/${course.slug}`}>
						<a className='h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline'>
							{course.title}
						</a>
					</Link>
					<p className='mt-2 text-sm sm:text-base text-gray-500'>
						{course.description?.substring(0, 70)}...
					</p>
					{Footer && <Footer />}
				</div>
			</div>
		</div>
	)
}

export default Card
