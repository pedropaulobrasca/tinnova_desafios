import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";
import { Pencil, Trash } from "phosphor-react";

interface TableRowProps {
  data?: any;
}

export interface Veiculo {
  id?: String;
  veiculo: String;
  marca: String;
  ano: Number;
  descricao: String;
  vendido: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export function TableRow({ data }: TableRowProps) {
  const [id, setId] = useState("");
  const [veiculo, setVeiculo] = useState<string | null>(null);
  const [marca, setMarca] = useState<string | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [descricao, setDescricao] = useState<string | null>(null);
  const [vendido, setVendido] = useState<string | null>(null);

  function deletarVeiculo(event: FormEvent) {
    event.preventDefault();
    api
      .delete(`/veiculos/${data.id}`)
      .then(() => {
        alert("Veículo deletado com sucesso!");
        // refresh da página
        window.location.reload();
      })
      .catch(() => {
        alert("Erro ao deletar o veículo!");
      });
  }

  function editarVeiculo(event: FormEvent) {
    event.preventDefault();

    api
      .put(`/veiculos/${data.id}`, {
        veiculo: veiculo ? veiculo : data.veiculo,
        marca: marca ? marca : data.marca,
        ano: ano ? ano : data.ano,
        descricao: descricao ? descricao : data.descricao,
        vendido: vendido ? vendido : data.vendido,
      })
      .then(() => {
        alert("Veículo editado com sucesso!");
        // refresh da página
        window.location.reload();
      })
      .catch(() => {
        alert("Erro ao editar o veículo!");
      });
  }

  return (
    <>
      <tr
        key={data.id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-1 py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          <span className="text-white">{data.id}</span>
        </th>
        <td className="px-1 py-1">
          <input
            type={"text"}
            className="text-white bg-gray-800 rounded-lg"
            placeholder={data.veiculo}
            onChange={(event) => setVeiculo(event.target.value)}
          />
        </td>
        <td className="px-1 py-1">
          <input
            type={"text"}
            className="text-white bg-gray-800 rounded-lg"
            placeholder={data.marca}
            onChange={(event) => setMarca(event.target.value)}
          />
        </td>
        <td className="px-1 py-1">
          <input
            type={"number"}
            className="text-white bg-gray-800 rounded-lg"
            placeholder={data.ano}
            onChange={(event) => setAno(Number(event.target.value))}
            min="1900"
          />
        </td>
        <td className="px-1 py-1">
          <input
            type={"text"}
            className="text-white bg-gray-800 rounded-lg"
            placeholder={data.descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </td>
        <td className="px-1 py-1 flex justify-center items-center">
          <input
            type={"checkbox"}
            className="text-white bg-gray-800 rounded-lg mt-3"
            checked={data.vendido}
            onChange={(event) => setVendido(event.target.checked.toString())}
            contentEditable="true"
          />
        </td>
        <td className="">
          <span className="text-white">{data.createdAt?.toString()}</span>
        </td>
        <td className="">
          <span className="text-white">{data.updatedAt?.toString()}</span>
        </td>
        <td>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full mx-2"
            onClick={editarVeiculo}
          >
            <Pencil />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
            onClick={deletarVeiculo}
          >
            <Trash />
          </button>
        </td>
      </tr>
    </>
  );
}
