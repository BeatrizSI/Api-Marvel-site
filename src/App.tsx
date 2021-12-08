import React, { useState } from 'react';
import { api } from './api/marvel';
import './App.css';
import CardComic from './components/CardComic';
import Header from './components/Header';
import { IComic } from './interfaces/comics';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';


export default function App() {
  const QUANTITY_PER_PAGE = 8;	
  const [query, setQuery] = useState<string>('');
  const [comics, setComics] = useState<IComic[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  async function search(value: string) {
    setIsLoading(true)
    try {
      const { data } = await api.get(`comics?titleStartsWith=${value}&ts=1&apikey=${process.env.REACT_APP_KEY}&hash=${process.env.REACT_APP_HASH}`)
      setComics(data.data.results);
      setPage(1);
    } catch {
      alert('Erro ao realizar pesquisa, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <article>
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
          comics?.slice(0,page*QUANTITY_PER_PAGE).map(element =>
            <Grid item xs={3} key={element.id}>
              <CardComic comic={element} />
            </Grid>)
        }
      </Grid>
      {
      comics && <Button
      className = "mais"
      variant="contained"
      onClick={() => {
        setPage(page+1 );
      }}
      startIcon={<FaPlusCircle />}>
      Ver mais
      </Button>
      }
    </div>
     </article>
  );
};
