import Input from "./input";
import Button from "./Button";

function ActionPanel({
  title,
  description,
  amount,
  amountLabel,
  amountId,
  onAmountChange,
  buttonLabel,
  onSubmit,
  buttonClassName,
}) {
  return (
    <section className="dashboard-card">
      <div className="panel-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <form className="action-form" onSubmit={onSubmit}>
        <Input
          label={amountLabel}
          id={amountId}
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={onAmountChange}
          required
        />

        <Button
          type="submit"
          name={buttonLabel}
          className={`action-button ${buttonClassName}`}
        />
      </form>
    </section>
  );
}

export default ActionPanel;
