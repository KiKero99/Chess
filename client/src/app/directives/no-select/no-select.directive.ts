import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNoSelect]'
})
export class NoSelectDirective {
  @HostBinding('style.user-select')
  @HostBinding('style.-webkit-user-select')
  @HostBinding('style.-moz-user-select')
  @HostBinding('style.-ms-user-select')
  @HostBinding('style.webkitUserSelect')
  protected readonly noSelect = 'none';

  @HostBinding('style.touch-action')
  protected readonly touchAction = 'none';

  @HostBinding('style.-webkit-user-drag')
  protected readonly webkitUserDrag = 'none';

  @HostBinding('attr.unselectable')
  protected readonly unselectable = 'on';

  @HostBinding('style.outline')
  protected readonly outline = 'none';

  @HostBinding('style.box-shadow')
  protected readonly boxShadow = 'none';
}
