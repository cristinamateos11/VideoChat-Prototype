/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}