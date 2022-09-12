import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionContext } from "../../../../contexts/TransactionContext";
import { memo, useContext } from "react";

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed (mudou propriedades);
 * - Parent rerendered (componente pai renderizou);
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. SE mudou alguma coisa, reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1. Comparar  a versão anterior dos hooks e props
 * 0.2. SE mudou algo, ele vai permitir a nova renderização
 *
 * Só utilizar o memo em interfaces complexas, pois muitas vezes
 * ele vai ser mais lento do que recriar o componente do zero, nessa
 * não seria necessário, mas deixei como exemplo de uso
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const { fetchTransactions } = useContext(TransactionContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
