import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import FetchProvider from '../Context/FetchProvider';
import userEvent from '@testing-library/user-event';
import { mockData } from '../tests/helpers/mockAPI';


describe('funcionalidades do APP', () => {

  const hearderTitle = ["Name", "Rotation Period", "Orbital Period", "Diameter", "Climate", "Gravity", "Terrain", "Surface Water", "Population", "Films", "Created", "Edited", "Url"];
  const namePlanets = mockData.results.map(element => element.name);
  const url = 'https://swapi.dev/api/planets';
  const planetId = 'name-filter';
  const collumnId = "column-filter";
  const filterComparison = "comparison-filter";
  const filterValue = "value-filter";
  const buttonFilter ="button-filter"

  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
        json: async () => mockData
      }));
  })
  afterEach(function() {
    global.fetch.mockReset();
    });

  it('verifica se são renderizadas as informações corretas ao chamar a API.', async () => {
    render(    
    <FetchProvider> 
      <App />
    </FetchProvider>
    );
    namePlanets.forEach(async element => {
      const planetName = await screen.findByText(element);
      expect(planetName).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(global.fetch).toBeCalledTimes(1);    

  });

  it('verifica se é redendizado a tabela e os nomes corretos no cabeçalho', () => {
    render(    
    <FetchProvider>
      <App />
    </FetchProvider>
    );
    const table = screen.getAllByRole('columnheader');
    hearderTitle.forEach((element) => {
      const header = screen.getByText(element);
      expect(header).toBeInTheDocument();
    });
    expect(table.length).toBe(hearderTitle.length);
  });

  it('testa os filtros', () => {
    render(    
    <FetchProvider>
      <App />
    </FetchProvider>
    );

    const inputPlanetSearch = screen.getByTestId(planetId);
    const iptFilterComparison = screen.getByTestId(filterComparison);
    const inptFilterColumn = screen.getByTestId(collumnId);
    const inptFilterValue = screen.getByTestId(filterValue);

    expect(inputPlanetSearch).toBeInTheDocument;
    expect(iptFilterComparison).toBeInTheDocument;
    expect(inptFilterColumn).toBeInTheDocument;
    expect(inptFilterValue).toBeInTheDocument;
    
    const filterBtn = screen.getByTestId(buttonFilter);
    expect(filterBtn).toBeInTheDocument();

    userEvent.type(inputPlanetSearch, 'oo');
    const ooPlanets = ['Tatooine', 'Naboo'];
    ooPlanets.forEach(async element => {
      const planet = await screen.findByText(element);
      expect(planet).toBeInTheDocument();
    });
  });

  it('testa se os dados listados estão corretos ao selecionar múltiplos filtros.', async () => {
    const { debug } = render(    
    <FetchProvider>
      <App />
    </FetchProvider>
    )
    const fstPlnet = await screen.findByText("Tatooine");
    const lastPlanet = await screen.findByText("Kamino");
    
    expect(fstPlnet && lastPlanet).toBeInTheDocument();

    const filter1 = 'rotation_period';
    const value1 = '24';
    const filter2 = 'orbital_period';
    const value2 = '400';
    const filter3 = 'surface_water';
    const value3 = '100';
    const maiorQue = 'maior que';
    const menorQue = 'menor que';
    const igualA = 'igual a';

    const iptFilterComparison = screen.getByTestId(filterComparison);
    const inptFilterColumn = screen.getByTestId(collumnId);
    const inptFilterValue = screen.getByTestId(filterValue);
    const filterBtn = screen.getByTestId(buttonFilter);

    userEvent.selectOptions(inptFilterColumn, filter1);
    userEvent.selectOptions(iptFilterComparison, menorQue);
    userEvent.type(inptFilterValue, value1);
    userEvent.click(filterBtn);

    userEvent.selectOptions(inptFilterColumn, filter2);
    userEvent.selectOptions(iptFilterComparison, maiorQue);
    userEvent.clear(inptFilterValue);
    userEvent.type(inptFilterValue, value2);
    userEvent.click(filterBtn);

    userEvent.selectOptions(inptFilterColumn, filter3);
    userEvent.selectOptions(iptFilterComparison, igualA);
    userEvent.clear(inptFilterValue);
    userEvent.type(inptFilterValue, value3);
    userEvent.click(filterBtn);

    debug();

    expect(screen.getByText('Hoth')).toBeInTheDocument();
    const rowTable = screen.getAllByRole('row');
    expect(rowTable[1].firstChild.innerHTML).toBe('Hoth');

  });
});