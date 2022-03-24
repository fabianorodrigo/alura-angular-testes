import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let service;

  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`Jasmine toBeTrue, toBe e toBeTruthy`, () => {
    expect(true).toBeTrue(); // espera um tipo literal. Se passar new Boolean(true), falha
    expect(true).toBe(true); // espera que os dois sejam iguais (se objetos, devem apontar para a mesma referência)
    expect(true).toBeTruthy(); // É mais permissivo, aceita true literal, new Boolean(true), 1 ...
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should
    generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should
    not generate duplicated id when called multiple times`, () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should
    return the number of ids generated`, () => {
    service.generateUniqueIdWithPrefix('app-');
    service.generateUniqueIdWithPrefix('app-');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should
    throw when called with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1']; //, 'app']; //app não lança exceção, então o teste falhará
    emptyValues.forEach((v) => {
      // quando for testar exceção, tem que ser a chamada dentro de uma função
      expect(() => {
        service.generateUniqueIdWithPrefix(v);
      }) // context da expectativa para saber qual elemento do loop deu erro
        .withContext(v)
        .toThrow();
    });
  });
});
