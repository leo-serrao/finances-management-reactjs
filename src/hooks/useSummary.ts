import { TransactionContext } from "../contexts/TransactionContext";
import { useContext, useMemo } from "react";

export function useSummary() {
  const { transactions } = useContext(TransactionContext);

  /**
   * useMemo serve para que uma váriavel não seja recriada
   * toda vez que o componente pai renderizar (muito parecida
   * com o memo, porém para uma só variável), nesse caso ela
   * estava sendo recriada toda vez que o useSummary renderizava,
   * agora ela só será recriada quando a váriavel transactions
   * for modificada, evitando renderização desnecessária.
   */

  const summary = useMemo(() => {
    transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
