export type TelegramParams = {
  body: TelegramBodyParams;
};
export type TelegramBodyParams = {
  message: TelegramMessage;
  update_id?: number;
};
export type TelegramMessage = {
  message_id: number;
  from: TelegramFromParams;
  chat: TelegramChatParams;
  date: number;
  text?: string;
  entities: any;
  passport_data?: TelegramPassportData;
};
export type TelegramPassportData = {
  data: any[];
  credentials: {
    data: string;
    hash: string;
    secret: string;
  };
};
export type TelegramFromParams = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
};

export type TelegramChatParams = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
};
export type TelegramDataDecrypted = {
  personal_details: TelegramPersonalDetails;
  passport: TelegramPassportDetails;
};
export type TelegramPersonalDetails = {
  data: {
    last_name: string;
    birth_date: string;
    first_name: string;
    gender: string;
    residence_country_code: string;
    middle_name: string;
    country_code: string;
  };
};
export type TelegramPassportDetails = {
  data: { expiry_date: string; document_no: string };
  front_side: {
    file: any;
    secret: string;
    hash: string;
  };
  selfie: {
    file: any;
    secret: string;
    hash: string;
  };
};
