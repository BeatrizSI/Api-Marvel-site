import React, { useState } from 'react';
import { api } from './api/marvel';
import './App.css';
import CardComic from './components/CardComic';
import Header from './components/Header';
import { IComic } from './interfaces/comics';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FaSearch } from 'react-icons/fa';


const KEY = '09101f53f5a25fd1329df876511dbf77';
const HASH = 'b8d4f7e138e651d542c879a021a7c7ae';

export default function App() {

  const [query, setQuery] = useState<string>('');
  const [comics, setComics] = useState<IComic[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function search(value: string) {
    setIsLoading(true)
    try {
      const { data } = await api.get(`comics?titleStartsWith=${value}&ts=1&apikey=${KEY}&hash=${HASH}`)
      setComics(data.data.results);
    } catch {
      alert('Erro ao realizar pesquisa, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="App">
      <Header />
      <TextField
        className = "box-search"
        autoFocus
        onChange={(e: any) => setQuery(e.target.value)}
        value={query}
        label="Qual quadrinho está buscando?"
        variant="outlined"
      />

      <Button
        className = "search"
        variant="contained"
        onClick={() => {
          search(query)
        }}
        startIcon={<FaSearch />}>
        Pesquisar
      </Button>

      {
        isLoading && <div>Carregando...</div>
      }

      <Grid container spacing={2} className = "list-comics">
        {
          comics?.map(element =>
            <Grid item xs={3}>
              <CardComic comic={element} />
            </Grid>)
        }
      </Grid>
    </div>
  );
};