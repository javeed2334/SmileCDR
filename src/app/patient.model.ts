export interface PatientsData {
  resourceType: string;
  id: string;
  meta: Meta;
  type: string;
  total: number;
  link?: Relation[] | null;
  entry?: Patient[] | null;
}
export interface Meta {
  lastUpdated: string;
}
export interface Relation {
  relation: string;
  url: string;
}
export interface Patient {
  fullUrl: string;
  resource?: Resource;
  search: Search;
}
export interface Resource {
  resourceType: string;
  id: string;
  meta: Meta1;
  name?: Name[] | null;
  birthDate?: string | null;
  extension?: Extension[] | null;
  identifier?: Identifier[] | null;
  text?: Text | null;
  gender?: string | null;
  deceasedDateTime?: string | null;
  telecom?: Telecom[] | null;
  address?: Address[] | null;
}
export interface Meta1 {
  versionId: string;
  lastUpdated: string;
  source: string;
}
export interface Name {
  family: string;
  given?: (string)[] | null;
  use?: string | null;
  text?: string | null;
}
export interface Extension {
  url: string;
  valueBoolean: boolean;
}
export interface Identifier {
  use?: string | null;
  type?: Type | null;
  system: string;
  value: string;
}
export interface Type {
  coding?: Coding[] | null;
  text: string;
}
export interface Coding {
  system: string;
  code: string;
  display: string;
}
export interface Text {
  status: string;
  div: string;
}
export interface Telecom {
  system: string;
  value: string;
  use: string;
}
export interface Address {
  line?: string[] | null;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface Search {
  mode: string;
}
