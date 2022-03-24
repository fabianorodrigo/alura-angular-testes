import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let service;

  beforeEach(() => {
    service = new UniqueIdService();
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
    const emptyValues = [null, undefined, ''];
    emptyValues.forEach((v) => {
      // quando for testar exceção, tem que ser a chamada dentro de uma função
      expect(() => {
        service.generateUniqueIdWithPrefix(v);
      }).toThrow();
    });
  });
});
