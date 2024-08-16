export type AceleraDialog = {
  who: WhoType;
  message?: DialogAiMessage | null;
  messages: DialogLeadMessage[];
  result?: DialogResult | null;
  error?: DialogError | null;
  stepNoInteractionCurrent?: number | null;
  timestamp?: number | null;
  statusFrom?: string | null;
  statusTo?: string | null;
  intent?: string | null;
  isSent?: boolean | null;
  isDelivered?: boolean | null;
  isRead?: boolean | null;
};

export enum WhoType {
  Vera = 'vera',
  Lead = 'lead',
}

export type DialogError = {
  errors?: Error[] | null;
};

export type DialogAiMessage = {
  to: string;
  type: string;
  messaging_product: string;
  template?: MessageTemplate | null;
  text?: MessageText | null;
  image?: MessageImage | null;
  location?: MessageLocation | null;
  document?: MessageDocument | null;
  preview_url?: boolean | null;
  textRaw?: string | null;
};

export type DialogLeadMessage = {
  id: string;
  type: string;
  from: string;
  timestamp: string;
  text?: MessageText | null;
  button?: MessageButton | null;
  context?: MessageContext | null;
};

export type MessageText = {
  body: string;
};

export type MessageImage = {
  link: string;
};

export type MessageLocation = {
  longitude: number;
  latitude: number;
  address: string;
  name: string;
};

export type MessageDocument = {
  link: string;
  filename: string;
};

export type MessageButton = {
  payload: string;
  text: string;
};

export type MessageContext = {
  from: string;
  id: string;
};

export type MessageTemplate = {
  name: string;
  language: TemplateLanguage;
  components: TemplateComponent[];
};

export type TemplateLanguage = {
  code: string;
};

export type TemplateComponent = {
  type: string;
  parameters: ComponentParameter[];
};

export type ComponentParameter = {
  type: string;
  image?: MessageImage;
  text?: string;
};

export type DialogResult = {
  messaging_product: string;
  contacts: ResultContact[];
  messages: ResultMessage[];
};

export type ResultContact = {
  input: string;
  wa_id: string;
};

export type ResultMessage = {
  id: string;
  message_status?: string;
};

export type Error = {
  code: number;
  title: string;
  message: string;
  error_data: ErrorData;
  href?: string;
};

export type ErrorData = {
  details: string;
};
export type AceleraLeadCreateInput = {
  dialog: AceleraDialog;
};
