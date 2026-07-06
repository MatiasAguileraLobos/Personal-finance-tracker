# Database Design

## Descripción general

La aplicación utiliza una base de datos relacional para gestionar usuarios, transacciones financieras, categorías y presupuestos.

## Decisiones de diseño

- Las categorías son globales y compartidas por todos los usuarios.
- Toda transacción debe pertenecer a una categoría.
- Los montos de las transacciones son siempre positivos.
- El tipo de una transacción se determina a partir de su categoría.
- El porcentaje de utilización de un presupuesto se calcula dinámicamente y no se almacena en la base de datos.
- Los valores monetarios utilizan tipos `DECIMAL/NUMERIC` para evitar problemas de precisión.

---

# Entities

## User

Representa un usuario de la aplicación.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| name | String | User's name |
| email | String | User's email |
| passwordHash | String | Hashed password |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

---

## Category

Representa una categoría para clasificar ingresos y gastos.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| name | String | Category name |
| icon | String | Icon identifier |
| type | Enum | INCOME or EXPENSE |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

---

## Transaction

Representa un ingreso o un gasto realizado por un usuario.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| title | String | Transaction title |
| description | String? | Optional description |
| amount | Decimal | Transaction amount |
| date | Date | Transaction date |
| categoryId | UUID | Category reference |
| userId | UUID | User reference |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

---

## Budget

Representa un presupuesto mensual para una categoría.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| amount | Decimal | Budget amount |
| month | Integer | Month |
| year | Integer | Year |
| categoryId | UUID | Category reference |
| userId | UUID | User reference |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

---

# Relationships

## User

```text
User
├── Transaction (1:N)
└── Budget (1:N)
```

## Category

```text
Category
├── Transaction (1:N)
└── Budget (1:N)
```

## General ER Diagram

```text
User
│
├────< Transaction >──── Category
│
└────< Budget >───────── Category
```

---x

# Constraints

- `email` must be unique.
- `amount` must be greater than zero.
- Every `Transaction` must belong to a `Category`.
- Every `Budget` must belong to a `Category`.
- A user can only have one budget per category, month and year.

---

# Future Entities (Version 2)

## RecurringTransaction

Permitirá registrar ingresos o gastos periódicos.

Ejemplos:

- Netflix → $7.000 todos los meses.
- Sueldo → $500.000 el día 15 de cada mes.
