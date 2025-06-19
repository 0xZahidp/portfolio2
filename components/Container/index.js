export default function Container({ children, className = "", ...props }) {
    return (
        <div className={`w-full mx-auto md:w-[80%] ${className}`} {...props}>
            {children}
        </div>
    );
}