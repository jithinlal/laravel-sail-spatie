export default function PrimaryButton({className = '', disabled, children, onClick, ...props}) {
	return (
		<button className={`btn btn-primary border border-secondary ${className}`} {...props} disabled={disabled}
						onClick={onClick}>
			{children}
		</button>
	);
}
