import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Monitoramento e verificação de saúde da aplicação
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check da aplicação
 *     description: Endpoint utilizado para monitoramento (Zabbix, uptime e automações).
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Aplicação saudável e operacional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       500:
 *         description: Aplicação indisponível
 */
router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
