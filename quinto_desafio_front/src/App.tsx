import { FormEvent, useEffect, useRef, useState } from "react";
import { TableRow, Veiculo } from "./components/TableRow";
import { api } from "./lib/api";

function App() {
  const [id, setId] = useState<string | null>(null);
  const [veiculo, setVeiculo] = useState<string | null>(null);
  const [marca, setMarca] = useState<string | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [descricao, setDescricao] = useState<string | null>(null);
  const [vendido, setVendido] = useState<string | null>(null);
  const [veiculoEditar, setVeiculoEditar] = useState<any>("");
  // Obtendo a lista de veículos da api com axios
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const [veiculosPorMarca, setVeiculosPorMarca] = useState<Veiculo[]>([]);
  const [veiculosNaoVendidos, setVeiculosNaoVendidos] = useState<Veiculo[]>([]);
  const [veiculosVendidos, setVeiculosVendidos] = useState<Veiculo[]>([]);
  const [vendidosNaSemana, setVendidosNaSemana] = useState<Veiculo[]>([]);

  useEffect(() => {
    api.get("/veiculos").then((response) => {
      setVeiculos(response.data);
    });
  }, []);

  function criarVeiculo(event: FormEvent) {
    event.preventDefault();
    // converte o valor do campo vendido para boolean
    const vendidoBoolean = vendido === "on" ? true : false;
    api
      .post("/veiculos", {
        veiculo,
        marca,
        ano,
        descricao,
        vendido: vendidoBoolean,
      })
      .then(() => {
        setVeiculo(null);
        setMarca(null);
        setAno(null);
        setDescricao(null);
        setVendido(null);
        setId("");

        alert("Veículo criado com sucesso!");

        // refresh da página
        window.location.reload();
      })
      .catch(() => {
        alert("Erro ao criar o veículo!");
      });
  }

  return (
    <div className="">
      <section className="my-10 flex flex-col justify-center items-center w-full flex-1">
        <h1 className="text-[25px] font-bold mb-5">Cadastro de veículo 🚘</h1>
        <form className="w-auto flex gap-2">
          <div className="flex flex-col">
            <label htmlFor="veiculo">Veículo</label>
            <input
              type="text"
              name="veiculo"
              className="text-zinc-900 rounded-lg"
              onChange={(e) => setVeiculo(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="marca">Marca</label>
            <input
              type="text"
              name="marca"
              onChange={(e) => setMarca(e.target.value)}
              className="text-zinc-900 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="ano">Ano</label>
            <input
              type="number"
              name="ano"
              onChange={(e) => setAno(Number(e.target.value))}
              className="text-zinc-900 rounded-lg"
              min={1900}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              name="descricao"
              onChange={(e) => setDescricao(e.target.value)}
              className="text-zinc-900 rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <label htmlFor="vendido">Vendido</label>
            <input
              type="checkbox"
              name="vendido"
              onChange={(e) => setVendido(e.target.value)}
              className="text-zinc-900 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="">Ação</label>
            <div className="flex flex-1">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={criarVeiculo}
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </section>
      <section className="my-10 flex flex-col justify-center items-center w-full flex-1">
        <h1 className="text-[25px] font-bold mb-5">Listagem de veículo</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* Tebela com os Veiculos */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Id
                </th>
                <th scope="col" className="px-4 py-2">
                  Veículo
                </th>
                <th scope="col" className="px-4 py-2">
                  Marca
                </th>
                <th scope="col" className="px-4 py-2">
                  Ano
                </th>
                <th scope="col" className="px-4 py-2">
                  Descrição
                </th>
                <th scope="col" className="px-4 py-2">
                  Vendido
                </th>
                <th scope="col" className="px-4 py-2">
                  Cadastrado em
                </th>
                <th scope="col" className="px-4 py-2">
                  Atualizado em
                </th>
                <th scope="col" className="px-4 py-2">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculo) => (
                <TableRow data={veiculo} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={1} className="px-4 py-2">
                  <div className="flex justify-center">
                    <span>Veiculos total: {veiculos.length}</span>
                  </div>
                </td>
                <td colSpan={1} className="px-4 py-2">
                  <div className="flex justify-center">
                    <span>
                      Veiculos não vendidos: {veiculosNaoVendidos.length}
                    </span>
                  </div>
                </td>
                <td colSpan={1} className="px-4 py-2">
                  <div className="flex justify-center">
                    <span>
                      Veiculos vendidos:{" "}
                      {veiculos.length - veiculosNaoVendidos.length}
                    </span>
                  </div>
                </td>
                <td colSpan={1} className="px-4 py-2">
                  <div className="flex justify-center"></div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
