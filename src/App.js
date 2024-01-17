import { useState } from 'react';

import {FiSearch} from 'react-icons/fi';
import {BsFiletypePdf} from 'react-icons/bs';

import clientesPDF from './Reports/Clientes/Clientes';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

async  function handleSourch (){
    if (input === ''){
      alert("Preencha algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Erro ao buscar CEP!");
      setInput("")
    }
  }

  return (
    
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP.."
        value={input}
        onChange={(e) => setInput(e.target.value) }/>

        <button className="buttonSearch"  onClick={handleSourch}>
        <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

{/* area para depois que buscado o CEP apareça as informações */}

{Object.keys(cep).length > 0 && (
  <main className='main'>
    <h2>CEP: {cep.cep}</h2>

    <span>{cep.logradouro}</span>
    <span>{cep.complemento}</span>
    <span>{cep.bairro}</span>
    <span>{cep.localidade} - {cep.uf}</span>
</main>
)};

<button className="buttonPDF" onClick={(e) => cep && clientesPDF(cep)}>
      <BsFiletypePdf size={30} color='#FFF'/>
      </button>

</div>
  );
}

export default App;
