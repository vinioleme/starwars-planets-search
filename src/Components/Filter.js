import React from 'react';
import useFilters from '../Hooks/useFilters';

export default function Filter() {
  const { filter,
    handleFilters,
    selectData,
    handleChange,
    handleClick,
    handleDeleteFilter,
    handleRemoveAllFilters,
  } = useFilters();

  const { filters, valueFilter } = filter;

  const selectedColum = selectData.map((el) => el.colum);

  return (
    <div>
      <label htmlFor="name-filter">
        Pesquisar:
        <input
          data-testid="name-filter"
          onChange={ handleFilters }
          value={ filters }
          name="filters"
        />
      </label>

      <label htmlFor="columnFilter">
        Coluna
        <select
          name="columnFilter"
          id="columnFilter"
          value={ filter
            .columnFilter }
          data-testid="column-filter"
          onChange={ handleChange }
          onClick={ handleChange }

        >
          {selectedColum.includes('population') ? ''
            : (
              <option
                value="population"
              >
                population
              </option>
            )}
          {selectedColum.includes('orbital_period') ? ''
            : (
              <option
                value="orbital_period"
              >
                orbital_period
              </option>
            )}
          {selectedColum.includes('diameter') ? ''
            : (
              <option
                value="diameter"
              >
                diameter
              </option>
            )}
          {selectedColum.includes('rotation_period') ? ''
            : (
              <option
                value="rotation_period"
              >
                rotation_period
              </option>
            )}
          {selectedColum.includes('surface_water') ? ''
            : (
              <option
                value="surface_water"
              >
                surface_water
              </option>
            )}

        </select>
      </label>

      <label htmlFor="comparisonFilter">

        Operador

        <select
          name="comparisonFilter"
          id="comparisonFilter"
          value={ filter
            .comparisonFilter }
          data-testid="comparison-filter"
          onChange={ handleChange }
          onClick={ handleChange }
        >
          <option value="maior que">
            maior que
          </option>
          <option value="menor que">
            menor que
          </option>
          <option value="igual a">
            igual a
          </option>
        </select>
      </label>

      <label htmlFor="valueFilter">
        <input
          id="valueFilter"
          name="valueFilter"
          type="number"
          value={ valueFilter }
          onChange={ handleChange }
          data-testid="value-filter"
        />
      </label>

      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar

      </button>

      {selectData.map((planet) => (
        <div
          key={ planet.colum }
          data-testid="filter"
        >
          {planet
            .colum}
          {' '}
          {planet
            .condition}
          {' '}
          {planet
            .value}

          <button
            name={
              planet.colum
            }
            onClick={ handleDeleteFilter }
          >
            X

          </button>

        </div>))}

      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todos os Filtros
      </button>

    </div>
  );
}
