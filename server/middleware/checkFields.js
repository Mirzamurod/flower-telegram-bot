import { check } from 'express-validator'

export const bouquetAddField = [
  check('image').notEmpty().withMessage('image_required').bail().trim(),
  check('price').notEmpty().withMessage('price_required').bail().trim(),
]
