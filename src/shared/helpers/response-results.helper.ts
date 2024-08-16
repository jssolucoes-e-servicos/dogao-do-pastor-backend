import { HttpException, HttpStatus } from '@nestjs/common';

export class ResponseResultsHelper {
  static RegisterAlreadyExists(field: string = 'Register') {
    throw new HttpException(`${field} alread exixts`, HttpStatus.BAD_REQUEST);
  }

  static RegisterNotExists(field: string = 'Register') {
    throw new HttpException(`${field} does not exixts`, HttpStatus.NOT_FOUND);
  }

  static RegisterIsDisable(field: string = 'Register') {
    throw new HttpException(`${field} is disable`, HttpStatus.NOT_FOUND);
  }

  static RegisterDeleted(field: string = 'Register') {
    return {
      message: `${field} deleted with success`,
      result: 'OK',
    };
  }

  static ErrorResult() {
    throw new HttpException(
      'Ops! Ocorreu uma falha em sua requisição',
      HttpStatus.BAD_REQUEST,
    );
  }

  static ErrorMessage(
    message: string = 'Ops! Ocorreu uma falha em sua requisição',
  ) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  static NotMaster() {
    throw new HttpException(
      'Você não tem permissão para acessar este recurso;',
      HttpStatus.BAD_REQUEST,
    );
  }
}
