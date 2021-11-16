const SPINNER_SIZES = {
	sm: 'w-15',
	md: 'w-23',
	lg: 'w-30'
}

const BALL_SIZES = {
	sm: 'w-2 h-2',
	md: 'w-4 h-4',
	lg: 'w-8 h-8'
}

export const Loader = ({ size = 'md' }) => {
	return (
		<div className={`spinner ${SPINNER_SIZES[size]}`}>
			{Array.from({ length: 3 }).map((_, i) => {
				return (
					<div key={i} className={`bounce${i + 1} ${BALL_SIZES[size]}`}></div>
				)
			})}
		</div>
	)
}
export default Loader
