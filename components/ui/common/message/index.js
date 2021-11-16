import { useState } from 'react'

const TYPES = {
	info: 'blue',
	success: 'green',
	warning: 'yellow',
	danger: 'red'
}

export const Message = ({ children, type = 'info' }) => {
	const [isDisplayed, setIsDisplayed] = useState(true)

	if (!isDisplayed) {
		return null
	}

	const messageType = TYPES[type]

	return (
		<div className={`bg-${messageType}-100 rounded-xl mb-3`}>
			<div className='max-q-7xl mx-auto py-3 px-3 sm:px-3 lg:pg-3'>
				<div className='flex items-center justify-between flex-wrap'>
					<div className='w-0 flex-1 flex items-center'>
						<p className={`ml-3 font-edium text-${messageType}-900 truncate`}>
							<span className='hidden md:inline'>{children}</span>
						</p>
					</div>
					<div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
						<button
							onClick={() => setIsDisplayed(false)}
							type='button'
							className='-mr-1 flex p-2 rounded-md hover:outline-none hover:ring-2 focus:outline-none focus:ring-2 sm:-mr-2'
						>
							<span className='sr-only'>Dismiss</span>
							<svg
								className={`h-6 w-6 text-${messageType}-900`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Message
