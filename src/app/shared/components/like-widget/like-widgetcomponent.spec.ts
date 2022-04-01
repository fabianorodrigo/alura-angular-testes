import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  //O ComponentFixture é um Wrapper com utilitários para facilitar os testes
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    // Classe do Angular responsável por criar módulos de testes nos quais o componentes que
    // queremos testar deve fazer parte
    // o  método compileComponents fará a compilação do TS + Template
    // o método compileComponents não seria necessário pois, por usar o Webpack, ele já faz inline.
    // mas para mitigar o risco de algum dia o Angular trocar o Webpack por outro, é melhor usá-lo
    await TestBed.configureTestingModule({
      // declarations: [LikeWidgetComponent],
      // imports: [FontAwesomeModule],
      // providers: [UniqueIdService],
      // pode ser feito da forma acima ou importando só o módulo
      imports: [LikeWidgetModule],
      // Se quiser que o detectecChanges seja automático, que não precise chamar
      // fixture.detectChanges() manualmente no código de teste, basta incluir
      // a linha abaixo (não recomendado)
      //providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    // se não criou direito, vai retornar null.
    // com o toBeTruthy, o null é considerado false
    expect(component).toBeTruthy();
  });

  it(`Should auto-generate ID during ngOnInit when (@Input id) is not assigned`, () => {
    // por padrão, nos testes Angular, você que precisa disparar os changesDetect
    // Com essa chamada, ele executa o onInit. Sem ela, o teste a seguir falha.
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it(`Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned`, () => {
    const idPrevio = `algum id`;
    component.id = idPrevio;
    // por padrão, nos testes Angular, você que precisa disparar os changesDetect
    // Com essa chamada, ele executa o onInit. Sem ela, o teste a seguir falha.
    fixture.detectChanges();
    expect(component.id).toBe(idPrevio);
  });

  // Se passar o parâmetro (uma função) para a função de teste, o Jasmine só vai considerar que o
  // teste foi bem sucedido se essa função "done" for invocada
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, (done) => {
    fixture.detectChanges();
    //Usar observable para testar a emissão do evento
    component.liked.subscribe(() => {
      expect(true).toBeTruthy();
      //"done" precisa ser chamado para o teste passar, se o evento nã for emitido, ela não será
      //chamada e o teste vai falhar
      done();
    });
    component.like();
  });

  // Outra forma mais simples que a função acima de testar o evento
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, () => {
    //cria expião
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });
});
