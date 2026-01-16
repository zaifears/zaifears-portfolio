export type Language = 'bn' | 'en';

export interface ServiceCard {
  id: string;
  icon: string;
  iconColor?: string;
  titleKey: string;
  descKey: string;
  btnKey: string;
  recommended?: boolean;
  color?: string;
  hrefId: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dataKey: string;
  submenu?: SubmenuItem[];
}

export interface SubmenuItem {
  label: string;
  href: string;
  icon: string;
  color: string;
  dataKey: string;
}

export interface Translation {
  langBtn: string;
  navHome: string;
  navServices: string;
  navAcademy: string;
  dropFb: string;
  dropWeb: string;
  dropMaint: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  servTitle: string;
  s1Title: string;
  s1Desc: string;
  s1Btn: string;
  s2Title: string;
  s2Desc: string;
  s2Btn: string;
  s3Title: string;
  s3Desc: string;
  s3Btn: string;
  acaTitle: string;
  acaDesc: string;
  stat1: string;
  stat2: string;
  oppTitle: string;
  oppDesc: string;
  oppBtn: string;
  footer: string;
}

export interface Translations {
  [key: string]: Translation;
}
