import { ApiProperty } from "@nestjs/swagger";
import { MiscCode } from "../constants/enums";

export class ApiResponse<T> {
  @ApiProperty({
    type: "string",
    description: "unique response ID of API call",
  })
  respId: string;

  @ApiProperty({
    type: "number",
    description: "header code",
  })
  code: number;

  @ApiProperty({
    type: "string",
    description: "err message",
  })
  errMsg: any;

  @ApiProperty({
    type: "string",
    description: "misc message",
  })
  dispMsg: string;

  @ApiProperty({
    type: "object",
  })
  data: T;

  constructor(data: any, ctxId: string, dispMsg?: string, code?: number, errMsg?: any) {
    this.code = code && !isNaN(code) ? code : 200;
    this.errMsg = null;
    this.dispMsg = dispMsg ? dispMsg : "";
    this.respId = ctxId ? ctxId : Math.random().toString(36).replace("0.", "");
    this.data = null as any;
    if (data && data !== null && data !== undefined) {
      this.data = data;
    } else if (errMsg) {
      this.errMsg = errMsg;
      this.data = null;
    }
  }
}

export class ApiResponseArr<T> {
  @ApiProperty({
    type: "string",
    description: "unique response ID of API call",
  })
  respId: string;

  @ApiProperty({
    type: "number",
    description: "header code",
  })
  code: number;

  @ApiProperty({
    type: "string",
    description: "err message",
  })
  errMsg: any;

  @ApiProperty({
    type: "string",
    description: "misc message",
  })
  dispMsg: string;

  @ApiProperty({
    type: "object",
  })
  data: T[];

  @ApiProperty()
  totalCount: number;

  constructor(data: T[], totalCount: number, ctxId: string, dispMsg?: string, code?: number, errMsg?: any) {
    this.code = code && !isNaN(code) ? code : 200;
    this.errMsg = null;
    this.dispMsg = dispMsg ? dispMsg : "";
    this.respId = ctxId ? ctxId : Math.random().toString(36).replace("0.", "");
    this.data = null as any;
    this.totalCount = totalCount;
    if (data && data !== null && data !== undefined) {
      this.data = data;
    } else if (errMsg) {
      this.errMsg = errMsg;
      this.data = null;
    }
  }
}
export class ErrorException {
  error: any;
  code: number;

  constructor(error: any, code?: number) {
    this.error = error;
    this.code = code ? code : MiscCode.BAD_REQUEST;
  }
}
