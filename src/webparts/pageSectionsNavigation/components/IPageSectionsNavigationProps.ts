import { NavTheme, NavAlign, NavPosition } from '../../../common/types';
import { IAnchorItem } from '../../../common/model';

export interface IPageSectionsNavigationProps {
  anchors: IAnchorItem[];
  scrollBehavior: ScrollBehavior;
  position: NavPosition;
  theme: NavTheme;
  align: NavAlign;
  isEditMode: boolean;
  homeItem?: string;
}
