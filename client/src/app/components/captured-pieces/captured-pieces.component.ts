import { Component, inject, Input } from '@angular/core';
import { ImageManagerService } from '@app/services/piece-image-manager/image-manager.service';
import { Piece } from '@common/game-architechture/piece.enum';

@Component({
  selector: 'app-captured-pieces',
  imports: [],
  templateUrl: './captured-pieces.component.html',
  styleUrl: './captured-pieces.component.scss',
})
export class CapturedPiecesComponent {
  @Input() captured!: Piece[]; 
  private readonly images: ImageManagerService = inject(ImageManagerService);

  getPieceImage(square: number): string {
    return this.images.getImage(square);
  }
}
