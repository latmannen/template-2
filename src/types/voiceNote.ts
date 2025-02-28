export interface VoiceNote {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
} 