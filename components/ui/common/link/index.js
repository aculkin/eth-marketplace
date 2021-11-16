import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export const ActiveLink = ({ children, activeLinkClass, ...props }) => {
	const { pathname } = useRouter()
	let className = children.props.className || ''

	if (pathname === props.href) {
		className = `${className} ${
			activeLinkClass
				? activeLinkClass
				: 'text-indigo-600 hover:text-indigo-400'
		}`
	}

	return <Link {...props}>{React.cloneElement(children, { className })}</Link>
}

export default ActiveLink
