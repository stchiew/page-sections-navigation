import { DisplayMode } from "@microsoft/sp-core-library";
import { NavPosition } from '../../../common/types';

export interface IPageSectionsNavigationAnchorProps {
  displayMode: DisplayMode;
  title: string;
  updateProperty: (value: string) => void;
  showTitle: boolean;
  anchorElRef: (el: HTMLDivElement) => void;
  navPosition: NavPosition;
}
