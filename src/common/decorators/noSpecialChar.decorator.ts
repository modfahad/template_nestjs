import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { LogService } from "../services/log.service";

export interface PropertyMetaInfo {
  isOptional: boolean;
}

@ValidatorConstraint({ async: false })
@Injectable()
export class NoSpecialCharValidator implements ValidatorConstraintInterface {
  // @Inject()
  private logService = new LogService();
  private specialCharRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

  /**
   *
   * @param value
   * @param args
   * @returns true if value is valid , else returns false
   */
  validate(value: string, args: ValidationArguments): boolean {
    try {
      const { constraints } = args;
      if (constraints) {
        const propertyMetaInfo: PropertyMetaInfo = constraints[0];
        const { isOptional } = propertyMetaInfo;
        //for absent optional feild return true;
        if (isOptional && !value) {
          return true;
        }
      }
      const propertyBeingChecked = args.property;
      const hasSpecialChar = this.specialCharRegex.test(value);
      const isValid = !hasSpecialChar;
      this.logService.info(
        "",
        `propertyBeingChecked=[${propertyBeingChecked}] , isValid=[${isValid}] , value=[${value}]`,
      );
      return isValid ? true : false;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is invalid`;
  }
}
