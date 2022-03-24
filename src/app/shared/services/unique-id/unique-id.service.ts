import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;
  private numberOfGeneratedIds = 0;

  public generateUniqueIdWithPrefix(prefix: string): string {
    //null e undefined passam na expressão regular (!!!)
    if (!prefix || !this.validId.test(prefix)) {
      throw Error(`Prefix can not be empty`);
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGeneratedUniqueIds(): number {
    return this.numberOfGeneratedIds;
  }

  private generateUniqueId(): string {
    return uuidv4();
  }
}
