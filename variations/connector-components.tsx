import React from 'react'
import { cn } from '@/lib/utils'

// Types for connector components
interface ConnectorBaseProps {
	className?: string
	color?: 'blue' | 'purple' | 'green' | 'orange'
	size?: 'sm' | 'md' | 'lg'
}

interface ForkConnectorProps extends ConnectorBaseProps {
	direction?: 'down' | 'up'
	branches?: number
}

interface FlowConnectorProps extends ConnectorBaseProps {
	type?: 'arrow' | 'split' | 'merge'
	points?: number
}

interface HubConnectorProps extends ConnectorBaseProps {
	pattern?: 'star' | 'cross' | 'tree'
	connections?: number
}

// Color and size variants using Tailwind
const colorVariants = {
	blue: 'from-blue-500 to-blue-600',
	purple: 'from-purple-500 to-purple-600',
	green: 'from-green-500 to-green-600',
	orange: 'from-orange-500 to-orange-600',
}

const sizeVariants = {
	sm: { line: 'w-0.5', height: 'h-6', spacing: 'gap-2' },
	md: { line: 'w-1', height: 'h-8', spacing: 'gap-4' },
	lg: { line: 'w-1.5', height: 'h-12', spacing: 'gap-6' },
}

/**
 * Fork Connector Component
 * Creates a branching connector that splits from one to multiple points
 */
export function ForkConnector({ 
	className, 
	color = 'blue', 
	size = 'md', 
	direction = 'down', 
	branches = 3 
}: ForkConnectorProps) {
	const colorClass = colorVariants[color]
	const { line, height, spacing } = sizeVariants[size]
	
	const isDown = direction === 'down'
	
	return (
		<div className={cn(
			'flex flex-col items-center',
			spacing,
			className
		)}>
			{/* Main trunk line */}
			<div className={cn(
				'bg-gradient-to-b rounded-full',
				line,
				height,
				colorClass,
				{ 'order-2': !isDown }
			)} />
			
			{/* Fork junction */}
			<div className={cn(
				'relative flex items-center justify-center',
				{ 'order-1': !isDown }
			)}>
				{/* Horizontal distributor line */}
				<div className={cn(
					'absolute bg-gradient-to-r rounded-full h-0.5',
					`w-${Math.max(branches * 16, 32)}`,
					colorClass
				)} />
				
				{/* Branch connection points */}
				<div className="flex justify-between items-center w-full max-w-xs">
					{Array.from({ length: branches }, (_, index) => (
						<div
							key={index}
							className={cn(
								'relative z-10 rounded-full bg-gradient-to-br',
								'w-3 h-3',
								colorClass
							)}
						/>
					))}
				</div>
			</div>
			
			{/* Branch lines */}
			<div className={cn(
				'flex justify-between items-start w-full max-w-xs',
				{ 'order-3': !isDown, 'flex-col-reverse': !isDown }
			)}>
				{Array.from({ length: branches }, (_, index) => (
					<div
						key={index}
						className={cn(
							'bg-gradient-to-b rounded-full',
							line,
							height,
							colorClass
						)}
					/>
				))}
			</div>
		</div>
	)
}

/**
 * Flow Arrow Connector
 * Creates directional flow indicators with arrows and split points
 */
export function FlowConnector({ 
	className, 
	color = 'purple', 
	size = 'md', 
	type = 'arrow', 
	points = 3 
}: FlowConnectorProps) {
	const colorClass = colorVariants[color]
	const { line, height, spacing } = sizeVariants[size]
	
	if (type === 'arrow') {
		return (
			<div className={cn('flex flex-col items-center', spacing, className)}>
				{/* Arrow stem */}
				<div className={cn(
					'bg-gradient-to-b rounded-full',
					line,
					height,
					colorClass
				)} />
				
				{/* Arrow head */}
				<div className={cn(
					'w-0 h-0 border-l-8 border-r-8 border-t-12',
					'border-l-transparent border-r-transparent',
					{
						'border-t-blue-600': color === 'blue',
						'border-t-purple-600': color === 'purple',
						'border-t-green-600': color === 'green',
						'border-t-orange-600': color === 'orange',
					}
				)} />
			</div>
		)
	}
	
	if (type === 'split') {
		return (
			<div className={cn('flex items-center justify-center py-4', className)}>
				<div className="relative flex justify-between items-center w-full max-w-2xl">
					{/* Background line */}
					<div className={cn(
						'absolute inset-x-0 top-1/2 transform -translate-y-1/2',
						'h-0.5 bg-gradient-to-r rounded-full',
						colorClass
					)} />
					
					{/* Split points */}
					{Array.from({ length: points }, (_, index) => (
						<div
							key={index}
							className={cn(
								'relative z-10 w-3 h-3 rounded-full bg-gradient-to-br',
								colorClass
							)}
						/>
					))}
				</div>
			</div>
		)
	}
	
	return null
}

