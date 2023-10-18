export class UtilReturnType<T> {
  hasError: boolean;
  data: T;
  msg: string;
  logs?: string[];
}

export class UtilDate {
  dd: number;
  mm: number;
  yyyy: number;
}

export class UtilTime {
  hh?: number;
  mm?: number;
  ss?: number;
}
