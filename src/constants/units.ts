import { Unit, UnitType } from '../types/material';

// Unit constants with conversion factors
export const UNITS = {
  // Volume units (base: milliliter)
  MILLILITER: {
    id: 'ml',
    name: 'Milliliter',
    type: 'volume' as UnitType,
    conversionFactor: 1,
    symbol: 'mL',
    decimalPlaces: 1,
    step: 0.1
  },
  
  LITER: {
    id: 'l',
    name: 'Liter',
    type: 'volume' as UnitType,
    conversionFactor: 1000,
    symbol: 'L',
    decimalPlaces: 3,
    step: 0.001
  },

  TEASPOON: {
    id: 'tsp',
    name: 'Teaspoon',
    type: 'volume' as UnitType,
    conversionFactor: 4.93,
    symbol: 'tsp',
    decimalPlaces: 1,
    step: 0.1
  },
  
  TABLESPOON: {
    id: 'tbsp',
    name: 'Tablespoon',
    type: 'volume' as UnitType,
    conversionFactor: 14.79,
    symbol: 'tbsp',
    decimalPlaces: 1,
    step: 0.1
  },
  
  FLUID_OUNCE: {
    id: 'floz',
    name: 'Fluid Ounce',
    type: 'volume' as UnitType,
    conversionFactor: 29.57,
    symbol: 'fl oz',
    decimalPlaces: 1,
    step: 0.1
  },
  
  CUP: {
    id: 'cup',
    name: 'Cup',
    type: 'volume' as UnitType,
    conversionFactor: 236.59,
    symbol: 'cup',
    decimalPlaces: 2,
    step: 0.01
  },
  
  PINT: {
    id: 'pt',
    name: 'Pint',
    type: 'volume' as UnitType,
    conversionFactor: 473.18,
    symbol: 'pt',
    decimalPlaces: 2,
    step: 0.01
  },
  
  QUART: {
    id: 'qt',
    name: 'Quart',
    type: 'volume' as UnitType,
    conversionFactor: 946.35,
    symbol: 'qt',
    decimalPlaces: 2,
    step: 0.01
  },
  
  GALLON: {
    id: 'gal',
    name: 'Gallon',
    type: 'volume' as UnitType,
    conversionFactor: 3785.41,
    symbol: 'gal',
    decimalPlaces: 4,
    step: 0.001
  },
  
  
  // Mass units (base: gram)
  GRAM: {
    id: 'g',
    name: 'Gram',
    type: 'mass' as UnitType,
    conversionFactor: 1,
    symbol: 'g',
    decimalPlaces: 1,
    step: 0.1
  },
  
  // Count units (for discrete materials)
  COUNT: {
    id: 'count',
    name: 'Count',
    type: 'count' as UnitType,
    conversionFactor: 1,
    symbol: 'count',
    decimalPlaces: 0,
    step: 1
  }
};

// Get all units of a specific type
export function getUnitsByType(type: UnitType): Unit[] {
  return Object.values(UNITS).filter(unit => unit.type === type);
}

// Get a unit by its ID
export function getUnitById(id: string): Unit | undefined {
  return Object.values(UNITS).find(unit => unit.id === id);
}

