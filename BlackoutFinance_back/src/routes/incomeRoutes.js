import express from "express";
import { createIncome, getAllIncomes, updateIncome, deleteIncome } from "../controllers/incomeController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Income
 *   description: Gerenciamento de entradas financeiras
 */

/**
 * @swagger
 * /api/income/create:
 *   post:
 *     summary: Criar uma nova entrada financeira
 *     tags: [Income]
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
 *                 example: 3500
 *               category:
 *                 type: string
 *                 example: Salário
 *               description:
 *                 type: string
 *                 example: Salário mensal
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2024-11-01
 *     responses:
 *       201:
 *         description: Entrada registrada com sucesso
 *       400:
 *         description: Usuário não autenticado ou saldo inconsistente
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao registrar entrada
 */
router.post("/create", authenticate, createIncome);

/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Listar todas as entradas do usuário autenticado
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newIncome:
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
 *         description: Erro ao listar entradas
 */
router.get("/", authenticate, getAllIncomes);

/**
 * @swagger
 * /api/income/{id}:
 *   put:
 *     summary: Atualizar uma entrada existente
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da entrada
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
 *                 example: 4000
 *               category:
 *                 type: string
 *                 example: Freelance
 *               description:
 *                 type: string
 *                 example: Projeto extra
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2024-11-15
 *     responses:
 *       200:
 *         description: Entrada atualizada com sucesso
 *       400:
 *         description: Atualização inválida (saldo insuficiente)
 *       404:
 *         description: Entrada não encontrada
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao atualizar entrada
 */
router.put("/:id", authenticate, updateIncome);

/**
 * @swagger
 * /api/income/{id}:
 *   delete:
 *     summary: Excluir uma entrada
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da entrada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada excluída com sucesso
 *       400:
 *         description: Exclusão causaria saldo insuficiente
 *       404:
 *         description: Entrada não encontrada
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao excluir entrada
 */
router.delete("/:id", authenticate, deleteIncome);

export default router;