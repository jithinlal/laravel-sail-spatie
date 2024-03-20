export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button className={`btn btn-primary border border-secondary ${className}`} {...props} disabled={disabled}>
            {children}
        </button>
    );
}
