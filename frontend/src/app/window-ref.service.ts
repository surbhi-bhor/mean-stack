import { Injectable } from '@angular/core';

// export interface ICustomWindow extends Window {
//   __custom_global_stuff: string;
// }
function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  get nativeWindow() : any {
    return _window();
 }
}
