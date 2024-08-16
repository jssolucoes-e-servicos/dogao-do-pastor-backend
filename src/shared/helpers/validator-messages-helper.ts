export class ValidatorMessagesHelper {
  static required(field: string, pronoun: string = 'o') {
    return `${field} é obrigatóri${pronoun}`;
  }

  static minimal(field: string, length: number) {
    return `${field} com caractéres insuficientes, o mínimo é ${length.toString()}`;
  }

  static invalid(field: string) {
    return `${field} em formato inválido`;
  }

  static RegisterDeleted(field = 'Register') {
    return {
      message: `${field} deleted with success`,
      result: 'OK',
    };
  }
}
