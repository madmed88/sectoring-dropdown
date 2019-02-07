import createNestedSectors from './Convertor';

it('create correct nested object', () => {
  const data = [
    {id: 1}, {id: 2}, {id: 3}, {id: 4, parent: 1}, {id: 5, parent: 4}
  ];
  const result = createNestedSectors(data);
  expect(Object.values(result).length).toEqual(3);
  expect(Object.values(result[1].children).length).toEqual(1);
  expect(Object.values(result[1].children[4].children).length).toEqual(1);
});
