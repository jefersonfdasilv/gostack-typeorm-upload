import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const checkTransactionExists = await transactionsRepository.findOne({
      id,
    });
    if (!checkTransactionExists) {
      throw new AppError('Transaction not found', 400);
    }
    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
