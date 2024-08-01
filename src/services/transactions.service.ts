import { StatusCodes } from "http-status-codes";
import type { TransactionsRepository } from "../database/repositories/transactions.repository";
import type {
	CreateTransactionDTO,
	GetDashboardDTO,
	IndexTransactionsDTO,
} from "../dtos/transactions.dto";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import type { CategoriesRepository } from "./../database/repositories/categories.repository";
import { Balance } from "../entities/balance.entity";

import { Expense } from "../entities/expense.entity";

export class TransactionsService {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private categoriesRepository: CategoriesRepository,
	) {}

	async create({
		title,
		date,
		amount,
		type,
		categoryId,
	}: CreateTransactionDTO): Promise<Transaction> {
		const category = await this.categoriesRepository.findById(categoryId);

		if (!category) {
			throw new AppError("Category does not exists.", StatusCodes.NOT_FOUND);
		}

		const transaction = new Transaction({
			title,
			type,
			date,
			category,
			amount,
		});

		const createdTransaction =
			await this.transactionsRepository.create(transaction);

		return createdTransaction;
	}

	async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
		const transactions = await this.transactionsRepository.index(filters);

		return transactions;
	}

	async getDashboard({
		beginDate,
		endDate,
	}: GetDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
		let [balance, expenses] = await Promise.all([
			this.transactionsRepository.getBalance({
				beginDate,
				endDate,
			}),

			this.transactionsRepository.getExpenses({
				beginDate,
				endDate,
			}),
		]);

		if (!balance) {
			balance = new Balance({
				_id: null,
				incomes: 0,
				expenses: 0,
				balance: 0,
			});
		}

		return { balance, expenses };
	}
}
