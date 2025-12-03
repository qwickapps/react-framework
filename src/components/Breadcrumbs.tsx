import React from 'react';

export interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: React.ReactNode;
	current?: boolean;
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	separator?: React.ReactNode;
	className?: string;
	onNavigate?: (item: BreadcrumbItem, index: number) => void;
	maxItems?: number;
	showRoot?: boolean;
}

/**
 * Generic Breadcrumbs component for navigation hierarchy
 * 
 * Features:
 * - Accessible navigation with proper ARIA labels
 * - Customizable separators and icons
 * - Responsive design with item truncation
 * - Support for custom navigation handlers
 * - Keyboard navigation support
 * - Screen reader friendly
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	items,
	separator = '/',
	className = '',
	onNavigate,
	maxItems,
	showRoot = true
}) => {
	// Filter and prepare items
	let displayItems = showRoot ? items : items.slice(1);
	
	// Handle max items with ellipsis
	if (maxItems && displayItems.length > maxItems) {
		const firstItems = displayItems.slice(0, 1);
		const lastItems = displayItems.slice(-Math.max(1, maxItems - 2));
		displayItems = [
			...firstItems,
			{ label: '...', href: undefined, current: false },
			...lastItems
		];
	}

	const handleItemClick = (e: React.MouseEvent, item: BreadcrumbItem, index: number) => {
		if (onNavigate) {
			e.preventDefault();
			onNavigate(item, index);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent, item: BreadcrumbItem, index: number) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (onNavigate) {
				onNavigate(item, index);
			} else if (item.href) {
				window.location.href = item.href;
			}
		}
	};

	if (displayItems.length <= 1) {
		return null;
	}

	return (
		<nav
			className={`breadcrumbs ${className}`}
			role="navigation"
			aria-label="Breadcrumb navigation"
			style={{
				display: 'flex',
				alignItems: 'center',
				fontSize: '14px',
				color: '#6b7280',
				...defaultStyles.nav
			}}
		>
			<ol 
				style={{
					display: 'flex',
					alignItems: 'center',
					listStyle: 'none',
					margin: 0,
					padding: 0,
					gap: '8px'
				}}
			>
				{displayItems.map((item, index) => {
					const isLast = index === displayItems.length - 1;
					const isClickable = (item.href || onNavigate) && !item.current && item.label !== '...';

					return (
						<li key={`${item.label}-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
							{isClickable ? (
								<a
									href={item.href}
									onClick={(e) => handleItemClick(e, item, index)}
									onKeyDown={(e) => handleKeyDown(e, item, index)}
									style={{
										...defaultStyles.link,
										color: isLast ? '#374151' : '#6b7280',
										textDecoration: 'none',
										display: 'flex',
										alignItems: 'center',
										gap: '4px'
									}}
									tabIndex={0}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.icon && (
										<span 
											style={{ display: 'flex', alignItems: 'center' }}
											aria-hidden="true"
										>
											{item.icon}
										</span>
									)}
									<span>{item.label}</span>
								</a>
							) : (
								<span
									style={{
										...defaultStyles.current,
										color: isLast ? '#111827' : '#6b7280',
										fontWeight: isLast ? 600 : 400,
										display: 'flex',
										alignItems: 'center',
										gap: '4px'
									}}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.icon && (
										<span 
											style={{ display: 'flex', alignItems: 'center' }}
											aria-hidden="true"
										>
											{item.icon}
										</span>
									)}
									<span>{item.label}</span>
								</span>
							)}

							{!isLast && (
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
										marginLeft: '8px',
										color: '#d1d5db',
										fontSize: '12px'
									}}
									aria-hidden="true"
								>
									{separator}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

// Default styles
const defaultStyles = {
	nav: {
		padding: '8px 0'
	},
	link: {
		transition: 'color 0.2s ease',
		cursor: 'pointer',
		borderRadius: '4px',
		padding: '4px',
		margin: '-4px'
	},
	current: {
		padding: '4px'
	}
} as const;

/**
 * Hook for managing breadcrumb state
 */
export const useBreadcrumbs = () => {
	const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

	const addBreadcrumb = React.useCallback((item: BreadcrumbItem) => {
		setBreadcrumbs(prev => [...prev, item]);
	}, []);

	const removeBreadcrumb = React.useCallback((index: number) => {
		setBreadcrumbs(prev => prev.filter((_, i) => i !== index));
	}, []);

	const setBreadcrumbsCurrent = React.useCallback((items: BreadcrumbItem[]) => {
		setBreadcrumbs(items);
	}, []);

	const clearBreadcrumbs = React.useCallback(() => {
		setBreadcrumbs([]);
	}, []);

	return {
		breadcrumbs,
		addBreadcrumb,
		removeBreadcrumb,
		setBreadcrumbs: setBreadcrumbsCurrent,
		clearBreadcrumbs
	};
};

export default Breadcrumbs;