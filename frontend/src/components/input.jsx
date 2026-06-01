function Input(props) {
  return (
    <div className="form-field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name || props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        step={props.step}
        required={props.required}
      />
    </div>
  );
}

export default Input;
