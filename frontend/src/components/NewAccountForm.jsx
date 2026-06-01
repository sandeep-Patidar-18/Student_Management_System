import Input from "./input";
import Button from "./Button";

function NewAccountForm({
  isOpen,
  onToggle,
  formData,
  generatedAccountNumber,
  onChange,
  onGenerateAccountNumber,
  onSubmit,
}) {
  return (
    <section className="dashboard-card">
      <div className="compact-panel-header">
        <div className="panel-header compact-panel-copy">
          <h3>Create New Account</h3>
          <p>
            Open this only when the employee needs to register a fresh customer
            profile.
          </p>
        </div>

        <Button
          type="button"
          name={isOpen ? "Close Form" : "New Account"}
          className="action-button compact-toggle-button"
          onClick={onToggle}
        />
      </div>

      {isOpen ? (
        <form className="new-account-form" onSubmit={onSubmit}>
          <div className="new-account-grid">
            <Input
              label="Full name"
              id="fullName"
              type="text"
              placeholder="Enter customer full name"
              value={formData.fullName}
              onChange={onChange}
              required
            />

            <Input
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={onChange}
              required
            />

            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={onChange}
              required
            />

            <Input
              label="Account type"
              id="accountType"
              type="text"
              placeholder="Savings or current"
              value={formData.accountType}
              onChange={onChange}
              required
            />

            <Input
              label="Branch"
              id="branch"
              type="text"
              placeholder="Enter branch name"
              value={formData.branch}
              onChange={onChange}
              required
            />

            <Input
              label="Opening balance"
              id="openingBalance"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter opening balance"
              value={formData.openingBalance}
              onChange={onChange}
              required
            />
          </div>

          <div className="account-generator">
            <div className="generated-account">
              <span>Generated account number</span>
              <strong>{generatedAccountNumber}</strong>
            </div>

            <Button
              type="button"
              name="Generate Number"
              className="secondary-button generator-button"
              onClick={onGenerateAccountNumber}
            />
          </div>

          <Button
            type="submit"
            name="Create Customer Account"
            className="action-button create-account-button"
          />
        </form>
      ) : null}
    </section>
  );
}

export default NewAccountForm;
