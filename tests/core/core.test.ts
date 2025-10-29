import { Datapack, MCFunction } from '@datapackjs/core'

describe('Initilization steps', () => {
  const format = 88;
  const name = "Datapack";
  const description = "A Datapack";

  const pack = new Datapack(format, name, description);

  it('Should initialize with given parameters', () => {
    expect(pack.packFormat).toBe(format);
    expect(pack.name).toBe(name);
    expect(pack.description).toBe(description);
  });

  it('Should throw error for invalid name', () => {
    expect(() => new Datapack(88, 'Invalid/Name', 'A Datapack')).toThrow();
  });

  it('Should register function', () => {
    const func = MCFunction.define('helloworld', [
      'say @a Hello World',
    ])

    pack.registerFunction(func);
  })

})