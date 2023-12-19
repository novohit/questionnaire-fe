import { ComponentGroup } from '../model';
import http from './http';

export async function getComponentLib() {
  const url = '/api/component/list';
  const componentLib = (await http.get(url)) as Array<ComponentGroup>;
  return componentLib;
}
