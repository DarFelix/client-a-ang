import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() titleCard: string | undefined;
  @Input() explain: string | undefined;
  @Input() linkBtn: string | undefined;


}
