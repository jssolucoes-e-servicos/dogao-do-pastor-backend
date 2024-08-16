export type CompanyBasic = {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  acelera_parceiro_configs: AceleraParceiroConfigs[];
};

export type AceleraParceiroConfigs = {
  id: string;
  name: string;
  enable_curation: boolean;
  enabled: boolean;
  integration_name: string | null;
  integration_configuration: string | null;
};

export type UserLogged = {
  id: string;
  email: string;
  name: string;
  profile: string;
  sector:string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  companybarberId: string;
  companyBarber: CompanyBasic;
};
