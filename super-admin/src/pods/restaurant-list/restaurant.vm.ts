//Modelo de los datos que pintaremos en la tabla
export interface Restaurant {
  id: string;
  name: string;
  email: string;
  numberPhone: string;
}

export const createEmpyRestaurant = (): Restaurant[] => ([{
  id: '',
  name: '',
  email: '',
  numberPhone: '',
}]);
