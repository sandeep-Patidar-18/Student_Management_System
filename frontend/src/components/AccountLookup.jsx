import Input from "./input";
import Button from "./Button";

function AccountLookup({
  accountNumber,
  onAccountNumberChange,
  onSubmit,
  activeAccountNumber,
  helperText,
}) {
  return (
    <section className="dashboard-card">
      <div className="panel-header">
        <h3>Find Customer Account</h3>
        <p>
          Enter an account number to open another customer profile before
          processing deposit or withdrawal.
        </p>
      </div>

      <form className="lookup-form" onSubmit={onSubmit}>
        <Input
          label="Account number"
          id="accountLookup"
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={onAccountNumberChange}
          required
        />

        <Button
          type="submit"
          name="Open Account"
          className="action-button lookup-button"
        />
      </form>

      <div className="lookup-meta">
        <p>{helperText}</p>
        <span>Active account: {activeAccountNumber}</span>
      </div>
    </section>
  );
}

export default AccountLookup;
