export default function Filter({ changeFilter, currentFilter }) {
    const filters = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

    const handleClick = (filter) => {
        changeFilter(filter);
    };

  return (
    <div className="project-filter">
        <p>Filter by: </p>
        <nav>
            {filters.map((f) => (
                <button key={f} onClick={() => handleClick(f)} className={ currentFilter === f ? 'active' : ''}>{f}</button>
            ))}
        </nav>
    </div>
  )
}
