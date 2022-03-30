import { LikeWidgetComponent } from './like-widget.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@NgModule({
  declarations: [LikeWidgetComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LikeWidgetComponent],
  providers: [UniqueIdService],
})
export class LikeWidgetModule {}
