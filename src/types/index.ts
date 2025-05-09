export interface Message {
  query: string;
  is_user: boolean;
  type?: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}