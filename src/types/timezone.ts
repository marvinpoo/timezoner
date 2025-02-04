import { Timezone } from './timezone';

export interface TimezoneGroup {
  id: string;
  name: string;
  mainTimezone: Timezone | null;
  comparedTimezones: Timezone[];
}

export interface Timezone {
  name: string;
  country: string;
  city: string;
  region: string;
  offset: string;
  value: string;
}