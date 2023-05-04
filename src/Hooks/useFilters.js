import { useState, useEffect, useContext } from 'react';
import mainContext from '../Context/mainContext';

const states = {
  filters: '',
  filterCol: 'population',
  compFilter: 'maior que',
  valueFilter: 0,
};

const planetsData = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const selectData = [];

export default function useFilters() {
  const [filter, setFilter] = useState(states);

  const [planetsOptions, setPlanetsOptions] = useState(planetsData);

  const { api, setSearch, search, setPlanets } = useContext(mainContext);

  const filterByText = (text) => {
    const filterElement = api.filter((planet) => (planet.name.toLowerCase())
      .includes(text));
    setSearch(filterElement);
  };

  const filterPlanets = (planets, filterText) => planets.filter((planet) => planet
    .name.toLowerCase().includes(filterText));

  useEffect(() => {
    const cond = search.filter((planet) => {
      const newArr = selectData.map((selected) => {
        switch (selected.cond) {
        case 'maior que':
          return Number(planet[selected.colum]) > Number(selected.value);
        case 'menor que':
          return Number(planet[selected.colum]) < Number(selected.value);
        default:
          return Number(planet[selected.colum]) === Number(selected.value);
        }
      });
      return newArr.every((el) => el);
    });

    setPlanets(cond);
    setSearch(filterPlanets(api, filter.filters));
  }, [search, planetsOptions, setPlanets, filter.filters, setSearch, api]);

  const handleFilters = ({ target }) => {
    const { value } = target;
    filterByText(value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      filters: value.toLowerCase(),
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const changingOptions = () => {
    const changeOpt = planetsOptions.filter((planet) => !planet
      .includes(filter.filterCol));
    setPlanetsOptions(changeOpt);
    setFilter({
      ...filter,
      filterCol: changeOpt[0],
    });
  };

  const handleClick = () => {
    selectData.push(
      { colum: filter.filterCol,
        condition: filter.compFilter,
        value: filter.valueFilter,
      },
    );
    changingOptions();
  };

  return {
    filter,
    selectData,
    planetsOptions,
    planetsData,
    setFilter,
    handleFilters,
    handleChange,
    changingOptions,
    handleClick,
  };
}
