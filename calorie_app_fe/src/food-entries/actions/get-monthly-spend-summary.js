import Axios from "axios";
import { USER_ID } from "src/utils/user";

export const getMonthlySpendSummary = async () => {
  const {
    data: {
      monthly_spend_amount: monthlySpendAmount,
      monthly_spend_limit: monthlySpendLimit,
      month,
    },
  } = await Axios.get("http://localhost:3000/user_monthly_spend", {
    params: { user_id: USER_ID },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { monthlySpendAmount, monthlySpendLimit, month };
};
