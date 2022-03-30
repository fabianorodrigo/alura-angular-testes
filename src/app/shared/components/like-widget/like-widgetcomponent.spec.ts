import { TestBed } from '@angular/core/testing';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    // Classe do Angular responsável por criar módulos de testes nos quais o componentes que
    // queremos testar deve fazer parte
    // o  método compileComponents fará a compilação do TS + Template
    // o método compileComponents não seria necessário pois, por usar o Webpack, ele já faz inline.
    // mas para mitigar o risco de algum dia o Angular trocar o Webpack por outro, é melhor usá-lo
    await TestBed.configureTestingModule({
      declarations: [LikeWidgetComponent],
    }).compileComponents();
    //component = new LikeWidgetComponent(new UniqueIdService());
  });

  it('', () => {});
});
