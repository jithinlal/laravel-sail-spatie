export default function GhostButton({ className = '', disabled, children, ...props }) {
    return (
        <button className={`btn btn-primary ${className}`} {...props} disabled={disabled}>
            {children}
        </button>
    );
}
