import Axios from "axios";

export const getMonthlySpendSummary = async () => {
  const {
    data: { monthly_spend_amount: monthlySpendAmount, monthly_spend_limit: monthlySpendLimit, month},
  } = await Axios.get("http://localhost:3000/user_monthly_spend", {
    params: { user_id: 4 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { monthlySpendAmount, monthlySpendLimit, month}
};
