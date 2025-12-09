import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { financeTotals } from '../controllers/financeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Totais financeiros do usuário
 */

/**
 * @swagger
 * /api/finance:
 *   get:
 *     summary: Obter totais financeiros do usuário autenticado
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Totais financeiros retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 5000
 *                 totalExpenses:
 *                   type: number
 *                   example: 3500
 *                 saldoAtual:
 *                   type: number
 *                   example: 1500
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro ao obter totais financeiros
 */
router.get("/", authenticate, financeTotals);

export default router;