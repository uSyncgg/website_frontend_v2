
export const RadioFormBlock = ({ description, title, selected, onToggle, blockClassName, selectedClassName }) => (
    <div 
        className={`${blockClassName} ${selected ? selectedClassName : ''}`}
        onClick={onToggle}
        role="radio"
        aria-checked={selected}    
    >

        <h2>{title}</h2>
        <p>{description}</p>
        
    </div>
)