/**
 * Hub Connector Component
 * Creates a central hub with radiating connections
 */
export function HubConnector({ 
	className, 
	color = 'green', 
	size = 'md', 
	pattern = 'star', 
	connections = 4 
}: HubConnectorProps) {
	const colorClass = colorVariants[color]
	const { line } = sizeVariants[size]
	
	return (
		<div className={cn('flex items-center justify-center py-8', className)}>
			<div className="relative w-96 h-20 flex items-center justify-center">
				{/* Central hub point */}
				<div className={cn(
					'relative z-20 w-4 h-4 rounded-full bg-gradient-to-br',
					colorClass
				)} />
				
				{pattern === 'star' && (
					<>
						{/* Vertical lines */}
						<div className={cn(
							'absolute top-0 left-1/2 transform -translate-x-1/2',
							'bg-gradient-to-b rounded-full',
							line,
							'h-8',
							colorClass
						)} />
						<div className={cn(
							'absolute bottom-0 left-1/2 transform -translate-x-1/2',
							'bg-gradient-to-b rounded-full',
							line,
							'h-8',
							colorClass
						)} />
						
						{/* Horizontal line */}
						<div className={cn(
							'absolute left-0 top-1/2 transform -translate-y-1/2',
							'bg-gradient-to-r rounded-full w-full',
							'h-0.5',
							colorClass
						)} />
						
						{/* Diagonal lines */}
						<div className={cn(
							'absolute left-0 top-1/2 transform -translate-y-1/2 rotate-[-25deg]',
							'bg-gradient-to-r rounded-full w-32 origin-left',
							'h-0.5',
							colorClass
						)} />
						<div className={cn(
							'absolute right-0 top-1/2 transform -translate-y-1/2 rotate-[25deg]',
							'bg-gradient-to-l rounded-full w-32 origin-right',
							'h-0.5',
							colorClass
						)} />
					</>
				)}
				
				{pattern === 'tree' && (
					<>
						{/* Main trunk */}
						<div className={cn(
							'absolute top-0 left-1/2 transform -translate-x-1/2',
							'bg-gradient-to-b rounded-full',
							line,
							'h-6',
							colorClass
						)} />
						
						{/* Horizontal distributor */}
						<div className={cn(
							'absolute left-1/4 right-1/4 top-1/2 transform -translate-y-1/2',
							'bg-gradient-to-r rounded-full',
							'h-0.5',
							colorClass
						)} />
						
						{/* Branch lines */}
						{Array.from({ length: 3 }, (_, index) => {
							const positions = ['left-1/4', 'left-1/2', 'right-1/4']
							const transforms = ['-translate-x-1/2', '-translate-x-1/2', 'translate-x-1/2']
							
							return (
								<div
									key={index}
									className={cn(
										'absolute bottom-0 transform',
										positions[index],
										transforms[index],
										'bg-gradient-to-b rounded-full',
										line,
										'h-6',
										colorClass
									)}
								/>
							)
						})}
					</>
				)}
			</div>
		</div>
	)
}

/**
 * SVG Connector Component
 * Responsive SVG-based connector with perfect scaling
 */
interface SvgConnectorProps extends ConnectorBaseProps {
	type?: 'fork' | 'tree' | 'flow'
	animated?: boolean
}

export function SvgConnector({ 
	className, 
	color = 'blue', 
	size = 'md', 
	type = 'fork',
	animated = false 
}: SvgConnectorProps) {
	const strokeColor = {
		blue: '#3b82f6',
		purple: '#8b5cf6',
		green: '#10b981',
		orange: '#f59e0b',
	}[color]
	
	const strokeWidth = {
		sm: '2',
		md: '3',
		lg: '4',
	}[size]
	
	return (
		<div className={cn('flex justify-center py-4', className)}>
			<svg 
				className="w-full max-w-md h-16" 
				viewBox="0 0 400 60" 
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor={strokeColor} stopOpacity="1" />
						<stop offset="100%" stopColor={strokeColor} stopOpacity="0.7" />
					</linearGradient>
				</defs>
				
				{type === 'fork' && (
					<g>
						{/* Main trunk */}
						<line 
							x1="200" y1="0" x2="200" y2="20" 
							stroke={`url(#gradient-${color})`} 
							strokeWidth={strokeWidth} 
							strokeLinecap="round"
						/>
						
						{/* Horizontal distributor */}
						<line 
							x1="80" y1="30" x2="320" y2="30" 
							stroke={`url(#gradient-${color})`} 
							strokeWidth="2"
						/>
						
						{/* Three branches */}
						<line 
							x1="80" y1="30" x2="80" y2="50" 
							stroke={`url(#gradient-${color})`} 
							strokeWidth={strokeWidth} 
							strokeLinecap="round"
						/>
						<line 
							x1="200" y1="30" x2="200" y2="50" 
							stroke={`url(#gradient-${color})`} 
							strokeWidth={strokeWidth} 
							strokeLinecap="round"
						/>
						<line 
							x1="320" y1="30" x2="320" y2="50" 
							stroke={`url(#gradient-${color})`} 
							strokeWidth={strokeWidth} 
							strokeLinecap="round"
						/>
						
						{/* Connection points */}
						<circle cx="200" cy="20" r="4" fill={strokeColor} />
						<circle cx="80" cy="50" r="4" fill={strokeColor} />
						<circle cx="200" cy="50" r="4" fill={strokeColor} />
						<circle cx="320" cy="50" r="4" fill={strokeColor} />
					</g>
				)}
				
				{animated && (
					<style>
						{`
							line {
								stroke-dasharray: 8 4;
								animation: dash 3s linear infinite;
							}
							@keyframes dash {
								to {
									stroke-dashoffset: -24;
								}
							}
						`}
					</style>
				)}
			</svg>
		</div>
	)
}

