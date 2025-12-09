import express from "express";
import { createExpense, getAllExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: Gerenciamento de despesas
 */

/**
 * @swagger
 * /api/expense/create:
 *   post:
 *     summary: Criar uma nova despesa
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *               - category
 *               - description
 *               - data
 *             properties:
 *               value:
 *                 type: number
 *                 example: 120.50
 *               category:
 *                 type: string
 *                 example: Alimentação
 *               description:
 *                 type: string
 *                 example: Almoço no restaurante
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2024-11-25
 *     responses:
 *       201:
 *         description: Despesa registrada com sucesso
 *       400:
 *         description: Saldo insuficiente ou usuário não autenticado
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao registrar despesa
 */
router.post("/create", authenticate, createExpense);

/**
 * @swagger
 * /api/expense:
 *   get:
 *     summary: Listar todas as despesas do usuário autenticado
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de despesas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newExpense:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       value:
 *                         type: number
 *                       category:
 *                         type: string
 *                       description:
 *                         type: string
 *                       data:
 *                         type: string
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao listar despesas
 */
router.get("/", authenticate, getAllExpenses);

/**
 * @swagger
 * /api/expense/{id}:
 *   put:
 *     summary: Atualizar uma despesa existente
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *               - category
 *               - description
 *               - data
 *             properties:
 *               value:
 *                 type: number
 *                 example: 200
 *               category:
 *                 type: string
 *                 example: Transporte
 *               description:
 *                 type: string
 *                 example: Uber mensal
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2024-11-26
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 *       400:
 *         description: Saldo insuficiente
 *       404:
 *         description: Despesa não encontrada
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao atualizar despesa
 */
router.put("/:id", authenticate, updateExpense);

/**
 * @swagger
 * /api/expense/{id}:
 *   delete:
 *     summary: Excluir uma despesa
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Despesa excluída com sucesso
 *       404:
 *         description: Despesa não encontrada
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao excluir despesa
 */
router.delete("/:id", authenticate, deleteExpense);

export default router;