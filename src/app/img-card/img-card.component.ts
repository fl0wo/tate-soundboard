import {Component, Input} from '@angular/core';

@Component({
  selector: 'img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.scss'],
})
export class ImgCardComponent {

  @Input() audioUrl:string = ''
  @Input() imgUrl:string = ''
  @Input() label:string = ''

}