/**
 * Connector Section Component
 * Wraps connectors with optional labels and semantic meaning
 */
interface ConnectorSectionProps {
	children: React.ReactNode
	label?: string
	description?: string
	className?: string
}

export function ConnectorSection({ 
	children, 
	label, 
	description, 
	className 
}: ConnectorSectionProps) {
	return (
		<section className={cn(
			'flex flex-col items-center gap-4 py-6',
			'bg-gradient-to-br from-slate-50 to-slate-100',
			'border border-slate-200 rounded-lg',
			'dark:from-slate-800 dark:to-slate-900 dark:border-slate-700',
			className
		)}>
			{label && (
				<div className="text-center">
					<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
						{label}
					</h3>
					{description && (
						<p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
							{description}
						</p>
					)}
				</div>
			)}
			{children}
		</section>
	)
}

/**
 * Complete Strategic Framework Layout
 * Demonstrates usage of all connector types
 */
interface FrameworkCardProps {
	title: string
	content: string
	variant?: 'primary' | 'problem' | 'solution' | 'outcome'
}

function FrameworkCard({ title, content, variant = 'primary' }: FrameworkCardProps) {
	const variants = {
		primary: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
		problem: 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950',
		solution: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
		outcome: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950',
	}
	
	return (
		<div className={cn(
			'rounded-lg border p-6 shadow-sm transition-all duration-200',
			'hover:shadow-md hover:-translate-y-1',
			variants[variant]
		)}>
			<h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
				{title}
			</h3>
			<p className="text-sm text-slate-600 dark:text-slate-400">
				{content}
			</p>
		</div>
	)
}

export function StrategicFrameworkDemo() {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<div className="text-center mb-12">
				<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
					Strategic Framework with Responsive Connectors
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Component-driven approach using modern React patterns
				</p>
			</div>
			
			{/* Central Principle */}
			<FrameworkCard
				title="Central Principle"
				content="A concise statement defining the core business priority that needs to be dissected into actionable parts."
				variant="primary"
			/>
			
			{/* Fork Connector */}
			<ConnectorSection
				label="Breaks Down Into"
				description="One principle splits into multiple problems"
			>
				<ForkConnector color="blue" size="md" direction="down" branches={3} />
			</ConnectorSection>
			
			{/* Problems Row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<FrameworkCard
					title="Problem A"
					content="Description of the first obstacle stemming from the principle."
					variant="problem"
				/>
				<FrameworkCard
					title="Problem B"
					content="Description of the second obstacle derived from the principle."
					variant="problem"
				/>
				<FrameworkCard
					title="Problem C"
					content="Description of the third obstacle linked to the principle."
					variant="problem"
				/>
			</div>
			
			{/* Flow Connector */}
			<ConnectorSection
				label="Leads To Solutions"
				description="Each problem requires a targeted solution"
			>
				<FlowConnector color="purple" type="split" points={3} />
			</ConnectorSection>
			
			{/* Solutions Row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<FrameworkCard
					title="Solution A"
					content="How we address problem A with measurable steps."
					variant="solution"
				/>
				<FrameworkCard
					title="Solution B"
					content="The corrective plan for problem B with clear ownership."
					variant="solution"
				/>
				<FrameworkCard
					title="Solution C"
					content="The fix implemented for problem C closing the loop."
					variant="solution"
				/>
			</div>
			
			{/* Hub Connector */}
			<ConnectorSection
				label="Converges Into"
				description="All solutions contribute to the final outcome"
			>
				<HubConnector color="green" pattern="tree" connections={3} />
			</ConnectorSection>
			
			{/* Outcome */}
			<FrameworkCard
				title="Successful Outcome"
				content="A concise summary of the value delivered by addressing each component and achieving the overall goal."
				variant="outcome"
			/>
		</div>
	)
}

export default StrategicFrameworkDemo 