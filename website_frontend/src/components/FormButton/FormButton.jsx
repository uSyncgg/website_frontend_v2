export const FormButton = ({ label, onClick, type = 'button', disabled, className }) => (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
        {label}
    </button>
);
