export interface IMenuItem {
  name: string;
  link: string;
}

export interface IMenuProps {
  menuLinks: [IMenuItem];
}

export interface IMenuItemProps {
  toggle: () => void;
  item: IMenuItem;
}
