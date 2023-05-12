import { useState, useEffect, useContext } from 'react';
import mainContext from '../Context/mainContext';

const states = {
  filters: '',
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: 0,
  columSort: 'population',
  conditionSort: '',
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
    const filterElement = api.filter((planet) => (planet
      .name.toLowerCase())
      .includes(text));
    setSearch(filterElement);
  };

  const changingOptions = () => {
    const newPlanetsOptions = planetsOptions.filter((el) => !el
      .includes(filter
        .columnFilter));
    setPlanetsOptions(newPlanetsOptions);
  };

  const handleClick = () => {
    selectData.push(
      { colum: filter
        .columnFilter,
      condition: filter
        .comparisonFilter,
      value: filter
        .valueFilter,
      },
    );
    changingOptions();
  };

  useEffect(() => {
    const planetsArray = search.filter((planet) => {
      const newArray = selectData.map((selected) => {
        switch (selected.condition) {
        case 'maior que':
          return Number(planet[selected
            .colum]) > Number(selected.value);
        case 'menor que':
          return Number(planet[selected
            .colum]) < Number(selected.value);
        default:
          return Number(planet[selected
            .colum]) === Number(selected.value);
        }
      });
      return newArray.every((el) => el);
    });

    setPlanets(planetsArray);
  }, [filter,
    planetsOptions,
    setPlanets,
    search]);

  const handleFilters = ({ target }) => {
    const { value } = target;

    const newFilter = {
      ...filter,
      filters: value.toLowerCase(),
    };

    setFilter(newFilter);
    filterByText(value);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleDeleteFilter = ({ target }) => {
    const { name } = target;
    const newSelectData = [];
    const newPlanetsOptions = [];

    selectData.forEach((el) => {
      if (!el.colum
        .includes(name)) {
        newSelectData.push(el);
        if (!newPlanetsOptions.includes(el.colum)) {
          newPlanetsOptions.push(el.colum);
        }
      }
    });

    setFilter({
      ...filter,
      columnFilter: name,
    });
    setPlanetsOptions(newPlanetsOptions);
    selectData = newSelectData;
  };

  const handleRemoveAllFilters = () => {
    selectData = [];
    setPlanetsOptions([...planetsOptions, ...planetsData]);
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
    handleDeleteFilter,
    handleRemoveAllFilters,
  };
}
