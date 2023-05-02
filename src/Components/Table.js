import React, { useContext } from 'react';
import ApiContext from '../Context/ApiContext';

export default function Table() {
  const { api } = useContext(ApiContext);

  const titles = [
    'Name',
    'Rotation Period',
    'Orbital Perio',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {titles.map((title, ind) => (<th key={ ind }>{title}</th>))}
          </tr>

        </thead>

        <tbody>

          {api.map((element) => (
            <tr key={ element.name }>
              <td data-testid="planet-name">{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
