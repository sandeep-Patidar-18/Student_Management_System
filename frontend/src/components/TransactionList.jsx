const formatTransactionTime = (transaction) => {
  if (transaction.time) {
    return transaction.time;
  }

  if (transaction.createdAt) {
    return new Date(transaction.createdAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return "Just now";
};

function TransactionList({ transactions }) {
  return (
    <section className="dashboard-card">
      <div className="panel-header">
        <h3>Recent Activity</h3>
        <p>Track employee-led cash movement on the selected customer account.</p>
      </div>

      <div className="transaction-list">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className={`transaction-item transaction-${transaction.type}`}
          >
            <div>
              <strong>{transaction.title}</strong>
              <p>{formatTransactionTime(transaction)}</p>
            </div>
            <div className="transaction-amount-block">
              <strong>
                {transaction.type === "deposit" ? "+" : "-"}Rs.{" "}
                {transaction.amount.toLocaleString("en-IN")}
              </strong>
              <span>{transaction.employee || "Handled by Current Employee"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TransactionList;
