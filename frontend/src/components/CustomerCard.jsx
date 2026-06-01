function CustomerCard({ customer }) {
  return (
    <section className="dashboard-card">
      <div className="panel-header">
        <h3>Managed Customer</h3>
        <p>The employee is currently handling this customer account.</p>
      </div>

      <div className="customer-grid">
        <div>
          <span>Full Name</span>
          <strong>{customer.fullName}</strong>
        </div>
        <div>
          <span>Account Number</span>
          <strong>{customer.accountNumber}</strong>
        </div>
        <div>
          <span>Account Type</span>
          <strong>{customer.accountType}</strong>
        </div>
        <div>
          <span>Branch</span>
          <strong>{customer.branch}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{customer.phone}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{customer.email || "Not available"}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{customer.status}</strong>
        </div>
      </div>
    </section>
  );
}

export default CustomerCard;
