
export const SelectableFormBlock = ({ image = "", title, selected, onToggle, blockClassName, selectedClassName }) => (
    <div 
        className={`${blockClassName} ${selected ? selectedClassName : ''}`}
        onClick={onToggle}
        role="checkbox"
        aria-checked={selected}    
    >

        {image && <img src={image} title={title} />}
        <span>{title}</span>

    </div>
)
