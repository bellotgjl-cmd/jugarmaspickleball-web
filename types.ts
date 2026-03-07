
export interface LeadData {
  id: string;
  email: string;
  whatsapp?: string;
  type: 'level_test' | 'guide_download';
  level?: string;
  timestamp: string;
}

export enum PlayerLevel {
  BASICO = 'Básico',
  MEDIO_MENOS = 'Medio-',
  MEDIO = 'Medio',
  MEDIO_MAS = 'Medio+',
  RADICAL = 'Radical',
  RADICAL_PRO = 'Radical Pro'
}
