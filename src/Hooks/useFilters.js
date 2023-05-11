import { useState, useEffect, useContext } from 'react';
import mainContext from '../Context/mainContext';

const states = {
  filters: '',
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: 0,
  columSort: 'population',
  conditionSort: null,
};

const planetsData = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

let selectData = [];

export default function useFilters() {
  const [filter, setFilter] = useState(states);

  const [planetsOptions, setPlanetsOptions] = useState(planetsData);

  const { api, setSearch, setPlanets, search } = useContext(mainContext);

  const filterByText = (text) => {
    const filterElement = api.filter((planet) => (planet.name.toLowerCase())
      .includes(text));
    setSearch(filterElement);
  };

  const filterPlanets = (planets, filterText) => planets.filter((planet) => planet
    .name.toLowerCase().includes(filterText));

  const changingOptions = () => {
    const newPlanetsOptions = planetsOptions.filter((el) => !el
      .includes(filter.columnFilter));
    setPlanetsOptions(newPlanetsOptions);
  };

  const handleClick = () => {
    selectData.push(
      { colum: filter.columnFilter,
        condition: filter.comparisonFilter,
        value: filter.valueFilter,
      },
    );
    changingOptions();
  };

  useEffect(() => {
    const filteredPlanets = search.filter((planet) => {
      const newArr = selectData.map((selected) => {
        switch (selected.condition) {
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

    setPlanets(filteredPlanets);
    setSearch(filterPlanets(api, filter.filters));
  }, [filter, planetsOptions, setPlanets, search, setSearch, api]);

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

  const handleRemove = ({ target }) => {
    const { name } = target;
    const newSelectData = selectData.filter((el) => !el.colum.includes(name));
    const newPlanetsOptions = planetsOptions.filter((el) => !el.includes(name));
    setFilter({
      ...filter,
      columnFilter: name,
    });
    setPlanetsOptions(newPlanetsOptions);
    selectData = newSelectData;
  };

  const handleRemoveAll = () => {
    selectData = [];
    setPlanetsOptions([...planetsOptions, ...planetsData]);
  };

  const handleSort = () => {
    const newArray = [...test];
    newArray.sort((a, b) => {
      if (filter.conditionSort === 'ASC') {
        return a[filter.columSort] - b[filter.columSort];
      }
      return b[filter.columSort] - a[filter.columSort];
    });
    setPlanets(newArray);
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
    handleRemove,
    handleRemoveAll,
    handleSort,
  };
}
