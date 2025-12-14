const Filter = ({ filter, setFilter}) => (
  <div>
    <p>filter shown with </p>
    <input value={filter} onChange={event => setFilter(event.target.value)} />
  </div>
);

export default Filter;