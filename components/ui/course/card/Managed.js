import Image from 'next/image'
import Link from 'next/link'

const STATE_COLORS = {
	purchased: 'indigo',
	activated: 'green',
	deactivated: 'red'
}
const Item = ({ title, value }) => (
	<div className='bg-gray-50 px-4 py-5 sm:px-6'>
		<div className='text-sm font-medium text-gray-500'>{title}</div>
		<div className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
			{value}
		</div>
	</div>
)

export default function ManagedCourseCard({ children, course }) {
	const { title, price, ownedCourseId, proof, state, owner } = course
	return (
		<div className='bg-white border shadow overflow-hidden sm:rounded-lg mb-3'>
			<div className='border-t border-gray-200'>
				<Item title='Course ID' value={ownedCourseId} />
				<Item title='Proof' value={proof} />
				<Item title='Owner' value={owner} />
				<Item title='Price' value={price} />
				<Item title='State' value={state} />
				<div className='bg-white px-4 py-5 sm:px-6'>{children}</div>
			</div>
		</div>
	)
}
