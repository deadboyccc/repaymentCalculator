function createPaymentSchedule(
  principal,
  annualInterestRate,
  numMonths,
  startDate
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numMonths));

  const schedule = [];
  let remainingBalance = principal;
  let currentDate = new Date(startDate);

  for (let i = 0; i < numMonths; i++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    schedule.push({
      month: i + 1,
      date: new Date(currentDate),
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: remainingBalance,
    });

    remainingBalance -= principalPayment;
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return schedule;
}

function displaySchedule(schedule) {
  const container = document.getElementById('scheduleContainer');
  container.innerHTML = '';

  const table = document.createElement('table');
  const headerRow = table.insertRow();
  const headers = [
    'Month',
    'Date',
    'Payment',
    'Principal',
    'Interest',
    'Balance',
  ];

  headers.forEach((headerText) => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  schedule.forEach((payment) => {
    const row = table.insertRow();
    const dateString = payment.date.toLocaleDateString();

    const rowData = [
      payment.month,
      dateString,
      payment.payment.toFixed(2),
      payment.principal.toFixed(2),
      payment.interest.toFixed(2),
      payment.balance.toFixed(2),
    ];

    rowData.forEach((cellData) => {
      const cell = row.insertCell();
      cell.textContent = cellData;
    });
  });

  container.appendChild(table);
}

function generateSchedule() {
  const principal = parseFloat(document.getElementById('principal').value);
  const annualInterestRate = parseFloat(
    document.getElementById('interestRate').value
  );
  const numMonths = parseInt(document.getElementById('months').value);
  const startDate = document.getElementById('startDate').value;

  const schedule = createPaymentSchedule(
    principal,
    annualInterestRate,
    numMonths,
    startDate
  );
  displaySchedule(schedule);
}
